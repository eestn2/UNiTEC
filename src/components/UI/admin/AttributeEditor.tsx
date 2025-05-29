import { useEffect, useState } from "react";
import AppWindow from "../AppWindow";
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import InputField from "../form/InputField";
import ResponsiveComponent from "../../../global/interface/ResponsiveComponent";
import ActionButton from "../ActionButton";
import edit_icon from  "../../../assets/icons/edit.svg"

interface AttributeEditorProps extends ResponsiveComponent {
    type?: string;
    id?:    number;
    width?: number;
    height?: number;
    onSubmit?: (attribute: string, id:number) => void;
}

const AttributeEditor: React.FC<AttributeEditorProps> = ({
    width = 230,
    height = 100,
    id = 0,
    type = "AttributeEditor",
    onSubmit,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [attribute, setAttribute] = useState(type);
    const [inputValue, setInputValue] = useState('');
    
    useEffect(() => {
        setAttribute(type);
    }, [type]);

    return (
        <AppWindow
            width={width}
            height={height}
            style={{
                borderColor: "#5386FF",
                borderWidth: `${TranslateFigmaCoords.translateFigmaX(2)}px`,
                borderStyle: "solid"
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                    gap: isEditing
                        ? `${TranslateFigmaCoords.translateFigmaX(5)}px` 
                        : `${TranslateFigmaCoords.translateFigmaX(15)}px`
                }}
            >
                <div
                    style={{
                        color: "#305894",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                        marginRight: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                        marginLeft: `${TranslateFigmaCoords.translateFigmaX(5)}px`
                    }}
                >
                    {isEditing ? (
                        <InputField
                            type="text"
                            name="attribute"
                            placeholder={attribute}
                            onChange={e => setInputValue((e.target as HTMLInputElement).value)}
                            width={160}
                            height={35}
                            value={inputValue}
                        />
                    ) : (
                        <>
                            {attribute}
                            <img src={edit_icon} alt="Edit" />
                        </>
                    )}
                </div>
                <div
                    style={{
                        marginTop: "auto",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    {isEditing ? (
                        <>
                            <ActionButton
                                height={40}
                                text="Confirmar"
                                style={{
                                    borderRadius: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                                    paddingLeft: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                                    paddingRight: `${TranslateFigmaCoords.translateFigmaX(20)}px`
                                }}
                                action={() => {
                                    if(onSubmit) onSubmit(inputValue, id);
                                    alert( attribute + " modificado a " + inputValue);
                                    setAttribute(inputValue);
                                    setInputValue('');
                                    setIsEditing(false);
                                }}
                            />
                            <ActionButton
                                height={40}
                                text="Cancelar"
                                style={{
                                    borderRadius: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                                    paddingLeft: `${TranslateFigmaCoords.translateFigmaX(23)}px`,
                                    paddingRight: `${TranslateFigmaCoords.translateFigmaX(23)}px`,
                                    backgroundColor: "#F03D3D"
                                }}
                                action={() => setIsEditing(false)}
                            />
                        </>
                    ) : (
                        <>
                            <ActionButton
                                height={40}
                                text="Actualizar"
                                style={{
                                    borderRadius: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                                    paddingLeft: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                                    paddingRight: `${TranslateFigmaCoords.translateFigmaX(20)}px`
                                }}
                                action={() => setIsEditing(true)}
                            />
                            <ActionButton
                                height={40}
                                text="Eliminar"
                                style={{
                                    borderRadius: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                                    paddingLeft: `${TranslateFigmaCoords.translateFigmaX(25)}px`,
                                    paddingRight: `${TranslateFigmaCoords.translateFigmaX(25)}px`,
                                    backgroundColor: "#F03D3D"
                                }}
                                action={() => alert("Button clicked!")}
                            />
                        </>
                    )}
                </div>
            </div>
        </AppWindow>
    );
};

export default AttributeEditor;