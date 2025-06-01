import TranslateFigmaCoords from '../../global/function/TranslateFigmaCoords';
import { useAutocomplete } from '../../hooks/AutoComplete';
import '../../styles/publish-offer.css';
import AppWindow from '../UI/AppWindow';
import NavBar from '../UI/NavBar';
import InputField from '../UI/form/InputField';

const techOptions = [
    "JavaScript", "TypeScript", "Python", "Java", "C", "C++", "C#", "Go", "Rust",
    "Ruby", "PHP", "Swift", "Kotlin", "Dart", "Scala", "Perl", "Haskell", "Elixir", "Lua", "Shell"
];

const languageOptions = [
    "Español", "Inglés", "Francés", "Alemán", "Chino", "Japonés", "Árabe", "Ruso", "Portugués", "Hindi"
];

const PublishOffer: React.FC = () => {
    const techAuto = useAutocomplete(techOptions);
    const langAuto = useAutocomplete(languageOptions);

    return (
        <>
            <NavBar />
            <AppWindow
                height={600}
                width={920}
                style={{
                    position: "absolute",
                    top: '${TranslateFigmaCoords.translateFigmaY(100)}px',
                    left: "50%",
                    transform: "translate(-50%, 0%)",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div className="offer-form">
                    <div className="title">
                        <h2>Generador de Ofertas de Empleo</h2>
                    </div>

                    <div className="offer-content">
                        <InputField
                            type="text"
                            name="username"
                            placeholder="Ingrese el título de la oferta"
                            width={520}
                            height={55} 
                        />
                        <textarea
                            placeholder="Ingrese la descripción de la oferta"
                            className="field text-area"
                        />

                        {/* AUTOCOMPLETE BUSCADOR */}
                        <div className='search'>
                            {/* Campo de tecnologías */}
                            <div className='input-group'>
                                <input
                                    value={techAuto.input}
                                    onChange={(e) => techAuto.setInput(e.target.value)}
                                    onKeyDown={techAuto.handleKeyDown}
                                    onFocus={() => techAuto.setIsFocused(true)}
                                    onBlur={() => setTimeout(() => techAuto.setIsFocused(false), 100)}
                                    placeholder="Agregar tecnología"
                                />

                                <button onClick={techAuto.handleEnter}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                                {techAuto.input.length > 0 && techAuto.filteredOptions.length > 0 && techAuto.isFocused && (
                                    <ul className="opcionesCategorias">
                                        {techAuto.filteredOptions.map((option, index) => (
                                            <li
                                                key={option}
                                                onMouseDown={() => techAuto.handleSelect(option)}
                                                style={{
                                                    padding: "6px 8px",
                                                    backgroundColor:
                                                        index === techAuto.highlightedIndex ? "#e0f0ff" : "transparent",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                            </div>

                            {/* Campo de idiomas */}
                            <div className='input-group'>
                                <input
                                    type="text"
                                    value={langAuto.input}
                                    onChange={(e) => langAuto.setInput(e.target.value)}
                                    onKeyDown={langAuto.handleKeyDown}
                                    onFocus={() => langAuto.setIsFocused(true)}
                                    onBlur={() => setTimeout(() => langAuto.setIsFocused(false), 100)}
                                    placeholder="Añadir idioma"
                                />

                                <button onClick={langAuto.handleEnter}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                                {langAuto.input.length > 0 && langAuto.filteredOptions.length > 0 && langAuto.isFocused && (
                                    <ul className="opcionesCategorias">
                                        {langAuto.filteredOptions.map((option, index) => (
                                            <li
                                                key={option}
                                                onMouseDown={() => langAuto.handleSelect(option)}
                                                style={{
                                                    padding: "6px 8px",
                                                    backgroundColor:
                                                        index === langAuto.highlightedIndex ? "#e0f0ff" : "transparent",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                )}


                            </div>
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
                            <div className="tags-list">{techAuto.etiquetas}</div>
                        </div>
                        <div className="tags">
                            <div className="tags-header">
                                <h3>
                                    Idiomas
                                </h3>
                            </div>
                            <div className="tags-list">{langAuto.etiquetas}</div>
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
