// pre entrega 1 . Prestamos
// condicional . ciclo . funcion

// Constantes de Ingresos

const ingresos1 = 1000;
const ingresos2 = 3000;
const ingresos3 = 5000;

// Constantes de cuotas

const cuotas6 = 6;
const cuotas12 = 12;
const cuotas36 = 36;

// Selección de Ingresos
let ingresos = prompt('1- $1,000.00\n2- $3,000.00\n3- $5,000.00\n0- Finalizar');
let valorIngreso;

switch (ingresos) {
    case '1':
        valorIngreso = ingresos1;
        break;
    case '2':
        valorIngreso = ingresos2;
        break;
    case '3':
        valorIngreso = ingresos3;
        break;
    case '0':
// Finalizar 
    alert('Ha finalizado la selección');
    break;
    default:
    alert('Opción no válida');
    break;
}

// Selección de Cuotas
if (valorIngreso !== undefined) {
    let cuotas = prompt('1- 6 Cuotas\n2- 12 Cuotas\n3- 36 Cuotas\n0- Finalizar');
    
    let numeroCuotas;

    switch (cuotas) {
        case '1':
        numeroCuotas = cuotas6;
        break;
        case '2':
        numeroCuotas = cuotas12;
        break;
        case '3':
        numeroCuotas = cuotas36;
        break;
    case '0':

// Finalizar 
        alert('Ha finalizado la selección');
        break;
default:
    alert('Opción no válida');
    break;
}

if (numeroCuotas !== undefined) {
// Cálculo de la cuota
    calcularCuota(valorIngreso, numeroCuotas);
    alert('Cada cuota será de $' + total);
    }
}

// Función para calcular la cuota
function calcularCuota(valorIngreso, numeroCuotas) {
    total = valorIngreso / numeroCuotas;
    total += total * 0.06; // Suma del 6% de recargo
}

console.log("Cada cuota será de $" + total);




