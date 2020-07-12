//Historial del inputText.value en recuadros debajo de la barra de búsqueda
//!restringir el número de p que se puede crear
let section = document.createElement('section');
section.classList.add('section-historial');

let searcherSection = document.getElementById('searcher');
searcherSection.appendChild(section);

function historialDivBelow(inputTextValue){
    console.log('entro');
    let div = document.createElement('div');
    div.classList.add('button-historial');
    let p = document.createElement('p');
    div.appendChild(p);

    p.innerHTML = `#${inputTextValue}`;

    section.appendChild(div);
}