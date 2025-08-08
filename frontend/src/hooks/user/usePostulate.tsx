
import axios from 'axios';
import { useState, useEffect } from 'react';

export function usePostulate(offerID: number) {
  const [postulated, setPostulated] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const isPostulated = async () => {
    try {
      const response = await axios.get('/user/postulated.php', {
        params: {
          offer_id: offerID,
        },
      });
      if (response.data.status === "success") {
        return response.data.data.postulated;
      } else {
        console.error("Failed to check postulation status:", response.data.message);
        return undefined;
      }
    } catch (error) {
      console.error("An error occurred while checking postulation status:", error);
      return undefined;
    }
  };

  useEffect(() => {
    setLoading(true);
    isPostulated().then((result) => {
      setPostulated(result);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerID]);
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
        },
      });
      setPostulated(false);
    } catch (error) {
      console.error("Failed to depostulate:", error);
    }
  };

  return { postulated, setPostulated, postulate, depostulate, isPostulated, loading };
}