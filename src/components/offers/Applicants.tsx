import React from 'react';
import './estilos.css';

interface UserCardProps {
  name: string;
  profileImage: string;
  onViewProfile: () => void;
  onAccept: () => void;
  onContact: () => void;
  onReject: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  profileImage,
  onViewProfile,
  onAccept,
  onContact,
  onReject,
}) => {
  return (
    <div className="user-card">
      <img src={profileImage} alt="Perfil" className="user-image" />
      <div className='Column'>
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


export default UserCard;
