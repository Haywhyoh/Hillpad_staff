
const FilterSelect = ({name, value, onChange, label, options, required=false}) => {
    return (
        <>
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
        </>
    );
}
 
export default FilterSelect;