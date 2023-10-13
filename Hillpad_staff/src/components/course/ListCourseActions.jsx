import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import courseService from '../../services/api/courseService';
import Paginator from "../common/Paginator";
import config from '../../config';
import Error405 from "../errorPages/Error405";
import EntryTable from '../common/EntryTable';


const ListCourseActions = () => {

    let auth = useAuth();
    
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [approvedCourses, setApprovedCourses] = useState([]);
    
    const pageSize = config.pageSize;
    
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        async function fetchCourses() {
            try {
                setLoading(true);

                let status;
                if (auth.user.role === "SUPERVISOR") status = "REVIEW";
                else if (auth.user.role === "ADMIN") status = "APPROVED";

                const pageQuery = `status=${status}&page=${currentPage}`;
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
    }, [currentPage, dataCount, location, navigate, pageSize, auth.user.role]);

    if (auth.user && auth.user.role === "SPECIALIST") {
        return (
            <Error405 />
        );
    }

    const publishAll = async () => {
        // Get all APPROVED courses IDs
        // Loop and publish
        // Display progress while publishing
        // Add confirmation popup before publishing
        // Publish done.
        try {
            const approvedResponse = await courseService.getCourseDraftsApproved();
            if (approvedResponse.status === 200) {
                setApprovedCourses(approvedResponse.data.results);
                // this.setState({ statusModal: "success" });
                let published = 0;
                for (let courseID of approvedCourses) {
                    const response = await courseService.publishCourseDraft(courseID);
                    if (response.status === 200) {
                        published += 1;
                        // this.setState({ statusModal: "success" });
                        console.log(`Published: ${published}/${approvedCourses.length}`);
                    }
                }
            }
        } catch (error) {
            console.log(error);
            this.setState({ statusModal: "error" });
        }
    };

    function renderCourses() {
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
                                        <Link to={`/course/review/${course.id}`}>
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                            <strong>{course.name}</strong>
                                        </Link>
                                    </td>
                                    <td>{course.school ? course.school.name : "-"}</td>
                                    <td>
                                        {(course.degree_type && "short_name" in course.degree_type) ? course.degree_type.short_name : "-"}
                                    </td>
                                    <td>
                                        <span className={`badge bg-label-info me-1`}>{course.author.first_name} {course.author.last_name}</span>
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
                        Course Reviews
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
                    entryRenderer={renderCourses}
                    pages={pages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    headers={[
                        "Course Name",
                        "School",
                        "Degree",
                        "Author"
                    ]}
                />

            </div>
        </>
    );
}
 
export default ListCourseActions;