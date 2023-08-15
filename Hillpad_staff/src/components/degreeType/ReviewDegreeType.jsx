import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import DegreeTypeForm from "./DegreeTypeForm";


function ReviewDegreeType() {
    const params = useParams();
    const degreeTypeID = params.degreeTypeID;

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold py-3 mb-4">Publish Degree type</h4>
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

                <DegreeTypeForm formTitle="Publish degree type" degreeTypeID={degreeTypeID} action="publish" />

                
            </div>
        </>
    );
}

export default ReviewDegreeType;
