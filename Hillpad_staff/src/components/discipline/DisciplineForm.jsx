import { Component } from "react";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import disciplineService from "../../services/api/disciplineService";

import Input from "../common/form/Input";
import Select from "../common/form/Select";
import QuillEditor from "../common/form/QuillEditor";


class DisciplineForm extends Component {
    state = {
        formData: {
            name: "",
            about: "",
            icon: "",
            iconColor: "",
        },

        errors: {},

        showStatusModal: false,
        statusModal: "loading",
        modalRedirect: false,

        discipline: {},
    };

    options = {
        iconColor: [
            { value: "deep_blue", name: "Deep Blue" },
            { value: "green", name: "Green" },
            { value: "orange", name: "Orange" },
            { value: "yellow", name: "Yellow" }
        ]
    };

    quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline"],
            [{ script:  "sub" }, { script:  "super" }],
            [{ list:  "ordered" }, { list:  "bullet" }],
            [{ indent:  "-1" }, { indent:  "+1" }],
            ["link"],
            ["clean"],
        ],
    };

    setFormState = (discipline) => {

        return {
            name: discipline.name,
            about: discipline.about,
            icon: discipline.icon,
            iconColor: discipline.icon_color
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
            if ("disciplineID" in this.props) {
                const { disciplineID } = this.props;

                let response = await disciplineService.getDisciplineDraft(disciplineID);
                if (response.status === 200) {
                    const discipline = response.data;
                    this.setState({ discipline: response });
                    const formData = this.setFormState(discipline);
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
        if (formData.name === "") errors["name"] = "Course name must not be empty";
        if (formData.about === "") errors["about"] = "About must not be empty";
        if (formData.icon === "") errors["icon"] = "Icon name must not be empty";
        if (formData.iconColor === "") errors["iconColor"] = "Icon color must not be empty"        

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
                const response = await disciplineService.publishDisciplineDraft(this.props.disciplineID);
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
            const data = this.mapToDisciplineModel(this.state.formData);
            try {
                let initialResponse;
                if (action === "create") {
                    initialResponse = await disciplineService.createDisciplineDraft(data);
                } else if (action === "edit") {
                    initialResponse = await disciplineService.updateDisciplineDraft(this.props.disciplineID, data);
                } else {
                    throw new Error("Unknown form action");
                }
    
                if (
                    ((initialResponse.status === 201 && action === "create") ||
                    (initialResponse.status === 200 && action === "edit")) &&
                    initialResponse.data
                ) {
                    const submitResponse = await disciplineService.submitDisciplineDraft(initialResponse.data["id"]);
                    if (submitResponse.status === 200 && submitResponse.data) {
                        console.log("Submitted");
                        this.setState({ statusModal: "success" });
                    }
                    else {
                        console.log("An error occured while trying to submit the discipline", submitResponse.status);
                        this.setState({ statusModal: "error" });
                    }
                } else {
                    console.log("An error occured while trying to create the discipline", initialResponse.status);
                    this.setState({ statusModal: "error" });
                }
            } catch (error) {
                console.log(error);
                this.setState({ statusModal: "error" });
            }
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

    handleAbout = (content) => {
        const formData = { ...this.state.formData };
        const value = content === "<p><br></p>" ? "" : content;
        formData["about"] = value;
        this.setState({ formData });
    }

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
                                <p>Discipline has been published.</p>
                            }
                            {
                                (action === "create" || action === "edit") &&
                                <p>Discipline was submitted successfully.</p>
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
                        <Navigate to="/discipline" />
                    }
                    {
                        this.state.modalRedirect && 
                        action === "publish" &&
                        <Navigate to="/discipline/reviews" />
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
                    {this.state.modalRedirect && <Navigate to="/discipline" />}
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
                                label="Name of discipline"
                                value={formData.name}
                                onChange={this.handleChange}
                                placeholder="Social Sciences"
                                required={true}
                                error={errors.name}
                            />
                            <QuillEditor
                                name="about"
                                label="About"
                                value={formData.about}
                                modules={this.quillModules}
                                onChange={this.handleAbout}
                                placeholder="Discipline description"
                                required={true}
                                error={errors.about}
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
                                required={true}
                                error={errors.icon}
                            />
                            <Select
                                name="iconColor"
                                label="Icon color"
                                value={formData.iconColor}
                                onChange={this.handleChange}
                                options={this.options.iconColor}
                                required={true}
                                error={errors.iconColor}
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

export default DisciplineForm;
