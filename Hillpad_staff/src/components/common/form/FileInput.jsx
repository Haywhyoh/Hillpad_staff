const FileInput = ({ name, label, onChange, required=false }) => {
    return (
        <>
            <div className="mb-3">
                <label
                    className={`form-label ${required && "fw-bold"}`}
                    htmlFor={`${name}-field`}
                >
                    {label}{" "}{required && <span className="text-danger">*</span>}
                </label>
                <input
                    type="file"
                    className="form-control"
                    id={`${name}-field`}
                    name={name}
                    onChange={onChange}
                    required={required}
                />
            </div>
        </>
    );
};

export default FileInput;
