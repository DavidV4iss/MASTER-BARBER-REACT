const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const moment = require('moment');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs')
const path = require('path');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "master_barber"
})


// Configuración de transporte de nodemailer para enviar correos electrónicos
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'cristianrueda0313@gmail.com',
        pass: 'ryke ekks cwbx rstg',
    }
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validar si email o contraseña no están vacíos
    if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, userResult) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error del servidor" });
        }

        // Verificar si el usuario existe
        if (userResult.length === 0) {
            return res.status(400).json({ error: "El usuario no existe, por favor registrese" });
        }

        // Comparar la contraseña
        const usuario = userResult[0];
        bcrypt.compare(password, usuario.contrasena, (err, isMatch) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Error al verificar la contraseña" });
            }
            if (isMatch) {

                const secretKey = 'miClaveSecreta';  // Debes guardar la clave secreta en un entorno seguro

                // Crear el token JWT con una expiración de 1 hora
                const token = jwt.sign({ id: usuario.id_usuario, email: usuario.email, role: usuario.id_rol }, secretKey, { expiresIn: '1h' });

                // Enviar la respuesta con el token generado
                return res.status(200).json({
                    message: "Inicio de sesión exitoso",
                    token: token,
                    user: {
                        id: usuario.id,
                        email: usuario.email,
                        role: usuario.id_rol
                    }
                });
            } else {
                return res.status(400).json({ error: "Contraseña incorrecta" });
            }
        });
    });
});


// Middleware para verificar el token
const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: "Token no proporcionado" });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'miClaveSecreta', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token inválido" });
        }

        // Guardar la información del usuario en la solicitud para usar en rutas protegidas
        req.usuario = decoded;
        next();
    });
};




app.post('/registrar', (req, res) => {

    const nombreusuario = req.body.nombre_usuario
    const email = req.body.email
    const nit = req.body.nit
    const telefono = req.body.telefono
    const contraseña = req.body.contraseña
    const confirmar_contraseña = req.body.confirmar_contraseña


    db.query("SELECT * FROM usuarios WHERE email = ? OR nit = ?", [email, nit], (err, result) => {

        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }

        else if (result.length > 0) {
            return res.status(400).send("El usuario ya existe")
        }

        else if (contraseña !== confirmar_contraseña) {
            return res.status(400).send('Las contraseñas no coinciden');
        }

        else if (contraseña.length < 8) {
            return res.status(400).send('La contraseña debe tener al menos 8 caracteres');
        }
        else if (nit.length > 10) {
            return res.status(400).send('Tu numero de documento debe tener 10 caracteres');
        }
        else if (nit.length < 10) {
            return res.status(400).send('Tu numero de documento debe tener 10 caracteres');
        }
        else if (telefono.length > 10) {
            return res.status(400).send('Tu numero de telefono debe tener 10 caracteres');
        }

        else {
            const hashpassword = bcrypt.hashSync(contraseña, 10)
            const q = "INSERT INTO usuarios (nombre_usuario, email, nit, telefono ,contrasena, id_rol) VALUES (?,?,?,?,?,3)"
            const values = [
                nombreusuario,
                email,
                nit,
                telefono,
                hashpassword
            ]
            db.query(q, values, (err) => {
                if (err) {
                    return res.status(500).send(err)
                }
                return res.status(200).send("Usuario creado con exito")
            })
        }
    })
});

