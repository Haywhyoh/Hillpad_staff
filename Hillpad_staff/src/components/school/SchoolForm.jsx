import { Component } from "react";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import schoolService from "../../services/api/schoolService";
import countryService from "../../services/api/countryService";

import Input from "../common/form/Input";
import Select from "../common/form/Select";
import FileInput from "../common/form/FileInput";
import QuillEditor from "../common/form/QuillEditor";
import httpService from "../../services/httpService";


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
        countries: [],

        showStatusModal: false,
        statusModal: "loading",
        modalRedirect: false,

        school: {},
        bannerURL: "",
        logoURL: "",
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
            this.setState({ bannerURL: school.banner });
            this.setState({ logoURL: school.logo });

            if (school.banner !== "") {
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

            if (school.logo !== "") {
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
                ranking: school.ranking,
                yearEstablished: school.year_established,
                academicStaff: school.academic_staff,
                students: school.students,
                banner: bannerImage,
                logo: logoImage,
            };
            this.setState({ formData });
        } catch (error) {
            // alert('An error occurred while downloading the image.');
            console.error(error);
        }
    };

    async componentDidMount() {
        this.setState({ statusModal: "fetching", showStatusModal: true });
        this.loadData()
        .then(() => {
            this.setState({ showStatusModal: false });
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
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        
        const { action } = this.props;
        this.setState({ statusModal: "loading", showStatusModal: true });
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

    handleAbout = (content) => {
        const formData = { ...this.state.formData };
        const value = content === "<p><br></p>" ? "" : content;
        formData["about"] = value;
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
        const { formData, countries, showStatusModal, bannerURL, logoURL } = this.state;
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
                            <QuillEditor
                                name="about"
                                label="About"
                                value={formData.about}
                                modules={this.quillModules}
                                onChange={this.handleAbout}
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
