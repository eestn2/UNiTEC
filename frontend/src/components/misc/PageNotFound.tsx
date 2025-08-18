import React from 'react';
import AppWindow from '../UI/AppWindow';
import Guy from '../../assets/404/404Guy.svg';
import Text from '../../assets/404/404Text.svg';
import ActionButton from '../UI/ActionButton';
import '../../styles/globals.css'
import '../../styles/index.css'
import '../../styles/util.css'
import {useNavigate} from 'react-router-dom';
import TranslateFigmaCoords from '../../global/function/TranslateFigmaCoords';

const PageNotFound: React.FC = () => {
    const navigate = useNavigate();
    return (
        <AppWindow
            style={{
                display: 'grid',
                gridTemplateColumns: 'auto auto',
                width:"auto",   
                             height: 'fit-content',
                padding: `${TranslateFigmaCoords.translateFigmaY(40)}px`, 
                gap: `${TranslateFigmaCoords.translateFigmaY(40)}px`}}
            className='centered'
        >
            <div 
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',  
                width: '100%',
            flexDirection:"column"}}
            className='vertical-one'>
                <div>
                    <img src={Text} alt="404 Text" style={{}}></img>
                </div>
                <div>
                    <p style={{ color: 'var(--important-text)', fontSize: `${TranslateFigmaCoords.translateFigmaY(20)}px`, width:"85%",textAlign:"center",margin:"0 auto"}}>¡Vaya! Parece que la página que estás buscando no 
                        existe o se ha movido.</p>
                </div>
                <ActionButton action={() => navigate("/")} width={280} height={70}
                style={{
                    margin:"0 auto",
                    fontSize: `${TranslateFigmaCoords.translateFigmaY(30)}px`,
                }}>Regresar al inicio</ActionButton>
            </div>
            <img src={Guy} alt="404 Guy" style={{width: 'auto', height: '100%'}}/>
        </AppWindow>
    );
};

export default PageNotFound;