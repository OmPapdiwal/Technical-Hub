import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = "http://localhost:5002/register"; // Updated port

export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const { storeTokenInLS } = useAuth();
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const data = await fetch ( URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
          });
      
          const res_data = await data.json();
      
          if (data.ok) {
            storeTokenInLS(res_data.token);
            setUser({ username: "", email: "", phone: "", password: "" });
            toast.success("Registration Successful");
            navigate("/");
          } else {
            // Log and display backend error message
            console.error("Error from server:", res_data);
            toast.error(res_data.message || "Registration failed");
          }
        } catch (error) {
          console.error('Error during registration:', error);
          toast.error("Registration failed. Please try again.");
        }
      };
      
    
    return (
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img
                                src="/images/7677.jpg_wh860.jpg"
                                alt="A group of people is trying to do registration"
                                width="600"
                                height="700"
                            />
                        </div>
                        <div className="registration-form">
                            <h1 className="main heading mb-3">Registration Form</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Enter Your Username"
                                        id="username"
                                        required
                                        autoComplete="off"
                                        value={user.username}
                                        onChange={handleInput}
                                    />
                                </div>

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
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="number"
                                        name="phone"
                                        placeholder="Enter Your Contact Number"
                                        id="phone"
                                        required
                                        autoComplete="off"
                                        value={user.phone}
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
                                <button type="submit" className="btn btn-submit">Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
};
