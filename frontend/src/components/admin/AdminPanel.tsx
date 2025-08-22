import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import PendingUser from "../UI/admin/PendingUser";
import user from "../../types/user";
import LoadingScreen from "../UI/LoadingScreens/LoadingScreen";

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<user[]>([]);
  const [loading, setLoading] = useState(true);
  const [awaitingAction, setAwaitingAction] = useState(false);

  const handleAcceptUser = async (id: number) => {
    setAwaitingAction(true);
    try {
      const response = await axios.put('/admin/accept-new-user.php', { target_user_id: id });
      if (response.status === 200 && response.data.status === "success") {
        setUsers(users.filter(user => user.id !== id));
      } else {
        alert("Error al aceptar el usuario. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error(error);
      alert("Error al aceptar el usuario. Por favor, intenta de nuevo.");
    }
    setAwaitingAction(false);
  };

  const handleRejectUser = async (id: number, type: number) => {
    setAwaitingAction(true);
    try {
      const response = await axios.put('/admin/reject-new-user.php', { target_user_id: id, target_user_type: type });
      if (response.status === 200 && response.data.status === "success") {
        setUsers(users.filter(user => user.id !== id));
      } else {
        alert("Error al rechazar el usuario. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error(error);
      alert("Error al rechazar el usuario. Por favor, intenta de nuevo.");
    }
    setAwaitingAction(false);
  };

  const loadUsers = async () => {
    try {
      const response = await axios.get('/admin/get-undefined-users.php');
      if (response.status === 200 && response.data.status === "success") {
        setLoading(false);
        setUsers(response.data.data.users);
      } else {
        alert("Error al cargar los usuarios. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <NavBar />
      <AppWindow
        height={600}
        width={1234}
        className="feedbox"
        style={{
          position: "absolute",
          left: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
          top: `${TranslateFigmaCoords.translateFigmaY(100)}px`,
          overflowY: "scroll",
          maxHeight: `${TranslateFigmaCoords.translateFigmaX(480)}px`,
          borderTopRightRadius: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
          borderBottomRightRadius: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
        }}
      >
        <div style={{ padding: `${TranslateFigmaCoords.translateFigmaX(16)}px` }}>
          <h1 style={{ textAlign: "center", color: "#305894" }}>Solicitudes de Registro</h1>

          <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
            <div
              style={{
                width: `${TranslateFigmaCoords.translateFigmaX(1100)}px`,
                display: "flex",
                borderRadius: `${TranslateFigmaCoords.translateFigmaX(30)}px`,
                border: `${TranslateFigmaCoords.translateFigmaX(2)}px solid #5386FF`,
                backgroundColor: "#E5E8F6",
                overflow: "hidden",
              }}
            >
              {["Nombre", "Edad", "Localidad", "Email", "Portfolio", "Tipo de Usuario"].map((title, index) => (
                <div
                  key={title}
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: `${TranslateFigmaCoords.translateFigmaX(6)}px 0`,
                    fontWeight: "bold",
                    color: "#305894",
                    fontSize: "medium",
                    borderLeft: index === 0 ? "none" : `${TranslateFigmaCoords.translateFigmaX(2)}px solid #5386FF`,
                  }}
                >
                  {title}
                </div>
              ))}
            </div>
          </div>

          {users.length === 0 ? (
            <p style={{ textAlign: 'center', color: "#305894" }}>No hay solicitudes de registro.</p>
          ) : (
            users.map((user) => (
              <PendingUser
                key={user.id}
                user={user}
                onApprove={handleAcceptUser}
                onReject={handleRejectUser}
              />
            ))
          )}
        </div>
      </AppWindow>

      {/* Overlay */}
      {awaitingAction && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            border: "6px solid #305894",
            borderTop: "6px solid #5386FF",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }} />
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default AdminPanel;
