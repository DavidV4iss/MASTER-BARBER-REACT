<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>


<!-- FORMULARIO PARA CREATE -->


<body class="bg-dark">
</body>
<div class="bg-dark mt-5">
<h1 class="text-center text-danger">Crear Usuario</h1>
<form action="index.php?action=create" method="POST" class="p-5 mt-5 text-center">
     <label for="nombre" class="text-white">Nombre:</label>
    <input type="text" name="nombre" class='border-3' required>
    <label for="email" class="text-white">Email:</label>
    <input type="email" name="email" class='border-3' required>
    <button type="submit" class="btn btn-primary mx-3 me-4">Crear</button>
</form>
</div>
