// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

import heroImageLight from '../assets/img/illustrations/man-with-laptop-light.png';
import bachelorsImage from '../assets/img/icons/unicons/bachelors.svg';
import mastersImage from '../assets/img/icons/unicons/masters.svg';
import doctoratesImage from '../assets/img/icons/unicons/doctorates.svg';
import schoolsImage from '../assets/img/icons/unicons/schools.svg';
import settingsImage from '../assets/img/icons/notifications/settings.svg';
import messagesImage from '../assets/img/icons/notifications/messages.svg';
import useAuth from '../hooks/useAuth';

// import '../assets/js/dashboards-analytics.js';

const Dashboard = () => {
    const { user } = useAuth();
 
    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y pb-0">
                <div className="row">
                    
                    {/* Welcome Card */}
                    <div className="col-lg-8 mb-4 order-0">
                        <div className="card">
                            <div className="d-flex align-items-end row">
                                <div className="col-sm-7">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">
                                            Welcome {user.first_name}!
                                        </h5>
                                        <p className="mb-4">
                                            You have
                                            <span className="fw-bold"> 4 </span>
                                            unread notifications. Check
                                            your notifications for important information.
                                        </p>

                                        <a href="/" className="btn btn-sm btn-outline-primary">
                                            View Notifications
                                        </a>
                                    </div>
                                </div>
                                <div className="col-sm-5 text-center text-sm-left">
                                    <div className="card-body pb-0 px-0 px-md-4">
                                        <img src={heroImageLight}
                                            height="140" alt="View Badge User"
                                            data-app-dark-img={heroImageLight}
                                            data-app-light-img={heroImageLight} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Report Card */}
                    <div className="col-lg-4 col-md-4 order-1 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <div
                                    className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                                    <div
                                        className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                                        <div className="card-title">
                                            <h5 className="text-nowrap mb-2">
                                                Profile Report
                                            </h5>
                                            <span className="badge bg-label-warning rounded-pill">
                                                Year 2023
                                            </span>
                                        </div>
                                        <div className="mt-sm-auto">
                                            <small className="text-success text-nowrap fw-semibold">
                                                Courses Added</small>
                                            <h3 className="mb-0">
                                                62
                                            </h3>
                                        </div>
                                    </div>
                                    <div id="profileReportChart"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-8 order-2 order-md-2 mb-4">
                        <div className="row">
                            <div className="col-6 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <a href="/" className="stretched-link">
                                            <div className="card-title d-flex align-items-start justify-content-between">
                                                <div className="avatar flex-shrink-0">
                                                    <img src={bachelorsImage}
                                                        alt="Bachelors" className="rounded" />
                                                </div>

                                            </div>
                                            <div className="card-title">
                                                <h5 className="text-nowrap mb-2">
                                                    Bachelors
                                                </h5>
                                            </div>
                                            <div className="d-flex align-items-start justify-content-between">
                                                <div>
                                                    <span className="d-block mb-1 text-success">Published</span>
                                                    <h3 className="card-title text-nowrap mb-2">
                                                        89
                                                    </h3>
                                                </div>
                                                <div>
                                                    <span className="d-block mb-1 text-warning">Under Review</span>
                                                    <h3 className="card-title text-nowrap mb-2">
                                                        21
                                                    </h3>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <a href="/" className="stretched-link">
                                            <div className="card-title d-flex align-items-start justify-content-between">
                                                <div className="avatar flex-shrink-0">
                                                    <img src={mastersImage}
                                                        alt="Masters" className="rounded" />
                                                </div>
                                            </div>
                                            <div className="card-title">
                                                <h5 className="text-nowrap mb-2">
                                                    Masters
                                                </h5>
                                            </div>
                                            <div className="d-flex align-items-start justify-content-between">
                                                <div>
                                                    <span className="d-block mb-1 text-success">Published</span>
                                                    <h3 className="card-title text-nowrap mb-2">
                                                        65
                                                    </h3>
                                                </div>
                                                <div>
                                                    <span className="d-block mb-1 text-warning">Under Review</span>
                                                    <h3 className="card-title text-nowrap mb-2">
                                                        2
                                                    </h3>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <a href="{% url 'staff_courses_listing' %}" className="stretched-link">
                                            <div className="card-title d-flex align-items-start justify-content-between">
                                                <div className="avatar flex-shrink-0">
                                                    <img src={doctoratesImage}
                                                        alt="Doctorates" className="rounded" />
                                                </div>
                                            </div>
                                            <div className="card-title">
                                                <h5 className="text-nowrap mb-2">
                                                    Doctorates
                                                </h5>
                                            </div>
                                            <div className="d-flex align-items-start justify-content-between">
                                                <div>
                                                    <span className="d-block mb-1 text-success">Published</span>
                                                    <h3 className="card-title text-nowrap mb-2">
                                                        27
                                                    </h3>
                                                </div>
                                                <div>
                                                    <span className="d-block mb-1 text-warning">Under Review</span>
                                                    <h3 className="card-title text-nowrap mb-2">
                                                        0
                                                    </h3>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <a href="/" className="stretched-link">
                                            <div className="card-title d-flex align-items-start justify-content-between">
                                                <div className="avatar flex-shrink-0">
                                                    <img src={schoolsImage}
                                                        alt="Schools" className="rounded" />
                                                </div>
                                            </div>
                                            <div className="card-title">
                                                <h5 className="text-nowrap mb-2">
                                                    Schools
                                                </h5>
                                            </div>
                                            <div className="d-flex align-items-start justify-content-between">
                                                <div>
                                                    <span className="d-block mb-1 text-success">Published</span>
                                                    <h3 className="card-title text-nowrap mb-2">
                                                        13
                                                    </h3>
                                                </div>
                                                <div>
                                                    <span className="d-block mb-1 text-warning">Under Review</span>
                                                    <h3 className="card-title text-nowrap mb-2">
                                                        1
                                                    </h3>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-8 col-lg-4 order-3 order-md-3">
                        <div className="card">
                            <div className="card-header d-flex align-items-center justify-content-between">
                                <h5 className="card-title m-0 me-2">
                                    Notifications
                                </h5>
                                <div className="dropdown">
                                    <button className="btn p-0" type="button" id="transactionID"
                                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="transactionID">
                                        <a className="dropdown-item" href="/">View all</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush">
                                    <a href="/" className="list-group-item list-group-item-action border-0 d-flex">
                                        <div className="avatar flex-shrink-0 me-3">
                                            <img src={schoolsImage} alt="User"
                                                className="rounded" />
                                        </div>
                                        <div
                                            className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <small className="text-muted d-block mb-1">1 hour ago</small>
                                                <h6 className="mb-0">
                                                    Toronto Metropolitan University
                                                </h6>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <h6 className="mb-0">

                                                </h6>
                                                <span className="text-muted">Approval</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="/" className="list-group-item list-group-item-action border-0 d-flex">
                                        <div className="avatar flex-shrink-0 me-3">
                                            <img src={mastersImage} alt="User"
                                                className="rounded" />
                                        </div>
                                        <div
                                            className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <small className="text-muted d-block mb-1">22 hours ago</small>
                                                <h6 className="mb-0">
                                                    Electrical Engineering
                                                </h6>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <span className="text-muted">Submission</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="/" className="list-group-item list-group-item-action border-0 d-flex">
                                        <div className="avatar flex-shrink-0 me-3">
                                            <img src={settingsImage} alt="User"
                                                className="rounded" />
                                        </div>
                                        <div
                                            className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <small className="text-muted d-block mb-1">3 days ago</small>
                                                <h6 className="mb-0">
                                                    Password changed
                                                </h6>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <span className="text-muted">Settings</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="/" className="list-group-item list-group-item-action border-0 d-flex">
                                        <div className="avatar flex-shrink-0 me-3">
                                            <img src={messagesImage} alt="User"
                                                className="rounded" />
                                        </div>
                                        <div
                                            className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <small className="text-muted d-block mb-1">6 days ago</small>
                                                <h6 className="mb-0">
                                                    Message from Jane Doe
                                                </h6>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <span className="text-muted">Chat</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="/" className="list-group-item list-group-item-action border-0 d-flex">
                                        <div className="avatar flex-shrink-0 me-3">
                                            <img src={bachelorsImage} alt="User"
                                                className="rounded" />
                                        </div>
                                        <div
                                            className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <small className="text-muted d-block mb-1">2 weeks ago</small>
                                                <h6 className="mb-0">
                                                    Corporate Finance
                                                </h6>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <span className="text-muted">Rejection</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </>
    );
}
 
export default Dashboard;
