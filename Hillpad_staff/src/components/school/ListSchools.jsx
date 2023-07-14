import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import schoolService from '../../services/api/schoolService';

import avatar5 from '../../assets/img/avatars/5.png';


function ListSchools() {
    
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
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
        async function fetchSchools() {
            try {
                const response = await schoolService.getSchoolDrafts();
                if (response.status === 200) {
                    setSchools(response.data.results);
                }
            } catch (ex) {
                if (ex.response.status === 401) {
                    navigate("/login", {
                        state: { from: location },
                        replace: true
                    });
                }
            }
            setLoading(false);
        }
        fetchSchools();
    });

    function renderSchools() {
        if (loading) {
            return (
                <tr>
                    <td className="text-center">
                        <div className="mx-4 my-3 spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </td>
                    <td className="text-center">
                        <div className="mx-4 my-3 spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </td>
                    <td className="text-center">
                        <div className="mx-4 my-3 spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </td>
                    <td className="text-center">
                        <div className="mx-4 my-3 spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </td>
                </tr>
            )
        }
        else if (schools.length === 0 && !loading) {
            return <h5 className="mx-4 my-3 text-danger">No schools.</h5>
        } else {
            const school_country = (school) => {
                return school.country ? school.country.name : "-";
            }
            return (
                <>
                    {schools.map(school => (
                        <tr key={school.id}>
                            <td onClick="#">
                                <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                <strong>
                                    {school.name}
                                </strong>
                            </td>
                            <td>{school_country(school)}</td>
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
                                <span className={`badge ${statusClass[school.status]} me-1`}>
                                    {school.status}
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
                                            href="{% url 'staff_school_detail' 1 %}"
                                        >
                                            <i className="bx bx-edit-alt me-1"></i>
                                            Edit
                                        </a>
                                        <a
                                            className="dropdown-item"
                                            href="{% url 'school_detail' %}"
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
                    <h4 className="fw-bold py-3 mb-4">Schools</h4>
                    <Link to="create">
                        <button
                            type="button"
                            className="btn btn-secondary mb-4"
                        >
                            <span className="tf-icons bx bx-plus"></span>&nbsp;
                            Add School
                        </button>
                    </Link>
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
                                    <th>School</th>
                                    <th>Country</th>
                                    <th>Author</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {renderSchools()}
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
 
export default ListSchools;