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

//Funcionalidad de la barra de búsqueda al hacer click en el botón
let searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', searching);

async function searching(){
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=${inputText.value}&limit=25&rating=g&lang=es`;
    let resp = await fetch(url);
    let searchEndpointData = await resp.json();
    
    for(let i=0; i<searchEndpointData.data.length; i++){
        let gifCard = document.querySelector(`#trend-gif${i+1}`);
        
        gifCard.setAttribute('src',searchEndpointData.data[i].images.original.url);
        gifCard.setAttribute('alt',searchEndpointData.data[i].title); //para accesibilidad
        
        let tagTerm = searchEndpointData.data[i].title;

        let tags = document.getElementsByClassName('tags-hover');
        
        if(tagTerm){   
            let tagTermCleaned = tagTerm.split('GIF')[0];
            let tagTermLink = tagTermCleaned.replace(/\s/g, '_');
            
            tagTermLink == '' ? tagTermLink = `${inputText.value}` : tagTermLink;
            
            let urlTag = `https://api.giphy.com/v1/tags/related/${tagTermLink}?api_key=${APIKey}`;
            let tagResp = await fetch(urlTag);
            let tagData = await tagResp.json();
            
            if(tagData.meta.status == 200){
                const hashtag0 = tagData.data[0] ? tagData.data[0].name : tagData.data[1].name;
                const hashtag1 = tagData.data[1] ? tagData.data[1].name : tagData.data[2].name;
                const hashtag2 = tagData.data[2] ? tagData.data[2].name : tagData.data[3].name;
    
                tags[i].innerHTML = `#${hashtag0} #${hashtag1} #${hashtag2}`;
            }else{
                tags[i].innerHTML = `#Nothing Here 1`;
            }
            
        }else{
            let tagTermLink = inputText.value;
            let urlTag = `https://api.giphy.com/v1/tags/related/${tagTermLink}?api_key=${APIKey}`;
            let tagResp = await fetch(urlTag);
            let tagData = await tagResp.json();

            if(tagData.meta.status == 200){
                const hashtag0 = tagData.data[0] ? tagData.data[0].name : tagData.data[1].name;
                const hashtag1 = tagData.data[1] ? tagData.data[1].name : tagData.data[2].name;
                const hashtag2 = tagData.data[2] ? tagData.data[2].name : tagData.data[3].name;
    
                tags[i].innerHTML = `#${hashtag0} #${hashtag1} #${hashtag2}`;
            }else{
                tags[i].innerHTML = `#Nothing Here 2`;
            }
        }   
    }
}

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