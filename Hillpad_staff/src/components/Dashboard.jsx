import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';

import EntryChart from './EntryChart';
import Spinner from './common/Spinner';

import useAuth from '../hooks/useAuth';

// import courseService from '../services/api/courseService';
// import schoolService from '../services/api/schoolService';
import statsService from '../services/api/statsService';


import heroImageLight from '../assets/img/illustrations/man-with-laptop-light.png';
import bachelorsImage from '../assets/img/icons/unicons/bachelors.svg';
import mastersImage from '../assets/img/icons/unicons/masters.svg';
import doctoratesImage from '../assets/img/icons/unicons/doctorates.svg';
import schoolsImage from '../assets/img/icons/unicons/schools.svg';
import settingsImage from '../assets/img/icons/notifications/settings.svg';
import messagesImage from '../assets/img/icons/notifications/messages.svg';
import bookImage from '../assets/img/icons/unicons/book-open.svg';
import AutoChanger from './common/AutoChanger';

// import '../assets/js/dashboards-analytics.js';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);

    const [coursesDaily, setCoursesDaily] = useState(0);
    const [schoolsDaily, setSchoolsDaily] = useState(0);

    const [bachelorsPublished, setBachelorsPublished] = useState(0);
    const [bachelorsReview, setBachelorsReview] = useState(0);
    const [mastersPublished, setMastersPublished] = useState(0);
    const [mastersReview, setMastersReview] = useState(0);
    const [doctoratesPublished, setDoctoratesPublished] = useState(0);
    const [doctoratesReview, setDoctoratesReview] = useState(0);
    const [coursesRejected, setCoursesRejected] = useState(0);
    const [schoolsPublished, setSchoolsPublished] = useState(0);
    const [schoolsReview, setSchoolsReview] = useState(0);
    const [schoolsRejected, setSchoolsRejected] = useState(0);

    const [coursesReviewTotal, setCoursesReviewTotal] = useState(0);
    const [schoolsReviewTotal, setSchoolsReviewTotal] = useState(0);
    const [countriesReviewTotal, setCountriesReviewTotal] = useState(0);
    const [coursesApprovedTotal, setCoursesApprovedTotal] = useState(0);
    const [schoolsApprovedTotal, setSchoolsApprovedTotal] = useState(0);
    const [coursesPublishedTotal, setCoursesPublishedTotal] = useState(0);
    const [schoolsPublishedTotal, setSchoolsPublishedTotal] = useState(0);

    const [activeEntryChart, setActiveEntryChart] = useState("Courses");

    let location = useLocation();
    let navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const metrics = [
                    "daily_courses_added",
                    "daily_schools_added",

                    "total_bachelors_published",
                    "total_bachelors_review",
                    "total_masters_published",
                    "total_masters_review",
                    "total_doctorates_published",
                    "total_doctorates_review",
                    "total_courses_rejected",
                    "total_schools_published",
                    "total_schools_review",
                    "total_schools_rejected",

                    "total_courses_review_db",
                    "total_schools_review_db",
                    "total_countries_review_db",
                    "total_courses_approved_db",
                    "total_schools_approved_db",
                    "total_courses_published_db",
                    "total_schools_published_db",
                ]
                
                const currentDate = format(new Date(), "yyyy-M-d");

                // const coursesDailyQuery = `author=${user.id}&created_date=${currentDate}`;
                // const schoolsDailyQuery = `author=${user.id}&created_date=${currentDate}`;
                // let response = await courseService.getCourseDrafts(coursesDailyQuery);
                // if (response.status === 200) {
                //     setCoursesDaily(response.data.count);
                // }
                // response = await schoolService.getSchoolDrafts(schoolsDailyQuery);
                // if (response.status === 200) {
                //     setSchoolsDaily(response.data.count);
                // }

                let response = await statsService.getAccountEntriesStats(metrics, currentDate);
                if (response.status === 200) {
                    const result = response.data;
                    setCoursesDaily(result["daily_courses_added"])
                    setSchoolsDaily(result["daily_schools_added"])

                    setBachelorsPublished(result["total_bachelors_published"]);
                    setBachelorsReview(result["total_bachelors_review"]);
                    setMastersPublished(result["total_masters_published"]);
                    setMastersReview(result["total_masters_review"]);
                    setDoctoratesPublished(result["total_doctorates_published"]);
                    setDoctoratesReview(result["total_doctorates_review"]);
                    setCoursesRejected(result["total_courses_rejected"]);
                    setSchoolsPublished(result["total_schools_published"]);
                    setSchoolsReview(result["total_schools_review"]);
                    setSchoolsRejected(result["total_schools_rejected"]);

                    setCoursesReviewTotal(result["total_courses_review_db"]);
                    setSchoolsReviewTotal(result["total_schools_review_db"]);
                    setCountriesReviewTotal(result["total_countries_review_db"]);
                    setCoursesApprovedTotal(result["total_courses_approved_db"]);
                    setSchoolsApprovedTotal(result["total_schools_approved_db"]);
                    setCoursesPublishedTotal(result["total_courses_published_db"]);
                    setSchoolsPublishedTotal(result["total_schools_published_db"]);
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
        fetchData();
    }, [location, navigate, user]);

    const dateDisplay = () => {
        return format(
          new Date(),
          "d LLL, yyyy"
        );
    }
 
    return (
      <>
        <div className="container-xxl flex-grow-1 container-p-y pb-0">
          <div className="row">
            {/* Welcome Card */}
            <div className="col-lg-8 mb-4 order-0">
              <div className="card">
                <div className="d-flex align-items-end row">
                  <div className="col-sm-7">
                    <div className="card-body">
                      <h5 className="card-title text-primary">
                        Welcome {user.first_name} &#128526;
                      </h5>

                      {user.role === "SPECIALIST" &&
                        <AutoChanger
                          elements={[
                            <>
                              <p className="mb-4">
                                You have
                                <span className="text-info">
                                  <span className="fw-bold">&nbsp;{coursesRejected}&nbsp;</span>
                                  Rejected Courses.&nbsp;
                                </span>
                                Review courses rejected by your supervisor.
                              </p>
                              <Link to="/course?status=REJECTED" className="btn btn-sm btn-outline-info">
                                View Rejected Courses
                              </Link>
                            </>,
                            <>
                              <p className="mb-4">
                                You have
                                <span className="text-warning">
                                  <span className="fw-bold">&nbsp;{schoolsRejected}&nbsp;</span>
                                  Rejected Schools.&nbsp;
                                </span>
                                Review schools rejected by your supervisor.
                              </p>
                              <Link to="/school?status=REJECTED" className="btn btn-sm btn-outline-warning">
                                View Rejected Schools
                              </Link>
                            </>
                          ]}
                          frequency={5000}
                        />
                      }

                      {user.role === "SUPERVISOR" &&
                        <AutoChanger
                          elements={[
                            <>
                              <p className="mb-4">
                                You have
                                <span className="text-info">
                                  <span className="fw-bold">&nbsp;{coursesReviewTotal}&nbsp;</span>
                                  courses waiting for review.&nbsp;
                                </span>
                                Review, then approve or reject them.
                              </p>
                              <Link to="/course/reviews" className="btn btn-sm btn-outline-info">
                                Review Courses
                              </Link>
                            </>,
                            <>
                              <p className="mb-4">
                                You have
                                <span className="text-warning">
                                  <span className="fw-bold">&nbsp;{schoolsReviewTotal}&nbsp;</span>
                                  schools waiting for review.&nbsp;
                                </span>
                                Review, then approve or reject them.
                              </p>
                              <Link to="/school/reviews" className="btn btn-sm btn-outline-warning">
                                Review Schools
                              </Link>
                            </>
                          ]}
                          frequency={5000}
                        />
                      }

                      {user.role === "ADMIN" &&
                        <AutoChanger
                          elements={[
                            <>
                              <p className="mb-4">
                                You have
                                <span className="text-info">
                                  <span className="fw-bold">&nbsp;{coursesApprovedTotal}&nbsp;</span>
                                  courses waiting to be published.&nbsp;
                                </span>
                                Review and publish them.
                              </p>
                              <Link to="/course/reviews" className="btn btn-sm btn-outline-info">
                                Publish Courses
                              </Link>
                            </>,
                            <>
                              <p className="mb-4">
                                You have
                                <span className="text-warning">
                                  <span className="fw-bold">&nbsp;{schoolsApprovedTotal}&nbsp;</span>
                                  schools waiting to be published.&nbsp;
                                </span>
                                Review and publish them.
                              </p>
                              <Link to="/school/reviews" className="btn btn-sm btn-outline-warning">
                                Publish Schools
                              </Link>
                            </>,
                            <>
                              <p className="mb-4">
                                You have
                                <span className="text-success">
                                  <span className="fw-bold">&nbsp;{countriesReviewTotal}&nbsp;</span>
                                  countries waiting to be published.&nbsp;
                                </span>
                                Review and publish them.
                              </p>
                              <Link to="/country/reviews" className="btn btn-sm btn-outline-success">
                                Publish Countries
                              </Link>
                            </>,
                          ]}
                          frequency={5000}
                        />
                      }

                    </div>
                  </div>
                  <div className="col-sm-5 text-center text-sm-left">
                    <div className="card-body pb-0 px-0 px-md-4">
                      <img
                        src={heroImageLight}
                        height="140"
                        alt="View Badge User"
                        data-app-dark-img={heroImageLight}
                        data-app-light-img={heroImageLight}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Report Card */}
            <div className="col-lg-4 col-md-4 order-1 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                    <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                      <div className="card-title">
                        <h5 className="text-nowrap mb-2">
                          Daily {user.role === "SPECIALIST" && "Profile"}{" "}
                          {user.role !== "SPECIALIST" && "Entries"} Summary
                        </h5>
                        <span className="badge bg-label-warning rounded-pill">
                          {dateDisplay()}
                        </span>
                      </div>
                    </div>

                    {/* <div id="profileReportChart"></div> */}
                  </div>
                  <div className="d-flex align-items-start justify-content-between">
                    <div>
                      <small className="text-primary fw-semibold">
                        Courses Added
                      </small>
                      <h3 className="mb-0">
                        {loading && <Spinner />}
                        {!loading && coursesDaily}
                      </h3>
                    </div>
                    <div>
                      <small className="text-primary fw-semibold">
                        Schools Added
                      </small>
                      <h3 className="mb-0">
                        {loading && <Spinner />}
                        {!loading && schoolsDaily}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-8 order-2 order-md-2 mb-4">
              <div className="row">
                <div className="col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <a href="/" className="stretched-link">
                        <div className="card-title d-flex align-items-start justify-content-between">
                          <div className="avatar flex-shrink-0">
                            <img
                              src={bachelorsImage}
                              alt="Bachelors"
                              className="rounded"
                            />
                          </div>
                        </div>
                        <div className="card-title">
                          <h5 className="text-nowrap mb-2">Bachelors</h5>
                        </div>
                        <div className="d-flex align-items-start justify-content-between">
                          <div>
                            <small className="fw-semibold text-success">
                              Published
                            </small>
                            <h3 className="mb-0">
                              {loading && <Spinner />}
                              {!loading && bachelorsPublished}
                            </h3>
                          </div>
                          <div>
                            <small className="fw-semibold text-warning">
                              Under Review
                            </small>
                            <h3 className="mb-0">
                              {loading && <Spinner />}
                              {!loading && bachelorsReview}
                            </h3>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <a href="/" className="stretched-link">
                        <div className="card-title d-flex align-items-start justify-content-between">
                          <div className="avatar flex-shrink-0">
                            <img
                              src={mastersImage}
                              alt="Masters"
                              className="rounded"
                            />
                          </div>
                        </div>
                        <div className="card-title">
                          <h5 className="text-nowrap mb-2">Masters</h5>
                        </div>
                        <div className="d-flex align-items-start justify-content-between">
                          <div>
                            <small className="fw-semibold text-success">
                              Published
                            </small>
                            <h3 className="mb-0">
                              {loading && <Spinner />}
                              {!loading && mastersPublished}
                            </h3>
                          </div>
                          <div>
                            <small className="fw-semibold text-warning">
                              Under Review
                            </small>
                            <h3 className="mb-0">
                              {loading && <Spinner />}
                              {!loading && mastersReview}
                            </h3>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <a
                        href="{% url 'staff_courses_listing' %}"
                        className="stretched-link"
                      >
                        <div className="card-title d-flex align-items-start justify-content-between">
                          <div className="avatar flex-shrink-0">
                            <img
                              src={doctoratesImage}
                              alt="Doctorates"
                              className="rounded"
                            />
                          </div>
                        </div>
                        <div className="card-title">
                          <h5 className="text-nowrap mb-2">Doctorates</h5>
                        </div>
                        <div className="d-flex align-items-start justify-content-between">
                          <div>
                            <small className="fw-semibold text-success">
                              Published
                            </small>
                            <h3 className="mb-0">
                              {loading && <Spinner />}
                              {!loading && doctoratesPublished}
                            </h3>
                          </div>
                          <div>
                            <small className="fw-semibold text-warning">
                              Under Review
                            </small>
                            <h3 className="mb-0">
                              {loading && <Spinner />}
                              {!loading && doctoratesReview}
                            </h3>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <a href="/" className="stretched-link">
                        <div className="card-title d-flex align-items-start justify-content-between">
                          <div className="avatar flex-shrink-0">
                            <img
                              src={schoolsImage}
                              alt="Schools"
                              className="rounded"
                            />
                          </div>
                        </div>
                        <div className="card-title">
                          <h5 className="text-nowrap mb-2">Schools</h5>
                        </div>
                        <div className="d-flex align-items-start justify-content-between">
                          <div>
                            <small className="fw-semibold text-success">
                              Published
                            </small>
                            <h3 className="mb-0">
                              {loading && <Spinner />}
                              {!loading && schoolsPublished}
                            </h3>
                          </div>
                          <div>
                            <small className="fw-semibold text-warning">
                              Under Review
                            </small>
                            <h3 className="mb-0">
                              {loading && <Spinner />}
                              {!loading && schoolsReview}
                            </h3>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-4 order-3 order-md-3">
                {user.role === "SPECIALIST" && (
                    <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between">
                            <h5 className="card-title m-0 me-2">Notifications</h5>
                            <div className="dropdown">
                                <button
                                    className="btn p-0"
                                    type="button"
                                    id="transactionID"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="transactionID"
                                >
                                    <a className="dropdown-item" href="/">
                                        View all
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="list-group list-group-flush">
                                <a
                                    href="/"
                                    className="list-group-item list-group-item-action border-0 d-flex"
                                >
                                    <div className="avatar flex-shrink-0 me-3">
                                        <img
                                            src={schoolsImage}
                                            alt="User"
                                            className="rounded"
                                        />
                                    </div>
                                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                        <div className="me-2">
                                            <small className="text-muted d-block mb-1">
                                                1 hour ago
                                            </small>
                                            <h6 className="mb-0">
                                                Toronto Metropolitan University
                                            </h6>
                                        </div>
                                        <div className="user-progress d-flex align-items-center gap-1">
                                            <h6 className="mb-0"></h6>
                                            <span className="text-muted">Approval</span>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    href="/"
                                    className="list-group-item list-group-item-action border-0 d-flex"
                                >
                                    <div className="avatar flex-shrink-0 me-3">
                                    <img
                                        src={mastersImage}
                                        alt="User"
                                        className="rounded"
                                    />
                                    </div>
                                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                    <div className="me-2">
                                        <small className="text-muted d-block mb-1">
                                        22 hours ago
                                        </small>
                                        <h6 className="mb-0">Electrical Engineering</h6>
                                    </div>
                                    <div className="user-progress d-flex align-items-center gap-1">
                                        <span className="text-muted">Submission</span>
                                    </div>
                                    </div>
                                </a>
                                <a
                                    href="/"
                                    className="list-group-item list-group-item-action border-0 d-flex"
                                >
                                    <div className="avatar flex-shrink-0 me-3">
                                    <img
                                        src={settingsImage}
                                        alt="User"
                                        className="rounded"
                                    />
                                    </div>
                                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                    <div className="me-2">
                                        <small className="text-muted d-block mb-1">
                                        3 days ago
                                        </small>
                                        <h6 className="mb-0">Password changed</h6>
                                    </div>
                                    <div className="user-progress d-flex align-items-center gap-1">
                                        <span className="text-muted">Settings</span>
                                    </div>
                                    </div>
                                </a>
                                <a
                                    href="/"
                                    className="list-group-item list-group-item-action border-0 d-flex"
                                >
                                    <div className="avatar flex-shrink-0 me-3">
                                    <img
                                        src={messagesImage}
                                        alt="User"
                                        className="rounded"
                                    />
                                    </div>
                                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                    <div className="me-2">
                                        <small className="text-muted d-block mb-1">
                                        6 days ago
                                        </small>
                                        <h6 className="mb-0">Message from Jane Doe</h6>
                                    </div>
                                    <div className="user-progress d-flex align-items-center gap-1">
                                        <span className="text-muted">Chat</span>
                                    </div>
                                    </div>
                                </a>
                                <a
                                    href="/"
                                    className="list-group-item list-group-item-action border-0 d-flex"
                                >
                                    <div className="avatar flex-shrink-0 me-3">
                                    <img
                                        src={bachelorsImage}
                                        alt="User"
                                        className="rounded"
                                    />
                                    </div>
                                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                    <div className="me-2">
                                        <small className="text-muted d-block mb-1">
                                        2 weeks ago
                                        </small>
                                        <h6 className="mb-0">Corporate Finance</h6>
                                    </div>
                                    <div className="user-progress d-flex align-items-center gap-1">
                                        <span className="text-muted">Rejection</span>
                                    </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {user.role !== "SPECIALIST" && (
                    <div className="card">
                        <div className="card-header">
                            <ul className="nav nav-pills" role="tablist">
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className={`nav-link ${activeEntryChart === "Courses" ? "active" : ""}`}
                                        role="tab"
                                        onClick={() => setActiveEntryChart("Courses")}
                                    >
                                        Courses
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className={`nav-link ${activeEntryChart === "Schools" ? "active" : ""}`} 
                                        role="tab"
                                        onClick={() => setActiveEntryChart("Schools")}
                                    >
                                        Schools
                                    </button>
                                </li>
                            </ul>
                        </div>
                    
                        <EntryChart
                            entryName={activeEntryChart}
                            totalValue={activeEntryChart === "Courses" ? coursesPublishedTotal : schoolsPublishedTotal}
                            icon={activeEntryChart === "Courses" ? bookImage : schoolsImage}
                            loading={loading}
                        />

                    </div>
                )}
            </div>
          </div>
        </div>
      </>
    );
}
 
export default Dashboard;
