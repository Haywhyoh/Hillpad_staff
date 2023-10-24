import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import config from '../../config';

import EntryTable from '../common/EntryTable';
import Spinner from '../common/Spinner';
import TabPane from '../common/TabPane';
import FilterSelect from '../common/form/FilterSelect';

import useAuth from '../../hooks/useAuth';

import courseService from '../../services/api/courseService';
import statsService from '../../services/api/statsService';
import schoolService from "../../services/api/schoolService";
import countryService from "../../services/api/countryService";
import programmeTypeService from "../../services/api/programmeTypeService";


const ListCourses = () => {
    
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCount, setDataCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesRejected, setCoursesRejected] = useState(0);
    
    const [schoolFilterOptions, setSchoolFilterOptions] = useState([]);
    const [countryFilterOptions, setCountryFilterOptions] = useState([]);
    const [programmeTypeFilterOptions, setProgrammeTypeFilterOptions] = useState([]);
    
    const [searchEntry, setSearchEntry] = useState("");
    const [searchedEntry, setSearchedEntry] = useState("");
    const [advancedSearchEntries, setAdvancedSearchEntries] = useState({
        name: "",
        school: "",
        country: "",
        continent: "",
        programmeType: "",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [advancedSearchQuery, setAdvancedSearchQuery] = useState("");
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

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
    };

    const continentFilterOptions = [
        {name: "Africa", value: "AF"},
        {name: "Asia", value: "AS"},
        {name: "Europe", value: "EU"},
        {name: "North America", value: "NA"},
        {name: "South America", value: "SA"},
        {name: "Oceania", value: "OC"},
    ];

    useEffect(() => {
        const status = searchParams.get("status");

        async function fetchData() {
            try {
                setLoading(true);

                const pageQuery = `${searchQuery}${advancedSearchQuery}${status ? `status=${status}&` : ""}page=${currentPage}`;
                const response = await courseService.getCourseDrafts(pageQuery);
                if (response.status === 200) {
                    setDataCount(response.data.count);
                    setPages(Math.ceil(dataCount / pageSize));
                    setCourses(response.data.results);
                }

                const rejectedCoursesResponse = await statsService.getAccountEntriesStats(["total_courses_rejected"]);
                if (rejectedCoursesResponse.status === 200) {
                    const result = rejectedCoursesResponse.data;
                    setCoursesRejected(result["total_courses_rejected"]);
                }

                // Get Schools
                const schoolResponse = await schoolService.getSchools("ordering=name&page_size=1000000");
                if (schoolResponse.status === 200) {
                    const schools = schoolResponse.data.results.map((item) => ({
                        value: item.id,
                        name: item.name,
                    }));
                    setSchoolFilterOptions(schools);
                }

                // Get Countries
                const countryResponse = await countryService.getCountries();
                if (countryResponse.status === 200) {
                    const countries = countryResponse.data.results.map((item) => ({
                        value: item.id,
                        name: item.name,
                    }));
                    setCountryFilterOptions(countries);
                }

                // Get ProgrammeTypes
                const programmeTypeResponse = await programmeTypeService.getProgrammeTypes();
                if (programmeTypeResponse.status === 200) {
                    const programmeTypes = programmeTypeResponse.data.results.map((item) => ({
                        value: item.name,
                        name: item.name,
                    }));
                    setProgrammeTypeFilterOptions(programmeTypes);
                }

            } catch (ex) {
                if (ex.response.status === 401) {
                    navigate("/login", {
                        state: { from: location },
                        replace: true
                    });
                }
                console.error(ex);
            }
            setLoading(false);
        }
        fetchData();
    }, [currentPage, dataCount, location, navigate, pageSize, searchQuery, advancedSearchQuery, searchParams]);

    const handleSearch = () => {
        setSearchQuery(`${searchEntry? `name=${searchEntry}&`: ""}`);
        setSearchedEntry(searchEntry);
        setCurrentPage(1); // Reset the current page to 1 so as to avoid 404 queries
    };

    const handleAdvancedSearch = () => {
        setAdvancedSearchQuery(
          `${
            advancedSearchEntries.name
              ? `name=${advancedSearchEntries.name}&`
              : ""
          }${
            advancedSearchEntries.school
              ? `school=${advancedSearchEntries.school}&`
              : ""
          }${
            advancedSearchEntries.country
              ? `country=${advancedSearchEntries.country}&`
              : ""
          }${
            advancedSearchEntries.continent
              ? `continent=${advancedSearchEntries.continent}&`
              : ""
          }${
            advancedSearchEntries.programmeType
              ? `programme=${advancedSearchEntries.programmeType}&`
              : ""
          }`
        );
        setCurrentPage(1);
    };

    const renderAdvancedSearch = () => {
        return (
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
                            handleAdvancedSearch();
                        }}
                    >
                        <div className="col-12 px-4">
                            <div className="row g-3 mb-4">
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Course Name</label>
                                    <input name="name" type="text" value={advancedSearchEntries.name} onChange={({currentTarget: input}) => setAdvancedSearchEntries({...advancedSearchEntries, "name": input.value})} className="form-control dt-input dt-full-name" data-column="1" placeholder="Electrical Engineering" data-column-index="0" />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">School</label>
                                    <FilterSelect 
                                        name="school"
                                        value={advancedSearchEntries.school}
                                        onChange={({currentTarget: input}) => setAdvancedSearchEntries({...advancedSearchEntries, "school": input.value})}
                                        label="School"
                                        options={schoolFilterOptions}
                                    />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Country</label>
                                    <FilterSelect 
                                        name="country"
                                        value={advancedSearchEntries.country}
                                        onChange={({currentTarget: input}) => setAdvancedSearchEntries({...advancedSearchEntries, "country": input.value})}
                                        label="Country"
                                        options={countryFilterOptions}
                                    />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Continent</label>
                                    <FilterSelect 
                                        name="continent"
                                        value={advancedSearchEntries.continent}
                                        onChange={({currentTarget: input}) => setAdvancedSearchEntries({...advancedSearchEntries, "continent": input.value})}
                                        label="Continent"
                                        options={continentFilterOptions}
                                    />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Programme Type</label>
                                    <FilterSelect 
                                        name="programme_type"
                                        value={advancedSearchEntries.programmeType}
                                        onChange={({currentTarget: input}) => setAdvancedSearchEntries({...advancedSearchEntries, "programmeType": input.value})}
                                        label="Programme Type"
                                        options={programmeTypeFilterOptions}
                                    />
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
        );
    };

    const renderCourses = () => {
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
            );
        }
        else if (courses.length === 0 && !loading) {
            return (
                <tr>
                    <td>
                        <h5 className="mx-4 my-3 text-danger">No courses.</h5>
                    </td>
                </tr>
            );
        } else {
            return (
                <>
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td>
                                <i className="fab fa-angular fa-lg text-danger me-3"></i>
                                <strong>{course.name}</strong>
                            </td>
                            <td>{course.school ? course.school.name : "-"}</td>
                            <td>
                                {(course.degree_type && "short_name" in course.degree_type) ? course.degree_type.short_name : "-"}
                            </td>
                            <td>
                                <span className={`badge ${statusClass[course.status]} me-1`}>{course.status}</span>
                            </td>
                            <td>
                            <div className="dropdown">
                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                    <i className="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to={`edit/${course.id}`}>
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
            );
        }
    };

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold py-3 mb-4">
                        Courses
                    </h4>
                    {   
                        auth.user &&
                        auth.user.role === "SPECIALIST" &&
                        <Link to="create">
                            <button type="button" className="btn btn-secondary mb-4">
                                <span className="tf-icons bx bx-plus"></span>&nbsp; Add Course
                            </button>
                        </Link>
                    }
                </div>

                <TabPane
                    setSearchParams={setSearchParams}
                    tabItems={[
                        {label: "All", param: ""},
                        {label: "Review", param: "status=REVIEW"},
                        {label: "Approved", param: "status=APPROVED"},
                        {label: "Rejected", param: "status=REJECTED", badge: coursesRejected},
                        {label: "Published", param: "status=PUBLISHED"}
                    ]}
                    active="All"
                />

                <EntryTable 
                    title="courses"
                    entryRenderer={renderCourses}
                    pages={pages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalResultCount={dataCount}
                    searchEntry={searchEntry}
                    setSearchEntry={setSearchEntry}
                    searchedEntry={searchedEntry}
                    handleSearch={handleSearch}
                    renderAdvancedSearch={renderAdvancedSearch}
                    loading={loading}
                    headers={[
                        "Course Name",
                        "School",
                        "Degree",
                        "Status",
                        "Actions"
                    ]}
                />

            </div>
        </>
    );
    
}
 
export default ListCourses;
