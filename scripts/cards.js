//Asignación de gifs sugeridos a #trendGif$
async function suggestCards(){
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKey}&limit=4&rating=G`;
    let resp = await fetch(url);
    let suggestData = await resp.json();

    for(let i=0; i<4; i++){
        let nameSuggestGif = document.querySelector(`#trendGif${i+1}`); 
        nameSuggestGif.innerHTML = `#${suggestData.data[i].username}`;

        let imageSuggestGif = document.querySelector(`#suggest${i+1}`);
        imageSuggestGif.setAttribute('src',suggestData.data[i].images.original.url);

        imageSuggestGif.setAttribute('alt',suggestData.data[i].title); //para accesibilidad
    }    
};
suggestCards();