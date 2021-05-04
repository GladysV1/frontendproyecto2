/* eslint-disable require-jsdoc */
const formEditarMedicamento = document.getElementById('editar-medicamento');
const tablaMedicamentos = document.getElementById('tabla-medicamentos');

document.addEventListener('load', obtenerMedicamentos());

formEditarMedicamento.addEventListener('submit', (e)=>{
  e.preventDefault();
  const nombre = formEditarMedicamento.elements['nombre'].value;
  const url = `https://backendproyecto2.herokuapp.com/medicamentos/${nombre}`;
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'nombre': formEditarMedicamento.elements['nombre'].value,
      'precio': formEditarMedicamento.elements['precio'].value,
      'desc': formEditarMedicamento.elements['desc'].value,
      'cant': formEditarMedicamento.elements['cant'].value,
    }),
  })
      .then((res) => {
        if (res.ok) {
          obtenerMedicamentos();
          formEditarMedicamento.reset();
        }
      });
});

function obtenerMedicamentos() {
  const url = 'https://backendproyecto2.herokuapp.com/medicamentos';
  fetch(url, {
    method: 'GET',
  })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res)=>{
        tablaMedicamentos.innerHTML = null;
        let count = 0;
        for (const element of res) {
          count = count + 1;

          const medicamento = document.createElement('tr');
          tablaMedicamentos.appendChild(medicamento);

          const medicamentoCount = document.createElement('td');
          medicamentoCount.scope = 'row';
          medicamentoCount.innerHTML = count;
          medicamento.appendChild(medicamentoCount);

          const medicamentoNombre = document.createElement('th');
          medicamentoNombre.innerHTML = element.nombre;
          medicamento.appendChild(medicamentoNombre);

          const medicamentoPrecio = document.createElement('td');
          medicamentoPrecio.innerHTML = element.precio;
          medicamento.appendChild(medicamentoPrecio);

          const medicamentoDesc = document.createElement('td');
          medicamentoDesc.innerHTML = element.desc;
          medicamento.appendChild(medicamentoDesc);

          const medicamentoCant = document.createElement('td');
          medicamentoCant.innerHTML = element.cant;
          medicamento.appendChild(medicamentoCant);

          const medicamentoOpciones = document.createElement('td');
          medicamento.appendChild(medicamentoOpciones);

          const botonSeleccionar = document.createElement('button');
          botonSeleccionar.type = 'button';
          botonSeleccionar.classList.add('btn', 'btn-sm', 'btn-primary', 'm-1');
          botonSeleccionar.innerHTML = 'Seleccionar';
          botonSeleccionar.value = element.nombre;
          botonSeleccionar.addEventListener('click', seleccionarMedicamento);
          medicamentoOpciones.appendChild(botonSeleccionar);

          const botonEliminar = document.createElement('button');
          botonEliminar.type = 'button';
          botonEliminar.classList.add('btn', 'btn-sm', 'btn-danger', 'm-1');
          botonEliminar.innerHTML = 'Eliminar';
          botonEliminar.value = element.nombre;
          botonEliminar.addEventListener('click', eliminarMedicamento);
          medicamentoOpciones.appendChild(botonEliminar);
        }
      });
}

function seleccionarMedicamento() {
  const url = `https://backendproyecto2.herokuapp.com/medicamentos/${this.value}`;
  fetch(url, {
    method: 'GET',
  })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        formEditarMedicamento.elements['nombre'].value = res.nombre;
        formEditarMedicamento.elements['precio'].value = res.precio;
        formEditarMedicamento.elements['desc'].value = res.desc;
        formEditarMedicamento.elements['cant'].value = res.cant;
      });
}

function eliminarMedicamento() {
  const url = `https://backendproyecto2.herokuapp.com/medicamentos/${this.value}`;
  fetch(url, {
    method: 'DELETE',
  })
      .then((res) => {
        if (res.ok) {
          obtenerMedicamentos();
        }
      });
}
