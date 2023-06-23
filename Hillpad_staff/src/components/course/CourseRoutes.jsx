import { Route, Routes } from 'react-router-dom';

import ListCourses from './ListCourses';
import CreateCourse from './CreateCourse';


function CourseRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListCourses />} />
                <Route path="/create" element={<CreateCourse />} />
            </Routes>
        </>
    );
}

export default CourseRoutes;