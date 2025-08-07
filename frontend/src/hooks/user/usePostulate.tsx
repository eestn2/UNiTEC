import axios from 'axios';
import { useState } from 'react';

export  function usePostulate(offerID: number) {
  const [postulated, setPostulated] = useState<boolean>();
  axios.get('/user/postulated.php', {
    params: {
      offer_id: offerID,
    },
  })
    .then(response => {
      console.log(response);
      if (response.data.status === "success") {
        setPostulated(response.data.data.postulated);
      } else {
        console.error("Failed to check postulation status:", response.data.message);
      }
    })
    .catch(error => {
      console.error("An error occurred while checking postulation status:", error);
    });
  

  const postulate = async () => {
    if (postulated) return; 
    try {
      await axios.post('/user/postulate.php', {
        offer_id: offerID,
      });
      setPostulated(true);
    } catch (error) {
    console.error("Failed to postulate:", error);
    }
  };

  const depostulate = async () => {
    if (!postulated) return;
    try {
    await axios.delete('/user/depostulate.php', {
      data: {
      offerId: offerID, 
      }
    });
        setPostulated(false);
    } catch (error) {
    console.error("Failed to depostulate:", error);
    }


  };

  return { postulated, setPostulated, postulate, depostulate };
}