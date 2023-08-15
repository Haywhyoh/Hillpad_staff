import { Route, Routes } from 'react-router-dom';

import ListDegreeTypes from './ListDegreeTypes';
import CreateDegreeType from './CreateDegreeType';
import EditDegreeType from './EditDegreeType';
import ListDegreeTypeActions from './ListDegreeTypeActions';


function DegreeTypeRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListDegreeTypes />} />
                <Route path="/create" element={<CreateDegreeType />} />
                <Route path="/edit/:degreeTypeID" element={<EditDegreeType />} />
                <Route path="/reviews" element={<ListDegreeTypeActions />} />
            </Routes>
        </>
    );
}

export default DegreeTypeRoutes;