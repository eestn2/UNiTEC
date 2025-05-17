import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import ActionButton from "./ActionButton";
import AppWindow from "./AppWindow"
import InputField from "./InputField";
import ResponsiveComponent from "./ResponsiveComponent";


interface AttributeAddProps extends ResponsiveComponent {
    type?: string;
    width?: number;
    height?: number;
}

const AttributeAdd: React.FC<AttributeAddProps> = ({
    width = 320,
    height = 208,
    type = "AttributeAdd",

}) => {
    return (

        <AppWindow width={width} height={height} style={{
            borderColor: "#5386FF",
            borderWidth: `${TranslateFigmaCoords.translateFigmaX(3)}px`,
            borderStyle: "solid"
        }} >
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems:"center",
                justifyContent: "center",
                gap: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
            }}>
                <h1 style={{color: "#305894",marginTop:`${TranslateFigmaCoords.translateFigmaX(7.5)}px`, margin: 0, padding:0}}>{type}</h1>
                <InputField 
                    type="text"
                    name="attribute"
                    placeholder="Ingresa el nuevo"
                    width={280}
                    height={60}
                    style={{borderRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,}}
                />
                <ActionButton
                    height={50}
                    text="Enviar"
                    style={{
                        borderRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                        paddingLeft: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                        paddingRight: `${TranslateFigmaCoords.translateFigmaX(20)}px`
                    }}  
                
                />
            </div>

        </AppWindow>

    )
}

export default AttributeAdd