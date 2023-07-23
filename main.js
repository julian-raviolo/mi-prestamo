// pre entrega 2 . Prestamos

function calcularPrestamo(nombre, edad, sueldo, cuotas) {
    if (edad > 18) {
      let montoPrestamo = sueldo * 1.50 // Calcula el monto del préstamo con un 150% de cargo
        return montoPrestamo;
    } else {
      return 0; // El usuario no cumple con la edad mínima requerida para el préstamo
    }
    }

  // Solicitar datos al usuario
let nombre = prompt('Ingrese su nombre:');
let edad = parseInt(prompt('Ingrese su edad:'));
let sueldo = parseFloat(prompt('Ingrese su sueldo mensual:'));
let cuotas = parseInt(prompt('Ingrese la cantidad de cuotas deseadas (hasta 24):'));

  // Validar que la cantidad de cuotas esté dentro del rango permitido (1 a 24)
if (cuotas < 1 || cuotas > 24) {
    alert('La cantidad de cuotas debe estar entre 1 y 24.');
    } 
    else {
        let montoPrestamo = calcularPrestamo(nombre, edad, sueldo, cuotas);
    if (montoPrestamo > 0) {
        let valorCuota = montoPrestamo / cuotas; // Calcula valor de cuota
        alert('Estimado ' + nombre + ', su préstamo aprobado es de $' + montoPrestamo.toFixed(2) + '. El mismo se abonará en ' + cuotas + ' cuotas de $' + valorCuota.toFixed(2) + ' cada una.');
    } else {
        alert('Lo sentimos, no cumple con la edad mínima requerida para el préstamo.');
    }
    }


