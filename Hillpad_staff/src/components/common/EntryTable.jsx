import Paginator from "./Paginator";

const EntryTable = ({entryRenderer, pages, currentPage, setCurrentPage, headers}) => {
    return (
        <div className="card">
            <div className="mt-4">
                <form action="" method="GET">
                    <div className="mb-3 px-4 row">
                        <div className="col-md-4">
                            <input className="form-control" type="search" placeholder="Search..." id="html5-search-input" />
                        </div>
                    </div>
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