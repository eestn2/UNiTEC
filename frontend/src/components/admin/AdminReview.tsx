import { useEffect, useState } from "react";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import ReviewRow from "../UI/admin/ReviewRow";

type Resenia = {
  id: string;
  autorEmail: string;
  texto: string;
  tipo: "usuario-a-oferta" | "empresa-a-usuario";
  empresaEmail?: string;
  usuarioEmail?: string;
  tituloOferta?: string;
};

const AdminReview: React.FC = () => {
  const [resenias, setResenias] = useState<Resenia[]>([]);

  useEffect(() => {
    // Simulación de carga de reseñas
    const mockResenias: Resenia[] = [
      {
        id: "1",
        autorEmail: "whenHagoUnaReseña@gmail.com",
        texto: "Lorem ipsum dolor sit amet consectetur. Nulla lorem nec eget vitae feugiat.ghasgdihasGHdghsagdhjgsjhagdjhagsdjhagvsdjhgavsdjhgvasdgvadgvasgdvashvdahgsdvahgvdaghsvdgahsvdghasvdhgvasdghvasghdvaghsvdhgavdgasd",
        tipo: "usuario-a-oferta",
        empresaEmail: "empresa@trabajo.si",
        tituloOferta: "Soy el Título de la Oferta específica",
      },
      {
        id: "2",
        autorEmail: "empresaReview@gmail.com",
        texto: "Muy buen candidato, puntual y responsable.",
        tipo: "empresa-a-usuario",
        usuarioEmail: "usuarioCandidato@correo.com",
      },
            {
        id: "3",
        autorEmail: "empresaReview@gmail.com",
        texto: "Muy buen candidato, puntual y responsable.",
        tipo: "empresa-a-usuario",
        usuarioEmail: "usuarioCandidato@correo.com",
      },
    ];
    setResenias(mockResenias);
  }, []);

  return (
    <>
      <NavBar />
      <AppWindow
        height={600}
        width={1240}
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          left: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
          top: `${TranslateFigmaCoords.translateFigmaY(100)}px`,
        }}
      >
        <AppWindow
          height={487}
          width={1200}
          style={{
            border: `${TranslateFigmaCoords.translateFigmaX(3)}px solid #5386FF`,
            borderRadius: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
            overflowY: "scroll",
          }}  > 
          <ReviewRow></ReviewRow>
          </AppWindow>
      </AppWindow>
    </>
  );
};

export default AdminReview;