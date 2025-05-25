/**
 * @file NavBar.tsx
 * @description A reusable React component that renders the application's navigation bar with logo and icon buttons.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */

import notification_icon from "../../assets/icons/bell.svg";
import about_us_icon from "../../assets/navbar/bxs-info-circle.svg";
import phone_icon from "../../assets/navbar/bxs-phone.svg";
import chart_icon from "../../assets/navbar/bxs-bar-chart-alt-2.svg";
import add_offer_icon from "../../assets/navbar/bxs-edit.svg";
import unitec_text from "../../assets/unitec/unitec-text.svg";
import User from "../session/User";
import { useWindowSize } from "../../hooks/responsive/useWindowSize";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * A React functional component that renders the navigation bar with logo and icon buttons.
 *
 * @component
 * @returns {JSX.Element} The navigation bar with logo, icons, and profile picture.
 *
 * @example
 * ```tsx
 * <NavBar />
 * ```
 * @author Daviel Díaz Gonzáles
 */


const NavBar: React.FC = () => {
    // Re-Render on window resize
    const windowSize = useWindowSize();
    console.log(windowSize);
    // Router states
    const navigate = useNavigate();
    const location = useLocation();
    // Conditional Variables to NavBar changes
    const user_type: number =  User.data.type_id as number;
    console.log(user_type, User.data)
    const buttons: React.ReactElement[] | undefined[] = [
        <img src={notification_icon} alt="Notification" className="bell" style={{ display: window.innerWidth > window.innerHeight ? "none" : "block"}} />,
        <a href="#footer"><img src={about_us_icon} alt="About Us" /></a>,
        <a href="#footer"><img src={phone_icon} alt="Phone" /></a>
    ];
    if (user_type === 1) {
        buttons.unshift(
            <img src={chart_icon} alt="Chart" />,
            <img src={add_offer_icon} alt="Add Offer" />,
        )
    } else if (user_type === 4) {
        if (!location.pathname.includes("admin-menu")){
            buttons.unshift(
                <div className="admin" onClick={() => {navigate("/admin-menu/panel")}} style={{color: "#113893"}}>Admin menu</div>
            )
        }else{
            const amount: number = buttons.length;
            for (let i = 0; i < amount; i++) {
                buttons.shift();
            }
            buttons.push(
                <div className="admin">
                    <div  onClick={() => {navigate("/admin-menu/panel")}} style={{color: "#113893", cursor:"pointer"}}>Solicitudes de registro</div>
                    <div  onClick={() => {navigate("/admin-menu/tags")}} style={{color: "#113893", cursor:"pointer"}}>Etiquetas</div>
                    <div onClick={() => {navigate("/admin-menu/languages")}} style={{color: "#113893", cursor:"pointer"}}>Lenguajes</div>
                    <div  onClick={() => {navigate("/admin-menu/inserts")}} style={{color: "#113893", cursor:"pointer"}}>Inserciones</div>
                    <div  onClick={() => {navigate("/admin-menu/designate")}} style={{color: "#113893", cursor:"pointer"}}>Designar Administradores</div>
                    <div  onClick={() => {navigate("/admin-menu/report")}} style={{color: "#113893", cursor:"pointer"}}>Reportes</div>
                </div>
            )
        }
    }

    return (
            <div className="nav-bar">
                <div className="logo-section">
                    <img src={unitec_text} alt="Unitec Text" className="unitec-text" />
                </div>
                <div className={!location.pathname.includes("admin-menu") ? "icons-section" : "icons-section admin"}>
                    {buttons}
                    <div className="profile-pic"></div>
                </div>
                
            </div>
    )
};

export default NavBar;