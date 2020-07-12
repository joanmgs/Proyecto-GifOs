//Asignación de gifs sugeridos a #trendGif$
async function suggestCards(){
    for(let i=0; i<4; i++){
        let url = `https://api.giphy.com/v1/gifs/random?api_key=${APIKey}&rating=G`;
        let resp = await fetch(url);
        let suggestData = await resp.json();

        let nameSuggestGif = document.querySelector(`#trendGif${i+1}`); 
        nameSuggestGif.innerHTML = `#${suggestData.data.username}`;

        let imageSuggestGif = document.querySelector(`#suggest${i+1}`);
        imageSuggestGif.setAttribute('src',suggestData.data.images.original.url);

        imageSuggestGif.setAttribute('alt',suggestData.data.title); //para accesibilidad
    }
}
suggestCards();

//Asignación de gifs trends a #trendGif$
async function trendCards(){
    trendingTitle.innerHTML = 'Tendencias:';
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKey}&limit=25&rating=G`;
    let resp = await fetch(url);
    let suggestData = await resp.json();

    for(let i=0; i<suggestData.data.length; i++){
        let imageSuggestGif = document.querySelector(`#trend-gif${i+1}`);

        imageSuggestGif.setAttribute('src',suggestData.data[i].images.original.url);
        imageSuggestGif.setAttribute('alt',suggestData.data[i].title); //para accesibilidad

        let tagTerm = suggestData.data[i].title;
        let tagTermCleaned = tagTerm.split(' GIF')[0];
        let tagTermLink = tagTermCleaned.replace(/\s/g, '_');

        let urlTag = `https://api.giphy.com/v1/tags/related/${tagTermLink}?api_key=${APIKey}`;
        let tagResp = await fetch(urlTag);
        let tagData = await tagResp.json();

        let tags = document.getElementsByClassName('tags-hover');

        const hashtag0 = tagData.data[0] ? tagData.data[0].name : tagData.data[1].name;
        const hashtag1 = tagData.data[1] ? tagData.data[1].name : tagData.data[2].name;
        const hashtag2 = tagData.data[2] ? tagData.data[2].name : tagData.data[3].name;

        tags[i].innerHTML = `#${hashtag0} #${hashtag1} #${hashtag2}`;
    }    
};
trendCards();

//* <------------------------------------SECCIÓN CHECK------------------------------------>
//Funcionalidad de la barra de búsqueda al hacer click en el botón Buscar
searchButton.addEventListener('click', () => {
    if(inputText.value !== ''){
        window.scroll(0, topLocationTrending);
        searching();
    }
});
//Funcionalidad de la barra de búsqueda al presionar enter/return
inputText.addEventListener('keypress', (event) => {
    if(event.keyCode == 13 && inputText.value !== '') {
        window.scroll(0, topLocationTrending);
        searching();
    }
});

async function searching(){
    trendingTitle.innerHTML = `${inputText.value}:`;
    let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=${inputText.value}&limit=25&rating=g&lang=es`;
    let responseSearch = await fetch(urlSearch);
    let searchData = await responseSearch.json();
    
    for(let i=0; i<searchData.data.length; i++){
        //selecciona cada img
        let gifCard = document.querySelector(`#trend-gif${i+1}`);
        //atribuye src y alt img
        //!se demora en cargar la imagen
        gifCard.setAttribute('src',searchData.data[i].images.original.url);
        gifCard.setAttribute('alt',searchData.data[i].title); //para accesibilidad
        //selección y limpieza de texto para buscar tags
        let gifTitle = searchData.data[i].title;
        let gifTitleCleaned = gifTitle.split('GIF')[0];
        let textForSearchTags = gifTitleCleaned.replace(/\s/g, '_') == '' ? `${inputText.value}` : gifTitleCleaned.replace(/\s/g, '_');
        //selección de p donde se llenarán los tags
        let tags = document.getElementsByClassName('tags-hover');

        let urlRelatedTag = `https://api.giphy.com/v1/tags/related/${textForSearchTags}?api_key=${APIKey}`;
        let responseRelatedTag = await fetch(urlRelatedTag);
        let dataRelatedTag = await responseRelatedTag.json();
        //condición para poner los tags en p, cuando no es 200 el estado lo llena con #Without tags
        if(dataRelatedTag.meta.status == 200){
            //es posible que llegue el array, pero algunos keys no llegan, entonces se reemplaza por el siguiente
            const hashtag0 = dataRelatedTag.data[0] ? dataRelatedTag.data[0].name : dataRelatedTag.data[1].name;
            const hashtag1 = dataRelatedTag.data[1] ? dataRelatedTag.data[1].name : dataRelatedTag.data[2].name;
            const hashtag2 = dataRelatedTag.data[2] ? dataRelatedTag.data[2].name : dataRelatedTag.data[3].name;

            tags[i].innerHTML = `#${hashtag0} #${hashtag1} #${hashtag2}`;
        }else{
            tags[i].innerHTML = `#Without tags`;
        }
    }
}
//* <------------------------------------HASTA AQUÍ------------------------------------>

//Moseover sobre trend-card - Aparece y desaparece los tags y el cuadro opaco
let trendGif = document.getElementsByClassName('trend-card');
let trendHover = document.getElementsByClassName('trend-hover')
for(let i=0; i<trendGif.length; i++){

    trendGif[i].addEventListener('mouseover', showTrendHover);
    trendGif[i].addEventListener('mouseleave', hideTrendHover);
    
    async function showTrendHover(){
        trendHover[i].style.display = "flex";
    }
    async function hideTrendHover(){
        trendHover[i].style.display = "none";
    }
}