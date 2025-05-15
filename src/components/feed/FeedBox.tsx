/**
 * @file FeedBox.tsx
 * @description Main feed component that displays job offers and notifications in a responsive layout.
 * Fetches job offers from the server and renders them alongside notifications and navigation.
 * @author Haziel Magallanes
 * @date May 11, 2025
 */

import "../../styles/index.css";
import NavBar from '../UI/NavBar';
import AppWindow from '../UI/AppWindow';
import JobOffer from "../UI/JobOffer";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import Notification from "../UI/Notification";
import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import User from "../session/User";

/**
 * A React functional component that renders the main feed with job offers and notifications.
 * Handles window resize for responsive design, fetches job offers from the server, and displays them in styled windows.
 *
 * @component
 * @returns {JSX.Element} A responsive feed layout with job offers, notifications, and navigation bar.
 *
 * @example
 * ```tsx
 * <FeedBox />
 * ```
 * @author Haziel Magallanes
 */
function FeedBox() {
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
    

  const [jobOffers, setJobOffers] = useState<ReactElement[]>([]);
  const [notifications, setNotifications] = useState<ReactElement[]>([]);
  // Fetch job offers from the server
  const loadJobOffers = async () => {
    try {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/requests/feed/job-offers.php`);
      if (response.status !== 200 && response.data.status !== "success") {
        console.error("Failed to load job offers:", response.data.message);
      } else {
        const offers = await Promise.all(
        response.data.job_offers.map(async (offer: any) => {
          return (
            <JobOffer
              key={offer.id}
              width={820}
              height={400}
              authorId={offer.creator_id}
              title={offer.title}
              description={offer.description}
            />
          );
        }));
        setJobOffers(offers);
      }
    } catch (error) {
      console.error("An error occurred while loading job offers:", error);
    }
  };
  // Fetch notifications from the server
  const loadNotifications = async () => {
    try {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const userId = User.data.id;
      const response = await axios.get(`${apiUrl}/requests/user/retrieve-notifications.php?user_id=${userId}`);
      if (response.status !== 200 || response.data.status !== "success") {
        console.error("Failed to load notifications:", response.data.message);
      } else {
        const notificationsList = response.data.notifications.map((notif: any) => (
          <Notification key={notif.id} width={300} height={60} notificationId={notif.id} />
        ));
        setNotifications(notificationsList);
      }
    } catch (error) {
      console.error("An error occurred while loading notifications:", error);
    }
  };

  // Load job offers on component mount
  useEffect(() => {
    loadJobOffers();
    loadNotifications();
  }, []);

  return (
    <div>
      <NavBar />
      <AppWindow
        height={600}
        width={880}
        className="feedbox"
        style={{
          position: "absolute",
          left: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
          top: `${TranslateFigmaCoords.translateFigmaY(100)}px`,
          overflowY: "scroll",
          borderTopRightRadius: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
          borderBottomRightRadius: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
        }}
      >
        <div
          className="feed-title"
          style={{
            width: `${TranslateFigmaCoords.translateFigmaX(350)}px`,
            height: `${TranslateFigmaCoords.translateFigmaY(53)}px`,
            position: "relative",
            left: "50%",
            transform: "translateX(-47%)",
            marginTop: `${TranslateFigmaCoords.translateFigmaY(32)}px`,
            marginBottom: `${TranslateFigmaCoords.translateFigmaY(32)}px`,
          }}
        >
          Ofertas de Trabajo
        </div>
        {jobOffers}
      </AppWindow>
      <AppWindow
        height={600}
        width={340}
        style={{
          position: "absolute",
          right: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
          top: `${TranslateFigmaCoords.translateFigmaY(100)}px`,
          overflowY: "scroll",
          display: "flex", 
          flexDirection: "column", 
          rowGap: TranslateFigmaCoords.translateFigmaY(20), 
        }}
        className="notification-box"
      >
        <div
          className="feed-title"
          style={{
            width: `${TranslateFigmaCoords.translateFigmaX(250)}px`,
            height: `${TranslateFigmaCoords.translateFigmaY(53)}px`,
            position: "relative",
            right: "50%",
            transform: "translateX(50%)",
            marginTop: `${TranslateFigmaCoords.translateFigmaY(32)}px`,
            marginBottom: `${TranslateFigmaCoords.translateFigmaY(32)}px`,
          }}
        >
          Notificaciones
        </div>
        {notifications.length > 0 ? notifications : (
          <div>Pepito el placeholder</div>
        )}
      </AppWindow>
    </div>
  );
}

export default FeedBox;