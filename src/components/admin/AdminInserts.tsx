import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import AttributeEditor from "../UI/admin/AttributeEditor";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import AttributeAdd from "../UI/admin/AttributeAdd";




const AdminInserts: React.FC = () => {
    const [attributes, setAttributes] = useState<ReactElement[]>([]);
    const loadAttributes = async () => {
    try {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/function/get-languages.php`);

      console.log("Respuesta del backend:", response.data);
      
      if (response.status !== 200 && response.data.status !== "success") {
        console.error("Failed to load languages:", response.data.message);
      } else {
        const languages = await Promise.all(
        response.data.data.languages.map(async (language: any) => {
          return (
            <AttributeEditor
              key={language.id}
              id={language.id}
              type={language.name}
            />
          );
        }));
        setAttributes(languages);
      }
    } catch (error) {
      console.error("An error occurred while loading job offers:", error);
    }
  };
  useEffect(() => {
      loadAttributes();
    }, []);

    return (
        <div>
            <NavBar />
            <AppWindow
                height={400}
                width={1234}
                className="feedbox"
                style={{
                    position: "absolute",
                    left: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                    top: `${TranslateFigmaCoords.translateFigmaY(100)}px`,
                    overflowY: "scroll",
                    borderTopRightRadius: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                    borderBottomRightRadius: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                }}
            >
                <h1 style={{textAlign:"center", color:"#305894"}}>Insertar nuevo:</h1>
                <div style={{
                  display: 'flex',
                  justifyContent:"center",
                  alignItems:"center",
                  gap: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                  
                }}>
                  <AttributeAdd type={"Lenguaje"} />
                  <AttributeAdd type={"Etiqueta"} />
                </div>
            </AppWindow>
            
        </div>
        

    )
}

export default AdminInserts;