import React, { useState, useEffect } from "react";
import ConfirmModal from "../Modals/ConfirmModal";
import defaultProfileImage from '../../../assets/defaults/profile-picture/1.svg';
import axios, { isAxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ActionButton from "../ActionButton";
import TextBox from "../form/TextBox";
import AppWindow from "../AppWindow";
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import NavBar from "../NavBar";
import defaultError from "../../../global/messages/defaultError";

const UserReview: React.FC = () => {
    const { reviewedId } = useParams();
    const [reviewText, setReviewText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [profileImage, setProfileImage] = useState<string>(defaultProfileImage);
    const [reviewedName, setReviewedName] = useState("Cargando...");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const navigate = useNavigate();

    // Cargar la imagen de perfil del usuario reseñado
    useEffect(() => {
        if (reviewedId) {
            (async () => {
                try {
                    const response = await axios.get(`/user/user-info.php?id=${reviewedId}`);
                    if (response) {
                        setProfileImage(response.data.data.profile_picture ?? defaultProfileImage)
                        setReviewedName(response.data.data.name);
                    }
                } catch (error) {
                    if (isAxiosError(error)) return alert("No se pudo cargar el nombre o foto de perfil del usuario. Por favor, recargue la pestaña.")
                    alert(defaultError)
                }
            })();
        }
    }, [reviewedId]);

    const handleSendReview = async () => {
        if (!reviewText.trim()) return setError("La reseña no puede estar vacía.");
        setShowConfirmModal(true);
    };

    const confirmSendReview = async () => {
        setLoading(true);
        setError(null);
        try { 
            const response = await axios.post("/user/create-review.php", {
                reviewed_id: Number(reviewedId),
                text: reviewText.trim()
            });
            if (response) {
                setSuccess(true);
                setShowConfirmModal(false);
                navigate(-1);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) return setError(error.response?.data?.message || defaultError);
            setError(defaultError);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setReviewText("");
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

                <h2 style={{
                    textAlign: "center",
                    color: "#305894",
                    padding: 0,
                    marginTop: 0,
                    marginBottom: 5,
                    fontSize: `${TranslateFigmaCoords.translateFigmaX(30)}px`,
                    fontWeight: 600
                }}>
                    Generar una Reseña
                </h2>

                <div style={{
                    fontSize: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                    border: "solid #5386FF",
                    borderWidth: `${TranslateFigmaCoords.translateFigmaX(3)}px`,
                    borderRadius: 16,
                    padding: 18,
                    marginBottom: 10,
                    position: "relative",
                    overflow:'hidden',
                    maxHeight:  `${TranslateFigmaCoords.translateFigmaX(375)}px`,
                }}>
                    <div style={{ marginBottom: 12 }}>
                        <span style={{ color: "#305894", fontWeight: 600 }}>Usuario a reseñar:</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                            <img
                                src={profileImage || defaultProfileImage}
                                alt="Perfil reseñado"
                                style={{
                                    width: `${TranslateFigmaCoords.translateFigmaX(30)}px`,
                                    height: `${TranslateFigmaCoords.translateFigmaX(30)}px`,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    display: "inline-block"
                                }}
                                onError={e => {
                                    (e.target as HTMLImageElement).src = defaultProfileImage;
                                }}
                            />
                            <span style={{ color: "#6F88B3", fontWeight: 600 }}>
                                {decodeURIComponent(reviewedName || '')}
                            </span>
                            <button
                                style={{
                                    marginLeft: "auto",
                                    background: "#FFD600",
                                    color: "#3a3a7c",
                                    border: "none",
                                    borderRadius: 50,
                                    padding: "4px 12px",
                                    fontWeight: 600,
                                    cursor: "pointer"
                                }}
                                onClick={() => {
                                    if (reviewedId) navigate(`/profile/${reviewedId}`);
                                }}
                            >
                                Ver Perfil
                            </button>
                        </div>
                    </div>

                    <div style={{
                        marginBottom: 5,
                        backgroundColor: "#DEE0EB",
                        paddingTop: 10,
                        borderRadius: 20,
                        overflow: "hidden", 
                    }}>
                        <span style={{ color: "#113893", fontWeight: 600, paddingLeft: 15,
                           }}>Reseña:</span>
                        <TextBox
                            name="reviewText"
                            value={reviewText}
                            onChange={e => setReviewText(e.target.value)}
                            placeholder="Ingrese el contenido de su reseña"
                            width={"100%"}
                            height={250}
                        />
                    </div>

                    {error && <div style={{ color: "#D43D3D", textAlign: "center",marginBottom: `${TranslateFigmaCoords.translateFigmaX(-10)}px`,fontSize: `${TranslateFigmaCoords.translateFigmaX(15)}px`}}>{error}</div>}
                    {success && <div style={{
                        color: "#008000",
                        marginBottom: 8,
                        textAlign: "center",
                        position:'absolute',bottom: `${TranslateFigmaCoords.translateFigmaX(15)}px` ,
                        fontSize: `${TranslateFigmaCoords.translateFigmaX(15)}px`
                    }}>
                        ¡Reseña enviada con éxito!
                    </div>}

                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 5,
                    marginBottom: 15,
                    gap: 20,
                    fontSize: `${TranslateFigmaCoords.translateFigmaX(15)}px`
                }}>
                    <ActionButton
                        height={50}
                        width={190}
                        action={() => handleCancel()}
                        style={{
                            background: "#D43D3D",
                            color: "#fff",
                            border: "none",
                            borderRadius: 100,
                            padding: "10px 24px",
                            fontWeight: 600,
                            fontSize: 16,
                            cursor: "pointer"
                        }}
                        text="Deshacer Reseña"
                    />
                    <ActionButton
                        height={50}
                        width={190}
                        action={handleSendReview}
                        style={{
                            background: "#3D8AF0",
                            color: "#fff",
                            border: "none",
                            borderRadius: 100,
                            padding: "10px 24px",
                            fontWeight: 600,
                            fontSize: 16,
                            cursor: "pointer"
                        }}
                        text={loading ? "Enviando..." : "Enviar Reseña"}
                    />
                </div>
                <div style={{
                    textAlign: "center",
                    color: "#6F88B3",
                    fontSize: 15,
                    marginTop: 0,
                    fontWeight: 600
                }}>
                    Esta reseña se le hará llegar solo a los administradores de UNiTEC. Le agradecemos su aporte.
                </div>

            </AppWindow>
            {showConfirmModal && (
                <ConfirmModal
                    title="¿Desea publicar esta reseña?"
                    message={"Una vez publicada, no podrá editar el contenido."}
                    onAccept={confirmSendReview}
                    onReject={() => setShowConfirmModal(false)}
                    onClose={() => setShowConfirmModal(false)}
                />
            )}
        </>
    );
};

export default UserReview;
