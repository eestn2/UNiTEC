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
sudo apt-get install docker.io docker-compose
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

## 2. ⚙️ Actualizar archivo `.env`

Descarga la **última versión del archivo `.env`** desde Google Drive y colócalo en la raíz del proyecto.

---


## 3. 🏗 Construir la imagen de Docker

Desde la raíz del proyecto (`UNiTEC`):

```bash
docker-compose -f docker-compose.yml up --build
```

Esto generará las imágenes necesarias.

---

## 4. ❌ Finalizar la ejecución

Cuando el proceso termine, presiona `Ctrl + C` para cerrar los contenedores.

---

## 5. ▶ Ejecutar el proyecto en modo desarrollo

Cada vez que quieras iniciar el proyecto:

```bash
docker-compose up
```

---
