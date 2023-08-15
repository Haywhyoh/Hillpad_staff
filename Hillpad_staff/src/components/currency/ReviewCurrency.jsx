import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import CurrencyForm from "./CurrencyForm";


const ReviewCurrency = () => {
    const params = useParams();
    const currencyID = params.currencyID;

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