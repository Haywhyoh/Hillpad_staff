// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

import hillpadLogo from '../assets/img/hillpad/logos/hillpad-transparent.png';

import MenuItem from './MenuItem.jsx';


class Sidebar extends Component {
     
    render() {
        const entries = [
            ["Courses", "bx-book-open"],
            ["Schools", "bxs-school"],
            ["Disciplines", "bx-cabinet"],
            ["DegreeTypes", "bxs-graduation"],
            ["Countries", "bx-globe"]
        ];
        
        return (
            <>
                <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
                    <div className="app-brand demo">
                        <a href="/" className="app-brand-link">
                            <img width="80%" src={ hillpadLogo } className="d-block" alt="HillPad logo" />
                        </a>

                        <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                            <i className="bx bx-chevron-left bx-sm align-middle"></i>
                        </a>
                    </div>

                    <div className="menu-inner-shadow"></div>

                    <ul className="menu-inner py-1">
                        
                        {/* Dashboard */}
                        <li id="menu-item-dashboard" className="menu-item mt-4">
                            <a href="/" className="menu-link">
                                <i className="menu-icon tf-icons bx bx-home-circle"></i>
                                <div data-i18n="Analytics">Dashboard</div>
                            </a>
                        </li>

                        {/* Entries */}
                        <li className="menu-header small text-uppercase">
                            <span className="menu-header-text">Entries</span>
                        </li>

                        {entries.map(entry => 
                            <MenuItem 
                                key={entries.indexOf(entry)}
                                itemName={entry[0]}
                                iconName={entry[1]}
                            />
                        )}

                        
                        {/* Account */}
                        <li className="menu-header small text-uppercase">
                            <span className="menu-header-text">Account</span>
                        </li>

                        <li id="menu-item-notifications" className="menu-item">
                            <a href="/" className="menu-link">
                                <i className="menu-icon tf-icons bx bx-bell"></i>
                                <div data-i18n="Notifications">Notifications</div>
                            </a>
                        </li>
                        <li id="menu-item-chat" className="menu-item">
                            <a href="#" className="menu-link">
                                <i className="menu-icon tf-icons bx bx-message-rounded-dots"></i>
                                <div data-i18n="Chat">Chat</div>
                            </a>
                        </li>


                        {/* Misc */}
                        <li className="menu-header small text-uppercase">
                            <span className="menu-header-text">Misc</span>
                        </li>
                        <li id="menu-item-support" className="menu-item">
                            <a href="https://github.com/themeselection/sneat-html-admin-template-free/issues" target="_blank" rel="noreferrer" className="menu-link">
                                <i className="menu-icon tf-icons bx bx-support"></i>
                                <div data-i18n="Support">Support</div>
                            </a>
                        </li>
                        <li id="menu-item-privacy-policy" className="menu-item">
                            <a href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                                target="_blank" rel="noreferrer" className="menu-link">
                                <i className="menu-icon tf-icons bx bx-file"></i>
                                <div data-i18n="Privacy Policy">
                                    Privacy Policy
                                </div>
                            </a>
                        </li>
                    </ul>

                </aside>
            </>
        );
    }
}
 
export default Sidebar;
