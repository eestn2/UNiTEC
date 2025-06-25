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
import LabelsSelection from "../UI/form/LabelsSelection";
import LabelsContainer from "../UI/form/LabelsContainer";
import Label from "../UI/form/Label";
import { useWindowSize } from "../../hooks/responsive/useWindowSize";
import axios from "axios";
import { ChangeEvent, useState } from "react";

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
        }}
        className="centered-w-wm responsive-registers"
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
        <form
          name="register-user"
          id="register-user"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}>
          <div className="horizontal-display">
              <div
              className="vertical-sections"
              style={{ paddingRight: TranslateFigmaCoords.translateFigmaY(20) }}
              >
              <InputField
                name="name-user"
                type="text"
                placeholder="Nombre y Apellido"
                width={325}
                height={55}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleChange( "name", event.target.value);
                }}
              />
              <InputField
                name="birthday-user"
                type="date"
                min="1925-01-01"
                max={new Date().toISOString().split("T")[0]}
                placeholder="Fecha de nacimiento:"
                width={325}
                height={55}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleChange( "birth_date", event.target.value);
                }}
              />
              <InputField
                name="mail-user"
                type="text"
                placeholder="Correo Electrónico"
                width={325}
                height={55}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleChange( "email", event.target.value);
                }}
              />
              <InputField
                name="password-user"
                type="password"
                placeholder="Contraseña"
                width={325}
                height={55}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleChange( "password", event.target.value);
                }}
              />
              <InputField
                name="confirm-password-user"
                type="password"
                placeholder="Confirmar Contraseña"
                width={325}
                height={55}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleChange( "confirm_password", event.target.value);
                }}
              />

              <SelectionField
                name="user-location"
                options={[
                  { value: "admin", label: "Administrator" },
                  { value: "editor", label: "Editor" },
                  { value: "viewer", label: "Viewer" },
                ]}
                placeholder="Localidad" // Non-selectable default value
                width={325}
                height={55}
                className="input-field"
              />
              <InputField
                name="user-portfolio"
                type="text"
                placeholder="Enlace a su Portfolio (Opcional)"
                width={325}
                height={55}
              />
              </div>

            <div
              className="vertical-sections"
              style={{
                paddingInline: TranslateFigmaCoords.translateFigmaY(20),
                borderLeft: "3px solid rgba(255, 193, 35, 1)",
              }}
            >
              <TextBox
                name="user-description"
                placeholder="Descripción"
                width={325}
                height={115}
              />

              <LabelsSelection width={325} height={200} />

              <SelectionField
                name="user-type"
                options={[
                  { value: "student", label: "Estudiante" },
                  { value: "graduated", label: "Egresado" },
                ]}
                placeholder="Tipo de Usuario" // Non-selectable default value
                width={325}
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
                width={325}
                height={55}
                className="input-field"
              />
            </div>

            <div
              className="vertical-sections"
              style={{
                borderLeft: "3px solid rgba(255, 193, 35, 1)",
                paddingLeft: TranslateFigmaCoords.translateFigmaY(20),
              }}
            >
              <span className="form-text">
                Si has rellenado todos los campos necesarios solo queda:
              </span>
              <ActionButton height={60} text={"Registrarse"} width={100} action={(event) => {
                        event.preventDefault();
                        const form = document.getElementById("register-user") as HTMLFormElement;
                        if (form) form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                    }}/>
              <div className="delimiter"></div>
              <span className="form-text">
                Registrarse como{" "}
                <Link to={"/register-enterprise"} className="golden-link">
                  Empresa
                </Link>
                <br />
                ¿Ya tienes cuenta?{" "}
                <Link to={"/"} className="golden-link">
                  Iniciar Sesión
                </Link>
              </span>
              <div className="delimiter"></div>
              <SelectionField
                name="user-state"
                options={[
                  { value: "admin", label: "Administrator" },
                  { value: "editor", label: "Editor" },
                  { value: "viewer", label: "Viewer" },
                ]}
                placeholder="Estado" // Non-selectable default value
                width={100}
                height={35}
                className="input-field"
              />
              <LabelsContainer width={230} height={160}>
              <Label text="English" width={90} height={20} />
              <Label text="Spanish" width={90} height={20} />
              <Label text="French" width={90} height={20} />
              <Label text="German" width={90} height={20} />
              <Label text="Italian" width={90} height={20} />
              <Label text="Portuguese" width={90} height={20} />
              <Label text="Russian" width={90} height={20} />
              <Label text="Chinese" width={90} height={20} />
              <Label text="Japanese" width={90} height={20} />
              <Label text="Korean" width={90} height={20} />
              <Label text="Arabic" width={90} height={20} />
              <Label text="Hindi" width={90} height={20} />
              <Label text="Bengali" width={90} height={20} />
              <Label text="Turkish" width={90} height={20} />
              </LabelsContainer>
            </div>
          </div>
          
        </form>
        {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      </AppWindow>
    </>
  );
}

export default RegisterUser;