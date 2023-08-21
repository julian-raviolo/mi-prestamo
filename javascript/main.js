// Gestionar el historial
const HistorialManager = {
  guardarHistorial(historial) {
    localStorage.setItem('historial', JSON.stringify(historial));
  },
  
  obtenerHistorial() {
    return JSON.parse(localStorage.getItem('historial')) || [];
  },

  agregarRegistro(registro) {
    let historial = this.obtenerHistorial();
    historial.push(registro);
    this.guardarHistorial(historial);
  },

  mostrarHistorialEnModal() {
    let historial = this.obtenerHistorial();
    let historialBodyModal = document.getElementById('historial-body-modal');
    historialBodyModal.innerHTML = ''; 
  
    let rows = historial.map(function (registro) {
      let fecha = new Date(registro.fecha); 
      return `
        <tr>
          <td>${fecha.toLocaleDateString()}</td>
          <td>${registro.nombre}</td>
          <td>$${registro.montoPrestamo.toFixed(2)}</td>
          <td>${registro.cuotas}</td>
          <td>${registro.estado}</td>
        </tr>
      `;
    });
  
    historialBodyModal.innerHTML = rows.join('');
  }
};

// Lista de cédulas no permitidas
const cedulasNoPermitidas = ['0000000', '1234567', '46245725'];

// Función para verificar si una cédula no está permitida
function cedulaNoPermitida(cedula) {
  return cedulasNoPermitidas.includes(cedula);
}

// Función para calcular el préstamo
function calcularPrestamo(event) {
  event.preventDefault();

  // Obtener valores de los campos del formulario y realizar cálculos
  let nombre = document.getElementById('nombre').value;
  let sueldo = parseFloat(document.getElementById('sueldo').value);
  let cuotas = parseInt(document.getElementById('cuotas').value);
  let cedula = document.getElementById('cedula').value;
  let edad = parseInt(document.getElementById('edad').value); // Captura la edad desde el formulario

  // Calcular el montoPrestamo
  let montoPrestamo = calcularMontoPrestamo(sueldo);

  // Agregar el registro al historial
  HistorialManager.agregarRegistro({
    fecha: new Date(),
    nombre: nombre,
    montoPrestamo: montoPrestamo,
    cuotas: cuotas,
    estado: 'Aprobado'
  });  

  // Verificar si la cédula no está permitida
  if (cedulaNoPermitida(cedula)) {
    mostrarNotificacion('No puede usar el sistema porque ya cuenta con un préstamo.', 'error');
    return; 
  }

  // Validar que la cantidad de cuotas esté dentro del rango permitido (1 a 30)
  if (cuotas < 1 || cuotas > 30) {
    mostrarNotificacion('La cantidad de cuotas debe estar entre 1 y 30.', 'error');
    return; 
  }

  // Verificar los ingresos mínimos según la cantidad de cuotas
  let ingresosMinimos = cuotas <= 15 ? 20000 : 50000;
  if (sueldo < ingresosMinimos) {
    mostrarNotificacion(`Los ingresos mínimos para ${cuotas} cuotas son de $${ingresosMinimos.toFixed(2)}.`, 'error');
    return; 
  }

  // Notificación de préstamo aprobado
  let valorCuota = montoPrestamo / cuotas; 
  mostrarNotificacion(
    `Estimado ${nombre}, su préstamo aprobado es de $${montoPrestamo.toFixed(2)}. El mismo se abonará en ${cuotas} cuotas de $${valorCuota.toFixed(2)} cada una.`,
    'success'
  );

  // Guardar datos en el localStorage
  localStorage.setItem('nombre', nombre);
  localStorage.setItem('edad', edad);
  localStorage.setItem('sueldo', sueldo);
  localStorage.setItem('cedula', cedula);
}

// Función para calcular el monto del préstamo
function calcularMontoPrestamo(sueldo) {
  return sueldo * 0.50; // Calcula el monto del préstamo con un 50% de cargo
}

// Notificaciones
function mostrarNotificacion(mensaje, tipo) {
  const swal = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 8000,
    timerProgressBar: true,
    background: tipo === 'success' ? 'green' : 'red',
    customClass: {
      popup: 'alert-text',
      container: 'alert-box',
    }
  });

  swal.fire({
    icon: tipo,
    title: mensaje,
  });
}

// Mostrar el historial 
document.addEventListener('DOMContentLoaded', function () {
  HistorialManager.mostrarHistorialEnModal();
});
