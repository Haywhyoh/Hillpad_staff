
const TabPane = ({setSearchParams, tabItems, active}) => {
    /**
     *  setSearchParams: useSearchParams setter
     *  tabItems: [tabItem]
     *      tabItem: {
     *                  label: str -> tabItem label,
     *                  param: search query (status=XYZ or "")
     *                  badge: int
     *               }
     *  active: str -> tabItem label which should be the default active tab
     */

    return (
        <>
            <div className="nav-align-top">
                <ul className="nav nav-pills mb-3" role="tablist">
                    {tabItems.map(tabItem => (
                        <li key={tabItems.indexOf(tabItem)} className="nav-item" role="presentation">
                            <button type="button" className={`nav-link tab-pill-btn ${tabItem["label"] === active ? "active" : ""}`} role="tab" data-bs-toggle="tab" aria-selected="true"
                                onClick={() => setSearchParams(tabItem["param"])}
                            >
                                <span className="d-none d-sm-block">{tabItem["label"]}</span>
                                {Object.prototype.hasOwnProperty.call(tabItem, "badge") && tabItem["badge"] > 0 &&
                                    <span className="badge rounded-pill badge-center h-px-20 w-px-20 bg-danger ms-1">
                                        {tabItem["badge"]}
                                    </span>
                                }
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
 
export default TabPane;