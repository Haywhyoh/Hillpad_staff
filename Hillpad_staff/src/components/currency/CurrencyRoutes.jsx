import { Route, Routes } from 'react-router-dom';

import ListCurrencies from './ListCurrencies';
import CreateCurrency from './CreateCurrency';
import EditCurrency from './EditCurrency';
import ListCurrencyActions from './ListCurrencyActions';
import ReviewCurrency from './ReviewCurrency';


function CurrencyRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListCurrencies />} />
                <Route path="/create" element={<CreateCurrency />} />
                <Route path="/edit/:currencyID" element={<EditCurrency />} />
                <Route path="/reviews" element={<ListCurrencyActions />} />
                <Route path="/review/:currencyID" element={<ReviewCurrency />} />
            </Routes>
        </>
    );
}

export default CurrencyRoutes;