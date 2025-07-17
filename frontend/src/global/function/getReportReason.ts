export function getReportReason(reason: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10) :string {
    switch (reason) {
        case 1:
            return "Contenido inapropiado";
        case 2:
            return "Suplantación de identidad";
        case 3:
            return "Spam";
        case 4:
            return "Estafa o fraude";
        case 5:
            return "Acoso o comportamiento abusivo";
        case 6:
            return "Violación de datos personales o privacidad";
        case 7:
            return "Contenido ilegal";
        case 8:
            return "Discriminación en ofertas";
        case 9:
            return "Uso no autorizado o indebido de la plataforma";
        case 10:
            return "Reporte de violación de términos y condiciones";
        default:
            return "Error";
    }
}