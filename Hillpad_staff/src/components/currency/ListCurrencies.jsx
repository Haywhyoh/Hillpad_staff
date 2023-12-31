import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import config from "../../config";

import EntryTable from "../common/EntryTable";
import Spinner from '../common/Spinner';
import TabPane from '../common/TabPane';

import useAuth from "../../hooks/useAuth";

import currencyService from "../../services/api/currencyService";
import statsService from '../../services/api/statsService';


const ListCurrencies = () => {
    
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchEntry, setSearchEntry] = useState("");
    const [searchedEntry, setSearchedEntry] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currenciesReview, setCurrenciesReview] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();

    const pageSize = config.pageSize;

    let location = useLocation();
    let navigate = useNavigate();
    let auth = useAuth();

    const statusClass = {
        "PUBLISHED": "bg-label-success",
        "APPROVED": "bg-label-info",
        "REJECTED": "bg-label-danger",
        "REVIEW": "bg-label-warning",
        "SAVED": "bg-label-secondary"
    }

    useEffect(() => {
        const status = searchParams.get("status");

        async function fetchCurrencies() {
            try {
                setLoading(true);
                
                const pageQuery = `${searchQuery}${status ? `status=${status}&` : ""}page=${currentPage}`;
                const response = await currencyService.getCurrencyDrafts(pageQuery);
                if (response.status === 200) {
                    setDataCount(response.data.count);
                    setPages(Math.ceil(dataCount / pageSize));
                    setCurrencies(response.data.results);
                }

                const reviewCurrenciesResponse = await statsService.getAccountEntriesStats(["total_currencies_review_db"]);
                if (reviewCurrenciesResponse.status === 200) {
                    const result = reviewCurrenciesResponse.data;
                    setCurrenciesReview(result["total_currencies_review_db"]);
                }

            } catch (ex) {
                if (ex.response.status === 401) {
                    navigate("/login", {
                        state: { from: location },
                        replace: true
                    });
                }
            }
            setLoading(false);
        }
        fetchCurrencies();
    }, [currentPage, dataCount, location, navigate, pageSize, searchQuery, searchParams]);

    const handleSearch = () => {
        setSearchQuery(`name=${searchEntry}&`);
        setSearchedEntry(searchEntry);
        setCurrentPage(1); // Reset the current page to 1 so as to avoid 404 queries
    }

    const renderCurrencies = () => {
        if (loading) {
            return (
                <tr>
                    <td className="text-center">
                        <Spinner addClasses="mx-4 my-3" />
                    </td>
                    <td className="text-center">
                        <Spinner addClasses="mx-4 my-3" />
                    </td>
                    <td className="text-center">
                        <Spinner addClasses="mx-4 my-3" />
                    </td>
                    <td className="text-center">
                        <Spinner addClasses="mx-4 my-3" />
                    </td>
                </tr>
            )
        }
        else if (currencies.length === 0 && !loading) {
            return (
                <tr>
                    <td>
                        <h5 className="mx-4 my-3 text-danger">No currencies.</h5>
                    </td>
                </tr>
            );
        } else {
            return (
                <>
                    {currencies.map(currency => (
                        <tr key={currency.id}>
                            <td>
                                <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                <strong>
                                    {currency.name}
                                </strong>
                            </td>
                            <td>
                                {currency.short_code}
                            </td>
                            
                            <td>
                                <span className={`badge ${statusClass[currency.status]} me-1`}>
                                    {currency.status}
                                </span>
                            </td>
                            <td>
                                <div className="dropdown">
                                    <button
                                        type="button"
                                        className="btn p-0 dropdown-toggle hide-arrow"
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to={`edit/${currency.id}`}>
                                            <i className="bx bx-edit-alt me-1"></i>
                                            Edit
                                        </Link>
                                        <Link className="dropdown-item" to="https://hillpad.vercel.app">
                                            <i className="bx bx-window me-1"></i>
                                            View live
                                        </Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    
                    ))}
                </>
            )
        }
    }


    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold py-3 mb-4">Currencies</h4>
                    {   
                        auth.user &&
                        auth.user.role === "SUPERVISOR" &&
                        <Link to="create">
                            <button type="button" className="btn btn-secondary mb-4">
                                <span className="tf-icons bx bx-plus"></span>&nbsp;
                                Add Currency
                            </button>
                        </Link>
                    }
                </div>

                <TabPane
                    setSearchParams={setSearchParams}
                    tabItems={[
                        {label: "All", param: ""},
                        {label: "Review", param: "status=REVIEW", badge: auth.user.role === "ADMIN" ? currenciesReview : null},
                        {label: "Published", param: "status=PUBLISHED"}
                    ]}
                    active="All"
                />

                <EntryTable
                    title="currencies"
                    entryRenderer={renderCurrencies}
                    pages={pages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalResultCount={dataCount}
                    searchEntry={searchEntry}
                    setSearchEntry={setSearchEntry}
                    searchedEntry={searchedEntry}
                    handleSearch={handleSearch}
                    loading={loading}
                    headers={[
                        "Currency",
                        "ISO Short Code",
                        "Status",
                        "Actions"
                    ]}
                />
                
            </div>

        </>
    );
    
}

export default ListCurrencies;
