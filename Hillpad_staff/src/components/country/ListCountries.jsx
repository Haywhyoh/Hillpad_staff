import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import config from '../../config';

import EntryTable from '../common/EntryTable';
import Spinner from '../common/Spinner';
import TabPane from '../common/TabPane';

import useAuth from '../../hooks/useAuth';

import countryService from '../../services/api/countryService';
import statsService from '../../services/api/statsService';


const ListCountries = () => {
    
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchEntry, setSearchEntry] = useState("");
    const [searchedEntry, setSearchedEntry] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [countriesReview, setCountriesReview] = useState(0);

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

    const continentMap = {
        "AF": "Africa",
        "AS": "Asia",
        "EU": "Europe",
        "NA": "North America",
        "SA": "South America",
        "OC": "Oceania",
        "AN": "Antarctica"
    }

    useEffect(() => {
        const status = searchParams.get("status");
        
        async function fetchCountries() {
            try {
                setLoading(true);
                
                const pageQuery = `${searchQuery}${status ? `status=${status}&` : ""}page=${currentPage}`;
                const response = await countryService.getCountryDrafts(pageQuery);
                if (response.status === 200) {
                    setDataCount(response.data.count);
                    setPages(Math.ceil(dataCount / pageSize));
                    setCountries(response.data.results);
                }

                const reviewCountriesResponse = await statsService.getAccountEntriesStats(["total_countries_review_db"]);
                if (reviewCountriesResponse.status === 200) {
                    const result = reviewCountriesResponse.data;
                    setCountriesReview(result["total_countries_review_db"]);
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
        fetchCountries();
    }, [currentPage, dataCount, location, navigate, pageSize, searchQuery, searchParams]);

    const handleSearch = () => {
        setSearchQuery(`name=${searchEntry}&`);
        setSearchedEntry(searchEntry);
        setCurrentPage(1); // Reset the current page to 1 so as to avoid 404 queries
    }

    const renderCountries = () => {
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
        else if (countries.length === 0 && !loading) {
            return (
                <tr>
                    <td>
                        <h5 className="mx-4 my-3 text-danger">No countries.</h5>
                    </td>
                </tr>
            );
        } else {
            return (
                <>
                    {countries.map(country => (
                        <tr key={country.id}>
                            <td>
                                <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                <strong>{country.name}</strong>
                            </td>
                            <td>{continentMap[country.continent]}</td>
                            <td>
                                325
                            </td>
                            <td>
                                <span className={`badge ${statusClass[country.status]} me-1`}>
                                    {country.status}
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
                                        <Link className="dropdown-item" to={`edit/${country.id}`}>
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
                    <h4 className="fw-bold py-3 mb-4">Countries</h4>
                    {   
                        auth.user &&
                        auth.user.role === "SUPERVISOR" &&
                        <Link to="create">
                            <button type="button" className="btn btn-secondary mb-4">
                                <span className="tf-icons bx bx-plus"></span>&nbsp;
                                Add Country
                            </button>
                        </Link>
                    }
                </div>

                <TabPane
                    setSearchParams={setSearchParams}
                    tabItems={[
                        {label: "All", param: ""},
                        {label: "Review", param: "status=REVIEW", badge: auth.user.role === "ADMIN" ? countriesReview : null},
                        {label: "Published", param: "status=PUBLISHED"}
                    ]}
                    active="All"
                />

                <EntryTable
                    title="countries"
                    entryRenderer={renderCountries}
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
                        "Country",
                        "Continent",
                        "Number of schools",
                        "Status",
                        "Actions"
                    ]}
                />

            </div>
        </>
    );
}
 
export default ListCountries;