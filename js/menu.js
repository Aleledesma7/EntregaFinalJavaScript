const botonAbrirMenu = document.querySelector("#open-menu");
const botonCerrarMenu = document.querySelector("#close-menu");
const menuAside = document.querySelector("aside");

botonAbrirMenu.addEventListener("click", () => {
    menuAside.classList.add("aside-visible");
})

botonCerrarMenu.addEventListener("click", () => {
    menuAside.classList.remove("aside-visible");
})
