/**
 * @file NavBar.tsx
 * @description A reusable React component that renders the application's navigation bar with logo and icon buttons.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */

import admin_icon from "../../assets/icons/AdminMenuIcon.svg"
import notification_icon from "../../assets/icons/bell.svg";
import about_us_icon from "../../assets/navbar/bxs-info-circle.svg";
import phone_icon from "../../assets/navbar/bxs-phone.svg"; 
import chart_icon from "../../assets/navbar/bxs-bar-chart-alt-2.svg";
import chart_icon_active from "../../assets/navbar/bxs-bar-chart-alt-2-activate.svg";
import add_offer_icon from "../../assets/navbar/bxs-edit.svg";
import add_offer_icon_activate from "../../assets/navbar/bxs-edit-active.svg";
import unitec_text from "../../assets/unitec/unitec-text.svg";
import User from "../session/User";
import { useWindowSize } from "../../hooks/responsive/useWindowSize";
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePicture from "./user/ProfilePicture";
import { UserTypeEnum } from "../../types/user";

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
    // Router states
    const navigate = useNavigate();
    const location = useLocation();
    // Conditional Variables to NavBar changes
    const user_type: UserTypeEnum =  User.data.type;
    const buttons: React.ReactElement[] | undefined[] = [
        <img src={notification_icon} alt="Notification" className="bell" style={{ display: window.innerWidth > window.innerHeight ? "none" : "block"}} />,
        <a href="#footer"><img src={about_us_icon} alt="About Us" /></a>,
        <a href="#footer"><img src={phone_icon} alt="Phone" /></a>
    ];
    if (user_type === UserTypeEnum.Empresa) {
        buttons.unshift(
            <img src={location.pathname.includes("see-applicants") ? chart_icon_active : chart_icon} onClick={() => {navigate("/see-applicants")}} style={{cursor:"pointer"}} alt="Chart" />,
            <img src={location.pathname.includes("publish-offer") ? add_offer_icon_activate:add_offer_icon} onClick={() => {navigate("/publish-offer")}} style={{cursor:"pointer"}} alt="Add Offer" />,
        )
    } else if (user_type === UserTypeEnum.Administrador) {
        if (!location.pathname.includes("admin-menu")){
            buttons.unshift(
                <div className="admin" onClick={() => {navigate("/admin-menu/panel")}} style={{cursor:"pointer"}}><img src={admin_icon} alt="AdminMenu Icon"/></div>
            )
        }else{
            const amount: number = buttons.length;
            for (let i = 0; i < amount; i++) {
                buttons.shift();
            }
            buttons.push(
                <div className="admin">
                    <div  onClick={() => {navigate("/admin-menu/panel")}} style={{color:"#113893" , cursor:"pointer"}}>Solicitudes de registro</div>
                    <div  onClick={() => {navigate("/admin-menu/tags")}} style={{color: "#113893", cursor:"pointer"}}>Etiquetas</div>
                    <div  onClick={() => {navigate("/admin-menu/languages")}} style={{color: "#113893", cursor:"pointer"}}>Idiomas</div>
                    <div  onClick={() => {navigate("/admin-menu/inserts")}} style={{color: "#113893", cursor:"pointer"}}>Inserciones</div>
                    <div  onClick={() => {navigate("/admin-menu/designate")}} style={{color: "#113893", cursor:"pointer"}}>Designar Administradores</div>
                    <div  onClick={() => {navigate("/admin-menu/report")}} style={{color: "#113893", cursor:"pointer"}}>Reportes</div>
                    <div  onClick={() => {navigate("/admin-menu/review")}} style={{color: "#113893", cursor:"pointer"}}>Reseñas</div>
                </div>
            )
        }
    }

    return (
            <div className="nav-bar">
                <div className="logo-section" style={{scale: 1, transition: "all 0.3s ease-in-out"}} onClick={() => {
                    navigate("/"); // Navigate to home page on click
                }}
                onMouseDown={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.scale = "0.9";
                }}
                onMouseUp = {(e) => {
                    e.preventDefault();
                    e.currentTarget.style.scale = "1";
                }}
                onMouseLeave={(e) => {
                    e.preventDefault(); // Prevent default button behavior
                    e.currentTarget.style.scale = '1';
                }}>
                    <img src={unitec_text} alt="Unitec Text" className="unitec-text" />
                </div>
                <div className={!location.pathname.includes("admin-menu") ? "icons-section" : "icons-section admin"}>
                    {buttons}
                    <ProfilePicture userId={User.data.id as number} size={33} vertical={window.innerWidth > window.innerHeight} />
                </div>
                
            </div>
    )
};

export default NavBar;