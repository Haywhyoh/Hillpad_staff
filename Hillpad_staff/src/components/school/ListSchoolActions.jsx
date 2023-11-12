import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import config from '../../config';

import EntryTable from '../common/EntryTable';
import Spinner from '../common/Spinner';
import Error405 from "../errorPages/Error405";

import useAuth from '../../hooks/useAuth';

import schoolService from '../../services/api/schoolService';


const ListSchoolActions = () => {
    
    let location = useLocation();
    let navigate = useNavigate();
    let auth = useAuth();

    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchEntry, setSearchEntry] = useState("");
    const [searchedEntry, setSearchedEntry] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [approvedSchools, setApprovedSchools] = useState([]);

    const pageSize = config.pageSize;


    useEffect(() => {
        async function fetchSchools() {
            try {
                setLoading(true);

                let status;
                if (auth.user.role === "SUPERVISOR") status = "REVIEW";
                else if (auth.user.role === "ADMIN") status = "APPROVED";

                const pageQuery = `${searchQuery}status=${status}&page=${currentPage}`;
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
    }, [currentPage, dataCount, location, navigate, pageSize, searchQuery, auth.user.role]);

    if (auth.user && auth.user.role === "SPECIALIST") {
        return (
            <Error405 />
        );
    }

    const publishAll = async () => {
        try {
            const approvedResponse = await schoolService.getSchoolDraftsApproved();
            if (approvedResponse.status === 200) {
                setApprovedSchools(approvedResponse.data.results);
                // this.setState({ statusModal: "success" });
                let published = 0;
                for (let schoolID of approvedSchools) {
                    const response = await schoolService.publishSchoolDraft(schoolID);
                    if (response.status === 200) {
                        published += 1;
                        // this.setState({ statusModal: "success" });
                        console.log(`Published: ${published}/${approvedSchools.length}`);
                    }
                }
            }
        } catch (error) {
            console.log(error);
            this.setState({ statusModal: "error" });
        }
    };

    const handleSearch = () => {
        setSearchQuery(`name=${searchEntry}&`);
        setSearchedEntry(searchEntry);
        setCurrentPage(1); // Reset the current page to 1 so as to avoid 404 queries
    };

    const renderSchools = () => {
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
    };

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold py-3 mb-4">
                        School Reviews
                    </h4>
                    {   
                        auth.user &&
                        auth.user.role === "ADMIN" &&
                        <button
                            type="button"
                            className="btn btn-danger mb-4"
                            onClick={publishAll}
                        >
                            <span className="tf-icons bx bx-book-reader"></span>&nbsp; Publish All
                        </button>
                    }
                </div>

                <EntryTable
                    title="schools"
                    entryRenderer={renderSchools}
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
                        "School",
                        "Country",
                        "Number of Courses",
                        "Author"
                    ]}
                />

            </div>
        </>
    );
    
}
 
export default ListSchoolActions;