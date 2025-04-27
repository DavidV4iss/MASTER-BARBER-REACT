# MASTER-BARBER-REACT

Este proyecto es una aplicación fullstack para la gestión de turnos y administración de inventarios en una barbería. Utiliza React para el frontend y Node.js para el backend.

## 📋 Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js v14+](https://nodejs.org/) 
- [npm v6+](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- Puertos 3000 y 5000 disponibles en tu máquina.

## 🗄️ Base de Datos

El proyecto utiliza una base de datos MySQL para la gestión de los datos. Asegúrate de tener MySQL corriendo en tu máquina.

### Configuración de la base de datos

1. Crear base de datos:

   ```sql
   CREATE DATABASE master_barber;
Importar el archivo master_barber.sql en tu gestor de base de datos (como MySQL Workbench o mediante consola).

El archivo SQL se encuentra en:
back/src/config/master_barber.sql

🛠️ Configuración inicial
1. Clonar el repositorio
Clona el repositorio desde GitHub en tu máquina local:

bash
Copiar
Editar
git clone https://github.com/tu-usuario/MASTER-BARBER-REACT.git
cd MASTER-BARBER-REACT
2. Instalar dependencias
Backend:

Dentro de la carpeta del proyecto, navega a la carpeta back y ejecuta el siguiente comando para instalar las dependencias del backend:

bash
Copiar
Editar
cd back
npm install
Frontend:

Abre una nueva terminal y navega a la carpeta frontend, luego instala las dependencias del frontend:

bash
Copiar
Editar
cd ../front
npm install
3. Configurar la Base de Datos
Asegúrate de tener MySQL corriendo en tu máquina local.

Crea la base de datos master_barber.

Importa el script back/src/config/master_barber.sql en tu gestor de base de datos.

4. Configuración de la URL Local
Asegúrate de que la URL del frontend y el backend se configuren correctamente. El backend generalmente corre en el puerto 5000, y el frontend en el puerto 3000. Si los puertos son diferentes, actualiza las URLs en los archivos de configuración.

🔌 Configuración de Ngrok (opcional)
Si necesitas exponer tu aplicación en la red, puedes usar Ngrok para crear una URL pública temporal para pruebas.

Instalación de Ngrok:

Descarga Ngrok desde Ngrok.

Extrae el archivo descargado.

(Opcional) Añadir Ngrok a tu PATH para acceso global.

Autenticación con Ngrok:

Ejecuta el siguiente comando para autenticar tu cuenta de Ngrok:

bash
Copiar
Editar
ngrok authtoken TU_TOKEN_AQUI
Iniciar Ngrok:

Para exponer tu frontend a través de Ngrok, ejecuta:

bash
Copiar
Editar
ngrok http 3000
Ngrok generará una URL pública que podrás usar para acceder a tu aplicación remotamente.

🖥️ Ejecución del Proyecto
1. Iniciar el Backend
En la terminal del backend, navega a la carpeta back y ejecuta el siguiente comando para iniciar el servidor:

bash
Copiar
Editar
cd back
npm start
2. Iniciar el Frontend
En la terminal del frontend, navega a la carpeta front y ejecuta el siguiente comando para iniciar el servidor:

bash
Copiar
Editar
cd ../front
npm start
3. Acceder a la aplicación
Local: Abre tu navegador y visita http://localhost:3000.

Remoto (Ngrok): Usa la URL HTTPS proporcionada por Ngrok.

🚨 Solución de Problemas
Problemas con la Base de Datos
Asegúrate de que la base de datos se llame exactamente master_barber.

Verifica que el script master_barber.sql se haya importado correctamente.

Revisa la conexión a la base de datos en el archivo de configuración del backend (back/src/config/database.js).

Problemas con el Backend o Frontend
Asegúrate de que las dependencias de ambos (frontend y backend) estén correctamente instaladas (npm install).

Verifica que los puertos 3000 y 5000 no estén siendo utilizados por otro servicio.

Ngrok no inicia
Verifica que el puerto 3000 está libre.

Si tienes un firewall, asegúrate de que no esté bloqueando Ngrok.

¡Listo! Ahora deberías tener la aplicación corriendo en tu entorno local o expuesta remotamente utilizando Ngrok para pruebas.

go
Copiar
Editar

Este `README.md` cubre todos los pasos de configuración y ejecución del proyecto, y está basado en 
