import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import disciplineService from "../../services/api/disciplineService";
import config from "../../config";
import Error405 from "../errorPages/Error405";
import EntryTable from "../common/EntryTable";


const ListDisciplineActions = () => {
    
    const [disciplines, setDisciplines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchEntry, setSearchEntry] = useState("");
    const [searchedEntry, setSearchedEntry] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const pageSize = config.pageSize;

    let location = useLocation();
    let navigate = useNavigate();
    let auth = useAuth();

    useEffect(() => {
        async function fetchDisciplines() {
            try {
                setLoading(true);

                const pageQuery = `${searchQuery}status=REVIEW&page=${currentPage}`;
                const response = await disciplineService.getDisciplineDrafts(pageQuery);
                if (response.status === 200) {
                    setDataCount(response.data.count);
                    setPages(Math.ceil(dataCount / pageSize));
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
            setLoading(false);
        }
        fetchDisciplines();
    }, [currentPage, dataCount, location, navigate, pageSize, searchQuery]);

    if (auth.user && auth.user.role !== "ADMIN") {
        return (
            <Error405 />
        );
    }

    const handleSearch = () => {
        setSearchQuery(`name=${searchEntry}&`);
        setSearchedEntry(searchEntry);
    }

    const renderDisciplines = () => {
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
        else if (disciplines.length === 0 && !loading) {
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
                    {disciplines.map(discipline => (
                        <tr key={discipline.id}>
                            <td>
                                <Link to={`/discipline/review/${discipline.id}`}>
                                    <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                    <strong>{discipline.name}</strong>
                                </Link>
                            </td>
                            <td>
                                23,450
                            </td>
                            <td>
                                <span className={`badge bg-label-info me-1`}>
                                    {discipline.author.first_name} {discipline.author.last_name}
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
                    <h4 className="fw-bold py-3 mb-4">Discipline Reviews</h4>
                </div>

                <EntryTable
                    title="disciplines"
                    entryRenderer={renderDisciplines}
                    pages={pages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    searchEntry={searchEntry}
                    setSearchEntry={setSearchEntry}
                    searchedEntry={searchedEntry}
                    handleSearch={handleSearch}
                    headers={[
                        "Discipline",
                        "Number of Courses",
                        "Author"
                    ]}
                />
                
            </div>

        </>
    );
    
}

export default ListDisciplineActions;
