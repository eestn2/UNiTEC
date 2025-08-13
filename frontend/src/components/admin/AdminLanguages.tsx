import axios from "axios";
import { useEffect, useState } from "react";
import AttributeEditor from "../UI/admin/AttributeEditor";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

const AdminLanguages: React.FC = () => {
  const [languages, setLanguages] = useState<any[]>([]);

  const handleDeleteAttribute = async (id: number) => {
    try {
      await axios.delete('/admin/delete_language.php', {
        data: { id: id },
      });
      setLanguages(prev => prev.filter(lang => lang.id !== id));
    } catch (error) {
      console.error("Failed to delete language:", error);
      alert("Error deleting language. Please try again.");
    }
  };

  const handleChangeAttribute = async (attribute: string, id: number) => {
    const response = await axios.put('admin/edit_language.php', {
      id: id,
      name: attribute,
    });
    console.log(response);
  };

  const loadAttributes = async () => {
    try {
      const response = await axios.get('/function/get-languages.php');
      if (response.status !== 200 && response.data.status !== "success") {
        console.error("Failed to load languages:", response.data.message);
      } else {
        setLanguages(response.data.data.languages);
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
        <h1 style={{ textAlign: "center", color: "#305894" }}>Listado de Idiomas</h1>
        <div className="admin_attributes_grid">
          {languages.map(lang => (
            <AttributeEditor
              key={lang.id}
              id={lang.id}
              type={lang.name}
              onSubmit={handleChangeAttribute}
              onDelete={handleDeleteAttribute}
            />
          ))}
        </div>
      </AppWindow>
    </div>
  );
};

export default AdminLanguages;