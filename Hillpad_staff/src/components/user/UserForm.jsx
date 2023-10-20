import { useState } from "react";
import { Navigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import Input from "../common/form/Input";
import Select from "../common/form/Select";

import userService from "../../services/api/userService";


const UserForm = ({formTitle}) => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        password: "",
        passwordAgain: "",
    });
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [showStatusModal, setShowStatusModal] = useState(false);
    const [statusModal, setStatusModal] = useState("loading");
    const [modalRedirect, setModalRedirect] = useState(false);

    const staffRoles = [
        {value: "ADMIN", name: "Administrator"},
        {value: "SUPERVISOR", name: "Data Supervisor"},
        {value: "SPECIALIST", name: "Data Specialist"},
    ];

    const mapToUserModel = (data) => {
        return {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            password: data.password,
        };
    };

    const validateForm = () => {
        return (formData.firstName === "") ||
        (formData.lastName === "") ||
        (formData.email === "") ||
        (formData.role === "") ||
        (formData.password === "") ||
        (formData.passwordAgain === "") ||
        (formData.password !== formData.passwordAgain) ||
        (formData.password.length < 8) ||
        (formData.passwordAgain.length < 8);
    };

    const handleChange = ({ currentTarget: input }) => {
        setFormData({...formData, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log("Invalid form");
            return;
        }

        setStatusModal("loading");
        setShowStatusModal(true);

        const data = mapToUserModel(formData);
        try {
            let response;
            if (formData.role === "ADMIN") {
                response = await userService.createAdmin(data);
            }
            else if (formData.role === "SUPERVISOR") {
                response = await userService.createSupervisor(data);
            }
            else if (formData.role === "SPECIALIST") {
                response = await userService.createSpecialist(data);
            }
            else {
                response = {status: 900};
            }

            if (response && response.status === 201) {
                console.log(`${formData.role} created successfully`);
                setStatusModal("success");
            }
            else {
                console.log("An error occured while trying to create staff account", response.status);
                setStatusModal("error");
            }
        } catch (error) {
            console.log(error);
            setStatusModal("error");
        }
    };

    const renderModal = () => {
        if (statusModal === "success") {
            return (
                <>
                    <Modal.Body>
                        <div className="text-center mb-4">
                            <span className="bx bx-check-circle fs-1 text-success mb-3"></span>
                            <h3>Awesome!</h3>
                            {
                                formData.role === "ADMIN" &&
                                <p>Administrator account created successfully.</p>
                            }
                            {
                                formData.role === "SUPERVISOR" &&
                                <p>Data Supervisor account created successfully.</p>
                            }
                            {
                                formData.role === "SPECIALIST" &&
                                <p>Data Specialist account created successfully.</p>
                            }
                        </div>
                        <div className="d-grid gap-2">
                            <Button variant="success" onClick={() => {
                                    setShowStatusModal(false);
                                    setModalRedirect(true);
                                }}
                            >
                                OK
                            </Button>
                        </div>
                    </Modal.Body>
                    {modalRedirect && <Navigate to="/user" />}
                </>
            );
        }
        else if (statusModal === "error") {
            return (
                <>
                    <Modal.Body>
                        <div className="text-center mb-4">
                            <span className="bx bx-error-circle fs-1 text-danger mb-3"></span>
                            <h3>Error!</h3>
                            <p>Staff account creation failed. An error occured.</p>
                        </div>
                        <div className="d-grid gap-2">
                            <Button
                                variant="danger"
                                onClick={() => {
                                    setShowStatusModal(false);
                                }}
                            >
                                OK
                            </Button>
                        </div>
                    </Modal.Body>
                </>
            );
        }
        
        return (
            <Modal.Body>
                <Spinner variant="primary" animation="border" role="status" size="lg">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Modal.Body>
        );
        // return <div></div>

    };

    const renderSubmit = () => {
        return (
            <>
                <div className="mt-4 text-end">
                    <button
                        disabled={validateForm()}
                        type="submit"
                        className="btn btn-primary"
                    >
                        Create
                    </button>
                </div>
            </>
        );
    };


    return (
        <>
            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{formTitle}</h5>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <Input
                            name="firstName"
                            label="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Jane"
                            required={true}
                        />
                        <Input
                            name="lastName"
                            label="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Robinson"
                            required={true}
                        />
                        <Input
                            name="email"
                            label="Email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="janerobinson@hillpad.com"
                            required={true}
                        />
                        <Select
                            name="role"
                            label="Staff Role"
                            value={formData.role}
                            onChange={handleChange}
                            required={true}
                            options={staffRoles}
                        />
                        <div className="mb-3">
                            <label
                                className="form-label fw-bold"
                                htmlFor="password-field"
                            >
                                Password <span className="text-danger"> *</span>
                            </label>
                            <div className="input-group input-group-merge">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="password-field"
                                    className="form-control"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required={true}
                                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                    aria-describedby="password-field"
                                />
                                <span className="input-group-text cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)}>
                                    <i className={passwordVisible ? "bx bx-hide" : "bx bx-show"}></i>
                                </span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                className="form-label fw-bold"
                                htmlFor="password-again-field"
                            >
                                Password (Re-Enter) <span className="text-danger"> *</span>
                            </label>
                            <div className="input-group input-group-merge">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="password-again-field"
                                    className="form-control"
                                    name="passwordAgain"
                                    value={formData.passwordAgain}
                                    onChange={handleChange}
                                    required={true}
                                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                    aria-describedby="password-again-field"
                                />
                                <span className="input-group-text cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)}>
                                    <i className={passwordVisible ? "bx bx-hide" : "bx bx-show"}></i>
                                </span>
                            </div>
                        </div>
                        
                        
                        {renderSubmit()}
                        
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
                {renderModal()}
            </Modal>               
        </>
    );
}
 
export default UserForm;