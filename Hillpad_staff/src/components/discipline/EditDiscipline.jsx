import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DisciplineForm from "./DisciplineForm";


const EditDiscipline = () => {
    const params = useParams();
    const disciplineID = params.disciplineID;

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold py-3 mb-4">Edit Discipline</h4>
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

                <DisciplineForm formTitle="Edit discipline" disciplineID={disciplineID} action="edit" />

            </div>
        </>
    );
}
 
export default EditDiscipline;