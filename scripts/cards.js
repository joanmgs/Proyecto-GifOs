//Asignación de gifs sugeridos con random gifs
async function fillSuggestedGifCards(){
    for(let i=0; i<4; i++){
        let urlRandom = `https://api.giphy.com/v1/gifs/random?api_key=${APIKey}&rating=G`;
        let responseRandome = await fetch(urlRandom);
        let dataRandom = await responseRandome.json();
        //lleno p con el nombre del usuario que subió el gif como hashtag
        let nameSuggestGif = document.querySelector(`#suggest-hashtag${i+1}`); 
        nameSuggestGif.innerHTML = `#${dataRandom.data.username}`;
        //leno el src de la img con la url de los gifs random
        let imageSuggestGif = document.querySelector(`#suggest${i+1}`);
        imageSuggestGif.setAttribute('src',dataRandom.data.images.original.url);
        //lleno el alt de la img con el title de los gifs random
        imageSuggestGif.setAttribute('alt',dataRandom.data.title);
    }
}
fillSuggestedGifCards();
//Función cuando se da click a la x de los gif sugeridos
function closeButtonSuggestedGifCard(){
    for(let i=0; i<4; i++){
        closeButton[i].addEventListener('click', async function changeGifCard(){
            let urlRandom = `https://api.giphy.com/v1/gifs/random?api_key=${APIKey}&rating=G`;
            let responseRandom = await fetch(urlRandom);
            let dataRandom = await responseRandom.json();
            //lleno p con el nombre del usuario que subió el gif como hashtag
            let nameSuggestGif = document.querySelector(`#suggest-hashtag${i+1}`); 
            nameSuggestGif.innerHTML = `#${dataRandom.data.username}`;
            //leno el src de la img con la url de los gifs random
            let imageSuggestGif = document.querySelector(`#suggest${i+1}`);
            imageSuggestGif.setAttribute('src',dataRandom.data.images.original.url);
            console.log(imageSuggestGif);
            //lleno el alt de la img con el title de los gifs random
            imageSuggestGif.setAttribute('alt',dataRandom.data.title);
        });
    }
}
closeButtonSuggestedGifCard();
//Función al hacer click en el botón Ver Más
function verMas(){
    for(let i=0; i<4; i++){
        verMasButton[i].addEventListener('click', async function searchingVerMas(){
            let urlRandom = `https://api.giphy.com/v1/gifs/random?api_key=${APIKey}&rating=G`;
            let responseRandom = await fetch(urlRandom);
            let dataRandom = await responseRandom.json();
            //Llenando el inputText con el title para que lo busque y se llene en trendings
            inputText.value = `${dataRandom.data.title}`;
            //Baja hasta la sección trending
            window.scroll(0, topLocationTrending);
            searching();
        });
    }
}
verMas();
//Asignación de gifs a tendencias
async function trendCards(){
    trendingTitle.innerHTML = 'Tendencias:';
    let urlTrending = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKey}&limit=25&rating=G`;
    let responseTrending = await fetch(urlTrending);
    let dataTrending = await responseTrending.json();

    for(let i=0; i<dataTrending.data.length; i++){
        let trendingGif = document.querySelector(`#trend-gif${i+1}`);
        //Asigna el src y alt a las img
        trendingGif.setAttribute('src',dataTrending.data[i].images.original.url);
        trendingGif.setAttribute('alt',dataTrending.data[i].title);
        //Diseña el título para que se pueda leer en la url de búsqueda
        let trendingTitle = dataTrending.data[i].title;
        let trendingTitleCleaned = trendingTitle.split(' GIF')[0];
        let trendingTitleLink = trendingTitleCleaned.replace(/\s/g, '_');

        let urlTag = `https://api.giphy.com/v1/tags/related/${trendingTitleLink}?api_key=${APIKey}`;
        let tagResp = await fetch(urlTag);
        let tagData = await tagResp.json();
        //Llena los hashtags y quita el error cuando uno de los elementos del array no se encuentra
        const hashtag0 = tagData.data[0] ? tagData.data[0].name : tagData.data[1].name;
        const hashtag1 = tagData.data[1] ? tagData.data[1].name : tagData.data[2].name;
        const hashtag2 = tagData.data[2] ? tagData.data[2].name : tagData.data[3].name;

        tags[i].innerHTML = `#${hashtag0} #${hashtag1} #${hashtag2}`;
    }    
};
trendCards();
//Funcionalidad de la barra de búsqueda al hacer click en el botón Buscar
searchButton.addEventListener('click', (event) => {
    if(event.button == 0 && inputText.value != ''){
        window.scroll(0, topLocationTrending);
        searching();
    }
});
//Funcionalidad de la barra de búsqueda al presionar enter/return
inputText.addEventListener('keypress', (event) => {
    if(event.keyCode == 13 && inputText.value != ''){
        window.scroll(0, topLocationTrending);
        searching();
    }
});
//Resultados de la búsqueda al ingresar y presionar o hacer click en el botón search
async function searching(){
    // menuInput.style.display = 'none';

    let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=${inputText.value}&limit=25&rating=g&lang=es`;
    let responseSearch = await fetch(urlSearch);
    let searchData = await responseSearch.json();

    trendingTitle.innerHTML = `${inputText.value} :`;
    historialDivBelow(inputText.value);

    for(let i=0; i<searchData.data.length; i++){
        //selecciona cada img
        let gifCard = document.querySelector(`#trend-gif${i+1}`);
        //atribuye src y alt img
        //!se demora en cargar la imagen
        gifCard.setAttribute('src',searchData.data[i].images.original.url);
        gifCard.setAttribute('alt',searchData.data[i].title); //para accesibilidad
        //selección y limpieza de texto para buscar tags
        let gifTitle = searchData.data[i].title;
        if(gifTitle != ''){
            let gifTitleCleaned = gifTitle.split('GIF')[0];
            let textForSearchTags = gifTitleCleaned.replace(/\s/g, '_') == '' ? `${inputText.value}` : gifTitleCleaned.replace(/\s/g, '_');
            //selección de p donde se llenarán los tags    
            let urlRelatedTag = `https://api.giphy.com/v1/tags/related/${textForSearchTags}?api_key=${APIKey}`;
            let responseRelatedTag = await fetch(urlRelatedTag);
            let dataRelatedTag = await responseRelatedTag.json();
            //condición para poner los tags en p, cuando no es 200 el estado lo llena con #Without tags
            if(dataRelatedTag.meta.status == 200 && dataRelatedTag.data.length){
                //es posible que llegue el array, pero algunos keys no llegan, entonces se reemplaza por el siguiente
                const hashtag0 = dataRelatedTag.data[0].name;
                const hashtag1 = dataRelatedTag.data[1].name;
                const hashtag2 = dataRelatedTag.data[2].name
    
                tags[i].innerHTML = `#${hashtag0} #${hashtag1} #${hashtag2}`;
            }else{
                tags[i].innerHTML = `#${inputText.value}`;
            }
        }else{
            tags[i].innerHTML = `#${inputText.value}`;
        }
    }
}

//Moseover sobre trend-card - Aparece y desaparece los tags y el cuadro opaco
let trendingGifCard = document.getElementsByClassName('trend-card');
let trendHover = document.getElementsByClassName('trend-hover');

for(let i=0; i<trendingGifCard.length; i++){

    trendingGifCard[i].addEventListener('mouseover', showTrendHover);
    trendingGifCard[i].addEventListener('mouseleave', hideTrendHover);

    function showTrendHover(){
        trendHover[i].style.display = "flex";
    }
    function hideTrendHover(){
        trendHover[i].style.display = "none";
    }
}