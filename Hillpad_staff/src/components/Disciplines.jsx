// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

import avatar5 from '../assets/img/avatars/5.png';
import avatar6 from '../assets/img/avatars/6.png';
import avatar7 from '../assets/img/avatars/7.png';

class Disciplines extends Component {
    
    render() { 
        return (
            <>
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="fw-bold py-3 mb-4">Disciplines</h4>
                        <a href="{% url 'staff_discipline_create' %}">
                            <button
                                type="button"
                                className="btn btn-secondary mb-4"
                            >
                                <span className="tf-icons bx bx-plus"></span>&nbsp;
                                Add Discipline
                            </button>
                        </a>
                    </div>

                    <div className="card">
                        <div className="mt-4">
                            <form action="" method="GET">
                                <div className="mb-3 px-4 row">
                                    <div className="col-md-4">
                                        <input
                                            className="form-control"
                                            type="search"
                                            placeholder="Search..."
                                            id="html5-search-input"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="table-responsive text-nowrap">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Discipline</th>
                                        <th>Number of Courses</th>
                                        <th>Author</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    <tr>
                                        <td onClick="#">
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                            <strong>
                                                Agriculture and Forestry
                                            </strong>
                                        </td>
                                        <td>23,450</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li
                                                    data-bs-toggle="tooltip"
                                                    data-popup="tooltip-custom"
                                                    data-bs-placement="top"
                                                    className="avatar avatar-xs pull-up"
                                                    title="Lilian Fuller"
                                                >
                                                    <img
                                                        src={avatar5}
                                                        alt="Avatar"
                                                        className="rounded-circle"
                                                    />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">
                                                Approved
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a
                                                        className="dropdown-item"
                                                        href="{% url 'staff_discipline_detail' 1 %}"
                                                    >
                                                        <i className="bx bx-edit-alt me-1"></i>
                                                        Edit
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        href="{% url 'discipline_detail' %}"
                                                        target="_blank"
                                                    >
                                                        <i className="bx bx-window me-1"></i>
                                                        View live
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                            <strong>
                                                Applied Sciences and Professions
                                            </strong>
                                        </td>
                                        <td>92,132</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li
                                                    data-bs-toggle="tooltip"
                                                    data-popup="tooltip-custom"
                                                    data-bs-placement="top"
                                                    className="avatar avatar-xs pull-up"
                                                    title="Lilian Fuller"
                                                >
                                                    <img
                                                        src={avatar6}
                                                        alt="Avatar"
                                                        className="rounded-circle"
                                                    />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-primary me-1">
                                                Under Review
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-edit-alt me-1"></i>
                                                        Edit
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-file-find me-1"></i>
                                                        Preview
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                            <strong>
                                                Art, Design and Architecture
                                            </strong>
                                        </td>
                                        <td>68,249</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li
                                                    data-bs-toggle="tooltip"
                                                    data-popup="tooltip-custom"
                                                    data-bs-placement="top"
                                                    className="avatar avatar-xs pull-up"
                                                    title="Lilian Fuller"
                                                >
                                                    <img
                                                        src={avatar5}
                                                        alt="Avatar"
                                                        className="rounded-circle"
                                                    />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">
                                                Approved
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-edit-alt me-1"></i>
                                                        Edit
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-window me-1"></i>
                                                        View live
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                            <strong>
                                                Business and Management
                                            </strong>
                                        </td>
                                        <td>243,762</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li
                                                    data-bs-toggle="tooltip"
                                                    data-popup="tooltip-custom"
                                                    data-bs-placement="top"
                                                    className="avatar avatar-xs pull-up"
                                                    title="Lilian Fuller"
                                                >
                                                    <img
                                                        src={avatar7}
                                                        alt="Avatar"
                                                        className="rounded-circle"
                                                    />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-info me-1">
                                                Draft
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-edit-alt me-1"></i>
                                                        Edit
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-file-find me-1"></i>
                                                        Preview
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                            <strong>
                                                Computer Science and IT
                                            </strong>
                                        </td>
                                        <td>143,592</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li
                                                    data-bs-toggle="tooltip"
                                                    data-popup="tooltip-custom"
                                                    data-bs-placement="top"
                                                    className="avatar avatar-xs pull-up"
                                                    title="Lilian Fuller"
                                                >
                                                    <img
                                                        src={avatar5}
                                                        alt="Avatar"
                                                        className="rounded-circle"
                                                    />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">
                                                Approved
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-edit-alt me-1"></i>
                                                        Edit
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-window me-1"></i>
                                                        View live
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                            <strong>
                                                Education and Training
                                            </strong>
                                        </td>
                                        <td>82,346</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li
                                                    data-bs-toggle="tooltip"
                                                    data-popup="tooltip-custom"
                                                    data-bs-placement="top"
                                                    className="avatar avatar-xs pull-up"
                                                    title="Lilian Fuller"
                                                >
                                                    <img
                                                        src={avatar5}
                                                        alt="Avatar"
                                                        className="rounded-circle"
                                                    />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">
                                                Approved
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-edit-alt me-1"></i>
                                                        Edit
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-window me-1"></i>
                                                        View live
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                            <strong>
                                                Engineering and Technology
                                            </strong>
                                        </td>
                                        <td>358,941</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li
                                                    data-bs-toggle="tooltip"
                                                    data-popup="tooltip-custom"
                                                    data-bs-placement="top"
                                                    className="avatar avatar-xs pull-up"
                                                    title="Lilian Fuller"
                                                >
                                                    <img
                                                        src={avatar5}
                                                        alt="Avatar"
                                                        className="rounded-circle"
                                                    />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">
                                                Approved
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-edit-alt me-1"></i>
                                                        Edit
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-window me-1"></i>
                                                        View live
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                            <strong>
                                                Natural Sciences and Mathematics
                                            </strong>
                                        </td>
                                        <td>86,390</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li
                                                    data-bs-toggle="tooltip"
                                                    data-popup="tooltip-custom"
                                                    data-bs-placement="top"
                                                    className="avatar avatar-xs pull-up"
                                                    title="Lilian Fuller"
                                                >
                                                    <img
                                                        src={avatar5}
                                                        alt="Avatar"
                                                        className="rounded-circle"
                                                    />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">
                                                Approved
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-edit-alt me-1"></i>
                                                        Edit
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-window me-1"></i>
                                                        View live
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                            <strong>
                                                Hospitality, Leisure and Sports
                                            </strong>
                                        </td>
                                        <td>92,132</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li
                                                    data-bs-toggle="tooltip"
                                                    data-popup="tooltip-custom"
                                                    data-bs-placement="top"
                                                    className="avatar avatar-xs pull-up"
                                                    title="Lilian Fuller"
                                                >
                                                    <img
                                                        src={avatar5}
                                                        alt="Avatar"
                                                        className="rounded-circle"
                                                    />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">
                                                Approved
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-edit-alt me-1"></i>
                                                        Edit
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-window me-1"></i>
                                                        View live
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                            <strong>
                                                Journalism, Media and
                                                Communication
                                            </strong>
                                        </td>
                                        <td>54,272</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li
                                                    data-bs-toggle="tooltip"
                                                    data-popup="tooltip-custom"
                                                    data-bs-placement="top"
                                                    className="avatar avatar-xs pull-up"
                                                    title="Lilian Fuller"
                                                >
                                                    <img
                                                        src={avatar6}
                                                        alt="Avatar"
                                                        className="rounded-circle"
                                                    />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-primary me-1">
                                                Under Review
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-edit-alt me-1"></i>
                                                        Edit
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-file-find me-1"></i>
                                                        Preview
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                            <strong>
                                                Environmental Sciences
                                            </strong>
                                        </td>
                                        <td>34,132</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li
                                                    data-bs-toggle="tooltip"
                                                    data-popup="tooltip-custom"
                                                    data-bs-placement="top"
                                                    className="avatar avatar-xs pull-up"
                                                    title="Lilian Fuller"
                                                >
                                                    <img
                                                        src={avatar5}
                                                        alt="Avatar"
                                                        className="rounded-circle"
                                                    />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">
                                                Approved
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-edit-alt me-1"></i>
                                                        Edit
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                    >
                                                        <i className="bx bx-window me-1"></i>
                                                        View live
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <nav aria-label="Page navigation" className="my-4">
                            <ul className="pagination justify-content-center">
                                <li className="page-item prev">
                                    <a
                                        className="page-link"
                                        href="javascript:void(0);"
                                    >
                                        <i className="tf-icon bx bx-chevrons-left"></i>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a
                                        className="page-link"
                                        href="javascript:void(0);"
                                    >
                                        1
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a
                                        className="page-link"
                                        href="javascript:void(0);"
                                    >
                                        2
                                    </a>
                                </li>
                                <li className="page-item active">
                                    <a
                                        className="page-link"
                                        href="javascript:void(0);"
                                    >
                                        3
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a
                                        className="page-link"
                                        href="javascript:void(0);"
                                    >
                                        4
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a
                                        className="page-link"
                                        href="javascript:void(0);"
                                    >
                                        5
                                    </a>
                                </li>
                                <li className="page-item next">
                                    <a
                                        className="page-link"
                                        href="javascript:void(0);"
                                    >
                                        <i className="tf-icon bx bx-chevrons-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </>
        );
    }
}

export default Disciplines;
