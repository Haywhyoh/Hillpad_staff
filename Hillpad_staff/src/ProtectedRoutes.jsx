import { Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth.js";

import Sidebar from './components/Sidebar.jsx';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import DegreeTypes from './components/DegreeTypes';
import Countries from './components/Countries';
import Notifications from './components/Notifications';
import Footer from './components/Footer';
import CourseRoutes from './components/course/CourseRoutes';
import SchoolRoutes from './components/school/SchoolRoutes.jsx';
import DisciplineRoutes from './components/discipline/DisciplineRoutes';
import Logout from "./components/Logout.jsx";

function ProtectedRoutes() {
    let auth = useAuth();

    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Sidebar />
                    <div className="layout-page">
                        <NavBar user={auth.user} />
                        <div className="content-wrapper">

                            <Routes>
                                <Route
                                    path="/logout"
                                    element={<Logout />}
                                />
                                <Route
                                    path="/course/*"
                                    element={<CourseRoutes />}
                                />
                                <Route
                                    path="/school/*"
                                    element={<SchoolRoutes />}
                                />
                                <Route
                                    path="/discipline/*"
                                    element={<DisciplineRoutes />}
                                />
                                <Route
                                    path="/degree-types"
                                    element={<DegreeTypes />}
                                />
                                <Route
                                    path="/countries"
                                    element={<Countries />}
                                />
                                <Route
                                    path="/notifications"
                                    element={<Notifications />}
                                />
                                <Route
                                    path="/"
                                    element={<Dashboard />}
                                />
                            </Routes>

                            <Footer />

                            <div className="content-backdrop fade"></div>
                        </div>
                    </div>
                </div>
                <div className="layout-overlay layout-menu-toggle"></div>
            </div>
        </>
    );
}

export default ProtectedRoutes;
