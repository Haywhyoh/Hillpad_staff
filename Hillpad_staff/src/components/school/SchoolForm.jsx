import { Component } from "react";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import schoolService from "../../services/api/schoolService";
import countryService from "../../services/api/countryService";
import httpService from "../../services/httpService";

import Input from "../common/form/Input";
import Select from "../common/form/Select";
import FileInput from "../common/form/FileInput";
import QuillEditor from "../common/form/QuillEditor";
import TextArea from "../common/form/TextArea";


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
            academicStaff: "",
            students: "",
            banner: "",
            logo: "",
        },
        errors: {},

        countries: [],

        showStatusModal: false,
        statusModal: "loading",
        modalRedirect: false,

        school: {},
        bannerURL: "",
        logoURL: "",

        reviewAction: "",
        rejectReason: "",
    };

    options = {
        institutionType: [
            { value: "Public", name: "Public" },
            { value: "Private", name: "Private" },
            { value: "PublicPrivate", name: "Public/Private" },
            { value: "Religious", name: "Religious" },
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

    setFormState = async (school) => {
        let bannerImage = null;
        let logoImage = null;

        try {
            this.setState({ bannerURL: school.banner? school.banner : "" });
            this.setState({ logoURL: school.logo? school.logo : "" });

            if (school.banner) {
                const response = await httpService.get(school.banner, {responseType: "blob"});
                if (response.status === 200) {
                    // Extract file extension from the Content-Type header
                    const contentType = response.headers['content-type'];
                    const fileExtension = contentType.split('/')[1];
            
                    // Create a Blob from the downloaded image data
                    const imageBlob = new Blob([response.data], { type: contentType });
            
                    // Create a File object with the downloaded image and set the image state
                    const imageFile = new File([imageBlob], `school_banner.${fileExtension}`, {
                        type: contentType,
                    });
            
                    bannerImage = imageFile;
                }
            }

            if (school.logo) {
                const response = await httpService.get(school.logo, {responseType: "blob"});
                if (response.status === 200) {
                    // Extract file extension from the Content-Type header
                    const contentType = response.headers['content-type'];
                    const fileExtension = contentType.split('/')[1];
            
                    // Create a Blob from the downloaded image data
                    const imageBlob = new Blob([response.data], { type: contentType });
            
                    // Create a File object with the downloaded image and set the image state
                    const imageFile = new File([imageBlob], `school_logo.${fileExtension}`, {
                        type: contentType,
                    });
            
                    logoImage = imageFile;
                }
            }

            const formData = {
                name: school.name,
                about: school.about,
                address: school.address,
                city: school.city,
                country: school.country.id,
                institutionType: school.institution_type,
                ranking: school.ranking > 0? school.ranking : "",
                yearEstablished: school.year_established > 0? school.year_established : "",
                academicStaff: school.academic_staff > 0? school.academic_staff : "",
                students: school.students > 0? school.students : "",
                banner: bannerImage? bannerImage : "",
                logo: logoImage? logoImage : "",
            };
            this.setState({ formData });
        } catch (error) {
            // alert('An error occurred while downloading the image.');
            console.error(error);
            throw new Error(error);
        }
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

            if ("schoolID" in this.props) {
                const { schoolID } = this.props;
    
                let response = await schoolService.getSchoolDraft(schoolID);
                if (response.status === 200) {
                    const school = response.data;
                    this.setState({ school: response });
                    await this.setFormState(school);
                    // this.setState({ formData });
                }
            }
            
            // Get countries
            let { data } = await countryService.getCountries();
            const countries = data.results.map((item) => ({
                value: item.id,
                name: item.name,
            }));
            this.setState({ countries });
        } catch (ex) {
            console.log(ex);
            throw new Error(ex);
        }
    };

    validateForm = () => {
        const errors = {};

        const { formData } = this.state;
        if (formData.name === "") errors["name"] = "School name must not be empty";
        if (formData.about === "") errors["about"] = "About section must not be empty";
        if (formData.city === "") errors["city"] = "City must not be empty";
        if (formData.country === "") errors["country"] = "You must select the country";
        
        return Object.keys(errors).length === 0 ? null : errors;
    };

    validateRejection = () => {
        const { rejectReason } = this.state;
        return rejectReason.trim() === "";
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
        if (action === "review") {
            try {
                if (this.state.reviewAction === "approve") {
                    const response = await schoolService.approveSchoolDraft(this.props.schoolID);
                    if (response.status === 200) {
                        console.log("Approved");
                        this.setState({ statusModal: "success" });
                    }
                } else if (this.state.reviewAction === "reject") {
                    const data = { reject_reason: this.state.rejectReason };
                    const response = await schoolService.rejectSchoolDraft(this.props.schoolID, data);
                    if (response.status === 200) {
                        console.log("Rejected");
                        this.setState({ statusModal: "success" });
                    }
                }

            } catch (error) {
                console.log(error);
                this.setState({ statusModal: "error" });
            }
        }
        else if (action === "publish") {
            try {
                const response = await schoolService.publishSchoolDraft(this.props.schoolID);
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
            const data = this.mapToSchoolModel(this.state.formData);
            try {
                let initialResponse;
                if (action === "create") {
                    initialResponse = await schoolService.createSchoolDraft(data);
                } else if (action === "edit") {
                    initialResponse = await schoolService.updateSchoolDraft(this.props.schoolID, data);
                } else {
                    throw new Error("Unknown form action");
                }
    
                if (
                    ((initialResponse.status === 201 && action === "create") ||
                    (initialResponse.status === 200 && action === "edit")) &&
                    initialResponse.data
                ) {
                    const submitResponse = await schoolService.submitSchoolDraft(initialResponse.data["id"]);
                    if (submitResponse.status === 200 && submitResponse.data) {
                        console.log("Submitted");
                        this.setState({ statusModal: "success" });
                    }
                    else {
                        console.log("An error occured while trying to submit the school", submitResponse.status);
                        this.setState({ statusModal: "error" })
                    }
                } else {
                    console.log("An error occured while trying to create the school", initialResponse.status);
                    this.setState({ statusModal: "error" });
                }
            } catch (error) {
                console.log(error);
                this.setState({ statusModal: "error" });
            }
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
        formattedFormData.append("ranking", data.ranking? data.ranking : -1);
        formattedFormData.append("year_established", data.yearEstablished? data.yearEstablished : -1);
        formattedFormData.append("academic_staff", data.academicStaff? data.academicStaff : -1);
        formattedFormData.append("students", data.students? data.students : -1);
        formattedFormData.append("banner", data.banner);
        formattedFormData.append("logo", data.logo);

        return formattedFormData;
    };

    handleChange = ({ currentTarget: input }) => {
        const formData = { ...this.state.formData };
        formData[input.name] = input.value;
        this.setState({ formData });
    };

    handleFileChange = ({ currentTarget: input }) => {
        const formData = { ...this.state.formData };
        formData[input.name] = input.files[0];
        this.setState({ formData });
    };

    handleAbout = (content) => {
        const formData = { ...this.state.formData };
        const value = content === "<p><br></p>" ? "" : content;
        formData["about"] = value;
        this.setState({ formData });
    };

    handleRejectReason = ({ currentTarget: input }) => {
        this.setState({ rejectReason: input.value });
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
                                <p>School has been published.</p>
                            }
                            {
                                action === "review" &&
                                this.state.reviewAction === "approve" &&
                                <p>School has been approved.</p>
                            }
                            {
                                action === "review" &&
                                this.state.reviewAction === "reject" &&
                                <p>School has been rejected.</p>
                            }
                            {
                                (action === "create" || action === "edit") &&
                                <p>School was submitted successfully.</p>
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
                    {this.state.modalRedirect && <Navigate to="/school" />}
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
        if (action === "review") {
            return (
                <>
                    <div className="mt-4 text-end">
                        <button
                            type="submit"
                            className="btn btn-danger me-2"
                            disabled={this.validateRejection()}
                            onClick={() => {
                                    this.setState({ reviewAction: "reject" });
                                }
                            }
                        >
                            Reject
                        </button>
                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={() => {
                                    this.setState({ reviewAction: "approve" });
                                }
                            }
                        >
                            Approve
                        </button>
                    </div>
                </>
            );
        } else if (action === "publish") {
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
                        {/* <button
                            type="submit"
                            className="btn btn-dark me-2"
                        >
                            Save and submit later
                        </button> */}
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
        const { formTitle, action } = this.props;
        const { formData, errors, countries, showStatusModal, bannerURL, logoURL, rejectReason } = this.state;
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
                                placeholder="e.g. HillPad University"
                                required={true}
                                error={errors.name}
                            />
                            <QuillEditor
                                name="about"
                                label="About"
                                value={formData.about}
                                modules={this.quillModules}
                                onChange={this.handleAbout}
                                placeholder="Short description of school"
                                required={true}
                                error={errors.about}
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
                                required={true}
                                error={errors.city}
                            />
                            <Select
                                name="country"
                                label="Country"
                                value={formData.country}
                                onChange={this.handleChange}
                                required={true}
                                options={countries}
                                error={errors.country}
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
                            <div className="row">
                                <div className="col mb-3">
                                    <label className="row ms-1 text-success" htmlFor="banner-selected">Selected:</label>
                                    {formData.banner && (
                                        <img
                                            id="banner-selected"
                                            className="row ms-1 mt-1 border border-success rounded"
                                            src={URL.createObjectURL(formData.banner)} // Convert the image to a data URL
                                            alt="Preview selected banner image"
                                            style={{ maxWidth: '200px' }}
                                        />
                                    )}
                                </div>
                                <div className=" col mb-3">
                                    <label className="row ms-1 text-primary" htmlFor="banner-current">Current:</label>
                                    {bannerURL && (
                                        <img
                                            id="banner-current"
                                            className="row ms-1 mt-1 border border-primary rounded" 
                                            src={bannerURL}
                                            alt="Preview current banner image"
                                            style={{ maxWidth: '200px' }} 
                                        />
                                    )}
                                </div>
                            </div>

                            <FileInput
                                name="logo"
                                label="Upload school logo"
                                onChange={this.handleFileChange}
                            />
                            <div className="row">
                                <div className="col mb-3">
                                    <label className="row ms-1 text-success" htmlFor="logo-selected">Selected:</label>
                                    {formData.logo && (
                                        <img
                                            id="logo-selected"
                                            className="row ms-1 mt-1 border border-success rounded"
                                            src={URL.createObjectURL(formData.logo)} // Convert the image to a data URL
                                            alt="Preview selected logo image"
                                            style={{ maxWidth: '200px' }}
                                        />
                                    )}
                                </div>
                                <div className=" col mb-3">
                                    <label className="row ms-1 text-primary" htmlFor="logo-current">Current:</label>
                                    {logoURL && (
                                        <img
                                            id="logo-current"
                                            className="row ms-1 mt-1 border border-primary rounded" 
                                            src={logoURL}
                                            alt="Preview current logo image"
                                            style={{ maxWidth: '200px' }} 
                                        />
                                    )}
                                </div>
                            </div>

                            {
                                action === "review" &&
                                <TextArea 
                                    name="rejectReason"
                                    label="Reason for rejection"
                                    onChange={this.handleRejectReason}
                                    value={rejectReason}
                                    placeholder="e.g. The school logo is too wide, try to reduce the width"
                                />
                            }

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

export default SchoolForm;
