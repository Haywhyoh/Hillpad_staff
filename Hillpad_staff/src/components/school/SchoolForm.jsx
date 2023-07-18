import { Component } from "react";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal"
import Spinner from "react-bootstrap/Spinner";

import schoolService from "../../services/api/schoolService";
import countryService from "../../services/api/countryService";

import Input from "../common/form/Input";
import Select from "../common/form/Select";
import TextArea from "../common/form/TextArea";
import FileInput from "../common/form/FileInput";


class SchoolForm extends Component {
    state = {
        formData: {
            name: "",
            about: "",
            address: "",
            city: "",
            country: "",
            institutionType: "",
            ranking: "",
            yearEstablished: "",
            academicStaff: [],
            students: "",
            banner: "",
            logo: "",
        },
        countries: [],

        showStatusModal: false,
        statusModal: "loading",
        modalRedirect: false,
    };

    options = {
        institutionType: [
            { value: "Public", name: "Public" },
            { value: "Private", name: "Private" },
            { value: "PublicPrivate", name: "Public/Private" },
            { value: "Religious", name: "Religious" },
        ]
    };

    async componentDidMount() {
        // Get countries
        let { data } = await countryService.getCountries();
        const countries = data.results.map((item) => ({
            value: item.id,
            name: item.name,
        }));
        this.setState({ countries });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ statusModal: "loading", showStatusModal: true });
        const data = this.mapToSchoolModel(this.state.formData);
        try {
            const createResponse = await schoolService.createSchoolDraft(data);
            if (createResponse.status === 201 && createResponse.data) {
                const submitResponse = await schoolService.submitSchoolDraft(createResponse.data["id"]);
                if (submitResponse.status === 200 && submitResponse.data) {
                    console.log("Submitted");
                    this.setState({ statusModal: "success" });
                }
                else {
                    console.log("An error occured while trying to submit the school", submitResponse.status);
                    this.setState({ statusModal: "error" })
                }
            } else {
                console.log("An error occured while trying to create the school", createResponse.status);
                this.setState({ statusModal: "error" });
            }
        } catch (error) {
            console.log(error);
            this.setState({ statusModal: "error" });
        }
    };

    mapToSchoolModel = (data) => {

        const formattedFormData = new FormData();

        formattedFormData.append("name", data.name);
        formattedFormData.append("about", data.about);
        formattedFormData.append("address", data.address);
        formattedFormData.append("city", data.city);
        formattedFormData.append("country", data.country);
        formattedFormData.append("institution_type", data.institutionType);
        formattedFormData.append("ranking", data.ranking);
        formattedFormData.append("year_established", data.yearEstablished);
        formattedFormData.append("academic_staff", data.academicStaff);
        formattedFormData.append("students", data.students);
        formattedFormData.append("banner", data.banner);
        formattedFormData.append("logo", data.logo);

        return formattedFormData;
    };

    handleChange = ({ currentTarget: input }) => {
        const formData = { ...this.state.formData };
        formData[input.name] = input.value;
        this.setState({ formData });
    };

    handleFileChange = ({ currentTarget: input}) => {
        const formData = { ...this.state.formData };
        formData[input.name] = input.files[0];
        this.setState({ formData });
    }

    renderModal = () => {
        if (this.state.statusModal === "success") {
            return (
                <>
                    <Modal.Body>
                        <div className="text-center mb-4">
                            <span className="bx bx-check-circle fs-1 text-success mb-3"></span>
                            <h3>Awesome!</h3>
                            <p>School was submitted successfully.</p>
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
                    {this.state.modalRedirect && <Navigate to="/school" />}
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
                <Spinner animation="border" role="status" size="lg">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Modal.Body>
        );

    };

    render() {
        const { formTitle } = this.props;
        const { formData, countries, showStatusModal } = this.state;
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
                                label="Name of school"
                                value={formData.name}
                                onChange={this.handleChange}
                                placeholder="HillPad University"
                                required={true}
                            />
                            <TextArea
                                name="about"
                                label="About"
                                value={formData.about}
                                onChange={this.handleChange}
                                required={true}
                                placeholder="Short description of school"
                            />
                            <small className="text-light fw-semibold">
                                Address
                            </small>
                            <Input
                                name="address"
                                label="Address of school (excluding its city and country)"
                                value={formData.address}
                                onChange={this.handleChange}
                                placeholder="12 Mockingbird Avenue"
                            />
                            <Input
                                name="city"
                                label="City"
                                value={formData.city}
                                onChange={this.handleChange}
                                placeholder="Lagos"
                            />
                            <Select
                                name="country"
                                label="Country"
                                value={formData.country}
                                onChange={this.handleChange}
                                required={true}
                                options={countries}
                            />
                            <Select
                                name="institutionType"
                                label="Institution Type"
                                value={formData.institutionType}
                                onChange={this.handleChange}
                                options={this.options.institutionType}
                            />
                            <Input
                                name="ranking"
                                label="Times Higher Education (THE) World University Ranking (WUR)"
                                type="number"
                                value={formData.ranking}
                                onChange={this.handleChange}
                                placeholder="201"
                            />
                            <Input
                                name="yearEstablished"
                                label="Year of Establishment"
                                type="number"
                                value={formData.yearEstablished}
                                onChange={this.handleChange}
                                placeholder="1901"
                            />
                            <Input
                                name="academicStaff"
                                label="Number of Academic Staff"
                                type="number"
                                value={formData.academicStaff}
                                onChange={this.handleChange}
                                placeholder="1000"
                            />
                             <Input
                                name="students"
                                label="Total number of students"
                                type="number"
                                value={formData.students}
                                onChange={this.handleChange}
                                placeholder="20000"
                            />
                            <FileInput
                                name="banner"
                                label="Upload a banner"
                                onChange={this.handleFileChange}
                            />
                            <FileInput
                                name="logo"
                                label="Upload school logo"
                                onChange={this.handleFileChange}
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

export default SchoolForm;
