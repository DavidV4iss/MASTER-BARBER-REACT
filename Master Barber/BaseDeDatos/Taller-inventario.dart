import "dart:io";

void main() { 

  List<String> inventario = ['MotoMt09 - \$120.000.000', 'MotoMultiestrada - \$170.000.000', 'MotoStreetfighter  - \$200.000.000']; 

  void agregarMoto(String producto) { 
    inventario.add(producto); 
    print('Producto agregado: $producto'); 
  } 

  void eliminarMoto(String producto) { 
    if (inventario.contains(producto)) { 
      inventario.remove(producto); 
      print('Moto eliminada: $producto'); 
    } else { 
      print('Error: La Moto no existe'); 
    } 
  } 

  void mostrarInventario() { 
    for (int i = 0; i < inventario.length; i++) { 
      print('[$i] ${inventario[i]}'); 
    } 
  } 

  mostrarInventario(); 
  agregarMoto('MotoMt09 - \$120.000.000'); 
  eliminarMoto('MotoMultiestrada - \$170.000.000'); 
  eliminarMoto('nkd - \$7.000.000'); // No existe 
  mostrarInventario(); 
}