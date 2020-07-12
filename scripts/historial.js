//Historial del inputText.value en recuadros debajo de la barra de búsqueda
//!restringir el número de p que se puede crear
let section = document.createElement('section');
section.classList.add('section-historial');

let searcherSection = document.getElementById('searcher');
searcherSection.appendChild(section);
//inicalizo j en 0 para ir indicando qué número de objeto cada vez que se de click

//!no estoy seguro cómo hacer con el local storage
let j = 0;

function historialDivBelow(inputTextValue){
    let div = document.createElement('div');
    div.classList.add('button-historial');
    let p = document.createElement('p');
    div.appendChild(p);
    p.innerHTML = `#${inputTextValue}`;
    section.appendChild(div);
    //almaceno las búsquedas en localStorage
    window.localStorage.setItem(`historial${j}`,`${inputTextValue}`);
    j++;
}