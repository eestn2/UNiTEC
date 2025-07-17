import '../../styles/send-email.css';
import TranslateFigmaCoords from '../../global/function/TranslateFigmaCoords';
import AppWindow from '../UI/AppWindow';
import NavBar from '../UI/NavBar';
import InputField from '../UI/form/InputField';
import TextBox from '../UI/form/TextBox';
import { useWindowSize } from '../../hooks/responsive/useWindowSize';
const SendEmail: React.FC = () => {
  // Re-Render on window resize
  const windowSize = useWindowSize();
  console.log("Window size:", windowSize);
  return (
    <>
      <NavBar />
      <AppWindow  
        width={575}
        height={630}
        style={{
          position: "absolute",
          top: `${TranslateFigmaCoords.translateFigmaY(80)}px`,
          left: "50%",
          paddingTop:`${TranslateFigmaCoords.translateFigmaY(15)}px`,
          transform: "translate(-50%, 0%)",
          display: "flex",
          flexDirection: 'column',
          alignItems: "center", 
          gap: `${TranslateFigmaCoords.translateFigmaY(10)}px`, 
          overflow:'hidden'
        }}
      >
        <div className="contactar-mail">
          <div className="titulo">
            <h2>Contacto vía correo electrónico</h2>
          </div>
          <div className='contactar-contenidos'>
            <InputField
              type="text"
              name="username"
              placeholder="Destinatario: ElPanaMiguel , panamiguel54@hotmail.com"
              style={{ height: `${TranslateFigmaCoords.translateFigmaY(55)}px`, width: `${TranslateFigmaCoords.translateFigmaY(620)}px`, }}
            />
            <InputField
              type="text"
              name="username"
              placeholder="Asunto del correo"
              style={{ height: `${TranslateFigmaCoords.translateFigmaY(55)}px`, width: `${TranslateFigmaCoords.translateFigmaY(620)}px`, }}
            />
            <TextBox
              placeholder="Ingrese el cuerpo del correo"
              name='text-tarea'
              style={{ height: `${TranslateFigmaCoords.translateFigmaY(235)}px`, width: `${TranslateFigmaCoords.translateFigmaY(620)}px`, }}
            />
          </div>
        </div>
        <div className="btns">
          <button className="btn-deshacer">Deshacer correo</button>
          <button className="btn-enviar">Enviar correo</button>
        </div>

      </AppWindow>
    </>
  );
};

export default SendEmail;
