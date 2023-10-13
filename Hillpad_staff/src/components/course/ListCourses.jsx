import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import courseService from '../../services/api/courseService';
import config from '../../config';
import EntryTable from '../common/EntryTable';


const ListCourses = () => {
    
    const [courses, setCourses] = useState([]);
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

    const statusClass = {
        "PUBLISHED": "bg-label-success",
        "APPROVED": "bg-label-info",
        "REJECTED": "bg-label-danger",
        "REVIEW": "bg-label-warning",
        "SAVED": "bg-label-secondary"
    }

    useEffect(() => {
        async function fetchCourses() {
            try {
                setLoading(true);

                const pageQuery = `${searchQuery}page=${currentPage}`;
                const response = await courseService.getCourseDrafts(pageQuery);
                if (response.status === 200) {
                    setDataCount(response.data.count);
                    setPages(Math.ceil(dataCount / pageSize));
                    setCourses(response.data.results);
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
        fetchCourses();
    }, [currentPage, dataCount, location, navigate, pageSize, searchQuery]);

    const handleSearch = () => {
        setSearchQuery(`name=${searchEntry}&`);
        setSearchedEntry(searchEntry);
    }

    const renderCourses = () => {
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
            );
        }
        else if (courses.length === 0 && !loading) {
            return (
                <tr>
                    <td>
                        <h5 className="mx-4 my-3 text-danger">No courses.</h5>
                    </td>
                </tr>
            );
        } else {
            return (
                <>
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td>
                                <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                <strong>{course.name}</strong>
                            </td>
                            <td>{course.school ? course.school.name : "-"}</td>
                            <td>
                                {(course.degree_type && "short_name" in course.degree_type) ? course.degree_type.short_name : "-"}
                            </td>
                            <td>
                                <span className={`badge ${statusClass[course.status]} me-1`}>{course.status}</span>
                            </td>
                            <td>
                            <div className="dropdown">
                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                    <i className="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to={`edit/${course.id}`}>
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
            );
        }
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold py-3 mb-4">
                        Courses
                    </h4>
                    {   
                        auth.user &&
                        auth.user.role === "SPECIALIST" &&
                        <Link to="create">
                            <button type="button" className="btn btn-secondary mb-4">
                                <span className="tf-icons bx bx-plus"></span>&nbsp; Add Course
                            </button>
                        </Link>
                    }
                </div>

                <EntryTable 
                    entryRenderer={renderCourses}
                    pages={pages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    searchEntry={searchEntry}
                    setSearchEntry={setSearchEntry}
                    searchedEntry={searchedEntry}
                    handleSearch={handleSearch}
                    headers={[
                        "Course Name",
                        "School",
                        "Degree",
                        "Status",
                        "Actions"
                    ]}
                />

            </div>
        </>
    );
    
}
 
export default ListCourses;
