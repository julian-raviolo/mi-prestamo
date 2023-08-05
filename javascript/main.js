// pre entrega 3 . Prestamos

// Función para calcular el préstamo
function calcularPrestamo(event) {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

// Obtener valores de los campos del formulario
  let nombre = document.getElementById('nombre').value;
  let edad = parseInt(document.getElementById('edad').value);
  let sueldo = parseFloat(document.getElementById('sueldo').value);
  let cuotas = parseInt(document.getElementById('cuotas').value);

  // Validar que la cantidad de cuotas esté dentro del rango permitido (1 a 30)
  if (cuotas < 1 || cuotas > 30) {
    mostrarNotificacion('La cantidad de cuotas debe estar entre 1 y 30.', 'error');
    return; // Salir de la función si la cantidad de cuotas es inválida
  }

// Función para calcular el préstamo
  function calcularPrestamo(nombre, edad, sueldo, cuotas) {
    if (edad > 18) {
      let montoPrestamo = sueldo * 1.50; // Calcula el monto del préstamo con un 150% de cargo
      return montoPrestamo;
    } else {
      return 0; // El usuario no cumple con la edad mínima requerida para el préstamo
    }
  }

  let montoPrestamo = calcularPrestamo(nombre, edad, sueldo, cuotas);

  if (montoPrestamo > 0) {
    let valorCuota = montoPrestamo / cuotas; // Calcula valor de cuota
    mostrarNotificacion(
      `Estimado ${nombre}, su préstamo aprobado es de $${montoPrestamo.toFixed(2)}. El mismo se abonará en ${cuotas} cuotas de $${valorCuota.toFixed(2)} cada una.`,
      'success'
    );
  } else {
    mostrarNotificacion('Lo sentimos, no cumple con la edad mínima requerida para el préstamo.', 'error');
  }
    // Guardar datos en el localStorage
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('edad', edad);
    localStorage.setItem('sueldo', sueldo);
}


function mostrarNotificacion(mensaje, tipo) {
  let notificacion = document.getElementById('notificacion');
  notificacion.textContent = mensaje;

  if (tipo === 'success') {
    notificacion.style.backgroundColor = 'green';
  } else if (tipo === 'error') {
    notificacion.style.backgroundColor = 'red';
  }

  notificacion.style.display = 'block';

  // Ocultar la notificación después de 8 segundos
  setTimeout(function () {
    notificacion.style.display = 'none';
  }, 8000);
}

// Cargar datos del localStorage al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  let nombre = localStorage.getItem('nombre');
  let edad = localStorage.getItem('edad');
  let sueldo = localStorage.getItem('sueldo');

  if (nombre) document.getElementById('nombre').value = nombre;
  if (edad) document.getElementById('edad').value = edad;
  if (sueldo) document.getElementById('sueldo').value = sueldo;
});




