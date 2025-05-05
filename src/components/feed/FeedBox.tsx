import React from "react";
import "../../styles/index.css";
import NavBar from '../UI/NavBar'

import AppWindow from '../UI/AppWindow'
import JobOffer from "../UI/JobOffer";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

function FeedBox(){
 return (
    <div className="feedbox">
      <NavBar />
      <div className="feedbox-section">
        <AppWindow height={600} width={880} style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <JobOffer width={820} height={350} username="Pepe.co" profile_picture="" style={{
            marginTop: `${TranslateFigmaCoords.translateFigmaY(10)}px`
          }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, quis dicta! Itaque et molestiae, saepe tempore perspiciatis rerum veniam soluta totam. A nostrum quisquam porro ratione necessitatibus nulla autem ipsam.
          </JobOffer>
        </AppWindow>
        <AppWindow height={600} width={340}></AppWindow>
      </div>
    </div>
 )
}

export default FeedBox;