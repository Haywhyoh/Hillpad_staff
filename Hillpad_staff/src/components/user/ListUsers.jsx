import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'; 

import config from '../../config';

import EntryTable from '../common/EntryTable';
import Spinner from '../common/Spinner';
import TabPane from '../common/TabPane';

import useAuth from '../../hooks/useAuth';

import userService from '../../services/api/userService';


const ListUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchEntry, setSearchEntry] = useState("");
    const [searchedEntry, setSearchedEntry] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    const pageSize = config.pageSize;
    
    let location = useLocation();
    let navigate = useNavigate();
    let auth = useAuth();


    useEffect(() => {
        const roleParam = searchParams.get("role");

        async function fetchUsers() {
            try {
                setLoading(true);

                const pageQuery = `${searchQuery}${roleParam ? `role=${roleParam}&` : ""}page=${currentPage}`;
                const response = await userService.getUsers(pageQuery);
                if (response.status === 200) {
                    setDataCount(response.data.count);
                    setPages(Math.ceil(dataCount / pageSize));
                    setUsers(response.data.results);
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
        fetchUsers();
    }, [currentPage, dataCount, location, navigate, pageSize, searchQuery, searchParams]);

    const handleSearch = () => {
        setSearchQuery(`first_name=${searchEntry}&`);
        setSearchedEntry(searchEntry);
        setCurrentPage(1); // Reset the current page to 1 so as to avoid 404 queries
    }

    function renderUsers() {
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
            );
        }
        else if (users.length === 0 && !loading) {
            return (
                <tr>
                    <td>
                        <h5 className="mx-4 my-3 text-danger">No users.</h5>
                    </td>
                </tr>
            );
        } else {
            return (
                <>
                    {users.map(user => (
                        <tr key={user.id}>
                                    <td>
                                        <Link to={`/user/detail/${user.id}`}>
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                            <strong>{user.first_name}</strong>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/user/detail/${user.id}`}>
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                            <strong>{user.last_name}</strong>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/user/detail/${user.id}`}>
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                            <strong>{user.email}</strong>
                                        </Link>
                                    </td>
                                    <td>
                                        <span className={`badge bg-label-info me-1`}>{user.role}</span>
                                    </td>
                            </tr>
                    
                    ))}
                </>
            );
        }
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold py-3 mb-4">
                        Staff Management
                    </h4>
                    {   
                        auth.user &&
                        auth.user.role === "ADMIN" &&
                        <Link to="create">
                            <button type="button" className="btn btn-secondary mb-4">
                                <span className="tf-icons bx bx-plus"></span>&nbsp; Add Staff Account
                            </button>
                        </Link>
                    }
                </div>

                <TabPane
                    setSearchParams={setSearchParams}
                    tabItems={[
                        {label: "All", param: ""},
                        {label: "Specialists", param: "role=SPECIALIST"},
                        {label: "Supervisors", param: "role=SUPERVISOR"},
                        {label: "Admins", param: "role=ADMIN"},
                    ]}
                    active="All"
                />

                <EntryTable 
                    title="staff"
                    entryRenderer={renderUsers}
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
                        "First Name",
                        "Last Name",
                        "Email",
                        "Role",
                    ]}
                />

            </div>
        </>
    );
}
 
export default ListUsers;