// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";

import CheckBox from "../common/form/CheckBox";
import Input from "../common/form/Input";
import Select from "../common/form/Select";
import TextArea from "../common/form/TextArea";

class CourseForm extends Component {
    state = {};

    render() {
       const { formTitle } = this.props;
        return (
            <>
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">{formTitle}</h5>
                    </div>
                    <div className="card-body">
                        <form>
                            <Input
                                name="course"
                                label="Name of course"
                                placeholder="Industrial Chemistry"
                                required={true}
                            />
                            <Input
                                name="about"
                                label="About"
                                placeholder="Short description of course"
                            />
                            <TextArea
                                name="overview"
                                label="Overview"
                                placeholder="Course overview"
                            />
                            <Input
                                name="duration"
                                label="Duration of course"
                                placeholder="Course duration"
                                type="number"
                            />
                            <Select
                                name="school"
                                label="School"
                                required={true}
                                options={[
                                    {
                                        value: "1",
                                        name: "Politecnico di Milano",
                                    },
                                    {
                                        value: "2",
                                        name: "Toronto Metropolitan University",
                                    },
                                    {
                                        value: "3",
                                        name: "University of Fairfax",
                                    },
                                ]}
                            />
                            <CheckBox
                                name="disciplines"
                                label="Disciplines"
                                required={true}
                                options={[
                                    {
                                        value: "1",
                                        name: "Agriculture & Forestry",
                                    },
                                    {
                                        value: "2",
                                        name: "Art, Design & Architecture",
                                    },
                                    {
                                        value: "3",
                                        name: "Business & Management",
                                    },
                                    {
                                        value: "4",
                                        name: "Computer Science & IT",
                                    },
                                    {
                                        value: "5",
                                        name: "Education & Training",
                                    },
                                    {
                                        value: "6",
                                        name: "Engineering & Technology",
                                    },
                                    {
                                        value: "7",
                                        name: "Natural Sciences & Mathematics",
                                    },
                                    {
                                        value: "8",
                                        name: "Environmental Sciences",
                                    },
                                ]}
                            />

                            <small className="text-light fw-semibold">
                                Important Dates
                            </small>
                            <Input
                                name="start-date"
                                label="Start Date"
                                type="month"
                            />
                            <Input
                                name="application-deadline"
                                label="Application Deadline"
                                type="month"
                            />

                            <Input
                                name="tuition-fee"
                                label="Tuition Fee"
                                type="number"
                                placeholder="Tuition fee"
                            />
                            <Select
                                name="tuition-fee-base"
                                label="Tuition Fee Base"
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
                                name="tuition-currency"
                                label="Tuition Currency"
                                options={[
                                    {
                                        value: "1",
                                        name: "British Pound (GBP)",
                                    },
                                    { value: "2", name: "Euro (EUR)" },
                                    {
                                        value: "3",
                                        name: "Nigerian Naira (NGN)",
                                    },
                                    { value: "4", name: "US Dollar (USD)" },
                                ]}
                            />

                            <Select
                                name="course-format"
                                label="Course Format"
                                options={[
                                    { value: "1", name: "Part-time" },
                                    { value: "2", name: "Full-time" },
                                ]}
                            />
                            <Select
                                name="course-attendance"
                                label="Course Attendance"
                                options={[
                                    { value: "1", name: "On-site" },
                                    { value: "2", name: "Online" },
                                    { value: "3", name: "Blended" },
                                ]}
                            />

                            <Select
                                name="programme-type"
                                label="Programme Type"
                                options={[
                                    { value: "1", name: "Bachelors" },
                                    { value: "2", name: "Masters" },
                                    { value: "3", name: "Doctorates" },
                                ]}
                            />
                            <Select
                                name="degree-type"
                                label="Degree Type"
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
                                required={true}
                                options={[
                                    { value: "1", name: "English" },
                                    { value: "2", name: "French" },
                                    { value: "3", name: "German" },
                                ]}
                            />

                            <TextArea
                                name="programme-structure"
                                label="Programme Structure"
                                placeholder="Course programme structure"
                                rows={20}
                            />
                            <TextArea
                                name="admission-requirements"
                                label="Admission Requirements"
                                placeholder="Course admission requirements"
                                rows={20}
                            />
                            <Input
                                name="programme-website"
                                label="Official Programme Website"
                                type="url"
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
