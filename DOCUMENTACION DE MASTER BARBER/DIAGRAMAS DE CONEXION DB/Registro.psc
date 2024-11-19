Algoritmo Registro
	Definir nombre, email, nit, telefono, CONTRASENA, CONFIRMACIONCONTRASENA Como Cadena
	Definir nombre_usuario, email_usuario, nit_usuario, telefono_usuario, pass_usuario Como Cadena
	nombre_usuario <- 'Fidel'
	email_usuario <- 'fideljoseespi10@gmail.com'
	nit_usuario <- '1028662003'
	telefono_usuario <- '3142758305'
	pass_usuario <- 'fidel7777.'
	Escribir 'Ingresar Nombre'
	Leer nombre
	Escribir 'Ingresar Email'
	Leer email
	Escribir 'ingresar Nit'
	Leer nit
	Escribir 'Ingrese Numero De Telefono'
	Leer telefono
	Escribir 'Ingresar Contraseña'
	Leer CONTRASENA
	Escribir 'Confirmar Contraseña'
	Leer CONFIRMACIONCONTRASENA
	Si email=email_usuario Entonces
		Escribir 'Usuario Existente'
	SiNo
		Si CONTRASENA<>CONFIRMACIONCONTRASENA Entonces
			Escribir 'Las Contraseñas No Coinciden'
		SiNo
			Si Longitud(CONTRASENA)<8 Entonces
				Escribir 'La contraseña debe tener minimo 8 caracteres'
			SiNo
				Si telefono=telefono_usuario Entonces
					Escribir 'Este Numero de celular ya existe'
				SiNo
					Escribir 'El Usuario A Sido Registrado Con Exito'
				FinSi
			FinSi
		FinSi
	FinSi
FinAlgoritmo
