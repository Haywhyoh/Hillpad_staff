import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import Error405 from "../errorPages/Error405";
import Spinner from "../common/Spinner";

import useAuth from "../../hooks/useAuth";
import userService from "../../services/api/userService";

import userAvatar from "../../assets/img/avatars/user-avatar.jpg";


const DetailUser = () => {

    const params = useParams();
    const userID = params.userID;
    
    let location = useLocation();
    let navigate = useNavigate();
    const auth = useAuth();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("account");

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                const response = await userService.retrieveUser(userID);
                if (response.status === 200) {
                    setUser(response.data);
                }
            } catch (ex) {
                if (ex.response.status === 401) {
                    navigate("/login", {
                        state: { from: location },
                        replace: true
                    });
                }
                else if (ex.response.status === 403) {
                    console.error("Unauthorized to view this user");
                }
                else {
                    console.log(ex);
                }
            }
            setLoading(false);
        }
        fetchData();
    }, [location, navigate, userID]);

    if (auth.user && auth.user.role === "SPECIALIST") {
        return (
            <Error405 />
        );
    }

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    };

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="py-3 mb-4">
                    Staff Management - {loading? <Spinner size="sm" addClasses="mx-2" /> : user.first_name + " " + user.last_name}
                </h4>

                <div className="row align-items-center">    
                    <div className="col-xl-4 col-lg-5 col-md-5 order-1 order-md-0">               
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="user-avatar-section">
                                    <div className=" d-flex align-items-center flex-column">
                                        <img className="img-fluid rounded my-4" src={userAvatar} height="110" width="110" alt="User avatar" />
                                        <div className="user-info text-center">
                                            <h4 className="mb-2">{loading? <Spinner size="sm" /> : user.first_name + " " + user.last_name}</h4>
                                            <span className="badge bg-label-info">{loading? <Spinner size="sm" addClasses="mx-2" /> : user.role}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-around flex-wrap my-4 py-3">
                                    <div className="d-flex align-items-start me-4 mt-3 gap-3">
                                        <span className="badge bg-label-primary p-2 rounded"><i className="bx bx-book-open bx-sm"></i></span>
                                        <div>
                                            <h5 className="mb-0">4592</h5>
                                            <span>Courses</span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-start mt-3 gap-3">
                                        <span className="badge bg-label-primary p-2 rounded"><i className="bx bxs-school bx-sm"></i></span>
                                        <div>
                                            <h5 className="mb-0">56</h5>
                                            <span>Schools</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                         
                    <div className="col-xl-8 col-lg-7 col-md-7 order-0 order-md-1">
                       
                        <ul className="nav nav-pills flex-column flex-md-row mb-3">
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === "account" ? "active" : ""}`} onClick={() => setActiveTab("account")}>
                                    <i className="bx bx-user me-1"></i>
                                    Account
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === "security" ? "active" : ""}`} onClick={() => setActiveTab("security")}>
                                    <i className="bx bx-lock-alt me-1"></i>
                                    Security
                                </a>
                            </li>
                        </ul>

                    
                        {activeTab === "account" &&
                            <div className="card mb-4">
                                <div className="card-header">
                                    <h5 className="card-title border-bottom pb-2 mb-0">Account Details</h5>
                                </div>
                                <div className="info-container mx-4">
                                    <ul className="list-unstyled">
                                        <li className="mb-3">
                                            <span className="fw-bold me-2">First Name:</span>
                                            <span>{loading? <Spinner size="sm" /> : user.first_name}</span>
                                        </li>
                                        <li className="mb-3">
                                            <span className="fw-bold me-2">Last Name:</span>
                                            <span>{loading? <Spinner size="sm" /> : user.last_name}</span>
                                        </li>
                                        <li className="mb-3">
                                            <span className="fw-bold me-2">Email:</span>
                                            <span>{loading? <Spinner size="sm" /> : user.email}</span>
                                        </li>
                                        <li className="mb-3">
                                            <span className="fw-bold me-2">Role:</span>
                                            <span className="badge bg-label-info">{loading? <Spinner size="sm" /> : user.role}</span>
                                        </li>
                                        <li className="mb-3">
                                            <span className="fw-bold me-2">Date Created:</span>
                                            <span>{loading? <Spinner size="sm" /> : formatDate(user.created_at)}</span>
                                        </li>
                                    </ul>
                                    <div className="d-flex justify-content-center pt-3 mb-4">
                                        <a href="javascript:;" className="btn btn-primary me-3">Edit Account Details</a>
                                    </div>
                                </div>
                            </div>
                        }

                        {activeTab === "security" &&
                            <div className="card mb-4">
                                <h5 className="card-header">Change Password</h5>
                                <div className="card-body">
                                    <form id="formChangePassword" method="POST" onSubmit="return false" className="fv-plugins-bootstrap5 fv-plugins-framework" noValidate="novalidate">
                                        <div className="alert alert-warning" role="alert">
                                            <h6 className="alert-heading mb-1">Ensure that these requirements are met</h6>
                                            <span>Minimum 8 characters</span>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-12 col-sm-6 form-password-toggle fv-plugins-icon-container">
                                            <label className="form-label" htmlFor="newPassword">New Password</label>
                                            <div className="input-group input-group-merge has-validation">
                                                <input className="form-control" type="password" id="newPassword" name="newPassword" placeholder="············" />
                                                <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                                            </div><div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                            </div>

                                            <div className="mb-3 col-12 col-sm-6 form-password-toggle fv-plugins-icon-container">
                                            <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
                                            <div className="input-group input-group-merge has-validation">
                                                <input className="form-control" type="password" name="confirmPassword" id="confirmPassword" placeholder="············" />
                                                <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                                            </div><div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                            </div>
                                            <div>
                                            <button type="submit" className="btn btn-primary me-2">Change Password</button>
                                            </div>
                                        </div>
                                        <input type="hidden" />
                                    </form>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default DetailUser;