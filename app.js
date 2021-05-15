let headerName = document.querySelector(".titulos-header--h1");
let arrayName = ["J", "o", "s", "e", " ", "A", "r", "p", "a", "i", "a"];

const showName = arrayName => {
    for (let index = 0; index < arrayName.length; index++) {
        const element = arrayName[index];
        setTimeout(() => {
            headerName.append(element);
            console.log(element);
        }, 500);
    };
    clearTimeout();        
};
 
showName(arrayName);