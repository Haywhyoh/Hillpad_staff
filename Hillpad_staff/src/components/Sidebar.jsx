import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

import courseService from '../services/api/courseService';
import schoolService from '../services/api/schoolService';
import disciplineService from '../services/api/disciplineService';
import degreeTypeService from '../services/api/degreeTypeService';
import countryService from '../services/api/countryService';
import currencyService from '../services/api/currencyService';

import MenuItem from './MenuItem.jsx';

import hillpadLogo from '../assets/img/hillpad/logos/hillpad-transparent.png';



const Sidebar = () => {
    const { user } = useAuth();
    const location = useLocation();
    let navigate = useNavigate();

    const [courseActions, setCourseActions] = useState(0);
    const [schoolActions, setSchoolActions] = useState(0);
    const [disciplineActions, setDisciplineActions] = useState(0);
    const [degreeTypeActions, setDegreeTypeActions] = useState(0);
    const [countryActions, setCountryActions] = useState(0);
    const [currencyActions, setCurrencyActions] = useState(0);

    useEffect(() => {
        async function fetchActionsStats() {
            try {

                let status;
                if (user.role === "SUPERVISOR") status = "REVIEW";
                else if (user.role === "ADMIN") status = "APPROVED";
                let pageQuery = `status=${status}`;

                let response = await courseService.getCourseDrafts(pageQuery);
                if (response.status === 200) {
                    setCourseActions(response.data.count);
                }

                response = await schoolService.getSchoolDrafts(pageQuery);
                if (response.status === 200) {
                    setSchoolActions(response.data.count);
                }

                if (user.role === "ADMIN") {
                    pageQuery = "status=REVIEW";

                    response = await disciplineService.getDisciplineDrafts(pageQuery);
                    if (response.status === 200) {
                        setDisciplineActions(response.data.count);
                    }

                    response = await degreeTypeService.getDegreeTypeDrafts(pageQuery);
                    if (response.status === 200) {
                        setDegreeTypeActions(response.data.count);
                    }

                    response = await countryService.getCountryDrafts(pageQuery);
                    if (response.status === 200) {
                        setCountryActions(response.data.count);
                    }

                    response = await currencyService.getCurrencyDrafts(pageQuery);
                    if (response.status === 200) {
                        setCurrencyActions(response.data.count);
                    }
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
    }, [navigate, location, user.role]);
     
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
                    <MenuItem entryName="Courses" entryURL="/course" entryIcon="bx-book-open" active={location.pathname === "/course"} />
                    <MenuItem entryName="Schools" entryURL="/school" entryIcon="bxs-school" active={location.pathname === "/school"} />
                    {
                        user.role &&
                        user.role !== "SPECIALIST" &&
                        <>
                            <MenuItem entryName="Disciplines" entryURL="/discipline" entryIcon="bx-cabinet" active={location.pathname === "/discipline"} />
                            <MenuItem entryName="Degree types" entryURL="/degree-type" entryIcon="bxs-graduation" active={location.pathname === "/degree-type"} />
                            <MenuItem entryName="Countries" entryURL="/country" entryIcon="bx-globe" active={location.pathname === "/country"} />
                            <MenuItem entryName="Currencies" entryURL="/currency" entryIcon="bx-dollar-circle" active={location.pathname === "/currency"} />
                        </>
                    }


                    {/* Actions */}
                    {
                        user.role &&
                        user.role !== "SPECIALIST" &&
                        <>
                            <li className="menu-header small text-uppercase">
                                <span className="menu-header-text">Actions</span>
                            </li>
                            <MenuItem entryName="Course Reviews" badge={`${courseActions}`} entryURL="/course/reviews" entryIcon="bx-book-open" active={location.pathname === "/course/reviews"} />
                            <MenuItem entryName="School Reviews" badge={`${schoolActions}`} entryURL="/school/reviews" entryIcon="bxs-school" active={location.pathname === "/school/reviews"} />

                            {
                                user.role === "ADMIN" &&
                                <>
                                    <MenuItem entryName="Discipline Reviews" badge={`${disciplineActions}`} entryURL="/discipline/reviews" entryIcon="bx-cabinet" active={location.pathname === "/discipline/reviews"} />
                                    <MenuItem entryName="Degree Reviews" badge={`${degreeTypeActions}`} entryURL="/degree-type/reviews" entryIcon="bxs-graduation" active={location.pathname === "/degree-type/reviews"} />
                                    <MenuItem entryName="Country Reviews" badge={`${countryActions}`} entryURL="/country/reviews" entryIcon="bx-globe" active={location.pathname === "/country/reviews"} />
                                    <MenuItem entryName="Currency Reviews" badge={`${currencyActions}`} entryURL="/currency/reviews" entryIcon="bx-dollar-circle" active={location.pathname === "/currency/reviews"} />
                                </>
                            }
                        </>
                    }

                    
                    {/* Account */}
                    <li className="menu-header small text-uppercase">
                        <span className="menu-header-text">Account</span>
                    </li>
                    {
                        user.role &&
                        user.role !== "SPECIALIST" &&
                        <>
                            <MenuItem entryName="Staff Administration" entryURL="/user" entryIcon="bx-user" active={location.pathname === "/user"} />
                        </>
                    }
                    <MenuItem entryName="Notifications" entryURL="/notifications" entryIcon="bx-bell" active={location.pathname === "/notifications"} />
                    <MenuItem entryName="Chat" entryURL="/chat" entryIcon="bx-message-rounded-dots" active={location.pathname === "/chat"} />

                    {/* Misc */}
                    <li className="menu-header small text-uppercase">
                        <span className="menu-header-text">Misc</span>
                    </li>
                    <MenuItem entryName="Support" entryURL="/support" entryIcon="bx-support" active={location.pathname === "/support"} />
                    <MenuItem entryName="Privacy Policy" entryURL="/privacy-policy" entryIcon="bx-file" active={location.pathname === "/privacy-policy"} />

                </ul>

            </aside>
        </>
    );

}
 
export default Sidebar;
