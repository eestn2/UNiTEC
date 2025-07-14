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


  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const mockData: Report[] = [
      {
        id: 1,
        reportedUser: "usuarioInfractor@gmail.com",
        reportingUser: "reporter@example.com",
      },
    ];
    setReports(mockData);
    // make the compiler stop bitching about the unused variable
    console.log(reports);
  }, [reports]);

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
            fontWeight: "semibold",
            margin: `${TranslateFigmaCoords.translateFigmaX(10)}px ${TranslateFigmaCoords.translateFigmaX(20)}px`,
            padding: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
            border: `${TranslateFigmaCoords.translateFigmaX(3)}px solid #5386FF`,
            borderRadius: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
            backgroundColor: "#DEE0EB",
          }}
        >
          <div style={{ width: "50%", textAlign:"center", color:"#6F88B3" }}>Usuario reportado</div>
          <div style={{ width: "50%", textAlign:"center", color:"#6F88B3",}}>Usuario que reporta</div>
        </div>
        <ReportRow>
          
        </ReportRow>

        
      </AppWindow>
    </div>
  );
};

export default AdminReport;
