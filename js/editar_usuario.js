/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const formEditarUsuario = document.getElementById('editar-usuario-form');
const botonRegresar = document.getElementById('btn-regresar');

document.addEventListener('load', obtenerUsuario());

if (localStorage.getItem('tipo_usuario') == 'doctor') {
  const inputEspecialidad = document.createElement('input');
  inputEspecialidad.type = 'text';
  inputEspecialidad.name = 'especialidad';
  inputEspecialidad.id = 'especialidad';
  inputEspecialidad.classList.add('form-control', 'form-control-sm');
  inputEspecialidad.required = true;
  formEditarUsuario.insertBefore(inputEspecialidad, formEditarUsuario.children[14]);
  const labelEspecialidad = document.createElement('label');
  labelEspecialidad.setAttribute('for', 'especialidad');
  labelEspecialidad.classList.add('form-label');
  labelEspecialidad.innerHTML = 'Especialidad';
  formEditarUsuario.insertBefore(labelEspecialidad, inputEspecialidad);
}

function obtenerUsuario() {
  const usuario = localStorage.getItem('usuario');
  let url = '';
  if (localStorage.getItem('tipo_usuario') == 'paciente') {
    url = `https://backendproyecto2.herokuapp.com/pacientes/${usuario}`;
  } else if (localStorage.getItem('tipo_usuario') == 'doctor') {
    url = `https://backendproyecto2.herokuapp.com/doctores/${usuario}`;
  } else if (localStorage.getItem('tipo_usuario') == 'enfermera') {
    url = `https://backendproyecto2.herokuapp.com/enfermeras/${usuario}`;
  }
  fetch(url, {
    method: 'GET',
  })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res)=>{
        const dayjsFechaNac = dayjs(res.fecha_nac, 'DD/MM/YYYY');
        const fechaNac = dayjsFechaNac.format('YYYY-MM-DD');

        formEditarUsuario.elements['nombre'].value = res.nombre;
        formEditarUsuario.elements['apellido'].value = res.apellido;
        formEditarUsuario.elements['fecha-nac'].value = fechaNac;
        formEditarUsuario.elements['sexo'].value = res.sexo;
        formEditarUsuario.elements['username'].value = res.username;
        formEditarUsuario.elements['passwd'].value = res.passwd;
        formEditarUsuario.elements['telefono'].value = res.telefono;

        if (localStorage.getItem('tipo_usuario') == 'doctor') {
          formEditarUsuario.elements['especialidad'].value = res.especialidad;
        }
      });
}


formEditarUsuario.addEventListener('submit', (e) => {
  e.preventDefault();
  const usuario = localStorage.getItem('usuario');
  let url = '';
  if (localStorage.getItem('tipo_usuario') == 'paciente') {
    url = `https://backendproyecto2.herokuapp.com/pacientes/${usuario}`;
  } else if (localStorage.getItem('tipo_usuario') == 'doctor') {
    url = `https://backendproyecto2.herokuapp.com/doctores/${usuario}`;
  } else if (localStorage.getItem('tipo_usuario') == 'enfermera') {
    url = `https://backendproyecto2.herokuapp.com/enfermeras/${usuario}`;
  }
  const newUsuario = {
    'nombre': formEditarUsuario.elements['nombre'].value,
    'apellido': formEditarUsuario.elements['apellido'].value,
    'fecha_nac': formEditarUsuario.elements['fecha-nac'].value,
    'sexo': formEditarUsuario.elements['sexo'].value,
    'username': formEditarUsuario.elements['username'].value,
    'passwd': formEditarUsuario.elements['passwd'].value,
    'telefono': formEditarUsuario.elements['telefono'].value,
  };

  if (localStorage.getItem('tipo_usuario')=='doctor') {
    newUsuario['especialidad'] = formEditarUsuario.elements['especialidad'].value;
  }
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUsuario),
  })
      .then((res) => {
        if (res.ok) {
          obtenerUsuario();
          formEditarUsuario.reset();
        }
      });
});

botonRegresar.addEventListener('click', (e) => {
  window.history.back();
});
