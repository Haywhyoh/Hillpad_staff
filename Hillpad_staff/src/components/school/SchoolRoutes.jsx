import { Route, Routes } from 'react-router-dom';

import ListSchools from './ListSchools';
import CreateSchool from './CreateSchool';


function SchoolRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListSchools />} />
                <Route path="/create" element={<CreateSchool />} />
            </Routes>
        </>
    );
}

export default SchoolRoutes;