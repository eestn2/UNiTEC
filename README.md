# 🌟 UNiTEC - La conexión entre Egresados Técnicos y Empresas

Bienvenido a **UNiTEC**, una plataforma web moderna y responsiva que conecta egresados de escuelas técnicas con empresas y oportunidades laborales. UNITEC está diseñada para facilitar la inserción laboral, la gestión de perfiles profesionales y la interacción directa entre estudiantes, egresados y empresas.

---

## 🚀 Características Principales

- 👤 **Gestión de Perfiles:** Registro y edición de perfiles de egresados y empresas, incluyendo  idiomas, etiquetas y portfolio.
- 🏢 **Portal Empresarial:** Empresas pueden publicar ofertas de empleo, gestionar postulaciones y buscar candidatos según requisitos definidos por ellos.
- 📬 **Notificaciones y Mensajería:** Sistema de notificaciones en tiempo real y mensajería por email entre usuarios y empresas para mayor confidencialidad.
- 🔐 **Seguridad y Privacidad:** Autenticación segura, gestión de sesiones, recuperación y cambio de contraseña.
- 📊 **Panel de Administración:** Herramientas para la gestión de usuarios, reportes y manejo de permisos.

---
## OUTDATED SECTION ------------ BEGINNING -------------
## 🖥️ Arquitectura Técnica

### Frontend (React + TypeScript)
- **Framework:** [React.js](https://react.dev/) + TypeScript
- **Estilos:** CSS modularizado (`/styles/globals.css`, `/styles/index.css`) con variables CSS y diseño responsivo.
- **Componentes Reutilizables:**  
  - `AppWindow`, `ActionButton`, `InputField`, `SelectionField`, `LabelsSelection`, `LabelsContainer`, `Label`, `Notification`, `NavBar`, `Logo`, etc.
- **Gestión de Estado:** Hooks de React (`useState`, `useEffect`) para formularios, autenticación y manejo de ventanas responsivas.
- **Ruteo:** [React Router](https://reactrouter.com/) para navegación entre login, registro, feed, recuperación de contraseña, etc.
- **Consumo de API:** [Axios](https://axios-http.com/) para comunicación con el backend PHP.
- **Validaciones:** Validación de formularios y manejo de errores en tiempo real.

### Backend (PHP + MySQL)
- **API RESTful:** Endpoints PHP en `/src/php/requests/` y lógica en `/src/php/logic/` para autenticación, registro, recuperación de datos, gestión de ofertas, etc.
- **Control de Acceso:**  
  - Middleware de CORS (`cors-policy.php`).
  - Gestión de sesiones PHP y cookies seguras.
- **Base de Datos:**  
  - MySQL/MariaDB, acceso mediante `mysqli` y prepared statements.
  - Estructura relacional: usuarios, empresas, ofertas, postulaciones, etiquetas, idiomas, niveles, etc.
- **Utilidades:**  
  - Funciones de respuesta estándar (`return_response.php`).
  - Controladores y servicios (`UserServiceManager.php`, `JobOfferManager.php`, etc.).
  - Seguridad: hashing de contraseñas, validación de datos, protección contra SQL Injection.
- **Email:** Integración con PHPMailer para notificaciones y confirmaciones de registro.

---

## 📂 Estructura del Proyecto

```
src/
│
├── assets/           # Imágenes, íconos y recursos gráficos
│   ├── react.svg
│   ├── icons/
│   ├── navbar/
│   ├── unitec/
│   └── user/
├── components/       # Componentes React (UI, sesión, feed, etc.)
│   ├── UI/
│   ├── session/
│   └── feed/
├── global/           # Funciones utilitarias globales
│   └── function/
├── php/              # Backend PHP (requests, lógica, config, PHPMailer)
│   ├── requests/
│   ├── logic/
│   ├── config/
│   ├── PHPMailer/
│   └── DotEnv.php
├── styles/           # Hojas de estilo globales y variables CSS
│   ├── globals.css
│   └── index.css
├── main.tsx          # Entry point de React
└── vite-env.d.ts     # Tipos globales para Vite/TypeScript
```

- **Nota:** La lógica de backend y los controladores principales están en `/src/php/logic/`. PHPMailer se usa para notificaciones por correo y recuperación de contraseña.

## ⚙️ Instalación y Ejecución Local

### Requisitos

- Node.js y npm
- XAMPP/WAMP/LAMP (PHP 8+, MySQL/MariaDB)
- Composer (opcional, para dependencias PHP)
- [PHPMailer](https://github.com/PHPMailer/PHPMailer) (para notificaciones por correo)

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
## OUTDATED SECTION ------------ END -------------
---

## 🚀 TOP CONTRIBUIDORES
<a href="https://github.com/eestn2/UNiTEC/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=eestn2/UNiTEC" />
</a>

Made with [contrib.rocks](https://contrib.rocks).


---

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia MIT.  
Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

¡Gracias por usar **UNiTEC**!  
¿Tienes dudas o sugerencias? Abre un issue o contáctanos.
