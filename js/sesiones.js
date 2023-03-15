const tabla = document.querySelector('#tabla-detalles tbody');

fetch('info.json')
  .then(response => response.json())
  .then(sesiones => {
    sesiones.forEach(detalle => {
      const fila = document.createElement('tr');
      const nombre = document.createElement('td');
      const tipo = document.createElement('td');
      
      const duracion = document.createElement('td');
      const estado = document.createElement('td');
      const descripcion = document.createElement('td');

      
      nombre.textContent = detalle.nombre;
      tipo.textContent = detalle.tipo;
      estado.textContent = detalle.activo ? 'Reserva tu Turno' : 'Proximamente Fechas';
      duracion.textContent = detalle.duracion;
      descripcion.textContent = detalle.descripcion;

      
      fila.appendChild(nombre);
      fila.appendChild(tipo);
      fila.appendChild(duracion);
      fila.appendChild(estado);
      fila.appendChild(descripcion);

      
      tabla.appendChild(fila);
    });
  })
  .catch(error => console.error(error));