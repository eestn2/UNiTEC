/**
 * @file FeedBox.tsx
 * @description Main feed component that displays job offers and notifications in a responsive layout.
 * Fetches job offers from the server and renders them alongside notifications and navigation.
 * @author Haziel Magallanes
 * @date May 11, 2025
 */

import NavBar from '../UI/NavBar';
import AppWindow from '../UI/AppWindow';
import JobOffer from "../UI/feed/JobOffer";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import Notification from "../UI/feed/Notification";
import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import User from "../session/User";
import { TypedResponseWNamedArray } from '../../types/Response';
import type { offer } from '../../types/JobOfferTypes';
import type { notification } from '../../types/notification';
import no_notifications from '../../assets/icons/no-notis.svg';
import no_feed from '../../assets/icons/no-feed.svg';

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
  // State variables for job offers and notifications
  const [jobOffers, setJobOffers] = useState<ReactElement[] | undefined>(undefined);
  const [notifications, setNotifications] = useState<ReactElement[]>([]);
  // Fetch job offers from the server
  const loadJobOffers = async () => {
    try {
      const {data: response} = await axios.get<TypedResponseWNamedArray<offer, "job_offers">>(`/feed/job-offers.php`);
      if (response.status !== "success") {
        console.error("Failed to load job offers:", response.message);
      } else {
        const offers = response.data.job_offers.map((offer) => (
          <JobOffer
            key={offer.id}
            width={820}
            height={400}
            authorId={offer.creator_id}
            title={offer.title}
            description={offer.description}
          />
        ));
        setJobOffers(offers);
      }
    } catch (error) {
      console.error("An error occurred while loading job offers:", error);
    }
  };
  // Fetch notifications from the server
  const loadNotifications = async () => {
    try {
      const userId = User.data.id;
      const { data: response } = await axios.get<TypedResponseWNamedArray<notification, "notifications">>(`/user/retrieve-notifications.php?user_id=${userId}`);
      if (response.status !== "success") {
        console.error("Failed to load notifications:", response.message);
      } else {
        const notificationsList = response.data.notifications.map((notif) => (
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
          height: `${TranslateFigmaCoords.translateFigmaY(600)}px`,
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
            transform: "translateX(-50%)",
            marginTop: `${TranslateFigmaCoords.translateFigmaY(32)}px`,
            marginBottom: `${TranslateFigmaCoords.translateFigmaY(32)}px`,
          }}
        >
          Ofertas de Trabajo
        </div>
        {jobOffers ? jobOffers : (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src={no_feed} style={{
              width: TranslateFigmaCoords.translateFigmaX(300),
              height: TranslateFigmaCoords.translateFigmaX(300),
            }} />
            <span style={{
              color: "rgb(170, 164, 211)",
              textAlign: "center"
            }}>No hay ofertas de trabajo.</span>
          </div>
        )}
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
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src={no_notifications} style={{
              width: TranslateFigmaCoords.translateFigmaX(200),
              height: TranslateFigmaCoords.translateFigmaX(200),
            }} />
            <span style={{
              direction: "ltr",
              color: "rgb(170, 164, 211)"
            }}>No tienes notificaciones.</span>
          </div>
          
        )}
      </AppWindow>
    </div>
  );
}

export default FeedBox;