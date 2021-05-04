/* eslint-disable require-jsdoc */
const formCsvMedicamentos = document.getElementById('cargar-csv-medicamentos');
const tablaMedicamentos = document.getElementById('tabla-medicamentos');
const formCrearMedicamento = document.getElementById('crear-medicamento');

document.addEventListener('load', obtenerMedicamentos());

formCsvMedicamentos.addEventListener('submit', (e) => {
  e.preventDefault();
  const csvMedicamentos = formCsvMedicamentos.elements['csv-medicamentos'];
  const url = 'https://backendproyecto2.herokuapp.com/csv/medicamentos';
  const data = new FormData();
  data.append('csv_file', csvMedicamentos.files[0]);
  fetch(url, {
    method: 'POST',
    body: data,
  })
      .then((res) => {
        if (res.ok) {
          obtenerMedicamentos();
          formCsvMedicamentos.reset();
        }
      });
});

formCrearMedicamento.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = 'https://backendproyecto2.herokuapp.com/medicamentos';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'nombre': formCrearMedicamento.elements['nombre'].value,
      'precio': formCrearMedicamento.elements['precio'].value,
      'desc': formCrearMedicamento.elements['desc'].value,
      'cant': formCrearMedicamento.elements['cant'].value,
    }),
  })
      .then((res)=> {
        if (res.ok) {
          obtenerMedicamentos();
          formCrearMedicamento.reset();
        }
      });
});

function obtenerMedicamentos() {
  const url = 'https://backendproyecto2.herokuapp.com/medicamentos';
  fetch(url, {
    method: 'GET',
  })
      .then((res)=>{
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
        }
      });
}
