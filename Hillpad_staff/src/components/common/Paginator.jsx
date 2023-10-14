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
            {pages > 0 && // Use (pages > 0) instead of (pages) to avoid displaying 0 at bottom when there are no entries
                <nav aria-label="Page navigation" className="mx-4 my-4">
                    <ul className="pagination justify-content-center flex-wrap">
                        <li className="page-item mb-2 prev">
                            <a
                                className="page-link"
                                href="javascript:void(0);"
                            >
                                <i className="tf-icon bx bx-chevrons-left"></i>
                            </a>
                        </li>
                        {[...Array(pages)].map((_, i) => (
                            <li key={i} className={`page-item mb-2 ${activePageDecor(i+1)}`}>
                                <Link
                                    className="page-link"
                                    to="#"
                                    onClick={handlePaging}
                                >
                                    {i + 1}
                                </Link>
                            </li>
                        ))}
                        <li className="page-item mb-2 next">
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