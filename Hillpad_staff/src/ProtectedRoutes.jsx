import { Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth.js";

import Sidebar from './components/Sidebar.jsx';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Notifications from './components/Notifications';
import Footer from './components/Footer';
import Logout from "./components/Logout.jsx";

import CourseRoutes from './components/course/CourseRoutes';
import SchoolRoutes from './components/school/SchoolRoutes.jsx';
import CountryRoutes from "./components/country/CountryRoutes.jsx";
import DisciplineRoutes from './components/discipline/DisciplineRoutes';
import DegreeTypeRoutes from "./components/degreeType/DegreeTypeRoutes.jsx";

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
                                    path="/degree-types/*"
                                    element={<DegreeTypeRoutes />}
                                />
                                <Route
                                    path="/country/*"
                                    element={<CountryRoutes />}
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
