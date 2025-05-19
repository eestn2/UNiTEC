import React, { useEffect, useState } from "react";
import AppWindow from "../UI/AppWindow";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import type { offer } from "../../types/JobOfferTypes";
import type { TypedResponse, TypedResponseWNamedArray } from "../../types/Response";
import placeholder from "../../assets/defaults/profile-picture/1.svg";
import close_icon from "../../assets/icons/close.svg";
import NavBar from "../UI/NavBar";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import { useWindowSize } from "../../hooks/responsive/useWindowSize";
import ActionButton from "../UI/ActionButton";
import { user } from "../../types/user";

const JobOfferFV: React.FC = () => {
    // Re-Render on window resize
    const windowSize = useWindowSize();
    console.log("Window size:", windowSize);
    // State variables for job offer data
    const { offerId, message, type } = useParams<{ offerId: string; message: string; type: string }>();
    const iType = type ? parseInt(type, 10) : undefined;
    const [jobOffer, setJobOffer] = useState<offer | null>(null);
    const [author, setAuthor] = useState<user | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const { data: response } = await axios.get<TypedResponse<offer>>(
                    `/feed/job-offer.php?id=${offerId}`
                );
                if (response.status === "success") {
                    setJobOffer(response.data);
                }
            } catch (e) {
                console.error("Error fetching job offer:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchOffer();
    }, [offerId]);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const { data: response } = await axios.get<TypedResponse<any>>(
                    `/user/user-info.php?id=${jobOffer?.creator_id}`
                );
                if (response.status === "success") {
                    setAuthor(response.data.user as user);
                }
            } catch (e) {
                console.error("Error fetching job offer:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchAuthor();
    }, [jobOffer]);
    console.log(author);
    if (loading) return <div>Cargando...</div>;
    if (!jobOffer) return <div>No se encontró la oferta.</div>;

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
                    <img className="profile-pic" src={placeholder}
                        style={{
                            marginLeft: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                        }} />
                    {author ? author.name : null}
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
                        marginTop: !message ? 0 : `${TranslateFigmaCoords.translateFigmaY(40)}px`}}>
                        <span className="offer-title">{jobOffer.title}</span>
                        <br />
                        <div className="offer-fv-description-delimiter" style={{marginBottom: `${TranslateFigmaCoords.translateFigmaY(4)}px`}}></div>
                        <div style={{
                            width: `${TranslateFigmaCoords.translateFigmaX(1154)}px`,
                            height: `${TranslateFigmaCoords.translateFigmaY(350)}px`,
                            paddingRight: `${TranslateFigmaCoords.translateFigmaX(24)}px`,
                            overflowY: "auto" 
                        }}
                        className="scrollbar">
                            <span>{jobOffer.description}</span>
                        </div>
                        <div className="offer-fv-description-delimiter" style={{marginTop: `${TranslateFigmaCoords.translateFigmaY(4)}px`}}></div>
                        {iType === 4 || iType === 5 ? null : (
                            // If notification type is 4 or 5, hide Deapply button
                            <ActionButton text="Despostularse" className="offer-fv-deapply" height={40} style={{marginTop: `${TranslateFigmaCoords.translateFigmaY(6)}px`}}/>
                        )}
                        
                    </div>
                </AppWindow>
            </AppWindow>
        </AppWindow>
    </>
    );
};

export default JobOfferFV;