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
    optionSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions));



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "master_barber",
})

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Conectado a la base de datos");
    }
})


// Configuración de transporte de nodemailer para enviar correos electrónicos
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'cristianrueda0313@gmail.com',
        pass: 'yykl vnja kuss aipw',
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

    const nombreusuario = req.body.nombre_usuario;
    const email = req.body.email;
    const nit = req.body.nit;
    const telefono = req.body.telefono;
    const contraseña = req.body.contraseña;
    const confirmar_contraseña = req.body.confirmar_contraseña;

    // Expresión regular para validar el correo electrónico y dominios permitidos
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;

    db.query("SELECT * FROM usuarios WHERE email = ? OR nit = ?", [email, nit], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        else if (result.length > 0) {
            return res.status(400).send("El usuario ya existe");
        }

        else if (contraseña !== confirmar_contraseña) {
            return res.status(400).send('Las contraseñas no coinciden');
        }

        else if (!/[a-z]/.test(contraseña) && !/[A-Z]/.test(contraseña)) {
            return res.status(400).send('La contraseña debe contener al menos una letra');
        }

        else if (contraseña.length < 8) {
            return res.status(400).send('La contraseña debe tener al menos 8 caracteres');
        }
        else if (nombreusuario.length < 3) {
            return res.status(400).send('El nombre debe tener al menos 3 caracteres');
        }
        else if (nit.length < 8 || nit.length > 10) {
            return res.status(400).send('Tu número de documento debe tener como minimo 8 y máximo 10 caracteres');
        }
        else if (telefono.length !== 10) {
            return res.status(400).send('Tu número de teléfono debe tener 10 caracteres');
        }
        else if (email.length < 5) {
            return res.status(400).send('El email debe tener al menos 5 caracteres');
        }
        else if (!emailRegex.test(email)) {
            return res.status(400).send('El email debe ser válido y pertenecer a gmail.com, hotmail.com o outlook.com');
        }
        else {
            const hashpassword = bcrypt.hashSync(contraseña, 10);
            const q = "INSERT INTO usuarios (nombre_usuario, email, nit, telefono, contrasena, id_rol) VALUES (?,?,?,?,?,3)";
            const values = [
                nombreusuario,
                email,
                nit,
                telefono,
                hashpassword
            ];
            db.query(q, values, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                return res.status(200).send("Usuario creado con éxito");
            });
        }
    });
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







//INVENTARIO

const storageInventario = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../Frontend/public/images/imagesInventario/')
    },
    filename: function (req, file, cb) {
        cb(null, `inventario_${Date.now()}` + '-' + file.originalname)
    }

})

const uploadInventario = multer({ storage: storageInventario })

app.get('/GetInventario', (req, res) => {
    db.query('SELECT id_producto, nombre, descripcion_P, cantidad, id_categoria_producto, proveedor, PrecioUnitario, Foto,  DATE_FORMAT(fecha_venta, "%Y-%m-%d %H:%i") AS fecha_venta FROM inventario', (err, results) => {
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

app.post('/CreateInventario', uploadInventario.single('foto'), (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion_P;
    const cantidad = req.body.cantidad;
    const categoria = req.body.id_categoria_producto;
    const proveedor = req.body.proveedor;
    const fecha = req.body.fecha_venta;
    const fotoName = req.file.filename;
    const precio = req.body.PrecioUnitario;



    const q = 'INSERT INTO inventario (nombre, descripcion_P, cantidad, id_categoria_producto, proveedor, fecha_venta, Foto, PrecioUnitario) VALUES (?,?,?,?,?,?,?,?)';

    const values = [
        nombre,
        descripcion,
        cantidad,
        categoria,
        proveedor,
        fecha,
        fotoName,
        precio
    ];

    db.query(q, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send('Producto creado exitosamente');
        }
    });
});

const borrarFotoInventario = async (foto) => {
    try {
        const filePath = path.resolve(__dirname, `../Frontend/public/images/imagesInventario/${foto}`);
        await fs.promises.unlink(filePath);
    } catch (err) {
        console.error('Error eliminando imagen:', err);
    }
};

app.put('/UpdateInventario/:id', uploadInventario.single('foto'), (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion_P;
    const cantidad = req.body.cantidad;
    const categoria = req.body.id_categoria_producto;
    const proveedor = req.body.proveedor;
    const fecha = req.body.fecha_venta;
    const fotoName = req.file ? req.file.filename : '';
    const precio = req.body.PrecioUnitario;

    // Obtener la imagen actual del inventario
    db.query('SELECT Foto FROM inventario WHERE id_producto = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }

        const fotoActual = results[0].Foto;

        if (req.file && fotoActual) {
            borrarFotoInventario(fotoActual);
        }

        const q = 'UPDATE inventario SET nombre = ?, descripcion_P = ?, cantidad = ?, id_categoria_producto = ?, proveedor = ?, fecha_venta = ?, Foto = ?, PrecioUnitario = ? WHERE id_producto = ?';

        const values = [
            nombre,
            descripcion,
            cantidad,
            categoria,
            proveedor,
            fecha,
            fotoName,
            precio,
            id
        ];

        db.query(q, values, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error en el servidor');
            } else {
                return res.status(200).send('Producto actualizado exitosamente');
            }
        });
    });
});

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


