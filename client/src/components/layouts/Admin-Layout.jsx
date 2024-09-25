// import { AdminUsers } from "../../pages/Admin-Users";
// import { AdminContacts } from "../../pages/Admin-Contacts";
// import { AdminServices } from "../../pages/Admin-Services";
// import { AdminLayout } from "../../layouts/AdminLayout"; // Assuming AdminLayout is in layouts

import { NavLink,Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { RiContactsBook3Fill } from "react-icons/ri";
import { FcServices } from "react-icons/fc";
import { TiHome } from "react-icons/ti";
export const AdminLayout = () => {
    return (
        <>
            <header>
                <div className="container">
                    <ul>
                        <li>
                            <NavLink to="/admin/users"><FaUser />Users</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/contacts"><RiContactsBook3Fill />Contacts</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/services"><FcServices />Services</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin"><TiHome />Home</NavLink>
                        </li>
                    </ul>
                </div>
            </header>
            <Outlet />
        </>
      
    );
    
};

// You do not need to export `AdminLayout` again if you are using ES6 module syntax.
// export default AdminLayout; // If you want to use default export
``
