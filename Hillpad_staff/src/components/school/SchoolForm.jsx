// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";

import schoolService from "../../services/api/schoolService";
import countryService from "../../services/api/countryService";

// import CheckBox from "../common/form/CheckBox";
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
        countries: []
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

        const data = this.mapToSchoolModel(this.state.formData);
        try {
            const response = await schoolService.createSchoolDraft(data);
            if (response.status === 201 && response.data) {
                console.log("Submitted");
                alert("Created successfully");
            }
        } catch (error) {
            console.log(error);
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
        // console.log(input.fil);
        const formData = { ...this.state.formData };
        // const filesOrder = ["banner", "logo"];
        formData[input.name] = input.files[0];
        this.setState({ formData });
    }


    render() {
        const { formTitle } = this.props;
        const { formData, countries } = this.state;
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
            </>
        );
    }
}

export default SchoolForm;
