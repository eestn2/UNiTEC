
import axios from 'axios';
import { useState, useEffect } from 'react';
import defaultError from '../../global/messages/defaultError';

export function usePostulate(offerID: number) {
  const [postulated, setPostulated] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const isPostulated = async () => {
    try {
      const response = await axios.get('/user/postulated.php', { params: { offer_id: offerID } });
      if (response) return response.data.data.postulated;
    } catch (error) {
      if (axios.isAxiosError(error)) return alert(error.response?.data?.message || defaultError);
      alert(defaultError);
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
      await axios.post('/user/postulate.php', { offer_id: offerID });
      setPostulated(true);
    } catch (error) {
      if (axios.isAxiosError(error)) return alert(error.response?.data?.message || defaultError);
      alert(defaultError);
    }
  };

  const depostulate = async () => {
    if (!postulated) return;
    try {
      await axios.delete('/user/depostulate.php', { data: { offer_id: offerID } });
      setPostulated(false);
    } catch (error) {
      if (axios.isAxiosError(error)) return alert(error.response?.data?.message || defaultError);
      alert(defaultError);
    }
  };

  return { postulated, setPostulated, postulate, depostulate, isPostulated, loading };
}