/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';


const CheckBox = ({ name, label, value, options, onChange, required=false }) => {
    return (
        <>
            <div className="mb-3">
                <label
                    className={`form-label ${required && "fw-bold"}`}
                    htmlFor={`${name}-field`}
                >
                    {label}{" "}
                    {required && <span className="text-danger"> *</span>}
                </label>
                <div>
                    {options.map(option => (
                        <div key={option.value} className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`${name}-${option.value}`}
                                name={name}
                                onChange={onChange}
                                value={option.value}
                                checked={value.includes(option.value)}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={`${name}-${option.value}`}
                            >
                                {option.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
 
export default CheckBox;