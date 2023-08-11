import { Route, Routes } from 'react-router-dom';

import ListCountries from './ListCountries';
import CreateCountry from './CreateCountry';
import EditCountry from './EditCountry';
import ListCountryActions from './ListCountryActions';
import ReviewCountry from './ReviewCountry';


function CountryRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListCountries />} />
                <Route path="/create" element={<CreateCountry />} />
                <Route path="/edit/:countryID" element={<EditCountry />} />
                <Route path="/reviews" element={<ListCountryActions />} />
                <Route path="/review/:countryID" element={<ReviewCountry />} />
            </Routes>
        </>
    );
}

export default CountryRoutes;