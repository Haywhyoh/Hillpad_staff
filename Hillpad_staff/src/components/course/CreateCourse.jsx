// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { Link } from "react-router-dom";

class CreateCourse extends Component {
    render() {
        return (
            <>
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="fw-bold py-3 mb-4">Create Course</h4>
                        <Link to="..">
                            <button
                                type="button"
                                className="btn btn-secondary mb-4"
                            >
                                <span className="tf-icons bx bx-arrow-back"></span>
                                &nbsp; Back
                            </button>
                        </Link>
                    </div>

                    <div className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Create a new course</h5>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label
                                        className="form-label fw-bold"
                                        htmlFor="course-name-field"
                                    >
                                        <span className="text-danger">* </span>Name
                                        of course
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="course-name-field"
                                        placeholder="Advanced Engineering"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="course-about-field"
                                    >
                                        About
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="course-about-field"
                                        placeholder="Short description of course"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="course-overview-field"
                                    >
                                        Overview
                                    </label>
                                    <textarea
                                        id="course-overview-field"
                                        className="form-control"
                                        rows={10}
                                        placeholder="Course overview"
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="course-duration-field"
                                    >
                                        Duration of course (in months)
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        id="course-duration-field"
                                        placeholder="Course duration months"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="course-school-field"
                                        className="form-label fw-bold"
                                    >
                                        <span className="text-danger">* </span>
                                        School
                                    </label>
                                    <select
                                        id="course-school-field"
                                        className="form-select"
                                        required
                                    >
                                        <option value="0">
                                            Select school...
                                        </option>
                                        <option value="1">
                                            Politecnico di Milano
                                        </option>
                                        <option value="2">
                                            Toronto Metropolitan University
                                        </option>
                                        <option value="3">
                                            University of Fairfax
                                        </option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="disciplines-field"
                                        className="form-label fw-bold"
                                    >
                                        <span className="text-danger">* </span>
                                        Disciplines
                                    </label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox1"
                                                value="option1"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="inlineCheckbox1"
                                            >
                                                Agriculture &amp; Forestry
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox2"
                                                value="option1"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="inlineCheckbox2"
                                            >
                                                Art, Design &amp; Architecture
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox1"
                                                value="option1"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="inlineCheckbox1"
                                            >
                                                Business &amp; Management
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox2"
                                                value="option1"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="inlineCheckbox2"
                                            >
                                                Computer Science &amp; IT
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox1"
                                                value="option1"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="inlineCheckbox1"
                                            >
                                                Education &amp; Training
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox2"
                                                value="option1"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="inlineCheckbox2"
                                            >
                                                Engineering &amp; Technology
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox1"
                                                value="option1"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="inlineCheckbox1"
                                            >
                                                Natural Sciences &amp;
                                                Mathematics
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox2"
                                                value="option1"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="inlineCheckbox2"
                                            >
                                                Environmental Sciences
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <small className="text-light fw-semibold">
                                    Important Dates
                                </small>
                                <div className="mt-2 mb-3">
                                    <label
                                        htmlFor="start-date-field"
                                        className="form-label"
                                    >
                                        Start Date
                                    </label>
                                    <input
                                        className="form-control"
                                        type="month"
                                        id="start-date-field"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="application-deadline-field"
                                        className="form-label"
                                    >
                                        Application Deadline
                                    </label>
                                    <input
                                        className="form-control"
                                        type="month"
                                        id="application-deadline-field"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="course-tuition-fee-field"
                                    >
                                        Tuition fee
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        id="course-tuition-fee-field"
                                        placeholder="Tuition fee"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="course-tuition-fee-base-field"
                                        className="form-label"
                                    >
                                        Tuition fee base
                                    </label>
                                    <select
                                        id="course-tuition-fee-base-field"
                                        className="form-select"
                                    >
                                        <option value="0">
                                            Select tuition fee base...
                                        </option>
                                        <option value="1">Per semester</option>
                                        <option value="2">Per year</option>
                                        <option value="3">
                                            Per full programme
                                        </option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="course-tuition-currency-field"
                                        className="form-label"
                                    >
                                        Tuition currency
                                    </label>
                                    <select
                                        id="course-tuition-currency-field"
                                        className="form-select"
                                    >
                                        <option value="0">
                                            Select tuition currency...
                                        </option>
                                        <option value="1">
                                            British Pound (GBP)
                                        </option>
                                        <option value="2">Euro (EUR)</option>
                                        <option value="3">
                                            Nigerian Naira (NGN)
                                        </option>
                                        <option value="4">
                                            US Dollar (USD)
                                        </option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="course-format-field"
                                        className="form-label"
                                    >
                                        Course format
                                    </label>
                                    <select
                                        id="course-format-field"
                                        className="form-select"
                                    >
                                        <option value="0">
                                            Select course format...
                                        </option>
                                        <option value="1">Part-time</option>
                                        <option value="2">Full-time</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="course-attendance-field"
                                        className="form-label"
                                    >
                                        Course attendance
                                    </label>
                                    <select
                                        id="course-attendance-field"
                                        className="form-select"
                                    >
                                        <option value="0">
                                            Select course attendance...
                                        </option>
                                        <option value="1">On-site</option>
                                        <option value="2">Online</option>
                                        <option value="3">Blended</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="course-attendance-field"
                                        className="form-label"
                                    >
                                        Programme Type
                                    </label>
                                    <select
                                        id="course-attendance-field"
                                        className="form-select"
                                    >
                                        <option value="0">
                                            Select programme type...
                                        </option>
                                        <option value="1">Bachelors</option>
                                        <option value="2">Masters</option>
                                        <option value="3">Doctorates</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="course-attendance-field"
                                        className="form-label"
                                    >
                                        Degree Type
                                    </label>
                                    <select
                                        id="course-attendance-field"
                                        className="form-select"
                                    >
                                        <option value="0">
                                            Select degree type...
                                        </option>
                                        <option value="1">
                                            B.Sc. Bachelor of Science
                                        </option>
                                        <option value="2">
                                            B.A. Bachelor of Arts
                                        </option>
                                        <option value="3">
                                            M.Sc. Master of Science
                                        </option>
                                        <option value="4">
                                            M.A. Master of Arts
                                        </option>
                                        <option value="4">
                                            M.Eng. Master of Engineering
                                        </option>
                                        <option value="4">
                                            Ph.D. Doctor of Philosophy
                                        </option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="course-language-field"
                                        className="form-label fw-bold"
                                    >
                                        <span className="text-danger">* </span>
                                        Language
                                    </label>
                                    <select
                                        id="course-language-field"
                                        className="form-select"
                                        required
                                    >
                                        <option value="0">
                                            Select course language...
                                        </option>
                                        <option value="1">English</option>
                                        <option value="2">French</option>
                                        <option value="3">German</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="course-programme-structure-field"
                                    >
                                        Programme structure
                                    </label>
                                    <textarea
                                        id="course-programme-structure-field"
                                        className="form-control"
                                        rows={20}
                                        placeholder="Course programme structure"
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="course-admission-requirements-field"
                                    >
                                        Admission requirements
                                    </label>
                                    <textarea
                                        id="course-admission-requirements-field"
                                        className="form-control"
                                        rows={15}
                                        placeholder="Course admission requirements"
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="course-official-programme-website-field"
                                        className="form-label"
                                    >
                                        Official programme website
                                    </label>
                                    <input
                                        className="form-control"
                                        type="url"
                                        placeholder="https://hillpaduni.edu/undergrad"
                                        id="course-official-programme-website-field"
                                    />
                                </div>
                                <div className="mt-4 text-end">
                                    <button type="submit" className="btn btn-dark">
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
                </div>
            </>
        );
    }
}

export default CreateCourse;
