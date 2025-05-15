/**
 * @file Notification.tsx
 * @description A reusable React component for displaying notification messages in a responsive box.
 * Converts width from pixels to responsive units based on screen size.
 * @author Haziel Magallanes
 * @date May 6, 2025
 */

import React, { JSX, useEffect, useState } from "react";
import "../../styles/index.css";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import ResponsiveComponent from "./ResponsiveComponent";
import axios from "axios";
import { Link } from "react-router-dom";

/**
 * Props for the `Notification` component.
 *
 * @extends ResponsiveComponent
 * @property {number} notificationId - Unique identifier for the notification instance.
 */
interface NotificationProps extends ResponsiveComponent {
    notificationId: number;
}

/**
 * A React functional component that renders a notification box with a read/unread indicator.
 * Loads its data from the backend using the notificationId prop.
 *
 * @component
 * @param {ResponsiveComponent} props - The properties for the Notification component.
 * @param {number} [props.width=10] - The width of the notification box in Figma coordinates.
 * @param {number} props.notificationId - The notification ID to fetch data for.
 * @param {React.CSSProperties} [props.style] - Additional inline styles for the notification container.
 * @param {string} [props.className] - Additional CSS class names for the notification container.
 *
 * @returns {JSX.Element} A styled notification box with a read/unread state indicator.
 */
const Notification: React.FC<NotificationProps> = ({ notificationId, width = 10, style, className }) => {
    const [read, changeState] = useState(false);
    const [content, setContent] = useState<string>("Cargando notificación...");
    const [action, setAction] = useState<string | CallableFunction | undefined>(undefined);

    width = TranslateFigmaCoords.translateFigmaX(width);

    function getAction(): JSX.Element | null {
        if (typeof action === "string") return <Link to={action} className="view-more">Ver más</Link>;
        if (typeof action === "function") return <button onClick={() => {action()}} className="view-more">Ver más</button>;
        return null;
    }
    function viewOffer(id: number) {
        console.log("Ver aplicación con ID:", id);
    }
    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
                const response = await axios.get(
                    `${apiUrl}/requests/function/get-notification-data.php?id=${notificationId}`
                );
                if (response.data.status === "success" && response.data.message) {
                    setContent(response.data.message);
                    if (response.data.action === "view_offer") {
                        setAction(() => () => viewOffer(response.data.sender_id));
                    }
                } else {
                    setContent("No se pudo cargar la notificación.");
                }
            } catch (error) {
                console.error("Error fetching notification data:", error);
                setContent("Error al cargar la notificación.");
            }
        };
        fetchNotification();
    }, [notificationId]);

    return (
        <div
            className={`notification ${className || ""}`}
            style={{
                height: 'auto',
                width: `${width}px`,
                position: 'relative',
                ...style,
            }}
            onMouseEnter={() => { changeState(true); }}>
            <div className="state" style={{
                width: `${TranslateFigmaCoords.translateFigmaX(16)}px`,
                height: `${TranslateFigmaCoords.translateFigmaX(16)}px`,
            }}>
                <div style={{
                    width: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                    height: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                    backgroundColor: read ? '#748595' : '#FF3C3C'
                }}></div>
            </div>
            <p style={{
                margin: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                marginTop: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                marginBottom: `${TranslateFigmaCoords.translateFigmaX(5)}px`
            }}>{content}{getAction()}</p>
        </div>
    );
};

export default Notification;