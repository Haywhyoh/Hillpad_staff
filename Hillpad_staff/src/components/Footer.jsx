// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Footer extends Component {
    
    render() { 
        const currentYear = new Date().getFullYear();
        
        return (
            <>
                <footer className="content-footer footer bg-footer-theme">
                    <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                        <div className="mb-2 mb-md-0">
                            Copyright &copy; {currentYear} &nbsp;
                            <Link
                                to="https://hillpad.vercel.app"
                                target="_blank"
                                rel="noreferrer"
                                className="footer-link fw-bolder"
                            >
                                HillPad Limited. &nbsp;
                            </Link>
                            All rights reserved.
                        </div>
                        <div>
                            <Link
                                to=""
                                className="footer-link me-4"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to=""
                                className="footer-link me-4"
                            >
                                Report a bug
                            </Link>
                            <Link
                                to=""
                                className="footer-link me-4"
                            >
                                Suggest a feature
                            </Link>
                            <Link
                                to=""
                                className="footer-link me-4"
                            >
                                Support
                            </Link>
                        </div>
                    </div>
                </footer>
            </>
        );
    }
}
 
export default Footer;