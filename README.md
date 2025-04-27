# MASTER-BARBER-REACT

Este proyecto es una aplicación fullstack para la gestión de turnos y administración de inventarios en una barbería. Utiliza React para el frontend y Node.js para el backend.

## 📋 Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js v14+](https://nodejs.org/) 
- [npm v6+](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- Puertos 5173 disponibles en tu máquina.
- http://localhost:5173/

## 🗄️ Base de Datos

El proyecto utiliza una base de datos MySQL para la gestión de los datos. Asegúrate de tener MySQL corriendo en tu máquina.

### Configuración de la base de datos

1. Crear base de datos:

   ```sql
   CREATE DATABASE master_barber;
Importar el archivo master_barber.sql en tu gestor de base de datos (como MySQL (XAMPP)).

El archivo SQL se encuentra en:
\Documents\GitHub\MASTER-BARBER-REACT\Master Barber\BaseDeDatos

🛠️ Configuración inicial
1. Clonar el repositorio
Clona el repositorio desde GitHub en tu máquina local:

git clone https://github.com/tu-usuario/MASTER-BARBER-REACT.git
cd MASTER-BARBER-REACT
2. Instalar dependencias
Backend:

Dentro de la carpeta del proyecto, navega a la carpeta backcend en visual y ejecuta el siguiente comando para instalar las dependencias del backend:

npm install
Frontend:

Abre una nueva terminal y navega a la carpeta frontend en visual, luego instala las dependencias del frontend:

cd ../frontend
npm install
3. Configurar la Base de Datos
Asegúrate de tener MySQL corriendo en tu máquina local.

Crea la base de datos master_barber.

Importa el script back/src/config/master_barber.sql en tu gestor de base de datos.

4. Configuración de la URL Local
Asegúrate de que la URL del frontend y el backend se configuren correctamente. El backend generalmente corre en el puerto 8080, y el frontend en el puerto 5173. Si los puertos son diferentes, actualiza las URLs en los archivos de configuración.


🖥️ Ejecución del Proyecto
1. Iniciar el Backend
En la terminal del backend, navega a la carpeta backend y ejecuta el siguiente comando para iniciar el servidor:


npm start


2. Iniciar el Frontend
En la terminal del frontend, navega a la carpeta frontend y ejecuta el siguiente comando para iniciar el servidor:

cd ../frontend
npm start
3. Acceder a la WEB
Local: Abre tu navegador y visita http://localhost:5173/.


🚨 Solución de Problemas
Problemas con la Base de Datos
Asegúrate de que la base de datos se llame exactamente master_barber.

Verifica que el script master_barber.sql se haya importado correctamente.

Revisa la conexión a la base de datos en el archivo de configuración del backend (\Documents\GitHub\MASTER-BARBER-REACT\Master Barber\Backend  DOCUMENTO SERVER.JS).
En la terminal debera decir Conexion exitosa:) Conectado a la base de datos

Problemas con el Backend o Frontend
Asegúrate de que las dependencias de ambos (frontend y backend) estén correctamente instaladas (npm install).

Verifica que los puertos 8080 y 5173 no estén siendo utilizados por otro servicio.

¡Listo! Ahora deberías tener la aplicación corriendo en tu entorno local.

NOTA IMPORTANTE:
USUARIOS PARA CADA ROL

ADMINISTRADOR: Correo: Admin@gmail.com  Contraseña:Admin12345


USUARIO(cliente): Correo: Usuario@gmail.com  Contraseña:usuario12345


BARBERO: Correo: barbero@gmail.com   Contraseña: barbero12345
