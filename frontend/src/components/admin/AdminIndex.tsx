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
import { UserTypeEnum } from "../../types/user";


const AdminIndex: React.FC = () => {
    const { panel } = useParams<{ panel: string }>();
    switch (panel) {
        case "tags":
            return <ProtectedRoute user_type={User.data.type} allowedType={UserTypeEnum.Administrador} children={<AdminTags />} />
        case "languages":
            return <ProtectedRoute user_type={User.data.type} allowedType={UserTypeEnum.Administrador} children={<AdminLanguages />} />
        case "inserts":
            return <ProtectedRoute user_type={User.data.type} allowedType={UserTypeEnum.Administrador} children={<AdminInserts />} />
        case "designate":
            return <ProtectedRoute user_type={User.data.type} allowedType={UserTypeEnum.Administrador} children={<AdminDesignate />} />
        case "report":
            return <ProtectedRoute user_type={User.data.type} allowedType={UserTypeEnum.Administrador} children={<AdminReport />} />
        case "review":
            return <ProtectedRoute user_type={User.data.type} allowedType={UserTypeEnum.Administrador} children={<AdminReview />} />
        case "panel":
            return <ProtectedRoute user_type={User.data.type} allowedType={UserTypeEnum.Administrador} children={<AdminPanel />} />
        default:
            return <ProtectedRoute user_type={User.data.type} allowedType={UserTypeEnum.Administrador} children={<AdminPanel />} />
            
    }
}

export default AdminIndex;