import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import CurrencyForm from "./CurrencyForm";
import Error405 from "../errorPages/Error405";

import useAuth from "../../hooks/useAuth";


const ReviewCurrency = () => {
    const auth = useAuth();

    const params = useParams();
    const currencyID = params.currencyID;

    if (auth.user.role !== "ADMIN") {
        return (
            <Error405 />
        );
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold py-3 mb-4">Publish Currency</h4>
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

                <CurrencyForm formTitle="Publish currency" currencyID={currencyID} action="publish" />

            </div>
        </>
    );
}
 
export default ReviewCurrency;