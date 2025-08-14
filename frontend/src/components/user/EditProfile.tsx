import { useState, useEffect, useRef } from 'react';
import LabelsSelection from '../UI/form/LabelsSelectionEdit';
import Tag2 from '../UI/Tag2';
import { useNavigate } from 'react-router-dom';
import AppWindow from '../UI/AppWindow';
import ActionButton from '../UI/ActionButton';
import InputField from '../UI/form/InputField';
import TextBox from '../UI/form/TextBox';
import SelectionField from '../UI/form/SelectionField';
import { UserStatusEnum, user as UserType, UserTypeEnum } from '../../types/user';
// --- Etiquetas y niveles ---
type EtiquetaSeleccionada = {
    etiqueta: string;
    bloque: string;
    valorCheckbox: string;
};

function getIdsAndLevels(
    array1: string[],
    array2: EtiquetaSeleccionada[],
    option: 1 | 2
): { ids: number[]; levels: number[] } {
    const bloqueFiltrado = option === 1 ? "Etiquetas" : "Idiomas";
    const nivelMap: Record<string, number> = {
        "Básico": 1,
        "Intermedio": 2,
        "Avanzado": 3,
    };
    const ids: number[] = [];
    const levels: number[] = [];
    for (const etiqueta of array1) {
        const match = array2.find(
            (item) => item.bloque === bloqueFiltrado && item.etiqueta === etiqueta
        );
        if (!match) continue;
        const index = array1.indexOf(etiqueta);
        ids.push(index + 1);
        const nivel = nivelMap[match.valorCheckbox];
        levels.push(nivel ?? 0);
    }
    return { ids, levels };
}
import User from '../session/User';
import { getTranslates } from '../../global/function/getTranslates';
import axios from 'axios';
import Logo from '../UI/unitec/Logo';
import upload_picture from '../../assets/icons/upload-picture.svg';
import edit_profile from '../../assets/icons/edit-picture.svg';


import '../../styles/profile-info.css';
import getUserStatus from '../../global/function/getUserStatus';
import getUserType from '../../global/function/getUserType';

const STATUS_OPTIONS = Object.values(UserStatusEnum)
    .filter((v) => typeof v === "number")
    .map((value) => ({
        value: value as UserStatusEnum,
        label: getUserStatus(value as UserStatusEnum),
    }));
const TYPE_OPTIONS = [
    { value: UserTypeEnum.Estudiante, label: getUserType(UserTypeEnum.Estudiante) },
    { value: UserTypeEnum.Egresado, label: getUserType(UserTypeEnum.Egresado) },
];

type FormType = UserType & {
    languages?: number[];
    tags?: number[];
    languages_levels?: number[];
    tags_levels?: number[];
};

