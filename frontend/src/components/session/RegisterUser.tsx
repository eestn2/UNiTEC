import ActionButton from "../UI/ActionButton";
import SelectionField from "../UI/form/SelectionField";
import AppWindow from "../UI/AppWindow";
import Logo from "../UI/unitec/Logo";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import InputField from "../UI/form/InputField";
import TextBox from "../UI/form/TextBox";
import { Link } from "react-router-dom";
import LabelsSelection from "../UI/form/LabelsSelectionEdit";
import { useWindowSize } from "../../hooks/responsive/useWindowSize";
import axios from "axios";
import { useEffect, useState } from "react";
import '../../styles/SeeEtiquetas.css';
import Tag2 from "../UI/Tag2";
import { getStates } from "../../global/function/getStates";


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


type FormType = {
  name: string;
  birth_date: string;
  email: string;
  password: string;
  confirm_password: string;
  location: string;
  description: string;
  portfolio: string;
  user_type: number;
  status_id: number;
  languages: number[];
  tags: number[];
  languages_levels: number[];
  tags_levels: number[];
};


function RegisterUser() {

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    birth_date: "",
    email: "",
    password: "",
    confirm_password: "",
    location: "",
    description: "",
    user_type: 0,
    status_id: 0
  });

  const windowSize = useWindowSize();
  if (import.meta.env.DEV) console.log("Compiler stop crying please", windowSize)
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormType>({
    name: "",
    birth_date: "",
    email: "",
    password: "",
    confirm_password: "",
    location: "",
    description: "",
    portfolio: "",
    user_type: 0,
    status_id: 0,
    languages: [],
    tags: [],
    languages_levels: [],
    tags_levels: [],
  });
  const [labelsFromSelection, setLabelsFromSelection] = useState<EtiquetaSeleccionada[]>([]);
  const [Languages, setLanguages] = useState<string[]>([]);
  const [Tags, setTags] = useState<string[]>([]);

  const handleDeleteEtiqueta = (etiqueta: string, bloque: string) => {
    setLabelsFromSelection(prev =>
      prev.filter(item => !(item.etiqueta === etiqueta && item.bloque === bloque))
    );
  };

  function handleSubmitLabels(languages: number[], tags: number[], languagesLevels: number[], tagsLevels: number[]) {
    setForm(prev => ({
      ...prev,
      languages: languages,
      tags: tags,
      languages_levels: languagesLevels,
      tags_levels: tagsLevels,
    }));
  }

  const validateField = (field: string, value: string) => {
    let error = "";
    switch (field) {
      case "email":
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
          error = "Formato de email inválido";
        }
        break;
      case "password":
      case "confirm_password":
        if (
          (field === "confirm_password" && value !== form.password) ||
          (field === "password" && form.confirm_password && value !== form.confirm_password)
        ) {
          error = "Las contraseñas no coinciden";
        }
        break;
      default:
        if (!value.trim() && field !== "portfolio") {
          error = "Este campo es obligatorio";
        }
    }
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const requiredFields = [
      "name", "birth_date", "email",
      "password", "confirm_password",
      "description", "user_type", "status_id"
    ];

    let hasError = false;
    const newErrors: any = {};
    const camposInvalidos = ["user_type", "status_id"];

    requiredFields.forEach((field) => {
      const value = form[field as keyof typeof form];

      if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "") ||
        (camposInvalidos.includes(field) && value === 0)
      ) {
        newErrors[field] = "Este campo es obligatorio";
        hasError = true;
      }
    });

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      newErrors.email = "Formato de email inválido";
      hasError = true;
    }

    if (form.password !== form.confirm_password) {
      newErrors.confirm_password = "Las contraseñas no coinciden";
      hasError = true;
    }

    setFieldErrors((prev) => ({ ...prev, ...newErrors }));
    if (hasError) return;

    try {
      const res = await axios.post("/session/user-register.php", { ...form });
      if (res.data.status === "success") {
        window.location.reload();
      } else {
        setError(res.data.message || "Error en el registro");
      }
    } catch (err) {
      setError("No se pudo registrar. Intente de nuevo más tarde.");
    }
  };



  const loadLanguages = async () => {
    try {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/function/get-languages.php`);
      if (response.status !== 200 || response.data.status !== "success") {
        console.error("Failed to load languages:", response.data.message);
      } else {
        const languageNames = response.data.data.languages.map((lang: any) => lang.name);
        setLanguages(languageNames);
      }
    } catch (error) {
      console.error("An error occurred while loading languages:", error);
    }
  };

  const loadTags = async () => {
    try {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/function/get-tags.php`);
      if (response.status !== 200 || response.data.status !== "success") {
        console.error("Failed to load tags:", response.data.message);
      } else {
        const tagsNames = response.data.data.tags.map((lang: any) => lang.name);
        setTags(tagsNames);
      }
    } catch (error) {
      console.error("An error occurred while loading tags:", error);
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

  const [filtroBloque, setFiltroBloque] = useState(blocks[0].titulo);

  useEffect(() => {
    loadLanguages();
    loadTags();
  }, []);
  return (
    <>
      <Logo className="watermark" />
      <AppWindow
        width={980}
        height={580}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          rowGap: `${TranslateFigmaCoords.translateFigmaY(20)}`,
          padding: `${TranslateFigmaCoords.translateFigmaY(20)}px`,
          flexDirection: "column",
          position: "relative",
          left: "50%",
          marginTop:'5vh',
          translate: "-40% 0",
          overflow: 'hidden',
        }}
      >
        <span
          className="top-section title"
          style={{
            display: "flex",
            height: `${TranslateFigmaCoords.translateFigmaY(80)}`,
            width: "100%",
            paddingBottom: `${TranslateFigmaCoords.translateFigmaY(10)}`,
          }}
        >
          Registro del Estudiante
        </span>
        <form onSubmit={handleSubmit} className="horizontal-display">
          <div className="vertical-sections" style={{ paddingRight: `${TranslateFigmaCoords.translateFigmaY(20)}` }}>
            <InputField
              name="name-user"
              type="text"
              placeholder="Nombre y Apellido"
              width={292}
              height={55}
              value={form.name}
              onChange={(e) => handleChange("name", (e.target as HTMLInputElement).value)}
            />
            {fieldErrors.name && <span style={{ color: "red" }}>{fieldErrors.name}</span>}
            <InputField
              name="birthday-user"
              type="date"
              min="1925-01-01"
              max={new Date().toISOString().split("T")[0]}
              placeholder="Fecha de nacimiento:"
              width={292}
              height={55}
              value={form.birth_date}
              onChange={(e) => handleChange("birth_date", (e.target as HTMLInputElement).value)}
            />
            {fieldErrors.birth_date && <span style={{ color: "red" }}>{fieldErrors.birth_date}</span>}
            <InputField
              name="mail-user"
              type="text"
              placeholder="Correo Electrónico"
              width={292}
              height={55}
              value={form.email}
              onChange={(e) => handleChange("email", (e.target as HTMLInputElement).value)}
            />
            {fieldErrors.email && <span style={{ color: "red" }}>{fieldErrors.email}</span>}
            <InputField
              name="password-user"
              type="password"
              placeholder="Contraseña"
              width={292}
              height={55}
              value={form.password}
              onChange={(e) => handleChange("password", (e.target as HTMLInputElement).value)}
            />
            {fieldErrors.password && <span style={{ color: "red" }}>{fieldErrors.password}</span>}
            <InputField
              name="confirm-password-user"
              type="password"
              placeholder="Confirmar Contraseña"
              width={292}
              height={55}
              value={form.confirm_password}
              onChange={(e) => handleChange("confirm_password", (e.target as HTMLInputElement).value)}
            />
            {fieldErrors.confirm_password && <span style={{ color: "red" }}>{fieldErrors.confirm_password}</span>}
            <SelectionField
              name="user-type"
              options={[
                { value: "2", label: "Estudiante" },
                { value: "3", label: "Egresado" },
              ]}
              placeholder="Tipo de Usuario"
              width={292}
              height={55}
              className="input-field"
              onChange={(e) => handleChange("user_type", (e.target as HTMLSelectElement).value)}
            />
            <SelectionField
              name="user-state"
              options={[
                { value: "1", label: getStates(1) },
                { value: "2", label: getStates(2) },
                { value: "3", label: getStates(3) },
                { value: "4", label: getStates(4) },
                { value: "5", label: getStates(5) },
                { value: "6", label: getStates(6) },
                { value: "7", label: getStates(7) },
                { value: "8", label: getStates(8) },
                { value: "9", label: getStates(9) },
                { value: "10", label: getStates(10) },

              ]}
              placeholder="Estado"
              width={292}
              height={55}
              className="input-field"
              onChange={(e) => handleChange("status_id", (e.target as HTMLSelectElement).value)}
            />
            <InputField
              name="user-portfolio"
              type="text"
              placeholder="Enlace a su Portfolio (Opcional)"
              width={292}
              height={55}
              value={form.portfolio}
              onChange={(e) => handleChange("portfolio", (e.target as HTMLInputElement).value)}
            />
          </div>
          <div className="vertical-sections" style={{ paddingInline: `${TranslateFigmaCoords.translateFigmaY(20)}`, borderLeft: "3px solid rgba(255, 193, 35, 1)" }}>
            <div className="corner-container">
              <TextBox name="user-description" placeholder="Ingrese una descripción personal" width={292} height={265} className="corner-visible" onChange={(e) => handleChange("description", e.target.value)} />
              {fieldErrors.description && <span style={{ color: "red" }}>{fieldErrors.description}</span>}
              <p className="corner-down-right"></p>
            </div>
            <LabelsSelection
              width={292}
              height={215}
              blocks={blocks}
              searchData={searchData}
              etiquetasSeleccionadas={labelsFromSelection}
              setEtiquetasSeleccionadas={setLabelsFromSelection}
            />
          </div>

          <div className="vertical-sections" style={{ borderLeft: "3px solid rgba(255, 193, 35, 1)", paddingLeft: `${TranslateFigmaCoords.translateFigmaY(20)}` }}>
            <div className="labels-view">
              <div className="view-tabs">
                {blocks.map((block, index) => (
                  <button
                    type="button"
                    key={index}
                    className={block.titulo === filtroBloque ? "active-view-tab" : "view-tab"}
                    onClick={() => setFiltroBloque(block.titulo)}
                  >
                    {block.titulo || "Sin Título"}
                  </button>
                ))}
              </div>
              <div className="view-content">
                {labelsFromSelection.filter(item => item.bloque === filtroBloque).length > 0 ? (
                  <div className="tags-container">
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
            <div className="buttons-container-delete">
              {blocks.map((block) => (
                <button
                  type="button"
                  key={`clear-${block.titulo}`}
                  onClick={() => setLabelsFromSelection(prev => prev.filter(item => item.bloque !== block.titulo))}
                  className="buttons-delete"
                  title={`Eliminar todas las etiquetas de ${block.titulo}`}
                >
                  Limpiar {block.titulo}
                </button>
              ))}
            </div>
            <span className="form-text" style={{ borderTop: "3px solid rgba(255, 193, 35, 1)", paddingTop: `${TranslateFigmaCoords.translateFigmaY(20)}` }}>
              Si has rellenado todos los campos necesarios solo queda:
            </span>
            <ActionButton height={60} text={"Registrarse"} width={100} action={(e) => {
              const langs = getIdsAndLevels(Languages, labelsFromSelection, 2);
              const tags = getIdsAndLevels(Tags, labelsFromSelection, 1);
              handleSubmitLabels(langs.ids, tags.ids, langs.levels, tags.levels);
              handleSubmit(e);
            }} />
            <div className="delimiter"></div>
            <span className="form-text" style={{ paddingBottom: `${TranslateFigmaCoords.translateFigmaY(17)}` }}>
              Registrarse como <Link to="/register-enterprise" className="golden-link">Empresa</Link><br />
              ¿Ya tienes cuenta? <Link to="/" className="golden-link">Iniciar Sesión</Link>
            </span>
          </div>
        </form>
        {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      </AppWindow>
    </>
  );
}

export default RegisterUser;

