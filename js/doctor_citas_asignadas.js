/* eslint-disable require-jsdoc */
const tablaCitas = document.getElementById('tabla-citas');

document.addEventListener('load', obtenerCitas());

function obtenerCitas() {
  if (localStorage.getItem('tipo_usuario') == 'doctor') {
    const doctor = localStorage.getItem('usuario');
    const url = `https://backendproyecto2.herokuapp.com/citas/doctor/${doctor}`;
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

          for (const element of res.aceptadas) {
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

            const checkboxCompletado = document.createElement('input');
            checkboxCompletado.type = 'checkbox';
            checkboxCompletado.classList.add('form-check-input');
            checkboxCompletado.checked = false;
            checkboxCompletado.value = element.code;
            checkboxCompletado.addEventListener('change', alternarCita);
            citaOpciones.appendChild(checkboxCompletado);
          }

          for (const element of res.completadas) {
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

            const checkboxCompletado = document.createElement('input');
            checkboxCompletado.type = 'checkbox';
            checkboxCompletado.classList.add('form-check-input');
            checkboxCompletado.checked = true;
            checkboxCompletado.value = element.code;
            checkboxCompletado.addEventListener('change', alternarCita);
            citaOpciones.appendChild(checkboxCompletado);
          }
        });
  }
}

function alternarCita() {
  if (this.checked) {
    completarCita(this.value);
  } else {
    aceptarCita(this.value);
  }
  obtenerCitas();
}

function completarCita(code) {
  if (localStorage.getItem('tipo_usuario') == 'doctor') {
    const url = `https://backendproyecto2.herokuapp.com/citas/completar/${code}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (res.ok) {
            obtenerCitas();
          }
        });
  }
}

function aceptarCita(code) {
  if (localStorage.getItem('tipo_usuario') == 'doctor') {
    const doctor = localStorage.getItem('usuario');
    const url = `https://backendproyecto2.herokuapp.com/citas/aceptar/${code}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'doctor': doctor,
      }),
    })
        .then((res) => {
          if (res.ok) {
            obtenerCitas();
          }
        });
  }
}
