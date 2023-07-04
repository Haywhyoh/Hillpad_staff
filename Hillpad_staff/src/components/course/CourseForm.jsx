// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";

import schoolService from "../../services/api/schoolService";
import disciplineService from "../../services/api/disciplineService";
import currencyService from "../../services/api/currencyService";
import programmeTypeService from "../../services/api/programmeTypeService";
import languageService from "../../services/api/languageService";

import CheckBox from "../common/form/CheckBox";
import Input from "../common/form/Input";
import Select from "../common/form/Select";
import TextArea from "../common/form/TextArea";


class CourseForm extends Component {
    state = {
        formData: {
            course: "",
            about: "",
            overview: "",
            duration: "",
            durationBase: "",
            school: "",
            disciplines: [],
            startDate: "",
            applicationDeadline: "",
            tuitionFee: "",
            tuitionFeeBase: "",
            tuitionCurrency: "",
            courseFormat: "",
            courseAttendance: "",
            programmeType: "",
            degreeType: "",
            language: "",
            programmeStructure: "",
            admissionRequirements: "",
            programmeWebsite: ""
        },
        schools: [],
        disciplines: [],
        currencies: [],
        programmeTypes: [],
        languages: []
    };

    async componentDidMount() {
        // Get schools
        let { data } = await schoolService.getSchools();
        const schools = data.results.map(item => (
            {
                value: item.id,
                name: item.name
            }
        ));
        this.setState({ schools });

        // Get disciplines
        ({ data } = await disciplineService.getDisciplines());
        const disciplines = data.results.map(item => (
            {
                value: item.id,
                name: item.name
            }
        ));
        this.setState({ disciplines });

        // Get currencies
        ({ data } = await currencyService.getCurrencies());
        const currencies = data.results.map(item => (
            {
                value: item.id,
                name: item.name
            }
        ));
        this.setState({ currencies });

        // Get programme types
        ({ data } = await programmeTypeService.getProgrammeTypes());
        const programmeTypes = data.results.map(item => (
            {
                value: item.id,
                name: item.name
            }
        ));
        this.setState({ programmeTypes });

        // Get languages
        ({ data } = await languageService.getLanguages());
        const languages = data.results.map(item => (
            {
                value: item.id,
                name: item.name
            }
        ));
        this.setState({ languages });
    }

    handleSubmit = e => {
        e.preventDefault();

        console.log(e);

        console.log("Submitted");
    }

    handleChange = ({ currentTarget: input }) => {
        const formData = {...this.state.formData};
        formData[input.name] = input.value;
        this.setState({ formData });
    }

    handleCheckBoxChange = ({ target: input }) => {
        const formData = {...this.state.formData};
        console.log(input);
        console.log(input.checked);
        if (input.checked) {
            console.log("the if");
            formData[input.name] = [...formData[input.name], input.value]
            this.setState({ formData });
        } else {
            console.log("the else");
            formData[input.name] = formData[input.name].filter(_ => _ !== input.value);
            this.setState({ formData });
        }
    }

