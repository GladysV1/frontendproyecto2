/* eslint-disable require-jsdoc */
const formCrearCita = document.getElementById('crear-cita');
const tablaCitas = document.getElementById('tabla-citas');

document.addEventListener('load', obtenerCitasPaciente());

formCrearCita.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = 'https://backendproyecto2.herokuapp.com/citas/crear';
  if (localStorage.getItem('tipo_usuario') == 'paciente') {
    const paciente = localStorage.getItem('usuario');
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'paciente': paciente,
        'fecha_hora': formCrearCita.elements['fecha-hora'].value,
        'motivo': formCrearCita.elements['motivo'].value,
      }),
    })
        .then((res) => {
          if (res.ok) {
            obtenerCitasPaciente();
            formCrearCita.reset();
          }
        });
  }
});

function obtenerCitasPaciente() {
  if (localStorage.getItem('tipo_usuario') == 'paciente') {
    const paciente = localStorage.getItem('usuario');
    const url = `https://backendproyecto2.herokuapp.com/citas/paciente/${paciente}`;
    fetch(url, {
      method: 'GET',
    })
        .then((res)=>{
          if (res.ok) {
            return res.json();
          }
        })
        .then((res)=>{
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

            const citaHoraFecha = document.createElement('td');
            citaHoraFecha.innerHTML = element.fecha_hora;
            cita.appendChild(citaHoraFecha);

            const citaMotivo = document.createElement('td');
            citaMotivo.innerHTML = element.motivo;
            cita.appendChild(citaMotivo);

            const citaEstado = document.createElement('td');
            cita.appendChild(citaEstado);

            if (element.estado == 'A') {
              citaEstado.innerHTML = 'Aceptado';
            } else if (element.estado == 'R') {
              citaEstado.innerHTML = 'Rechazado';
            } else if (element.estado == 'P') {
              citaEstado.innerHTML = 'Pendiente';
            } else if (element.estado == 'C') {
              citaEstado.innerHTML = 'Completado';
            }

            if (element.doctor != null) {
              const citaDoctor = document.createElement('td');
              citaDoctor.innerHTML = element.doctor.username;
              cita.appendChild(citaDoctor);
            } else {
              const citaDoctor = document.createElement('td');
              citaDoctor.innerHTML = null;
              cita.appendChild(citaDoctor);
            }

            const citaOpciones = document.createElement('td');
            cita.appendChild(citaOpciones);

            const botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.classList.add('btn', 'btn-sm', 'btn-danger', 'm-1');
            botonEliminar.innerHTML = 'Eliminar';
            botonEliminar.value = element.code;
            botonEliminar.addEventListener('click', eliminarCita);
            citaOpciones.appendChild(botonEliminar);
          }
        });
  }
}

function eliminarCita() {
  const url = `https://backendproyecto2.herokuapp.com/citas/${this.value}`;
  fetch(url, {
    method: 'DELETE',
  })
      .then((res) => {
        if (res.ok) {
          obtenerCitasPaciente();
        }
      });
}