app.put('/RestarInventario/:id', (req, res) => {
    const id = req.params.id;
    const cantidad = req.body.cantidad;

    db.query('UPDATE inventario SET cantidad = cantidad - ? WHERE id_producto = ?', [cantidad, id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send('Inventario actualizado exitosamente');

        }
    }
    );
});
// FIN INVENTARIO







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





// CAMBIO DE CONTRASEÑA

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

// FIN CAMBIO DE CONTRASEÑA









// CRUD DEL BARBERO

const storageBarbero = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../Frontend/public/images/imagesBarbero/')
    },
    filename: function (req, file, cb) {
        cb(null, `barbero_${Date.now()}` + '-' + file.originalname)
    }

})

const uploadBarbero = multer({ storage: storageBarbero })

app.get('/GetBarberos', (req, res) => {
    db.query('SELECT * FROM usuarios WHERE id_rol = 2', (err, results) => {
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
    db.query('SELECT * FROM usuarios WHERE id_usuario = ? AND id_rol = 2', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send(results);
        }
    })
})

app.post('/CreateBarberos', uploadBarbero.single('foto'), (req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const contrasena = req.body.contrasena;
    const descripcion = req.body.descripcion;
    const fotoName = req.file.filename;

    if (contrasena.length < 8) {
        return res.status(400).send('La contraseña debe tener al menos 8 caracteres');
    }

    const hashPassword = bcrypt.hashSync(contrasena, 10);

    const q = 'INSERT INTO usuarios (nombre_usuario, email, contrasena, descripcion, Foto, id_rol) VALUES (?,?,?,?,?,?)';

    const values = [
        nombre,
        email,
        hashPassword,
        descripcion,
        fotoName,
        2
    ];

    db.query(q, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send('Barbero creado exitosamente');
        }
    });
});

const borrarFotoBarbero = async (foto) => {
    try {
        const filePath = path.resolve(__dirname, `../Frontend/public/images/imagesBarbero/${foto}`);
        await fs.promises.unlink(filePath);
    } catch (err) {
        console.error('Error eliminando imagen:', err);
    }
};

app.put('/UpdateBarberos/:id', uploadBarbero.single('foto'), (req, res) => {

    const id = req.params.id;

    const select = "SELECT * FROM usuarios WHERE id_usuario = ? AND id_rol = 2";

    db.query(select, [req.params.id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }

        const nombre = req.body.nombre
        const email = req.body.email
        const contrasena = req.body.contrasena
        const descripcion = req.body.descripcion
        const fotoName = req.file ? req.file.filename : ''

        // Obtener la imagen actual del inventario
        db.query('SELECT Foto FROM usuarios WHERE id_usuario = ?', [id], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error en el servidor');
            }

            const fotoActual = results[0].Foto;

            if (req.file && fotoActual) {
                borrarFotoBarbero(fotoActual);
            }
        });

        const q = 'UPDATE usuarios SET nombre_usuario = ?, email = ?, contrasena = ?, descripcion = ?, Foto = ? WHERE id_usuario = ? AND id_rol = 2'

        const values = [
            nombre,
            email,
            contrasena,
            descripcion,
            fotoName,
            id
        ]

        db.query(q, values, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error en el servidor');
            }
            else {
                return res.status(200).send('Barbero actualizado exitosamente');
            }
        })
    })
})

