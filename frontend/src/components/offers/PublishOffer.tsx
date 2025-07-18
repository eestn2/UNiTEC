import TranslateFigmaCoords from '../../global/function/TranslateFigmaCoords';
import '../../styles/publish-offer.css';
import AppWindow from '../UI/AppWindow';
import NavBar from '../UI/NavBar';
import InputField from '../UI/form/InputField';
import TextBox from '../UI/form/TextBox';
import { useWindowSize } from '../../hooks/responsive/useWindowSize';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import Tag from '../UI/Tag';
import axios from 'axios';


const PublishOffer: React.FC = () => {
  const windowSize = useWindowSize();
  console.log("Window size:", windowSize);




  const [Languages, setLanguages] = useState<string[]>([]);
  const [Tags, setTags] = useState<string[]>([]);
  const [selectLanguages, setSelectLanguages] = useState<string[]>([]);
  const [selectTags, setSelectTags] = useState<string[]>([]);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const deleteTag = (valor: string, tipo: 'lenguaje' | 'idioma') => {
    if (tipo === 'lenguaje') {
      setSelectLanguages(prev => prev.filter(t => t !== valor));
    } else if (tipo === 'idioma') {
      setSelectLanguages(prev => prev.filter(i => i !== valor));
    }
  };

  const loadLanguages = async () => {
    try {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/function/get-languages.php`);
      if (response.status !== 200 && response.data.status !== "success") {
        console.error("Failed to load languages:", response.data.message);
      } else {
        const languageNames = response.data.data.languages.map((lang: any) => lang.name);
        setLanguages(languageNames);
      }
    } catch (error) {
      console.error("An error occurred while loading languages:", error);
    }
  };

  const loadTags = async () => {
    try {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/function/get-tags.php`);
      if (response.status !== 200 && response.data.status !== "success") {
        console.error("Failed to load tags:", response.data.message);
      } else {
        const tagsNames = response.data.data.tags.map((lang: any) => lang.name);
        setTags(tagsNames);
      }
    } catch (error) {
      console.error("An error occurred while loading tags:", error);
    }
  };

  const handleLenguajeSubmit = (valor: string) => {
    const valido = Tags.some((l) => l.toLowerCase() === valor.toLowerCase());
    if (!valido) {
      alert(`"${valor}" no es un lenguaje válido.`);
      return;
    }
    const lenguajeCorrecto = Tags.find(
      (l) => l.toLowerCase() === valor.toLowerCase()
    );
    if (lenguajeCorrecto && !selectTags.includes(lenguajeCorrecto)) {
      setSelectTags([...selectTags, lenguajeCorrecto]);
    }
  };

    function getId (array1: string[], array2: string[]): number[] {
    const result: number[] = [];
    const minLength = Math.min(array1.length, array2.length);
    for (let i = 0; i < minLength; i++) {
      if (array1[i] === array2[i]) {
        result.push(i+1);
      }
    }
    return result;
  }

  const handleIdiomaSubmit = (valor: string) => {
    const valido = Languages.some((i) => i.toLowerCase() === valor.toLowerCase());
    if (!valido) {
      alert(`"${valor}" no es un idioma válido.`);
      return;
    }
    const idiomaCorrecto = Languages.find(
      (i) => i.toLowerCase() === valor.toLowerCase()
    );
    if (idiomaCorrecto && !selectLanguages.includes(idiomaCorrecto)) {
      setSelectLanguages([...selectLanguages, idiomaCorrecto]);
    }
  };
 const handleAddOffer = async (tit: string,desc: string,tags:number[],languages:number[]) => {
    const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
    const response = await axios.post(`${apiUrl}/enterprise/publish-offer.php`, {
      title:tit,
      description:desc,
      tags:tags,
      languages:languages
    });
    console.log(response);
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
              onChange={(e) => setDescription(e.target.value)}
              style={{
                border: 'none',
                height: `${TranslateFigmaCoords.translateFigmaY(240)}px`,
                width: `${TranslateFigmaCoords.translateFigmaY(500)}px`,
              }}
            />
            <div className='search'>
              <SearchBar
                placeholder="Añadir etiqueta"
                suggestions={Tags}
                selectedItems={selectTags}
                onSubmit={handleLenguajeSubmit}
                onSuggestionClick={(Lenguaje) => handleLenguajeSubmit(Lenguaje)}
                style={{
                  height: `${TranslateFigmaCoords.translateFigmaY(50)}px`,
                  width: `${TranslateFigmaCoords.translateFigmaY(230)}px`,
                }}
                buttonStyle={{
                  height: `${TranslateFigmaCoords.translateFigmaY(25)}px`,
                  marginBottom: '-5px'
                }}
              />

              <SearchBar
                placeholder="Añadir idioma"
                suggestions={Languages}
                selectedItems={selectLanguages}
                onSubmit={handleIdiomaSubmit}
                onSuggestionClick={(Idioma) => handleIdiomaSubmit(Idioma)}
                style={{
                  height: `${TranslateFigmaCoords.translateFigmaY(50)}px`,
                  width: `${TranslateFigmaCoords.translateFigmaY(230)}px`,
                }}
                buttonStyle={{
                  height: `${TranslateFigmaCoords.translateFigmaY(25)}px`,
                  marginBottom: '-5px'
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
                {selectTags.map((tag, index) => (
                  <Tag key={index} texto={tag} onDelete={() => deleteTag(tag, 'lenguaje')} />
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
                {selectLanguages.map((idioma, index) => (
                  <Tag key={index} texto={idioma} onDelete={() => deleteTag(idioma, 'idioma')} />
                ))}
              </div>
            </div>
          </div>

          <button className="btn-publish" onClick={() => handleAddOffer(title,description,getId(Tags, selectTags),getId(Languages, selectLanguages))}>Publicar Oferta</button>
          <button className="btn-undo">Deshacer Oferta</button>
        </div>
      </AppWindow>
    </>
  );
};

export default PublishOffer;
