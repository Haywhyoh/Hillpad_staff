import { Component } from "react";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import disciplineService from "../../services/api/disciplineService";

import Input from "../common/form/Input";
import Select from "../common/form/Select";
import TextArea from "../common/form/TextArea";


class DisciplineForm extends Component {
    state = {
        formData: {
            name: "",
            about: "",
            icon: "",
            iconColor: "",
        },

        showStatusModal: false,
        statusModal: "loading",
        modalRedirect: false,
    };

    options = {
        iconColor: [
            { value: "deep_blue", name: "Deep Blue" },
            { value: "green", name: "Green" },
            { value: "orange", name: "Orange" },
            { value: "yellow", name: "Yellow" }
        ]
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ statusModal: "loading", showStatusModal: true });
        const data = this.mapToDisciplineModel(this.state.formData);
        try {
            const createResponse = await disciplineService.createDisciplineDraft(data);
            if (createResponse.status === 201 && createResponse.data) {
                const submitResponse = await disciplineService.submitDisciplineDraft(createResponse.data["id"]);
                if (submitResponse.status === 200 && submitResponse.data) {
                    console.log("Submitted");
                    this.setState({ statusModal: "success" });
                }
                else {
                    console.log("An error occured while trying to submit the discipline", submitResponse.status);
                    this.setState({ statusModal: "error" })
                }
            } else {
                console.log("An error occured while trying to create the course", createResponse.status);
                this.setState({ statusModal: "error" });
            }
        } catch (error) {
            console.log(error);
            this.setState({ statusModal: "error" });
        }
    };

    mapToDisciplineModel = (data) => {

        const formattedFormData = new FormData();

        formattedFormData.append("name", data.name);
        formattedFormData.append("about", data.about);
        formattedFormData.append("icon", data.icon);
        formattedFormData.append("icon_color", data.iconColor);

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
                            <p>Discipline was submitted successfully.</p>
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
                    {this.state.modalRedirect && <Navigate to="/discipline" />}
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
        const { formData, showStatusModal } = this.state;
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
                                label="Name of discipline"
                                value={formData.name}
                                onChange={this.handleChange}
                                placeholder="Social Sciences"
                                required={true}
                            />
                            <TextArea
                                name="about"
                                label="About"
                                value={formData.about}
                                onChange={this.handleChange}
                                required={true}
                                placeholder="Discipline description"
                            />
                            <small className="text-light fw-semibold">
                                Address
                            </small>
                            <Input
                                name="icon"
                                label="Icon name (use FontAwesome but don't include 'fa-' prefix.)"
                                value={formData.icon}
                                onChange={this.handleChange}
                                placeholder="lab"
                            />
                            <Select
                                name="iconColor"
                                label="Icon color"
                                value={formData.iconColor}
                                onChange={this.handleChange}
                                options={this.options.iconColor}
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

export default DisciplineForm;
