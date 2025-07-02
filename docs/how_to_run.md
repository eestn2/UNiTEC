Aquí tienes una versión mejorada, más clara y bien formateada de tu guía:

---

# 🛠 Guía para Ejecutar la Nueva Versión del Proyecto **UNiTEC**

---

## 1. 🐳 Instalar Docker

### En GNU/Linux:

* **Distribuciones basadas en Arch:**

```bash
sudo pacman -S docker docker-compose
```

* **Distribuciones basadas en Debian (Ubuntu, etc.):**

```bash
sudo apt-get install docker docker-compose
```

**Permitir usar Docker sin `sudo`:**

```bash
sudo usermod -aG docker $USER
```

> Cierra la sesión y vuelve a iniciarla para aplicar los permisos.

### En Windows:

Sigue la guía oficial de instalación:
🔗 [https://docs.docker.com/desktop/setup/install/windows-install/](https://docs.docker.com/desktop/setup/install/windows-install/)

---

## 2. 🎼 Instalar Composer

### En GNU/Linux:

* **Arch:**

```bash
sudo pacman -S composer
```

* **Debian:**

```bash
sudo apt-get install composer
```

---

## 3. 📦 Instalar Node.js / npm

### En GNU/Linux:

* **Arch:**

```bash
sudo pacman -S npm
```

* **Debian:**

```bash
sudo apt-get install npm
```

### En Windows:

Descargar desde la página oficial:
🔗 [https://nodejs.org/en/download](https://nodejs.org/en/download)

> Asegúrate de que `npm` esté disponible desde la terminal.

---

## 4. ⚙️ Actualizar archivo `.env`

Descarga la **última versión del archivo `.env`** desde Google Drive y colócalo en la raíz del proyecto.

---

## 5. 📥 Instalar dependencias de PHP

Desde la carpeta raíz del proyecto:

```bash
cd backend
composer install
```

---

## 6. 📥 Instalar dependencias de JavaScript

Desde la carpeta raíz del proyecto:

```bash
cd frontend
npm install
```

> ✅ **Windows:** Es posible que debas habilitar la ejecución de scripts remotos la primera vez:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

## 7. 🏗 Construir la imagen de Docker

Desde la raíz del proyecto (`UNiTEC`):

```bash
docker-compose -f docker-compose.yml up --build
```

Esto generará las imágenes necesarias.

---

## 8. ❌ Finalizar la ejecución

Cuando el proceso termine, presiona `Ctrl + C` para cerrar los contenedores.

---

## 9. ▶ Ejecutar el proyecto en modo desarrollo

Cada vez que quieras iniciar el proyecto:

```bash
docker-compose up
```

---

¿Querés que también prepare una versión PDF o Markdown (`README.md`) con esta guía?
