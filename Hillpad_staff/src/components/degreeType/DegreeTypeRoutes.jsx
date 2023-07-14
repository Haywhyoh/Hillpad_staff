import { Route, Routes } from 'react-router-dom';

import ListDegreeTypes from './ListDegreeTypes';
import CreateDegreeType from './CreateDegreeType';


function DegreeTypeRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListDegreeTypes />} />
                <Route path="/create" element={<CreateDegreeType />} />
            </Routes>
        </>
    );
}

export default DegreeTypeRoutes;