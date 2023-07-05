import { Route, Routes, Navigate } from "react-router-dom";

import Sidebar from './components/Sidebar.jsx';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Schools from './components/Schools';
import Disciplines from './components/Disciplines';
import DegreeTypes from './components/DegreeTypes';
import Countries from './components/Countries';
import Notifications from './components/Notifications';
import Footer from './components/Footer';
import CourseRoutes from './components/course/CourseRoutes';

function ProtectedRoutes({ user }) {
    
    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Sidebar />
                    <div className="layout-page">
                        <NavBar user={user} />
                        <div className="content-wrapper">



                            <Routes>
                                <Route
                                    path="/course/*"
                                    element={<CourseRoutes />}
                                />
                                <Route path="/schools" element={<Schools />} />
                                <Route
                                    path="/disciplines"
                                    element={<Disciplines />}
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
                                <Route path="/" element={<Dashboard />} />
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
