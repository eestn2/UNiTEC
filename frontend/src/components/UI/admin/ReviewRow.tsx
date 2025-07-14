import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import ActionButton from "../ActionButton";
import AppWindow from "../AppWindow";


interface ReviewRowProps {
  reviewerMail?: string;
  reviewedMail?: string;
  reviewerUserId?: number;
  onClickSeeProfile?: (value: string) => void;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;

}



const ReviewRow: React.FC<ReviewRowProps> = ({
    reviewedMail = "default@gmail.com",
    reviewerMail = "default@gmail.com",
    reviewerUserId = 3
}) => {


return(
    <div style={{
        margin: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
        display: "flex",
        flexDirection: "column",

    }}>
        <div
          style={{
            display: "flex",
            
            backgroundColor: "#DEE0EB",
            borderTopLeftRadius: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
            borderTopRightRadius: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
            border: `${TranslateFigmaCoords.translateFigmaX(3)}px solid #5386FF`,
            paddingTop: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
            paddingBottom: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
          }}
        >
          {reviewerUserId==1 ?
          (<div style={{ width: "100%", textAlign:"center",fontWeight: "bold", color:"#113893" }}>Reseña de Empresa a Usuario</div>
          ):(
            <div style={{ width: "100%", textAlign:"center", fontWeight: "bold", color:"#113893" }}>Reseña de Usuario a Empresa</div>
          )}

        </div>
        <div  style={{
            display: "flex",
            fontWeight: "semibold",
            flexDirection: "row",
            borderBottomLeftRadius: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
            borderBottomRightRadius: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
            borderBottom: `${TranslateFigmaCoords.translateFigmaX(3)}px solid #5386FF`,
            borderLeft: `${TranslateFigmaCoords.translateFigmaX(3)}px solid #5386FF`,
            borderRight: `${TranslateFigmaCoords.translateFigmaX(3)}px solid #5386FF`,
            width: "100%",
          }}>
            <div style={{            
                display: "flex",
            fontWeight: "semibold",
            flexDirection: "row",}}> 
                <AppWindow
                    width={550}
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
                    <p style={{textAlign:"center", color:"#839EDE"}}>{reviewerMail}</p>
                    <ActionButton height={30} text="Ver Perfil"  style={{
                        backgroundColor: "#FFD64F",            
                        paddingRight: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                        paddingLeft: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                        color:"#113893",
                    }}></ActionButton>
                    </div>
                </AppWindow> 
                                <AppWindow
                    width={550}
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
                    <p style={{margin:0}}>A quién se reseña:</p>
                    <div style={{display: "flex", justifyContent:"space-between", alignItems: "center"}}>
                    <p style={{textAlign:"center", color:"#839EDE"}}>{reviewedMail}</p>
                    <ActionButton height={30} text="Ver Perfil"  style={{
                        backgroundColor: "#FFD64F",            
                        paddingRight: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                        paddingLeft: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                        color:"#113893",
                    }}></ActionButton>
                    </div>
                </AppWindow> 
        </div>
            <div></div>
        </div>

    </div>
)
}

export default ReviewRow;