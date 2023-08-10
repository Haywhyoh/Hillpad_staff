import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import schoolService from '../../services/api/schoolService';
import Paginator from "../common/Paginator";
import config from "../../config.json";
import Error405 from "../errorPages/Error405";


function ListSchoolActions() {
    
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = config.pageSize;

    let location = useLocation();
    let navigate = useNavigate();
    let auth = useAuth();

    useEffect(() => {
        async function fetchSchools() {
            try {
                setLoading(true);

                let status;
                if (auth.user.role === "SUPERVISOR") status = "REVIEW";
                else if (auth.user.role === "ADMIN") status = "APPROVED";

                const pageQuery = `status=${status}&page=${currentPage}`;
                const response = await schoolService.getSchoolDrafts(pageQuery);
                if (response.status === 200) {
                    setDataCount(response.data.count);
                    setPages(Math.ceil(dataCount / pageSize));
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
    }, [currentPage, dataCount, location, navigate, pageSize, auth.user.role]);

    if (auth.user && auth.user.role === "SPECIALIST") {
        return (
            <Error405 />
        );
    }

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
            return (
                <tr>
                    <td>
                        <h5 className="mx-4 my-3 text-danger">No schools.</h5>
                    </td>
                </tr>
            );
        } else {
            return (
                <>
                    {schools.map(school => (
                        <tr key={school.id}>
                            <td>
                                <Link to={`/school/review/${school.id}`}>
                                    <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                    <strong>{school.name}</strong>
                                </Link>
                            </td>
                            <td>{(school.country && "name" in school.country) ? school.country.name : "-"}</td>
                            <td>
                                12,765
                            </td>
                            <td>
                                <span className={`badge bg-label-info me-1`}>
                                    {school.author.first_name} {school.author.last_name}
                                </span>
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
                                    <th>Number of Courses</th>
                                    <th>Author</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {renderSchools()}
                            </tbody>
                        </table>
                    </div>

                    <Paginator
                        pages={pages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </>
    );
    
}
 
export default ListSchoolActions;