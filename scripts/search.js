//Resultado al entrar texto en el input #search
let inputText = document.querySelector('#search');
inputText.addEventListener('keyup', showHideSearchMenu);

async function showHideSearchMenu(){
    let menuInput = document.querySelector('#menu-input');

    //Condición if para mostrar el menú de sugerencias
    if(inputText.value == ''){
        menuInput.style.display = "none";
        trendCards();
        
        let searchButton = document.getElementById('search-button');
        let imgLupa = document.getElementById('lupa');
        //Condición de estilo cuando hay cambio de tema
        if(nightTheme){
            imgLupa.setAttribute('src','./assets/lupa.svg');
            imgLupa.style.opacity = 0.2;
            searchButton.classList.replace('night-search-button-active','night-search-button-inactive');
        }else{
            imgLupa.setAttribute('src','./assets/lupa_inactive.svg');
            imgLupa.style.opacity = 1;
            searchButton.classList.replace('day-search-button-active','day-search-button-inactive');
        }
    }else{
        menuInput.style.display = "flex";
        
        //Llamado de la API para obtener terminos relacionados (sugerencias).
        let url = `https://api.giphy.com/v1/tags/related/${inputText.value}?api_key=${APIKey}&limit=3`;
        let resp = await fetch(url);
        let suggestedSearchData = await resp.json();
        
        //Llena los 3 cuadros de sugerencias
        for(let i = 0; i<3; i++){
            let suggestElement = document.querySelector(`#suggest-term${i+1}`);
            suggestElement.innerHTML = `${suggestedSearchData.data[i].name}`;
        }
        
        let searchButton = document.getElementById('search-button');
        let imgLupa = document.getElementById('lupa');
        //Condición de estilo cuando hay cambio de tema
        if(nightTheme){
            imgLupa.setAttribute('src','./assets/lupa_light.svg');
            imgLupa.style.opacity = 1;
            searchButton.classList.replace('night-search-button-inactive','night-search-button-active');
        }else{
            imgLupa.setAttribute('src','./assets/lupa.svg');
            imgLupa.style.opacity = 1;
            searchButton.classList.replace('day-search-button-inactive','day-search-button-active');
        } 
    }
}


//Guardar información en localStorage para crear historial
// function historial(){
    //Atrapar valor de búsqueda después de click en búsqueda
    // let searchButton = document.getElementById('search-button');

    // if(inputText.value !== ''){
    //     let section = document.createElement('section');
    //     let div = document.createElement('div');
    //     div.classList.add('button');

    //     div.innerHTML = inputText.value;

    // }else{

    // }
    //crear un section
    //crear un div y en css crear una clase con el estilo acorde y adicionarselo
    //
// }