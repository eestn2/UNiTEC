import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

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
                <h1 style={{ textAlign: "center", color: "#305894" }}>Listado de Usuarios No Habilitados</h1>
                <div style={{ padding: '1rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f0f4fa' }}>
                                <th style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>ID</th>
                                <th style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>Nombre</th>
                                <th style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>Email</th>
                                <th style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>Fecha de nacimiento</th>
                                <th style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>Ubicación</th>
                                <th style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>Descripción</th>
                                <th style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>Última actividad</th>
                                <th style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>Foto de perfil</th>
                                <th style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>Portafolio</th>
                                <th style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>Tipo de usuario</th>
                                <th style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr><td colSpan={11} style={{ textAlign: 'center', padding: `${TranslateFigmaCoords.translateFigmaX(16)}px` }}>No hay usuarios no habilitados.</td></tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>{user.id}</td>
                                        <td style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>{user.name}</td>
                                        <td style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>{user.email}</td>
                                        <td style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>{user.birth_date}</td>
                                        <td style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>{user.location}</td>
                                        <td style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>{user.description}</td>
                                        <td style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>{user.last_active_date}</td>
                                        <td style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>
                                            {user.profile_picture ? <img src={user.profile_picture} alt="profile" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%' }} /> : '-'}
                                        </td>
                                        <td style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>{user.portfolio}</td>
                                        <td style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>{user.user_type_id}</td>
                                        <td style={{ border: '1px solid #ccc', padding: `${TranslateFigmaCoords.translateFigmaX(8)}px` }}>{user.status_id}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </AppWindow>
        </>
    );
};

export default AdminPanel;