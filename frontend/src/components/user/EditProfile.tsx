import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppWindow from '../UI/AppWindow';
import ActionButton from '../UI/ActionButton';
import ProfilePicture from '../UI/user/ProfilePicture';
import InputField from '../UI/form/InputField';
import TextBox from '../UI/form/TextBox';
import SelectionField from '../UI/form/SelectionField';
import { user as UserType } from '../../types/user';
import User from '../session/User';
import { getTranslates } from '../../global/function/getTranslates';
import axios from 'axios';
import Logo from '../UI/unitec/Logo';

const STATUS_OPTIONS = [
    { value: '1', label: 'Estudiando' },
    { value: '2', label: 'Buscando trabajo' },
    { value: '3', label: 'Trabajando' },
    { value: '4', label: 'Egresado' },
];
const TYPE_OPTIONS = [
    { value: '1', label: 'Estudiante' },
    { value: '2', label: 'Egresado' },
];

const EditProfile: React.FC = () => {
    const [form, setForm] = useState<UserType | null>(null);
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
            const response = await axios.put('/user/edit-user.php', { ...form });
            console.log(response.data);
            if (response.data.status !== 'success') {
                throw new Error(response.data.message || 'Error al actualizar el perfil');
            } else {
                alert('Perfil actualizado');
                User.set({ ...User.data, ...form }); // Update User session data
                navigate(-1);
            }
        } catch {
            alert('Error al actualizar el perfil');
        }
    };

    if (!form) return null;

    const isPortrait = window.innerHeight > window.innerWidth;
    const windowWidth = window.innerWidth > window.innerHeight ? 980 : 1280;
    const [translateX, translateY] = getTranslates(isPortrait);

    return (
    <div>
    <Logo className='watermark' />
    <AppWindow
        width={windowWidth}
        height={isPortrait ? undefined : 680}
        className='centered-w-wm flex-column'
        style={{
            padding: translateY(10),
            paddingBottom: translateY(10),
            minHeight: translateY(isPortrait ? 680 : 620),
            rowGap: translateY(16),
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
        <div className="offer-fv-description-delimiter centered-x" style={{
            width: `${translateX(windowWidth - 30)}px`,
            top: translateY(68),
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
            gridTemplateRows: `repeat(8, ${translateY(55)}px)`,
            gap: `${translateX(12)}px ${translateY(16)}px`,
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
                <ProfilePicture userId={form.id} size={isPortrait ? 200 : 160} />
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
                <SelectionField name="type" options={TYPE_OPTIONS} onChange={handleChange} defaultValue={form.type} width={300} height={40} placeholder="Tipo de usuario" />
            </div>
            {/* Status */}
            <div
                className='user-status-section profile-field input-field'
                style={isPortrait ? { gridColumn: '2', gridRow: '5' } : {}}
            >
                <SelectionField name="status" options={STATUS_OPTIONS} onChange={handleChange} defaultValue={form.status} width={300} height={40} placeholder="Estado" />
            </div>
            {/* Description */}
            <TextBox 
            className='user-description-section input-field'
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
