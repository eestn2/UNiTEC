import "../../styles/index.css";
import NavBar from '../UI/NavBar'

import AppWindow from '../UI/AppWindow'
import JobOffer from "../UI/JobOffer";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import Notification from "../UI/Notification";

function FeedBox(){
 return (
    <div>
      <NavBar />
      <AppWindow height={600} width={880} className="feedbox" style={{
        position: "absolute",
        left: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
        overflowY: "scroll",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
      }}>
        <div className="feed-title" style={{
            width: `${TranslateFigmaCoords.translateFigmaX(350)}px`,
            height: `${TranslateFigmaCoords.translateFigmaY(53)}px`,
            position: "relative",
            left: "50%",
            transform: "translateX(-47%)",
            marginTop: `${TranslateFigmaCoords.translateFigmaY(32)}px`,
            marginBottom: `${TranslateFigmaCoords.translateFigmaY(32)}px`
          }}>Ofertas de Trabajo</div>
        <JobOffer width={820} height={400} username="Pepe.co" profile_picture="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, quis dicta! Itaque et molestiae, saepe tempore perspiciatis rerum veniam soluta totam. A nostrum quisquam porro ratione necessitatibus nulla autem ipsam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae similique nemo ad cumque dolorem aspernatur ipsam assumenda magnam unde officia. Quam optio mollitia doloribus quidem eveniet eaque fugiat deserunt consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi perspiciatis praesentium soluta libero delectus eveniet, esse quae optio asperiores labore consectetur, deserunt vitae quas suscipit veniam odio error dolorem voluptates. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis nam molestias rem deleniti voluptatum veritatis dicta, modi labore atque velit hic provident facilis vero voluptates adipisci illum architecto, magni aperiam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis eveniet nam, molestiae voluptatem iure tempora illo inventore exercitationem quas perspiciatis, id aliquid maxime mollitia aperiam et. Velit nulla aliquam repudiandae. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate quibusdam iure vero doloremque iusto nam suscipit, ea excepturi? Laboriosam error quod eius. Quia cum velit, beatae voluptatum nobis odio minus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo ducimus, saepe ullam odio facere, eveniet neque officia maiores quidem eos inventore voluptatem, voluptates esse totam dicta nostrum hic deserunt possimus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, explicabo! Delectus ex cupiditate asperiores deleniti, rerum, maxime quibusdam ut, aspernatur iusto explicabo eum in! Voluptate rerum dolorem esse magnam ipsum! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum aspernatur odit veniam ullam id ut libero autem? Dolor, quasi expedita at pariatur deserunt praesentium adipisci velit placeat iure eius eos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur recusandae alias atque veniam facilis id accusantium numquam enim qui, excepturi accusamus adipisci ducimus necessitatibus cum, veritatis odit maxime provident. Nesciunt? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo sint eveniet eaque consequuntur porro officia saepe iure totam sit natus, vero temporibus. Tempore alias distinctio officia provident fugiat ut est.
        </JobOffer>
        <JobOffer width={820} height={400} username="Empresaurio.co" profile_picture="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, quis dicta! Itaque et molestiae, saepe tempore perspiciatis rerum veniam soluta totam. A nostrum quisquam porro ratione necessitatibus nulla autem ipsam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae similique nemo ad cumque dolorem aspernatur ipsam assumenda magnam unde officia. Quam optio mollitia doloribus quidem eveniet eaque fugiat deserunt consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi perspiciatis praesentium soluta libero delectus eveniet, esse quae optio asperiores labore consectetur, deserunt vitae quas suscipit veniam odio error dolorem voluptates. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis nam molestias rem deleniti voluptatum veritatis dicta, modi labore atque velit hic provident facilis vero voluptates adipisci illum architecto, magni aperiam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis eveniet nam, molestiae voluptatem iure tempora illo inventore exercitationem quas perspiciatis, id aliquid maxime mollitia aperiam et. Velit nulla aliquam repudiandae. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate quibusdam iure vero doloremque iusto nam suscipit, ea excepturi? Laboriosam error quod eius. Quia cum velit, beatae voluptatum nobis odio minus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo ducimus, saepe ullam odio facere, eveniet neque officia maiores quidem eos inventore voluptatem, voluptates esse totam dicta nostrum hic deserunt possimus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, explicabo! Delectus ex cupiditate asperiores deleniti, rerum, maxime quibusdam ut, aspernatur iusto explicabo eum in! Voluptate rerum dolorem esse magnam ipsum! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum aspernatur odit veniam ullam id ut libero autem? Dolor, quasi expedita at pariatur deserunt praesentium adipisci velit placeat iure eius eos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur recusandae alias atque veniam facilis id accusantium numquam enim qui, excepturi accusamus adipisci ducimus necessitatibus cum, veritatis odit maxime provident. Nesciunt? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo sint eveniet eaque consequuntur porro officia saepe iure totam sit natus, vero temporibus. Tempore alias distinctio officia provident fugiat ut est.
        </JobOffer>
        
        
      </AppWindow>
        <AppWindow height={600} width={340} style={{
          position: "absolute",
          right: `${TranslateFigmaCoords.translateFigmaX(20)}px`
        }}>
          <div className="feed-title" style={{
            width: `${TranslateFigmaCoords.translateFigmaX(250)}px`,
            height: `${TranslateFigmaCoords.translateFigmaY(53)}px`,
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: `${TranslateFigmaCoords.translateFigmaY(32)}px`,
            marginBottom: `${TranslateFigmaCoords.translateFigmaY(32)}px`
          }}>Notificaciones</div>
          <Notification width={300} height={60}>
            La empresa XEmpress.CO te ha enviado un correo! <a>Ver más.</a>
          </Notification>
        </AppWindow>
    </div>
 )
}

export default FeedBox;