import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AppWindow from '../UI/AppWindow';
import ActionButton from '../UI/ActionButton';
import InputField from '../UI/form/InputField';
import TextBox from '../UI/form/TextBox';
import SelectionField from '../UI/form/SelectionField';
import { UserStatusEnum, user as UserType, UserTypeEnum } from '../../types/user';
import User from '../session/User';
import { getTranslates } from '../../global/function/getTranslates';
import axios from 'axios';
import Logo from '../UI/unitec/Logo';
import upload_picture from '../../assets/icons/upload-picture.svg';
import edit_profile from '../../assets/icons/edit-picture.svg';


import '../../styles/profile-info.css';
import getUserStatus from '../../global/function/getUserStatus';
import getUserType from '../../global/function/getUserType';

const STATUS_OPTIONS = [
    { value: UserStatusEnum.Estudiando, label: getUserStatus(UserStatusEnum.Estudiando) },
    { value: UserStatusEnum.Buscando, label: getUserStatus(UserStatusEnum.Buscando) },
    { value: UserStatusEnum.Trabajando, label: getUserStatus(UserStatusEnum.Trabajando) },
    { value: UserStatusEnum.Egresado, label: getUserStatus(UserStatusEnum.Egresado) },
];
const TYPE_OPTIONS = [
    { value: UserTypeEnum.Estudiante, label: getUserType(UserTypeEnum.Estudiante) },
    { value: UserTypeEnum.Egresado, label: getUserType(UserTypeEnum.Egresado) },
];

