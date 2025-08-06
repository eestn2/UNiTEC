import '../../styles/send-email.css';
import TranslateFigmaCoords from '../../global/function/TranslateFigmaCoords';
import AppWindow from '../UI/AppWindow';
import NavBar from '../UI/NavBar';
import InputField from '../UI/form/InputField';
import TextBox from '../UI/form/TextBox';
import { useWindowSize } from '../../hooks/responsive/useWindowSize';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface SendEmailProps {
  id?: number;
}
const SendEmail: React.FC = ( {id}:SendEmailProps) => {

  // Re-Render on window resize
  const windowSize = useWindowSize();
  const [userEmail, setUserEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
   const handleGetUserEmail = async (id : number) => {
    try {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/enterprise/get-user-email.php`, {
        params: {userId: id},

      });
      if (response.status !== 200 && response.data.status !== "success") {
        console.error("Failed to load tags:", response.data.message);
      } else {
        setUserEmail(response.data.data.email);
        setUsername(response.data.data.name);
        console.log(response.data.data.offers);
      }
    } catch (error) {
      console.error("An error occurred while loading tags:", error);
    }
  };
  if(import.meta.env.DEV) console.log("Compiler stop crying please", windowSize)
  useEffect(() => {
    if (id) {
      handleGetUserEmail(id);
    }
  });
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
          <div className='contactar-contenidos' 
          >
            <div className='input-field' style={{ height: `${TranslateFigmaCoords.translateFigmaY(55)}px`,
           width:"95%", }}>
              <div className="contactar-destinatario" >
                <span>Destinatario: </span>
                <span className="destinatario-email">{userEmail}</span>
              </div>
              <div className="contactar-username">
                <span>Nombre: </span>
                <span className="destinatario-username">{username}</span>
              </div>
            </div> 
            <InputField
              type="text"
              name="username"
              placeholder="Asunto del correo"
              width={"95%"}
              height={`${TranslateFigmaCoords.translateFigmaY(55)}px`} 
            />
            <TextBox
              placeholder="Ingrese el cuerpo del correo"
              name='text-tarea'
              width={"95%"}
              height={`${TranslateFigmaCoords.translateFigmaY(235)}px`}
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
