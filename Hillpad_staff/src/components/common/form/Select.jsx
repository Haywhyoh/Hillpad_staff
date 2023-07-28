
const Select = ({ name, label, value, options, onChange, required=false }) => {
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
                    name={name}
                    id={`${name}-field`}
                    className="form-select"
                    value={value}
                    onChange={onChange}
                    required={required}
                >
                    <option value="">Select {label}...</option>
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