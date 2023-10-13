import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import countryService from '../../services/api/countryService';
import config from '../../config';
import Error405 from "../errorPages/Error405";
import EntryTable from '../common/EntryTable';


const ListCountryActions = () => {
    
    let auth = useAuth();

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchEntry, setSearchEntry] = useState("");
    const [searchedEntry, setSearchedEntry] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [reviewCountries, setReviewCountries] = useState([]);
    
    const pageSize = config.pageSize;

    let location = useLocation();
    let navigate = useNavigate();

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
        async function fetchCountries() {
            try {
                setLoading(true);

                const pageQuery = `${searchQuery}status=REVIEW&page=${currentPage}`;
                const response = await countryService.getCountryDrafts(pageQuery);
                if (response.status === 200) {
                    setDataCount(response.data.count);
                    setPages(Math.ceil(dataCount / pageSize));
                    setCountries(response.data.results);
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
    }, [currentPage, dataCount, location, navigate, pageSize, searchQuery]);

    if (auth.user && auth.user.role !== "ADMIN") {
        return (
            <Error405 />
        );
    }

    const publishAll = async () => {
        // Get all REVIEW countries IDs
        // Loop and publish
        // Display progress while publishing
        // Add confirmation popup before publishing
        // Publish done.
        try {
            const reviewResponse = await countryService.getCountryDraftsReview();
            if (reviewResponse.status === 200) {
                setReviewCountries(reviewResponse.data.results);
                // this.setState({ statusModal: "success" });
                let published = 0;
                for (let courseID of reviewCountries) {
                    const response = await countryService.publishCountryDraft(courseID);
                    if (response.status === 200) {
                        published += 1;
                        // this.setState({ statusModal: "success" });
                        console.log(`Published: ${published}/${reviewCountries.length}`);
                    }
                }
            }
        } catch (error) {
            console.log(error);
            this.setState({ statusModal: "error" });
        }
    };

    const handleSearch = () => {
        setSearchQuery(`name=${searchEntry}&`);
        setSearchedEntry(searchEntry);
    }

    const renderCountries = () => {
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
                                <Link to={`/country/review/${country.id}`}>
                                    <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                    <strong>{country.name}</strong>
                                </Link>
                            </td>
                            <td>{continentMap[country.continent]}</td>
                            <td>
                                325
                            </td>
                            <td>
                                <span className={`badge bg-label-info me-1`}>
                                    {country.author.first_name} {country.author.last_name}
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
                    <h4 className="fw-bold py-3 mb-4">
                        Country Reviews
                    </h4>
                    {   
                        auth.user &&
                        auth.user.role === "ADMIN" &&
                        <button
                            type="button"
                            className="btn btn-danger mb-4"
                            onClick={publishAll}
                        >
                            <span className="tf-icons bx bx-book-reader"></span>&nbsp; Publish All
                        </button>
                    }
                </div>

                <EntryTable
                    title="countries"
                    entryRenderer={renderCountries}
                    pages={pages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    searchEntry={searchEntry}
                    setSearchEntry={setSearchEntry}
                    searchedEntry={searchedEntry}
                    handleSearch={handleSearch}
                    headers={[
                        "Country",
                        "Continent",
                        "Number of schools",
                        "Author"
                    ]}
                />

            </div>
        </>
    );
}
 
export default ListCountryActions;