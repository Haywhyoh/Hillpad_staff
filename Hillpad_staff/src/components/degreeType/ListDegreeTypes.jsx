import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import config from "../../config";

import EntryTable from "../common/EntryTable";
import Spinner from '../common/Spinner';
import TabPane from '../common/TabPane';

import useAuth from "../../hooks/useAuth";

import degreeTypeService from "../../services/api/degreeTypeService";
import statsService from '../../services/api/statsService';


const ListDegreeTypes = () => {
    
    const [degreeTypes, setDegreeTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchEntry, setSearchEntry] = useState("");
    const [searchedEntry, setSearchedEntry] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [degreeTypesReview, setDegreeTypesReview] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();

    const pageSize = config.pageSize;

    let location = useLocation();
    let navigate = useNavigate();
    let auth = useAuth();

    const statusClass = {
        "PUBLISHED": "bg-label-success",
        "APPROVED": "bg-label-info",
        "REJECTED": "bg-label-danger",
        "REVIEW": "bg-label-warning",
        "SAVED": "bg-label-secondary"
    }

    useEffect(() => {
        const status = searchParams.get("status");
        
        async function fetchDegreeTypes() {
            try {
                setLoading(true);
                
                const pageQuery = `${searchQuery}${status ? `status=${status}&` : ""}page=${currentPage}`;
                const response = await degreeTypeService.getDegreeTypeDrafts(pageQuery);
                if (response.status === 200) {
                    setDataCount(response.data.count);
                    setPages(Math.ceil(dataCount / pageSize));
                    setDegreeTypes(response.data.results);
                }

                const reviewDegreeTypesResponse = await statsService.getAccountEntriesStats(["total_degree_types_review_db"]);
                if (reviewDegreeTypesResponse.status === 200) {
                    const result = reviewDegreeTypesResponse.data;
                    setDegreeTypesReview(result["total_degree_types_review_db"]);
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
    }, [currentPage, dataCount, location, navigate, pageSize, searchQuery, searchParams]);

    const handleSearch = () => {
        setSearchQuery(`name=${searchEntry}&`);
        setSearchedEntry(searchEntry);
        setCurrentPage(1); // Reset the current page to 1 so as to avoid 404 queries
    }

    const renderDegreeTypes = () => {
        if (loading) {
            return (
                <tr>
                    <td className="text-center">
                        <Spinner addClasses="mx-4 my-3" />
                    </td>
                    <td className="text-center">
                        <Spinner addClasses="mx-4 my-3" />
                    </td>
                    <td className="text-center">
                        <Spinner addClasses="mx-4 my-3" />
                    </td>
                    <td className="text-center">
                        <Spinner addClasses="mx-4 my-3" />
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
                                <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                <strong>{degreeType.name}</strong>
                            </td>
                            <td>{degreeType.programme_type.name}</td>
                            <td>
                                34,298
                            </td>
                            <td>
                                <span className={`badge ${statusClass[degreeType.status]} me-1`}>
                                    {degreeType.status}
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
                                        <Link className="dropdown-item" to={`edit/${degreeType.id}`}>
                                            <i className="bx bx-edit-alt me-1"></i>
                                            Edit
                                        </Link>
                                        <Link className="dropdown-item" to="https://hillpad.vercel.app">
                                            <i className="bx bx-window me-1"></i>
                                            View live
                                        </Link>
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
                    <h4 className="fw-bold py-3 mb-4">Degree Types</h4>
                    {   
                        auth.user &&
                        auth.user.role === "SUPERVISOR" &&
                        <Link to="create">
                            <button type="button" className="btn btn-secondary mb-4">
                                <span className="tf-icons bx bx-plus"></span>&nbsp;
                                Add Degree Type
                            </button>
                        </Link>
                    }
                </div>

                <TabPane
                    setSearchParams={setSearchParams}
                    tabItems={[
                        {label: "All", param: ""},
                        {label: "Review", param: "status=REVIEW", badge: auth.user.role === "ADMIN" ? degreeTypesReview : null},
                        {label: "Published", param: "status=PUBLISHED"}
                    ]}
                    active="All"
                />

                <EntryTable
                    title="degree types"
                    entryRenderer={renderDegreeTypes}
                    pages={pages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalResultCount={dataCount}
                    searchEntry={searchEntry}
                    setSearchEntry={setSearchEntry}
                    searchedEntry={searchedEntry}
                    handleSearch={handleSearch}
                    loading={loading}
                    headers={[
                        "Degree Type",
                        "Programme Type",
                        "Number of courses",
                        "Status",
                        "Actions"
                    ]}
                />

            </div>
        </>
    );
}

export default ListDegreeTypes;
