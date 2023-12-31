import { Route, Routes } from 'react-router-dom';

import ListDisciplines from './ListDisciplines';
import CreateDiscipline from './CreateDiscipline';
import EditDiscipline from './EditDiscipline';
import ListDisciplineActions from './ListDisciplineActions';
import ReviewDiscipline from './ReviewDiscipline';


function DisciplineRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListDisciplines />} />
                <Route path="/create" element={<CreateDiscipline />} />
                <Route path="/edit/:disciplineID" element={<EditDiscipline />} />
                <Route path="/reviews" element={<ListDisciplineActions />} />
                <Route path="/review/:disciplineID" element={<ReviewDiscipline />} />
            </Routes>
        </>
    );
}

export default DisciplineRoutes;