import { Routes, Route } from "react-router-dom";

import ListUsers from "./ListUsers";
import CreateUser from "./CreateUser";


const UserRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ListUsers />} />
                <Route path="/create" element={<CreateUser />} />
            </Routes>
        </>
    );
}
 
export default UserRoutes;