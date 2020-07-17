//Historial del inputText.value en recuadros debajo de la barra de búsqueda
let divHistorial = document.createElement('div');
divHistorial.classList.add('div-historial');

let searcherSection = document.getElementById('searcher');
searcherSection.appendChild(divHistorial);

function historialDivBelow(inputTextValue){
    let div = document.createElement('div');
    div.classList.add('button-historial');
    let p = document.createElement('p');
    div.appendChild(p);
    p.innerHTML = `#${inputTextValue}`;
    divHistorial.prepend(div);

    div.addEventListener('click', function(){
        inputText.value = inputTextValue;
        window.scroll(0, topLocationTrending);
        //true permite indicar que el evento ocurrió
        searching(true);
    });
}