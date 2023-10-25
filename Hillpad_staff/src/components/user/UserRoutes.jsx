import { Routes, Route } from "react-router-dom";

import ListUsers from "./ListUsers";
import CreateUser from "./CreateUser";
import DetailUser from "./DetailUser";


const UserRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ListUsers />} />
                <Route path="/create" element={<CreateUser />} />
                <Route path="/detail/:userID" element={<DetailUser />} />
            </Routes>
        </>
    );
}
 
export default UserRoutes;