import { Route, Routes } from 'react-router-dom';

import ListDegreeTypes from './ListDegreeTypes';
import CreateDegreeType from './CreateDegreeType';
import EditDegreeType from './EditDegreeType';


function DegreeTypeRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListDegreeTypes />} />
                <Route path="/create" element={<CreateDegreeType />} />
                <Route path="/edit/:degreeTypeID" element={<EditDegreeType />} />
            </Routes>
        </>
    );
}

export default DegreeTypeRoutes;