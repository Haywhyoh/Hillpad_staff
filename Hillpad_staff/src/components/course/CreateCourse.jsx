// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { Link } from "react-router-dom";
import CourseForm from "./CourseForm";
import Input from "../common/form/Input";
import TextArea from "../common/form/TextArea";
import Select from "../common/form/Select";
import CheckBox from "../common/form/CheckBox";


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

                    <CourseForm formTitle="Create a new course" />

                    
                </div>
            </>
        );
    }
}

export default CreateCourse;
