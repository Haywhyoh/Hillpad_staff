import { Component } from "react";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import currencyService from "../../services/api/currencyService";

import Input from "../common/form/Input";


class CurrencyForm extends Component {
    
    state = {
        formData: {
            name: "",
            shortCode: "",
        },

        errors: {},

        showStatusModal: false,
        statusModal: "loading",
        modalRedirect: false,

        currency: {},
    };

    setFormState = (currency) => {

        return {
            name: currency.name,
            shortCode: currency.short_code
        };
    };

    async componentDidMount() {
        this.setState({ statusModal: "fetching", showStatusModal: true });
        this.loadData()
        .then(() => {
            this.setState({ showStatusModal: false });
        })
        .catch((error) => {
            console.log(error);
            this.setState({ statusModal: "errorFetching" });
        });
    }

    loadData = async () => {
        try {
            if ("currencyID" in this.props) {
                const { currencyID } = this.props;

                let response = await currencyService.getCurrencyDraft(currencyID);
                if (response.status === 200) {
                    const currency = response.data;
                    this.setState({ currency: response });
                    const formData = this.setFormState(currency);
                    this.setState({ formData });
                }
            }
        } catch (ex) {
            console.log(ex);
            throw new Error(ex);
        }
    };

    validateForm = () => {
        const errors = {};

        const { formData } = this.state;
        if (formData.name === "") errors["name"] = "Currency name must not be empty";
        if (formData.shortCode === "") errors["shortCode"] = "Currency short code must not be empty";
        if (formData.shortCode.length !== 3) errors["shortCode"] = "Currency short code must be ISO 4217"       

        return Object.keys(errors).length === 0 ? null : errors;
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const errors = this.validateForm();
        this.setState({ errors: errors || {} });

        if (errors) {
            console.log(errors);
            return;
        }

        const { action } = this.props;
        this.setState({ statusModal: "loading", showStatusModal: true });

        if (action === "publish") {
            try {
                const response = await currencyService.publishCurrencyDraft(this.props.currencyID);
                if (response.status === 200) {
                    console.log("Published");
                    this.setState({ statusModal: "success" });
                }
            } catch (error) {
                console.log(error);
                this.setState({ statusModal: "error" });
            }
        }
        else {
            const data = this.mapToCurrencyModel(this.state.formData);
            try {
                let initialResponse;
                if (action === "create") {
                    initialResponse = await currencyService.createCurrencyDraft(data);
                } else if (action === "edit") {
                    initialResponse = await currencyService.updateCurrencyDraft(this.props.currencyID, data);
                } else {
                    throw new Error("Unknown form action");
                }
    
                if (
                    ((initialResponse.status === 201 && action === "create") ||
                    (initialResponse.status === 200 && action === "edit")) &&
                    initialResponse.data
                ) {
                    const submitResponse = await currencyService.submitCurrencyDraft(initialResponse.data["id"]);
                    if (submitResponse.status === 200 && submitResponse.data) {
                        console.log("Submitted");
                        this.setState({ statusModal: "success" });
                    }
                    else {
                        console.log("An error occured while trying to submit the currency entry", submitResponse.status);
                        this.setState({ statusModal: "error" });
                    }
                } else {
                    console.log("An error occured while trying to create the currency entry", initialResponse.status);
                    this.setState({ statusModal: "error" });
                }
            } catch (error) {
                console.log(error);
                this.setState({ statusModal: "error" });
            }
        }
    };

    mapToCurrencyModel = (data) => {

        const formattedFormData = new FormData();

        formattedFormData.append("name", data.name);
        formattedFormData.append("short_code", data.shortCode);

        return formattedFormData;
    };

    handleChange = ({ currentTarget: input }) => {
        const formData = { ...this.state.formData };
        formData[input.name] = input.value;
        this.setState({ formData });
    };

