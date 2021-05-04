/* eslint-disable require-jsdoc */
const formFactura = document.getElementById('factura');

document.addEventListener('load', obtenerDoctores());
document.addEventListener('load', obtenerPacientes());

formFactura.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = 'https://backendproyecto2.herokuapp.com/facturas';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'fecha': formFactura.elements['fecha'].value,
      'paciente': formFactura.elements['paciente'].value,
      'doctor': formFactura.elements['doctor'].value,
      'precio_consulta': formFactura.elements['precio-consulta'].value,
      'costo_operacion': formFactura.elements['costo-operacion'].value,
      'costo_internado': formFactura.elements['costo-internado'].value,
      'total': formFactura.elements['total'].value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        formFactura.reset();
      }
    })
});

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
      .then((res)=>{
        for (const element of res) {
          const doctor = document.createElement('option');
          doctor.innerHTML = element.username;
          doctor.value = element.username;
          formFactura.elements['doctor'].appendChild(doctor);
        }
      });
}

function obtenerPacientes() {
  const url = 'https://backendproyecto2.herokuapp.com/pacientes';
  fetch(url, {
    method: 'GET',
  })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        for (const element of res) {
          const paciente = document.createElement('option');
          paciente.innerHTML = element.username;
          paciente.value = element.username;
          formFactura.elements['paciente'].appendChild(paciente);
        }
      });
}
