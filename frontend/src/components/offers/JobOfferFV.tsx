import React, { useEffect, useState } from "react";
import AppWindow from "../UI/AppWindow";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import type { offer } from "../../types/JobOfferTypes";
import close_icon from "../../assets/icons/close.svg";
import NavBar from "../UI/NavBar";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import ActionButton from "../UI/ActionButton";
import { user } from "../../types/user";
import TextWithBreaks from "../UI/TextWithBreaks";
import User from "../session/User";
import ProfilePicture from "../UI/user/ProfilePicture";
import defaultError from "../../global/messages/defaultError";
import StateButton from "../UI/StateButton";
import { usePostulate } from "../../hooks/user/usePostulate";
import apply_icon from "../../assets/icons/apply.svg";
import deapply_icon from "../../assets/icons/deapply.svg";

const JobOfferFV: React.FC = () => {
    // State variables for job offer data
    const { offerId, message, type, showReviewButton: showReviewParam } = useParams<{ offerId: string; message: string; type: string; showReviewButton?: string }>();
    const iType = type ? parseInt(type, 10) : undefined;
    const numericOfferId = offerId ? parseInt(offerId, 10) : NaN;
    const [jobOffer, setJobOffer] = useState<offer | null>(null);
    const [author, setAuthor] = useState<user | null>(null);
    const [offerLoading, setOfferLoading] = useState(true);
    const { postulated, setPostulated, postulate, depostulate } = usePostulate(numericOfferId);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const response = await axios.get(`/feed/job-offer.php?id=${offerId}`);
                if (response) setJobOffer(response.data.data);
            } catch (error) {
                if (axios.isAxiosError(error)) return alert(error.response?.data?.message || defaultError);
                alert(defaultError);
            } finally {
                setOfferLoading(false);
            }
        };
        fetchOffer();
    }, [offerId]);

    useEffect(() => {
        const fetchAuthor = async () => {
            if(!jobOffer) return;
            setOfferLoading(true);
            try {
                const response = await axios.get(`/user/user-info.php?id=${jobOffer?.creator_id}`);
                if (response) setAuthor(response.data.data.user as user);
            } catch (error) {
                if (axios.isAxiosError(error)) return alert(error.response?.data?.message || defaultError);
                alert(defaultError);
            } finally {
                setOfferLoading(false);
            }
        };
        fetchAuthor();
    }, [jobOffer]);
    
    if (!offerId || isNaN(numericOfferId)) return <div>ID de oferta inválido.</div>;
    if (offerLoading) return <div>Cargando...</div>;
    if (!jobOffer) return <div>No se encontró la oferta.</div>;

    // Botón para reseñar si el estado de la oferta es 1, o si se pasa por params
    let showReviewButton = false;
    if (typeof showReviewParam !== 'undefined') {
        showReviewButton = showReviewParam === 'true';
    } else if (typeof showReviewParam === 'undefined') {
        showReviewButton = false;
    }

    return (<>
        <NavBar />
        <AppWindow width={1240} height={607} style={{
            position: "absolute",
            top: TranslateFigmaCoords.translateFigmaY(100),
            left: "50%",
            transform: "translateX(-50%)",
        }}>
            <AppWindow width={1200} height={566} style={{
                position: "absolute",
                top: TranslateFigmaCoords.translateFigmaY(20),
                left: "50%",
                transform: "translateX(-50%)",
            }}
                className="job-offer">
                <div
                    className="title"
                    style={{
                        width: "100%",
                        height: `${TranslateFigmaCoords.translateFigmaY(60)}px`,
                        display: "flex",
                        position: "absolute",
                        flexDirection: "row",
                        columnGap: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                        alignItems: "center",
                    }}>
                    {author ? (
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            columnGap: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                        }}>    
                            <ProfilePicture userId={author.id} size={40} style={{marginLeft: `${TranslateFigmaCoords.translateFigmaX(10)}px`}}/>
                            <span style={{ fontSize: `${TranslateFigmaCoords.translateFigmaX(24)}px`, fontWeight: 600 }}>{author.name}</span>
                        </div>
                    ) : (<p>Cargando...</p>)}
                    <img src={close_icon} alt="close" style={{
                        marginRight: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                        cursor: "pointer",
                        width: `${TranslateFigmaCoords.translateFigmaX(34)}px`,
                        height: `${TranslateFigmaCoords.translateFigmaX(34)}px`,
                        position: "absolute",
                        right: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                        top: "50%",
                        transform: "translateY(-50%)",
                    }} onClick={() => {
                        navigate("/");
                    }} />
                </div>
                <AppWindow width={1200} height={503} style={{
                    position: "absolute",
                    top: TranslateFigmaCoords.translateFigmaY(63),
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                }}>
                    {!message || !iType ? null : (
                        <div className="offer-fv-message" style={{
                            backgroundColor: iType !== 5 ? "#1BD731" : "#D43D3D",
                            height: `${TranslateFigmaCoords.translateFigmaY(40)}px`,
                            width: "100%",
                            position: "absolute",
                            top: 0,
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            fontWeight: 500,
                        }}>
                            <span style={{
                                marginLeft: `${TranslateFigmaCoords.translateFigmaX(10)}px`
                            }}>{message}</span>
                        </div>
                    )}
                    <div className="text" style={{
                        marginBottom: `${TranslateFigmaCoords.translateFigmaY(5)}px`,
                        marginTop: !message ? 0 : `${TranslateFigmaCoords.translateFigmaY(40)}px`
                    }}>
                        <span className="offer-title">{jobOffer.title}</span>
                        <br />
                        <div className="offer-fv-description-delimiter" style={{ marginBottom: `${TranslateFigmaCoords.translateFigmaY(4)}px` }}></div>
                        <div style={{
                            width: `${TranslateFigmaCoords.translateFigmaX(1154)}px`,
                            height: `${TranslateFigmaCoords.translateFigmaY(350)}px`,
                            paddingRight: `${TranslateFigmaCoords.translateFigmaX(24)}px`,
                            overflowY: "auto"
                        }}
                            className="scrollbar">
                            <TextWithBreaks text={jobOffer.description} />
                        </div>
                        <div className="offer-fv-description-delimiter" style={{ marginTop: `${TranslateFigmaCoords.translateFigmaY(4)}px` }}></div>
                        {iType === 4 || iType === 5 ? null : (
                            // If notification type is 4 or 5, hide Deapply button
                            showReviewButton ? author && (
                                <ActionButton
                                    text={`Reseñar a ${author.name || "usuario"}`}
                                    height={40}
                                    style={{ marginTop: `${TranslateFigmaCoords.translateFigmaY(12)}px`, backgroundColor: "#3a3a7c", color: "#fff" }}
                                    action={() => {
                                        navigate(`/review/${author.id}/${encodeURIComponent(author.name)}/${User.data.id}/${encodeURIComponent(User.data.name)}`);
                                    }}
                                />
                            ) :
                                (
                                    <StateButton
                                        trueIcon={apply_icon}
                                        falseIcon={deapply_icon}
                                        trueText="Postularse"
                                        falseText="Despostularse"
                                        state={postulated as boolean}
                                        setState={setPostulated}
                                        action={() => {
                                            if (postulated) return depostulate();
                                            postulate();
                                        }}
                                    />
                                )
                        )
                        }


                    </div>
                </AppWindow>
            </AppWindow>
        </AppWindow>
    </>
    );

};

export default JobOfferFV;