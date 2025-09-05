import axios from "axios";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import AttributeAdd from "../UI/admin/AttributeAdd";
import defaultError from "../../global/messages/defaultError";

/* Axios error conditionals formated */

const AdminInserts: React.FC = () => {
  const handleAddLanguage = async (attribute: string) => {
    try {
      const response = await axios.post('/admin/add_language.php', {
        name:attribute
      });
      if(response) alert("Idioma agregado con éxito");
    } catch (error) {
      if (axios.isAxiosError(error)) return alert(error.response?.data?.message || defaultError);
      alert(defaultError);
    }
  };
    const handleAddTag = async (attribute: string) => {
    try{
      const response = await axios.post('/admin/add_tag.php', {
        name:attribute
      });
      if(response) alert("Etiqueta agregada con éxito");
    } catch (error) {
      if (axios.isAxiosError(error)) return alert(error.response?.data?.message || defaultError);
      alert(defaultError);
    }
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