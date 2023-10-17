import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import config from "../../config";

import EntryTable from "../common/EntryTable";
import Spinner from '../common/Spinner';
import TabPane from '../common/TabPane';

import useAuth from "../../hooks/useAuth";

import disciplineService from "../../services/api/disciplineService";
import statsService from '../../services/api/statsService';


const ListDisciplines = () => {
    
    const [disciplines, setDisciplines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchEntry, setSearchEntry] = useState("");
    const [searchedEntry, setSearchedEntry] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [disciplinesReview, setDisciplinesReview] = useState(0);

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
        
        async function fetchDisciplines() {
            try {
                setLoading(true);
                
                const pageQuery = `${searchQuery}${status ? `status=${status}&` : ""}page=${currentPage}`;
                const response = await disciplineService.getDisciplineDrafts(pageQuery);
                if (response.status === 200) {
                    setDataCount(response.data.count);
                    setPages(Math.ceil(dataCount / pageSize));
                    setDisciplines(response.data.results);
                }

                const reviewDisciplinesResponse = await statsService.getAccountEntriesStats(["total_disciplines_review_db"]);
                if (reviewDisciplinesResponse.status === 200) {
                    const result = reviewDisciplinesResponse.data;
                    setDisciplinesReview(result["total_disciplines_review_db"]);
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
        fetchDisciplines();
    }, [currentPage, dataCount, location, navigate, pageSize, searchQuery, searchParams]);

    const handleSearch = () => {
        setSearchQuery(`name=${searchEntry}&`);
        setSearchedEntry(searchEntry);
        setCurrentPage(1); // Reset the current page to 1 so as to avoid 404 queries
    }

    const renderDisciplines = () => {
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
        else if (disciplines.length === 0 && !loading) {
            return (
                <tr>
                    <td>
                        <h5 className="mx-4 my-3 text-danger">No disciplines.</h5>
                    </td>
                </tr>
            );
        } else {
            return (
                <>
                    {disciplines.map(discipline => (
                        <tr key={discipline.id}>
                            <td>
                                <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                <strong>
                                    {discipline.name}
                                </strong>
                            </td>
                            <td>23,450</td>
                            
                            <td>
                                <span className={`badge ${statusClass[discipline.status]} me-1`}>
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
                                        <Link className="dropdown-item" to={`edit/${discipline.id}`}>
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
                    <h4 className="fw-bold py-3 mb-4">Disciplines</h4>
                    {   
                        auth.user &&
                        auth.user.role === "SUPERVISOR" &&
                        <Link to="create">
                            <button type="button" className="btn btn-secondary mb-4">
                                <span className="tf-icons bx bx-plus"></span>&nbsp;
                                Add Discipline
                            </button>
                        </Link>
                    }
                </div>

                <TabPane
                    setSearchParams={setSearchParams}
                    tabItems={[
                        {label: "All", param: ""},
                        {label: "Review", param: "status=REVIEW", badge: auth.user.role === "ADMIN" ? disciplinesReview : null},
                        {label: "Published", param: "status=PUBLISHED"}
                    ]}
                    active="All"
                />

                <EntryTable
                    title="disciplines"
                    entryRenderer={renderDisciplines}
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
                        "Discipline",
                        "Number of Courses",
                        "Status",
                        "Actions"
                    ]}
                />
                
            </div>

        </>
    );
    
}

export default ListDisciplines;
