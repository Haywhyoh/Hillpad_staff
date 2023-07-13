import { Component } from "react";

import disciplineService from "../../services/api/disciplineService";

import Input from "../common/form/Input";
import Select from "../common/form/Select";
import TextArea from "../common/form/TextArea";


class DisciplineForm extends Component {
    state = {
        formData: {
            name: "",
            about: "",
            icon: "",
            iconColor: "",
        }
    };

    options = {
        iconColor: [
            { value: "deep_blue", name: "Deep Blue" },
            { value: "green", name: "Green" },
            { value: "orange", name: "Orange" },
            { value: "yellow", name: "Yellow" }
        ]
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const data = this.mapToDisciplineModel(this.state.formData);
        try {
            const response = await disciplineService.createDisciplineDraft(data);
            if (response.status === 201 && response.data) {
                console.log("Submitted");
                alert("Created successfully");
            }
        } catch (error) {
            console.log(error);
        }
    };

    mapToDisciplineModel = (data) => {

        const formattedFormData = new FormData();

        formattedFormData.append("name", data.name);
        formattedFormData.append("about", data.about);
        formattedFormData.append("icon", data.icon);
        formattedFormData.append("icon_color", data.iconColor);

        return formattedFormData;
    };

    handleChange = ({ currentTarget: input }) => {
        const formData = { ...this.state.formData };
        formData[input.name] = input.value;
        this.setState({ formData });
    };


    render() {
        const { formTitle } = this.props;
        const { formData } = this.state;
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
                                label="Name of discipline"
                                value={formData.name}
                                onChange={this.handleChange}
                                placeholder="Social Sciences"
                                required={true}
                            />
                            <TextArea
                                name="about"
                                label="About"
                                value={formData.about}
                                onChange={this.handleChange}
                                required={true}
                                placeholder="Discipline description"
                            />
                            <small className="text-light fw-semibold">
                                Address
                            </small>
                            <Input
                                name="icon"
                                label="Icon name (use FontAwesome but don't include 'fa-' prefix.)"
                                value={formData.icon}
                                onChange={this.handleChange}
                                placeholder="lab"
                            />
                            <Select
                                name="iconColor"
                                label="Icon color"
                                value={formData.iconColor}
                                onChange={this.handleChange}
                                options={this.options.iconColor}
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

export default DisciplineForm;
