import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = "http://localhost:5002/login";

export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();
    
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
    
            // Check if response is OK
            if (response.ok) {
                const res_data = await response.json();
                toast.success("Login Successful");
                storeTokenInLS(res_data.token);
                setUser({ email: "", password: "" });
                navigate("/");
            } else {
                const errorData = await response.json();
                toast.error(`Login failed: ${errorData.message || 'Please try again.'}`);
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Error during login. Please try again.");
        }
    };
    

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img src="/images/7677.jpg_wh860.jpg" alt="Let's do the login" width="600" height="500" />
                            </div>
                            <div className="registration-form">
                                <h1 className="main heading mb-3">Login Form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter Your Email"
                                            id="email"
                                            required
                                            autoComplete="off"
                                            value={user.email}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Enter Your Password"
                                            id="password"
                                            required
                                            autoComplete="off"
                                            value={user.password}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <br />
                                    <button type="submit" className="btn btn-submit">Login Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};
