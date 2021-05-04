/* eslint-disable require-jsdoc */
const formEditarEnfermera = document.getElementById('editar-enfermera');
const tablaEnfermeras = document.getElementById('tabla-enfermeras');

document.addEventListener('load', obtenerEnfermeras());

formEditarEnfermera.addEventListener('submit', (e)=>{
  e.preventDefault();
  const username = formEditarEnfermera.elements['username'].value;
  const url = `https://backendproyecto2.herokuapp.com/enfermeras/${username}`;
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'nombre': formEditarEnfermera.elements['nombre'].value,
      'apellido': formEditarEnfermera.elements['apellido'].value,
      'fecha_nac': formEditarEnfermera.elements['fecha-nac'].value,
      'sexo': formEditarEnfermera.elements['sexo'].value,
      'username': formEditarEnfermera.elements['username'].value,
      'passwd': formEditarEnfermera.elements['passwd'].value,
      'telefono': formEditarEnfermera.elements['telefono'].value,
    }),
  })
      .then((res) => {
        if (res.ok) {
          obtenerEnfermeras();
          formEditarEnfermera.reset();
        }
      });
});

function obtenerEnfermeras() {
  const url = 'https://backendproyecto2.herokuapp.com/enfermeras';
  fetch(url, {
    method: 'GET',
  })
      .then((res) => {
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


          const enfermeraOpciones = document.createElement('td');
          enfermera.appendChild(enfermeraOpciones);

          const botonSeleccionar = document.createElement('button');
          botonSeleccionar.type = 'button';
          botonSeleccionar.classList.add('btn', 'btn-sm', 'btn-primary', 'm-1');
          botonSeleccionar.innerHTML = 'Seleccionar';
          botonSeleccionar.value = element.username;
          botonSeleccionar.addEventListener('click', seleccionarEnfermera);
          enfermeraOpciones.appendChild(botonSeleccionar);

          const botonEliminar = document.createElement('button');
          botonEliminar.type = 'button';
          botonEliminar.classList.add('btn', 'btn-sm', 'btn-danger', 'm-1');
          botonEliminar.innerHTML = 'Eliminar';
          botonEliminar.value = element.username;
          botonEliminar.addEventListener('click', eliminarEnfermera);
          enfermeraOpciones.appendChild(botonEliminar);
        }
      });
}

function seleccionarEnfermera() {
  const url = `https://backendproyecto2.herokuapp.com/enfermeras/${this.value}`;
  fetch(url, {
    method: 'GET',
  })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        const dayjsFechaNac = dayjs(res.fecha_nac, 'DD/MM/YYYY');
        const fechaNac = dayjsFechaNac.format('YYYY-MM-DD');

        formEditarEnfermera.elements['nombre'].value = res.nombre;
        formEditarEnfermera.elements['apellido'].value = res.apellido;
        formEditarEnfermera.elements['fecha-nac'].value = fechaNac;
        formEditarEnfermera.elements['sexo'].value = res.sexo;
        formEditarEnfermera.elements['username'].value = res.username;
        formEditarEnfermera.elements['passwd'].value = res.passwd;
        formEditarEnfermera.elements['telefono'].value = res.telefono;
      });
}

function eliminarEnfermera() {
  const url = `https://backendproyecto2.herokuapp.com/enfermeras/${this.value}`;
  fetch(url, {
    method: 'DELETE',
  })
      .then((res) => {
        if (res.ok) {
          obtenerEnfermeras();
        }
      });
}
