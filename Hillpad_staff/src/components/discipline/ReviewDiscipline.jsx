import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import DisciplineForm from "./DisciplineForm";
import Error405 from "../errorPages/Error405";

import useAuth from "../../hooks/useAuth";


const ReviewDiscipline = () => {
    const auth = useAuth();

    const params = useParams();
    const disciplineID = params.disciplineID;

    if (auth.user.role !== "ADMIN") {
        return (
            <Error405 />
        );
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold py-3 mb-4">Publish Discipline</h4>
                    <Link to="..">
                        <button
                            type="button"
                            className="btn btn-secondary mb-4"
                        >
                            <span className="tf-icons bx bx-arrow-back"></span>
                            &nbsp; Back
                        </button>
                    </Link>
                </div>

                <DisciplineForm formTitle="Publish discipline" disciplineID={disciplineID} action="publish" />

            </div>
        </>
    );
}
 
export default ReviewDiscipline;