import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import CountryForm from "./CountryForm";


const ReviewCountry = () => {
    const params = useParams();
    const countryID = params.countryID;

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold py-3 mb-4">Publish Country</h4>
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

                <CountryForm formTitle="Publish country" countryID={countryID} action="publish" />

                
            </div>
        </>
    );
}
 
export default ReviewCountry;