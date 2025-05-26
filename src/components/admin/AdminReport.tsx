import React, { useEffect, useState } from "react";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

interface Report {
  id: number;
  reportedUser: string;
  reportingUser: string;
}

const AdminReport: React.FC = () => {
    const mockData: Report[] = [
  {
    id: 1,
    reportedUser: "juanito123@gmail.com",
    reportingUser: "maria456@gmail.com",
  },
  {
    id: 2,
    reportedUser: "usuario_toxico@gmail.com",
    reportingUser: "admin@test.com",
  },
  {
    id: 3,
    reportedUser: "troll777@gmail.com",
    reportingUser: "usuarioNormal@gmail.com",
  },
];
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    // TODO: Cargar reportes desde API
    setReports(mockData);
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
        <h1 style={{ textAlign: "center", color: "#305894" }}>Listado de Reportes</h1>

        <div style={{ display: "flex", fontWeight: "bold", margin: "10px 20px" }}>
          <div style={{ width: "50%" }}>Usuario reportado</div>
          <div style={{ width: "50%" }}>Usuario que reporta</div>
        </div>

        {reports.map((report) => (
          <div
            key={report.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#f0f4ff",
              margin: "10px 20px",
              padding: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
              borderRadius: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
              border: "2px solid #87a5f8",
            }}
          >
            <div style={{ width: "50%", display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: `${TranslateFigmaCoords.translateFigmaX(24)}px`,
                  height: `${TranslateFigmaCoords.translateFigmaX(24)}px`,
                  borderRadius: "50%",
                  backgroundColor: "#7893e0",
                  marginRight: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                }}
              ></div>
              <span>{report.reportedUser}</span>
            </div>

            <div style={{ width: "50%", display: "flex", justifyContent: "flex-end", gap: `${TranslateFigmaCoords.translateFigmaX(10)}px` }}>
              <span>{report.reportingUser}</span>
              <button style={{ backgroundColor: "#facc15", borderRadius: `${TranslateFigmaCoords.translateFigmaX(8)}px`, padding: "5px 10px" }}>Ver Perfil</button>
              <button style={{ backgroundColor: "#ef4444", color: "white", borderRadius: `${TranslateFigmaCoords.translateFigmaX(8)}px`, padding: "5px 10px" }}>Banear</button>
              <button style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}>🗑️</button>
            </div>
          </div>
        ))}
      </AppWindow>
    </div>
    )
}

export default AdminReport