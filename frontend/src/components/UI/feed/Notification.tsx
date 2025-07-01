/**
 * @file Notification.tsx
 * @description A reusable React component for displaying notification messages in a responsive box.
 * Converts width from pixels to responsive units based on screen size.
 * @author Haziel Magallanes
 * @date May 6, 2025
 */

import React, { JSX, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useResponsiveDimensions from "../../../hooks/responsive/useResponsiveDimensions";
import type { TypedResponse } from "../../../types/Response";
import type { notification } from "../../../types/notification";
import ResponsiveComponent from "../../../global/interface/ResponsiveComponent";

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
const Notification: React.FC<NotificationProps> = ({ notificationId, width = 10, style, className, vertical = false }) => {
    // Responsive width
    const { finalWidth, translateX } = useResponsiveDimensions({ height: 'auto', width, vertical });
    // State variables for notification data
    const [read, changeState] = useState(false);
    const [content, setContent] = useState<string>("Cargando notificación...");
    const [action, setAction] = useState<string | CallableFunction | undefined>(undefined);

    const navigate = useNavigate();

    function getAction(): JSX.Element | null {
        if (typeof action === "string") return <Link to={action} className="view-more">Ver más</Link>;
        if (typeof action === "function") return <button onClick={() => {action()}} className="view-more">Ver más</button>;
        return null;
    }
    const viewOffer = React.useCallback((id: number, message: string, type: number) => {
        navigate(`/job-offer/${id}/${message}/${type}`);
    }, [navigate]);
    
    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const { data: response } = await axios.get<TypedResponse<notification>>(
                    `/function/get-notification-data.php?id=${notificationId}`
                );
                const { status, message, data: notification } = response;
                if (status === "success" && notification) {
                    setContent(notification.message);
                    if (notification.action === "view_offer") {
                        setAction(() => () => viewOffer(notification.sender_id, notification.message, notification.type));
                    }
                } else {
                    console.error("Failed to fetch notification data:", message);
                    setContent("No se pudo cargar la notificación.");
                }
            } catch (error) {
                console.error("Error fetching notification data:", error);
                setContent("Error al cargar la notificación.");
            }
        };
        fetchNotification();
    }, [notificationId, viewOffer]);

    return (
        <div
            className={`notification ${className || ""}`}
            style={{
                height: 'auto',
                width: finalWidth,
                position: 'relative',
                ...style,
            }}
            onMouseEnter={() => { changeState(true); }}>
            <div className="state" style={{
                width: `${translateX(16)}px`,
                height: `${translateX(16)}px`,
            }}>
                <div style={{
                    width: `${translateX(12)}px`,
                    height: `${translateX(12)}px`,
                    backgroundColor: read ? '#748595' : '#FF3C3C'
                }}></div>
            </div>
            <p style={{
                margin: `${translateX(10)}px`,
                marginTop: `${translateX(5)}px`,
                marginBottom: `${translateX(5)}px`
            }}>{content}{getAction()}</p>
        </div>
    );
};

export default Notification;