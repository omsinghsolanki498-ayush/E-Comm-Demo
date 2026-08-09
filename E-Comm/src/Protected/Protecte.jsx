import { Navigate } from "react-router-dom";
import { AmpersandIcon } from "lucide-react";

function Protecte({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children;
}
export default Protecte;