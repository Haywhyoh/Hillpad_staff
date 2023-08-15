import { Component } from "react";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import degreeTypeService from "../../services/api/degreeTypeService";
import programmeTypeService from "../../services/api/programmeTypeService";

import Input from "../common/form/Input";
import Select from "../common/form/Select";


class DegreeTypeForm extends Component {
    state = {
        formData: {
            name: "",
            shortName: "",
            programmeType: ""
        },
        errors: {},

        programmeTypes: [],

        showStatusModal: false,
        statusModal: "loading",
        modalRedirect: false,

        degreeType: {},
    };

    setFormState = (degreeType) => {

        return {
            name: degreeType.name,
            shortName: degreeType.short_name,
            programmeType: degreeType.programme_type.id
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
            if ("degreeTypeID" in this.props) {
                const { degreeTypeID } = this.props;
                
                let response = await degreeTypeService.getDegreeTypeDraft(degreeTypeID);
                if (response.status === 200) {
                    console.log(response.data);
                    const degreeType = response.data;
                    this.setState({ degreeType: response });
                    const formData = this.setFormState(degreeType);
                    this.setState({ formData });
                }

            }

            // Get Programme Types
            let { data } = await programmeTypeService.getProgrammeTypes();
            const programmeTypes = data.results.map((item) => ({
                name: item.name,
                value: item.id,
            }));
            this.setState({ programmeTypes });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }

    };

    validateForm = () => {
        const errors = {};

        const { formData } = this.state;
        if (formData.name === "") errors["name"] = "Course name must not be empty";
        if (formData.shortName === "") errors["shortName"] = "Short Name must not be empty";
        if (formData.programmeType === "") errors["programmeType"] = "You must select a programme type";

        return Object.keys(errors).length === 0 ? null : errors;
    };

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
                const response = await degreeTypeService.publishDegreeTypeDraft(this.props.degreeTypeID);
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
            const data = this.mapToDegreeTypeModel(this.state.formData);
            try {
                let initialResponse;
                if (action === "create") {
                    initialResponse = await degreeTypeService.createDegreeTypeDraft(data);
                } else if (action === "edit") {
                    initialResponse = await degreeTypeService.updateDegreeTypeDraft(this.props.degreeTypeID, data);
                } else {
                    throw new Error("Unknown form action");
                }
    
                if (
                    ((initialResponse.status === 201 && action === "create") ||
                    (initialResponse.status === 200 && action === "edit")) &&
                    initialResponse.data
                ) {
                    const submitResponse = await degreeTypeService.submitDegreeTypeDraft(initialResponse.data["id"]);
                    if (submitResponse.status === 200 && submitResponse.data) {
                        console.log("Submitted");
                        this.setState({ statusModal: "success" });
                    }
                    else {
                        console.log("An error occured while trying to submit the degree type", submitResponse.status);
                        this.setState({ statusModal: "error" });
                    }
                } else {
                    console.log("An error occured while trying to create the degree type", initialResponse.status);
                    this.setState({ statusModal: "error" });
                }
            } catch (error) {
                console.log(error);
                this.setState({ statusModal: "error" });
            }
        }
    };

    mapToDegreeTypeModel = (data) => {

        const formattedFormData = new FormData();

        formattedFormData.append("name", data.name);
        formattedFormData.append("short_name", data.shortName);
        formattedFormData.append("programme_type", data.programmeType);

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
                                <p>Degree Type has been published.</p>
                            }
                            {
                                (action === "create" || action === "edit") &&
                                <p>Degree Type was submitted successfully.</p>
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
                        <Navigate to="/degree-type" />
                    }
                    {
                        this.state.modalRedirect && 
                        action === "publish" &&
                        <Navigate to="/degree-type/reviews" />
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
                    {this.state.modalRedirect && <Navigate to="/degree-type" />}
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
        const { formData, errors, programmeTypes, showStatusModal } = this.state;
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
                                label="Name of degree type"
                                value={formData.name}
                                onChange={this.handleChange}
                                placeholder="e.g. Bachelor of Science"
                                required={true}
                                error={errors.name}
                            />
                            <Input
                                name="shortName"
                                label="Short name of degree type"
                                value={formData.shortName}
                                onChange={this.handleChange}
                                placeholder="e.g. B.Sc."
                                error={errors.shortName}
                                required={true}
                            />
                            <Select
                                name="programmeType"
                                label="Programme Type"
                                value={formData.programmeType}
                                onChange={this.handleChange}
                                options={programmeTypes}
                                required={true}
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

export default DegreeTypeForm;
