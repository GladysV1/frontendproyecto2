/* eslint-disable require-jsdoc */
const formEditarPaciente = document.getElementById('editar-paciente');
const tablaPacientes = document.getElementById('tabla-pacientes');

document.addEventListener('load', obtenerPacientes());

formEditarPaciente.addEventListener('submit', (e)=>{
  e.preventDefault();
  const username = formEditarPaciente.elements['username'].value;
  const url = `https://backendproyecto2.herokuapp.com/pacientes/${username}`;
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'nombre': formEditarPaciente.elements['nombre'].value,
      'apellido': formEditarPaciente.elements['apellido'].value,
      'fecha_nac': formEditarPaciente.elements['fecha-nac'].value,
      'sexo': formEditarPaciente.elements['sexo'].value,
      'username': formEditarPaciente.elements['username'].value,
      'passwd': formEditarPaciente.elements['passwd'].value,
      'telefono': formEditarPaciente.elements['telefono'].value,
    }),
  })
      .then((res) => {
        if (res.ok) {
          obtenerPacientes();
          formEditarPaciente.reset();
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


          const pacienteOpciones = document.createElement('td');
          paciente.appendChild(pacienteOpciones);

          const botonSeleccionar = document.createElement('button');
          botonSeleccionar.type = 'button';
          botonSeleccionar.classList.add('btn', 'btn-sm', 'btn-primary', 'm-1');
          botonSeleccionar.innerHTML = 'Seleccionar';
          botonSeleccionar.value = element.username;
          botonSeleccionar.addEventListener('click', seleccionarPaciente);
          pacienteOpciones.appendChild(botonSeleccionar);

          const botonEliminar = document.createElement('button');
          botonEliminar.type = 'button';
          botonEliminar.classList.add('btn', 'btn-sm', 'btn-danger', 'm-1');
          botonEliminar.innerHTML = 'Eliminar';
          botonEliminar.value = element.username;
          botonEliminar.addEventListener('click', eliminarPaciente);
          pacienteOpciones.appendChild(botonEliminar);
        }
      });
}

function seleccionarPaciente() {
  const url = `https://backendproyecto2.herokuapp.com/pacientes/${this.value}`;
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

        formEditarPaciente.elements['nombre'].value = res.nombre;
        formEditarPaciente.elements['apellido'].value = res.apellido;
        formEditarPaciente.elements['fecha-nac'].value = fechaNac;
        formEditarPaciente.elements['sexo'].value = res.sexo;
        formEditarPaciente.elements['username'].value = res.username;
        formEditarPaciente.elements['passwd'].value = res.passwd;
        formEditarPaciente.elements['telefono'].value = res.telefono;
      });
}

function eliminarPaciente() {
  const url = `https://backendproyecto2.herokuapp.com/pacientes/${this.value}`;
  fetch(url, {
    method: 'DELETE',
  })
      .then((res) => {
        if (res.ok) {
          obtenerPacientes();
        }
      });
}
