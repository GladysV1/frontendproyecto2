/* eslint-disable require-jsdoc */
const tablaCitas = document.getElementById('tabla-citas');
const botonAceptarCita = document.getElementById('boton-aceptar-cita');
const modalAceptarCita = document.getElementById('modal-aceptar-cita');
const formAceptarCita = document.getElementById('form-aceptar-cita');
const modal = new bootstrap.Modal(modalAceptarCita, {
  backdrop: 'static',
});

document.addEventListener('load', obtenerCitas());
document.addEventListener('load', obtenerDoctores());
botonAceptarCita.addEventListener('click', confirmarCita);

function obtenerCitas() {
  const url='https://backendproyecto2.herokuapp.com/citas/pendientes';
  fetch(url, {
    method: 'GET',
  })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        tablaCitas.innerHTML = null;
        let count = 0;


        for (const element of res) {
          count = count + 1;

          const cita = document.createElement('tr');
          tablaCitas.appendChild(cita);

          const citaCount = document.createElement('td');
          citaCount.scope = 'row';
          citaCount.innerHTML = count;
          cita.appendChild(citaCount);

          const citaPaciente = document.createElement('th');
          citaPaciente.innerHTML = element.paciente.username;
          cita.appendChild(citaPaciente);

          const citaFechaHora = document.createElement('td');
          citaFechaHora.innerHTML = element.fecha_hora;
          cita.appendChild(citaFechaHora);

          const citaMotivo = document.createElement('td');
          citaMotivo.innerHTML = element.motivo;
          cita.appendChild(citaMotivo);

          const citaOpciones = document.createElement('td');
          cita.appendChild(citaOpciones);

          const botonAceptar = document.createElement('button');
          botonAceptar.type = 'button';
          botonAceptar.classList.add('btn', 'btn-sm', 'btn-success', 'm-1');
          botonAceptar.innerHTML = 'Aceptar';
          botonAceptar.value = element.code;
          botonAceptar.addEventListener('click', aceptarCita);
          citaOpciones.appendChild(botonAceptar);

          const botonRechazar = document.createElement('button');
          botonRechazar.type = 'button';
          botonRechazar.classList.add('btn', 'btn-sm', 'btn-danger', 'm-1');
          botonRechazar.innerHTML = 'Rechazar';
          botonRechazar.value = element.code;
          botonRechazar.addEventListener('click', rechazarCita);
          citaOpciones.appendChild(botonRechazar);
        }
      });
}

function aceptarCita() {
  modal.show();
  botonAceptarCita.value = this.value;
}

function confirmarCita() {
  const url = `https://backendproyecto2.herokuapp.com/citas/aceptar/${this.value}`;
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'doctor': formAceptarCita.elements['doctor'].value,
    }),
  })
      .then((res) => {
        if (res.ok) {
          obtenerCitas();
          modal.hide();
        }
      });
}

function rechazarCita() {
  const url = `https://backendproyecto2.herokuapp.com/citas/rechazar/${this.value}`;
  fetch(url, {
    method: 'PUT',
  })
      .then((res)=> {
        if (res.ok) {
          obtenerCitas();
        }
      });
}

function obtenerDoctores() {
  const url = 'https://backendproyecto2.herokuapp.com/doctores';
  fetch(url, {
    method: 'GET',
  })
      .then((res)=> {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res)=> {
        for (const element of res) {
          const option = document.createElement('option');
          option.innerHTML = element.username;
          option.value = element.username;
          formAceptarCita.elements['doctor'].appendChild(option);
        }
      });
}
