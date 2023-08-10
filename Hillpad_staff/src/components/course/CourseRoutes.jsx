import { Route, Routes } from 'react-router-dom';

import ListCourses from './ListCourses';
import CreateCourse from './CreateCourse';
import EditCourse from './EditCourse';
import ListCourseActions from './ListCourseActions';
import ReviewCourse from './ReviewCourse';


function CourseRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListCourses />} />
                <Route path="/create" element={<CreateCourse />} />
                <Route path="/edit/:courseID" element={<EditCourse />} />
                <Route path="/reviews" element={<ListCourseActions />} />
                <Route path="/review/:courseID" element={<ReviewCourse />} />
            </Routes>
        </>
    );
}

export default CourseRoutes;