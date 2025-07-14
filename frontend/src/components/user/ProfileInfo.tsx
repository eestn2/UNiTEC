/**
 * @file ProfileInfo.tsx
 * @description User profile information display component with responsive layout.
 * Shows user details, tags, status, languages and provides options to edit profile, 
 * change password and logout.
 * @author Haziel Magallanes
 * @date May 20, 2025
 */

import { useNavigate, useParams } from 'react-router-dom';
import AppWindow from '../UI/AppWindow';
import ActionButton from '../UI/ActionButton';
import reportIcon from '../../assets/icons/report.svg';
import Logo from '../UI/unitec/Logo';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { user as UserType } from '../../types/user';
import default_profile from '../../assets/defaults/profile-picture/1.svg';
import User from '../session/User';
import { getTranslates } from '../../global/function/getTranslates';
import getUserStatus from '../../global/function/getUserStatus';
import getUserType from '../../global/function/getUserType';
import TagList, { Tag } from '../UI/Tags/TagList';

// Add types for tags and languages
interface tag {
  name: string;
  level?: 'Básico' | 'Intermedio' | 'Avanzado';
}
interface Language {
  name: string;
  level?: 'Básico' | 'Intermedio' | 'Avanzado';
}

const ProfileInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isUserProfile = id === User.data.id.toString();
  const [userData, setUserData] = useState<UserType & {
    tags?: tag[];
    languages?: Language[];
  }>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) return;
    axios.get(`/user/user-info.php?id=${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          if(!res.data.data.user.portfolio.includes("http://") || !res.data.data.user.portfolio.includes("https://")) { 
            res.data.data.user.portfolio = `http://${res.data.data.user.portfolio}`; 
          }
          setUserData(res.data.data.user);
        }
      });
  }, [id]);

  // Example handlers
  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleChangePassword = () => {
    console.log("Change password clicked");
  };

