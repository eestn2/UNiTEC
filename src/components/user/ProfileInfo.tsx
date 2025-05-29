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
import { user as UserType } from '../../types/user';
import default_profile from '../../assets/defaults/profile-picture/1.svg';

// Add types for skills and languages
interface Skill {
  name: string;
  level?: 'Básico' | 'Intermedio' | 'Avanzado';
}
interface Language {
  name: string;
  level?: 'Básico' | 'Intermedio' | 'Avanzado';
}

const LEVELS = ['Básico', 'Intermedio', 'Avanzado'] as const;

type Level = typeof LEVELS[number];

const groupByLevel = <T extends { level?: Level }>(items: T[]): Record<Level, T[]> => {
  return LEVELS.reduce((acc, level) => {
    acc[level] = items.filter(item => item.level === level);
    return acc;
  }, {} as Record<Level, T[]>);
};

const ProfileInfo: React.FC = () => {
  // Re-render on window resize
  const windowSize = useWindowSize();
  console.log("Window size:", windowSize);
  
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<UserType & {
    skills?: Skill[];
    languages?: Language[];
  } | null>(null);

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

  // Group skills and languages by level
  const skillsByLevel = groupByLevel(userData?.skills || []);
  const languagesByLevel = groupByLevel(userData?.languages || []);
  const windowWidth = window.innerWidth > window.innerHeight ? 980 : 1120;
  return (
    
    <div>
        <Logo className='watermark'/>
        <AppWindow
          width={windowWidth}
          height={680}
          className='centered-w-wm flex-column'
          style={{padding: TranslateFigmaCoords.translateFigmaX(10), paddingBottom: TranslateFigmaCoords.translateFigmaY(0), height: 'fit-content', minHeight: TranslateFigmaCoords.translateFigmaY(680), rowGap: TranslateFigmaCoords.translateFigmaY(16)}}
        >
            {/* Header */}
            <div className="flex-row-reversed" style={{width: "100%", height: TranslateFigmaCoords.translateFigmaY(60), textAlign: 'center', alignItems: 'center', justifyContent: 'space-between'}}>
            <h1 className='profile-title centered-x' style={{
                top: TranslateFigmaCoords.translateFigmaY(14),
                transform: 'translate(-50%, -50%)',
            }}>Detalles de la Cuenta</h1>
                <ActionButton
                style={{ 
                    width: TranslateFigmaCoords.translateFigmaX(windowWidth - 880),
                    backgroundColor: 'var(--danger)',
                    paddingLeft: TranslateFigmaCoords.translateFigmaX(10),
                    paddingRight: TranslateFigmaCoords.translateFigmaX(10),
                    justifySelf: 'flex-end',
                }} 
                    height={40}
                    action={handleReport}>
                        <img src={reportIcon} width={TranslateFigmaCoords.translateFigmaX(25)} height={TranslateFigmaCoords.translateFigmaY(23)}/><span style={{
                            fontWeight: 600,
                        }}>Reportar</span>
                </ActionButton>
            </div>
            <div className="offer-fv-description-delimiter centered-x" style={{
                width: `${TranslateFigmaCoords.translateFigmaX(windowWidth - 30)}px`,
                top: TranslateFigmaCoords.translateFigmaY(68),
            }} />
            
            {/* User Info Grid Container */}
            <div className='user-info-container' style={{
                width: `width: 100%`,
                alignContent: 'center',
            }}>
                {/* Column 1: Profile Photo and Contact Info */}
                <div className='profile-photo-section input-field' style={{padding: TranslateFigmaCoords.translateFigmaY(20)}}>
                    <div className="user-photo-container" style={{ 
                        width: TranslateFigmaCoords.translateFigmaX(200),
                        height: TranslateFigmaCoords.translateFigmaX(200),
                        borderRadius: '50%',
                        overflow: 'hidden',
                    }}>
                        {/* Profile image here */}
                        <img src={default_profile} alt={userData?.name} style={{width: '100%', height: '100%'}} />
                    </div>
                    <h1>{userData?.name}</h1>
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
                    <div>Tipo de Usuario: {userData?.type}</div>
                </div>
                
                <div className='user-status-section profile-field  input-field'>  
                    <div>Estado: {userData?.status}</div>
                </div>
                
                {/* Etiquetas (Skills) Section */}
                <div className='user-skills-section input-field'>
                    <h2>Habilidades</h2>
                    {Object.entries(skillsByLevel).map(([level, skills]) => (
                        skills.length > 0 && (
                            <div key={level} className='skill-level-group'>
                                <h3>{level}</h3>
                                <ul>
                                    {skills.map(skill => (
                                        <li key={skill.name}>{skill.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    ))}
                </div>
                {/* Idiomas (Languages) Section */}
                <div className='user-languages-section profile-field input-field'>
                    <h2>Idiomas</h2>
                    {Object.entries(languagesByLevel).map(([level, languages]) => (
                        languages.length > 0 && (
                            <div key={level} className='language-level-group'>
                                <h3>{level}</h3>
                                <ul>
                                    {languages.map(language => (
                                        <li key={language.name}>{language.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    ))}
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