app.post('/EnvEmail', (req, res) => {
    const email = req.body.email;

    function generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Buscar el usuario en la base de datos
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length === 0) {
            return res.status(400).send('Usuario no encontrado');
        }

        const user = results[0];
        const verificationCode = generateVerificationCode();
        const expirationDate = moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss');

        db.query('UPDATE usuarios SET user_reset_code = ?, user_reset_code_expiration = ? WHERE id_usuario = ?', [verificationCode, expirationDate, user.id_usuario], (err) => {
            if (err) return res.status(500).json({ message: 'Error al guardar el código de verificación' + err });

            const mailOptions = {
                from: 'cristianrueda0313@gmail.com',
                to: email,
                subject: 'Código De Verificación Para Restablecer Tu Contraseña',
                html: `
                <div class="container" style="background-color: #212529; color: #fff; padding: 80px;">
                    <div style="text-align: center;">
                        <img src="https://lh3.googleusercontent.com/p/AF1QipNNaFwUx_VedoGhL9IvGzv7J-L4D5Fgp4lAdLZ1=s680-w680-h510" alt=""
                        style="width: 20%; height: 20%;">
                    </div>
                    <h1 style="color:#e9c706; text-align: center; font-weight: bold; font-size: 40px;">Recuperación De Contraseña</h1>
                    <p style="font-size: 20px; text-align: center;">Tu Cod      igo Para Restalecer La Contraseña Es</p>
                    <h2 style="font-size: 50px; font-weight: bolder; color: #ff2f2f ; text-align: center;">${verificationCode}</h2>
                    <h3 ">El Código De Verificación Fue Enviado A Las: <b>${expirationDate}</b></h3>
                    <h3">Este Código Caducará En 1 Hora.</h3>
                    <h3>Gracias Por Confiar En Master Barber</h2>
                `,
            };

            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    return res.status(500).json({ message: 'Error al enviar el correo electrónico' });
                }
                res.status(200).json({ message: 'Código de verificación enviado por correo electrónico' });
            });
        });
    });
});

app.get('/GetInventario', (req, res) => {
    db.query('SELECT * FROM inventario', (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send(results);
        }
    })
})

app.get('/GetInventario/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM inventario WHERE id_producto = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send(results);
        }
    })
})

app.post('/CreateInventario', (req, res) => {
    const nombre = req.body.nombre
    const descripcion = req.body.descripcion_P
    const cantidad = req.body.cantidad
    const categoria = req.body.id_categoria_producto
    const precio = req.body.PrecioUnitario

    const q = 'INSERT INTO inventario (nombre,descripcion_P,cantidad,id_categoria_producto,PrecioUnitario) VALUES (?,?,?,?,?)'

    const values = [
        nombre,
        descripcion,
        cantidad,
        categoria,
        precio
    ]

    db.query(q, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send('Producto creado exitosamente');
        }
    })
})

app.put('/UpdateInventario/:id', (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre
    const descripcion = req.body.descripcion_P
    const cantidad = req.body.cantidad
    const categoria = req.body.id_categoria_producto
    const precio = req.body.PrecioUnitario

    const q = 'UPDATE inventario SET nombre = ?, descripcion_P = ?, cantidad = ?, id_categoria_producto = ?, PrecioUnitario = ? WHERE id_producto = ?'

    const values = [
        nombre,
        descripcion,
        cantidad,
        categoria,
        precio,
        id
    ]
    db.query(q, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send('Producto actualizado exitosamente');
        }
    })
})

app.delete('/DeleteInventario/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM inventario WHERE id_producto = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send('Producto eliminado exitosamente');
        }
    })
});

app.get('/categorias', (req, res) => {
    db.query('SELECT * FROM categoria_producto', (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send(results);
        }
    })
})

app.post('/Cambiarpasscod', (req, res) => {
    const verificaCode = req.body.verificaCode;
    const newContrasena = req.body.newcontrasena
    const confirmContra = req.body.confirmcontra
    const fecha = moment().format('YYYY-MM-DD HH:mm:ss');

    db.query('SELECT * FROM usuarios WHERE user_reset_code = ? AND user_reset_code_expiration > ?', [verificaCode, fecha], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error en el servidor');
        }

        else if (newContrasena !== confirmContra) {
            return res.status(400).send('Las contraseñas no coinciden');
        }

        else if (newContrasena.length < 8) {
            return res.status(400).send('La contraseña debe tener al menos 8 caracteres');
        }

        else if (results.length === 0) {
            return res.status(400).send('Código de verificación invalido o expirado');
        }

        const user = results[0];
        const hashPassword = bcrypt.hashSync(newContrasena, 10)

        db.query('UPDATE usuarios SET contrasena = ?, user_reset_code = NULL, user_reset_code_expiration = NULL WHERE id_usuario = ?', [hashPassword, user.id_usuario], (err) => {
            if (err) return res.status(500).send('Error al actualizar la contraseña');
            res.status(200).send('Contraseña restablecida con éxito');
        });
    });

});

