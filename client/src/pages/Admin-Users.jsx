import { useEffect, useState } from "react";
import { useAuth } from "../store/auth"; // Assuming useAuth provides the token
import { Link } from "react-router-dom";
import { AdminUpdate } from "./Admin-Update";

export const AdminUsers = () => {
    const { authorizationToken } = useAuth(); // Get token from useAuth
    const [user, setUser] = useState([]); // Initialize as an empty array

    const getAllUsers = async () => {
       

        try {
            const response = await fetch("http://localhost:5002/admin/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken, // Add token here
                },
            });
            const data = await response.json();
            console.log(data);
            // Ensure the data is an array before setting it to the state
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    };


    const getSingleUserData = async (id) => {
        try {
          const response = await fetch(`http://localhost:5002/admin/users/update/${id}`, {
            method: "GET",
            headers: {
              Authorization: authorizationToken,
            },
          });
          const data = await response.json();
          console.log(`users single data:  ${data}`);
          setData(data);
          
          if (response.ok) {
              <AdminUpdate id={id}/>
            }


        } catch (error) {
          console.log(error);
        }
      };

    const deleteUser=async (id)=>{
        const response = await fetch(`http://localhost:5002/admin/users/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: authorizationToken,
                 // Add token here
                 "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);
        if(response.ok){
            getAllUsers();
        }
    }
    useEffect(() => {
        getAllUsers();
    }, [authorizationToken]); // Add token as a dependency to re-fetch when token changes

    return (
        <>

        <section className="admin-users-section">
            <div className="container">
                <h1>Admin User Data</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Phone</th>
                           <th>Update</th>
                           <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {user.map((curUser,index)=>{
                        return <tr key={index}>
                            <td>{curUser.username} </td>
                            <td>{curUser.email}</td>
                            <td>{curUser.phone}</td>
                            <td><Link to={`/adminupdate/${curUser._id}`}>Edit</Link></td>
                            <td><button onClick={()=> deleteUser(curUser._id)}>Delete</button> </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </section>

           
        </>
    );
};
