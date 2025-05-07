import ActionButton from "../UI/ActionButton";
import "../../styles/index.css";

import AppWindow from '../UI/AppWindow'
import Logo from "../UI/Logo";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import InputField from "../UI/InputField";
import TextBox from "../UI/TextBox";
import { Link } from "react-router-dom";

function RegisterUser() {
 return (
  <>
    <Logo className="watermark"></Logo>

    <AppWindow width={980} height={580} style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      rowGap: TranslateFigmaCoords.translateFigmaY(20),
      padding: `${TranslateFigmaCoords.translateFigmaY(20)}px`, // Apply padding on all sides
      flexDirection: "column",
      position: "absolute", 
      top: "50%", left: "50%", translate: "-40% -50%"
    }}>
        <span className="top-section title" 
        style={{
          display: "flex",
          height: TranslateFigmaCoords.translateFigmaY(80),
          width: "100%",
          paddingBottom: TranslateFigmaCoords.translateFigmaY(10),
        }}> Registro del Estudiante</span>

        <div className="horizontal-display">
            <div className="vertical-sections" style={{paddingRight: TranslateFigmaCoords.translateFigmaY(20),}}>
              <InputField name="name-user" type="text" placeholder="Nombre y Apellido" width={305} height={55}/>
              <InputField name="mail-user" type="text" placeholder="Correo Electrónico" width={305} height={55}/>
              <InputField name="password-user" type="text" placeholder="Contraseña" width={305} height={55}/>
              <InputField name="password-confirm-enterprise" type="date" min="1925-01-01" max={new Date().toISOString().split('T')[0]} placeholder="Coso" width={305} height={55}/>
              <InputField name="website-enterprise" type="text" placeholder="Enlace a su Página Web (Opcional)" width={305} height={55}/>
              <TextBox name="website-enterprise" placeholder="Descripción" width={305} height={110}/>
            </div>

            <div className="vertical-sections" style={{paddingInline: TranslateFigmaCoords.translateFigmaY(20), borderLeft: "3px solid rgba(255, 193, 35, 1)",}}>
              <InputField name="name-enterprise" type="text" placeholder="Nombre de la Empresa" width={305} height={55}/>
              <InputField name="mail-enterprise" type="text" placeholder="Correo Electrónico" width={305} height={55}/>
              <InputField name="password-enterprise" type="text" placeholder="Contraseña" width={305} height={55}/>
              <InputField name="password-confirm-enterprise" type="text" placeholder="Confirmar Contraseña" width={305} height={55}/>
              <InputField name="website-enterprise" type="text" placeholder="Enlace a su Página Web (Opcional)" width={305} height={55}/>
              <TextBox name="website-enterprise" placeholder="Descripción" width={305} height={110}/>
            </div>

            <div className="vertical-sections" style={{
              borderLeft: "3px solid rgba(255, 193, 35, 1)",
              paddingLeft: TranslateFigmaCoords.translateFigmaY(20),
            }}>
              <span className="form-text">Si has rellenado todos los campos necesarios solo queda:</span>
              <ActionButton height={60} text={"Registrarse"} width={100}/>
              <div className="delimiter"></div>
              <span className="form-text">Registrarse como <Link to={'/register-enterprise'} className="golden-link">Empresa</Link><br />¿Ya tienes cuenta? <Link to={'/'} className="golden-link">Iniciar Sesión</Link></span>
            </div>
        </div>
    </AppWindow>
  </>
 )
}

export default RegisterUser;
