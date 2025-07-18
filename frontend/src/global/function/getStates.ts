export function getStates(state: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10): string {
    switch (state) {
        case 1:
            return "Buscando beca";
        case 2:
            return "Trabajando - No disponible";
        case 3:
            return "Trabajando - Disponible";
        case 4:
            return "No disponible";
        case 5:
            return "Disponible";
        case 6:
            return "Estudiando - Disponible";
        case 7:
            return "Estudiando - No disponible";
        case 8:
            return "Estudiando - Buscando beca";
        case 9:
            return "Trabajando - Buscando beca";
        case 10:
            return "Otro";
        default:
            return "Error";
    }
}