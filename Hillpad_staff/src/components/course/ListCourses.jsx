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
import degreeTypeService from "../../services/api/degreeTypeService";
import disciplineService from "../../services/api/disciplineService";
import userService from '../../services/api/userService';


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
    const [degreeTypeFilterOptions, setDegreeTypeFilterOptions] = useState([]);
    const [disciplineFilterOptions, setDisciplineFilterOptions] = useState([]);
    const [authorFilterOptions, setAuthorFilterOptions] = useState([]);
    
    const [searchEntry, setSearchEntry] = useState("");
    const [searchedEntry, setSearchedEntry] = useState("");
    const [advancedSearchEntries, setAdvancedSearchEntries] = useState({
        name: "",
        school: "",
        country: "",
        continent: "",
        programmeType: "",
        degreeType: "",
        discipline: "",
        courseFormat: "",
        attendance: "",
        author: "",
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
    const courseFormatFilterOptions = [
        {name: "Full-time", value: "FULL"},
        {name: "Part-time", value: "PART"},
    ];
    const attendanceFilterOptions = [
        {name: "On-site", value: "SITE"},
        {name: "Online", value: "ONLINE"},
        {name: "Blended", value: "BLENDED"},
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

                // Get DegreeTypes
                const degreeTypeResponse = await degreeTypeService.getDegreeTypes();
                if (degreeTypeResponse.status === 200) {
                    const degreeTypes = degreeTypeResponse.data.results.map((item) => ({
                        value: item.id,
                        name: item.name + " (" + item.short_name + ")",
                    }));
                    setDegreeTypeFilterOptions(degreeTypes);
                }

                // Get Disciplines
                const disciplineResponse = await disciplineService.getDisciplines();
                if (disciplineResponse.status === 200) {
                    const disciplines = disciplineResponse.data.results.map((item) => ({
                        value: item.id,
                        name: item.name,
                    }));
                    setDisciplineFilterOptions(disciplines);
                }

                // Get Authors (Only for Admins and Supervisors)
                if (auth.user.role === "ADMIN" || auth.user.role === "SUPERVISOR") {
                    const authorResponse = await userService.getUsers("role=SPECIALIST");
                    if (authorResponse.status === 200) {
                        const authors = authorResponse.data.results.map((item) => ({
                            value: item.id,
                            name: item.first_name + " " + item.last_name,
                        }));
                        setAuthorFilterOptions(authors);
                    }
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
    }, [currentPage, dataCount, location, navigate, pageSize, searchQuery, advancedSearchQuery, auth.user, searchParams]);

    const handleSearch = () => {
        setSearchQuery(`${searchEntry? `name=${searchEntry}&`: ""}`);
        setAdvancedSearchQuery("");
        setSearchedEntry(searchEntry);
        setCurrentPage(1); // Reset the current page to 1 so as to avoid 404 queries
    };

    const handleAdvancedSearch = () => {
        setSearchQuery("");
        setSearchedEntry("");
        setSearchEntry("");
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
          }${
            advancedSearchEntries.degreeType
              ? `degree_type=${advancedSearchEntries.degreeType}&`
              : ""
          }${
            advancedSearchEntries.discipline
              ? `discipline_id=${advancedSearchEntries.discipline}&`
              : ""
          }${
            advancedSearchEntries.courseFormat
              ? `course_format=${advancedSearchEntries.courseFormat}&`
              : ""
          }${
            advancedSearchEntries.attendance
              ? `attendance=${advancedSearchEntries.attendance}&`
              : ""
          }${
            advancedSearchEntries.author
              ? `author=${advancedSearchEntries.author}&`
              : ""
          }`
        );
        setCurrentPage(1);
    };

    const renderAdvancedSearch = () => {
        return (
            <div className="my-4">
                <div className="col-12 px-4">
                    <h5 className={`${advancedSearchQuery? "text-danger": ""}`}>
                        Advanced Search
                        <span className="px-2">
                            <button
                                className="btn btn-xs btn-icon"
                                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                            > 
                                <i className={`${advancedSearchQuery? "text-danger": ""} bx bx-chevron-${showAdvancedSearch ? "up" : "down"}`}></i>
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
                        {advancedSearchQuery &&
                            <div className="px-4 row">
                                <h6>
                                    <span>
                                        <button 
                                            className="btn btn-xs btn-icon"
                                            onClick={() => setAdvancedSearchEntries({
                                                name: "",
                                                school: "",
                                                country: "",
                                                continent: "",
                                                programmeType: "",
                                                degreeType: "",
                                                discipline: "",
                                                courseFormat: "",
                                                attendance: "",
                                                author: "",
                                            })}    
                                        >
                                            <i className="bx bx-x text-danger"></i>
                                        </button>
                                    </span>
                                    Clear advanced search filters
                                </h6>
                            </div>
                        }
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
                                    <FilterSelect 
                                        name="degree_type"
                                        value={advancedSearchEntries.degreeType}
                                        onChange={({currentTarget: input}) => setAdvancedSearchEntries({...advancedSearchEntries, "degreeType": input.value})}
                                        label="Degree Type"
                                        options={degreeTypeFilterOptions}
                                    />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Discipline</label>
                                    <FilterSelect 
                                        name="discipline"
                                        value={advancedSearchEntries.discipline}
                                        onChange={({currentTarget: input}) => setAdvancedSearchEntries({...advancedSearchEntries, "discipline": input.value})}
                                        label="Discipline"
                                        options={disciplineFilterOptions}
                                    />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Course Format</label>
                                    <FilterSelect 
                                        name="course_format"
                                        value={advancedSearchEntries.courseFormat}
                                        onChange={({currentTarget: input}) => setAdvancedSearchEntries({...advancedSearchEntries, "courseFormat": input.value})}
                                        label="Course Format"
                                        options={courseFormatFilterOptions}
                                    />
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <label className="form-label">Attendance</label>
                                    <FilterSelect 
                                        name="attendance"
                                        value={advancedSearchEntries.attendance}
                                        onChange={({currentTarget: input}) => setAdvancedSearchEntries({...advancedSearchEntries, "attendance": input.value})}
                                        label="Attendance"
                                        options={attendanceFilterOptions}
                                    />
                                </div>
                                {(auth.user.role === "ADMIN" || auth.user.role === "SUPERVISOR") &&
                                    <div className="col-12 col-sm-6 col-lg-4">
                                        <label className="form-label">Author</label>
                                        <FilterSelect 
                                            name="author"
                                            value={advancedSearchEntries.author}
                                            onChange={({currentTarget: input}) => setAdvancedSearchEntries({...advancedSearchEntries, "author": input.value})}
                                            label="Author"
                                            options={authorFilterOptions}
                                        />
                                    </div>
                                }
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
                    {(auth.user.role === "ADMIN" || auth.user.role === "SUPERVISOR") &&
                        <td className="text-center">
                            <Spinner addClasses="mx-4 my-3" />
                        </td>
                    }
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
                            {(auth.user.role === "ADMIN" || auth.user.role === "SUPERVISOR") &&
                                <td>
                                    <span className={`badge bg-label-info me-1`}>{course.author.first_name} {course.author.last_name}</span>
                                </td>
                            }
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
                    headers={(auth.user.role === "ADMIN" || auth.user.role === "SUPERVISOR")? [
                            "Course Name",
                            "School",
                            "Degree",
                            "Author",
                            "Status",
                            "Actions"
                        ] : [
                            "Course Name",
                            "School",
                            "Degree",
                            "Status",
                            "Actions"
                        ]
                    }
                />

            </div>
        </>
    );
    
}
 
export default ListCourses;
