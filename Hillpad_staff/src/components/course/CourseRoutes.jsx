import { Route, Routes } from 'react-router-dom';

import ListCourses from './ListCourses';
import CreateCourse from './CreateCourse';
import EditCourse from './EditCourse';
import ListCourseActions from './ListCourseActions';


function CourseRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListCourses />} />
                <Route path="/create" element={<CreateCourse />} />
                <Route path="/edit/:courseID" element={<EditCourse />} />
                <Route path="/actions" element={<ListCourseActions />} />
            </Routes>
        </>
    );
}

export default CourseRoutes;