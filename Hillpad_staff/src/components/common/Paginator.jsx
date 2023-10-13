import { Link } from "react-router-dom";

const Paginator = ({ pages, currentPage, setCurrentPage }) => {

    function handlePaging(event) {
        event.preventDefault();
        setCurrentPage(parseInt(event.target.text));
    }

    function activePageDecor(page) {
        return page === currentPage ? "active disabled" : "";
    }

    return (
        <>
            {
                pages > 0 &&
                <nav aria-label="Page navigation" className="my-4">
                    <ul className="pagination justify-content-center">
                        <li className="page-item prev">
                            <a
                                className="page-link"
                                href="javascript:void(0);"
                            >
                                <i className="tf-icon bx bx-chevrons-left"></i>
                            </a>
                        </li>
                        {[...Array(pages)].map((_, i) => (
                            <li key={i} className={`page-item ${activePageDecor(i+1)}`}>
                                <Link
                                    className="page-link"
                                    to="#"
                                    onClick={handlePaging}
                                >
                                    {i + 1}
                                </Link>
                            </li>
                        ))}
                        <li className="page-item next">
                            <a
                                className="page-link"
                                href="javascript:void(0);"
                            >
                                <i className="tf-icon bx bx-chevrons-right"></i>
                            </a>
                        </li>
                    </ul>
                </nav>

            }
        </>
    );
}
 
export default Paginator;