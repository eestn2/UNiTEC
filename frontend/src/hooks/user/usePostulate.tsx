import axios from 'axios';
import { useState } from 'react';

export  function usePostulate() {
  const [postulated, setPostulated] = useState(false);

  const postulate = async (offerID: number) => {
    if (postulated) return; 
    try {
    const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
    await axios.post(`${apiUrl}/user/postulate.php`, {
        offer_id: offerID,
    });
    setPostulated(true);
        } catch (error) {
    console.error("Failed to postulate:", error);
    }
  };

  const depostulate = async (offerID: number) => {
    if (!postulated) return;
    try {
    const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
    await axios.delete(`${apiUrl}/user/depostulate.php`, {
        data: {
        offerID: offerID,
        }
    });
        setPostulated(false);
    } catch (error) {
    console.error("Failed to depostulate:", error);
    }


  };

  return { postulated, postulate, depostulate };
}