/**
 * @file ProfileInfo.tsx
 * @description User profile information display component with responsive layout.
 * Shows user details, skills, status, languages and provides options to edit profile, 
 * change password and logout.
 * @author Haziel Magallanes
 * @date May 20, 2025
 */

import { useParams } from 'react-router-dom';
import AppWindow from '../UI/AppWindow';
import ActionButton from '../UI/ActionButton';
import TranslateFigmaCoords from '../../global/function/TranslateFigmaCoords';
import { useWindowSize } from '../../hooks/responsive/useWindowSize';
import reportIcon from '../../assets/icons/report.svg';
import Logo from '../UI/unitec/Logo';
import axios from 'axios';
import { useState, useEffect } from 'react';


const ProfileInfo: React.FC = () => {
  // Re-render on window resize
  const windowSize = useWindowSize();
  console.log("Window size:", windowSize);
  
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`/user/user-info.php?id=${id}`)
      .then(res => {
        if (res.data.status === "success") {
          setUserData(res.data.data.user);
        }
      });
  }, [id]);

  // Example handlers
  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  const handleChangePassword = () => {
    console.log("Change password clicked");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const handleDeleteAccount = () => {
    console.log("Delete account clicked");
  };

  const handleReport = () => {
    console.log("Report clicked");
  };

  return (
    <div>
        <Logo className='watermark'/>
        <AppWindow
          width={980}
          height={680}
          className='centered-w-wm flex-column'
        >
            {/* Header */}
            <h1 className='profile-title centered-x' style={{
                top: TranslateFigmaCoords.translateFigmaY(14),
                transform: 'translate(-50%, -50%)',
            }}>Detalles de la Cuenta</h1>
            <ActionButton
            style={{ 
                position: 'absolute', 
                top: TranslateFigmaCoords.translateFigmaY(12), 
                right: TranslateFigmaCoords.translateFigmaX(68),
                transform: 'translate(50%, 0%)',
                backgroundColor: 'var(--danger)',
                paddingLeft: TranslateFigmaCoords.translateFigmaX(10),
                paddingRight: TranslateFigmaCoords.translateFigmaX(10),
             }} 
                height={40}
                action={handleReport}>
                    <img src={reportIcon} width={TranslateFigmaCoords.translateFigmaX(25)} height={TranslateFigmaCoords.translateFigmaY(23)}/><span style={{
                        fontWeight: 600,
                    }}>Reportar</span>
            </ActionButton>
            <div className="offer-fv-description-delimiter centered-x" style={{
                width: `${TranslateFigmaCoords.translateFigmaX(950)}px`,
                top: TranslateFigmaCoords.translateFigmaY(68),
            }} />
            {/* User Info Grid Container */}
            <div className='user-info-container' style={{
                width: `${TranslateFigmaCoords.translateFigmaX(952)}px`,
                position: 'absolute',
                top: TranslateFigmaCoords.translateFigmaY(85),
                left: TranslateFigmaCoords.translateFigmaX(15),
            }}>
                {/* Column 1: Profile Photo and Contact Info */}
                <div className='profile-photo-section input-field'>
                    <div className="user-photo-container" style={{ 
                        width: TranslateFigmaCoords.translateFigmaX(200),
                        height: TranslateFigmaCoords.translateFigmaX(200),
                        borderRadius: '50%',
                        overflow: 'hidden',
                        marginBottom: TranslateFigmaCoords.translateFigmaY(10)
                    }}>
                        {/* Profile image here */}
                        <img src="path-to-profile-image" alt={userData?.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    </div>
                    <h2>{userData?.name}</h2>
                </div>
                
                <div className='user-info-item profile-field input-field' style={{gridRow: 6}}>
                    <div>Email: {userData?.email}</div>
                </div>
                
                <div className='user-info-item profile-field input-field' style={{gridRow: 7}}>
                    <div>Localidad: {userData?.location}</div>
                </div>
                
                <div className='user-info-item profile-field input-field' style={{gridRow: 8}}>
                    <div>Portfolio web: {userData?.portfolio}</div>
                </div>
                
                {/* Column 2: Type, Status, Skills, Languages */}
                <div className='user-labels-section profile-field  input-field'>
                    <div>Tipo de Usuario: {userData?.userType}</div>
                </div>
                
                <div className='user-status-section profile-field  input-field'>
                    <div>Estado: {userData?.status}</div>
                </div>
                
                <div className='user-skills-section' >
                    <div className='flex-column' style={{padding: TranslateFigmaCoords.translateFigmaX(13)}}>
                        <p>Etiquetas:</p>

                    </div>

                    <div className="skills-list">
                        {userData?.skills?.map((skill, index) => (
                            <div key={index} className="skill-tag">
                                {skill.name}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className='user-languages-section'>
                    <h3>Idiomas:</h3>
                    <div className="languages-list">
                        {userData?.languages?.map((language, index) => (
                            <div key={index} className="language-tag">
                                {language.name}
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Column 3: Description and Action Buttons */}
                <div className='user-description-section input-field'>
                    <p>Descripción:<br/>
                    {userData?.description}</p>
                </div>
                <div className='user-button-section' style={{fontSize: TranslateFigmaCoords.translateFigmaY(24)}}>
                    <ActionButton height={60} action={handleEditProfile}>
                        Editar Perfil
                    </ActionButton>
                    <ActionButton height={60} action={handleChangePassword} style={{backgroundColor: '#DFB529'}}>
                        Cambiar Contraseña
                    </ActionButton>
                    <ActionButton height={60} action={handleLogout} style={{backgroundColor: '#F0823D'}}>
                        Cerrar Sesión
                    </ActionButton>
                    <ActionButton 
                        height={60} 
                        action={handleDeleteAccount}
                        style={{backgroundColor: 'var(--danger)', color: 'white'}}>
                        Eliminar Cuenta
                    </ActionButton>
                </div>
            </div>
        </AppWindow>
    </div>
  );
};

export default ProfileInfo;