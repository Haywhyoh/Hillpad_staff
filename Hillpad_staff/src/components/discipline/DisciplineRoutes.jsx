import { Route, Routes } from 'react-router-dom';

import ListDisciplines from './ListDisciplines';
import CreateDiscipline from './CreateDiscipline';
import EditDiscipline from './EditDiscipline';


function DisciplineRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListDisciplines />} />
                <Route path="/create" element={<CreateDiscipline />} />
                <Route path="/edit/:disciplineID" element={<EditDiscipline />} />
            </Routes>
        </>
    );
}

export default DisciplineRoutes;