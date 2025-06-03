import { useParams } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import AdminTags from "./AdminTags";
import AdminLanguages from "./AdminLanguages";
import AdminInserts from "./AdminInserts";
import AdminDesignate from "./AdminDesignate";
import AdminReport from "./AdminReport";
import "../../styles/admin.css";
import AdminReview from "./AdminReview";
const AdminIndex: React.FC = () => {
    const { panel } = useParams<{ panel: string }>();
    switch (panel) {
        case "tags":
            return <AdminTags />
        case "languages":
            return <AdminLanguages />
        case "inserts":
            return <AdminInserts />
        case "designate":
            return <AdminDesignate />
        case "report":
            return <AdminReport />
        case "review":
            return <AdminReview />
        case "panel":
            return <AdminPanel />
        default:
            return <AdminPanel />
    }
}

export default AdminIndex;