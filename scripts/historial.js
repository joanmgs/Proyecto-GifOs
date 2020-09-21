// Historial del inputText.value en recuadros debajo de la barra de búsqueda
//creo el contenedor del historial y añado clase
let divHistorial = document.createElement('div');
divHistorial.classList.add('div-historial');
//atrapo la sección del contenedor
let searcherSection = document.getElementById('searcher');
//añado el divHistorial al searcherSection
searcherSection.appendChild(divHistorial);
// Historial debajo de la barra de búsqueda
function historialDivBelow(inputTextValue){
    let divButtonHistorial = document.createElement('div');
    divButtonHistorial.classList.add('button-historial');

    if(!nightTheme){
        divButtonHistorial.classList.add('day-see');
        divButtonHistorial.classList.remove('night-see');
    }else{
        divButtonHistorial.classList.add('night-see');
        divButtonHistorial.classList.remove('day-see');
    };

    let p = document.createElement('p');
    divButtonHistorial.appendChild(p);
    p.innerHTML = `#${inputTextValue}`;
    //array donde se obtiene el número de divs
    let numbOfDivs = document.querySelectorAll('.button-historial');
    //si el número es menor a 10 continúa ingresandolos al Array
    //cuando sobrepasa ese número elimina el último y actualiza el nuevo
    if(numbOfDivs.length < 5){
        storageHistorial.push(inputTextValue);
        divHistorial.prepend(divButtonHistorial);
    }else{
        storageHistorial.shift();
        storageHistorial.push(inputTextValue);
        divHistorial.prepend(divButtonHistorial);
        numbOfDivs[4].remove();
    };

    //convierte en string el array de storageHistorial
    const stringifyHistorial = JSON.stringify(storageHistorial);
    //guarda en el localStorage el string
    localStorage.setItem('historial',stringifyHistorial);

    //permite hacer click al botón de historial guardado para buscarlo nuevamente
    divButtonHistorial.addEventListener('click', () => {
        inputText.value = inputTextValue;
        window.scroll(0, topLocationTrending);
        //true permite indicar que el evento ocurrió
        searching(true);
    });
};
//Guarda el historial antes de la actualización de la página en el localStorage
window.addEventListener('beforeunload', ()=>{
    // //convierte en string el array de storageHistorial
    // const stringifyHistorial = JSON.stringify(storageHistorial);
    // //guarda en el localStorage el string
    // localStorage.setItem('historial',stringifyHistorial);
    //guarda el theme que haya escogido el usuario
    const stringifyNightTheme = JSON.stringify(nightTheme);
    //lo guardo en el localStorage
    localStorage.setItem('theme',stringifyNightTheme);
});
//Guarda el historial antes de la actualización de la página en el localStorage
window.addEventListener('load', ()=>{
    //parseo el string de nightTheme
    nightTheme = JSON.parse(localStorage.getItem('theme'));
    //condiciono para activar el evento que dejo el usuario guardado
    if(!nightTheme){
        // divButtonHistorial.classList.add('day-see');
        // divButtonHistorial.classList.remove('night-see');
        sailorDayButon.click();
    }else{
        // divButtonHistorial.classList.add('night-see');
        // divButtonHistorial.classList.remove('day-see');
        sailorNightButon.click();
    };
    if(window.localStorage.historial){
        //parsea el string, convirtiendolo en array nuevamente
        storageHistorial = JSON.parse(localStorage.getItem('historial'));
        //si la página se recargo y no hay nada, no se crea el historial nuevamente
        if(storageHistorial.length >0){
            for(let i = 0; i<storageHistorial.length; i++){
                let divButtonHistorial = document.createElement('div');
                divButtonHistorial.classList.add('button-historial');
                let p = document.createElement('p');
                divButtonHistorial.appendChild(p);
                p.innerHTML = `#${storageHistorial[i]}`;
                divHistorial.prepend(divButtonHistorial);
                //permite hacer click al botón de historial guardado para buscarlo nuevamente
                divButtonHistorial.addEventListener('click', () => {
                    inputText.value = storageHistorial[i];
                    window.scroll(0, topLocationTrending);
                    //true permite indicar que el evento ocurrió
                    searching(true);
                });
            };
        };
    };
});