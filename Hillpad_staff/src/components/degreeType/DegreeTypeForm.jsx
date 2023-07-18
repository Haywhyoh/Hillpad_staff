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
        programmeTypes: [],

        showStatusModal: false,
        statusModal: "loading",
        modalRedirect: false,
    };

    async componentDidMount() {
        // Get currencies
        let { data } = await programmeTypeService.getProgrammeTypes();
        const programmeTypes = data.results.map((item) => ({
            name: item.name,
            value: item.id,
        }));
        this.setState({ programmeTypes });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ statusModal: "loading", showStatusModal: true });
        const data = this.mapToDegreeTypeModel(this.state.formData);
        try {
            const createResponse = await degreeTypeService.createDegreeTypeDraft(data);
            if (createResponse.status === 201 && createResponse.data) {
                const submitResponse = await degreeTypeService.submitDegreeTypeDraft(createResponse.data["id"]);
                if (submitResponse.status === 200 && submitResponse.data) {
                    console.log("Submitted");
                    this.setState({ statusModal: "success" });
                }
                else {
                    console.log("An error occured while trying to submit the degree type", submitResponse.status);
                    this.setState({ statusModal: "error" })
                }
            } else {
                console.log("An error occured while trying to create the degree type", createResponse.status);
                this.setState({ statusModal: "error" });
            }
        } catch (error) {
            console.log(error);
            this.setState({ statusModal: "error" });
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
        if (this.state.statusModal === "success") {
            return (
                <>
                    <Modal.Body>
                        <div className="text-center mb-4">
                            <span className="bx bx-check-circle fs-1 text-success mb-3"></span>
                            <h3>Awesome!</h3>
                            <p>Degree type was submitted successfully.</p>
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
                    {this.state.modalRedirect && <Navigate to="/degree-type" />}
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
        
        return (
            <Modal.Body>
                <Spinner variant="primary" animation="border" role="status" size="lg">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Modal.Body>
        );

    };

    render() {
        const { formTitle } = this.props;
        const { formData, programmeTypes, showStatusModal } = this.state;
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
                            />
                            <Input
                                name="shortName"
                                label="Short name of degree type"
                                value={formData.shortName}
                                onChange={this.handleChange}
                                placeholder="e.g. B.Sc."
                                required={true}
                            />
                            <Select
                                name="programmeType"
                                label="Programme Type"
                                value={formData.programmeType}
                                onChange={this.handleChange}
                                options={programmeTypes}
                            />

                            <div className="mt-4 text-end">
                                <button
                                    type="submit"
                                    className="btn btn-dark me-2"
                                >
                                    Save and submit later
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Submit now
                                </button>
                            </div>
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
