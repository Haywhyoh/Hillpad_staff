import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import SchoolForm from "./SchoolForm";
import Error405 from "../errorPages/Error405";


const ReviewSchool = () => {
    const params = useParams();
    const schoolID = params.schoolID;
    
    const auth = useAuth();
    const role = auth.user.role;
    let action, title;
    if (role === "ADMIN") {
        action = "publish";
        title = "Publish School";
    }
    else if (role === "SUPERVISOR") {
        action = "review";
        title = "Review School";
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
                    <Link to="/school/reviews">
                        <button
                            type="button"
                            className="btn btn-secondary mb-4"
                        >
                            <span className="tf-icons bx bx-arrow-back"></span>
                            &nbsp; Back
                        </button>
                    </Link>
                </div>

                <SchoolForm formTitle={title} schoolID={schoolID} action={action} />

            </div>
        </>
    );
}
 
export default ReviewSchool;