import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import { calculateAge } from "../../global/function/calculateAge";
import ActionButton from "../UI/ActionButton";
const AdminPanel: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const loadUsers = async () => {
        try {
            const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
            const response = await axios.get(`${apiUrl}/admin/get-undefined-users.php`);
            if (response.status === 200 && response.data.status === "success") {
                setUsers(response.data.data.users);
            } else {
                console.error("Failed to load users:", response.data.message);
            }
        } catch (error) {
            console.error("An error occurred while loading users:", error);
        }
    };
    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <>
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
                <div style={{ padding: `${TranslateFigmaCoords.translateFigmaX(16)}px` }}>
                    <h1 style={{ textAlign: "center", color: "#305894" }}>Solicitudes de Registro</h1>

                    {users.length === 0 ? (
                        <p style={{ textAlign: 'center', color:"#305894" }}>No hay solicitudes de registro.</p>
                    ) : (
                        users.map((user) => (
                        <div key={user.id} style={{
                            background: 'white',
                            borderRadius: `${TranslateFigmaCoords.translateFigmaX(15)}px`,
                            padding: `${TranslateFigmaCoords.translateFigmaX(16)}px`,
                            marginBottom: `${TranslateFigmaCoords.translateFigmaX(16)}px`,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            border: '2px solid #305894'
                        }}>
                            <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(6, 1fr)',
                            gridTemplateRows: 'repeat(1, 1fr)',
                            gap: `${TranslateFigmaCoords.translateFigmaX(16)}px`,
                            alignItems: 'center',
                            border: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                            paddingLeft: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                            backgroundColor:'#DEE0EB',
                            color:'#6F88B3',
                            borderRadius: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                            borderWidth :`${TranslateFigmaCoords.translateFigmaX(5)}px`,
                            borderColor: '#305894',
                            borderStyle: 'solid'
                            }}>
                            <div className="users_approve" ><strong>{user.name}</strong></div>
                            <div className="users_approve" style={{                           
                            borderLeftWidth: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                            borderLeftColor: '#305894',
                            borderLeftStyle: 'solid',}}
                            >{calculateAge(user.birth_date)} años</div>
                            <div className="users_approve" style={{                           
                            borderLeftWidth: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                            borderLeftColor: '#305894',
                            borderLeftStyle: 'solid',}}
                            >{user.location}</div>
                            <div className="users_approve" style={{                           
                            borderLeftWidth: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                            borderLeftColor: '#305894',
                            borderLeftStyle: 'solid',}}
                            >{user.email}</div>
                            <div  className="users_approve" 
                            style={{                           
                            borderLeftWidth: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                            borderLeftColor: '#305894',
                            borderLeftStyle: 'solid',}}>{user.portfolio}</div>
                            <div className="users_approve" style={{                           
                            borderLeftWidth: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                            borderLeftColor: '#305894',
                            borderLeftStyle: 'solid',}}>{user.user_type}</div>
                            </div>

                            <div className="users_approve" style={{ marginTop: `${TranslateFigmaCoords.translateFigmaX(5)}px`, display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <ActionButton 
                            text={"Aceptar"}
                            style={{                
                                borderRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                                padding: '12px 16px',}}
                            action={() => alert(`Aceptar ${user.name}`)} 
                            />
                            <ActionButton 
                            text={"Rechazar"}
                            style={{                
                                borderRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                                padding: '12px 16px',
                                backgroundColor: "#F03D3D"}}
                               action={() => alert(`Rechazar ${user.name}`)} 
                            />
                            </div>
                        </div>
                        ))
                    )}
                    </div>
            </AppWindow>
        </>
    );
};

export default AdminPanel;