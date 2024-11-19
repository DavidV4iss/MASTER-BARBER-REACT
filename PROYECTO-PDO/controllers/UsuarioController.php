<?php
require_once 'models/Usuario.php';

class UsuarioController {

    // FUNCIONES DEL CRUD

    
    public function index() {
        $usuarioModel = new Usuario();
        $usuarios = $usuarioModel->obtenerUsuarios();
        require 'views/usuarios/index.php';
    }

    public function create() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $nombre = $_POST['nombre'];
            $email = $_POST['email'];

            $usuarioModel = new Usuario();
            $usuarioModel->crearUsuario($nombre, $email);
            header('Location: index.php');
        } else {
            require 'views/usuarios/create.php';
        }
    }

    public function edit($id) {
        $usuarioModel = new Usuario();
        $usuario = $usuarioModel->obtenerUsuarioPorId($id);

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $nombre = $_POST['nombre'];
            $email = $_POST['email'];

            $usuarioModel->actualizarUsuario($id, $nombre, $email);
            header('Location: index.php');
        } else {
            require 'views/usuarios/edit.php';
        }
    }

    public function delete($id) {
        $usuarioModel = new Usuario();
        $usuarioModel->eliminarUsuario($id);
        header('Location: index.php');
    }
}
?>
