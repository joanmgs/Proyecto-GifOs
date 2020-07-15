//Resultado al entrar texto en el input #search
inputText.addEventListener('input', showSearchMenu);

//*Con respecto a la opacidad de las lupas, se realiza porque una de ellas (lupa.svg)
//*Se hace porque la lupa inactiva de día no existe el svg, por tanto se hace uso de la de día con opacity 0.2
//*las otras lupas tienen opacity 1 para regresar a la normalidad

async function showSearchMenu(e){
    console.log('valor del input', e.target.value);
    //Condición para mostrar cuando el menú de sugerencias aparecerá

    if(!e.target.value){
        console.log('entra vacío');

        searchButtonActive = false;
        menuInput.style.display = "none";
        //Condición de estilo cuando hay cambio de tema
        if(nightTheme){
            console.log('vacío de noche');
            imgLupa.setAttribute('src','./assets/Combined_Shape.svg');
            imgLupa.style.opacity = 1;
            searchButton.classList.replace('night-search-button-active','night-search-button-inactive');
        }else{
            console.log('vacío de día');
            imgLupa.setAttribute('src','./assets/lupa.svg');
            imgLupa.style.opacity = 0.2;
            searchButton.classList.replace('day-search-button-active','day-search-button-inactive');
        }

    } else {
        console.log('entra lleno');

        searchButtonActive = true;
        menuInput.style.display = "flex";

        if(nightTheme){
            console.log('lleno de noche');
            imgLupa.setAttribute('src','./assets/lupa_light.svg');
            imgLupa.style.opacity = 1;
            searchButton.classList.replace('night-search-button-inactive','night-search-button-active');
        }else{
            console.log('lleno de día');
            imgLupa.setAttribute('src','./assets/lupa.svg');
            imgLupa.style.opacity = 1;
            searchButton.classList.replace('day-search-button-inactive','day-search-button-active');
        }

        //Llamado de la API para obtener terminos relacionados (sugerencias).
        let url = `https://api.giphy.com/v1/tags/related/${inputText.value}?api_key=${APIKey}&limit=3`;
        let resp = await fetch(url);
        let suggestedSearchData = await resp.json();

        //Llena los 3 cuadros de sugerencias
        for(let i = 0; i<3; i++){
            let suggestElement = document.querySelector(`#suggest-term${i+1}`);
            suggestElement.innerHTML = `${suggestedSearchData.data[i].name}`;
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