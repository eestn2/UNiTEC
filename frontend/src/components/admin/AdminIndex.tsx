import { useParams } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import AdminTags from "./AdminTags";
import AdminLanguages from "./AdminLanguages";
import AdminInserts from "./AdminInserts";
import AdminDesignate from "./AdminDesignate";
import AdminReport from "./AdminReport";
import "../../styles/admin.css";
import AdminReview from "./AdminReview";
import ProtectedRoute from "./ProtectedRoute";
import User from "../session/User";


const AdminIndex: React.FC = () => {
    const { panel } = useParams<{ panel: string }>();
    switch (panel) {
        case "tags":
            return <ProtectedRoute user_type={User.data.type} allowedType={'Administrador'} children={<AdminTags />} />
        case "languages":
            return <ProtectedRoute user_type={User.data.type} allowedType={'Administrador'} children={<AdminLanguages />} />
        case "inserts":
            return <ProtectedRoute user_type={User.data.type} allowedType={'Administrador'} children={<AdminInserts />} />
        case "designate":
            return <ProtectedRoute user_type={User.data.type} allowedType={'Administrador'} children={<AdminDesignate />} />
        case "report":
            return <ProtectedRoute user_type={User.data.type} allowedType={'Administrador'} children={<AdminReport />} />
        case "review":
            return <ProtectedRoute user_type={User.data.type} allowedType={'Administrador'} children={<AdminReview />} />
        case "panel":
            return <ProtectedRoute user_type={User.data.type} allowedType={'Administrador'} children={<AdminPanel />} />
        default:
            return <ProtectedRoute user_type={User.data.type} allowedType={'Administrador'} children={<AdminPanel />} />
            
    }
}

export default AdminIndex;