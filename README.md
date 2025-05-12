# 🌟 UNITEC - Plataforma Integral de Egresados Técnicos

Bienvenido a **UNITEC**, una plataforma web moderna y responsiva que conecta egresados de escuelas técnicas con empresas y oportunidades laborales. UNITEC está diseñada para facilitar la inserción laboral, la gestión de perfiles profesionales y la interacción directa entre estudiantes, egresados y empresas.

---

## 🚀 Características Principales

- 👤 **Gestión de Perfiles:** Registro y edición de perfiles de egresados y empresas, incluyendo habilidades, idiomas, etiquetas, portafolio y más.
- 🏢 **Portal Empresarial:** Empresas pueden publicar ofertas de empleo, gestionar postulaciones y buscar candidatos según criterios avanzados.
- 🔍 **Buscador Inteligente:** Encuentra ofertas laborales filtrando por etiquetas, idiomas, nivel de experiencia y ubicación.
- 📬 **Notificaciones y Mensajería:** Sistema de notificaciones en tiempo real y mensajería directa entre usuarios y empresas.
- 🔐 **Seguridad y Privacidad:** Autenticación segura, gestión de sesiones, recuperación y cambio de contraseña.
- 📄 **Carga de Documentos:** Adjunta CV, certificados y otros archivos relevantes a tu perfil.
- 📊 **Panel de Administración:** Herramientas para la gestión de usuarios, ofertas y estadísticas del sistema.

---

## 🖥️ Arquitectura Técnica

### Frontend (React + TypeScript)

- **Framework:** [React.js](https://react.dev/) + TypeScript
- **Estilos:** CSS modularizado (`/styles/globals.css`, `/styles/index.css`) con variables CSS y diseño responsivo basado en coordenadas de Figma.
- **Componentes Reutilizables:**  
  - `AppWindow`, `ActionButton`, `InputField`, `SelectionField`, `LabelsSelection`, `LabelsContainer`, `Label`, `Notification`, `NavBar`, `Logo`, etc.
- **Gestión de Estado:** Hooks de React (`useState`, `useEffect`) para formularios, autenticación y manejo de ventanas responsivas.
- **Ruteo:** [React Router](https://reactrouter.com/) para navegación entre login, registro, feed, recuperación de contraseña, etc.
- **Consumo de API:** [Axios](https://axios-http.com/) para comunicación con el backend PHP.
- **Validaciones:** Validación de formularios y manejo de errores en tiempo real.

### Backend (PHP + MySQL)

- **API RESTful:** Endpoints PHP en `/src/php/requests/` para autenticación, registro, recuperación de datos, gestión de ofertas, etc.
- **Control de Acceso:**  
  - Middleware de CORS (`cors-policy.php`) configurable por entorno.
  - Gestión de sesiones PHP y cookies seguras.
- **Base de Datos:**  
  - MySQL/MariaDB, acceso mediante `mysqli` y prepared statements.
  - Estructura relacional: usuarios, empresas, ofertas, postulaciones, etiquetas, idiomas, niveles, etc.
- **Utilidades:**  
  - Funciones de respuesta estándar (`return_response.php`).
  - Controladores y servicios (`UserServiceManager.php`, `JobOfferManager.php`, etc.).
  - Seguridad: hashing de contraseñas, validación de datos, protección contra SQL Injection.
- **Email:** Integración con EmailJS para notificaciones y confirmaciones de registro.

---

## 📂 Estructura del Proyecto

```
src/
│
├── assets/           # Imágenes, íconos y recursos gráficos
├── components/       # Componentes React (UI, sesión, feed, etc.)
│   ├── UI/
│   ├── session/
│   └── feed/
├── global/           # Funciones utilitarias globales
├── php/              # Backend PHP (requests, lógica, config)
│   ├── requests/
│   ├── logic/
│   └── config/
├── styles/           # Hojas de estilo globales y variables CSS
│   ├── globals.css
│   └── index.css
└── main.tsx          # Entry point de React
```

---

## ⚙️ Instalación y Ejecución Local

### Requisitos

- Node.js y npm
- XAMPP/WAMP/LAMP (PHP 8+, MySQL/MariaDB)
- Composer (opcional, para dependencias PHP)
- [EmailJS](https://www.emailjs.com/) (para notificaciones por correo)

### Pasos

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tuusuario/unitec.git
   cd unitec
   ```

2. **Frontend (React):**
   ```bash
   npm install
   npm run dev
   ```
   Accede a [http://localhost:5173/UNITEC](http://localhost:5173/UNITEC) (o el puerto configurado).

3. **Backend (PHP):**
   - Copia el contenido de `src/php/` a tu servidor local (`htdocs` en XAMPP).
   - Configura la base de datos en `src/php/config/`.
   - Asegúrate de tener un archivo `.env` con las variables necesarias (ver ejemplo en `/php/DotEnv.php`).

4. **Base de Datos:**
   - Importa el esquema y datos iniciales desde `/src/php/database/` (si existe).

---

## 🛡️ Seguridad

- Contraseñas hasheadas y validadas en backend.
- Protección CORS y sanitización de entradas.
- Gestión de sesiones y cookies seguras.
- Validación de formularios en frontend y backend.

---

## 📸 Capturas de Pantalla

> *(Agrega aquí imágenes del sitio usando markdown)*  
> `![Login](./screenshots/login.png)`  
> `![Feed](./screenshots/feed.png)`  
> `![Registro](./screenshots/register.png)`

---

## 👨‍💻 Autores

- **Haziel Magallanes** — Frontend, Arquitectura, API Endpoints, UX, Documentación.
- **Daviel Díaz Gonzáles** — Frontend, UI/UX.
- **Federico Nicolas Martinez** — Backend, API Endpoints, Seguridad, Integraciones, Mantenimiento y reforma de old codebase.
- **Daniel Alejandro Rivas** — Mantenimiento y reforma de old codebase.
- **Francesco Sidotti** — Mantenimiento y reestructurado de antigua Database.


---

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia MIT.  
Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

¡Gracias por usar **UNITEC**!  
¿Tienes dudas o sugerencias? Abre un issue o contáctanos.