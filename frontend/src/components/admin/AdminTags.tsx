import axios from "axios";
import {  useEffect, useState } from "react";
import AttributeEditor from "../UI/admin/AttributeEditor";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";




const AdminTags: React.FC = () => {
  const [tags, setTags] = useState<any[]>([]);
  const handleDeleteAttribute = async (id: number) => {
      try {
        const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
        await axios.delete(`${apiUrl}/admin/delete_tag.php`, {
          data: {
            id: id,
          }
        });
        // Remove the deleted tag from state
        setTags(prevTags => prevTags.filter(tag => tag.id !== id));
      } catch (error) {
        console.error("Failed to delete tag:", error);
        alert("Error deleting tag. Please try again.");
      }
    };
      const handleChangeAttribute = async (attribute: string, id: number) => {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.put(`${apiUrl}/admin/edit_tag.php`, {
          id:id,
          name:attribute
      });
    console.log(response);
    };
    const loadAttributes = async () => {
      try {
        const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
        const response = await axios.get(`${apiUrl}/function/get-tags.php`);
        if (response.status !== 200 && response.data.status !== "success") {
          console.error("Failed to load tags:", response.data.message);
        } else {
          setTags(response.data.data.tags);
        }
      } catch (error) {
        console.error("An error occurred while loading tags:", error);
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