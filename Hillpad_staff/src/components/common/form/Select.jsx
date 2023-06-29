/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';


// eslint-disable-next-line react/prop-types
const Select = ({ name, label, options, required=false }) => {
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
                <select
                    id={`${name}-field`}
                    className="form-select"
                    required={required}
                >
                    <option value="0">Select {label}...</option>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}

                </select>
            </div>
        </>
    );
}
 
export default Select;