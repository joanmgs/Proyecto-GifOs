//Variables para el botón que abre el menú de Temas
const buttonTheme = document.getElementById('button-theme');
let menuThemes = document.getElementById('menu-themes');
let openSwitchMenu = false;
//abre y cierra el menú de temas
buttonTheme.addEventListener('click', ()=>{
    if(openSwitchMenu === true){
        menuThemes.style.display = "none";
        openSwitchMenu = false;
    }else{
        menuThemes.style.display = "flex";
        openSwitchMenu = true;
    };
});

//botones sailor
const sailorDayButon = document.getElementById('sailor-day-button');
const sailorNightButon = document.getElementById('sailor-night-button');

//day
//capturo day primero pues no existe night aún
//night se captura dentro del evento de night
let dayBackground = document.getElementsByClassName('day-background')[0];
let dayBar = document.getElementsByClassName('day-bar')[0];
let dayButton = document.getElementsByClassName('day-button')[0];
let dayFont = document.getElementsByClassName('day-font')[0];
let daySee = document.getElementsByClassName('day-see')[0];
let dayMisGifos = document.getElementsByClassName('day-mis-gifos')[0];
//contiene el div y p de las cards en trending, se llenan en las funciones de cards.js
let switchThemeTagContainer = [];
//logo
let logoHome = document.getElementById('logo-home');

//Evento click Sailor Day
sailorDayButon.addEventListener('click', ()=>{
    nightTheme = false;
    nightBackground.classList.replace('night-background','day-background');
    nightBar.classList.replace('night-bar','day-bar');
    logoHome.setAttribute('src','./assets/gifOF_logo.png');
    nightButton.classList.replace('night-button','day-button');
    nightFont.classList.replace('night-font','day-font');
    nightSee.classList.replace('night-see','day-see');
    nightMisGifos.classList.replace('night-mis-gifos','day-mis-gifos');

    if(searchButtonActive){
        searchButton.classList.replace('night-search-button-active','day-search-button-active');
        imgLupa.setAttribute('src','./assets/lupa.svg');
        imgLupa.style.opacity = "1";
    }else{
        searchButton.classList.replace('night-search-button-inactive','day-search-button-inactive');
        imgLupa.setAttribute('src','./assets/lupa.svg');
        imgLupa.style.opacity = "0.2";
    };
    
    for(let item of switchThemeTagContainer){
        item.classList.replace('night-tag-container','day-tag-container');
    };
});
//Evento click Sailor Night
sailorNightButon.addEventListener('click', ()=>{
    nightTheme = true;
    dayBackground.classList.replace('day-background','night-background');
    dayBar.classList.replace('day-bar','night-bar');
    logoHome.setAttribute('src','./assets/gifOF_logo_dark.png');
    dayButton.classList.replace('day-button','night-button');
    dayFont.classList.replace('day-font','night-font');
    daySee.classList.replace('day-see','night-see');
    dayMisGifos.classList.replace('day-mis-gifos','night-mis-gifos');

    if(searchButtonActive){
        searchButton.classList.replace('day-search-button-active','night-search-button-active');
        imgLupa.setAttribute('src','./assets/lupa_light.svg');
        imgLupa.style.opacity = "1";
    }else{
        searchButton.classList.replace('day-search-button-inactive','night-search-button-inactive');
        imgLupa.setAttribute('src','./assets/Combined_Shape.svg');
        imgLupa.style.opacity = "1"
    };

    for(let item of switchThemeTagContainer){
        item.classList.replace('day-tag-container','night-tag-container');
    };

    //guarda lo nuevos valores de night
    nightBackground = document.getElementsByClassName('night-background')[0];
    nightBar = document.getElementsByClassName('night-bar')[0];
    nightButton = document.getElementsByClassName('night-button')[0];
    nightFont = document.getElementsByClassName('night-font')[0];
    nightSee = document.getElementsByClassName('night-see')[0];
    nightMisGifos = document.getElementsByClassName('night-mis-gifos')[0];
    nightTagContainer = document.getElementsByClassName('night-tag-container');
});