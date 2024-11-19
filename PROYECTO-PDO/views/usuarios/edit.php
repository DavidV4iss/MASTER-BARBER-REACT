<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>


<!-- FORMULARIO PARA EDIT -->


<body class="bg-dark">
</body>
<h1 class="text-center text-danger mt-5">Editar Usuario</h1>
<form action="index.php?action=edit&id=<?= $usuario['id'] ?>" method="POST" class="p-5 mt-5 text-center">
    <label for="nombre" class='text-white'>Nombre:</label>
    <input type="text" name="nombre" value="<?= $usuario['nombre'] ?>" required>
    <label for="email" class='text-white'>Email:</label>
    <input type="email" name="email" value="<?= $usuario['email'] ?>" required>
    <button type="submit" class="btn btn-primary">Actualizar</button>
</form>
