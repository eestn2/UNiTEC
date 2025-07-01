import { ChangeEvent, useState } from "react";
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import ResponsiveComponent from "../../../global/interface/ResponsiveComponent";
import ActionButton from "../ActionButton";
import AppWindow from "../AppWindow";
import InputField from "../form/InputField";



interface AttributeAddProps extends ResponsiveComponent {
    type?: string;
    width?: number;
    height?: number;
    onSubmit?: (attribute: string) => void;
}

const AttributeAdd: React.FC<AttributeAddProps> = ({
    width = 320,
    height = 208,
    type = "AttributeAdd",
    onSubmit,
}) => {
    const [attribute, setAttribute] = useState('');
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
                    placeholder="Cargalo aqui"
                    width={280}
                    height={60}
                    style={{borderRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,}}
                    value={attribute}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setAttribute(event.target.value)}
                />
                <ActionButton
                    height={50}
                    text="Enviar"
                    style={{
                        borderRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                        paddingLeft: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                        paddingRight: `${TranslateFigmaCoords.translateFigmaX(20)}px`
                        
                    }}  
            
                    action={() => {
                        if (onSubmit) onSubmit(attribute);
                        alert("Atributo agregado: " + attribute);
                        setAttribute('');
                    }}
                />
            </div>

        </AppWindow>

    )
}

export default AttributeAdd