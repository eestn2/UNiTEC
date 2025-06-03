import React, { useEffect, useState } from "react";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import ReportRow from "../UI/admin/ReportRow";

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
        <ReportRow>
          
        </ReportRow>

        
      </AppWindow>
    </div>
  );
};

export default AdminReport;
