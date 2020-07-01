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

    for(let i=0; i<26; i++){
        let imageSuggestGif = document.querySelector(`#trend-gif${i+1}`);
        console.log(`#trend-gif${i+1}`);
        console.log(suggestData.data[i].images.original.url);

        imageSuggestGif.setAttribute('src',suggestData.data[i].images.original.url);
        imageSuggestGif.setAttribute('alt',suggestData.data[i].title); //para accesibilidad

        let tagTerm = suggestData.data[i].title;
        let tagTermLink = tagTerm.replace(/\s/g, '_');

        let url = `https://api.giphy.com/v1/tags/related/${tagTermLink}?api_key=${APIKey}`;
        let tagResp = await fetch(url);
        let tagData = await tagResp.json();
        console.log(tagData);
        console.log(tagData.data.name);

        let tags = document.getElementsByClassName('tags-hover');

        tags[i].innerHTML = `#${tagData.data[0].name} #${tagData.data[1].name} #${tagData.data[2].name}`
    }    
};
trendCards();

//Moseover sobre trend-card
let trendGif = document.getElementsByClassName('trend-card');
let trendHover = document.getElementsByClassName('trend-hover')
//Aparece y desaparece los tags y el cuadro opaco
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