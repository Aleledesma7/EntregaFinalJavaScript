let listaProductos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        listaProductos = data;
        renderizarProductos(listaProductos);
    })

const uiListaProductos = document.querySelector("#contenedor-productos");
const botonesFiltroCategoria = document.querySelectorAll(".boton-categoria");
const uiTituloCategoria = document.querySelector("#titulo-principal");
let botonesAgregarProducto = document.querySelectorAll(".producto-agregar");
const indicadorCarrito = document.querySelector("#numerito");

botonesFiltroCategoria.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))

function renderizarProductos(productosElegidos) {
    uiListaProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        uiListaProductos.append(div);
    });

    conectarBotonesAgregar();
}

botonesFiltroCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesFiltroCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = listaProductos.find(producto => producto.categoria.id === e.currentTarget.id);
            uiTituloCategoria.innerText = productoCategoria.categoria.nombre;
            const productosBoton = listaProductos.filter(producto => producto.categoria.id === e.currentTarget.id);
            renderizarProductos(productosBoton);
        } else {
            uiTituloCategoria.innerText = "Todos los productos";
            renderizarProductos(listaProductos);
        }
    })
});

function conectarBotonesAgregar() {
    botonesAgregarProducto = document.querySelectorAll(".producto-agregar");
    botonesAgregarProducto.forEach(boton => {
        boton.addEventListener("click", manejarAgregarProducto);
    });
}

let itemsEnCarrito;
let itemsCarritoLS = localStorage.getItem("productos-en-carrito");

if (itemsCarritoLS) {
    itemsEnCarrito = JSON.parse(itemsCarritoLS);
    actualizarIndicadorCarrito();
} else {
    itemsEnCarrito = [];
}

function manejarAgregarProducto(e) {
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
        },
        onClick: function(){} 
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = listaProductos.find(producto => producto.id === idBoton);

    if(itemsEnCarrito.some(producto => producto.id === idBoton)) {
        const index = itemsEnCarrito.findIndex(producto => producto.id === idBoton);
        itemsEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        itemsEnCarrito.push(productoAgregado);
    }

    actualizarIndicadorCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(itemsEnCarrito));
}

function actualizarIndicadorCarrito() {
    let nuevoNumerito = itemsEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    indicadorCarrito.innerText = nuevoNumerito;
}
