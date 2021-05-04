/* eslint-disable require-jsdoc */
const formCsvEnfermeras = document.getElementById('cargar-csv-enfermeras');
const tablaEnfermeras = document.getElementById('tabla-enfermeras');
const formCrearEnfermera = document.getElementById('crear-enfermera');

document.addEventListener('load', obtenerEnfermeras());

formCsvEnfermeras.addEventListener('submit', (e) => {
  e.preventDefault();
  const csvEnfermeras = formCsvEnfermeras.elements['csv-enfermeras'];
  const url = 'https://backendproyecto2.herokuapp.com/csv/enfermeras';
  const data = new FormData();
  data.append('csv_file', csvEnfermeras.files[0]);
  fetch(url, {
    method: 'POST',
    body: data,
  })
      .then((res) => {
        if (res.ok) {
          obtenerEnfermeras();
          formCsvEnfermeras.reset();
        }
      });
});

formCrearEnfermera.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = 'https://backendproyecto2.herokuapp.com/enfermeras';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'nombre': formCrearEnfermera.elements['nombre'].value,
      'apellido': formCrearEnfermera.elements['apellido'].value,
      'fecha_nac': formCrearEnfermera.elements['fecha-nac'].value,
      'sexo': formCrearEnfermera.elements['sexo'].value,
      'username': formCrearEnfermera.elements['username'].value,
      'passwd': formCrearEnfermera.elements['passwd'].value,
      'telefono': formCrearEnfermera.elements['telefono'].value,
    }),
  })
      .then((res)=> {
        if (res.ok) {
          obtenerEnfermeras();
          formCrearEnfermera.reset();
        }
      });
});

function obtenerEnfermeras() {
  const url = 'https://backendproyecto2.herokuapp.com/enfermeras';
  fetch(url, {
    method: 'GET',
  })
      .then((res)=>{
        if (res.ok) {
          return res.json();
        }
      })
      .then((res)=>{
        tablaEnfermeras.innerHTML = null;
        let count = 0;
        for (const element of res) {
          count = count + 1;

          const enfermera = document.createElement('tr');
          tablaEnfermeras.appendChild(enfermera);

          const enfermeraCount = document.createElement('td');
          enfermeraCount.scope = 'row';
          enfermeraCount.innerHTML = count;
          enfermera.appendChild(enfermeraCount);

          const enfermeraUsername = document.createElement('th');
          enfermeraUsername.innerHTML = element.username;
          enfermera.appendChild(enfermeraUsername);

          const enfermeraNombre = document.createElement('td');
          enfermeraNombre.innerHTML = element.nombre;
          enfermera.appendChild(enfermeraNombre);

          const enfermeraApellido = document.createElement('td');
          enfermeraApellido.innerHTML = element.apellido;
          enfermera.appendChild(enfermeraApellido);
        }
      });
}