app.delete('/DeleteBarberos/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM usuarios  WHERE id_usuario = ? and id_rol = 2', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send('Barbero eliminado exitosamente');
        }
    })
});



// FIN CRUD BARBERO









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

app.get('/traerUsuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        else {
            return res.status(200).send(results);
        }
    })
}
)

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






// CALIFICACIONES

app.get('/traerCalificaciones', (req, res) => {
    db.query('SELECT * FROM calificaciones', (err, results) => {
        if (err) return res.status(500).json({ error: "Error en el servidor" });
        return res.status(200).json(results);
    });
});




app.post('/Createcalificaciones', (req, res) => {

    const comentario = req.body.comentario;
    const puntuacion = req.body.puntuacion;
    const id_usuario = req.body.id;

    const q = 'INSERT INTO calificaciones (comentario, puntuacion, usuario_id) VALUES (?,?,?)';
    const values = [comentario, puntuacion, id_usuario];

    db.query(q, values, (err, results) => {
        if (err) return res.status(500).json({ error: `Error al registrar la calificación: ${err.message}` });
        console.log(err);
        return res.status(200).json({ message: "Calificación registrada exitosamente" });
    }
    );
});

app.delete('/DeleteCalificaciones/:id', (req, res) => {
    const id = req.params.id;
    const q = 'DELETE FROM calificaciones WHERE id = ?';
    db.query(q, [id], (err, results) => {
        if (err) return res.status(500).json({ error: `Error al eliminar la calificación: ${err.message}` });
        return res.status(200).json({ message: "Calificación eliminada exitosamente" });
    });
})

// FIN   CALIFICACIONES







// RESERVAS

app.get('/GetServicios', (req, res) => {
    db.query('SELECT * FROM tipo_servicio', (err, results) => {
        if (err) return res.status(500).json({ error: "Error en el servidor" });
        return res.status(200).json(results);
    });
});

app.post('/CrearReservas', async (req, res) => {
    const { barbero_id, fecha } = req.body;

    try {
        // Verifica si ya existe una reserva para el barbero en la misma fecha y hora
        const reservaExistente = await db.query(
            'SELECT * FROM reservas WHERE barbero_id = ? AND fecha = ?',
            [barbero_id, fecha]
        );

        if (reservaExistente.length > 0) {
            return res.status(400).json({ message: 'La hora seleccionada ya está ocupada. Por favor, elige otra hora.' });
        }

        // Si no hay conflicto, crea la reserva
        await db.query('INSERT INTO reservas SET ?', req.body);
        res.status(201).json({ message: 'Reserva creada exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la reserva.' });
    }
});

app.get('/GetReservas', (req, res) => {
    db.query('SELECT * FROM reservas', (err, results) => {
        if (err) return res.status(500).json({ error: "Error en el servidor" });
        return res.status(200).json(results);
    });
});

app.get('/GetReservas/barbero/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM reservas WHERE barbero_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Error en el servidor" });
        return res.status(200).json(results);
    });
}
);

app.get('/GetReservas/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM reservas WHERE id_reserva = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Error en el servidor" });
        return res.status(200).json(results);
    });
}
);

app.put('/UpdateReservas/:id', (req, res) => {
    const id = req.params.id;
    const cliente_id = req.body.cliente_id;
    const barbero_id = req.body.barbero_id;
    const servicio = req.body.servicio;
    const fecha = req.body.fecha;
    const estado = req.body.estado;

    const q = 'UPDATE reservas SET cliente_id = ?, barbero_id = ?, servicio = ?, fecha = ?, estado = ? WHERE id_reserva = ?';
    const values = [cliente_id, barbero_id, servicio, fecha, estado, id];

    db.query(q, values, (err, results) => {
        if (err) return res.status(500).json({ error: `Error al actualizar la reserva: ${err.message}` });
        return res.status(200).json({ message: "Reserva actualizada exitosamente" });
    }
    );
});

