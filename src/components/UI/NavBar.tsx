import React from "react";
import "../../styles/index.css";
import notification_icon from "../../assets/navbar/bxs-bell-ring.svg";
import about_us_icon from "../../assets/navbar/bxs-info-circle.svg";
import phone_icon from "../../assets/navbar/bxs-phone.svg";
import unitec_text from "../../assets/navbar/unitec_Texto_Color_SVG 2.svg";

const NavBar: React.FC = () => {
    return (
        <div className="nav-bar">
            <div className="logo-section">
                <img src={unitec_text} alt="Unitec Text" className="unitec-text"/>
            </div>
            <div className="icons-section">
                <img src={about_us_icon} alt="About Us" className="about-us-icon"/>
                <img src={phone_icon} alt="Notification" className="phone-icon" />
                <img src={notification_icon} alt="Notification" className="notification-icon" style={{display: "none"}}/>
                <div className="profile-pic"></div>
            </div>
        </div>
    );
};

export default NavBar;