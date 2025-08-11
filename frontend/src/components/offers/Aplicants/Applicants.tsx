import React from 'react';
import './applicants.css';

interface UserCardProps {
  name?: string;
  profileImage?: string;
  onViewProfile?: () => void;
  onAccept?: () => void;
  onContact?: () => void;
  onReject?: () => void;
  status: boolean; // NUEVA prop
}

const AplicantsCard: React.FC<UserCardProps> = ({
  name,
  profileImage,
  onViewProfile,
  onAccept,
  onContact,
  onReject,
  status, // la recibimos acá
}) => {
  // Lógica condicional según el estado
  const buttonText = status ? 'Contactar' : 'Aceptar';
  const buttonClass = status ? 'btn-orange' : 'btn-green'
  const buttonFunction = status ? onContact : onAccept;
  const buttonRechazarClass = status ? 'None' :'';
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
          <button className={`btn ${buttonClass}`} onClick={buttonFunction}>
            {buttonText}
          </button> 
          <button className={`btn btn-red ${buttonRechazarClass}`} onClick={onReject}>Rechazar</button>
        </div>
      </div>
    </div>
  );
}; 

export default AplicantsCard;
