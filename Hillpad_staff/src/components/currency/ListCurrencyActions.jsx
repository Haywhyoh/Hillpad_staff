import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import currencyService from "../../services/api/currencyService";
import config from "../../config";
import Error405 from "../errorPages/Error405";
import EntryTable from "../common/EntryTable";


function ListCurrencyActions() {
    
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = config.pageSize;

    let location = useLocation();
    let navigate = useNavigate();
    let auth = useAuth();

    useEffect(() => {
        async function fetchCurrencies() {
            try {
                setLoading(true);

                const pageQuery = `status=REVIEW&page=${currentPage}`;
                const response = await currencyService.getCurrencyDrafts(pageQuery);
                if (response.status === 200) {
                    setDataCount(response.data.count);
                    setPages(Math.ceil(dataCount / pageSize));
                    setCurrencies(response.data.results);
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
    }, [currentPage, dataCount, location, navigate, pageSize]);

    if (auth.user && auth.user.role !== "ADMIN") {
        return (
            <Error405 />
        );
    }

    function renderCurrencies() {
        if (loading) {
            return (
                <tr>
                    <td className="text-center">
                        <div className="mx-4 my-3 spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </td>
                    <td className="text-center">
                        <div className="mx-4 my-3 spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </td>
                    <td className="text-center">
                        <div className="mx-4 my-3 spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </td>
                    <td className="text-center">
                        <div className="mx-4 my-3 spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
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
                                <Link to={`/currency/review/${currency.id}`}>
                                    <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                    <strong>{currency.name}</strong>
                                </Link>
                            </td>
                            <td>
                                {currency.short_code}
                            </td>
                            <td>
                                <span className={`badge bg-label-info me-1`}>
                                    {currency.author.first_name} {currency.author.last_name}
                                </span>
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
                </div>

                <EntryTable
                    entryRenderer={renderCurrencies}
                    pages={pages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    headers={[
                        "Currency",
                        "ISO Short Code",
                        "Author"
                    ]}
                />
                
            </div>

        </>
    );
    
}

export default ListCurrencyActions;
