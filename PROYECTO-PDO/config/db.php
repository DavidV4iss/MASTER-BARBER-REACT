<?php
class Database {
    private $host = "localhost";
    private $dbname = "mi_base_de_datos";
    private $username = "root";
    private $password = "";

    public function getConnection() {
        $conexion = null;
        try {
            $conexion = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->dbname, $this->username, $this->password);
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $exception) {
            echo "Error de conexión: " . $exception->getMessage();
        }
        return $conexion;
    }
}
?>
