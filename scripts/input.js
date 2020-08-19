//Diseño al ingresar texto en el input
inputText.addEventListener('input', showSearchMenu);
//Con respecto a la opacidad de las lupas, se realiza porque una de ellas (lupa.svg)
//Se hace porque la lupa inactiva de día no existe el svg, por tanto se hace uso de la de día con opacity 0.2
//las otras lupas tienen opacity 1 para regresar a la normalidad
async function showSearchMenu(event){
    //Condición para mostrar cuando el menú de sugerencias aparecerá
    //cuando está vacío el input
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
        };
    }else{ //cuando está lleno el input
        searchButtonActive = true;
        menuInput.style.display = "flex";
        //Condición de estilo cuando hay cambio de tema
        if(nightTheme){
            imgLupa.setAttribute('src','./assets/lupa_light.svg');
            imgLupa.style.opacity = 1;
            searchButton.classList.replace('night-search-button-inactive','night-search-button-active');
        }else{
            imgLupa.setAttribute('src','./assets/lupa.svg');
            imgLupa.style.opacity = 1;
            searchButton.classList.replace('day-search-button-inactive','day-search-button-active');
        };
        //Llamado de la API para obtener terminos relacionados (sugerencias).
        let url = `https://api.giphy.com/v1/tags/related/${inputText.value}?api_key=${APIKey}&limit=3`;
        let resp = await fetch(url);
        let suggestedSearchData = await resp.json();
        //Llena los 3 cuadros de sugerencias
        for(let i = 0; i<3; i++){
            let suggestTerm = document.getElementById(`suggest-term-${i+1}`);
            suggestTerm.innerHTML = `${suggestedSearchData.data[i].name}`; 
        };
    };
};
//función para hacer click en las sugerencias y buscarlas
//convierto el HTMLCollection en un array y uso map para iterarlo
Array.from(document.getElementsByClassName('suggest-term')).map((el)=>{
    el.addEventListener('click', function(){
        inputText.value = el.innerHTML;
        window.scroll(0, topLocationTrending);
        searching();
    });
});
//permite presionar la tecla escape y ocultar el menú de sugerencias
inputText.addEventListener('keydown', ()=>{
    menuInput.style.display = "none";
});