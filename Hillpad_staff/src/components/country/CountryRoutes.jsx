import { Route, Routes } from 'react-router-dom';

import ListCountries from './ListCountries';
import CreateCountry from './CreateCountry';
import EditCountry from './EditCountry';


function CountryRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListCountries />} />
                <Route path="/create" element={<CreateCountry />} />
                <Route path="/edit/:countryID" element={<EditCountry />} />
            </Routes>
        </>
    );
}

export default CountryRoutes;