// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

import avatar5 from '../../assets/img/avatars/5.png';
import avatar6 from '../../assets/img/avatars/6.png';
import avatar7 from '../../assets/img/avatars/7.png';


class ListCourses extends Component {
    state = {  } 
    render() { 
        return (
            <>
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="fw-bold py-3 mb-4">
                            Courses
                        </h4>
                        <a href="#">
                            <button type="button" className="btn btn-secondary mb-4">
                                <span className="tf-icons bx bx-plus"></span>&nbsp; Add Course
                            </button>
                        </a>
                    </div>

                    <div className="card">
                        <div className="mt-4">
                            <form action="" method="GET">
                                <div className="mb-3 px-4 row">
                                    <div className="col-md-4">
                                        <input className="form-control" type="search" placeholder="Search..." id="html5-search-input" />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="table-responsive text-nowrap">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Course Name</th>
                                        <th>School</th>
                                        <th>Author</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    <tr>
                                        <td onClick="#">
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                            <strong>Management Engineering</strong>
                                        </td>
                                        <td>Politecnico di Milano</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar5} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">Approved</span>
                                        </td>
                                        <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#">
                                                    <i className="bx bx-edit-alt me-1"></i>
                                                    Edit
                                                </a>
                                                <a className="dropdown-item" href="#" target="_blank">
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
                                            <strong>International Corporate Finance and Banking</strong>
                                        </td>
                                        <td>University of Glasgow</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar6} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-primary me-1">Under Review</span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                        <i className="bx bx-edit-alt me-1"></i>
                                                        Edit
                                                    </a>
                                                    <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>Management Engineering</strong>
                                        </td>
                                        <td>Politecnico di Milano</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar5} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">Approved</span>
                                        </td>
                                        <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="javascript:void(0);">
                                                    <i className="bx bx-edit-alt me-1"></i>
                                                    Edit
                                                </a>
                                                <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>Computer Science and Engineering</strong>
                                        </td>
                                        <td>University of Fairfax</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar7} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-info me-1">Draft</span>
                                        </td>
                                        <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="javascript:void(0);">
                                                    <i className="bx bx-edit-alt me-1"></i>
                                                    Edit
                                                </a>
                                                <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>Management Engineering</strong>
                                        </td>
                                        <td>Politecnico di Milano</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar5} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">Approved</span>
                                        </td>
                                        <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="javascript:void(0);">
                                                    <i className="bx bx-edit-alt me-1"></i>
                                                    Edit
                                                </a>
                                                <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>Management Engineering</strong>
                                        </td>
                                        <td>Politecnico di Milano</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar5} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">Approved</span>
                                        </td>
                                        <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="javascript:void(0);">
                                                    <i className="bx bx-edit-alt me-1"></i>
                                                    Edit
                                                </a>
                                                <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>Management Engineering</strong>
                                        </td>
                                        <td>Politecnico di Milano</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar5} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">Approved</span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                        <i className="bx bx-edit-alt me-1"></i>
                                                        Edit
                                                    </a>
                                                    <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>Management Engineering</strong>
                                        </td>
                                        <td>Politecnico di Milano</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar5} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">Approved</span>
                                        </td>
                                        <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="javascript:void(0);">
                                                    <i className="bx bx-edit-alt me-1"></i>
                                                    Edit
                                                </a>
                                                <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>Management Engineering</strong>
                                        </td>
                                        <td>Politecnico di Milano</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar5} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">Approved</span>
                                        </td>
                                        <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="javascript:void(0);">
                                                    <i className="bx bx-edit-alt me-1"></i>
                                                    Edit
                                                </a>
                                                <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>International Corporate Finance and Banking</strong>
                                        </td>
                                        <td>University of Glasgow</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar6} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-primary me-1">Under Review</span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                        <i className="bx bx-edit-alt me-1"></i>
                                                        Edit
                                                    </a>
                                                    <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>Management Engineering</strong>
                                        </td>
                                        <td>Politecnico di Milano</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar5} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">Approved</span>
                                        </td>
                                        <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="javascript:void(0);">
                                                    <i className="bx bx-edit-alt me-1"></i>
                                                    Edit
                                                </a>
                                                <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>International Corporate Finance and Banking</strong>
                                        </td>
                                        <td>University of Glasgow</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar6} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-primary me-1">Under Review</span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                        <i className="bx bx-edit-alt me-1"></i>
                                                        Edit
                                                    </a>
                                                    <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>Management Engineering</strong>
                                        </td>
                                        <td>Politecnico di Milano</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar5} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">Approved</span>
                                        </td>
                                        <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="javascript:void(0);">
                                                    <i className="bx bx-edit-alt me-1"></i>
                                                    Edit
                                                </a>
                                                <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>Computer Science and Engineering</strong>
                                        </td>
                                        <td>University of Fairfax</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar7} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-info me-1">Draft</span>
                                        </td>
                                        <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="javascript:void(0);">
                                                    <i className="bx bx-edit-alt me-1"></i>
                                                    Edit
                                                </a>
                                                <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>Management Engineering</strong>
                                        </td>
                                        <td>Politecnico di Milano</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar5} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">Approved</span>
                                        </td>
                                        <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="javascript:void(0);">
                                                    <i className="bx bx-edit-alt me-1"></i>
                                                    Edit
                                                </a>
                                                <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>Management Engineering</strong>
                                        </td>
                                        <td>Politecnico di Milano</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar5} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">Approved</span>
                                        </td>
                                        <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="javascript:void(0);">
                                                    <i className="bx bx-edit-alt me-1"></i>
                                                    Edit
                                                </a>
                                                <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>Management Engineering</strong>
                                        </td>
                                        <td>Politecnico di Milano</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar5} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">Approved</span>
                                        </td>
                                        <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="javascript:void(0);">
                                                    <i className="bx bx-edit-alt me-1"></i>
                                                    Edit
                                                </a>
                                                <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>Management Engineering</strong>
                                        </td>
                                        <td>Politecnico di Milano</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar5} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">Approved</span>
                                        </td>
                                        <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="javascript:void(0);">
                                                    <i className="bx bx-edit-alt me-1"></i>
                                                    Edit
                                                </a>
                                                <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>Management Engineering</strong>
                                        </td>
                                        <td>Politecnico di Milano</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar5} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-success me-1">Approved</span>
                                        </td>
                                        <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="javascript:void(0);">
                                                    <i className="bx bx-edit-alt me-1"></i>
                                                    Edit
                                                </a>
                                                <a className="dropdown-item" href="javascript:void(0);">
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
                                            <strong>International Corporate Finance and Banking</strong>
                                        </td>
                                        <td>University of Glasgow</td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="Lilian Fuller">
                                                    <img src={avatar6} alt="Avatar" className="rounded-circle" />
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="badge bg-label-primary me-1">Under Review</span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                        <i className="bx bx-edit-alt me-1"></i>
                                                        Edit
                                                    </a>
                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                        <i className="bx bx-file-find me-1"></i>
                                                        Preview
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
                                    <a className="page-link" href="javascript:void(0);">
                                        <i className="tf-icon bx bx-chevrons-left"></i>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="javascript:void(0);">1</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="javascript:void(0);">2</a>
                                </li>
                                <li className="page-item active">
                                    <a className="page-link" href="javascript:void(0);">3</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="javascript:void(0);">4</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="javascript:void(0);">5</a>
                                </li>
                                <li className="page-item next">
                                    <a className="page-link" href="javascript:void(0);">
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
 
export default ListCourses;
