<?php


// ENRUTADOR


require_once 'controllers/UsuarioController.php';

$action = isset($_GET['action']) ? $_GET['action'] : 'index';
$controller = new UsuarioController();

switch ($action) {
    case 'create':
        $controller->create();
        break;
    case 'edit':
        $id = $_GET['id'];
        $controller->edit($id);
        break;
    case 'delete':
        $id = $_GET['id'];
        $controller->delete($id);
        break;
    default:
        $controller->index();
        break;
}
?>
