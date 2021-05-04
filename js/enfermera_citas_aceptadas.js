/* eslint-disable require-jsdoc */
const tablaCitas = document.getElementById('tabla-citas');

document.addEventListener('load', obtenerCitas());

function obtenerCitas() {
  const url='https://backendproyecto2.herokuapp.com/citas/aceptadas';
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

          const citaDoctor = document.createElement('td');
          citaDoctor.innerHTML = element.doctor.username;
          cita.appendChild(citaDoctor);
        }
      });
}