app.delete('/DeleteReservas/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM reservas WHERE id_reserva = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: `Error al eliminar la reserva: ${err.message}` });
        return res.status(200).json({ message: "Reserva eliminada exitosamente" });
    });
});

app.get('/GetReservasCliente/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM reservas WHERE cliente_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Error en el servidor" });
        return res.status(200).json(results);
    });
});

app.patch('/UpdateReservasEstado/:id', (req, res) => {
    const id = req.params.id;
    const nuevoEstado = req.body.estado;

    // Obtener el estado actual de la reserva
    db.query('SELECT estado FROM reservas WHERE id_reserva = ?', [id], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: 'Reserva no encontrada' });
        }

        const estadoActual = results[0].estado;

        // Verificar si el estado ha cambiado
        if (estadoActual === nuevoEstado) {
            return res.status(200).json({ message: 'El estado de la reserva ya es el mismo' });
        }

        // Actualizar el estado de la reserva
        const q = 'UPDATE reservas SET estado = ? WHERE id_reserva = ?';
        const values = [nuevoEstado, id];

        db.query(q, values, (err, results) => {
            if (err) {
                console.error('Error al actualizar la reserva:', err);
                return res.status(500).json({ error: 'Error al actualizar la reserva' });
            }

            // Enviar notificación por correo electrónico
            db.query('SELECT r.*, u.email, u.id_usuario AS cliente_id, s.nombre AS servicio_nombre FROM reservas r JOIN usuarios u ON r.cliente_id = u.id_usuario JOIN tipo_servicio s ON r.servicio = s.id_tipo_servicio WHERE r.id_reserva = ?', [id], (err, results) => {
                if (err) {
                    console.error('Error en la consulta:', err);
                    return res.status(500).send('Error en el servidor');
                }

                if (results.length === 0) {
                    return res.status(400).send('Reserva no encontrada');
                }

                const reserva = results[0];
                const email = reserva.email;
                const clienteId = reserva.cliente_id;
                const servicioNombre = reserva.servicio_nombre;

                // Configurar el contenido del correo electrónico
                const mailOptions = {
                    from: 'cristianrueda0313@gmail.com',
                    to: email,
                    subject: 'Actualización del estado de tu reserva',
                    html: `
                        <div style="background-color: #f8f9fa; padding: 20px; font-family: Arial, sans-serif;">
                            <h2 style="color: #343a40;">Actualización de tu Reserva</h2>
                            <p>Hola,</p>
                            <p>Te informamos que el estado de tu reserva ha sido actualizado a: <strong>${nuevoEstado}</strong>.</p>
                            <p>Detalles de la reserva:</p>
                            <ul>
                                <li><strong>Servicio:</strong> ${servicioNombre}</li>
                                <li><strong>Fecha:</strong> ${new Date(reserva.fecha).toLocaleString()}</li>
                            </ul>
                            <p>Gracias por confiar en Master Barber.</p>
                        </div>
                    `
                };

                // Enviar el correo electrónico
                transporter.sendMail(mailOptions, (error) => {
                    if (error) {
                        console.error('Error al enviar el correo electrónico:', error);
                        return res.status(500).json({ message: 'Error al enviar el correo electrónico' });
                    }

                    // Guardar la notificación en la base de datos
                    const mensaje = `El estado de tu reserva ha sido actualizado a: ${nuevoEstado}. Servicio: ${servicioNombre}, Fecha: ${new Date(reserva.fecha).toLocaleString()}`;
                    db.query(
                        'INSERT INTO notificaciones (cliente_id, mensaje) VALUES (?, ?)',
                        [clienteId, mensaje],
                        (err) => {
                            if (err) {
                                console.error('Error al guardar la notificación:', err);
                            }
                        }
                    );

                    res.status(200).json({ message: 'Reserva actualizada y notificación enviada por correo electrónico' });
                });
            });
        });
    });
});


