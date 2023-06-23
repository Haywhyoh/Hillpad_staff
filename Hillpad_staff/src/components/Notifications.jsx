// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

import '../assets/css/notifications.css';

class Notifications extends Component {
    
    render() { 
        return (
            <>
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="fw-bold py-3 mb-4">
                            Notifications
                            <small className="text-danger"> (3)</small>
                        </h4>
                        <div className="btn-group">
                            <button
                                type="button"
                                className="btn btn-secondary dropdown-toggle mb-4"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                All
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                    >
                                        All
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                    >
                                        Unread
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                    >
                                        Approvals
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                    >
                                        Rejections
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                    >
                                        Submissions
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                    >
                                        Chat
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                    >
                                        Settings
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="card">
                        <div className="">
                            <div className="list-group">
                                <a
                                    href="{% url 'staff_notification_detail' 1 %}"
                                    className="list-group-item list-group-item-action flex-column align-items-start notification-list--read"
                                >
                                    <div className="d-flex justify-content-between w-100">
                                        <h6>
                                            <i className="bx bxs-school me-2"></i>
                                            Approval: Toronto Metropolitan
                                            University
                                        </h6>
                                        <small className="text-muted">
                                            1 hour ago
                                        </small>
                                    </div>
                                    <p className="mb-1">
                                        Your school entry: Toronto Metropolitan
                                        University has been reviewed and
                                        approved. Click on the link below to see
                                        the live version. You can also submit
                                        changes to this entry if the ...
                                    </p>
                                    <small className="text-muted">Approval</small>
                                </a>
                                <a
                                    href="{% url 'staff_notification_detail' 1 %}"
                                    className="list-group-item list-group-item-action flex-column align-items-start notification-list--read"
                                >
                                    <div className="d-flex justify-content-between w-100">
                                        <h6>
                                            <i className="bx bxs-graduation me-2"></i>
                                            Submission: Electrical Engineering -
                                            University of Fairfax
                                        </h6>
                                        <small className="text-muted">
                                            22 hours ago
                                        </small>
                                    </div>
                                    <p className="mb-1">
                                        Your course entry: Electrical
                                        Engineering at University of Fairfax has
                                        been submitted successfully and is now
                                        under review. You can no longer make
                                        changes to this entry until after ...
                                    </p>
                                    <small className="text-muted">Submission</small>
                                </a>
                                <a
                                    href="{% url 'staff_notification_detail' 1 %}"
                                    className="list-group-item list-group-item-action flex-column align-items-start notification-list--unread"
                                >
                                    <div className="d-flex justify-content-between w-100">
                                        <h6>
                                            <i className="bx bxs-cog me-2"></i>
                                            Password Changed
                                        </h6>
                                        <small className="text-muted">
                                            3 days ago
                                        </small>
                                    </div>
                                    <p className="mb-1">
                                        Your password was changed successfully.
                                        If you did not change your password
                                        please contact support immediately to
                                        report this account activity. You are
                                        partly responsible for ...
                                    </p>
                                    <small className="text-muted">Settings</small>
                                </a>
                                <a
                                    href="{% url 'staff_notification_detail' 1 %}"
                                    className="list-group-item list-group-item-action flex-column align-items-start notification-list--read"
                                >
                                    <div className="d-flex justify-content-between w-100">
                                        <h6>
                                            <i className="bx bxs-message-dots me-2"></i>
                                            Message from Jane Doe
                                        </h6>
                                        <small className="text-muted">
                                            6 days ago
                                        </small>
                                    </div>
                                    <p className="mb-1">
                                        You have a new message from Jane Doe.
                                        Click on the link below to go to your
                                        chat.
                                    </p>
                                    <small className="text-muted">Chat</small>
                                </a>
                                <a
                                    href="{% url 'staff_notification_detail' 1 %}"
                                    className="list-group-item list-group-item-action flex-column align-items-start notification-list--read"
                                >
                                    <div className="d-flex justify-content-between w-100">
                                        <h6>
                                            <i className="bx bxs-graduation me-2"></i>
                                            Rejection: Corporate Finance -
                                            Imperial College London
                                        </h6>
                                        <small className="text-muted">
                                            2 weeks ago
                                        </small>
                                    </div>
                                    <p className="mb-1">
                                        Your course entry: Corporate Finance at
                                        Imperial College London was rejected.
                                        Please check the reasons for rejection
                                        below and review your submission
                                        accordingly.
                                    </p>
                                    <small className="text-muted">Rejection</small>
                                </a>
                                <a
                                    href="{% url 'staff_notification_detail' 1 %}"
                                    className="list-group-item list-group-item-action flex-column align-items-start notification-list--unread"
                                >
                                    <div className="d-flex justify-content-between w-100">
                                        <h6>
                                            <i className="bx bxs-school me-2"></i>
                                            Approval: Toronto Metropolitan
                                            University
                                        </h6>
                                        <small className="text-muted">
                                            1 hour ago
                                        </small>
                                    </div>
                                    <p className="mb-1">
                                        Your school entry: Toronto Metropolitan
                                        University has been reviewed and
                                        approved. Click on the link below to see
                                        the live version. You can also submit
                                        changes to this entry if the ...
                                    </p>
                                    <small className="text-muted">Approval</small>
                                </a>
                                <a
                                    href="{% url 'staff_notification_detail' 1 %}"
                                    className="list-group-item list-group-item-action flex-column align-items-start notification-list--unread"
                                >
                                    <div className="d-flex justify-content-between w-100">
                                        <h6>
                                            <i className="bx bxs-graduation me-2"></i>
                                            Submission: Electrical Engineering -
                                            University of Fairfax
                                        </h6>
                                        <small className="text-muted">
                                            22 hours ago
                                        </small>
                                    </div>
                                    <p className="mb-1">
                                        Your course entry: Electrical
                                        Engineering at University of Fairfax has
                                        been submitted successfully and is now
                                        under review. You can no longer make
                                        changes to this entry until after ...
                                    </p>
                                    <small className="text-muted">Submission</small>
                                </a>
                                <a
                                    href="{% url 'staff_notification_detail' 1 %}"
                                    className="list-group-item list-group-item-action flex-column align-items-start notification-list--read"
                                >
                                    <div className="d-flex justify-content-between w-100">
                                        <h6>
                                            <i className="bx bxs-cog me-2"></i>
                                            Password Changed
                                        </h6>
                                        <small className="text-muted">
                                            3 days ago
                                        </small>
                                    </div>
                                    <p className="mb-1">
                                        Your password was changed successfully.
                                        If you did not change your password
                                        please contact support immediately to
                                        report this account activity. You are
                                        partly responsible for ...
                                    </p>
                                    <small className="text-muted">Settings</small>
                                </a>
                                <a
                                    href="{% url 'staff_notification_detail' 1 %}"
                                    className="list-group-item list-group-item-action flex-column align-items-start notification-list--read"
                                >
                                    <div className="d-flex justify-content-between w-100">
                                        <h6>
                                            <i className="bx bxs-message-dots me-2"></i>
                                            Message from Jane Doe
                                        </h6>
                                        <small className="text-muted">
                                            6 days ago
                                        </small>
                                    </div>
                                    <p className="mb-1">
                                        You have a new message from Jane Doe.
                                        Click on the link below to go to your
                                        chat.
                                    </p>
                                    <small className="text-muted">Chat</small>
                                </a>
                                <a
                                    href="{% url 'staff_notification_detail' 1 %}"
                                    className="list-group-item list-group-item-action flex-column align-items-start notification-list--read"
                                >
                                    <div className="d-flex justify-content-between w-100">
                                        <h6>
                                            <i className="bx bxs-graduation me-2"></i>
                                            Rejection: Corporate Finance -
                                            Imperial College London
                                        </h6>
                                        <small className="text-muted">
                                            2 weeks ago
                                        </small>
                                    </div>
                                    <p className="mb-1">
                                        You course entry: Corporate Finance at
                                        Imperial College London was rejected.
                                        Please check the reasons for rejection
                                        below and review your submission
                                        accordingly.
                                    </p>
                                    <small className="text-muted">Rejection</small>
                                </a>
                            </div>
                        </div>
                    </div>

                    <nav aria-label="Page navigation" className="my-4">
                        <ul className="pagination justify-content-center">
                            <li className="page-item prev">
                                <a className="page-link" href="javascript:void(0);">
                                    <i className="tf-icon bx bx-chevrons-left"></i>
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="javascript:void(0);">
                                    1
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="javascript:void(0);">
                                    2
                                </a>
                            </li>
                            <li className="page-item active">
                                <a className="page-link" href="javascript:void(0);">
                                    3
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="javascript:void(0);">
                                    4
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="javascript:void(0);">
                                    5
                                </a>
                            </li>
                            <li className="page-item next">
                                <a className="page-link" href="javascript:void(0);">
                                    <i className="tf-icon bx bx-chevrons-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </>
        );
    }
}
 
export default Notifications;