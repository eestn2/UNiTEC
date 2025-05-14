import { useEffect, useState } from "react";
import ResponsiveComponent from "./ResponsiveComponent";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import footer_logo from "../../assets/unitec/footer-logo.svg";
import school_logo from "../../assets/eest2/eest2-white.svg";

const Footer: React.FC<ResponsiveComponent> = ({ style, className }) => {
    // Re-Render on window resize for responsive design
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    console.log("Current window size: ", windowSize);
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <footer
            className={`${className || ""} unitec-footer`}
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                ...style,
            }}
        >
            <div className="footer-content">
                <div className="logo">
                    <img src={footer_logo} alt="UNiTEC Logo" className="unitec" />
                    <img src={school_logo} alt="EEST2 Logo" className="eest2" />
                </div>
                <div className="vertical-divider" />
                <div className="contact">
                    <strong>Contacto</strong>
                    <div>
                        Correo: <a href="mailto:eest2@gmail.com">eest2@gmail.com</a>
                    </div>
                    <div>
                        Teléfono: <a href="tel:+5492364590201">+54 9 2364 590201</a>
                    </div>
                    <div>
                        Web Institucional: <a href="https://www.eest2.edu.ar" target="_blank" rel="noopener noreferrer">www.eest2.edu.ar</a>
                    </div>
                    <div>
                        Dirección: <a href="https://maps.google.com/?q=Argentina,+Bs+As,+Junín,+Discépolo+400" target="_blank" rel="noopener noreferrer">
                            Argentina, Bs As, Junín, Discépolo 400
                        </a>
                    </div>
                </div>
                <div className="vertical-divider" style={{
                    marginRight: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                    marginLeft: `${TranslateFigmaCoords.translateFigmaX(52)}px`,
                }}/>
                <div className="links">
                    <strong>Información útil</strong>
                    <div>
                        <a href="#">Sobre nosotros...</a>
                    </div>
                    <div>
                        <a href="#">Políticas de privacidad</a>
                    </div>
                    <div>
                        <a href="#">Ver terminos y condiciones de servicio.</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;