import AreaChart from "./common/AreaChart";
import Spinner from "./common/Spinner";

const EntryChart = ({entryName, totalValue, icon, loading}) => {
    return (
        <div className="card-body px-0 pb-0 mb-0">
            <div className="tab-content p-0">
                <div
                    className="tab-pane pb-0 fade show active"
                    id="navs-tabs-line-card-entry"
                    role="tabpanel"
                >
                    <div className="d-flex p-4 pt-3">
                        <div className="avatar flex-shrink-0 me-3">
                            <img
                                src={icon}
                                alt="entry icon"
                            />
                        </div>
                        <div>
                            <small className="text-muted d-block">
                                Total {entryName}
                            </small>
                            <div className="d-flex align-items-center">
                                <h6 className="mb-0 me-1">
                                    {loading && <Spinner size="sm" />}
                                    {!loading && totalValue}
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div id="entryChart" className="mb-5">
                        <AreaChart />
                    </div>
                    
                </div>             
            </div>
        </div>
    );
}
 
export default EntryChart;