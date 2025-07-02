import { useEffect, useState } from "react";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import ActionButton from "../UI/ActionButton";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

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
        height={500}
        width={1234}
        style={{
          position: "absolute",
          left: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
          top: `${TranslateFigmaCoords.translateFigmaY(100)}px`,
          overflowY: "scroll",
        }}
      >
        <div style={{ padding: 20 }}>
          <h2 style={{ textAlign: "center", color: "#305894" }}>
            Reseñas
          </h2>

          {resenias.map((res) => (
            <div
              key={res.id}
              style={{
                background: "#fff",
                margin: "16px 0",
                borderRadius: 20,
                padding: 16,
                display: "flex",
                justifyContent: "space-between",
                border: "2px solid #5386FF",
              }}
            >
              {/* Columna: Reseña dejada por */}
              <div
                style={{
                  flex: 1,
                  marginRight: 16,
                  background: "#DEE0EB",
                  borderRadius: 20,
                  padding: 16,
                  border: "2px solid #305894",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontWeight: "bold", margin: 0 }}>{res.autorEmail}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <ActionButton text="Ver Perfil" />
                    <ActionButton text="🗑️"  />
                  </div>
                </div>
                <div style={{ marginTop: 10 }}>
                  <p style={{ margin: 0 }}>{res.texto.slice(0, 100)}...</p>
                  <ActionButton text="Ver más" style={{ marginTop: 10 }} />
                </div>
              </div>

              {/* Columna: Oferta o Usuario reseñado */}
              <div
                style={{
                  flex: 1,
                  background: "#F7F7F7",
                  borderRadius: 20,
                  padding: 16,
                  border: "2px solid #305894",
                }}
              >
                {res.tipo === "usuario-a-oferta" ? (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <p style={{ fontWeight: "bold", margin: 0 }}>{res.empresaEmail}</p>
                      <ActionButton text="Ver Perfil" />
                    </div>
                    <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <p style={{ margin: 0 }}>{res.tituloOferta}</p>
                      <ActionButton text="Ver Oferta" />
                    </div>
                  </>
                ) : (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontWeight: "bold", margin: 0 }}>{res.usuarioEmail}</p>
                    <ActionButton text="Ver Perfil" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </AppWindow>
    </>
  );
};

export default AdminReview;