import { UserStatus } from "../../types/user";


function getUserStatus(status: number | UserStatus): string {
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