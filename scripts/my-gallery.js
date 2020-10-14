//generador de cards para la galería de mis guifos
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
//agrega un div a la galería con mi guifo
async function fillMisGuifosGallery(miGuifoId){
    //agrega el id del gif creado a un array que será guardado en el localstorage
    arrayGallery.push(miGuifoId);
    //fetch al search gif id endopoint
    let url = `https://api.giphy.com/v1/gifs/${miGuifoId}?api_key=${APIKey}`
    let responseGallery = await fetch(url);
    let dataGallery = await responseGallery.json();
    //envío la dirección al generador de cards
    misGuifoscardGenerator(dataGallery.data.images.original.url);
    //Agrego al localstorage
    const stringifyGallery = JSON.stringify(arrayGallery);
    //guarda en el local storage los ids de los gifs creados
    localStorage.setItem('galeriaDeGuifos', stringifyGallery);
};
//cargar los guifos creados
async function loadMisGuifos(){
    for(let i = 0; i<arrayGallery.length; i++){
        let url = `https://api.giphy.com/v1/gifs/${arrayGallery[i]}?api_key=${APIKey}`
        let responseLoad = await fetch(url);
        let dataLoad = await responseLoad.json();
        
        misGuifoscardGenerator(dataLoad.data.images.original.url)
    };
};
//cargar los guifos creados en la galería
window.addEventListener('load', ()=>{
    //Parseo del json donde están los ids
    if(localStorage.getItem('galeriaDeGuifos')){
        arrayGallery = JSON.parse(localStorage.getItem('galeriaDeGuifos'))
        //condición para que solo se carguen cuando haya más de un elemento en el array
        if(arrayGallery.length > 0){
            loadMisGuifos();
        };
    };
});