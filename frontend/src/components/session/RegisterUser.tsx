import ActionButton from "../UI/ActionButton";
import SelectionField from "../UI/form/SelectionField";
import AppWindow from "../UI/AppWindow";
import Logo from "../UI/unitec/Logo";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import InputField from "../UI/form/InputField";
import TextBox from "../UI/form/TextBox";
import { Link, useNavigate } from "react-router-dom";
import LabelsSelection from "../UI/form/LabelsSelection";
import axios from "axios";
import { useEffect, useState } from "react";
import '../../styles/SeeEtiquetas.css';
import Tag2 from "../UI/Tag2";
import { getStates } from "../../global/function/getStates";
import {sortByName} from "../../global/function/sortByName";
type SelectedItem = {
  id: number;
  name: string;
  block: "Etiquetas" | "Idiomas";
  level: number;
};

type OptionItem = {
  id: number;
  name: string;
};

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
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [languages, setLanguages] = useState<OptionItem[]>([]);
  const [tags, setTags] = useState<OptionItem[]>([]);
  const navigate = useNavigate();

  const handleDeleteItem = (id: number, block: "Etiquetas" | "Idiomas") => {
    setSelectedItems(prev =>
      prev.filter(item => !(item.id === id && item.block === block))
    );
  };

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

    // Prepare languages and tags data from selected items
    const languagesData = selectedItems
      .filter(item => item.block === "Idiomas")
      .reduce((acc, item) => {
        acc.ids.push(item.id);
        acc.levels.push(item.level);
        return acc;
      }, { ids: [] as number[], levels: [] as number[] });

    const tagsData = selectedItems
      .filter(item => item.block === "Etiquetas")
      .reduce((acc, item) => {
        acc.ids.push(item.id);
        acc.levels.push(item.level);
        return acc;
      }, { ids: [] as number[], levels: [] as number[] });

    const formToSend = {
      ...form,
      languages: languagesData.ids,
      tags: tagsData.ids,
      languages_levels: languagesData.levels,
      tags_levels: tagsData.levels
    };


    // Validation
    const requiredFields = [
      "name", "birth_date", "email",
      "password", "confirm_password",
      "description", "user_type", "status_id"
    ];
    const newErrors: any = {};
    let hasError = false;
    const camposInvalidos = ["user_type", "status_id"];

    requiredFields.forEach((field) => {
      const value = formToSend[field as keyof typeof formToSend];
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

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formToSend.email)) {
      newErrors.email = "Formato de email inválido";
      hasError = true;
    }

    if (formToSend.password !== formToSend.confirm_password) {
      newErrors.confirm_password = "Las contraseñas no coinciden";
      hasError = true;
    }

    setFieldErrors((prev) => ({ ...prev, ...newErrors }));
    if (hasError) return;

    try {
      const res = await axios.post("/session/user-register.php", formToSend);
      if (res.data.status === "success") {
        navigate("/");
      } else {
        setError(res.data.message || "Error en el registro");
      }
    } catch {
      setError("No se pudo registrar. Intente de nuevo más tarde.");
    }
  };

  const loadLanguages = async () => {
    try {
      const response = await axios.get('/function/get-languages.php');
      if (response.status === 200 && response.data.status === "success") {
        setLanguages(sortByName(response.data.data.languages));
        
      }
    } catch (error) {
      console.error("Error loading languages:", error);
    }
  };

  const loadTags = async () => {
    try {
      const response = await axios.get('/function/get-tags.php');
      if (response.status === 200 && response.data.status === "success") {
        setTags(sortByName(response.data.data.tags));
      }
    } catch (error) {
      console.error("Error loading tags:", error);
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
    Etiquetas: tags,
    Idiomas: languages,
  };

  const [filterBlock, setFilterBlock] = useState<"Etiquetas" | "Idiomas">("Etiquetas");

  useEffect(() => {
    loadLanguages();
    loadTags();
  }, []);

  return (
    <>
      <Logo className="watermark" />
      <AppWindow
        width={980}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          rowGap: `${TranslateFigmaCoords.translateFigmaY(20)}`,
          padding: `${TranslateFigmaCoords.translateFigmaY(20)}px`,
          flexDirection: "column",
          position: "relative",
          margin: '5vh auto',
          left: '7%',
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
          <div className="vertical-sections">
            <InputField
              name="name-user"
              type="text"
              placeholder="Nombre y Apellido"
              width={'100%'}
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
              width={'100%'}
              height={55}
              value={form.birth_date}
              onChange={(e) => handleChange("birth_date", (e.target as HTMLInputElement).value)}
            />
            {fieldErrors.birth_date && <span style={{ color: "red" }}>{fieldErrors.birth_date}</span>}
            <InputField
              name="mail-user"
              type="text"
              placeholder="Correo Electrónico"
              width={'100%'}
              height={55}
              value={form.email}
              onChange={(e) => handleChange("email", (e.target as HTMLInputElement).value)}
            />
            {fieldErrors.email && <span style={{ color: "red" }}>{fieldErrors.email}</span>}
            <InputField
              name="password-user"
              type="password"
              placeholder="Contraseña"
              width={'100%'}
              height={55}
              value={form.password}
              onChange={(e) => handleChange("password", (e.target as HTMLInputElement).value)}
            />
            {fieldErrors.password && <span style={{ color: "red" }}>{fieldErrors.password}</span>}
            <InputField
              name="confirm-password-user"
              type="password"
              placeholder="Confirmar Contraseña"
              width={'100%'}
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
              width={'100%'}
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
              width={'100%'}
              height={55}
              className="input-field"
              onChange={(e) => handleChange("status_id", (e.target as HTMLSelectElement).value)}
            />
            <InputField
              name="user-portfolio"
              type="text"
              placeholder="Enlace a su Portfolio (Opcional)"
              width={'100%'}
              height={55}
              value={form.portfolio}
              onChange={(e) => handleChange("portfolio", (e.target as HTMLInputElement).value)}
            />
          </div>
          <div className="vertical-sections" style={{
            alignItems: 'center',
            borderLeft: "3px solid rgba(255, 193, 35, 1)", 
            borderRight: "3px solid rgba(255, 193, 35, 1)",
            paddingLeft: `${TranslateFigmaCoords.translateFigmaX(25)}`,
            paddingRight: `${TranslateFigmaCoords.translateFigmaX(25)}`,
          }}>
            <div style={{ height: 'auto', display: 'flex', flexDirection: 'column' }}>
              <div>
                <div className="corner-container">
                  <TextBox 
                    name="user-description" 
                    placeholder="Ingrese una descripción personal" 
                    width={292} 
                    height={265} 
                    className="corner-visible" 
                    onChange={(e) => handleChange("description", e.target.value)} 
                  />
                  <p className="corner-down-right"></p>
                </div>
                {fieldErrors.description && <span style={{ color: "red" }}>{fieldErrors.description}</span>}
              </div>

              <LabelsSelection
                width={292}
                height={215}
                blocks={blocks}
                searchData={searchData}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                className="labels-selection"
              />
            </div>
          </div>

          <div className="vertical-sections">
            <div className="labels-view">
              <div className="view-tabs">
                {blocks.map((block, index) => (
                  <button
                    type="button"
                    key={index}
                    className={block.titulo === filterBlock ? "active-view-tab" : "view-tab"}
                    onClick={() => setFilterBlock(block.titulo as "Etiquetas" | "Idiomas")}
                  >
                    {block.titulo}
                  </button>
                ))}
              </div>
              <div className="view-content">
                {selectedItems.filter(item => item.block === filterBlock).length > 0 ? (
                  <div className="tags-container">
                    {selectedItems
                      .filter(item => item.block === filterBlock)
                      .map((item) => (
                        <Tag2
                          key={`${item.id}-${item.block}`}
                          texto={item.name}
                          checkBox={["Básico", "Intermedio", "Avanzado"][item.level - 1]}
                          onDelete={() => handleDeleteItem(item.id, item.block)}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="view-empty-message">
                    Todavía no se han cargado <strong>{filterBlock}</strong>
                  </div>
                )}
              </div>
            </div>
            <div className="buttons-container-delete">
              {blocks.map((block) => (
                <button
                  type="button"
                  key={`clear-${block.titulo}`}
                  onClick={() => setSelectedItems(prev => 
                    prev.filter(item => item.block !== block.titulo)
                  )}
                  className="buttons-delete"
                  title={`Eliminar todas las etiquetas de ${block.titulo}`}
                >
                  Limpiar {block.titulo}
                </button>
              ))}
            </div>
            <span className="form-text" style={{
              borderTop: "3px solid rgba(255, 193, 35, 1)",
              paddingTop: `${TranslateFigmaCoords.translateFigmaY(20)}`
            }}>
              Si has rellenado todos los campos necesarios solo queda:
            </span>
            <ActionButton 
              height={60} 
              text={"Registrarse"} 
              width={100} 
              action={handleSubmit} 
            />
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