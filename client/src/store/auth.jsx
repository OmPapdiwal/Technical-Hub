import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const authorizationToken = token ? `Bearer ${token}` : "";

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    const isLoggedIn = !!token;
    
    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
        setUser(null); // Reset user state on logout
    };

    useEffect(() => {
        const userAuthentication = async () => {
            if (!token) return;

            try {
                // Updated the route URL to match the backend (if it's under '/api/users')
                const response = await fetch("http://localhost:5002/users", {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.userData); // Correctly set the user data
                }
            } catch (error) {
                console.error("Error fetching user data", error);
                LogoutUser(); // Logout on error
            }
        };

        userAuthentication();
    }, [token, authorizationToken]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, authorizationToken }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
};
// import { createContext, useContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [services, setServices] = useState([]);
//   const authorizationToken = token ? `Bearer ${token}` : "";

//   // Check and use the environment variable correctly
//   const API = import.meta.env.VITE_APP_URI_API;

//   const storeTokenInLS = (serverToken) => {
//     setToken(serverToken);
//     localStorage.setItem("token", serverToken);
//   };

//   const isLoggedIn = !!token;

//   const LogoutUser = () => {
//     setToken("");
//     localStorage.removeItem("token");
//     setUser(null); // Reset user state on logout
//   };

//   const userAuthentication = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`${API}/api/auth/user`, {
//         method: "GET",
//         headers: {
//           Authorization: authorizationToken,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUser(data.userData);
//       } else {
//         console.error("Error fetching user data");
//         LogoutUser(); // Logout if the token is invalid or the user data can't be fetched
//       }
//     } catch (error) {
//       console.error("Error fetching user data", error);
//       LogoutUser(); // Logout on error
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getServices = async () => {
//     try {
//       const response = await fetch(`${API}/api/data/service`, {
//         method: "GET",
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setServices(data.msg);
//       } else {
//         console.error("Error fetching services");
//       }
//     } catch (error) {
//       console.error("Error fetching services", error);
//     }
//   };

//   useEffect(() => {
//     getServices();
//     userAuthentication();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn,
//         storeTokenInLS,
//         LogoutUser,
//         user,
//         services,
//         authorizationToken,
//         isLoading,
//         API, // Ensure API is included in the context value
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const authContextValue = useContext(AuthContext);
//   if (!authContextValue) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return authContextValue;
// };
