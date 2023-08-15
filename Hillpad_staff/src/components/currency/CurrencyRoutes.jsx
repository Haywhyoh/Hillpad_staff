import { Route, Routes } from 'react-router-dom';

import ListCurrencies from './ListCurrencies';
// import CreateDiscipline from './CreateDiscipline';
// import EditDiscipline from './EditDiscipline';
// import ListDisciplineActions from './ListDisciplineActions';
// import ReviewDiscipline from './ReviewDiscipline';


function CurrencyRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListCurrencies />} />
                {/* <Route path="/create" element={<CreateDiscipline />} /> */}
                {/* <Route path="/edit/:disciplineID" element={<EditDiscipline />} /> */}
                {/* <Route path="/reviews" element={<ListDisciplineActions />} /> */}
                {/* <Route path="/review/:disciplineID" element={<ReviewDiscipline />} /> */}
            </Routes>
        </>
    );
}

export default CurrencyRoutes;