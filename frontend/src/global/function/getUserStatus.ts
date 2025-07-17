import { UserStatus } from "../../types/user";


function getUserStatus(status: 0 | 1 | 2 | 3 |  UserStatus): string {
    if (typeof status === "string") return status;
    switch (status) {
        case 0:
            return "Estudiando";
        case 1:
            return "Buscando trabajo";
        case 2:
            return "Trabajando";
        case 3:
            return "Egresado";
        default:
            return "Error";
    }
}

export default getUserStatus;