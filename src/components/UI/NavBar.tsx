/**
 * @file NavBar.tsx
 * @description A reusable React component that renders the application's navigation bar with logo and icon buttons.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */

import React from "react";
import "../../styles/index.css";
import notification_icon from "../../assets/navbar/bxs-bell-ring.svg";
import about_us_icon from "../../assets/navbar/bxs-info-circle.svg";
import phone_icon from "../../assets/navbar/bxs-phone.svg";
/* import chart_icon from "../../assets/navbar/bxs-bar-chart-alt-2.svg";
import add_offer_icon from "../../assets/navbar/bxs-edit.svg"; */
import unitec_text from "../../assets/unitec/unitec_Texto_Color_SVG.svg";

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
    // Conditional Variables to NavBar changes
    /* const user_type = "user"; // This can be "user" or "admin" */
    const buttons: React.ReactElement[] | undefined[] = [
        <img src={about_us_icon} alt="About Us" />,
        <img src={phone_icon} alt="Phone" />,
        <img src={notification_icon} alt="Notification" style={{ display: "none" }} />
    ];
/*     if (user_type === "enterprise") {
        buttons.unshift(
            <img src={chart_icon} alt="Chart" />,
            <img src={add_offer_icon} alt="Add Offer" />,
        )
    } else if (user_type === "admin") {
        let amount: number = buttons.length;
        for (let i = 0; i < amount; i++) {
            buttons.shift();
        }
    } */
    return (
        <div className="nav-bar">
            <div className="logo-section">
                <img src={unitec_text} alt="Unitec Text" className="unitec-text" />
            </div>
            <div className="icons-section">
                {buttons}
                <div className="profile-pic"></div>
            </div>
        </div>
    );
};

export default NavBar;