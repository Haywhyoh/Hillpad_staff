import { Route, Routes } from 'react-router-dom';

import ListCountries from './ListCountries';
// import CreateCountry from './CreateCountry';


function CountryRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ListCountries />} />
                {/* <Route path="/create" element={<CreateCountry />} /> */}
            </Routes>
        </>
    );
}

export default CountryRoutes;