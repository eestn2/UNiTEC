import { useRef, useState } from "react";
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import ActionButton from "../ActionButton";
import AppWindow from "../AppWindow";
import ProfilePicture from "../user/ProfilePicture";
import ExpandableTextBox from "./ExpandableTextBox";

interface ReviewRowProps {
  reviewerMail?: string;
  reviewedMail?: string;
  reviewerUserId?: number;
  reviewedUserId?: number;
  reviewerUserType?: number;
  reviewTitle?: string;
  reviewDescription?: string;
  onClickSeeProfile?: (value: number) => void | undefined;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
}

const ReviewRow: React.FC<ReviewRowProps> = ({
    reviewedMail = "default@gmail.com",
    reviewerMail = "default@gmail.com",
    reviewerUserId = 0,
    reviewedUserId = 0,
    reviewerUserType = 1,
    onClickSeeProfile,
    reviewTitle = "Reseña:",
    reviewDescription = "Hola soy daviel y merezco un 10, porque soy el mejor desarrollador del mundo mundial, y no me gusta que me digan lo contrario, porque si no me enojo y hago un fork de tu repo y te hago un pull request con un cambio que te va a gustar mucho, pero si no lo aceptas, entonces te voy a hacer un issue y te voy a decir que eres un mal desarrollador."
}) => {
    return (
        <div style={{
            margin: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
            display: "flex",
            flexDirection: "column", 
        }}>
            <div
                style={{
                    display: "flex", 
                    backgroundColor: "#DEE0EB",
                    borderTopLeftRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                    borderTopRightRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                    border: `${TranslateFigmaCoords.translateFigmaX(3)}px solid #5386FF`,
                    paddingTop: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                    paddingBottom: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                }}
            >
                {reviewerUserType==1 ?
                (<div style={{ width: "100%", textAlign:"center",fontWeight: "bold", color:"#113893", }}>Reseña de Empresa a Usuario</div>)
                :(<div style={{ width: "100%", textAlign:"center", fontWeight: "bold", color:"#113893", }}>Reseña de Usuario a Empresa</div>)}
            </div>
            <div style={{
                display: "flex",
                fontWeight: 600,
                flexDirection: "column",
                borderBottomLeftRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                borderBottomRightRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                borderBottom: `${TranslateFigmaCoords.translateFigmaX(3)}px solid #5386FF`,
                borderLeft: `${TranslateFigmaCoords.translateFigmaX(3)}px solid #5386FF`,
                borderRight: `${TranslateFigmaCoords.translateFigmaX(3)}px solid #5386FF`,
            }}>
                <div style={{            
                    display: "flex",
                    fontWeight: 600,
                    flexDirection: "row",
                    marginRight: 0,
                    width: "100%",
                }}> 
                    <AppWindow
                        width={"50%"}
                        height={30}
                        style={{
                            fontWeight: "bold",
                            color: "#113893",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "none",
                            marginRight: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                            marginLeft: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                            marginTop: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                        }}
                    >
                        <p style={{margin:0}}>Reseña hecha por:</p>
                        <div style={{display: "flex", justifyContent:"space-between", alignItems: "center"}}>
                            <span style={{display: "flex", alignItems: "center"}}>
                                <ProfilePicture userId={reviewerUserId as number} size={30} vertical={window.innerWidth > window.innerHeight}></ProfilePicture>   
                                <p style={{textAlign:"center", paddingLeft:`${TranslateFigmaCoords.translateFigmaX(5)}px`,color:"#6F88B3"}}>{reviewerMail}</p>
                            </span>
                            <ActionButton height={30} text="Ver Perfil"  action={() => {
                                if (onClickSeeProfile) {
                                    onClickSeeProfile(reviewerUserId);
                                }
                                }}style={{
                                backgroundColor: "#FFD64F",            
                                paddingRight: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                                paddingLeft: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                                color:"#113893",
                            }}></ActionButton>
                        </div>
                    </AppWindow> 
                    <AppWindow
                        width={"50%"}
                        height={30}
                        style={{
                            fontWeight: "bold",
                            color: "#113893",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "none",
                            marginRight: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                            marginLeft: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                            marginTop: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                        }}
                    >
                        <p style={{margin:0,}}>A quién se reseña:</p>
                        <div style={{display: "flex", justifyContent:"space-between", alignItems: "center"}}>
                            <span style={{display: "flex", alignItems: "center"}}>
                                <ProfilePicture userId={reviewedUserId as number} size={30} vertical={window.innerWidth > window.innerHeight}></ProfilePicture>   
                                <p style={{textAlign:"center", paddingLeft:`${TranslateFigmaCoords.translateFigmaX(5)}px`,color:"#6F88B3"}}>{reviewedMail}</p>
                            </span>
                            <ActionButton height={30} text="Ver Perfil"  action={() => {
                                if (onClickSeeProfile) {
                                    onClickSeeProfile(reviewedUserId);
                                }
                                }}style={{
                                backgroundColor: "#FFD64F",            
                                paddingRight: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                                paddingLeft: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                                color:"#113893",
                            }}></ActionButton>
                        </div>
                    </AppWindow> 
                </div>
                              
            <div style={{display: "flex", justifyContent:"center", alignItems: "center",}} > 
                <ExpandableTextBox 
                    title= {reviewTitle}
                    description={reviewDescription}
                    initialHeight={25}
                    width={1120}
                    ></ExpandableTextBox>
            </div>
            </div>
        </div>
    );
}

export default ReviewRow;