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
    //Título de la barra cabecera de la sección de trendings
    trendingTitle.innerHTML = 'Tendencias:';

    let urlTrending = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKey}&limit=25&rating=G`;
    let responseTrending = await fetch(urlTrending);
    let dataTrending = await responseTrending.json();

    for(let i=0; i<dataTrending.data.length; i++){
        
        // let divTrendCard = document.createElement('div');
        // let imgTrendCard = document.createElement('img');
        // let divTrendHover = document.createElement('div');
        // let divTagContainer = document.createElement('div');
        // let pTagsHover = document.createElement('p');
        
        // divTrendCard.classList.add('trend-card');
        // imgTrendCard.id = `trend-gif${i+1}`;
        // imgTrendCard.setAttribute('src',dataTrending.data[i].images.original.url);
        // imgTrendCard.setAttribute('alt',dataTrending.data[i].title);
        // divTrendHover.classList.add('trend-hover');
        // divTagContainer.classList.add('day-tag-container');
        // pTagsHover.classList.add('tags-hover');

        // figureInTrend.appendChild(divTrendCard);
        // divTrendCard.appendChild(imgTrendCard);
        // divTrendCard.appendChild(divTrendHover);
        // divTrendHover.appendChild(divTagContainer);
        // divTagContainer.appendChild(pTagsHover);

        let trendingGif = document.querySelector(`#trend-gif${i+1}`);
        //Asigna el src y alt a los gif de trending
        trendingGif.setAttribute('src',dataTrending.data[i].images.original.url);
        trendingGif.setAttribute('alt',dataTrending.data[i].title);
        //Diseña el título para que se pueda leer en la url de búsqueda
        let trendingTitle = dataTrending.data[i].title;
        let trendingTitleCleaned = trendingTitle.split(' GIF')[0];
        let trendingTitleLink = trendingTitleCleaned.replace(/\s/g, '_')== '' ? `${inputText.value}` : trendingTitleCleaned.replace(/\s/g, '_');

        let urlTag = `https://api.giphy.com/v1/tags/related/${trendingTitleLink}?api_key=${APIKey}`;
        let tagResp = await fetch(urlTag);
        let tagData = await tagResp.json();
        //condición para poner los tags en p, debe tener estatus 200 y el array de data debe tener contenido
        if(tagData.meta.status == 200 && tagData.data.length){
            
            //Llena los hashtags y quita el error cuando uno de los elementos del array no se encuentra
            const hashtag0 = tagData.data[0].name;
            const hashtag1 = tagData.data[1].name;
            const hashtag2 = tagData.data[2].name;

            // pTagsHover.innerHTML = `#${hashtag0} #${hashtag1} #${hashtag2}`;
            tags[i].innerHTML = `#${hashtag0} #${hashtag1} #${hashtag2}`;
        }else{
            //llena el gif sin tag con las palabras #giphy #gifs
            // pTagsHover.innerHTML = `#giphy #gifs`;
            tags[i].innerHTML = `#giphy #gifs`;
        }
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
async function searching(comeFromHistorial){
    //Desaparezco el menú de palabras sugeridas debajo de la barra de búsqueda
    menuInput.style.display= "none";

    let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=${inputText.value}&limit=25&rating=g&lang=es`;
    let responseSearch = await fetch(urlSearch);
    let searchData = await responseSearch.json();
    //Lleno la barra blanca que dice tendencias con el valor del input
    trendingTitle.innerHTML = `${inputText.value} :`;
    //Llamo a la función para crear divs debajo de la barra de búsqueda con el historial de búsquedas
    //el condicional es para no duplicar el botón al validar si la función de click se activo
    if(!comeFromHistorial){
        console.log('entro')
        historialDivBelow(inputText.value);
    }
    

    for(let i=0; i<searchData.data.length; i++){
        //selecciona cada img
        let trendingGif = document.querySelector(`#trend-gif${i+1}`);
        //atribuye src y alt img
        //!se demora en cargar la imagen
        trendingGif.setAttribute('src',searchData.data[i].images.original.url);
        trendingGif.setAttribute('alt',searchData.data[i].title); //para accesibilidad
        //selección y limpieza de texto para buscar tags
        let gifTitle = searchData.data[i].title;
        
        let gifTitleCleaned = gifTitle.split('GIF')[0];
        let textForSearchTags = gifTitleCleaned.replace(/\s/g, '_') == '' ? `${inputText.value}` : gifTitleCleaned.replace(/\s/g, '_');
        //selección de p donde se llenarán los tags    
        let urlRelatedTag = `https://api.giphy.com/v1/tags/related/${textForSearchTags}?api_key=${APIKey}`;
        let responseRelatedTag = await fetch(urlRelatedTag);
        let dataRelatedTag = await responseRelatedTag.json();
        //condición para poner los tags en p, cuando no es 200 el estado lo llena con el valor del input
        if(dataRelatedTag.meta.status == 200 && dataRelatedTag.data.length){
            //es posible que llegue el array, pero algunos keys no llegan, entonces se reemplaza por el siguiente
            const hashtag0 = dataRelatedTag.data[0].name;
            const hashtag1 = dataRelatedTag.data[1].name;
            const hashtag2 = dataRelatedTag.data[2].name;

            tags[i].innerHTML = `#${hashtag0} #${hashtag1} #${hashtag2}`;
        }else{
            tags[i].innerHTML = `#${inputText.value}`;
        }
    }
}
//Moseover sobre trend-card - Aparece y desaparece los tags y el cuadro opaco
function showTags(){
    for(let i=0; i<trendingGifCard.length; i++){
        //agrego eventos del mouse cuando está encima y cuando se aleja a las cards de los gifs en trending
        trendingGifCard[i].addEventListener('mouseover', showTrendHover);
        trendingGifCard[i].addEventListener('mouseleave', hideTrendHover);
        //dos funciones: muestra o desaparece el div que opaca un poco el gif y muestra los tags
        function showTrendHover(){
            trendHover[i].style.display = "flex";
        }
        function hideTrendHover(){
            trendHover[i].style.display = "none";
        }
    }
}
showTags();