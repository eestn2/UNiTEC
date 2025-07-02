import React, { useEffect, useState } from "react";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import axios from "axios";
import ActionButton from "../UI/ActionButton";
import SearchBar from "../UI/admin/SearchBar";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

const AdminDesignate: React.FC = () => {
    type Admin = {
      id: number;
      email: string;
      name: string;
    };
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const loadAdmins = async () => {
      try {
        const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
        const response = await axios.get(`${apiUrl}/admin/get-admins.php`,
          {withCredentials: true,});

        if (response.status !== 200 || response.data.status !== "success") {
          console.error("Failed to load admins:", response.data.message);
        } else {
          const adminsList = response.data.data.admins.map((admin: any) => ({
            id: admin.id,
            email: admin.email,
            name: admin.name,
          }));
          setAdmins(adminsList);
        }
      } catch (error) {
        console.error("An error occurred while loading admins:", error);
      }
    };
    const handleAdd = async (attribute: string) => {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.post(`${apiUrl}/admin/add_admin.php`, {
          admin_email:attribute,
          withCredentials: true,
      });
      console.log(response);
      await loadAdmins();
   };

    const handleRemove = async (id: number) => {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.delete(`${apiUrl}/admin/delete_admin.php`, {
          data:{
            id:id,}
      }); 
      console.log(response);
     await loadAdmins();
    };
    const handleLoadSuggestions = async (input: string) => {
      if (input.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
        const response = await axios.get(`${apiUrl}/admin/get-users-by-email.php`, {
          params: { email: input },
          withCredentials: true,
        });
        if (response.data.status === "success") {
          setSuggestions(response.data.data.users.map((u: any) => `${u.email}`));
        } else {
          setSuggestions([]);
        }
      } catch (e) {
        setSuggestions([]);
      }
    };
    useEffect(() => {
        loadAdmins();
    }, []);

    return (
         <div>
      <NavBar />
      <AppWindow
        height={500}
        width={480}
        className="admin-box"
        style={{
          margin: "0 auto",
          marginTop: `${TranslateFigmaCoords.translateFigmaX(100)}px`,
          background: "white",
          borderRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
          padding: `${TranslateFigmaCoords.translateFigmaX(30)}px`,
          boxShadow: `0px 0px ${TranslateFigmaCoords.translateFigmaX(15)}px rgba(0,0,0,0.1)`,
        }}
      >
        <h2 style={{ textAlign: "center", color: "#305894" }}>Designar Administradores</h2>
        <SearchBar
          placeholder="Ingrese el correo "
          buttonText="Agregar"
          onSubmit={(value) => {
            alert(`Agregaste a: ${value}`);
            handleAdd(value);
          }}
          onInputChange={handleLoadSuggestions}
          suggestions={suggestions}
          style={{ marginBottom: `${TranslateFigmaCoords.translateFigmaX(20)}px`,  }}
        />
        <h2 style={{ color: "#305894", textAlign: "center" }}>Lista de Administradores</h2>
        <div style={{ display: "flex", flexDirection: "column",
          gap: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
          marginTop: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
          overflowY: "scroll",
          maxHeight: `${TranslateFigmaCoords.translateFigmaX(200)}px`}}>
        {admins.map((admin) => (
          <div
            key={admin.id}
            style={{
              color: "#6F88B3",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: `${TranslateFigmaCoords.translateFigmaX(4)}px ${TranslateFigmaCoords.translateFigmaX(20)}px`,
              border: `${TranslateFigmaCoords.translateFigmaX(1)}px solid #5386FF`,
              borderRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
            }}
          >
            <span>{admin.name} ({admin.email})</span>
            <ActionButton
              style={{
                backgroundColor: "#D43D3D",
                color: "white",
                border: "none",
                padding: `${TranslateFigmaCoords.translateFigmaX(15)}px ${TranslateFigmaCoords.translateFigmaX(22)}px`,
                borderRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                cursor: "pointer",
              }}
              text={"Remover"}
              action={() => {
              alert(`Eliminaste a ${admin.name}`);
              handleRemove(admin.id);}}>
            </ActionButton>
          </div>
        ))}
        </div>
      </AppWindow>
    </div>

    )
}

export default AdminDesignate