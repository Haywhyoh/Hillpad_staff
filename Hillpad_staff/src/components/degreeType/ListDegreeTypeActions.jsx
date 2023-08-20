import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import degreeTypeService from "../../services/api/degreeTypeService";
import Paginator from "../common/Paginator";
import config from "../../config";
import Error405 from "../errorPages/Error405";


const ListDegreeTypeActions = () => {
    
    const [degreeTypes, setDegreeTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = config.pageSize;

    let location = useLocation();
    let navigate = useNavigate();
    let auth = useAuth();

    useEffect(() => {
        async function fetchDegreeTypes() {
            try {
                setLoading(true);

                const pageQuery = `status=REVIEW&page=${currentPage}`;
                const response = await degreeTypeService.getDegreeTypeDrafts(pageQuery);
                if (response.status === 200) {
                    setDataCount(response.data.count);
                    setPages(Math.ceil(dataCount / pageSize));
                    setDegreeTypes(response.data.results);
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
        fetchDegreeTypes();
    }, [currentPage, dataCount, location, navigate, pageSize]);

    if (auth.user && auth.user.role !== "ADMIN") {
        return (
            <Error405 />
        );
    }

    function renderDegreeType() {
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
        else if (degreeTypes.length === 0 && !loading) {
            return (
                <tr>
                    <td>
                        <h5 className="mx-4 my-3 text-danger">No degree types.</h5>
                    </td>
                </tr>
            );
        } else {
            return (
                <>
                    {degreeTypes.map(degreeType => (
                        <tr key={degreeType.id}>
                            <td>
                                <Link to={`/degree-type/review/${degreeType.id}`}>
                                    <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                    <strong>{degreeType.name}</strong>
                                </Link>
                            </td>
                            <td>
                                {degreeType.programme_type.name}
                            </td>
                            <td>
                                34,298
                            </td>
                            <td>
                                <span className={`badge bg-label-info me-1`}>
                                    {degreeType.author.first_name} {degreeType.author.last_name}
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
                    <h4 className="fw-bold py-3 mb-4">Degree Types</h4>
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
                                    <th>Degree Type</th>
                                    <th>Programme Type</th>
                                    <th>Number of courses</th>
                                    <th>Author</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                
                                {renderDegreeType()}

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

export default ListDegreeTypeActions;