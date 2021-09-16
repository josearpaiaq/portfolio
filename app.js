let headerName = document.querySelector(".titulos-header--h1");
let arrayName = 'Soy Jose Arpaia';

setTimeout(() => {
    headerName.append(arrayName);
}, 500);

/* USANDO LA LIBRERIA SCROLL REVEAL */
ScrollReveal().reveal('.contenedor', {delay: 300});
ScrollReveal().reveal('.contact', {delay: 300});