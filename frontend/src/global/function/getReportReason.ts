export function getReportReason(reason: number) :string {
    switch (reason) {
        case 1:
            return "El usuario está haciendo spam";
        case 2:
            return "Foto inapropiada";
        case 3:
            return "Contenido indebido";
        case 4:
            return "El usuario me dice cosas ;C";
        case 5:
            return "El usuario está acosando a otros";
        default:
            return "Error";
    }
}