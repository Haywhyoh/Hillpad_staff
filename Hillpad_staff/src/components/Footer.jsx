// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';


class Footer extends Component {
    
    render() { 
        const currentYear = new Date().getFullYear();
        
        return (
            <>
                <footer className="content-footer footer bg-footer-theme">
                    <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                        <div className="mb-2 mb-md-0">
                            Copyright &copy; {currentYear} &nbsp;
                            <a
                                href="{% url 'about' %}"
                                target="_blank"
                                className="footer-link fw-bolder"
                            >
                                HillPad Limited. &nbsp;
                            </a>
                            All rights reserved.
                        </div>
                        <div>
                            <a
                                href="https://themeselection.com/license/"
                                className="footer-link me-4"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="https://themeselection.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="footer-link me-4"
                            >
                                Report a bug
                            </a>
                            <a
                                href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                                target="_blank"
                                rel="noreferrer"
                                className="footer-link me-4"
                            >
                                Suggest a feature
                            </a>
                            <a
                                href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                                target="_blank"
                                rel="noreferrer"
                                className="footer-link me-4"
                            >
                                Support
                            </a>
                        </div>
                    </div>
                </footer>
            </>
        );
    }
}
 
export default Footer;