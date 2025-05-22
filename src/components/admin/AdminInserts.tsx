import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import AttributeAdd from "../UI/admin/AttributeAdd";




const AdminInserts: React.FC = () => {
  const handleAddLanguage = async (attribute: string) => {
    const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
    const response = await axios.post(`${apiUrl}/requests/admin/add_language.php`, {
        attribute
    });
    console.log(response);
  };
    const handleAddTag = async (attribute: string) => {
    const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
    const response = await axios.post(`${apiUrl}/requests/admin/add_tag.php`, {
        attribute
    });
    console.log(response);
  };
    return (
        <div>
            <NavBar />
            <AppWindow
                height={400}
                width={820}
                className="feedbox"
                style={{
                    position: "absolute",
                    top: "50%", left: "50%", translate: "-50% -50%"
                }}
            >
                <h1 style={{textAlign:"center", color:"#305894", marginBottom:`${TranslateFigmaCoords.translateFigmaX(40)}px`}}>Sección de carga de Idiomas y Etiquetas</h1>
                <div style={{
                  display: 'flex',
                  justifyContent:"center",
                  alignItems:"center",
                  gap: `${TranslateFigmaCoords.translateFigmaX(80)}px`,
                  
                }}>
                  <AttributeAdd type={"Idioma"} onSubmit={handleAddLanguage} />
                  <AttributeAdd type={"Etiqueta"} onSubmit={handleAddTag}/>
                </div>
            </AppWindow>
            
        </div>
        

    )
}

export default AdminInserts;