    renderModal = () => {
        const { action } = this.props;
        if (this.state.statusModal === "success") {
            return (
                <>
                    <Modal.Body>
                        <div className="text-center mb-4">
                            <span className="bx bx-check-circle fs-1 text-success mb-3"></span>
                            <h3>Awesome!</h3>
                            {
                                action === "publish" &&
                                <p>Currency has been published.</p>
                            }
                            {
                                (action === "create" || action === "edit") &&
                                <p>Currency was submitted successfully.</p>
                            }
                        </div>
                        <div className="d-grid gap-2">
                            <Button variant="success" onClick={() => {
                                    this.setState({ showStatusModal: false });
                                    this.setState({ modalRedirect: true });
                                }}
                            >
                                OK
                            </Button>
                        </div>
                    </Modal.Body>
                    {
                        this.state.modalRedirect && 
                        action !== "publish" &&
                        <Navigate to="/currency" />
                    }
                    {
                        this.state.modalRedirect && 
                        action === "publish" &&
                        <Navigate to="/currency/reviews" />
                    }
                </>
            );
        }

        else if (this.state.statusModal === "error") {
            return (
                <>
                    <Modal.Body>
                        <div className="text-center mb-4">
                            <span className="bx bx-error-circle fs-1 text-danger mb-3"></span>
                            <h3>Error!</h3>
                            <p>Submission failed. An error occured.</p>
                        </div>
                        <div className="d-grid gap-2">
                            <Button
                                variant="danger"
                                onClick={() => {
                                    this.setState({ showStatusModal: false });
                                }}
                            >
                                OK
                            </Button>
                        </div>
                    </Modal.Body>
                </>
            )
        }

        else if (this.state.statusModal === "fetching") {
            return (
                <Modal.Body>
                    <div className="text-center">
                        <Spinner variant="warning" animation="border" role="status" size="lg">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                    <p>Fetching data</p>
                </Modal.Body>
            );
        }

        else if (this.state.statusModal === "errorFetching") {
            return (
                <>
                    <Modal.Body>
                        <div className="text-center mb-4">
                            <span className="bx bx-error-circle fs-1 text-danger mb-3"></span>
                            <h3>Could not fetch data</h3>
                            <p>An error occured while trying to fetch the data.</p>
                        </div>
                        <div className="d-grid gap-2">
                            <Button
                                variant="danger"
                                onClick={() => {
                                    this.setState({ showStatusModal: false });
                                    this.setState({ modalRedirect: true });
                                }}
                            >
                                OK
                            </Button>
                        </div>
                    </Modal.Body>
                    {this.state.modalRedirect && <Navigate to="/currency" />}
                </>
            );
        }
        
        return (
            <Modal.Body>
                <Spinner variant="primary" animation="border" role="status" size="lg">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Modal.Body>
        );
    };

    renderSubmit = () => {
        const { action } = this.props;
        if (action === "publish") {
            return (
                <>
                    <div className="mt-4 text-end">
                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Publish
                        </button>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="mt-4 text-end">
                        <button
                            disabled={this.validateForm()}
                            type="submit"
                            className="btn btn-primary"
                        >
                            Submit
                        </button>
                    </div>
                </>
            );
        }
    };

    render() {
        const { formTitle } = this.props;
        const { formData, errors, showStatusModal } = this.state;
        return (
            <>
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">{formTitle}</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <Input
                                name="name"
                                label="Name of currency"
                                value={formData.name}
                                onChange={this.handleChange}
                                placeholder="Canadian Dollar"
                                required={true}
                                error={errors.name}
                            />
                            <Input
                                name="shortCode"
                                label="Currency short code (ISO 4217)"
                                value={formData.shortCode}
                                onChange={this.handleChange}
                                placeholder="e.g. cad"
                                maxLength={3}
                                required={true}
                                error={errors.shortCode}
                            />

                            {this.renderSubmit()}
                            
                        </form>
                    </div>
                </div>

                <Modal
                    show={showStatusModal}
                    backdrop="static"
                    keyboard={false}
                    dialogClassName="alertModal"
                    centered
                >
                    {this.renderModal()}
                </Modal>
            </>
        );
    }
}

export default CurrencyForm;
