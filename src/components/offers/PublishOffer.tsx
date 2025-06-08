import TranslateFigmaCoords from '../../global/function/TranslateFigmaCoords';
import '../../styles/publish-offer.css';
import AppWindow from '../UI/AppWindow';
import NavBar from '../UI/NavBar';
import InputField from '../UI/form/InputField';
import TextBox from '../UI/form/TextBox';



const PublishOffer: React.FC = () => {

    return (
        <>
            <NavBar />
            <AppWindow
                width={850}
                style={{
                    position: "absolute",
                    height: `${TranslateFigmaCoords.translateFigmaY(600)}px`,
                    width: `${TranslateFigmaCoords.translateFigmaY(920)}px`,
                    top: `${TranslateFigmaCoords.translateFigmaY(100)}px`,
                    left: "50%",
                    transform: "translate(-50%, 0%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                }}
            >
                <div className="offer-form" style={{ height: `${TranslateFigmaCoords.translateFigmaY(520)}px`, width: `${TranslateFigmaCoords.translateFigmaY(580)}px`, }}>
                    <div className="title">
                        <h2>Generador de Ofertas de Empleo</h2>
                    </div>

                    <div className="offer-content">
                        <InputField
                            type="text"
                            name="username"
                            placeholder="Ingrese el título de la oferta"
                            style={{ height: `${TranslateFigmaCoords.translateFigmaY(50)}px`, width: `${TranslateFigmaCoords.translateFigmaY(500)}px`, }}
                        />
                        <TextBox
                            placeholder="Ingrese la descripción de la oferta"
                            name='text-tarea'
                            style={{ height: `${TranslateFigmaCoords.translateFigmaY(235)}px`, width: `${TranslateFigmaCoords.translateFigmaY(500)}px`, }}
                        />
                        {/* AUTOCOMPLETE BUSCADOR */}
                        <div className='search'>
                            {/* Campo de etiquetas */}
                            <InputField
                                type="text"
                                name="username"
                                placeholder="Añadir etiqueta"
                                style={{ height: `${TranslateFigmaCoords.translateFigmaY(55)}px`, width: `${TranslateFigmaCoords.translateFigmaY(230)}px`, }}
                            />
                            <InputField
                                type="text"
                                name="username"
                                placeholder="Añadir idioma"
                                style={{ height: `${TranslateFigmaCoords.translateFigmaY(55)}px`, width: `${TranslateFigmaCoords.translateFigmaY(230)}px`, }}
                            />
                            {/* Campo de idiomas */}

                        </div>
                    </div>
                </div>

                {/* PANEL LATERAL DE ETIQUETAS Y BOTONES */}
                <div className="offer-tags">
                    <div className='Cuadrante'>
                        <div className="tags">
                            <div className="tags-header">
                                <h3>
                                    Etiquetas
                                </h3>
                            </div>
                            <div className="tags-list">{ }</div>
                        </div>
                        <div className="tags">
                            <div className="tags-header">
                                <h3>
                                    Idiomas
                                </h3>
                            </div>
                            <div className="tags-list">{ }</div>
                        </div>
                    </div>
                    <div className='Cuadrante-btns'>
                        <button className="btn-publish">Publicar Oferta</button>
                        <button className="btn-undo">Deshacer Oferta</button>
                    </div>
                </div>

            </AppWindow>
        </>

    );
};

export default PublishOffer;
