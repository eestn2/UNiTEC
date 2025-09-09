import axios from "axios";
import {  useEffect, useState } from "react";
import AttributeEditor from "../UI/admin/AttributeEditor";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import defaultError from "../../global/messages/defaultError";

const AdminTags: React.FC = () => {
  const [tags, setTags] = useState<any[]>([]);
  const handleDeleteAttribute = async (id: number) => {
      try {
        const response = await axios.delete('/admin/delete_tag.php', {data: {id: id,}});
        if (response) {
          setTags(prevTags => prevTags.filter(tag => tag.id !== id));
          alert("Etiqueta eliminada correctamente");
        } 
      } catch (error) {
        if (axios.isAxiosError(error)) return alert(error.response?.data?.message || defaultError);
        alert(defaultError);
      }
    };
  const handleChangeAttribute = async (attribute: string, id: number) => {
    try{
      const response = await axios.put('/admin/edit_tag.php', {id: id, name: attribute});
      if (response) alert("Etiqueta editada correctamente");
    } catch (error) {
      if (axios.isAxiosError(error)) return alert(error.response?.data?.message || defaultError);
      alert(defaultError);
    }
    
  };
    const loadAttributes = async () => {
      try {
        const response = await axios.get('/function/get-tags.php');
        if (response) {
          setTags(response.data.data.tags);
          alert("Se cargaron los tags adecuadamente");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) return alert(error.response?.data?.message || defaultError);
        alert(defaultError);
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
                <h1 style={{textAlign:"center", color:"#305894"}}>Listado de Tags</h1>
                <div 
                  className= "admin_attributes_grid"
                >
                  {tags.map(tag => (
                    <AttributeEditor
                      key={tag.id}
                      id={tag.id}
                      type={tag.name}
                      onSubmit={handleChangeAttribute}
                      onDelete={handleDeleteAttribute}
                    />
                  ))}
                </div>
            </AppWindow>
            
        </div>
        

    )
}

export default AdminTags;