const EditProfile: React.FC = () => {
    const [form, setForm] = useState<UserType | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newPicturePath, setNewPicturePath] = useState<string | null>(null);
    const [newPicture, setNewPicture] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setForm(User.data as UserType);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!form) return;
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const payload = { ...form };
            // If not empty, use newPicturePath, else just use the existing profile picture
            payload.profile_picture = newPicturePath ? newPicturePath : form?.profile_picture;
            const response = await axios.put('/user/edit-user.php', payload);
            console.log(response.data);
            if (response.data.status !== 'success') {
                throw new Error(response.data.message || 'Error al actualizar el perfil');
            } else {
                alert('Perfil actualizado');
                User.set({ ...User.data, ...payload }); // Update User session data
                setNewPicture(null);
                setNewPicturePath(null);
                navigate(-1);
            }
        } catch {
            alert('Error al actualizar el perfil');
        }
    };

    // Handle profile picture upload
    const handlePictureClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handlePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !form) return;
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            alert('Solo se permiten imágenes JPG o PNG');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert('La imagen es demasiado grande (máx 2MB)');
            return;
        }
        setUploading(true);
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const base64 = reader.result as string;
                setNewPicture(base64); // Preview
                const response = await axios.post('/user/edit-pfp.php', {
                    profile_picture: base64,
                    filename: file.name,
                    type: file.type,
                });
                if (response.data.status === 'success') {
                    setNewPicturePath(response.data.data.path); // Store path for form
                    console.log('Foto de perfil subida:', response.data.data.path);
                    alert('Foto de perfil subida, recuerda guardar los cambios');
                } else {
                    alert(response.data.message || 'Error al subir la foto');
                    setNewPicture(null);
                    setNewPicturePath(null);
                }
            } catch {
                alert('Error al subir la foto');
                setNewPicture(null);
                setNewPicturePath(null);
            } finally {
                setUploading(false);
            }
        };
        reader.readAsDataURL(file);
    };

    if (!form) return null;

    const isPortrait = window.innerHeight > window.innerWidth;
    const windowWidth = window.innerWidth > window.innerHeight ? 980 : 1280;
    const [translateX, translateY] = getTranslates(isPortrait);

    return (
    <div>
    <Logo className='watermark' />
    <input
        type="file"
        accept="image/jpeg,image/png"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handlePictureChange}
    />
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
          }}>Editar detalles de Cuenta</h1>
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
            paddingTop: translateY(10),
            gridTemplateRows: `repeat(8, ${translateY(55)}px)`,
            gap: `${translateX(12)}px ${translateY(16)}px`,
            borderTop: '4px solid var(--delimiters)',
          }}
        >
            {/* Profile Photo */}
            <div
                className='profile-photo-section input-field'
                style={{
                    ...(isPortrait ? { gridColumn: '1', gridRow: '1 / span 4', padding: translateY(20) } : { padding: translateY(20) }),
                    color: '#113893',
                }}
            >
                <div className="user-photo-container edit" style={{ 
                width: translateX(isPortrait ? 200 : 160),
                height: translateX(isPortrait ? 200 : 160),
                borderRadius: '50%',
                border: `${translateX(4)}px solid #113893`,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                <img src={newPicture ? newPicture : (form?.profile_picture ? form?.profile_picture : undefined)} style={{width: '100%', height: '100%', 
                    backgroundColor: '#F0EFF5',
                    }} />
                    {form?.profile_picture || newPicture ? (
                        <img className = 'edit-picture-overlay' src={edit_profile} onClick={handlePictureClick} style={{opacity: uploading ? 0.5 : undefined}}/>
                    ) : (
                        <img className= 'edit-picture-overlay' src={upload_picture} onClick={handlePictureClick} style={{opacity: uploading ? 0.5 : undefined}}/>
                    )}
                </div>
                <h1>{form.name}</h1>
            </div>
            {/* Email */}
            <div
                className='user-info-item profile-field input-field'
                style={{...(isPortrait ? { gridColumn: '2', gridRow: '1' } : { gridRow: 6 }), height: 'auto'}}
            >
                <div>Email: {form?.email}</div>
            </div>
            {/* Location */}
            <InputField 
            className='user-info-item'
            style={isPortrait ? { gridColumn: '2', gridRow: '2' } : { gridRow: 7 }}
            type="text" name="location" placeholder="Localidad" value={form.location} onChange={handleChange} width={300} height={'auto'} />
            {/* Portfolio */}
            <InputField 
            className='user-info-item'
            style={isPortrait ? { gridColumn: '2', gridRow: '3' } : { gridRow: 8 }}
            type="text" name="portfolio" placeholder="Portfolio web" value={form.portfolio} onChange={handleChange} width={300} height={'auto'} />
            {/* Type */}
            <div
                className='user-labels-section profile-field input-field'
                style={isPortrait ? { gridColumn: '2', gridRow: '4' } : {}}
            >
                <SelectionField name="type" options={TYPE_OPTIONS} onChange={handleChange} defaultValue={getUserType(form.type)} width={300} height={40} placeholder="Tipo de usuario" />
            </div>
            {/* Status */}
            <div
                className='user-status-section profile-field input-field'
                style={isPortrait ? { gridColumn: '2', gridRow: '5' } : {}}
            >
                <SelectionField name="status" options={STATUS_OPTIONS} onChange={handleChange} defaultValue={getUserStatus(form.status)} width={300} height={40} placeholder="Estado" />
            </div>
            {/* Description */}
            <TextBox 
            className='user-description-section edit input-field'
            style={isPortrait ? { gridColumn: '2', gridRow: '6 / span 9' } : {}}
            name="description" placeholder="Descripción" onChange={handleChange} width={300} height={"100%"} value={form.description} />
            {/* Tags and Languages (editable) */}
            <div
                className='user-skills-section input-field flex-row'
                style={{
                    ...(isPortrait ? { gridColumn: '1', gridRow: '5 / span 3', height: translateY(240) } : {}),
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    color: 'rgba(0, 49, 123, 0.5)',
                }}
            >
            </div>
            {/* Languages (placeholder for now) */}
            <div
                className='user-languages-section profile-field input-field flex-row'
                style={{
                    ...(isPortrait ? { gridColumn: '1', gridRow: '9 / span 3', height: translateY(240) } : {}),
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    color: 'rgba(0, 49, 123, 0.5)',
                }}
            >
                {/* Languages selection can go here */}
            </div>
            {/* Save/Cancel Buttons */}
            <div className='user-button-section' style={{ 
                ...(isPortrait ? { gridColumn: '1 / span 2', gridRow: '6 / span 2' } : { gridRow: '7 / span 2' }),
                fontSize: translateY(24) 
            }}>
                <ActionButton height={60} action={handleSave}>
                    Aceptar Cambios
                </ActionButton>
                <ActionButton height={60} action={() => {
                    navigate(-1);
                }} style={{ backgroundColor: 'var(--danger)'}}>
                    Cancelar
                </ActionButton>
            </div>
        </div>
    </AppWindow>
    </div>
    );
};

export default EditProfile;
