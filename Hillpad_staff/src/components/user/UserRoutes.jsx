import { Routes, Route } from "react-router-dom";

import ListUsers from "./ListUsers";


const UserRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ListUsers />} />
            </Routes>
        </>
    );
}
 
export default UserRoutes;