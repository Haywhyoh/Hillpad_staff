import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import CountryForm from "./CountryForm";
import Error405 from "../errorPages/Error405";


function CreateCountry() {
    let auth = useAuth();
    if (auth.user && auth.user.role !== "SUPERVISOR") {
        return (
            <Error405 />
        );
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold py-3 mb-4">Create Country</h4>
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

                <CountryForm formTitle="Add a country" action="create" />

                
            </div>
        </>
    );
}

export default CreateCountry;
