const Input = ({ name, label, value, onChange, placeholder="", maxLength=524288, type="text", required=false, autoFocus=false }) => {
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
                    maxLength={maxLength}
                    autoFocus={autoFocus}
                />
            </div>
        </>
    );
}
 
export default Input;