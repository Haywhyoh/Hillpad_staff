import { Route, Routes } from 'react-router-dom';

import ListSchools from './ListSchools';
import CreateSchool from './CreateSchool';
import EditSchool from "./EditSchool";
import ListSchoolActions from './ListSchoolActions';
import ReviewSchool from './ReviewSchool';


function SchoolRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListSchools />} />
                <Route path="/create" element={<CreateSchool />} />
                <Route path="/edit/:schoolID" element={<EditSchool />} />
                <Route path="/reviews" element={<ListSchoolActions />} />
                <Route path="/review/:schoolID" element={<ReviewSchool />} />
            </Routes>
        </>
    );
}

export default SchoolRoutes;