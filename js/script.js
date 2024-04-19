const modoNocturnoBtn = document.getElementById('modoNocturnoBtn');
const container = document.querySelector('.Nocturno');

modoNocturnoBtn.addEventListener('click', () => {
  // Alternar la clase dark-mode en el contenedor
  container.classList.toggle('dark-mode');

  // Guardar la preferencia del usuario en el almacenamiento local
  const modoNocturnoActivado = container.classList.contains('dark-mode');
  localStorage.setItem('modoNocturno', modoNocturnoActivado);
});

// Cargar la preferencia del usuario al cargar la página
const modoNocturnoGuardado = localStorage.getItem('modoNocturno');
if (modoNocturnoGuardado) {
  container.classList.toggle('dark-mode', modoNocturnoGuardado === 'true');
}