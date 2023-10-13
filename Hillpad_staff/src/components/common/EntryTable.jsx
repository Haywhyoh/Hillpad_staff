import Paginator from "./Paginator";

const EntryTable = ({
        title,
        entryRenderer,
        pages,
        currentPage,
        setCurrentPage,
        headers,
        searchEntry,
        setSearchEntry,
        searchedEntry,
        handleSearch
}) => {

    const validateSearch = () => {
        return searchEntry === "";
    };

    const handleChange = ({currentTarget: input}) => {
        setSearchEntry(input.value);
    };

    return (
        <div className="card">
            <div className="mt-4">
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    handleSearch();
                }}>
                    <div className="mb-3 px-4 row">
                        <div className="col-md-4 pe-0">
                            <input
                                className="form-control"
                                type="search"
                                name="search"
                                value={searchEntry}
                                onChange={handleChange}
                                placeholder="Search..."
                            />
                        </div>
                        <div className="col-md-1">
                                <button
                                    disabled={validateSearch()}
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    <i className="bx bx-search-alt-2"></i>
                                </button>
                        </div>
                    </div>

                    {
                        searchedEntry &&
                        <div className="mb-3 px-4 row">
                            <h6>
                                <span>
                                    <button 
                                        className="btn btn-xs btn-icon"
                                        onClick={() => setSearchEntry("")}    
                                    >
                                        <i className="bx bx-x text-danger"></i>
                                    </button>
                                </span>
                                Showing search results for&nbsp;
                                <span className="text-primary">&quot;{searchedEntry}&quot;</span>
                                &nbsp;{title}&nbsp;
                            </h6>
                        </div>
                    }
                </form>
            </div>

            <div className="table-responsive text-nowrap">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            {headers.map(header => (
                                <th key={headers.indexOf(header)}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">

                        {entryRenderer()}

                    </tbody>
                </table>
            </div>

            <Paginator
                pages={pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}
 
export default EntryTable;