import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import { useNavigate } from "react-router-dom"; 
import styles from "../offers/SeeApplicants.module.css";
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
      <div className={`${styles['app-window']} app-window`}>   
         <span className={`${styles['top-title']} top-section title`} >
                   Tus postulaciones
                </span>  
  <div className={`${styles.Contenedor} ${styles.scroll}`}> 
          {loading && <LoadingScreen loadingContent={true} />}
          {error && <p>{error}</p>}
          {!loading && !error && applications.length === 0 && (
            <p>No tienes postulaciones activas.</p>
          )}
          {!loading && !error && applications.map((app) => (
            <div key={app.application_id} className={styles["offer-block"]}>
              <button
                className={styles["offer-header"]}
                onClick={() => {
                  const showReview = Number(app.application_status) === 1 ? 'true' : '';
                  navigate(`/job-offer/${app.application_id}/${showReview}`);
                }}
                style={{ position: 'relative', overflow: 'visible' }}
              >
                <span className={styles["texto-truncado"]} >{app.title}</span>
                <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', right: '10px', gap: '10px' }}>
                  <span style={{
                    fontWeight: 500, 
                    lineHeight: '1',
                    display: 'inline-block',  
                    padding: 0,
                    margin: 0, 
                  }}>
                    {Number(app.application_status) === 1 ? "Aceptado" : Number(app.application_status) === 0 ? "Pendiente" : "Rechazado"}
                  </span>
                  <div style={{
                    ...Number(app.application_status) === 1 ? { backgroundColor: "var(--success)" } : Number(app.application_status) === 0 ? { backgroundColor: "var(--delimiters)" } : {  backgroundColor: "#FF5353"},
                    width: '15px',
                    height:'15px',
                    borderRadius: '50%'
                  }}></div>
                </div>

              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OffersPustulated;