/* eslint-disable require-jsdoc */
const formReceta = document.getElementById('receta');

document.addEventListener('load', obtenerPacientes());

formReceta.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = 'https://backendproyecto2.herokuapp.com/recetas';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'paciente': formReceta.elements['paciente'].value,
      'fecha': formReceta.elements['fecha'].value,
      'padecimiento': formReceta.elements['padecimiento'].value,
      'desc': formReceta.elements['desc'].value,
    }),
  })
    .then((res) => {
      if (res.ok){
        formReceta.reset();
      }
    });
});

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
      .then((res)=> {
        for (const element of res) {
          const paciente = document.createElement('option');
          paciente.innerHTML = element.username;
          paciente.value = element.username;
          formReceta.elements['paciente'].appendChild(paciente);
        }
      });
}
