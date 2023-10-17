import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import CourseForm from "./CourseForm";
import Error405 from "../errorPages/Error405";


const ReviewCourse = () => {
    const params = useParams();
    const courseID = params.courseID;

    const auth = useAuth();
    const role = auth.user.role;
    let action, title;
    if (role === "ADMIN") {
        action = "publish";
        title = "Publish Course";
    }
    else if (role === "SUPERVISOR") {
        action = "review";
        title = "Review Course";
    }
    else {
        return (
            <Error405 />
        );
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold py-3 mb-4">{title}</h4>
                    <Link to="/course/reviews">
                        <button
                            type="button"
                            className="btn btn-secondary mb-4"
                        >
                            <span className="tf-icons bx bx-arrow-back"></span>
                            &nbsp; Back
                        </button>
                    </Link>
                </div>

                <CourseForm formTitle={title} courseID={courseID} action={action} />

            </div>
        </>
    );
}
 
export default ReviewCourse;