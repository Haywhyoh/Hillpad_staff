import { Route, Routes } from 'react-router-dom';

import ListDisciplines from './ListDisciplines';
import CreateDiscipline from './CreateDiscipline';


function DisciplineRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListDisciplines />} />
                <Route path="/create" element={<CreateDiscipline />} />
            </Routes>
        </>
    );
}

export default DisciplineRoutes;