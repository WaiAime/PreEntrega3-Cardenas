
class Sesion {
    constructor(sesion) {
        this.id = sesion.id;
        this.tipo = sesion.tipo;
        this.costo = sesion.costo;
        this.cantidad = sesion.cantidad;
        this.costoTotal = sesion.costo;
    }

    agregarUnidad() {
        this.cantidad++;
    }

    quitarUnidad() {
        this.cantidad--;
    }

    actualizarCostoTotal() {
        this.costoTotal = this.costo * this.cantidad;
    }
}

// ************** DECLARACIÓN DE FUNCIONES ************** //

function imprimirProductosEnHTML(array) {
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";




    // Se crea el producto a medida que se recorre el array
    for (const sesion of array) {
            let ficha = document.createElement("div");

            //MODIFICAR FOTOS O SACAR
        ficha.innerHTML = `
        <div class="card text-center" style="width: 25rem;">
            <div class="card-body">    
                <img src="${sesion.img}" id="" class="card-img-top img-fluid" alt="">
                <h2 class="card-title">${sesion.tipo}</h2>
                <h5 class="card-subtitle mb-2 text-muted">$${sesion.costo}</h5>
                <p class="card-text">${sesion.descripcion}</p>

                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button id="agregar${sesion.tipo}${sesion.id}" type="button" class="btn btn-outline-warning"> Reservar </button>
                </div>
            </div>
        </div>      
        `;

        contenedor.appendChild(ficha);

        // asigno evento,
        let boton = document.getElementById(`agregar${sesion.tipo}${sesion.id}`);
        boton.addEventListener("click", () => agregarAlCarrito(sesion));
    }
}

function agregarAlCarrito(producto) {
    let index = carrito.findIndex((elemento) => elemento.id === producto.id);
    console.log({ index });

    if (index != -1) {
        carrito[index].agregarUnidad();
        carrito[index].actualizarCostoTotal();
    } else {
        let sesion = new Sesion(producto);
        sesion.cantidad = 1;
        carrito.push(sesion);
    }


    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    imprimirTabla(carrito);
}

function eliminarDelCarrito(id) {
    let index = carrito.findIndex((element) => element.id === id);

    if (carrito[index].cantidad > 1) {
        carrito[index].quitarUnidad();
        carrito[index].actualizarCostoTotal();
    } else {
        carrito.splice(index, 1);
    }

    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    imprimirTabla(carrito);
}

function eliminarCarrito() {
    carrito = [];
    localStorage.removeItem("carritoEnStorage");    // localStorage.clear()
    swal("Carrito vacio", "", "success");

    document.getElementById("tabla-carrito").innerHTML = "";
    document.getElementById("acciones-carrito").innerHTML = "";
}

function obtenerCostoTotal(array) {
    return array.reduce((total, elemento) => total + elemento.costoTotal, 0);
}

function imprimirTabla(array) {
    let contenedor = document.getElementById("tabla-carrito");
    contenedor.innerHTML = "";

    let tabla = document.createElement("div");

    tabla.innerHTML = `
        <table id="tablaCarrito" class="table table-hover">
            <thead>         
                <tr>
                    <th>Mis Elegidos</th>
                    <th>Cantidad</th>
                    <th>Costo</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="bodyTabla">
            </tbody>
        </table>
    `;
    contenedor.appendChild(tabla);

    let bodyTabla = document.getElementById("bodyTabla");

    for (let sesion of array) {
        let datos = document.createElement("tr");
        datos.innerHTML = `
                <td>${sesion.tipo}</td>
                <td>${sesion.cantidad}</td>
                <td>$${sesion.costoTotal}</td>
                <td><button id="eliminar${sesion.id}" class="btn btn-outline-light">Quitar</button></td>
    `;

        bodyTabla.appendChild(datos);

        let botonEliminar = document.getElementById(`eliminar${sesion.id}`);
        botonEliminar.addEventListener("click", () => eliminarDelCarrito(sesion.id));
    }

    let costoTotal = obtenerCostoTotal(array);
    let accionesCarrito = document.getElementById("acciones-carrito");
    accionesCarrito.innerHTML = `
		<h5>CostoTotal: $${costoTotal}</h5></br>
		<button id="vaciarCarrito" onclick="eliminarCarrito()" class="btn btn-warning">Vaciar Carrito</button>
	`;
}

function filtrarBusqueda(e) {
    e.preventDefault();
    let ingreso = document.getElementById("busqueda").value.toLowerCase();
    let arrayFiltrado = sesion.filter((elemento) => elemento.tipo.toLowerCase().includes(ingreso));

    imprimirProductosEnHTML(arrayFiltrado);
}

function chequearCarritoEnStorage() {
    let contenidoEnStorage = JSON.parse(localStorage.getItem("carritoEnStorage"));

    if (contenidoEnStorage) {
        let array = [];

        for (const objeto of contenidoEnStorage) {
            let sesion = new Sesion (objeto);
            sesion.actualizarCostoTotal();// Envio al arrray el objeto
                        array.push(sesion);
        }

        imprimirTabla(array);

        return array;
    }
    return [];
}

// ************** EVENTO **************
let btnFiltrar = document.getElementById("btnFiltrar");
btnFiltrar.addEventListener("click", filtrarBusqueda);

// ************** CONSTANTES Y VARIABLES **************

const sesiones = [
    {
        id: 0,
        tipo: "Reiki",
        descripcion: "Duración  50 min",
        costo: 2500,
        img: "./img/reiki.jpg",
    },
    {
        id: 1,
        tipo: "Masaje Tailandés",
        descripcion: "Duración  1hr",
        costo: 3000,
        img: "./img/masaj2.JPG",
    },
    {
        id: 2,
        tipo: "Terapia Sacrouterina",
        descripcion: "Duración  1hs 30min",
        costo: 2800,
        img: "./img/coflerblock.jpg",
    },
    {
        id: 3,
        tipo: "Registros Akashicos",
        descripcion: "Duración 1hr",
        costo: 2200,
        img: "./img/reg ak.jpg",
    },
    {
        id: 4,
        tipo: "Rito del Útero",
        descripcion: "Duración 2hs- Grupal",
        costo: 2800,
        img: "./img/ritoU.jpg",
    },
    {
        id: 5,
        tipo: "Danzas Circulares",
        descripcion: "Duración 3hs -  Grupal ",
        costo: 3000,
        img: "./img/danzas1.JPG",
    },
    {
        id: 6,
        tipo: "Masaje Tailandés- CLASE",
        descripcion: "Duración 5hs repartidas en 2 clases ",
        costo: 4000,
        img: "./img/danzas1.JPG",
    },    

];

// Ejecución del código
// --- Invocación de funciones ---
imprimirProductosEnHTML(sesiones);

// Consulta al Storage para saber si hay información almacenada
// Si hay datos, se imprimen en el HTML al refrescar la página
let carrito = chequearCarritoEnStorage();
