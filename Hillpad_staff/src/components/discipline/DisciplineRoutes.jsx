import { Route, Routes } from 'react-router-dom';

import ListDisciplines from './ListDisciplines';


function DisciplineRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListDisciplines />} />
            </Routes>
        </>
    );
}

export default DisciplineRoutes;