const handleLogout = async () => {
  try {
    await axios.get('/session/logout.php', { withCredentials: true });
    window.location.href = `/`;
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
  const tags: Tag[] = userData?.tags || [
    { name: "Ejemplo 1", level: 'Básico' },
    { name: "Ejemplo 2", level: 'Básico' },
    { name: "Lorem", level: 'Básico' },
    { name: "Lorem", level: 'Básico' },
    { name: "Lorem", level: 'Básico' },
    { name: "Lorem", level: 'Básico' },
    { name: "Lorem", level: 'Básico' },
    { name: "Lorem", level: 'Básico' },
    { name: "Lorem", level: 'Básico' },
    { name: "Lorem", level: 'Básico' },
    { name: "Lorem", level: 'Básico' },
    { name: "Lorem", level: 'Básico' },
    { name: "Lorem", level: 'Básico' },
    { name: "Lorem", level: 'Básico' },
  ];
  // For demonstration, using static languages if userData is not available
  const isPortrait = window.innerHeight > window.innerWidth;
  const windowWidth = window.innerWidth > window.innerHeight ? 980 : 1280;

  // Get translate functions based on orientation
  const [translateX, translateY] = getTranslates(isPortrait);

  // State for selected language
/*   const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const selectedLanguageLevel = selectedLanguage?.level; */
  // State for selected tag
  const [selectedTag, setSelectedTag] = useState<tag | null>(null);
  if (!userData) {
    return <div>Cargando información del usuario...</div>;
  }
  return (
    <div>
      <Logo className='watermark'/>
      <AppWindow
        width={windowWidth}
        height={isPortrait ? undefined : 680}
        className='centered-w-wm flex-column'
        style={{
          padding: translateY(10),
          paddingBottom: translateY(10),
          minHeight: translateY(isPortrait ? 680 : 620),
          height: 'fit-content',
        }}
      >
        {/* Header */}
        <div className="flex-row-reversed" style={{width: "100%", height: translateY(60), textAlign: 'center', alignItems: 'center', justifyContent: 'space-between'}}>
          <h1 className='profile-title centered-x' style={{
              top: translateY(14),
              transform: 'translate(-50%, -50%)',
          }}>Detalles de la Cuenta</h1>
          <ActionButton
            style={{ 
              width: translateX(windowWidth - 880),
              backgroundColor: 'var(--danger)',
              paddingLeft: translateX(10),
              paddingRight: translateX(10),
              justifySelf: 'flex-end',
            }} 
            height={40}
            action={handleReport}>
              <img src={reportIcon} width={translateY(25)} height={translateY(23)}/><span style={{ fontWeight: 600 }}>Reportar</span>
          </ActionButton>
        </div>
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
            gridTemplateRows: `repeat(8, ${translateY(55)}px)`,
            gap: `${translateX(12)}px ${translateY(16)}px`,
            paddingTop: translateY(10),
            borderTop: '4px solid var(--delimiters)',
          }}
        >
          {/* Column 1: Profile Photo and Contact Info */}
          <div
            className='profile-photo-section input-field'
            style={{...( isPortrait ? { gridColumn: '1', gridRow: '1 / span 4', padding: translateY(20) } : { padding: translateY(20)}),
              color: '#113893',
            }}
          >
            <div className="user-photo-container" style={{ 
              width: translateX(isPortrait ? 200 : 160),
              height: translateX(isPortrait ? 200 : 160),
              borderRadius: '50%',
              border: `${translateX(4)}px solid #113893`,
              overflow: 'hidden',
            }}>
              <img src={userData?.profile_picture ? userData?.profile_picture : default_profile} alt={userData?.name} style={{width: '100%', height: '100%', 
                textAlign: 'center', 
                justifyContent: 'center', 
                alignItems: 'center', 
                display: 'flex',
                objectFit: 'cover',
                }} />
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
            <div style={{textWrap: "nowrap", overflowInline: "clip", overflowX: "hidden", maxWidth: translateX(isPortrait ? 340 : 300)}}>Portfolio web: <a href={userData?.portfolio}>{userData?.portfolio}</a></div>
          </div>
          {/* Column 2: Type, Status, Description */}
          <div
            className='user-labels-section profile-field input-field'
            style={isPortrait ? { gridColumn: '2', gridRow: '4' } : {}}
          >
            <div>Tipo de Usuario: {getUserType(userData?.type)}</div>
          </div>
          <div
            className='user-status-section profile-field input-field'
            style={isPortrait ? { gridColumn: '2', gridRow: '5' } : {}}
          >
            <div>Estado: {getUserStatus(userData?.status)}</div>
          </div>
          <div
            className='user-description-section input-field'
            style={{...(isPortrait ? { gridColumn: '2', gridRow: '6 / span 6' } : {}),
            wordBreak: "break-all",
            overflowWrap: "anywhere",
            overflowY: "auto",
          }}

          >
            <p>Descripción:<br/>{userData?.description}</p>
          </div>
          {/* Tags and Languages below portfolio/description in portrait */}
          <div
            className='user-skills-section input-field flex-row'
            style={{
                ...(isPortrait ? { gridColumn: '1', gridRow: '5 / span 3', height: translateY(240) } : {}),
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                color: 'rgba(0, 49, 123, 0.5)',
            }}
          >
            <TagList
              tags={tags}
              title="Etiquetas:"
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
              isPortrait={isPortrait}
              translateX={translateX}
              translateY={translateY}
            />
          </div>
          {/* Idiomas styled like Etiquetas */}
          <div
            className='user-languages-section input-field flex-row'
            style={{
                ...(isPortrait ? { gridColumn: '1', gridRow: '9 / span 3', height: translateY(240) } : {}),
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                color: 'rgba(0, 49, 123, 0.5)',
            }}
          >
            <TagList
              tags={userData?.languages || []}
              title="Idiomas:"
              selectedTag={null} // Languages are not selectable in this example
              isPortrait={isPortrait}
              translateX={translateX}
              translateY={translateY}
            />
          </div>
          {/* Buttons below tags/languages, 2 per column in portrait */}
          {!isUserProfile ? (<></>) : 
          isPortrait ? (
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
            <div className='user-button-section' style={{ fontSize: translateY(24) }}>
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