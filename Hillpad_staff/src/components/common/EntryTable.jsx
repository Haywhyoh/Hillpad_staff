import { useState } from "react";

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

    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    const validateSearch = () => {
        return searchEntry === "";
    };

    const handleChange = ({currentTarget: input}) => {
        setSearchEntry(input.value);
    };

    return (
        <div className="card">
            <div className="mt-4">
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        handleSearch();
                    }
                }>
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
                        <div className="px-4 row">
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

            <div className="my-4">
                <div className="col-12 px-4">
                    <h5>
                        Advanced Search
                        <span className="px-2">
                            <button
                                className="btn btn-xs btn-icon"
                                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                            >
                                <i className={`text-primary bx bx-chevron-${showAdvancedSearch ? "up" : "down"}`}></i>
                            </button>
                        </span>
                    </h5>
                </div>
                {
                    showAdvancedSearch &&
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                        }}
                    >
                        <div className="col-12 px-4">
                            <div className="row g-3 mb-4">
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Course Name</label>
                                    <input type="text" className="form-control dt-input dt-full-name" data-column="1" placeholder="Alaric Beslier" data-column-index="0" />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">School</label>
                                    <input type="text" className="form-control dt-input" data-column="2" placeholder="demo@example.com" data-column-index="1" />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Country</label>
                                    <input type="text" className="form-control dt-input" data-column="3" placeholder="Web designer" data-column-index="2" />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Continent</label>
                                    <input type="text" className="form-control dt-input" data-column="4" placeholder="Balky" data-column-index="3" />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Programme Type</label>
                                    <input type="text" className="form-control dt-input" data-column="4" placeholder="Balky" data-column-index="3" />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Degree Type</label>
                                    <input type="text" className="form-control dt-input" data-column="6" placeholder="10000" data-column-index="5" />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Discipline</label>
                                    <input type="text" className="form-control dt-input" data-column="6" placeholder="10000" data-column-index="5" />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Course Format</label>
                                    <input type="text" className="form-control dt-input" data-column="6" placeholder="10000" data-column-index="5" />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Attendance</label>
                                    <input type="text" className="form-control dt-input" data-column="6" placeholder="10000" data-column-index="5" />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Author</label>
                                    <input type="text" className="form-control dt-input" data-column="6" placeholder="10000" data-column-index="5" />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Status</label>
                                    <input type="text" className="form-control dt-input" data-column="6" placeholder="10000" data-column-index="5" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        <i className="bx bx-search-alt-2"></i> Advanced Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                }
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