app.post('/VerificarDisponibilidad', (req, res) => {
    const { barbero_id, fecha } = req.body;

    const q = 'SELECT * FROM reservas WHERE barbero_id = ? AND fecha = ?';
    const values = [barbero_id, fecha];

    db.query(q, values, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length > 0) {
            return res.status(200).json({ disponible: false });
        } else {
            return res.status(200).json({ disponible: true });
        }
    });
});

app.get('/GetClientes', (req, res) => {
    db.query('SELECT * FROM usuarios WHERE id_rol = 3', (err, results) => {
        if (err) return res.status(500).json({ error: "Error en el servidor" });
        return res.status(200).json(results);
    });
});

app.delete('/DeleteReserva/:id', (req, res) => {
    const { id } = req.params;
    // Lógica para eliminar la reserva de la base de datos
    db.query('DELETE FROM reservas WHERE id_reserva = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al eliminar la reserva');
        } else {
            res.send('Reserva eliminada correctamente');
        }
    });
});


app.get('/GetNotificaciones/:cliente_id', (req, res) => {
    const cliente_id = req.params.cliente_id;

    db.query(
        'SELECT * FROM notificaciones WHERE cliente_id = ? ORDER BY fecha DESC',
        [cliente_id],
        (err, results) => {
            if (err) {
                console.error('Error al obtener notificaciones:', err);
                return res.status(500).json({ error: 'Error en el servidor' });
            }
            res.status(200).json(results);
        }
    );
});


app.delete('/DeleteNotificacion/:id', async (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM  notificaciones WHERE id_notificacion = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send('Barbero eliminado exitosamente');
        }
    })
});


app.delete('/DeleteNotificacionReserva/:id', (req, res) => {
    const reservaId = req.params.id;
    db.query('DELETE FROM notificaciones WHERE reserva_id = ?', [reservaId], (err, results) => {
        if (err) {
            console.error('Error al eliminar la notificación:', err);
            return res.status(500).json({ error: 'Error al eliminar la notificación' });
        }
        res.status(200).json({ message: 'Notificación eliminada correctamente' });
    });
});

// FIN RESERVAS





app.get('/GetVentas', (req, res) => {
    const { rango } = req.query; // Rango puede ser 'diario', 'semanal', 'mensual', 'anual'

    let q = 'SELECT * FROM ventas';
    const ahora = new Date();

    if (rango === 'diario') {
        q += ` WHERE DATE(fecha) = CURDATE()`;
    } else if (rango === 'semanal') {
        q += ` WHERE YEARWEEK(fecha, 1) = YEARWEEK(CURDATE(), 1)`;
    } else if (rango === 'mensual') {
        q += ` WHERE MONTH(fecha) = MONTH(CURDATE()) AND YEAR(fecha) = YEAR(CURDATE())`;
    } else if (rango === 'anual') {
        q += ` WHERE YEAR(fecha) = YEAR(CURDATE())`;
    }

    db.query(q, (err, results) => {
        if (err) {
            console.error('Error al obtener las ventas:', err);
            return res.status(500).json({ error: 'Error al obtener las ventas' });
        }
        res.status(200).json(results);
    });
});

app.post('/GuardarVentas', (req, res) => {
    const ventas = req.body; // Las ventas deben ser un array de objetos

    const q = 'INSERT INTO ventas (id_producto, cantidad, fecha, PrecioUnitario, nombre) VALUES ?';

    // Convertir las ventas en un formato adecuado para la consulta
    const values = ventas.map((venta) => [
        venta.id_producto,
        venta.cantidad,
        venta.fecha,
        venta.PrecioUnitario,
        venta.nombre,
    ]);

    db.query(q, [values], (err, results) => {
        if (err) {
            console.error('Error al guardar las ventas:', err);
            return res.status(500).json({ error: 'Error al guardar las ventas' });
        }
        res.status(200).json({ message: 'Ventas guardadas exitosamente' });
    });
});


app.listen(8081, () => {
    console.log("Conexion exitosa:)")
});



