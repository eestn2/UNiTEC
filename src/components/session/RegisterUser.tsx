/**
 * @file RegisterUser.tsx
 * @description A reusable React component for rendering a responsive student registration form.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */

import ActionButton from "../UI/ActionButton";
import "../../styles/index.css";
import SelectionField from "../UI/SelectionField";
import AppWindow from "../UI/AppWindow";
import Logo from "../UI/Logo";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import InputField from "../UI/InputField";
import TextBox from "../UI/TextBox";
import { Link } from "react-router-dom";
import LabelsSelection from "../UI/LabelsSelection";
import LabelsContainer from "../UI/LabelsContainer";
import Label from "../UI/Label";
import { useEffect, useState } from "react";

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
  // Re-Render on window resize for responsive design
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  console.log("Current window size: ", windowSize);
  useEffect(() => {
      const handleResize = () => {
          setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener("resize", handleResize);
      return () => {
          window.removeEventListener("resize", handleResize);
      };
  }, []);
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
              width={325}
              height={55}
            />
            <InputField
              name="birthday-user"
              type="date"
              min="1925-01-01"
              max={new Date().toISOString().split("T")[0]}
              placeholder="Fecha de nacimiento:"
              width={325}
              height={55}
            />
            <InputField
              name="mail-user"
              type="text"
              placeholder="Correo Electrónico"
              width={325}
              height={55}
            />
            <InputField
              name="password-user"
              type="password"
              placeholder="Contraseña"
              width={325}
              height={55}
            />
            <InputField
              name="confirm-password-user"
              type="password"
              placeholder="Confirmar Contraseña"
              width={325}
              height={55}
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
            <ActionButton height={60} text={"Registrarse"} width={100} />
            <div className="delimiter"></div>
            <span className="form-text">
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
      </AppWindow>
    </>
  );
}

export default RegisterUser;