import { Component } from "react";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import courseService from "../../services/api/courseService";
import schoolService from "../../services/api/schoolService";
import disciplineService from "../../services/api/disciplineService";
import currencyService from "../../services/api/currencyService";
import programmeTypeService from "../../services/api/programmeTypeService";
import degreeTypeService from "../../services/api/degreeTypeService";
import languageService from "../../services/api/languageService";

import CheckBox from "../common/form/CheckBox";
import Input from "../common/form/Input";
import Select from "../common/form/Select";
import QuillEditor from "../common/form/QuillEditor";


class CourseForm extends Component {
    state = {
        formData: {
            name: "",
            about: "",
            overview: "",
            duration: "",
            durationBase: "",
            startDate: "",
            applicationDeadline: "",
            school: "",
            disciplines: [],
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
            programmeWebsite: "",
        },
        schools: [],
        disciplines: [],
        currencies: [],
        programmeTypes: [],
        degreeTypes: [],
        languages: [],

        showStatusModal: false,
        statusModal: "loading",
        modalRedirect: false,

        course: {}
    };

    options = {
        tuitionFeeBase: [
            { value: "SEMESTER", name: "Per semester" },
            { value: "YEAR", name: "Per year" },
            { value: "PROGRAMME", name: "Per full programme"},
        ],
        courseFormat: [
            { value: "FULL", name: "Full-time" },
            { value: "PART", name: "Part-time" },
        ],
        courseAttendance: [
            { value: "SITE", name: "On-site"},
            { value: "ONLINE", name: "Online"},
            { value: "BLENDED", name: "Blended"},
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

    setFormState = (course) => {
        const padWithLeadingZeros = (num, totalLength) => {
            return String(num).padStart(totalLength, '0');
        }
        const startDate = course.course_dates.start_year + "-" + padWithLeadingZeros(course.course_dates.start_month, 2);
        const applicationDeadline = course.course_dates.deadline_year + "-" + padWithLeadingZeros(course.course_dates.deadline_month, 2);

        return {
            name: course.name,
            about: course.about,
            overview: course.overview,
            duration: course.duration,
            durationBase: "",
            startDate: startDate,
            applicationDeadline: applicationDeadline,
            school: course.school.id,
            disciplines: course.disciplines.map(discipline => discipline.id),
            tuitionFee: course.tuition_fee,
            tuitionFeeBase: course.tuition_fee_base,
            tuitionCurrency: course.tuition_currency.id,
            courseFormat: course.course_format,
            courseAttendance: course.attendance,
            programmeType: course.programme_type.id,
            degreeType: course.degree_type.id,
            language: course.language.id,
            programmeStructure: course.programme_structure,
            admissionRequirements: course.admission_requirements,
            programmeWebsite: course.official_programme_website,
        };
    };

    async componentDidMount() {
        this.setState({ statusModal: "fetching", showStatusModal: true });
        this.loadData()
        .then(() => {
            this.setState({ showStatusModal: false });
        });
    }

    loadData = async () => {
        try {

            if ("courseID" in this.props) {
                const { courseID } = this.props;
    
                let response = await courseService.getCourseDraft(courseID);
                if (response.status === 200) {
                    const course = response.data;
                    this.setState({ course: response });
                    const formData = this.setFormState(course);
                    this.setState({ formData });
                }
            }
            
            // Get schools
            let { data } = await schoolService.getSchools();
            const schools = data.results.map((item) => ({
                value: item.id,
                name: item.name,
            }));
            this.setState({ schools });

            // Get disciplines
            ({ data } = await disciplineService.getDisciplines());
            const disciplines = data.results.map((item) => ({
                value: item.id,
                name: item.name,
            }));
            this.setState({ disciplines });

            // Get currencies
            ({ data } = await currencyService.getCurrencies());
            const currencies = data.results.map((item) => ({
                value: item.id,
                name: item.name,
            }));
            this.setState({ currencies });

            // Get programme types
            ({ data } = await programmeTypeService.getProgrammeTypes());
            const programmeTypes = data.results.map((item) => ({
                value: item.id,
                name: item.name,
            }));
            this.setState({ programmeTypes });

            // Get degree types
            ({ data } = await degreeTypeService.getDegreeTypes());
            const degreeTypes = data.results.map((item) => ({
                value: item.id,
                name: `${item.name} (${item.short_name})`,
            }));
            this.setState({ degreeTypes });

            // Get languages
            ({ data } = await languageService.getLanguages());
            const languages = data.results.map((item) => ({
                value: item.id,
                name: item.name,
            }));
            this.setState({ languages });

        } catch (ex) {
            console.log(ex);
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ statusModal: "loading", showStatusModal: true });
        const data = this.mapToCourseModel(this.state.formData);
        try {
            const createResponse = await courseService.createCourseDraft(data);
            if (createResponse.status === 201 && createResponse.data) {
                const submitResponse = await courseService.submitCourseDraft(createResponse.data["id"]);
                if (submitResponse.status === 200 && submitResponse.data) {
                    console.log("Submitted");
                    this.setState({ statusModal: "success" });
                }
                else {
                    console.log("An error occured while trying to submit the course", submitResponse.status);
                    this.setState({ statusModal: "error" })
                }
            } else {
                console.log("An error occured while trying to create the course", createResponse.status);
                this.setState({ statusModal: "error" });
            }
        } catch (error) {
            console.log(error);
            this.setState({ statusModal: "error" });
        }
    };

    mapToCourseModel = (data) => {
        const [startYear, startMonth] = data.startDate
            ? data.startDate.split("-")
            : ["", ""];
        const [appDeadlineYear, appDeadlineMonth] = data.applicationDeadline
            ? data.applicationDeadline.split("-")
            : ["", ""];

        return {
            name: data.name,
            about: data.about,
            overview: data.overview,
            duration: data.duration,
            start_month: parseInt(startMonth),
            start_year: parseInt(startYear),
            deadline_month: parseInt(appDeadlineMonth),
            deadline_year: parseInt(appDeadlineYear),
            school: data.school,
            disciplines: data.disciplines,
            tuition_fee: data.tuitionFee,
            tuition_fee_base: data.tuitionFeeBase,
            tuition_currency: data.tuitionCurrency,
            course_format: data.courseFormat,
            attendance: data.courseAttendance,
            programme_type: data.programmeType,
            degree_type: data.degreeType,
            language: data.language,
            programme_structure: data.programmeStructure,
            admission_requirements: data.admissionRequirements,
            official_programme_website: data.programmeWebsite,
        };
    };

    handleChange = ({ currentTarget: input }) => {
        const formData = { ...this.state.formData };
        formData[input.name] = input.value;
        this.setState({ formData });
    };

    handleCheckBoxChange = ({ currentTarget: input }) => {
        const formData = { ...this.state.formData };
        if (input.checked) {
            formData[input.name] = [...formData[input.name], parseInt(input.value)];
            this.setState({ formData });
        } else {
            formData[input.name] = formData[input.name].filter(
                (_) => _ !== parseInt(input.value)
            );
            this.setState({ formData });
        }
    };    
      
    handleOverview = (content) => {
        const formData = { ...this.state.formData };
        const value = content === "<p><br></p>" ? "" : content;
        formData["overview"] = value;
        this.setState({ formData });
    }

    handleProgrammeStructure = (content) => {
        const formData = { ...this.state.formData };
        const value = content === "<p><br></p>" ? "" : content;
        formData["programmeStructure"] = value;
        this.setState({ formData });
    }

    handleAdmissionRequirements = (content) => {
        const formData = { ...this.state.formData };
        const value = content === "<p><br></p>" ? "" : content;
        formData["admissionRequirements"] = value;
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
                            <p>Course was submitted successfully.</p>
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
                    {this.state.modalRedirect && <Navigate to="/course" />}
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
            );
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
        const {
            formData,
            schools,
            disciplines,
            currencies,
            programmeTypes,
            degreeTypes,
            languages,
            showStatusModal,
        } = this.state;
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
                                label="Name of course"
                                value={formData.name}
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
                            <QuillEditor
                                name="overview"
                                label="Overview"
                                value={formData.overview}
                                modules={this.quillModules}
                                onChange={this.handleOverview}
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
                                options={this.options.tuitionFeeBase}
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
                                options={this.options.courseFormat}
                            />
                            <Select
                                name="courseAttendance"
                                label="Course Attendance"
                                value={formData.courseAttendance}
                                onChange={this.handleChange}
                                options={this.options.courseAttendance}
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
                                options={degreeTypes}
                            />

                            <Select
                                name="language"
                                label="Language"
                                value={formData.language}
                                onChange={this.handleChange}
                                required={true}
                                options={languages}
                            />

                            <QuillEditor
                                name="programmeStructure"
                                label="Programme Structure"
                                modules={this.quillModules}
                                value={formData.programmeStructure}
                                onChange={this.handleProgrammeStructure}
                                placeholder="Course programme structure"
                            />
                            <QuillEditor
                                name="admissionRequirements"
                                label="Admission Requirements"
                                modules={this.quillModules}
                                value={formData.admissionRequirements}
                                onChange={this.handleAdmissionRequirements}
                                placeholder="Course admission requirements"
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
                                {/* <button
                                    type="submit"
                                    className="btn btn-dark me-2"
                                >
                                    Save and submit later
                                </button> */}
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Submit
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

export default CourseForm;
