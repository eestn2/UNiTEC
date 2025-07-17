import React from 'react';
import './applicants.css'; // Cambié el nombre para claridad

interface UserCardProps {
  name?: string;
  profileImage?: string;
  onViewProfile?: () => void;
  onAccept?: () => void;
  onContact?: () => void;
  onReject?: () => void;
}

const AplicantsCard: React.FC<UserCardProps> = ({
  name,
  profileImage,
  onViewProfile,
  onAccept,
  onContact,
  onReject,
}) => {
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
          <button className="btn btn-green" onClick={onAccept}>Aceptar</button>
          <button className="btn btn-orange" onClick={onContact}>Contactar</button>
          <button className="btn btn-red" onClick={onReject}>Rechazar</button>
        </div>
      </div>
    </div>
  );
}; 
export default AplicantsCard;
