# MASTER-BARBER-REACT

Aplicación fullstack para la gestión de barberías. Incluye un backend Node.js, frontend React web y una aplicación móvil.

## 📋 Requisitos previos

- [Node.js v14+](https://nodejs.org/)
- [npm v6+ o superior](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- Puertos disponibles: 3000 y 5000
- Editor de código recomendado: [Visual Studio Code](https://code.visualstudio.com/)

## 🛠️ Configuración inicial

### 1. Clonar el repositorio

Abre tu terminal y ejecuta:

git clone https://github.com/tu-usuario/MASTER-BARBER-REACT.git
cd MASTER-BARBER-REACT
2. Abrir el proyecto en Visual Studio Code

Abre la carpeta MASTER-BARBER-REACT en Visual Studio Code:

3. Iniciar el Backend
Navega dentro de la carpeta Master Barber.

Abre una terminal y ejecuta:
npm install
npm start
Esto instalará las dependencias necesarias y levantará el servidor backend.

4. Iniciar la Aplicación Móvil
Ahora, ve a la carpeta Master_BarberMovil.

Abre una terminal nueva en esa carpeta y ejecuta:

npm install
npm start
Esto instalará las dependencias del proyecto móvil y lanzará el entorno de desarrollo.

🖥️ Acceso y Credenciales de Prueba
Para probar la aplicación, usa los siguientes usuarios según el rol:


Rol	Correo	Contraseña
Administrador	Admin@gmail.com	Admin12345
Usuario (Cliente)	Usuario@gmail.com	usuario12345
Barbero	barbero@gmail.com	barbero12345

Importante:
Para poder hacer la funcionalida del administrador tendra que dirijirse a la carpeta (src/repositories) y en los archivos llamados (AuthRepository.js y BarberosRepository.js) tendra que cambiar las rutas indicadas

(AuthRepository.js):
"http://():8080/registrar"
"http://():8080/login"
"http://():8080/validarToken"
(BarberosRepository.js):
"http://():8080/GetBarberos"
"http://():8080/CreateBarberos"
"http://():8080/UpdateBarberos/${id}"
"http://():8080/DeleteBarberos/${id}"

¡IMPORTANTE!:
Te saldra ya una ip por defecto configurada, la cambias por la tuya 
EN LOS () Colocas tu ipV4
como saber tu ip?, tendras que abrir un cmd como administrador y ejecutar el siguiente codigo ipconfig y te aparecera una opcion que dice ipV4 copias y pegas en estos() y ya cuando lo tengas borras las llaves()


El Administrador tiene acceso a funcionalidades exclusivas dentro de la sección Gestionar Barberos.
Desde esta sección podrás Agregar, Editar y Eliminar barberos en el sistema.

🚀 Resumen rápido
Clonar repositorio

Abrir carpeta MASTER-BARBER-REACT en Visual Studio Code

En Master Barber/backend:

npm install

npm start

En Master_BarberMovil:

npm install

npm start

Acceder con las credenciales de prueba.
Rol	Correo	Contraseña
Administrador	Admin@gmail.com	Admin12345
Usuario (Cliente)	Usuario@gmail.com	usuario12345
Barbero	barbero@gmail.com	barbero12345

¡Listo! Ahora puedes comenzar a utilizar y probar todas las funcionalidades de MASTER-BARBER-REACT.
