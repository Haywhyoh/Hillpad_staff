import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import disciplineService from "../../services/api/disciplineService";

import avatar5 from '../../assets/img/avatars/5.png';


function ListDisciplines() {
    
    const [disciplines, setDisciplines] = useState([]);
    let location = useLocation();
    let navigate = useNavigate();

    const statusClass = {
        "PUBLISHED": "bg-label-success",
        "APPROVED": "bg-label-info",
        "REJECTED": "bg-label-danger",
        "REVIEW": "bg-label-warning",
        "SAVED": "bg-label-secondary"
    }

    useEffect(() => {
        async function fetchDisciplines() {
            try {
                const response = await disciplineService.getDisciplines();
                if (response.status === 200) {
                    setDisciplines(response.data.results);
                }
            } catch (ex) {
                if (ex.response.status === 401) {
                    navigate("/login", {
                        state: { from: location },
                        replace: true
                    });
                }
            }
        }
        fetchDisciplines();
    });

    function renderDisciplines() {
        if (disciplines.length === 0) {
            return <h5 className="mx-4 my-3 text-danger">No disciplines.</h5>
        } else {
            return (
                <>
                    {disciplines.map(discipline => (
                        <tr key={discipline.id}>
                            <td onClick="#">
                                <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                <strong>
                                    {discipline.name}
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
                                <span className={`badge ${statusClass[discipline]} me-1`}>
                                    {discipline.status}
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
                    
                    ))}
                </>
            )
        }
    }


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

                                {renderDisciplines()}

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

export default ListDisciplines;
