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
import ResponsiveComponent from "../../global/interface/ResponsiveComponent";

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


interface NavBarProps extends ResponsiveComponent{
    isAdmin?: boolean;
    
}
const NavBar: React.FC <NavBarProps>= ({
    isAdmin = false,
}) => {
    
    // Re-Render on window resize

    // Conditional Variables to NavBar changes
    const user_type: number =  User.data.type as number;
    const buttons:React.ReactElement | React.ReactElement[] | undefined[] = [
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
        const amount: number = buttons.length;
        for (let i = 0; i < amount; i++) {
            buttons.shift();
        }
    }

    return (
        isAdmin ? (
            
            <div className="nav-bar">
                <div className="logo-section">
                    <img src={unitec_text} alt="Unitec Text" className="unitec-text" />
                </div>
                <div className="icons-section">
                    buttons = (
                        <div style={{ display: "flex"}}>
                            <button>Usuarios</button>
                            <button>Idiomas</button>
                            <button>Ofertas</button>
                           
                        </div>
                    );  

                </div>
            </div>

        ) : (
            <>
                <div className="nav-bar">
                <div className="logo-section">
                    <img src={unitec_text} alt="Unitec Text" className="unitec-text" />
                </div>
                <div className="icons-section">
                    {buttons}
                    <div className="profile-pic"></div>
                </div>
                </div>
            </>

        )
    );
};

export default NavBar;