app.get('/GetBarberos', (req, res) => {
    db.query('SELECT * FROM addbarberos', (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send(results);
        }
    })
})

app.get('/GetBarberos/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM addbarberos WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send(results);
        }
    })
})

app.post('/CreateBarberos', (req, res) => {
    const nombre = req.body.nombre
    const descripcion = req.body.descripcion

    const q = 'INSERT INTO addbarberos (nombre,descripcion) VALUES (?,?)'

    const values = [
        nombre,
        descripcion
    ]

    db.query(q, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send('Barbero añadido exitosamente');
        }
    })
})

app.put('/UpdateBarberos/:id', (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre
    const descripcion = req.body.descripcion

    const q = 'UPDATE addbarberos SET nombre = ?, descripcion = ? WHERE id_barbero = ?'

    const values = [
        nombre,
        descripcion,
        id
    ]

    db.query(q, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send('Barbero actualizado exitosamente');
        }
    })
})

app.delete('/DeleteBarberos/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM addbarberos WHERE id_barbero = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send('Barbero eliminado exitosamente');
        }
    })
});






// Middleware para verificar el token y el rol
const verifyTokenAndRole = (allowedRoles) => {
    return (req, res, next) => {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(403).json({ message: 'No token provided.' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized.' });
            }

            // Verificar si el rol del usuario está permitido
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Access denied.' });
            }

            req.user = decoded; // Guardar los datos del usuario para usarlos en las rutas
            next();
        });
    };
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../Frontend/public/images/perfil/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }

})

const upload = multer({ storage: storage })

const borrarFoto = async (foto) => {
    try {
        const filePath = path.resolve(__dirname, `../Frontend/public/images/perfil/${foto}`);
        await fs.promises.unlink(filePath);
    } catch (err) {
        console.error('Error eliminando imagen:', err);
    }
};


app.put('/actualizarUsuario/:email', upload.single('file'), (req, res) => {
    const file = req.file;
    const email = req.params.email;
    const nombre = req.body.nombre;

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            borrarFoto(results[0].Foto)
            let queryValues = [];
            let queryString = 'UPDATE usuarios SET ';

            if (nombre) {
                queryValues.push(nombre);
                queryString += 'nombre_usuario = ?';
            }

            if (file) {
                if (queryValues.length > 0) {
                    queryString += ', '; //
                }
                queryValues.push(file.filename);
                queryString += 'Foto = ?';
            }

            queryString += ' WHERE email = ?';
            queryValues.push(email);

            db.query(queryString, queryValues, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error en el servidor');
                } else {
                    return res.status(200).send('Perfil actualizado exitosamente');
                }
            });
        }
    })
});


app.get('/traerUsuario/:email', (req, res) => {
    const email = req.params.email
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send(results);
        }
    })
})


//CRUD PARA RESERVAS DE BARBEROS Y CLIENTES

// Rutas

// Obtener todos los tipos de servicio
app.get('/api/servicios', (req, res) => {
    db.query('SELECT * FROM tipo_servicio', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Obtener los barberos
app.get('/api/barberos', (req, res) => {
    db.query('SELECT * FROM usuarios WHERE id_rol = 2', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Crear una nueva reserva
app.post('/api/reservas', (req, res) => {
    const { fecha, usuario_id, barbero_id, tipo_servicio_id } = req.body;
    const query = 'INSERT INTO reservas (fecha, usuario_id, barbero_id, tipo_servicio_id) VALUES (?, ?, ?, ?)';
    db.query(query, [fecha, usuario_id, barbero_id, tipo_servicio_id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ id_reserva: result.insertId });
        }
    });
});

// Obtener todas las reservas
app.get('/api/reservas', (req, res) => {
    db.query('SELECT * FROM reservas', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Actualizar el estado de la reserva (aceptar o cancelar)
app.put('/api/reservas/:id', (req, res) => {
    const estado = req.body.estado;
    const id_reserva= req.params.id;
    const query = 'UPDATE reservas SET estado = ? WHERE id_reserva = ?';
    db.query(query, [estado, id_reserva], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Reserva actualizada');
        }
    });
});



app.listen(8081, () => {
    console.log("Conexion exitosa:)")
});



