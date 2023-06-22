import NavBar from "./NavBar";
import Dashboard from "./Dashboard";


function MainBody() {

    return (
        <>
            <div className="layout-page">
                <NavBar />
                <Dashboard />
            </div>
        </>
    );
}

export default MainBody;
