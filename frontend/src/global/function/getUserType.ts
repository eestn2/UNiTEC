import { UserTypeEnum } from "../../types/user";

export function getUserType(type: 1 | 2 | 3 | 4 | UserTypeEnum) :string {
    switch (type) {
        case 1:
            return "Empresa";
        case 2:
            return "Estudiante";
        case 3:
            return "Egresado";
        case 4:
            return "Administrador";
        default:
            return "Error";
    }
}

export default getUserType;