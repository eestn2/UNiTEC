import { useState } from "react";
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import ActionButton from "../ActionButton";
import AppWindow from "../AppWindow";
import ProfilePicture from "../user/ProfilePicture";
import Modal from "./Modal";

interface ReportRowProps {
  id?:number;
  reporterEmail?: string;
  reportedEmail?: string;
  reportTitle?: string;
  reportDescription?: string;
  reporterUserId?: number;
  reportedUserId?: number;
  onClickSeeProfile?: (value: number) => void | undefined;
  onClickBan?: (reportedId: number, id :number) => void | undefined;
  onClickDiscard?: (value: number)=> void | undefined;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;

}


    
const ReportRow: React.FC<ReportRowProps> = ({
  id = 0,
  reporterEmail = "default@gmail.com",
  reportedEmail = "default@gmail.com",
  reporterUserId = 0,
  reportedUserId = 0,
  reportTitle = "Reporte:",
  reportDescription = "Hola soy daviel y merezco un 10, porque soy el mejor desarrollador del mundo mundial, y no me gusta que me digan lo contrario, porque si no me enojo y hago un fork de tu repo y te hago un pull request con un cambio que te va a gustar mucho, pero si no lo aceptas, entonces te voy a hacer un issue y te voy a decir que eres un mal desarrollador.",
  onClickSeeProfile,
  onClickBan,
  onClickDiscard,
  style,
/*   buttonStyle, */
}) => {
       const [modal, setModal ] = useState(false);
    return (
       <div style={{
        marginTop: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
        marginBottom: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
        width: "100%",
        display: "flex",
        justifyContent:"space-evenly",


       }}>
        <AppWindow
        width={580}
        height={30}
        style={{
            color: "#6F88B3",
            display: "flex",
            justifyContent:"space-between",
            alignItems: "center",
            paddingRight: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
            paddingLeft: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
            borderColor: "#5386FF",
            borderStyle: "solid",
            borderWidth: `${TranslateFigmaCoords.translateFigmaX(2)}px`,
            ...style,
        }}
        >
          <span style={{display: "flex", alignItems: "center"}}>
            <ProfilePicture userId={reportedUserId as number} size={30} vertical={window.innerWidth > window.innerHeight}></ProfilePicture>
            <p style={{textAlign:"center", paddingLeft:`${TranslateFigmaCoords.translateFigmaX(5)}px`,}} >{reportedEmail}</p> 
            </span>
            <div
            style={{
            width: "35%",
            display: "flex",
            justifyContent:"space-between",
            alignItems: "center",
            paddingRight: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
            paddingLeft: `${TranslateFigmaCoords.translateFigmaX(5)}px`,

            }}
            >
                <ActionButton height={30} text="Ver Perfil" action={() => {
                  if (onClickSeeProfile) {
                    onClickSeeProfile(reportedUserId);
                  }
                }} style={{
                  backgroundColor: "#FFD64F",            
                  paddingRight: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                  paddingLeft: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                  color:"#113893",
                }}
                  ></ActionButton>
                <ActionButton height={30} text="Banear" action={() => {
                  if (onClickBan) {
                    onClickBan(reportedUserId, id);
                  }
                }} style={{
                  backgroundColor: "#D43D3D",            
                  paddingRight: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                  paddingLeft: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                }}></ActionButton>
                <div onClick={() => {
                  if (onClickDiscard) {
                    onClickDiscard(id);
                  } }
                 } style={{
                  backgroundColor: "#D43D3D",
                  width:`${TranslateFigmaCoords.translateFigmaX(30)}px` ,
                  height: `${TranslateFigmaCoords.translateFigmaX(30)}px`,
                  borderRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",

                }}>  
                  <svg  xmlns="http://www.w3.org/2000/svg" width={16} height={24} 
                  fill={"#ffffff"}  viewBox="0 0 24 24" >
                  <path d="m17,6v-2c0-1.1-.9-2-2-2h-6c-1.1,0-2,.9-2,2v2H2v2h2v12c0,1.1.9,2,2,2h12c1.1,0,2-.9,2-2v-12h2v-2h-5Zm-8-2h6v2h-6v-2Zm1,14h-2v-8h2v8Zm6,0h-2v-8h2v8Z"></path>
                  </svg></div>
                 </div>

        </AppWindow>
        <div>

        </div>
        <AppWindow
            width={580}
            height={30}
            style={{
            color: "#6F88B3",
            display: "flex",
            justifyContent:"space-between",
            alignItems: "center",
            paddingRight: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
            paddingLeft: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
            borderColor: "#5386FF",
            borderStyle: "solid",
            borderWidth: `${TranslateFigmaCoords.translateFigmaX(2)}px`,
            ...style,
            }}
        
        >
            <span style={{display: "flex", alignItems: "center"}}>
              <ProfilePicture userId={reporterUserId as number} size={30} vertical={window.innerWidth > window.innerHeight}></ProfilePicture>
              <p style={{textAlign:"center", paddingLeft:`${TranslateFigmaCoords.translateFigmaX(5)}px`,}} >{reporterEmail}</p> 
            </span>
            <div
            style={{
            width: "35%",
            display: "flex",
            justifyContent:"space-between",
            alignItems: "center",
            paddingRight: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
            paddingLeft: `${TranslateFigmaCoords.translateFigmaX(5)}px`,

            }}
            >
                <ActionButton height={30} text="Ver Perfil" action={() => {
                  if (onClickSeeProfile) {
                    onClickSeeProfile(reporterUserId);
                  }
                }}  style={{
                  backgroundColor: "#FFD64F",            
                  paddingRight: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                  paddingLeft: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                  color:"#113893",
                }}
                  ></ActionButton>
                <ActionButton height={30} text="Ver Reporte"action={() => setModal(true)} style={{
                  backgroundColor: "#D43D3D",            
                  paddingRight: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                  paddingLeft: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                }}></ActionButton>
                 </div>
                 {modal && (
                    <Modal
                      title={reportTitle}
                      text={reportDescription}
                      onClose={() => setModal(false)}
                    />)}
        </AppWindow>

       </div>
    )
}

export default ReportRow;