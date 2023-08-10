import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CourseForm from "./CourseForm";


const ReviewCourse = () => {
    const params = useParams();
    const courseID = params.courseID;

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold py-3 mb-4">Review Course</h4>
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

                <CourseForm formTitle="Review Course" courseID={courseID} action="review" />

            </div>
        </>
    );
}
 
export default ReviewCourse;