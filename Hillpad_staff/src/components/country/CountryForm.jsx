import { Component } from "react";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import countryService from "../../services/api/countryService";
import currencyService from "../../services/api/currencyService";

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
        currencies: [],

        showStatusModal: false,
        statusModal: "loading",
        modalRedirect: false,
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

    async componentDidMount() {
        // Get currencies
        let { data } = await currencyService.getCurrencies();
        const currencies = data.results.map((item) => ({
            name: item.name,
            value: item.id,
        }));
        this.setState({ currencies });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ statusModal: "loading", showStatusModal: true });
        const data = this.mapToCountryModel(this.state.formData);
        try {
            const createResponse = await countryService.createCountryDraft(data);
            if (createResponse.status === 201 && createResponse.data) {
                const submitResponse = await countryService.submitCountryDraft(createResponse.data["id"]);
                if (submitResponse.status === 200 && submitResponse.data) {
                    console.log("Submitted");
                    this.setState({ statusModal: "success" });
                }
                else {
                    console.log("An error occured while trying to submit the country", submitResponse.status);
                    this.setState({ statusModal: "error" })
                }
            } else {
                console.log("An error occured while trying to create the country", createResponse.status);
                this.setState({ statusModal: "error" });
            }
        } catch (error) {
            console.log(error);
            this.setState({ statusModal: "error" });
        }
    };

    mapToCountryModel = (data) => {

        const formattedFormData = new FormData();

        formattedFormData.append("name", data.name);
        formattedFormData.append("short_code", data.shortCode);
        formattedFormData.append("caption", data.caption);
        formattedFormData.append("continent", data.continent);
        formattedFormData.append("capital", data.capital);
        formattedFormData.append("population", data.population);
        formattedFormData.append("students", data.students);
        formattedFormData.append("international_students", data.internationalStudents);
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
        if (this.state.statusModal === "success") {
            return (
                <>
                    <Modal.Body>
                        <div className="text-center mb-4">
                            <span className="bx bx-check-circle fs-1 text-success mb-3"></span>
                            <h3>Awesome!</h3>
                            <p>Country was submitted successfully.</p>
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
        const { formData, currencies, showStatusModal } = this.state;
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
                            />
                            <Input
                                name="shortCode"
                                label="Country short code (ISO 3166-1 Alpha-2)"
                                value={formData.shortCode}
                                onChange={this.handleChange}
                                placeholder="e.g. AU"
                                maxLength={2}
                                required={true}
                            />
                            <Input
                                name="capital"
                                label="Capital city"
                                value={formData.capital}
                                onChange={this.handleChange}
                                placeholder="e.g. Canberra"
                                required={true}
                            />
                            <Select
                                name="continent"
                                label="Continent"
                                value={formData.continent}
                                onChange={this.handleChange}
                                options={this.options.continent}
                                required={true}
                            />
                            <QuillEditor
                                name="caption"
                                label="Short caption"
                                value={formData.caption}
                                modules={this.quillModules}
                                onChange={this.handleCaption}
                                placeholder="Short caption about country"
                            />
                            <QuillEditor
                                name="about"
                                label="About"
                                value={formData.about}
                                modules={this.quillModules}
                                onChange={this.handleAbout}
                                placeholder="About"
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
                                required={true}
                                placeholder="Population"
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
                            />
                            <Input
                                name="aboutWikiLink"
                                label="Link to country Wikipedia page"
                                type="url"
                                value={formData.aboutWikiLink}
                                onChange={this.handleChange}
                                placeholder="e.g. https://en.wikipedia.org/wiki/Australia"
                                required={true}
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

export default CountryForm;
