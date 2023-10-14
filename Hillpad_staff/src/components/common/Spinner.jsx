
const Spinner = ({size=null, bsColor="warning", addClasses=""}) => {
    /*
        Props:
            size: null, sm, lg
            bsColor: primary, secondary, success, danger, warning, info, light, dark
            addClasses: additional CSS classes
    */

    return (
        <div
            className={`spinner-border ${size ? `spinner-border-${size}` : ""} text-${bsColor} ${addClasses}`}
            role="status"
        >
            <span className="visually-hidden">
                Loading...
            </span>
        </div>
    );
}
 
export default Spinner;