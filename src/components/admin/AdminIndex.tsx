import { useParams } from "react-router-dom";
import AdminPanel from "./AdminPanel";

const AdminIndex: React.FC = () => {
    const { panel } = useParams<{ panel: string }>();
    switch (panel) {
        case "tags":
            // Change namings and code all cases
            return <AdminPanel />
        default:
            // Change this to the approve users component
            return <AdminPanel />
    }
}

export default AdminIndex;