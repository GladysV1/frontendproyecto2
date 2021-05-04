/* eslint-disable require-jsdoc */
const tablaMedicamentos = document.getElementById('tabla-medicamentos');
const formMedicamentos = document.getElementById('form-medicamentos');
const modalMedicamentos = document.getElementById('modal-medicamentos');
const botonComprar = document.getElementById('boton-comprar');
const modal = new bootstrap.Modal(modalMedicamentos, {
  backdrop: 'static',
});


document.addEventListener('load', obtenerMedicamentos());
botonComprar.addEventListener('click', confirmarCompra);

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
      .then((res) => {
        tablaMedicamentos.innerHTML = null;
        let count = 0;

        for (const element of res) {
          count = count + 1;

          const medicamento = document.createElement('tr');
          tablaMedicamentos.appendChild(medicamento);

          const medicamentoCount = document.createElement('td');
          medicamentoCount.innerHTML = count;
          medicamento.appendChild(medicamentoCount);

          const medicamentoNombre = document.createElement('th');
          medicamentoNombre.innerHTML = element.nombre;
          medicamento.appendChild(medicamentoNombre);

          const medicamentoDesc = document.createElement('td');
          medicamentoDesc.innerHTML = element.desc;
          medicamento.appendChild(medicamentoDesc);

          const medicamentoPrecio = document.createElement('td');
          medicamentoPrecio.innerHTML = element.precio;
          medicamento.appendChild(medicamentoPrecio);

          const medicamentoCantidad = document.createElement('td');
          medicamentoCantidad.innerHTML = element.cant;
          medicamento.appendChild(medicamentoCantidad);

          const medicamentoComprar = document.createElement('td');
          medicamento.appendChild(medicamentoComprar);

          const botonDeCompra = document.createElement('button');
          botonDeCompra.type = 'button';
          botonDeCompra.classList.add('btn', 'btn-sm', 'btn-primary', 'm-1');
          botonDeCompra.innerHTML = 'Comprar';
          botonDeCompra.value = element.nombre;
          botonDeCompra.addEventListener('click', comprarMedicamento);
          medicamentoComprar.appendChild(botonDeCompra);
        }
      });
}

function comprarMedicamento() {
  modal.show();
  botonComprar.value = this.value;
}

function confirmarCompra() {
  const url = 'https://backendproyecto2.herokuapp.com/ventas';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'medicamento': this.value,
      'cant': formMedicamentos.elements['cant'].value,
    }),
  })
      .then((res) => {
        if (res.ok) {
          obtenerMedicamentos();
          modal.hide();
        }
      });
}