const EditProfile: React.FC = () => {
    const [form, setForm] = useState<FormType | null>(null);
    // Etiquetas y lenguajes
    type LoadedTag = { id: number; level: number };
    type LoadedLanguage = { id: number; level: number };
    type Tag = { id: number; name: string };
    type Language = { id: number; name: string };
    const [labelsFromSelection, setLabelsFromSelection] = useState<EtiquetaSeleccionada[]>([]);
    const [Languages, setLanguages] = useState<string[]>([]);
    const [Tags, setTags] = useState<string[]>([]);
    const [filtroBloque, setFiltroBloque] = useState('Etiquetas');
    // Cargar idiomas y etiquetas
    useEffect(() => {
        handleLoadLabels();
    }, []);
        useEffect(() => {
        console.log(labelsFromSelection);
    }, [labelsFromSelection]);

const handleLoadLabels = async () => {
    try {

        const response = await axios.get('/user/get-languages-and-tags-edit.php');
        if (response.data.status !== 'success') {
            console.error('Error al cargar etiquetas y lenguajes:', response.data.message);
            alert('Error al cargar etiquetas y lenguajes');
            return;
        }
        console.log('Etiquetas y lenguajes cargados:', response.data.data.tags);
        const tags: Tag[] = response.data.data.tags || [];
        const languages: Language[] = response.data.data.languages || [];

        const loadedTagsRaw = response.data.data.loadedTags || []; 
        const loadedLanguagesRaw = response.data.data.loadedLanguages || [];

        // Convertir a la forma {id, level} que espera el frontend
        const loadedTags: LoadedTag[] = loadedTagsRaw.map((t: { tag_id: number | string; level: number | string }) => ({
            id: Number(t.tag_id),
            level: Number(t.level)
        }));

        const loadedLanguages: LoadedLanguage[] = loadedLanguagesRaw.map((l: { language_id: number | string; level: number | string }) => ({
            id: Number(l.language_id),
            level: Number(l.level)
        }));

        // Mapas para acceso rápido por id
        const loadedTagsMap = new Map(loadedTags.map(t => [t.id, t.level]));
        const loadedLanguagesMap = new Map(loadedLanguages.map(l => [l.id, l.level]));

        // Función para convertir level a texto
        const levelToText = (level: number) =>
            level === 1 ? 'Básico' : level === 2 ? 'Intermedio' : 'Avanzado';

        // Reducir tags
        const { filtered: filteredTags, selected: selectedTagLabels } = tags.reduce(
            (acc, tag) => {
                const level = loadedTagsMap.get(tag.id);
                if (level !== undefined) {
                    acc.selected.push({
                        etiqueta: tag.name,
                        bloque: 'Etiquetas',
                        valorCheckbox: levelToText(level)
                    });
                } else {
                    acc.filtered.push(tag.name);
                }
                return acc;
            },
            { filtered: [] as string[], selected: [] as EtiquetaSeleccionada[] }
        );

        // Reducir languages
        const { filtered: filteredLanguages, selected: selectedLanguageLabels } = languages.reduce(
            (acc, lang) => {
                const level = loadedLanguagesMap.get(lang.id);
                if (level !== undefined) {
                    acc.selected.push({
                        etiqueta: lang.name,
                        bloque: 'Idiomas',
                        valorCheckbox: levelToText(level)
                    });
                } else {
                    acc.filtered.push(lang.name);
                }
                return acc;
            },
            { filtered: [] as string[], selected: [] as EtiquetaSeleccionada[] }
        );

        // Guardar en estados
        setTags(filteredTags);
        setLanguages(filteredLanguages);
        setLabelsFromSelection([...selectedTagLabels, ...selectedLanguageLabels]);

        console.log('Etiquetas filtradas:', filteredTags);
        console.log('Lenguajes filtrados:', filteredLanguages);
        console.log('Labels ya cargados:', [...selectedTagLabels, ...selectedLanguageLabels]);
    } catch (error) {
        console.error('Error al cargar etiquetas y lenguajes:', error);
        alert('Error al cargar etiquetas y lenguajes');
    }
};
    const blocks = [
        {
            titulo: "Etiquetas",
            etiquetas: ["Básico", "Intermedio", "Avanzado"],
            placeholder: "Añadir una etiqueta",
        },
        {
            titulo: "Idiomas",
            etiquetas: ["Básico", "Intermedio", "Avanzado"],
            placeholder: "Añadir un Idioma",
        },
    ];
    const searchData = {
        Etiquetas: Tags,
        Idiomas: Languages,
    };

    const handleDeleteEtiqueta = (etiqueta: string, bloque: string) => {
        setLabelsFromSelection(prev =>
            prev.filter(item => !(item.etiqueta === etiqueta && item.bloque === bloque))
        );
    };
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newPicturePath, setNewPicturePath] = useState<string | null>(null);
    const [newPicture, setNewPicture] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setForm(User.data as FormType);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!form) return;
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            if (!form) return;
            const payload: FormType = { ...form };
            // If not empty, use newPicturePath, else just use the existing profile picture
            payload.profile_picture = newPicturePath ? newPicturePath : form?.profile_picture;
            // Agregar etiquetas y niveles
            const langs = getIdsAndLevels(Languages, labelsFromSelection, 2);
            const tags = getIdsAndLevels(Tags, labelsFromSelection, 1);
            payload.languages = langs.ids;
            payload.tags = tags.ids;
            payload.languages_levels = langs.levels;
            payload.tags_levels = tags.levels;
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

    // --- RETURN PRINCIPAL DEL COMPONENTE ---
    if (!form) return null;

    const isPortrait = window.innerHeight > window.innerWidth;
    const windowWidth = window.innerWidth > window.innerHeight ? 980 : 1280;
    const [translateX, translateY] = getTranslates(isPortrait);
   const isEmpresaOrAdmin = form.type === UserTypeEnum.Empresa || form.type === UserTypeEnum.Administrador;
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
                width={ isEmpresaOrAdmin ? 600 :windowWidth }
                height={isPortrait ? undefined : 680}
                className='centered-w-wm flex-column' 
                style={{
                    ...isEmpresaOrAdmin ? { transform: 'translate(20%, -50%)'}:{},
                    padding: translateY(10),
                    paddingBottom: translateY(10),
                    minHeight: translateY(isPortrait ? 680 : 620),
                    height: 'fit-content',
                   
                }}
            >
                {/* Header */}
                <div className="flex-row-reversed" style={{ width: "100%", height: translateY(60), 
                textAlign: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h1 className='profile-title centered-x' style={{
                        top: translateY(14),
                        transform: 'translate(-50%, -50%)',
                    }}>Editar detalles de Cuenta</h1>
                </div>
                {/* Responsive User Info Grid Container */}
                <div
                    className='user-info-container'
                    style={{
                        ...(isPortrait ?
                            {
                                gridTemplateColumns: '1fr 1fr',
                            }
                            : {
                                ...(isEmpresaOrAdmin ? {
                                    gridTemplateColumns: `repeat(2, 1fr)`,
                                }
                                    : {
                                        gridTemplateColumns: `repeat(3, 1fr)`,
                                    }),

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
                            ...(isPortrait ? { gridColumn: '1/2', gridRow: '1 / 2', padding: translateY(20) } : { paddingTop: translateY(20) }),
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
                            <img src={newPicture ? newPicture : (form?.profile_picture ? form?.profile_picture : undefined)} style={{
                                width: '100%', height: '100%',
                                backgroundColor: '#F0EFF5',
                            }} />
                            {form?.profile_picture || newPicture ? (
                                <img className='edit-picture-overlay' src={edit_profile} onClick={handlePictureClick} style={{ opacity: uploading ? 0.5 : undefined }} />
                            ) : (
                                <img className='edit-picture-overlay' src={upload_picture} onClick={handlePictureClick} style={{ opacity: uploading ? 0.5 : undefined }} />
                            )}
                        </div>
                        <h1>{form.name}</h1>
                    </div>
                    {/* Email */}
                    <div
                        className='user-info-item profile-field input-field'
                        style={{ ...(isPortrait ? { gridColumn: '2', gridRow: '1' } : { gridColumn:'1',gridRow: '6' }) }}
                    >
                        <div>Email: {form?.email}</div>
                    </div>
                    {/* Location */}
                    <InputField
                        className='user-info-item'
                        style={isPortrait ? { gridColumn: '2', gridRow: '2' } : {  gridColumn:'1',gridRow: '7' }}
                        type="text" name="location" placeholder="Localidad" value={form.location} onChange={handleChange} width={'100%'} height={'100%'} />
                    {/* Portfolio */}
                    <InputField
                        className='user-info-item'
                        style={isPortrait ? { gridColumn: '2', gridRow: '3' } : {  gridColumn:'1',gridRow: '8' }}
                        type="text" name="portfolio" placeholder="Portfolio web" value={form.portfolio} onChange={handleChange} width={'100%'} height={'100%'}  />
                    {/* Type */}
                    <div
                        className='user-labels-section profile-field input-field'
                        style={ 
                             isEmpresaOrAdmin ? { display:'none',
                         }:{
                            ...(isPortrait ? { 
                                gridColumn: '2', gridRow: '4' 
                            } : 
                            {

                            }
                        )}
                        }
                    >
                        <SelectionField name="type" options={TYPE_OPTIONS} onChange={handleChange} defaultValue={getUserType(form.type)} width={300} height={40} placeholder="Tipo de usuario" />
                    </div>
                    {/* Status */}
                    <div
                        className='user-status-section profile-field input-field'
                        style={ isEmpresaOrAdmin ? { display:'none',
                         }:{
                            ...(isPortrait ? { gridColumn: '2', gridRow: '5' } : {

                            })
                        }
                    }
                    >
                        <SelectionField name="status" options={STATUS_OPTIONS} onChange={handleChange} defaultValue={getUserStatus(form.status)} width={300} height={40} placeholder="Estado" />
                    </div>

                    {/* Etiquetas y lenguajes (después de estado) */}
                    <div style={ isEmpresaOrAdmin ? { display:'none',
                         }:{ gridColumn: isPortrait ? '2 / 3' : '2 / 3', gridRow: isPortrait ? '0 / span 6' : '3 / span 6', display: 'flex', flexDirection: 'column' }}>

                        {/* Área para añadir etiquetas/idiomas */}
                        <LabelsSelection
                            height={'auto'}
                            width={'100%'}
                            blocks={blocks}
                            searchData={searchData}
                            etiquetasSeleccionadas={labelsFromSelection}
                            setEtiquetasSeleccionadas={setLabelsFromSelection}
                            activeTab={filtroBloque}
                            onTabChange={setFiltroBloque}
                            style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                            editProfile={true}  // Pass editProfie prop to adjust layout
                        />
                        {/* Visualización de etiquetas/idiomas seleccionadas */}
                        <div className="labels-view" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, margin: 'none', width: '100%', height: '100%' }}>
                            <div className="view-content">
                                {labelsFromSelection.filter(item => item.bloque === filtroBloque).length > 0 ? (
                                    <div className="tags-container" style={{ height: '100%' }}>
                                        {labelsFromSelection.filter(item => item.bloque === filtroBloque).map((item) => (
                                            <Tag2
                                                key={`${item.etiqueta}-${item.bloque}`}
                                                texto={item.etiqueta}
                                                checkBox={item.valorCheckbox}
                                                onDelete={() => handleDeleteEtiqueta(item.etiqueta, item.bloque)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="view-empty-message">
                                        Todavía no se han cargado <strong>{filtroBloque}</strong>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* Description */}
                    <TextBox
                        className='user-description-section edit input-field'
                        style={ isEmpresaOrAdmin ? { gridColumn: '2', gridRow: '1 / span 6' 
                         }:{ gridColumn: '3', gridRow: '1 / span 6' }}
                        name="description" placeholder="Descripción" onChange={handleChange} width={'100%'} height={"100%"} value={form.description} />

                    {/* Save/Cancel Buttons */}
                    <div className='user-button-section' style={{
                        ...(isPortrait ? { gridColumn: '1 / span 2', gridRow: '6 / span 2' } :
                             (isEmpresaOrAdmin ? { gridColumn: '2', gridRow: '7 / 9'}:{gridColumn: '3', gridRow: '7 / span 2' })),
                        fontSize: translateY(24)
                    }}>
                        <ActionButton height={'100%'} action={handleSave}>
                            Aceptar Cambios
                        </ActionButton>
                        <ActionButton height={'100%'} action={() => {
                            navigate(-1);
                        }} style={{ backgroundColor: 'var(--danger)' }}>
                            Cancelar
                        </ActionButton>
                    </div>
                </div>
            </AppWindow>
        </div>
    );
}


export default EditProfile;
