// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

import avatar1 from '../assets/img/avatars/1.png';


class NavBar extends Component {
    
    render() { 
        return (
            <>
                <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                    id="layout-navbar">
                    <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                        <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                            <i className="bx bx-menu bx-sm"></i>
                        </a>
                    </div>

                    <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                        
                        {/* Search */}
                        <div className="navbar-nav align-items-center">
                            
                            <li className="nav-item me-3">
                                <span id="date-span" className="text-muted fw-bold"></span>
                                <span>&nbsp;</span>
                                <span id="time-span" className="text-primary fw-bold"></span>
                                
                            </li>
                        </div>
                        

                        <ul className="navbar-nav flex-row align-items-center ms-auto">
                            
                            <li className="nav-item me-3">
                                <span className="h5 fw-bold text-muted">John Robinson</span>
                                <span className="fw-bold text-muted"><a href="mailto:johnrobinson@hillpad.com">&nbsp;johnrobinson@hillpad.com</a></span>
                            </li>

                            {/* User */}
                            <li className="nav-item navbar-dropdown dropdown-user dropdown">
                                <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);"
                                    data-bs-toggle="dropdown">
                                    <div className="avatar avatar-online">
                                        <img src={avatar1} alt="Account avatar"
                                            className="w-px-40 h-auto rounded-circle" />
                                    </div>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-3">
                                                    <div className="avatar avatar-online">
                                                        <img src={avatar1} alt="Account avatar"
                                                            className="w-px-40 h-auto rounded-circle" />
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <span className="fw-semibold d-block">John Robinson</span>
                                                    <small className="text-muted">Data Entry Specialist</small>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <div className="dropdown-divider"></div>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/">
                                            <span className="d-flex align-items-center align-middle">
                                                <i className="flex-shrink-0 bx bx-bell me-2"></i>
                                                <span className="flex-grow-1 align-middle">Notifications</span>
                                                <span
                                                    className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/">
                                            <i className="bx bx-cog me-2"></i>
                                            <span className="align-middle">Change password</span>
                                        </a>
                                    </li>
                                    <li>
                                        <div className="dropdown-divider"></div>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="auth-login-basic.html">
                                            <i className="bx bx-power-off me-2"></i>
                                            <span className="align-middle">Log Out</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </nav>
            </>

        );
    }
}

export default NavBar;
