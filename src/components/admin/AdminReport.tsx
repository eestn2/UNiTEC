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
      reportedUser: "usuarioInfractor@gmail.com",
      reportingUser: "reporter@example.com",
    },
  ];

  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
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
        <h1 style={{ textAlign: "center", color: "#305894" }}>
          Listado de Reportes
        </h1>

        {/* Encabezado */}
        <div
          style={{
            display: "flex",
            fontWeight: "bold",
            margin: "10px 20px",
            padding: "10px",
            border: "2px solid #87a5f8",
            borderRadius: "10px",
            backgroundColor: "#d9e3ff",
          }}
        >
          <div style={{ width: "50%", textAlign:"center" }}>Usuario reportado</div>
          <div style={{ width: "50%", textAlign:"center" }}>Usuario que reporta</div>
        </div>

        {/* Lista de reportes */}
        {reports.map((report) => (
          <div
            key={report.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#f0f4ff",
              margin: "10px 20px",
              padding: "10px",
              borderRadius: "12px",
              border: "2px solid #87a5f8",
            }}
          >
            {/* Columna: Usuario reportado */}
            <div style={{ width: "50%", display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "#7893e0",
                  marginRight: "10px",
                }}
              ></div>
              <span>{report.reportedUser}</span>
              <button
                style={{
                  backgroundColor: "#facc15",
                  borderRadius: "8px",
                  padding: "5px 10px",
                  fontWeight: "bold",
                }}
              >
                Ver Perfil
              </button>
              <button
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  borderRadius: "8px",
                  padding: "5px 10px",
                  fontWeight: "bold",
                }}
              >
                Banear
              </button>
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                🗑️
              </button>
            </div>

            {/* Columna: Usuario que reporta y botones */}
            <div
              style={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <span>{report.reportingUser}</span>
              
            </div>
          </div>
        ))}
      </AppWindow>
    </div>
  );
};

export default AdminReport;
