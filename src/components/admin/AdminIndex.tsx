import { useParams } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import AdminTags from "./AdminTags";
import AdminLanguages from "./AdminLanguages";
import AdminInserts from "./AdminInserts";

const AdminIndex: React.FC = () => {
    const { panel } = useParams<{ panel: string }>();
    switch (panel) {
        case "tags":
            // Change namings and code all cases
            return <AdminTags />
        case "languages":
            // Change namings and code all cases
            return <AdminLanguages />
        case "inserts":
            // Change namings and code all cases
            return <AdminInserts />
        case "panel":
            // Change namings and code all cases
            return <AdminPanel />
        default:
            // Change this to the approve users component
            return <AdminPanel />
    }
}

export default AdminIndex;