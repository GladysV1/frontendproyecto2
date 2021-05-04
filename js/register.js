const formRegister = document.getElementById('register-form');

formRegister.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = 'https://backendproyecto2.herokuapp.com/pacientes';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'nombre': formRegister.elements['nombre'].value,
      'apellido': formRegister.elements['apellido'].value,
      'fecha_nac': formRegister.elements['fecha-nac'].value,
      'sexo': formRegister.elements['sexo'].value,
      'username': formRegister.elements['username'].value,
      'passwd': formRegister.elements['passwd'].value,
      'telefono': formRegister.elements['telefono'].value,
    }),
  })
      .then((res)=> {
        if (res.ok) {
          formRegister.reset();
        }
      });
});
