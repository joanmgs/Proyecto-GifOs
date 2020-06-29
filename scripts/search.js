//Resultado al entrar texto en el input #search
let inputText = document.querySelector('#search');
inputText.addEventListener('keyup', showHideSearchMenu);

async function showHideSearchMenu(){
    let menuInput = document.querySelector('#menu-input');

    if(inputText.value == ''){
        menuInput.style.display = "none";
    }else{
        menuInput.style.display = "block";
        
        let url = `https://api.giphy.com/v1/tags/related/${inputText.value}?api_key=${APIKey}&limit=3`;
        let resp = await fetch(url);
        let suggestedSearchData = await resp.json();
        
        for(let i = 0; i<3; i++){
            let suggestElement = document.querySelector(`#suggest-term${i+1}`);
            suggestElement.innerHTML = `${suggestedSearchData.data[i].name}`;
        }
    }
}