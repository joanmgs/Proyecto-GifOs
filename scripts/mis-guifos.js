//reconocimiento del tema y carga de los guifos creados
window.addEventListener('beforeunload', ()=>{
    //guarda el theme que haya escogido el usuario
    const stringifyNightTheme = JSON.stringify(nightTheme);
    //lo guardo en el localStorage
    localStorage.setItem('theme',stringifyNightTheme);
});
//cargar los guifos creados en la galería
window.addEventListener('load', ()=>{
    //parseo el string de nightTheme
    nightTheme = JSON.parse(localStorage.getItem('theme'));
    //condiciono para activar el evento que dejo el usuario guardado
    if(!nightTheme){
        sailorDayButon.click();
    }else{
        sailorNightButon.click();
    };
    if(window.localStorage.galeriaDeGuifos){
        //Hago stringify del array de los ids
        arrayGallery = JSON.parse(localStorage.getItem('galeriaDeGuifos'))
        //condición para que solo se carguen cuando haya más de un elemento en el array

        if(arrayGallery.length > 0){
            loadMisGuifos();
        };
    };
});
//generador de cards
let misGuifosGallery = document.getElementById('mis-guifos-gallery');
function misGuifoscardGenerator(miGuifoUrl){
    //Creo los elementos
    const trendCardDiv = document.createElement('div');
    const trendGIfImg = document.createElement('img');
    //los añado a sus respectivos lugares
    misGuifosGallery.appendChild(trendCardDiv);
    trendCardDiv.appendChild(trendGIfImg);
    //defino sus clases
    trendCardDiv.classList.add("trend-card");
    trendGIfImg.setAttribute('src',miGuifoUrl)
};
//carga de guifos creados
async function loadMisGuifos(){
    for(let i = 0; i<arrayGallery.length; i++){
        let url = `https://api.giphy.com/v1/gifs/${arrayGallery[i]}?api_key=${APIKey}`
        let responseLoad = await fetch(url);
        let dataLoad = await responseLoad.json();
        
        misGuifoscardGenerator(dataLoad.data.images.original.url)
    };
};