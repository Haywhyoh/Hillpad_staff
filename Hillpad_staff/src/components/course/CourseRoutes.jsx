import { Route, Routes } from 'react-router-dom';

import ListCourses from './ListCourses';
import CreateCourse from './CreateCourse';
import EditCourse from './EditCourse';


function CourseRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListCourses />} />
                <Route path="/create" element={<CreateCourse />} />
                <Route path="/edit/:courseID" element={<EditCourse />} />
            </Routes>
        </>
    );
}

export default CourseRoutes;