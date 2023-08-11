import { Component } from "react";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import countryService from "../../services/api/countryService";
import currencyService from "../../services/api/currencyService";
import httpService from "../../services/httpService";

import Input from "../common/form/Input";
import Select from "../common/form/Select";
import FileInput from "../common/form/FileInput";
import QuillEditor from "../common/form/QuillEditor";


class CountryForm extends Component {
    state = {
        formData: {
            name: "",
            shortCode: "",
            caption: "",
            continent: "",
            capital: "",
            population: "",
            students: "",
            internationalStudents: "",
            currency: "",
            about: "",
            aboutWikiLink: "",
            triviaFacts: "",
            livingCosts: "",
            banner: ""
        },
        errors: {},

        currencies: [],

        showStatusModal: false,
        statusModal: "loading",
        modalRedirect: false,

        country: {},
        bannerURL: "",
    };

    options = {
        continent: [
            { name: "Africa", value: "AF" },
            { name: "Asia", value: "AS" },
            { name: "Europe", value: "EU" },
            { name: "North America", value: "NA" },
            { name: "South America", value: "SA" },
            { name: "Oceania", value: "OC" }
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

    setFormState = async (country) => {
        let bannerImage = null;

        try {
            this.setState({ bannerURL: country.banner? country.banner : "" });

            if (country.banner) {
                const response = await httpService.get(country.banner, {responseType: "blob"});
                if (response.status === 200) {
                    // Extract file extension from the Content-Type header
                    console.log(response);
                    const contentType = response.headers['content-type'];
                    const fileExtension = contentType.split('/')[1];
            
                    // Create a Blob from the downloaded image data
                    const imageBlob = new Blob([response.data], { type: contentType });
            
                    // Create a File object with the downloaded image and set the image state
                    const imageFile = new File([imageBlob], `country_banner.${fileExtension}`, {
                        type: contentType,
                    });
            
                    bannerImage = imageFile;
                }
            }

            const formData = {
                name: country.name,
                shortCode: country.short_code,
                caption: country.caption,
                continent: country.continent,
                capital: country.capital,
                population: country.population > 0? country.population : "",
                students: country.students > 0? country.students: "",
                internationalStudents: country.international_students > 0? country.international_students : "",
                currency: country.currency.id,
                about: country.about,
                aboutWikiLink: country.about_wiki_link,
                triviaFacts: country.trivia_facts,
                livingCosts: country.living_costs,
                banner: bannerImage? bannerImage : "",
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

            if ("countryID" in this.props) {
                const { countryID } = this.props;
    
                let response = await countryService.getCountryDraft(countryID);
                if (response.status === 200) {
                    const country = response.data;
                    this.setState({ country: response });
                    await this.setFormState(country);
                }
            }
            // Get currencies
            let { data } = await currencyService.getCurrencies();
            const currencies = data.results.map((item) => ({
                name: item.name,
                value: item.id,
            }));
            this.setState({ currencies });
        } catch (ex) {
            console.log(ex);
            throw new Error(ex);
        }
    };

    validateForm = () => {
        const errors = {};

        const { formData } = this.state;
        if (formData.name === "") errors["name"] = "Country name must not be empty";
        if (formData.shortCode === "") errors["shortCode"] = "Country Short Code must not be empty";
        if (formData.capital === "") errors["capital"] = "Capital city must not be empty";
        if (formData.caption === "") errors["caption"] = "Caption must not be empty";
        if (formData.about === "") errors["about"] = "About must not be empty";
        if (formData.continent === "") errors["country"] = "You must select the continent";
        if (formData.population === "") errors["population"] = "Population must not be empty";
        if (formData.currency === "") errors["currency"] = "You must select the currency";
        if (formData.aboutWikiLink === "") errors["aboutWikiLink"] = "About wiki link must not be empty";
        
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
                const response = await countryService.publishCountryDraft(this.props.countryID);
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
            const data = this.mapToCountryModel(this.state.formData);
            try {
                let initialResponse;
                if (action === "create") {
                    initialResponse = await countryService.createCountryDraft(data);
                } else if (action === "edit") {
                    initialResponse = await countryService.updateCountryDraft(this.props.countryID, data);
                } else {
                    throw new Error("Unknown form action");
                }
    
                if (
                    ((initialResponse.status === 201 && action === "create") ||
                    (initialResponse.status === 200 && action === "edit")) &&
                    initialResponse.data
                ) {
                    const submitResponse = await countryService.submitCountryDraft(initialResponse.data["id"]);
                    if (submitResponse.status === 200 && submitResponse.data) {
                        console.log("Submitted");
                        this.setState({ statusModal: "success" });
                    }
                    else {
                        console.log("An error occured while trying to submit the country entry", submitResponse.status);
                        this.setState({ statusModal: "error" })
                    }
                } else {
                    console.log("An error occured while trying to create the country entry", initialResponse.status);
                    this.setState({ statusModal: "error" });
                }
            } catch (error) {
                console.log(error);
                this.setState({ statusModal: "error" });
            }
        }
    };

    mapToCountryModel = (data) => {

        const formattedFormData = new FormData();

        formattedFormData.append("name", data.name);
        formattedFormData.append("short_code", data.shortCode);
        formattedFormData.append("caption", data.caption);
        formattedFormData.append("continent", data.continent);
        formattedFormData.append("capital", data.capital);
        formattedFormData.append("population", data.population? data.population : -1);
        formattedFormData.append("students", data.students? data.students : -1);
        formattedFormData.append("international_students", data.internationalStudents? data.internationalStudents : -1);
        formattedFormData.append("currency", data.currency);
        formattedFormData.append("about", data.about);
        formattedFormData.append("about_wiki_link", data.aboutWikiLink);
        formattedFormData.append("trivia_facts", data.triviaFacts);
        formattedFormData.append("living_costs", data.livingCosts);
        formattedFormData.append("banner", data.banner);

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

    handleCaption = (content) => {
        const formData = { ...this.state.formData };
        const value = content === "<p><br></p>" ? "" : content;
        formData["caption"] = value;
        this.setState({ formData });
    }

    handleAbout = (content) => {
        const formData = { ...this.state.formData };
        const value = content === "<p><br></p>" ? "" : content;
        formData["about"] = value;
        this.setState({ formData });
    }

    handleTriviaFacts = (content) => {
        const formData = { ...this.state.formData };
        const value = content === "<p><br></p>" ? "" : content;
        formData["triviaFacts"] = value;
        this.setState({ formData });
    }

    handleLivingCosts = (content) => {
        const formData = { ...this.state.formData };
        const value = content === "<p><br></p>" ? "" : content;
        formData["livingCosts"] = value;
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
                                <p>Country has been published.</p>
                            }
                            {
                                (action === "create" || action === "edit") &&
                                <p>Country was submitted successfully.</p>
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
                    {this.state.modalRedirect && <Navigate to="/country" />}
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
        const { formData, errors, currencies, showStatusModal, bannerURL } = this.state;
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
                                label="Name of country"
                                value={formData.name}
                                onChange={this.handleChange}
                                placeholder="e.g. Australia"
                                required={true}
                                error={errors.name}
                            />
                            <Input
                                name="shortCode"
                                label="Country short code (ISO 3166-1 Alpha-2)"
                                value={formData.shortCode}
                                onChange={this.handleChange}
                                placeholder="e.g. au"
                                maxLength={2}
                                required={true}
                                error={errors.shortCode}
                            />
                            <Input
                                name="capital"
                                label="Capital city"
                                value={formData.capital}
                                onChange={this.handleChange}
                                placeholder="e.g. Canberra"
                                required={true}
                                error={errors.capital}
                            />
                            <Select
                                name="continent"
                                label="Continent"
                                value={formData.continent}
                                onChange={this.handleChange}
                                options={this.options.continent}
                                required={true}
                                error={errors.continent}
                            />
                            <QuillEditor
                                name="caption"
                                label="Short caption"
                                value={formData.caption}
                                modules={this.quillModules}
                                onChange={this.handleCaption}
                                placeholder="Short caption about country"
                                required={true}
                                error={errors.caption}/>
                            <QuillEditor
                                name="about"
                                label="About"
                                value={formData.about}
                                modules={this.quillModules}
                                onChange={this.handleAbout}
                                placeholder="About"
                                required={true}
                                error={errors.about}
                            />

                            <small className="text-light fw-semibold">
                                Demographics
                            </small>
                            <Input
                                name="population"
                                label="Country population"
                                value={formData.population}
                                type="number"
                                onChange={this.handleChange}
                                placeholder="Population"
                                required={true}
                                error={errors.population}
                            />
                            <Input
                                name="students"
                                label="Total number of students in country"
                                value={formData.students}
                                type="number"
                                onChange={this.handleChange}
                                placeholder="Total number of students in country"
                            />
                            <Input
                                name="internationalStudents"
                                label="Total number of international students in country"
                                value={formData.internationalStudents}
                                type="number"
                                onChange={this.handleChange}
                                placeholder="Total number of international students in country"
                            />
                            <Select
                                name="currency"
                                label="Country currency"
                                value={formData.currency}
                                onChange={this.handleChange}
                                options={currencies}
                                required={true}
                                error={errors.currency}
                            />
                            <Input
                                name="aboutWikiLink"
                                label="Link to country Wikipedia page"
                                type="url"
                                value={formData.aboutWikiLink}
                                onChange={this.handleChange}
                                placeholder="e.g. https://en.wikipedia.org/wiki/Australia"
                                required={true}
                                error={errors.aboutWikiLink}
                            />
                            <QuillEditor
                                name="triviaFacts"
                                label="Trivia and Fun Facts"
                                value={formData.triviaFacts}
                                modules={this.quillModules}
                                onChange={this.handleTriviaFacts}
                                placeholder="Country trivia and fun facts"
                            />
                            <QuillEditor
                                name="livingCosts"
                                label="Living costs"
                                value={formData.livingCosts}
                                modules={this.quillModules}
                                onChange={this.handleLivingCosts}
                                placeholder="Average living costs in country"
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

export default CountryForm;
