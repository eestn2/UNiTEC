/**
 * @file ProfileInfo.tsx
 * @description User profile information display component with responsive layout.
 * Shows user details, tags, status, languages and provides options to edit profile, 
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

// Add types for tags and languages
interface tag {
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
    tags?: tag[];
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

const handleLogout = async () => {
  try {
    const baseUrl = window.location.origin;
    await axios.get('/session/logout.php', { withCredentials: true });
    window.location.href = `${baseUrl}/UNiTEC/`;
  } catch (error) {
    alert("Error al cerrar sesión. Por favor, inténtalo de nuevo.");
    console.error("Logout failed:", error);
  }
};

  const handleDeleteAccount = () => {
    console.log("Delete account clicked");
  };

  const handleReport = () => {
    console.log("Report clicked");
  };

  // Group tags and languages by level
  const tagsByLevel = groupByLevel(userData?.tags || ["Ejemplo 1", "Ejemplo 2", "Lorem", "Lorem", "Lorem", "Lorem", "Lorem", "Lorem", "Lorem", "Lorem", "Lorem", "Lorem", "Lorem", "Lorem", ].map(tag => ({ name: tag, level: 'Básico' })));
  // For demonstration, using static tags if userData is not available
  const languagesByLevel = groupByLevel(userData?.languages || ["Español", "Inglés"].map(language => ({ name: language, level: 'Intermedio' })));
  // For demonstration, using static languages if userData is not available
  const isPortrait = window.innerHeight > window.innerWidth;
  const windowWidth = window.innerWidth > window.innerHeight ? 980 : 1120;

  // State for selected language
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const selectedLanguageLevel = selectedLanguage?.level;
  // State for selected tag
  const [selectedTag, setSelectedTag] = useState<tag | null>(null);
  const selectedTagLevel = selectedTag?.level;

  return (
    <div>
      <Logo className='watermark'/>
      <AppWindow
        width={windowWidth}
        height={isPortrait ? undefined : 680}
        className='centered-w-wm flex-column'
        style={{
          padding: TranslateFigmaCoords.translateFigmaY(10),
          paddingBottom: TranslateFigmaCoords.translateFigmaY(10),
          minHeight: TranslateFigmaCoords.translateFigmaY(isPortrait ? 680 : 620),
          rowGap: TranslateFigmaCoords.translateFigmaY(16),
          height: 'fit-content',
        }}
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
              <img src={reportIcon} width={TranslateFigmaCoords.translateFigmaY(25)} height={TranslateFigmaCoords.translateFigmaY(23)}/><span style={{ fontWeight: 600 }}>Reportar</span>
          </ActionButton>
        </div>
        <div className="offer-fv-description-delimiter centered-x" style={{
            width: `${TranslateFigmaCoords.translateFigmaX(windowWidth - 30)}px`,
            top: TranslateFigmaCoords.translateFigmaY(68),
        }} />
        {/* Responsive User Info Grid Container */}
        <div
          className='user-info-container'
          style={{
            ...( isPortrait ? 
                {
                  gridTemplateColumns: '1fr 1fr',
                }
              : {
                  gridTemplateColumns: `repeat(3, 1fr)`,
                }),
            display: 'grid',
            width: '100%',
            alignContent: 'center',
            gridTemplateRows: `repeat(8, ${TranslateFigmaCoords.translateFigmaY(55)}px)`,
            gap: `${TranslateFigmaCoords.translateFigmaX(12)}px ${TranslateFigmaCoords.translateFigmaY(16)}px`,
          }}
        >
          {/* Column 1: Profile Photo and Contact Info */}
          <div
            className='profile-photo-section input-field'
            style={{...( isPortrait ? { gridColumn: '1', gridRow: '1 / span 4', padding: TranslateFigmaCoords.translateFigmaY(20) } : { padding: TranslateFigmaCoords.translateFigmaY(20)}),
              color: '#113893',
            }}
          >
            <div className="user-photo-container" style={{ 
              width: TranslateFigmaCoords.translateFigmaX(isPortrait ? 200 : 160),
              height: TranslateFigmaCoords.translateFigmaX(isPortrait ? 200 : 160),
              borderRadius: '50%',
              border: `${TranslateFigmaCoords.translateFigmaX(4)}px solid #113893`,
              overflow: 'hidden',
            }}>
              <img src={default_profile} alt={userData?.name} style={{width: '100%', height: '100%'}} />
            </div>
            <h1>{userData?.name}</h1>
          </div>
          <div
            className='user-info-item profile-field input-field'
            style={isPortrait ? { gridColumn: '2', gridRow: '1' } : { gridRow: 6 }}
          >
            <div>Email: {userData?.email}</div>
          </div>
          <div
            className='user-info-item profile-field input-field'
            style={isPortrait ? { gridColumn: '2', gridRow: '2' } : { gridRow: 7 }}
          >
            <div>Localidad: {userData?.location}</div>
          </div>
          <div
            className='user-info-item profile-field input-field'
            style={isPortrait ? { gridColumn: '2', gridRow: '3' } : { gridRow: 8 }}
          >
            <div>Portfolio web: {userData?.portfolio}</div>
          </div>
          {/* Column 2: Type, Status, Description */}
          <div
            className='user-labels-section profile-field input-field'
            style={isPortrait ? { gridColumn: '2', gridRow: '4' } : {}}
          >
            <div>Tipo de Usuario: {userData?.type}</div>
          </div>
          <div
            className='user-status-section profile-field input-field'
            style={isPortrait ? { gridColumn: '2', gridRow: '5' } : {}}
          >
            <div>Estado: {userData?.status}</div>
          </div>
          <div
            className='user-description-section input-field'
            style={isPortrait ? { gridColumn: '2', gridRow: '6 / span 6' } : {}}
          >
            <p>Descripción:<br/>{userData?.description}</p>
          </div>
          {/* Tags and Languages below portfolio/description in portrait */}
          <div
            className='user-skills-section input-field flex-row'
            style={{
                ...(isPortrait ? { gridColumn: '1', gridRow: '5 / span 3', height: TranslateFigmaCoords.translateFigmaY(240) } : {}),
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                color: 'rgba(0, 49, 123, 0.5)',
            }}
          >
            <div className='flex-column' style={{
                width: TranslateFigmaCoords.translateFigmaY(isPortrait ? 140 : 130),
                borderRight: `${TranslateFigmaCoords.translateFigmaX(2)}px solid var(--delimiters)`,
                paddingTop: TranslateFigmaCoords.translateFigmaY(7),
                paddingLeft: TranslateFigmaCoords.translateFigmaY(7),
                paddingRight: TranslateFigmaCoords.translateFigmaY(16),
                gap: TranslateFigmaCoords.translateFigmaY(16),
                height: '96%',
            }}>
                <span style={{ fontWeight: 600, fontSize: TranslateFigmaCoords.translateFigmaY(22), color: 'rgba(0, 49, 123, 0.8)'}}>Etiquetas:</span>
                {LEVELS.map(level => (
                <label key={level} style={{ display: 'flex', alignItems: 'center', fontWeight: 500}}>
                    <input
                    type="checkbox"
                    checked={selectedTagLevel === level}
                    readOnly
                    style={{
                        accentColor: '#335A95',
                        width: TranslateFigmaCoords.translateFigmaX(18),
                        height: TranslateFigmaCoords.translateFigmaX(18),
                        pointerEvents: 'none',
                    }}
                    tabIndex={-1}
                    />
                    {level}
                </label>)
                )}
            </div>
            {/* Tags list on the right side */}
            <div style={{
                width: /* TranslateFigmaCoords.translateFigmaY(isPortrait ? 189 : 229), */ "100%",
                height: '96%',
                borderLeft: `${TranslateFigmaCoords.translateFigmaX(2)}px solid var(--delimiters)`,
                paddingTop: TranslateFigmaCoords.translateFigmaY(7),
                paddingLeft: TranslateFigmaCoords.translateFigmaY(7),
                borderTopRightRadius: TranslateFigmaCoords.translateFigmaX(8),
                borderBottomRightRadius: TranslateFigmaCoords.translateFigmaX(8),
                backgroundColor: '#AABAC9',
                overflowY: 'scroll',
                }}
                className='tag-display-profile'>
                {Object.values(tagsByLevel).flat().length === 0 ? (
                <span style={{ color: '#888' }}>Sin habilidades</span>
                ) : (
                Object.values(tagsByLevel).flat().map(tag => {
                    // Check if the tag is selected
                    const isSelected = selectedTag && selectedTag.name === tag.name && selectedTag.level === tag.level;
                    return (
                    <span
                    key={tag.name}
                    style={{ 
                        display: 'inline-block', 
                        margin: `${TranslateFigmaCoords.translateFigmaY(4)}px 0`, 
                        padding: `${TranslateFigmaCoords.translateFigmaY(4)}px ${TranslateFigmaCoords.translateFigmaY(8)}px`, 
                        backgroundColor: isSelected ? '#D6F5F9' : '#fff', 
                        borderRadius: TranslateFigmaCoords.translateFigmaX(20),
                        width: TranslateFigmaCoords.translateFigmaY(isPortrait ? 145 : 185),
                        textAlign: 'center',
                        cursor: 'pointer',
                        fontWeight: isSelected ? 600 : undefined,
                        color: isSelected ? '#113893' : undefined,
                        border: isSelected ? '2px solid #00B6D9' : 'none',
                        transition: 'background 0.15s, border 0.15s',
                    }}
                    onClick={() => {
                      console.log("Tag clicked:", tag);
                      setSelectedTag(isSelected ? tag : null)
                    }}
                    >
                    {tag.name}
                    </span>
                )}))}
            </div>
          </div>
          {/* Idiomas styled like Etiquetas */}
          <div
            className='user-languages-section profile-field input-field flex-row'
            style={{
                ...(isPortrait ? { gridColumn: '1', gridRow: '9 / span 3', height: TranslateFigmaCoords.translateFigmaY(240) } : {}),
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                color: 'rgba(0, 49, 123, 0.5)',
            }}
          >
            {/* Languages list on the right side */}

          </div>
          {/* Buttons below tags/languages, 2 per column in portrait */}
          {isPortrait ? (
            <div
              className='user-button-section'
              style={{
                gridColumn: '1 / span 2',
                gridRow: '12',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                marginTop: 12,
              }}
            >
              <ActionButton height={60} action={handleEditProfile} style={{ gridColumn: 1 }}>
                Editar Perfil
              </ActionButton>
              <ActionButton height={60} action={handleChangePassword} style={{ backgroundColor: '#DFB529', gridColumn: 2 }}>
                Cambiar Contraseña
              </ActionButton>
              <ActionButton height={60} action={handleLogout} style={{ backgroundColor: '#F0823D', gridColumn: 1 }}>
                Cerrar Sesión
              </ActionButton>
              <ActionButton height={60} action={handleDeleteAccount} style={{ backgroundColor: 'var(--danger)', color: 'white', gridColumn: 2 }}>
                Eliminar Cuenta
              </ActionButton>
            </div>
          ) : (
            <div className='user-button-section' style={{ fontSize: TranslateFigmaCoords.translateFigmaY(24) }}>
              <ActionButton height={60} action={handleEditProfile}>
                Editar Perfil
              </ActionButton>
              <ActionButton height={60} action={handleChangePassword} style={{ backgroundColor: '#DFB529' }}>
                Cambiar Contraseña
              </ActionButton>
              <ActionButton height={60} action={handleLogout} style={{ backgroundColor: '#F0823D' }}>
                Cerrar Sesión
              </ActionButton>
              <ActionButton height={60} action={handleDeleteAccount} style={{ backgroundColor: 'var(--danger)', color: 'white' }}>
                Eliminar Cuenta
              </ActionButton>
            </div>
          )}
        </div>
      </AppWindow>
    </div>
  );
};

export default ProfileInfo;