/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';


const Input = ({ name, label, value, onChange, placeholder="", type="text", required=false, autoFocus=false }) => {
    return (
        <>
            <div className="mb-3">
                <label
                    className={`form-label ${required && "fw-bold"}`}
                    htmlFor={`${name}-field`}
                >
                    {label} {required && <span className="text-danger"> *</span>}
                </label>
                <input
                    type={type}
                    className="form-control"
                    id={`${name}-field`}
                    value={value}
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    autoFocus={autoFocus}
                />
            </div>
        </>
    );
}
 
export default Input;