/* eslint-disable require-jsdoc */
const formCsvDoctores = document.getElementById('cargar-csv-doctores');
const tablaDoctores = document.getElementById('tabla-doctores');
const formCrearDoctores = document.getElementById('crear-doctor');

document.addEventListener('load', obtenerDoctores());

formCsvDoctores.addEventListener('submit', (e) => {
  e.preventDefault();
  const csvDoctores = formCsvDoctores.elements['csv-doctores'];
  const url = 'https://backendproyecto2.herokuapp.com/csv/doctores';
  const data = new FormData();
  data.append('csv_file', csvDoctores.files[0]);
  fetch(url, {
    method: 'POST',
    body: data,
  })
      .then((res) => {
        if (res.ok) {
          obtenerDoctores();
          formCsvDoctores.reset();
        }
      });
});

formCrearDoctores.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = 'https://backendproyecto2.herokuapp.com/doctores';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'nombre': formCrearDoctores.elements['nombre'].value,
      'apellido': formCrearDoctores.elements['apellido'].value,
      'fecha_nac': formCrearDoctores.elements['fecha-nac'].value,
      'sexo': formCrearDoctores.elements['sexo'].value,
      'username': formCrearDoctores.elements['username'].value,
      'passwd': formCrearDoctores.elements['passwd'].value,
      'especialidad': formCrearDoctores.elements['especialidad'].value,
      'telefono': formCrearDoctores.elements['telefono'].value,
    }),
  })
      .then((res)=> {
        if (res.ok) {
          obtenerDoctores();
          formCrearDoctores.reset();
        }
      });
});

function obtenerDoctores() {
  const url = 'https://backendproyecto2.herokuapp.com/doctores';
  fetch(url, {
    method: 'GET',
  })
      .then((res)=>{
        if (res.ok) {
          return res.json();
        }
      })
      .then((res)=>{
        tablaDoctores.innerHTML = null;
        let count = 0;
        for (const element of res) {
          count = count + 1;

          const doctor = document.createElement('tr');
          tablaDoctores.appendChild(doctor);

          const doctorCount = document.createElement('td');
          doctorCount.scope = 'row';
          doctorCount.innerHTML = count;
          doctor.appendChild(doctorCount);

          const doctorUsername = document.createElement('th');
          doctorUsername.innerHTML = element.username;
          doctor.appendChild(doctorUsername);

          const doctorNombre = document.createElement('td');
          doctorNombre.innerHTML = element.nombre;
          doctor.appendChild(doctorNombre);

          const doctorApellido = document.createElement('td');
          doctorApellido.innerHTML = element.apellido;
          doctor.appendChild(doctorApellido);

          const doctorEspecialidad = document.createElement('td');
          doctorEspecialidad.innerHTML = element.especialidad;
          doctor.appendChild(doctorEspecialidad);
        }
      });
}
