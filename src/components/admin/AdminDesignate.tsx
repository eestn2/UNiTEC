import React, { useEffect, useState } from "react";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";

const AdminDesignate: React.FC = () => {
    const [admins, setAdmins] = useState<string[]>([]);
    const [newAdmin, setNewAdmin] = useState("");

    const handleAdd = () => {
        if (newAdmin && !admins.includes(newAdmin)) {
        setAdmins([...admins, newAdmin]);
        setNewAdmin("");
        }
    };

    const handleRemove = (admin: string) => {
        setAdmins(admins.filter(a => a !== admin));
    };

    useEffect(() => {
        // Simulación de carga inicial
        setAdmins(["NombreUsuario123", "NombreUsuario123", "NombreUsuario123"]);
    }, []);

    return (
         <div>
      <NavBar />
      <AppWindow
        height={500}
        width={800}
        className="admin-box"
        style={{
          margin: "0 auto",
          marginTop: "100px",
          background: "white",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#305894" }}>Designar Administradores</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Ingrese el correo electrónico"
            value={newAdmin}
            onChange={(e) => setNewAdmin(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              width: "60%",
            }}
          />
          <button
            onClick={handleAdd}
            style={{
              padding: "10px 20px",
              backgroundColor: "#305894",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Agregar
          </button>
        </div>
        <h3 style={{ color: "#305894", textAlign: "center" }}>Lista de Administradores</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
          {admins.map((admin, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 20px",
                border: "2px solid #305894",
                borderRadius: "20px",
              }}
            >
              <span>{admin}</span>
              <button
                onClick={() => handleRemove(admin)}
                style={{
                  backgroundColor: "#d9534f",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Remove Administrator
              </button>
            </div>
          ))}
        </div>
      </AppWindow>
    </div>

    )
}

export default AdminDesignate