    render() {
       const { formTitle } = this.props;
       const { formData, schools, disciplines, currencies, programmeTypes, languages } = this.state;
        return (
            <>
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">{formTitle}</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <Input
                                name="course"
                                label="Name of course"
                                value={formData.course}
                                onChange={this.handleChange}
                                placeholder="Industrial Chemistry"
                                required={true}
                            />
                            <Input
                                name="about"
                                label="About"
                                value={formData.about}
                                onChange={this.handleChange}
                                placeholder="Short description of course"
                            />
                            <TextArea
                                name="overview"
                                label="Overview"
                                value={formData.overview}
                                onChange={this.handleChange}
                                placeholder="Course overview"
                            />
                            <Input
                                name="duration"
                                label="Duration of course"
                                value={formData.duration}
                                onChange={this.handleChange}
                                placeholder="Course duration"
                                type="number"
                            />
                            <Select
                                name="durationBase"
                                label="Duration Base"
                                value={formData.durationBase}
                                onChange={this.handleChange}
                                options={[
                                    {
                                        value: "1",
                                        name: "Month",
                                    },
                                    {
                                        value: "2",
                                        name: "Semester",
                                    },
                                    {
                                        value: "3",
                                        name: "Year",
                                    },
                                ]}
                            />
                            <Select
                                name="school"
                                label="School"
                                value={formData.school}
                                onChange={this.handleChange}
                                required={true}
                                options={schools}
                            />
                            <CheckBox
                                name="disciplines"
                                label="Disciplines"
                                required={true}
                                value={formData.disciplines}
                                onChange={this.handleCheckBoxChange}
                                options={disciplines}
                            />

                            <small className="text-light fw-semibold">
                                Important Dates
                            </small>
                            <Input
                                name="startDate"
                                label="Start Date"
                                type="month"
                                value={formData.startDate}
                                onChange={this.handleChange}
                            />
                            <Input
                                name="applicationDeadline"
                                label="Application Deadline"
                                type="month"
                                value={formData.applicationDeadline}
                                onChange={this.handleChange}
                            />

                            <Input
                                name="tuitionFee"
                                label="Tuition Fee"
                                type="number"
                                value={formData.tuitionFee}
                                onChange={this.handleChange}
                                placeholder="Tuition fee"
                            />
                            <Select
                                name="tuitionFeeBase"
                                label="Tuition Fee Base"
                                value={formData.tuitionFeeBase}
                                onChange={this.handleChange}
                                options={[
                                    { value: "1", name: "Per semester" },
                                    { value: "2", name: "Per year" },
                                    {
                                        value: "3",
                                        name: "Per full programme",
                                    },
                                ]}
                            />
                            <Select
                                name="tuitionCurrency"
                                label="Tuition Currency"
                                value={formData.tuitionCurrency}
                                onChange={this.handleChange}
                                options={currencies}
                            />

                            <Select
                                name="courseFormat"
                                label="Course Format"
                                value={formData.courseFormat}
                                onChange={this.handleChange}
                                options={[
                                    { value: "1", name: "Part-time" },
                                    { value: "2", name: "Full-time" },
                                ]}
                            />
                            <Select
                                name="courseAttendance"
                                label="Course Attendance"
                                value={formData.courseAttendance}
                                onChange={this.handleChange}
                                options={[
                                    { value: "1", name: "On-site" },
                                    { value: "2", name: "Online" },
                                    { value: "3", name: "Blended" },
                                ]}
                            />

                            <Select
                                name="programmeType"
                                label="Programme Type"
                                value={formData.programmeType}
                                onChange={this.handleChange}
                                options={programmeTypes}
                            />
                            <Select
                                name="degreeType"
                                label="Degree Type"
                                value={formData.degreeType}
                                onChange={this.handleChange}
                                options={[
                                    {
                                        value: "1",
                                        name: "B.Sc. Bachelor of Science",
                                    },
                                    {
                                        value: "2",
                                        name: "B.A. Bachelor of Arts",
                                    },
                                    {
                                        value: "3",
                                        name: "M.Sc. Master of Science",
                                    },
                                    {
                                        value: "4",
                                        name: "M.A. Master of Arts",
                                    },
                                    {
                                        value: "5",
                                        name: "M.Eng. Master of Engineering",
                                    },
                                    {
                                        value: "6",
                                        name: "Ph.D. Doctor of Philosophy",
                                    },
                                ]}
                            />

                            <Select
                                name="language"
                                label="Language"
                                value={formData.language}
                                onChange={this.handleChange}
                                required={true}
                                options={languages}
                            />

                            <TextArea
                                name="programmeStructure"
                                label="Programme Structure"
                                value={formData.programmeStructure}
                                onChange={this.handleChange}
                                placeholder="Course programme structure"
                                rows={20}
                            />
                            <TextArea
                                name="admissionRequirements"
                                label="Admission Requirements"
                                value={formData.admissionRequirements}
                                onChange={this.handleChange}
                                placeholder="Course admission requirements"
                                rows={20}
                            />
                            <Input
                                name="programmeWebsite"
                                label="Official Programme Website"
                                type="url"
                                value={formData.programmeWebsite}
                                onChange={this.handleChange}
                                placeholder="https://hillpaduniversity.edu/undergrad"
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

export default CourseForm;
