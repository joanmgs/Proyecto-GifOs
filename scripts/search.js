//Resultado al entrar texto en el input #search
inputText.addEventListener('input', showSearchMenu);

//*Con respecto a la opacidad de las lupas, se realiza porque una de ellas (lupa.svg)
//*Se hace porque la lupa inactiva de día no existe el svg, por tanto se hace uso de la de día con opacity 0.2
//*las otras lupas tienen opacity 1 para regresar a la normalidad

async function showSearchMenu(event){
    console.log('en showsearchmenu')
    //Condición para mostrar cuando el menú de sugerencias aparecerá
    if(!event.target.value){
        searchButtonActive = false;
        menuInput.style.display = "none";
        //Condición de estilo cuando hay cambio de tema
        if(nightTheme){
            imgLupa.setAttribute('src','./assets/Combined_Shape.svg');
            imgLupa.style.opacity = 1;
            searchButton.classList.replace('night-search-button-active','night-search-button-inactive');
        }else{
            imgLupa.setAttribute('src','./assets/lupa.svg');
            imgLupa.style.opacity = 0.2;
            searchButton.classList.replace('day-search-button-active','day-search-button-inactive');
        }
    } else {
        searchButtonActive = true;
        menuInput.style.display = "flex";

        if(nightTheme){
            imgLupa.setAttribute('src','./assets/lupa_light.svg');
            imgLupa.style.opacity = 1;
            searchButton.classList.replace('night-search-button-inactive','night-search-button-active');
        }else{
            imgLupa.setAttribute('src','./assets/lupa.svg');
            imgLupa.style.opacity = 1;
            searchButton.classList.replace('day-search-button-inactive','day-search-button-active');
        }
        //Llamado de la API para obtener terminos relacionados (sugerencias).
        let url = `https://api.giphy.com/v1/tags/related/${inputText.value}?api_key=${APIKey}&limit=3`;
        let resp = await fetch(url);
        let suggestedSearchData = await resp.json();
        //Llena los 3 cuadros de sugerencias
        console.log('en valor lleno')
        for(let i = 0; i<3; i++){
            let suggestTerm = document.getElementsByClassName('suggest-term');

            suggestTerm[i].innerHTML = `${suggestedSearchData.data[i].name}`;
            // console.log('click')

            suggestTerm[i].addEventListener('click', function(){
                
                inputText.value = suggestedSearchData.data[i].name;
                
                window.scroll(0, topLocationTrending);

                searching(true);
            });
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