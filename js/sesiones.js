const tabla = document.querySelector('#tabla-notas tbody');

fetch('info.json')
  .then(response => response.json())
  .then(alumnos => {
    alumnos.forEach(estudiante => {
      const fila = document.createElement('tr');
      const nombre = document.createElement('td');
      const tipo = document.createElement('td');
      
      const duracion = document.createElement('td');
      const estado = document.createElement('td');
      const descripcion = document.createElement('td');

      
      nombre.textContent = estudiante.nombre;
      tipo.textContent = estudiante.tipo;
      estado.textContent = estudiante.activo ? 'Reserva tu Turno' : 'Proximamente Fechas';
      duracion.textContent = estudiante.duracion;
      descripcion.textContent = estudiante.descripcion;

      
      fila.appendChild(nombre);
      fila.appendChild(tipo);
      fila.appendChild(duracion);
      fila.appendChild(estado);
      fila.appendChild(descripcion);

      
      tabla.appendChild(fila);
    });
  })
  .catch(error => console.error(error));