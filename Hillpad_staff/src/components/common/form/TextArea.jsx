// eslint-disable-next-line no-unused-vars
import React from 'react';


// eslint-disable-next-line react/prop-types
const TextArea = ({ name, label, placeholder, rows=10, required=false }) => {
    return (
        <>
            <div className="mb-3">
                <label
                    className={`form-label ${required && "fw-bold"}`}
                    htmlFor={`${name}-field`}
                >
                    {label} {required && <span className="text-danger"> *</span>}
                </label>
                <textarea
                    id={`${name}-field`}
                    className="form-control"
                    rows={rows}
                    placeholder={placeholder}
                    required={required}
                ></textarea>
            </div>
        </>
    );
}
 
export default TextArea;