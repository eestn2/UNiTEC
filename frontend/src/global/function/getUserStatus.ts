import { UserStatusEnum } from "../../types/user";


function getUserStatus(status: 1 | 2 | 3 | 4 |  UserStatusEnum): string {
    switch (status) {
        case 1:
            return "Estudiando";
        case 2:
            return "Buscando trabajo";
        case 3:
            return "Trabajando";
        case 4:
            return "Egresado";
        default:
            return "Error";
    }
}

export default getUserStatus;