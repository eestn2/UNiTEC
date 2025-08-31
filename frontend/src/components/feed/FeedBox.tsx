/**
 * @file FeedBox.tsx
 * @description Main feed component that displays job offers and notifications in a responsive layout.
 * Fetches job offers from the server and renders them alongside notifications and navigation.
 * @date May 11, 2025
 */

import NavBar from '../UI/NavBar';
import AppWindow from '../UI/AppWindow';
import JobOffer from "../UI/feed/JobOffer";
import Notification from "../UI/feed/Notification";
import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import User from "../session/User";
import type { offer } from '../../types/JobOfferTypes';
import type { notification } from '../../types/notification';
import no_notifications from '../../assets/icons/no-notis.svg';
import no_feed from '../../assets/icons/no-feed.svg';
import LoadingScreen from '../UI/LoadingScreens/LoadingScreen';
import '../../styles/feed/feedbox.css';
import '../../styles/notifications/notifications.css';
import defaultError from '../../global/messages/defaultError';

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
  const [jobOffers, setJobOffers] = useState<offer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<ReactElement[]>([]);

  // Fetch job offers from the server
  const loadJobOffers = async () => { 
    try {
      const response = await axios.get(`/feed/job-offers.php`);
      if (response) setJobOffers(response.data.data.job_offers);
    } catch (error) {
      if (axios.isAxiosError(error)) return alert(error.response?.data?.message || defaultError);
      alert(defaultError);
    } finally {
      setLoadingOffers(false);
    }
  };

  // Fetch notifications from the server
  const loadNotifications = async () => {
    try {
      const userId = User.data.id;
      const response = await axios.get(`/user/retrieve-notifications.php?user_id=${userId}`);
      if (response) {
        const notificationsList = response.data.data.notifications.map((notif: notification) => (
          <Notification key={notif.id} width={300} height={60} notificationId={notif.id} />
        ));
        setNotifications(notificationsList);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) return alert(error.response?.data?.message || defaultError);
      alert(defaultError);
    }
  };

  // Load job offers on component mount
  useEffect(() => {
    if (!User.data.id) window.location.reload();
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
        style={{height: 600}}
      >
        <div className="feed-title">
          Ofertas de Trabajo
        </div>
        { loadingOffers ? <LoadingScreen loadingContent={true}/>
          : jobOffers.length > 0 ? ( 
            jobOffers.map((offer) => (
              <JobOffer
                key={offer.id}
                width={820}
                height={400}
                authorId={offer.creator_id}
                title={offer.title}
                description={offer.description}
                offerId={offer.id}
                onDelete={(id) => setJobOffers((prev) => prev.filter((o) => o.id !== id))}
              />
            ))
            ) : (
              <div className="feed-container">
                <img src={no_feed} />
                <span>No hay ofertas de trabajo.</span>
              </div>
            )}
      </AppWindow>
      <AppWindow
        height={600}
        width={340}
        className="notification-box"
      >
        <div className="feed-title">
          Notificaciones
        </div>
        {notifications.length > 0 ? notifications : (
          <div className="feed-container">
            <img src={no_notifications} />
            <span>No tienes notificaciones.</span>
          </div>
        )}
      </AppWindow>
    </div>
  );
}

export default FeedBox;