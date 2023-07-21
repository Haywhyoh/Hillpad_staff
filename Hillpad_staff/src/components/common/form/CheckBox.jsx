
const CheckBox = ({ name, value, label, options, onChange, required=false }) => {
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
                <div id={`${name}-field`}>
                    {options.map(option => (
                        <div key={options.indexOf(option)} className="form-check form-check-inline">
                            <input
                                key={options.indexOf(option)}
                                className="form-check-input"
                                type="checkbox"
                                id={`${name}-${option.value}`}
                                name={name}
                                checked={value.includes(option.value)}
                                onChange={onChange}
                                value={option.value}
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