
import React, { useState } from 'react';
import axios from 'axios';
import './applicants.css';

interface UserCardProps {
  name?: string;
  profileImage?: string;
  onViewProfile?: () => void;
  status: number;
  offerId: number;
  userId: number;
}


const AplicantsCard: React.FC<UserCardProps> = ({
  name,
  profileImage,
  onViewProfile,
  status: initialStatus,
  offerId,
  userId,
}) => {
  const [status, setStatus] = useState<number>(initialStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
  const handleAccept = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${apiUrl}/enterprise/accept-application.php`, {
        user_id: userId,
        offer_id: offerId
      });
      if (response.status === 200 && response.data.status === "success") {
        setStatus(1);
      } else {
        setError(response.data.message || "No se pudo aceptar al postulante.");
      }
    } catch {
      setError("Ocurrió un error al aceptar al postulante.");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${apiUrl}/enterprise/reject-application.php`, {
        user_id: userId,
        application_id: offerId
      });
      if (response.status === 200 && response.data.status === "success") {
        setStatus(2); // Or remove card, or show as rejected
      } else {
        setError(response.data.message || "No se pudo rechazar al postulante.");
      }
    } catch {
      setError("Ocurrió un error al rechazar al postulante.");
    } finally {
      setLoading(false);
    }
  };

  const handleContact = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiUrl}/enterprise/get-user-email.php`, {
        params: { userId }
      });
      if (response.status !== 200 || response.data.status !== "success") {
        setError("No se pudo cargar el email");
        return;
      }
      const userEmail = response.data.data.email;
      const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(userEmail)}`;
      window.open(url, '_blank');
    } catch {
      setError("Ocurrió un error al crear el email");
    } finally {
      setLoading(false);
    }
  };

  if (status === 2) return null; // Optionally hide rejected

  const buttonText = status === 1 ? 'Contactar' : 'Aceptar';
  const buttonClass = status === 1 ? 'btn-orange' : 'btn-green';
  const buttonFunction = status === 1 ? handleContact : handleAccept;
  const buttonRechazarClass = status === 1 ? 'None' : '';

  return (
    <div className="user-card">
      <img
        src={profileImage || 'ruta/a/default.jpg'}
        alt="Perfil"
        className="user-image"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'ruta/a/default.jpg';
        }}
      />
      <div className="user-info">
        <div className="user-name">{name}</div>
        <div className="button-group">
          <button className="btn btn-yellow" onClick={onViewProfile}>Ver Perfil</button>
          <button className={`btn ${buttonClass}`} onClick={buttonFunction} disabled={loading}>
            {loading ? 'Procesando...' : buttonText}
          </button>
          <button className={`btn btn-red ${buttonRechazarClass}`} onClick={handleReject} disabled={loading}>Rechazar</button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default AplicantsCard;
