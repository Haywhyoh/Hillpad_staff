import ReactQuill from "react-quill";

const QuillEditor = ({ name, label, modules, onChange, placeholder="", required=false }) => {
    return (
        <>
            <div className="mb-3">
                <label
                    className={`form-label ${required && "fw-bold"}`}
                    htmlFor={`${name}-field`}
                >
                   {label} {required && <span className="text-danger"> *</span>}
                </label>
                <ReactQuill
                    theme="snow"
                    id={`${name}-field`}
                    modules={modules}
                    required={required}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </div>
        </>
    );
}
 
export default QuillEditor;