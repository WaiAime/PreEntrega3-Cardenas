
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
    // Obtenemos el div que contendrá nuestras cards
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    // Recorremos el array y por cada item imprimimos una card
    for (const sesion of array) {
        // Creamos el contendor individual para cada card
        let card = document.createElement("div");
        // <div>
        //     <img>
        //     <h1>
        //</div>

        // Agregamos el contenido a la card
        // Observar cómo el nombre del id del botón se genera
        // de manera dinámica
        card.innerHTML = `
        <div class="card text-center" style="width: 18rem;">
            <div class="card-body">
                <img src="${sesion.img}" id="" class="card-img-top img-fluid" alt="">
                <h2 class="card-title">${sesion.tipo}</h2>
                <h5 class="card-subtitle mb-2 text-muted">${sesion.descripcion}</h5>
                <p class="card-text">$${sesion.costo}</p>

                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button id="agregar${sesion.tipo}${sesion.id}" type="button" class="btn btn-dark"> Agregar </button>
                </div>
            </div>
        </div>      
        `;

        // Una vez que tenemos creada la card, la agregamos al contenedor
        // que obtuvimos desde el HTML
        contenedor.appendChild(card);

        // Luego de agregar la card al DOM,
        // asignamos el evento al botón correspondiente, habiendo nombrado su id de manera
        // dinámica
        let boton = document.getElementById(`agregar${sesion.tipo}${sesion.id}`);
        boton.addEventListener("click", () => agregarAlCarrito(sesion));
    }
}

function agregarAlCarrito(producto) {
    // Verificamos si ese tipo de sesion ya se encuentra en el array
    // con el método find()
    // Este método en caso de dar true, nos devuelve el primer elemento del array
    // que cumple con la condición de búsqueda
    let index = carrito.findIndex((elemento) => elemento.id === producto.id);
    console.log({ index });

    if (index != -1) {
        // Si el sesion se encuentra en el carrito, sesion devolverá
        // true, por lo cual se ejecutará este bloque de código
        // y se le sumará uno a la cantidad de esa tipo en el carrito

        // Una vez que obtenemos el index donde se halla el elemento ya agregado
        // al carrito, invocamos a los métodos que actualizaran unidades y costo total
        // De unidades repetidas
        carrito[index].agregarUnidad();
        carrito[index].actualizarCostoTotal();
    } else {
        // El sesion no se encuentra en el carrito, así que
        // lo pusheamos al array asignándole la clase Alsesionfajor
        // para poder acceder a sus métodos

        // En esta instancia, tenemos que inicializar la propiedad cantidad en 1
        let sesion = new Sesion(producto);
        sesion.cantidad = 1;
        carrito.push(sesion);
    }

    // Actualizamos el storage y el contenido de la tabla
    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    imprimirTabla(carrito);
}

function eliminarDelCarrito(id) {
    // Aquí buscamos el índice del producto en el carrito a eliminar
    let index = carrito.findIndex((element) => element.id === id);

    // Primero chequeamos el stock para saber si hay que restarle 1
    // al stock o quitar el elemento del array
    if (carrito[index].cantidad > 1) {
        // Si hay más de una unidad de ese producto, invocamos los métodos correspondientes
        carrito[index].quitarUnidad();
        carrito[index].actualizarCostoTotal();
    } else {
        // Si queda solo una unidad, se elimina del array
        // Para esto utilizamos el método splice
        // Este método sobreescribe el array original
        // Con sesion id indicamos el índice del elemento en el array
        // a eliminar. El 1 es la cantidad de elementos a eliminar, como en este caso

        // [3, 2, 1, 5, 4, 2].splice(2, 2)
        carrito.splice(index, 1);
    }

    //swal("Producto eliminado con éxito", "", "success");

    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    imprimirTabla(carrito);
}

function eliminarCarrito() {
    carrito = [];
    localStorage.removeItem("carritoEnStorage");
    // localStorage.clear()
    swal("Compra eliminada con éxito", "", "success");

    document.getElementById("tabla-carrito").innerHTML = "";
    document.getElementById("acciones-carrito").innerHTML = "";
}

function obtenerCostoTotal(array) {
    return array.reduce((total, elemento) => total + elemento.costoTotal, 0);
}

// Recibe el contenido del carrito y lo imprime en el html
// en una tabla
function imprimirTabla(array) {
    let contenedor = document.getElementById("tabla-carrito");
    contenedor.innerHTML = "";

    // Creamos el div que contendrá la tabla
    let tabla = document.createElement("div");

    // A ese div le agregaremos todos los datos de la tabla
    tabla.innerHTML = `
        <table id="tablaCarrito" class="table table-striped">
            <thead>         
                <tr>
                    <th>Item</th>
                    <th>Cantidad</th>
                    <th>Costo</th>
                    <th>Accion</th>
                </tr>
            </thead>

            <tbody id="bodyTabla">

            </tbody>
        </table>
    `;

    contenedor.appendChild(tabla);

    // Una vez que dibujamos la tabla, obtenemos el id del body de la tabla
    // donde imprimiremos los datos del array
    let bodyTabla = document.getElementById("bodyTabla");

    for (let sesion of array) {
        let datos = document.createElement("tr");
        datos.innerHTML = `
                <td>${sesion.tipo}</td>
                <td>${sesion.cantidad}</td>
                <td>$${sesion.costoTotal}</td>
                <td><button id="eliminar${sesion.id}" class="btn btn-dark">Eliminar</button></td>
      `;

        bodyTabla.appendChild(datos);

        let botonEliminar = document.getElementById(`eliminar${sesion.id}`);
        botonEliminar.addEventListener("click", () => eliminarDelCarrito(sesion.id));
    }

    let costoTotal = obtenerCostoTotal(array);
    let accionesCarrito = document.getElementById("acciones-carrito");
    accionesCarrito.innerHTML = `
		<h5>CostoTotal: $${costoTotal}</h5></br>
		<button id="vaciarCarrito" onclick="eliminarCarrito()" class="btn btn-dark">Vaciar Carrito</button>
	`;
}

function filtrarBusqueda(e) {
    e.preventDefault();

    // Tomo el value del input y le agrego toLowerCase para que la búsqueda no sea
    // case sensitive
    let ingreso = document.getElementById("busqueda").value.toLowerCase();
    let arrayFiltrado = sesion.filter((elemento) => elemento.tipo.toLowerCase().includes(ingreso));

    imprimirProductosEnHTML(arrayFiltrado);
}

function chequearCarritoEnStorage() {
    let contenidoEnStorage = JSON.parse(localStorage.getItem("carritoEnStorage"));

    // Si existe la key buscada en el storage nos traemos
    // los datos para recuperarlos y poder visualizarlos en pantalla
    if (contenidoEnStorage) {
        // Al traer los datos del storage perdemos las instancias de clase
        // Para recuperarlas genero una copia del array con la info del storage
        // instanciando la clase en cada objeto del array
        let array = [];

        for (const objeto of contenidoEnStorage) {
            // Recibo los datos del objeto del storage
            // los guardo en la variable sesion con la instancia de clase
            // let sesion = new sesion(objeto, objeto.cantidad);
            let sesion = new Sesion (objeto);
            sesion.actualizarCostoTotal();
            // Envio ese objeto instanciado al arrray
            array.push(sesion);
        }

        imprimirTabla(array);

        // Una vez que terminamos, la función retorna ese nuevo array con los datos recuperados
        return array;
    }

    // Si no existe ese array en el LS, esta función devolverá un array vacío
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
