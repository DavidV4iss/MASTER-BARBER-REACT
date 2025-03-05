import 'dart:io';

void main() {
  List<double> temperaturas = [28.5, 32.1, 29.8, 35.0, 27.9];

  if (temperaturas.isEmpty) {
    print('No hay datos para analizar');
    return;
  }

  double promedio = temperaturas.reduce((a, b) => a + b) / temperaturas.length;
  print('Promedio: ${promedio.toStringAsFixed(2)}°C');

  double max = temperaturas.reduce((a, b) => a > b ? a : b);
  double min = temperaturas.reduce((a, b) => a < b ? a : b);
  print('Máxima: $max°C, Mínima: $min°C');

  int diasCalurosos = temperaturas.where((t) => t > 30).length;
  print('Días > 30°C: $diasCalurosos');
}