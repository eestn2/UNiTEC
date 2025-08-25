import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import { useNavigate } from "react-router-dom";
import "../offers/SeeApplicants.css";
import User from "../session/User";
import LoadingScreen from "../UI/LoadingScreens/LoadingScreen";

type Application = {
  applicant_id: number;
  application_id: number;
  title: string;
  description: string;
  date: string;
  application_status: string;
};

const OffersPustulated: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const userId = User.data.id;
        const { data: response } = await axios.get(`/user/get-user-applications.php?user_id=${userId}`);
        if (response.status === "success" && response.data) {
          setApplications(response.data);
        } else {
          setError("No se encontraron postulaciones.");

        }
      } catch {
        setError("Error al cargar postulaciones.");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  return (
    <>
      <NavBar />
      <AppWindow
        width={1200}
        height={630}
        style={{
          position: "relative",
          top: `${TranslateFigmaCoords.translateFigmaY(80)}px`,
          left: "50%",
          transform: "translate(-50%, 0%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: `${TranslateFigmaCoords.translateFigmaY(10)}px`,
          overflow: "hidden",
          maxHeight: "1px",
          color: 'black'
        }}
      >

        <div className="Contenedor scroll">
          {loading && <LoadingScreen loadingContent={true} />}
          {error && <p>{error}</p>}
          {!loading && !error && applications.length === 0 && (
            <p>No tienes postulaciones activas.</p>
          )}
          {!loading && !error && applications.map((app) => (
            <div key={app.application_id} className="offer-block">
              <button
                className="offer-header"
                onClick={() => navigate(`/job-offer/${app.application_id}`)}
                style={{ position: 'relative', overflow: 'visible' }}
              >
                <span className="texto-truncado" style={{ maxWidth: '80%' }}>{app.title}</span>
                <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', right: `${TranslateFigmaCoords.translateFigmaY(10)}px`, gap: '10px' }}>
                  <span style={{
                    fontWeight: 500, 
                    lineHeight: '1',
                    display: 'inline-block',  
                    padding: 0,
                    margin: 0,
                    fontSize: `${TranslateFigmaCoords.translateFigmaY(25)}px`,
                  }}>
                    {Number(app.application_status) === 1 ? "Aceptado" : Number(app.application_status) === 0 ? "Pendiente" : "Rechazado"}
                  </span>
                  <div style={{
                    ...Number(app.application_status) === 1 ? { backgroundColor: "var(--success)" } : Number(app.application_status) === 0 ? { backgroundColor: "#FF7553" } : {  backgroundColor: "#FF5353"},
                    width: `${TranslateFigmaCoords.translateFigmaY(15)}px`,
                    height: `${TranslateFigmaCoords.translateFigmaY(15)}px`,
                    borderRadius: '50%'
                  }}></div>
                </div>

              </button>
            </div>
          ))}
        </div>
      </AppWindow>
    </>
  );
};

export default OffersPustulated;