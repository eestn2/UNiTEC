import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppWindow from "../AppWindow";
import ActionButton from "../ActionButton";
import ConfirmModal from "../Modals/ConfirmModal";
import defaultProfileImage from '../../../assets/defaults/profile-picture/1.svg';
import { getReportReason } from '../../../global/function/getReportReason';
import axios from "axios";
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import NavBar from "../NavBar";
import '../../offers/SeeApplicants.css';
const reasons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ReportUser: React.FC = () => {
    const { reportedId, reportedName } = useParams();
    const [selectedReason, setSelectedReason] = useState<number | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [profileImage, setProfileImage] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        if (reportedId) {
            (async () => {
                try {
                    const response = await axios.get(`/user/user-info.php?id=${reportedId}`);
                    if (response.data.status === "success" && response.data.user?.profile_picture) {
                        setProfileImage(response.data.user.profile_picture);
                    } else {
                        setProfileImage(defaultProfileImage);
                    }
                } catch {
                    setProfileImage(defaultProfileImage);
                }
            })();
        }
    }, [reportedId]);

    const handleSendReport = () => {
        if (!selectedReason) {
            setError("Debe seleccionar un motivo para el reporte.");
            return;
        }
        setShowConfirmModal(true);
    };

    const confirmSendReport = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("/user/create-report.php", {
                reported_id: Number(reportedId),
                reason: selectedReason
            });
            if (response.data.status === "success") {
                setSuccess(true);
                setShowConfirmModal(false);
                navigate(-1);
            } else {
                setError(response.data.message || "Error al enviar el reporte.");
            }
        } catch (e: any) {
            setError("Error de conexión o de servidor.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setSelectedReason(null);
        navigate(-1);
    };

    return (
        <>
            <NavBar />
            <AppWindow
                width={640}
                height={630}
                style={{
                    position: "relative",
                    top: `${TranslateFigmaCoords.translateFigmaY(80)}px`,
                    background: "#fff",
                    borderRadius: 20,
                    boxShadow: "0 0 10px #b6b6e0",
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 5,
                    paddingBottom: 5,
                    margin: "auto auto",
                }}>
                <h2 style={{ textAlign: "center", color: "#305894", marginBottom: 16 }}>Reportar</h2>
                <div style={{ border: "2px solid #5386FF", borderRadius: 16, padding: 18, marginBottom: 12, 
                    maxHeight: `${TranslateFigmaCoords.translateFigmaX(350)}px`,overflow: 'hidden' }}>
                    <div style={{ marginBottom: 12, }}>
                        <span style={{ color: "#305894", fontWeight: 600 }}>Usuario a reportar:</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                            <img
                                src={profileImage || defaultProfileImage}
                                alt="Perfil reportado"
                                style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", display: "inline-block" }}
                                onError={e => { (e.target as HTMLImageElement).src = defaultProfileImage; }}
                            />
                            <span style={{ color: "#305894", fontWeight: 600 }}>{decodeURIComponent(reportedName || '')}</span>
                            <button style={{ marginLeft: "auto", background: "#FFD600", color: "#3a3a7c", border: "none", borderRadius: 32, padding: "4px 12px", fontWeight: 600, cursor: "pointer" }} onClick={() => { if (reportedId) navigate(`/profile/${reportedId}`); }}>Ver Perfil</button>
                        </div>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                        <span style={{ color: "#305894", fontWeight: 600 }}>Motivo del reporte:</span>
                        <div style={{
                            border: "2px solid #5386FF",
                            borderRadius: 16,
                            marginTop: 8,
                            maxHeight: `${TranslateFigmaCoords.translateFigmaX(200)}px`,
                            overflowY: 'hidden'
                        }}>
                            <div className="scroll" style={{
                                display: "flex",
                                gap: 10,
                                width: '100%',
                                height: `${TranslateFigmaCoords.translateFigmaX(200)}px`,
                                overflowY: 'scroll',
                                flexDirection: "column",
                                paddingLeft: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                                paddingTop: `${TranslateFigmaCoords.translateFigmaY(12)}px`,
                                paddingBottom: `${TranslateFigmaCoords.translateFigmaY(12)}px`,
                            }}>
                                {reasons.map((reason) => (
                                    <label key={reason} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        fontWeight: 500,
                                        color: selectedReason === reason ? "#3D8AF0" : "#305894"
                                    }}>
                                        <input
                                            type="radio"
                                            name="reportReason"
                                            value={reason}
                                            checked={selectedReason === reason}
                                            onChange={() => setSelectedReason(reason)}
                                            style={{ marginRight: 10 }}
                                        />
                                        {getReportReason(reason as any)}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    {error && <div style={{ color: "#D43D3D", textAlign: "center" }}>{error}</div>}
                    {success && <div style={{ color: "#008000", textAlign: "center" }}>¡Reporte enviado con éxito!</div>}
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 16, gap: 20 }}>
                    <ActionButton
                        height={50}
                        width={190}
                        action={handleCancel}
                        style={{ background: "#D43D3D", color: "#fff", border: "none", borderRadius: 100, padding: "10px 24px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}
                        text="Deshacer Reporte"
                    />
                    <ActionButton
                        height={50}
                        width={190}
                        action={handleSendReport}
                        style={{ background: "#3D8AF0", color: "#fff", border: "none", borderRadius: 100, padding: "10px 24px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}
                        text={loading ? "Enviando..." : "Enviar Reporte"}
                    />
                </div>
                <div style={{ textAlign: "center", color: "#6F88B3", fontSize: 15, marginTop: 10 }}>
                    Este reporte se le hará llegar a los administradores de UNiTEC. Le agradecemos su aporte.
                </div>
            </AppWindow>
            {showConfirmModal && (
                <ConfirmModal
                    title="¿Desea publicar este reporte?"
                    message={"Una vez enviado, no podrá editar el contenido."}
                    onAccept={confirmSendReport}
                    onReject={() => setShowConfirmModal(false)}
                    onClose={() => setShowConfirmModal(false)}
                />
            )}
        </>
    );
};

export default ReportUser;
