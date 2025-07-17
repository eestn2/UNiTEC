/**
 * @file RegisterUser.tsx
 * @description A reusable React component for rendering a responsive student registration form.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */
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
import { useState } from "react";
import '../../styles/SeeEtiquetas.css';
import Tag2 from "../UI/Tag2";


type EtiquetaSeleccionada = {
  etiqueta: string;
  bloque: string;
  valorCheckbox: string;
}

/**
 * A React functional component that renders a registration form for students inside a responsive window.
 * Handles form state, input validation, and submission to the backend. Includes fields for name, birthday, email, password, location, description, labels, user type, and state.
 *
 * @component
 * @returns {JSX.Element} A styled window containing the student registration form.
 *
 * @example
 * ```tsx
 * <RegisterUser />
 * ```
 * @author Daviel Díaz Gonzáles 
 */
function RegisterUser() {
  // Re-Render on window resize
  const windowSize = useWindowSize();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    birth_date: "",
    email: "",
    password: "",
    confirm_password: "",
    location: "",
    description: "",
    portfolio: "",
    user_type_id: 2,
    status_id: 1,
  });
  const [labelsFromSelection, setLabelsFromSelection] = useState<EtiquetaSeleccionada[]>([]);

  const handleDeleteEtiqueta = (etiqueta: string, bloque: string) => {
    setLabelsFromSelection(prev =>
      prev.filter(item => !(item.etiqueta === etiqueta && item.bloque === bloque))
    );
  };








  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm_password) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
      const res = await axios.post("/session/user-register.php", form);
      if (res.data.status === "success") {
        window.location.reload();
      } else {
        setError(res.data.message || "Error en el registro");
      }
    } catch (err) {
      setError("No se pudo registrar. Intente de nuevo más tarde.");
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
    Etiquetas: ["c++", "Java", "Python"],
    Idiomas: ["Ingles", "Espaniol", "Aleman"],
  };

  const [filtroBloque, setFiltroBloque] = useState(blocks.length > 0 ? blocks[0].titulo : "");
  return (

    <>

      <Logo className="watermark"></Logo>

      <AppWindow
        width={980}
        height={580}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          rowGap: TranslateFigmaCoords.translateFigmaY(20),
          padding: `${TranslateFigmaCoords.translateFigmaY(20)}px`,
          flexDirection: "column",
          position: "absolute",
          top: "50%",
          left: "50%",
          translate: "-40% -50%",
          overflow:'hidden'
        }}
      >
        <span
          className="top-section title"
          style={{
            display: "flex",
            height: TranslateFigmaCoords.translateFigmaY(80),
            width: "100%",
            paddingBottom: TranslateFigmaCoords.translateFigmaY(10),
          }}
        >
          Registro del Estudiante
        </span>

        <div className="horizontal-display">
          <div
            className="vertical-sections"
            style={{ paddingRight: TranslateFigmaCoords.translateFigmaY(20) }}
          >
            <InputField
              name="name-user"
              type="text"
              placeholder="Nombre y Apellido"
              width={292}
              height={55}
            />
            <InputField
              name="birthday-user"
              type="date"
              min="1925-01-01"
              max={new Date().toISOString().split("T")[0]}
              placeholder="Fecha de nacimiento:"
              width={292}
              height={55}
            />
            <InputField
              name="mail-user"
              type="text"
              placeholder="Correo Electrónico"
              width={292}
              height={55}
            />
            <InputField
              name="password-user"
              type="password"
              placeholder="Contraseña"
              width={292}
              height={55}
            />
            <InputField
              name="confirm-password-user"
              type="password"
              placeholder="Confirmar Contraseña"
              width={292}
              height={55}
            />
            <SelectionField
              name="user-type"
              options={[
                { value: "student", label: "Estudiante" },
                { value: "graduated", label: "Egresado" },
              ]}
              placeholder="Tipo de Usuario" // Non-selectable default value
              width={292}
              height={55}
              className="input-field"
            />

            <SelectionField
              name="user-state"
              options={[
                { value: "admin", label: "Administrator" },
                { value: "editor", label: "Editor" },
                { value: "viewer", label: "Viewer" },
              ]}
              placeholder="Estado" // Non-selectable default value
              width={292}
              height={55}
              className="input-field"
            />
            <InputField
              name="user-portfolio"
              type="text"
              placeholder="Enlace a su Portfolio (Opcional)"
              width={292}
              height={55}
            />
          </div>

          <div
            className="vertical-sections"
            style={{
              paddingInline: TranslateFigmaCoords.translateFigmaY(20),
              borderLeft: "calc((3/1280) * var(--x-multiplier)) solid rgba(255, 193, 35, 1)",
            }}
          >
            <div className="corner-container">
              <TextBox
                name="user-description"
                placeholder="Ingrese una descripción personal"
                width={292}
                height={265} 
                className="corner-visible"
              />
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

          <div
            className="vertical-sections"
            style={{
              borderLeft: "calc((3/1280) * var(--x-multiplier)) solid rgba(255, 193, 35, 1)",
              paddingLeft: TranslateFigmaCoords.translateFigmaY(20),
            }}
          >
            <div
              className="labels-view"
            >
              <div className="view-tabs">
                {blocks.map((block, index) => (
                  <button
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
                    {labelsFromSelection
                      .filter(item => item.bloque === filtroBloque)
                      .map((item) => (
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
                  key={`clear-${block.titulo}`}
                  onClick={() => {
                    setLabelsFromSelection(prev =>
                      prev.filter(item => item.bloque !== block.titulo)
                    );
                  }} className="buttons-delete"
                  title={`Eliminar todas las etiquetas de ${block.titulo}`}
                >
                  Limpiar {block.titulo}
                </button>
              ))}
            </div>
            <span className="form-text" style={{
              borderTop: "calc((3/1280) * var(--x-multiplier)) solid rgba(255, 193, 35, 1)",
              paddingTop: TranslateFigmaCoords.translateFigmaY(20),
            }}>
              Si has rellenado todos los campos necesarios solo queda:
            </span>
            <ActionButton height={60} text={"Registrarse"} width={100} />
            <div className="delimiter"></div>
            <span className="form-text" style={{ paddingBottom: TranslateFigmaCoords.translateFigmaY(17), }}>
              Registrarse como{" "}
              <Link to={"/register-enterprise"} className="golden-link">
                Empresa
              </Link>
              <br />
              ¿Ya tienes cuenta?{" "}
              <Link to={"//"} className="golden-link">
                Iniciar Sesión
              </Link>
            </span>
          </div>
        </div>
        {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      </AppWindow>
    </>
  );
}

export default RegisterUser;