import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import ActionButton from "../ActionButton";
import AppWindow from "../AppWindow";
import ProfilePicture from "../user/ProfilePicture";

interface ReportRowProps {
  reporterMail?: string;
  reportedMail?: string;
  reporterUserId?: number;
  reportedUserId?: number;
  onClickSeeProfile?: (value: string) => void;
  onClickBan?: (value: string) => void;
  onClickDiscard?: (value: string) => void;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;

}


    
const ReportRow: React.FC<ReportRowProps> = ({
  reporterMail = "default@gmail.com",
  reportedMail = "default@gmail.com",
  reporterUserId = 0,
  reportedUserId = 0,
/*   onClickSeeProfile,
  onClickBan,
  onClickDiscard, */
  style,
/*   buttonStyle, */
}) => {

    return (
       <div style={{
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
            <p style={{textAlign:"center", paddingLeft:`${TranslateFigmaCoords.translateFigmaX(5)}px`,}} >{reportedMail}</p> 
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
                <ActionButton height={30} text="Ver Perfil"  style={{
                  backgroundColor: "#FFD64F",            
                  paddingRight: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                  paddingLeft: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                  color:"#113893",
                }}
                  ></ActionButton>
                <ActionButton height={30} text="Banear" style={{
                  backgroundColor: "#D43D3D",            
                  paddingRight: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                  paddingLeft: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                }}></ActionButton>
                <div style={{
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
              <p style={{textAlign:"center", paddingLeft:`${TranslateFigmaCoords.translateFigmaX(5)}px`,}} >{reporterMail}</p> 
            </span>
            <ActionButton height={30} text="Ver Perfil"  style={{
              backgroundColor: "#FFD64F",            
              paddingRight: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
              paddingLeft: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
              color:"#113893",
            }}></ActionButton>
        </AppWindow>

       </div>
    )
}

export default ReportRow;