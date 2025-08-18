import TranslateFigmaCoords from '../../global/function/TranslateFigmaCoords';
import '../../styles/publish-offer.css';
import AppWindow from '../UI/AppWindow';
import NavBar from '../UI/NavBar';
import InputField from '../UI/form/InputField';
import TextBox from '../UI/form/TextBox';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import Tag from '../UI/Tag';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../UI/ActionButton';

type LoadedLabel = {
  id: number;
  name: string;
};

const PublishOffer: React.FC = () => {
  const navigate = useNavigate();

  const [Languages, setLanguages] = useState<LoadedLabel[]>([]);
  const [Tags, setTags] = useState<LoadedLabel[]>([]);
  const [selectLanguages, setSelectLanguages] = useState<LoadedLabel[]>([]);
  const [selectTags, setSelectTags] = useState<LoadedLabel[]>([]);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const deleteTag = (id: number, tipo: 'lenguaje' | 'idioma') => {
    if (tipo === 'lenguaje') {
      setSelectTags(prev => prev.filter(t => t.id !== id));
    } else if (tipo === 'idioma') {
      setSelectLanguages(prev => prev.filter(i => i.id !== id));
    }
  };

  const loadLanguages = async () => {
    try {
      const response = await axios.get("/function/get-languages.php");
      if (response.status === 200 && response.data.status === "success") {
        setLanguages(response.data.data.languages);
      } else {
        console.error("Failed to load languages:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred while loading languages:", error);
    }
  };

  const loadTags = async () => {
    try {
      const response = await axios.get('/function/get-tags.php');
      if (response.status === 200 && response.data.status === "success") {
        setTags(response.data.data.tags);
      } else {
        console.error("Failed to load tags:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred while loading tags:", error);
    }
  };

 const handleLenguajeSubmit = (item: LoadedLabel) => {
  setSelectTags(prev => 
    prev.some(t => t.id === item.id) ? prev : [...prev, item]
  );
};

const handleIdiomaSubmit = (item: LoadedLabel) => {
  setSelectLanguages(prev => 
    prev.some(l => l.id === item.id) ? prev : [...prev, item]
  );
};

  const handleAddOffer = async (tit: string, desc: string, tags: number[], languages: number[]) => {
    if (!tit.trim() || !desc.trim()) {
      alert("Debes rellenar obligatoriamente el título y descripción de la oferta.");
      return;
    }

    try {
      const response = await axios.post('/enterprise/publish-offer.php', {
        title: tit,
        description: desc,
        tags: tags,
        languages: languages
      });
      
      if (response.data.status === "success") {
        navigate('/');
      } else {
        alert("Error al publicar la oferta: " + (response.data.message || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al publicar la oferta");
    }
  };

  useEffect(() => {
    loadLanguages();
    loadTags();
  }, []);

  return (
    <>
      <NavBar />
      <AppWindow
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
          overflow: 'hidden'
        }}
      >
        <div className="offer-form" style={{
          height: `${TranslateFigmaCoords.translateFigmaY(520)}px`,
          width: `${TranslateFigmaCoords.translateFigmaY(580)}px`,
        }}>
          <div className="title">
            <h2>Generador de Ofertas de Empleo</h2>
          </div>

          <div className="offer-content">
            <InputField
              type="text"
              name="username"
              placeholder="Ingrese el título de la oferta"
              onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
              style={{
                height: `${TranslateFigmaCoords.translateFigmaY(55)}px`,
                width: `${TranslateFigmaCoords.translateFigmaY(500)}px`,
              }}
            />
            <TextBox
              placeholder="Ingrese la descripción de la oferta"
              name='text-tarea'
              width={500}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                border: 'none',
                width: `${TranslateFigmaCoords.translateFigmaY(500)}px`, 
                height: `${TranslateFigmaCoords.translateFigmaY(240)}px`, 
              }}
            />
            <div className='search' 
              style={{ width: `${TranslateFigmaCoords.translateFigmaY(500)}px` }}>
              <SearchBar 
                placeholder="Añadir etiqueta"
                suggestions={Tags}
                selectedItems={selectTags}
                onSubmit={handleLenguajeSubmit}
                onSuggestionClick={handleLenguajeSubmit}
                style={{
                  height: `${TranslateFigmaCoords.translateFigmaY(50)}px`,
                  width: `${TranslateFigmaCoords.translateFigmaY(230)}px`,
                }}
                buttonStyle={{
                  height: `${TranslateFigmaCoords.translateFigmaY(25)}px`,
                  marginBottom: `${TranslateFigmaCoords.translateFigmaY(-5)}px`
                }}
              />

              <SearchBar
                placeholder="Añadir idioma"
                suggestions={Languages}
                selectedItems={selectLanguages}
                onSubmit={handleIdiomaSubmit}
                onSuggestionClick={handleIdiomaSubmit}
                style={{
                  height: `${TranslateFigmaCoords.translateFigmaY(50)}px`,
                  width: `${TranslateFigmaCoords.translateFigmaY(230)}px`,
                }}
                buttonStyle={{
                  height: `${TranslateFigmaCoords.translateFigmaY(25)}px`,
                  marginBottom: `${TranslateFigmaCoords.translateFigmaY(-5)}px`
                }}
              />
            </div>
          </div>
        </div>

        <div className="offer-tags">
          <div className="tags">
            <div className="tags-header">
              <h3>Etiquetas</h3>
            </div>
            <div className="tags-list">
              <div className="tags-list-scroll">
                {selectTags.map((tag) => (
                  <Tag 
                    key={tag.id} 
                    texto={tag.name} 
                    onDelete={() => deleteTag(tag.id, 'lenguaje')} 
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="tags">
            <div className="tags-header">
              <h3>Idiomas</h3>
            </div>
            <div className="tags-list">
              <div className="tags-list-scroll">
                {selectLanguages.map((language) => (
                  <Tag 
                    key={language.id} 
                    texto={language.name} 
                    onDelete={() => deleteTag(language.id, 'idioma')} 
                  />
                ))}
              </div>
            </div>
          </div>

          <ActionButton 
            height={50} 
            action={() => handleAddOffer(
              title, 
              description, 
              selectTags.map(t => t.id), 
              selectLanguages.map(l => l.id)
            )}>
            Publicar Oferta
          </ActionButton>
          <ActionButton 
            height={50} 
            style={{backgroundColor: "var(--danger)"}} 
            action={() => navigate(-1)}
          >
            Deshacer Oferta
          </ActionButton>
        </div>
      </AppWindow>
    </>
  );
};

export default PublishOffer;