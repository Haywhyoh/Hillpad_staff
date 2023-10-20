import { useState } from "react";

import Input from "../common/form/Input";
import Select from "../common/form/Select";


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

    const staffRoles = [
        {value: "ADMIN", name: "Administrator"},
        {value: "SUPERVISOR", name: "Data Supervisor"},
        {value: "SPECIALIST", name: "Data Specialist"},
    ];

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

    const handleSubmit = () => {
        console.log("submitted");
    }

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
                            // error={errors.name}
                        />
                        <Input
                            name="lastName"
                            label="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Robinson"
                            required={true}
                            // error={errors.name}
                        />
                        <Input
                            name="email"
                            label="Email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="janerobinson@hillpad.com"
                            required={true}
                            // error={errors.duration}
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
            
            {/* <Modal
                show={showStatusModal}
                backdrop="static"
                keyboard={false}
                dialogClassName="alertModal"
                centered
            >
                {this.renderModal()}
            </Modal>                */}
        </>
    );
}
 
export default UserForm;