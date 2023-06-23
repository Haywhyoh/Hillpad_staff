// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import hillpadLogo from '../assets/img/hillpad/logos/hillpad-transparent.png';

import MenuItem from './MenuItem.jsx';


class Sidebar extends Component {
     
    render() {
        return (
            <>
                <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
                    <div className="app-brand demo">
                        <Link to="/" className="app-brand-link">
                            <img width="80%" src={ hillpadLogo } className="d-block" alt="HillPad logo" />
                        </Link>

                        <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                            <i className="bx bx-chevron-left bx-sm align-middle"></i>
                        </a>
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
                        <MenuItem entryName="Schools" entryURL="/schools" entryIcon="bxs-school" />
                        <MenuItem entryName="Disciplines" entryURL="/disciplines" entryIcon="bx-cabinet" />
                        <MenuItem entryName="Degree types" entryURL="/degree-types" entryIcon="bxs-graduation" />
                        <MenuItem entryName="Countries" entryURL="/countries" entryIcon="bx-globe" />

                        
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
}
 
export default Sidebar;
