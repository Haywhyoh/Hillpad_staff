import { Route, Routes } from 'react-router-dom';

import ListCurrencies from './ListCurrencies';
import CreateCurrency from './CreateCurrency';
import EditCurrency from './EditCurrency';
// import ListDisciplineActions from './ListDisciplineActions';
// import ReviewDiscipline from './ReviewDiscipline';


function CurrencyRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListCurrencies />} />
                <Route path="/create" element={<CreateCurrency />} />
                <Route path="/edit/:currencyID" element={<EditCurrency />} />
                {/* <Route path="/reviews" element={<ListDisciplineActions />} /> */}
                {/* <Route path="/review/:disciplineID" element={<ReviewDiscipline />} /> */}
            </Routes>
        </>
    );
}

export default CurrencyRoutes;