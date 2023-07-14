import { Component } from "react";

import countryService from "../../services/api/countryService";
import currencyService from "../../services/api/currencyService";

import Input from "../common/form/Input";
import Select from "../common/form/Select";
import TextArea from "../common/form/TextArea";
import FileInput from "../common/form/FileInput";


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
        currencies: []
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

        const data = this.mapToCountryModel(this.state.formData);
        try {
            const response = await countryService.createCountryDraft(data);
            if (response.status === 201 && response.data) {
                console.log("Submitted");
                alert("Created successfully");
            }
        } catch (error) {
            console.log(error);
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

    render() {
        const { formTitle } = this.props;
        const { formData, currencies } = this.state;
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
                            <TextArea
                                name="caption"
                                label="Short caption"
                                value={formData.caption}
                                onChange={this.handleChange}
                                required={true}
                                placeholder="Short caption about country."
                            />
                            <TextArea
                                name="about"
                                label="About"
                                value={formData.about}
                                onChange={this.handleChange}
                                required={true}
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
                            <TextArea
                                name="triviaFacts"
                                label="Trivia and Fun Facts"
                                value={formData.triviaFacts}
                                onChange={this.handleChange}
                                placeholder="Country trivia and fun facts"
                            />
                            <TextArea
                                name="livingCosts"
                                label="Living costs"
                                value={formData.livingCosts}
                                onChange={this.handleChange}
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
            </>
        );
    }
}

export default CountryForm;
