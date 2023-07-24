import { Route, Routes } from 'react-router-dom';

import ListSchools from './ListSchools';
import CreateSchool from './CreateSchool';
import EditSchool from "./EditSchool";


function SchoolRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListSchools />} />
                <Route path="/create" element={<CreateSchool />} />
                <Route path="/edit/:schoolID" element={<EditSchool />} />
            </Routes>
        </>
    );
}

export default SchoolRoutes;