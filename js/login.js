const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const url = 'https://backendproyecto2.herokuapp.com/login';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'username': loginForm.elements['username'].value,
      'passwd': loginForm.elements['passwd'].value,
    }),
  })
      .then((res)=> {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        localStorage.clear();
        localStorage.setItem('usuario', res.username);
        localStorage.setItem('tipo_usuario', res.type);
        const tipoUsuario = localStorage.getItem('tipo_usuario');
        if (tipoUsuario == 'admin') {
          window.location.replace('./admin_pacientes.html');
        } else if (tipoUsuario == 'paciente') {
          window.location.replace('./paciente_citas.html');
        } else if (tipoUsuario == 'doctor') {
          window.location.replace('./doctor_recetas.html');
        } else if (tipoUsuario == 'enfermera') {
          window.location.replace('./enfermera_citas_solicitadas.html');
        }
      });
});
