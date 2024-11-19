<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>


<!-- INDEX USER -->


<div class="bg-dark">
<h1 class="text-center text-danger p-3">Lista de Usuarios</h1>
<div class="p-3 mx-3">
<a class="btn btn-primary" href="index.php?action=create" role="button">Crear Usuario</a>
</div>
<table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">NOMBRE</th>
      <th scope="col">GMAIL</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
        <?php foreach ($usuarios as $usuario): ?>
            <tr>
                <td><?= $usuario['id'] ?></td>
                <td><?= $usuario['nombre'] ?></td>
                <td><?= $usuario['email'] ?></td>
                <td>
                    <a href="index.php?action=edit&id=<?= $usuario['id'] ?>" class="btn btn-warning">Editar</a>
                    <a href="index.php?action=delete&id=<?= $usuario['id'] ?>" onclick="return confirm('¿Estás seguro?')" class="btn btn-danger">Eliminar</a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>

</div>
