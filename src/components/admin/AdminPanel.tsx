import { ReactElement, useEffect, useState } from "react";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import AppWindow from "../UI/AppWindow";
import NavBar from "../UI/NavBar";
import axios from "axios";
import AttributeEditor from "../UI/AttributeEditor";



const AdminPanel: React.FC = () => {
    const [attributes, setAttributes] = useState<ReactElement[]>([]);
    const loadAttributes = async () => {
    try {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/requests/admin/see_language.php`);

      console.log("Respuesta del backend:", response.data);
      
      if (response.status !== 200 && response.data.status !== "success") {
        console.error("Failed to load languages:", response.data.message);
      } else {
        const languages = await Promise.all(
        response.data.languages.map(async (language: any) => {
          return (
            <AttributeEditor
              key={language.id}
              id={language.id}
              type={language.title}
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
                height={600}
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
                {attributes}
            </AppWindow>
            
        </div>
        

    )
}

export default AdminPanel;