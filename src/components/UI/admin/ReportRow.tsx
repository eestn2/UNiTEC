import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import ActionButton from "../ActionButton";
import AppWindow from "../AppWindow";

interface ReportRowProps {
  reporterMail?: string;
  reportedMail?: string;
  onClickSeeProfile?: (value: string) => void;
  onClickBan?: (value: string) => void;
  onClickDiscard?: (value: string) => void;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;

}


    
const ReportRow: React.FC<ReportRowProps> = ({
  reporterMail = "default@gmail.com",
  reportedMail = "default@gmail.com",
  onClickSeeProfile,
  onClickBan,
  onClickDiscard,
  style,
  buttonStyle,
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
            color: "black",
            display: "flex",
            justifyContent:"space-between",
            alignItems: "center",
            paddingRight: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
            paddingLeft: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
            ...style,
        }}
        >
            <p style={{textAlign:"center"}} >{reportedMail}</p>
            <div
            style={{
            width: "30%",
            display: "flex",
            justifyContent:"space-between",
            alignItems: "center",
            paddingRight: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
            paddingLeft: `${TranslateFigmaCoords.translateFigmaX(5)}px`,

            }}
            >
                <ActionButton></ActionButton>
                <ActionButton></ActionButton>
                <ActionButton></ActionButton>
            </div>

        </AppWindow>
        <div>

        </div>
        <AppWindow
            width={580}
            height={30}
            style={{
            color: "black",
            display: "flex",
            justifyContent:"space-between",
            alignItems: "center",
            paddingRight: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
            paddingLeft: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
            ...style,
            }}
        
        >
            <p style={{textAlign:"center"}}>{reporterMail}</p>
            <ActionButton></ActionButton>
        </AppWindow>

       </div>
    )
}

export default ReportRow;