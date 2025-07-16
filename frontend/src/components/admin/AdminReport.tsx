import React, { useEffect, useState } from "react";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import ReportRow from "../UI/admin/ReportRow";
import axios from "axios";
import { getReportReason } from "../../global/function/getReportReason";
import { useNavigate } from "react-router-dom";

interface Report {
  id: number;
  reported_id: number;
  reported_email: string;
  reporter_id: number;
  reporter_email: string;
  reason: number;
}

const AdminReport: React.FC = () => {

  const [reports, setReports] = useState<Report[]>([]);
  const navigate = useNavigate();
    
  const loadReports = async () => {
    try {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/admin/get-reports.php`);
        if (response.status !== 200 || response.data.status !== "success") {
          console.error("Failed to load reports:", response.data.message);
        } else {
          const reportsList = response.data.data.reports.map((report: any) => ({
            id: report.id,
            reported_id: report.reported_id,
            reporter_id: report.reporter_id,
            reported_email: report.reported_email,
            reporter_email: report.reporter_email,
            reason: report.reason,
          }));
          setReports(reportsList);
        }
    } catch (error) {
      console.error("An error occurred while loading reports:", error);
    }
  };

  const handleDiscardReport = async (id: number) => {
        const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.delete(`${apiUrl}/admin/delete_report.php`, {
        data :{id :id  }
      })
      if (response.status !== 200 || response.data.status !== "success") {
        console.error("Failed to discard report:", response.data.message);
      } else {
        console.log("Report discarded successfully:", response.data.message);
        await loadReports(); 
      }

  }

  const handleBanUser = async ( reportedId: number ,id: number) => {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.delete(`${apiUrl}/admin/ban_user.php`, {
        data :{
          reportId: id,
          id :reportedId  }
      })
      if (response.status !== 200 || response.data.status !== "success") {
        console.error("Failed to discard report:", response.data.message);
      } else {
        console.log("Report discarded successfully:", response.data.message);
        await loadReports(); 
      }
  }


  useEffect(() => {
    loadReports();
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
         {reports.length === 0 ? (
            <p style={{ textAlign: 'center', color:"#305894" }}>No hay reportes.</p>
        ) : (

        reports.map((report) => (
          <ReportRow
            key={report.id}
            id={report.id}
            reportedUserId={report.reported_id}
            reporterUserId={report.reporter_id}
            reportedEmail={report.reported_email}
            reporterEmail={report.reporter_email}
            reportDescription={getReportReason(report.reason)}
            onClickSeeProfile={(userId) => {
              navigate(`/profile/${userId}`);
            }}
            onClickBan={(reportedId, id) => {
               handleBanUser(reportedId, id);
              alert(`Baneando al usuario con ID: ${reportedId}`);
            }}
            onClickDiscard={(Id) => {
              
              handleDiscardReport(Id);
             
              alert(`Descartando reporte`);
            }}
          />
        ))
      )}
      </AppWindow>
    </div>
  );
};

export default AdminReport;
