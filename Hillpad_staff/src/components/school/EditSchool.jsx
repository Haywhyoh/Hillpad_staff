import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SchoolForm from "./SchoolForm";


const EditSchool = () => {
    const params = useParams();
    const schoolID = params.schoolID;

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold py-3 mb-4">Edit School</h4>
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

                <SchoolForm formTitle="Edit school" schoolID={schoolID} action="edit" />

                
            </div>
        </>
    );
}
 
export default EditSchool;