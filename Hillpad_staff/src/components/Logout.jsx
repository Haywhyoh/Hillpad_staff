import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function Logout() {
    let auth = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        auth.logout(() => {
            navigate("/login", {
                replace: true
            });
        });
    });

    return null;
}
 
export default Logout;