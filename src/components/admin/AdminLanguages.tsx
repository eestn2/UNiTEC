import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import AttributeEditor from "../UI/admin/AttributeEditor";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";




const AdminLanguages: React.FC = () => {
    const handleDeleteAttribute = async (id: number) => {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.delete(`${apiUrl}/admin/delete_language.php`, {
          data:{
            id:id,}
      }); 
    console.log(response);
    };
    const handleChangeAttribute = async (attribute: string, id: number) => {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.put(`${apiUrl}/admin/edit_language.php`, {
          id:id,
          name:attribute
      });
    console.log(response);
    };
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
              onSubmit={handleChangeAttribute}
              onDelete={handleDeleteAttribute}
            />
          );
        }));
        setAttributes(languages);
      }
    } catch (error) {
      console.error("An error occurred while loading languages:", error);
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
                    borderTopRightRadius: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                    borderBottomRightRadius: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                }}
            >
                <h1 style={{textAlign:"center", color:"#305894"}}>Listado de Idiomas</h1>
                <div 
                className= "admin_attributes_grid"
                >
                  {attributes}
                </div>
            </AppWindow>
            
        </div>
        

    )
}

export default AdminLanguages;