/* eslint-disable require-jsdoc */
const formCsvPacientes = document.getElementById('cargar-csv-pacientes');
const tablaPacientes = document.getElementById('tabla-pacientes');
const formCrearPaciente = document.getElementById('crear-paciente');

document.addEventListener('load', obtenerPacientes());

formCsvPacientes.addEventListener('submit', (e) => {
  e.preventDefault();
  const csvPacientes = formCsvPacientes.elements['csv-pacientes'];
  const url = 'https://backendproyecto2.herokuapp.com/csv/pacientes';
  const data = new FormData();
  data.append('csv_file', csvPacientes.files[0]);
  fetch(url, {
    method: 'POST',
    body: data,
  })
      .then((res) => {
        if (res.ok) {
          obtenerPacientes();
          formCsvPacientes.reset();
        }
      });
});

formCrearPaciente.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = 'https://backendproyecto2.herokuapp.com/pacientes';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'nombre': formCrearPaciente.elements['nombre'].value,
      'apellido': formCrearPaciente.elements['apellido'].value,
      'fecha_nac': formCrearPaciente.elements['fecha-nac'].value,
      'sexo': formCrearPaciente.elements['sexo'].value,
      'username': formCrearPaciente.elements['username'].value,
      'passwd': formCrearPaciente.elements['passwd'].value,
      'telefono': formCrearPaciente.elements['telefono'].value,
    }),
  })
      .then((res)=> {
        if (res.ok) {
          obtenerPacientes();
          formCrearPaciente.reset();
        }
      });
});

function obtenerPacientes() {
  const url = 'https://backendproyecto2.herokuapp.com/pacientes';
  fetch(url, {
    method: 'GET',
  })
      .then((res)=>{
        if (res.ok) {
          return res.json();
        }
      })
      .then((res)=>{
        tablaPacientes.innerHTML = null;
        let count = 0;
        for (const element of res) {
          count = count + 1;

          const paciente = document.createElement('tr');
          tablaPacientes.appendChild(paciente);

          const pacienteCount = document.createElement('td');
          pacienteCount.scope = 'row';
          pacienteCount.innerHTML = count;
          paciente.appendChild(pacienteCount);

          const pacienteUsername = document.createElement('th');
          pacienteUsername.innerHTML = element.username;
          paciente.appendChild(pacienteUsername);

          const pacienteNombre = document.createElement('td');
          pacienteNombre.innerHTML = element.nombre;
          paciente.appendChild(pacienteNombre);

          const pacienteApellido = document.createElement('td');
          pacienteApellido.innerHTML = element.apellido;
          paciente.appendChild(pacienteApellido);
        }
      });
}
