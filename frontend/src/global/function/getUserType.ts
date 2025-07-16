import { UserType } from "../../types/user";

export function getUserType(type: number | UserType) :string {
    if (typeof type === "string") return type;
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