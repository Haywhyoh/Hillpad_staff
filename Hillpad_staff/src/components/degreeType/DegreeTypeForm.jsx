import { Component } from "react";

import degreeTypeService from "../../services/api/degreeTypeService";
import programmeTypeService from "../../services/api/programmeTypeService";

import Input from "../common/form/Input";
import Select from "../common/form/Select";


class DegreeTypeForm extends Component {
    state = {
        formData: {
            name: "",
            shortName: "",
            programmeType: ""
        },
        programmeTypes: []
    };

    async componentDidMount() {
        // Get currencies
        let { data } = await programmeTypeService.getProgrammeTypes();
        const programmeTypes = data.results.map((item) => ({
            name: item.name,
            value: item.id,
        }));
        this.setState({ programmeTypes });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const data = this.mapToDegreeTypeModel(this.state.formData);
        try {
            const response = await degreeTypeService.createDegreeTypeDraft(data);
            if (response.status === 201 && response.data) {
                console.log("Submitted");
                alert("Created successfully");
            }
        } catch (error) {
            console.log(error);
        }
    };

    mapToDegreeTypeModel = (data) => {

        const formattedFormData = new FormData();

        formattedFormData.append("name", data.name);
        formattedFormData.append("short_name", data.shortName);
        formattedFormData.append("programme_type", data.programmeType);

        return formattedFormData;
    };

    handleChange = ({ currentTarget: input }) => {
        const formData = { ...this.state.formData };
        formData[input.name] = input.value;
        this.setState({ formData });
    };


    render() {
        const { formTitle } = this.props;
        const { formData, programmeTypes } = this.state;
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
                                label="Name of degree type"
                                value={formData.name}
                                onChange={this.handleChange}
                                placeholder="e.g. Bachelor of Science"
                                required={true}
                            />
                            <Input
                                name="shortName"
                                label="Short name of degree type"
                                value={formData.shortName}
                                onChange={this.handleChange}
                                placeholder="e.g. B.Sc."
                                required={true}
                            />
                            <Select
                                name="programmeType"
                                label="Programme Type"
                                value={formData.programmeType}
                                onChange={this.handleChange}
                                options={programmeTypes}
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

export default DegreeTypeForm;
