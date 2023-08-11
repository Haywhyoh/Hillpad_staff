import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

import courseService from '../services/api/courseService';
import schoolService from '../services/api/schoolService';

import MenuItem from './MenuItem.jsx';

import hillpadLogo from '../assets/img/hillpad/logos/hillpad-transparent.png';



const Sidebar = () => {
    const { user } = useAuth();
    let navigate = useNavigate();

    const [courseActions, setCourseActions] = useState(0);
    const [schoolActions, setSchoolActions] = useState(0);

    useEffect(() => {
        async function fetchActionsStats() {
            try {

                let status;
                if (user.role === "SUPERVISOR") status = "REVIEW";
                else if (user.role === "ADMIN") status = "APPROVED";
                const pageQuery = `status=${status}`;

                let response = await courseService.getCourseDrafts(pageQuery);
                if (response.status === 200) {
                    setCourseActions(response.data.count);
                }

                response = await schoolService.getSchoolDrafts(pageQuery);
                if (response.status === 200) {
                    setSchoolActions(response.data.count);
                }
            } catch (ex) {
                if (ex.response.status === 401) {
                    navigate("/login", {
                        state: { from: location },
                        replace: true
                    });
                }
                console.log(ex);
            }
        }
        fetchActionsStats();
    }, [navigate, user.role]);
     
    return (
        <>
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
                <div className="app-brand demo">
                    <Link to="/" className="app-brand-link">
                        <img width="80%" src={ hillpadLogo } className="d-block" alt="HillPad logo" />
                    </Link>

                    <Link to="/" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                        <i className="bx bx-chevron-left bx-sm align-middle"></i>
                    </Link>
                </div>

                <div className="menu-inner-shadow"></div>

                <ul className="menu-inner py-1">
                    
                    {/* Dashboard */}
                    <li id="menu-item-dashboard" className="menu-item mt-4">
                        <Link to="/" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-home-circle"></i>
                            <div data-i18n="Analytics">Dashboard</div>
                        </Link>
                    </li>

                    {/* Entries */}
                    <li className="menu-header small text-uppercase">
                        <span className="menu-header-text">Entries</span>
                    </li>
                    <MenuItem entryName="Courses" entryURL="/course" entryIcon="bx-book-open" />
                    <MenuItem entryName="Schools" entryURL="/school" entryIcon="bxs-school" />
                    <MenuItem entryName="Disciplines" entryURL="/discipline" entryIcon="bx-cabinet" />
                    <MenuItem entryName="Degree types" entryURL="/degree-type" entryIcon="bxs-graduation" />
                    <MenuItem entryName="Countries" entryURL="/country" entryIcon="bx-globe" />


                    {/* Actions */}
                    {
                        user.role &&
                        user.role !== "SPECIALIST" &&
                        <>
                            <li className="menu-header small text-uppercase">
                                <span className="menu-header-text">Actions</span>
                            </li>
                            <MenuItem entryName="Course Reviews" badge={`${courseActions}`} entryURL="/course/reviews" entryIcon="bx-book-open" />
                            <MenuItem entryName="School Reviews" badge={`${schoolActions}`} entryURL="/school/reviews" entryIcon="bxs-school" />
                        </>
                    }

                    
                    {/* Account */}
                    <li className="menu-header small text-uppercase">
                        <span className="menu-header-text">Account</span>
                    </li>
                    <MenuItem entryName="Notifications" entryURL="/notifications" entryIcon="bx-bell" />
                    <MenuItem entryName="Chat" entryURL="/chat" entryIcon="bx-message-rounded-dots" />

                    {/* Misc */}
                    <li className="menu-header small text-uppercase">
                        <span className="menu-header-text">Misc</span>
                    </li>
                    <MenuItem entryName="Support" entryURL="/support" entryIcon="bx-support" />
                    <MenuItem entryName="Privacy Policy" entryURL="/privacy-policy" entryIcon="bx-file" />

                </ul>

            </aside>
        </>
    );

}
 
export default Sidebar;
