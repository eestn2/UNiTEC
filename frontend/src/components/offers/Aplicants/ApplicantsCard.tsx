import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../session/User';
import axios from 'axios';
import './applicants.css';
import defaultProfileImage from '../../../assets/defaults/profile-picture/1.svg';
import defaultError from '../../../global/messages/defaultError';

interface UserCardProps {
  name?: string;
  profileImage?: string;
  onViewProfile?: () => void;
  status: number;
  externalStatusChanger: (newStatus: number) => void;
  offerId: number;
  userId: number;
}


const AplicantsCard: React.FC<UserCardProps> = ({
  name,
  profileImage,
  onViewProfile,
  status: initialStatus,
  externalStatusChanger,
  offerId,
  userId,
}) => {
  const [status, setStatus] = useState<number>(initialStatus);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAccept = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put('/enterprise/accept-application.php', {
        user_id: userId,
        offer_id: offerId
      });
      if (response) {
        setStatus(1);
        externalStatusChanger(1); // Notify parent component of status change
      }
    } catch {
      if (axios.isAxiosError(error)) return setError(error.response?.data?.message || defaultError);
      setError(defaultError);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put('/enterprise/reject-application.php', {
        user_id: userId,
        application_id: offerId
      });
      if (response) {
        setStatus(2);
        externalStatusChanger(2); // Notify parent component of status change
      }
    } catch {
      if (axios.isAxiosError(error)) return setError(error.response?.data?.message || defaultError);
      setError(defaultError);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/enterprise/get-user-email.php', { params: { userId } });
      if (response) {
        const userEmail = response.data.data.email;
        const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(userEmail)}`;
        window.open(url, '_blank');
      }
    } catch {
      if (axios.isAxiosError(error)) return alert(error.response?.data?.message || defaultError);
      alert(defaultError);
    } finally {
      setLoading(false);
    }
  };
  
  const buttonText = status === 1 ? 'Contactar' : 'Aceptar';
  const buttonClass = status === 1 ? 'btn-orange' : 'btn-green';
  const buttonFunction = status === 1 ? handleContact : handleAccept;
  const buttonRechazarClass = status === 1 ? 'None' : '';

  return (
    <div className="user-card">
      <img
        src={profileImage || defaultProfileImage}
        alt="Perfil"
        className="user-image"
        onError={(e) => {
          (e.target as HTMLImageElement).src = defaultProfileImage;
        }}
        style={{ backgroundColor: '#ffff'}}
      />
      <div className="user-info">
        <div className="user-name">{name}{status === 2 ? ' (Rechazado).' : ''}</div>
        <div className="button-group">
          <button className="btn btn-yellow" onClick={onViewProfile}>Ver Perfil</button>
          <button className={`btn ${buttonClass}`} style={status === 2 ? {display: 'none'} : {}} onClick={buttonFunction} disabled={loading}>
            {loading ? 'Procesando...' : buttonText}
          </button>
          <button className={`btn btn-red ${buttonRechazarClass}`} style={status === 2 ? {display: 'none'} : {}}  onClick={handleReject} disabled={loading}>Rechazar</button>
          {status === 1 && (
            <button
              className="btn"
              style={{ backgroundColor: '#3a3a7c', color: '#fff', borderRadius: '9999px', fontWeight: 600, fontSize: 'inherit', width: '100px', cursor: 'pointer' }}
              onClick={() => {
                navigate(`/review/${userId}/${encodeURIComponent(name || '')}/${User.data.id}/${encodeURIComponent(User.data.name)}`);
              }}
            >
              Reseñar
            </button>
          )}
        </div>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default AplicantsCard;
