/* eslint-disable require-jsdoc */
const formEditarDoctor = document.getElementById('editar-doctor');
const tablaDoctores = document.getElementById('tabla-doctores');

document.addEventListener('load', obtenerDoctores());

formEditarDoctor.addEventListener('submit', (e)=>{
  e.preventDefault();
  const username = formEditarDoctor.elements['username'].value;
  const url = `https://backendproyecto2.herokuapp.com/doctores/${username}`;
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'nombre': formEditarDoctor.elements['nombre'].value,
      'apellido': formEditarDoctor.elements['apellido'].value,
      'fecha_nac': formEditarDoctor.elements['fecha-nac'].value,
      'sexo': formEditarDoctor.elements['sexo'].value,
      'username': formEditarDoctor.elements['username'].value,
      'passwd': formEditarDoctor.elements['passwd'].value,
      'especialidad': formEditarDoctor.elements['especialidad'].value,
      'telefono': formEditarDoctor.elements['telefono'].value,
    }),
  })
      .then((res) => {
        if (res.ok) {
          obtenerDoctores();
          formEditarDoctor.reset();
        }
      });
});

function obtenerDoctores() {
  const url = 'https://backendproyecto2.herokuapp.com/doctores';
  fetch(url, {
    method: 'GET',
  })
      .then((res) => {
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

          const doctorOpciones = document.createElement('td');
          doctor.appendChild(doctorOpciones);

          const botonSeleccionar = document.createElement('button');
          botonSeleccionar.type = 'button';
          botonSeleccionar.classList.add('btn', 'btn-sm', 'btn-primary', 'm-1');
          botonSeleccionar.innerHTML = 'Seleccionar';
          botonSeleccionar.value = element.username;
          botonSeleccionar.addEventListener('click', seleccionarDoctor);
          doctorOpciones.appendChild(botonSeleccionar);

          const botonEliminar = document.createElement('button');
          botonEliminar.type = 'button';
          botonEliminar.classList.add('btn', 'btn-sm', 'btn-danger', 'm-1');
          botonEliminar.innerHTML = 'Eliminar';
          botonEliminar.value = element.username;
          botonEliminar.addEventListener('click', eliminarDoctor);
          doctorOpciones.appendChild(botonEliminar);
        }
      });
}

function seleccionarDoctor() {
  const url = `https://backendproyecto2.herokuapp.com/doctores/${this.value}`;
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

        formEditarDoctor.elements['nombre'].value = res.nombre;
        formEditarDoctor.elements['apellido'].value = res.apellido;
        formEditarDoctor.elements['fecha-nac'].value = fechaNac;
        formEditarDoctor.elements['sexo'].value = res.sexo;
        formEditarDoctor.elements['username'].value = res.username;
        formEditarDoctor.elements['passwd'].value = res.passwd;
        formEditarDoctor.elements['especialidad'].value = res.especialidad;
        formEditarDoctor.elements['telefono'].value = res.telefono;
      });
}

function eliminarDoctor() {
  const url = `https://backendproyecto2.herokuapp.com/doctores/${this.value}`;
  fetch(url, {
    method: 'DELETE',
  })
      .then((res) => {
        if (res.ok) {
          obtenerDoctores();
        }
      });
}
