import { useEffect, useState } from "react";
import { useAuth } from "../store/auth"; // Adjust path as necessary

import { toast } from "react-toastify";

const defaultContactForm = {
    username: "",
    email: "",
    message: "",
};
const URL="http://localhost:5002/contact"

export const Contact = () => {
    const [contact, setContact] = useState(defaultContactForm);

    const { user } = useAuth(); // Ensure this provides the user object

    useEffect(() => {
        if (user && user.username && user.email) {
            setContact((prev) => ({
                ...prev,
                username: user.username,
                email: user.email,
            }));
        }
    }, [user]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setContact((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });

            if (response.ok) {
                const res_data = await response.json();
                setContact(defaultContactForm);
                toast.success("Message sent successfully!");
                console.log("Response from server:", res_data);
            } else {
                // Attempt to parse response as text and display it
                const errorText = await response.text();
                toast.error(errorText || "Failed to send message.");
            }
        } catch (error) {
            console.error("Error during submission:", error);
            toast.error("There was an error sending your message. Please try again.");
        }
    };

    return (
        <>
            <h1>Contact Us</h1>
            <section>
                <main>
                    <div className="section-contact">
                        <div className="container grid grid-two-cols">
                            <div className="contact-image">
                                <img src="/images/7677.jpg_wh860.jpg" alt="Let's do the login" width="600" height="500" />
                            </div>
                            <div className="section-form">
                                <h1 className="main heading mb-3">Contact Form</h1>
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
                                            value={contact.username}
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
                                            value={contact.email}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            name="message"
                                            id="message"
                                            cols="20"
                                            rows="5"
                                            autoComplete="off"
                                            required
                                            onChange={handleInput}
                                            value={contact.message}
                                        ></textarea>
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>

            <section className="mb-3">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.5872229640413!2d73.84567736967149!3d18.45704163273535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eac906c3ffaf%3A0x48727ec5c226047c!2sTrimurthi%20Chowk%2C%20Bharati%20Vidyapeeth%20Campus%2C%20Dhankawadi%2C%20Pune%2C%20Maharashtra%20411046!5e0!3m2!1sen!2sin!4v1723572453734!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </>
    );
};

// import { useState } from "react";
// import { useAuth } from "../store/auth";

// const defaultContactFormData = {
//   username: "",
//   email: "",
//   message: "",
// };

// export const Contact = () => {
//   const [contact, setContact] = useState(defaultContactFormData);

//   const [userData, setUserData] = useState(true);

//   const { user, API } = useAuth();

//   if (userData && user) {
//     setContact({
//       username: user.username,
//       email: user.email,
//       message: "",
//     });

//     setUserData(false);
//   }

//   // lets tackle our handleInput
//   const handleInput = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;

//     setContact({
//       ...contact,
//       [name]: value,
//     });
//   };

//   // handle fomr getFormSubmissionInfo
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${API}/contact`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(contact),
//       });

//       if (response.ok) {
//         setContact(defaultContactFormData);
//         const data = await response.json();
//         console.log(data);
//         alert("Message send successfully");
//       }
//     } catch (error) {
//       alert("Message not send");
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <section className="section-contact">
//         <div className="contact-content container">
//           <h1 className="main-heading">contact us</h1>
//         </div>
//         {/* contact page main  */}
//         <div className="container grid grid-two-cols">
//           <div className="contact-img">
//             <img src="/images/7677.jpg_wh860.jpg" alt="we are always ready to help" />
//           </div>

//           {/* contact form content actual  */}
//           <section className="section-form">
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="username">username</label>
//                 <input
//                   type="text"
//                   name="username"
//                   id="username"
//                   autoComplete="off"
//                   value={contact.username}
//                   onChange={handleInput}
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email">email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   autoComplete="off"
//                   value={contact.email}
//                   onChange={handleInput}
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="message">message</label>
//                 <textarea
//                   name="message"
//                   id="message"
//                   autoComplete="off"
//                   value={contact.message}
//                   onChange={handleInput}
//                   required
//                   cols="30"
//                   rows="6"
//                 ></textarea>
//               </div>

//               <div>
//                 <button type="submit">submit</button>
//               </div>
//             </form>
//           </section>
//         </div>

//         <section className="mb-3">
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.91411937501422!3d18.562253982539413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1697604225432!5m2!1sen!2sin"
//             width="100%"
//             height="450"
//             allowFullScreen
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           ></iframe>
//         </section>
//       </section>
//     </>
//   );
// };