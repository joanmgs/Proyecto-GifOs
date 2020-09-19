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
//elementos del DOM que cambiará estilo
let dayBackground = document.getElementById('day-background');

let dayBar = [];
for(let i= 0; i<document.getElementsByClassName('day-bar').length; i++){
    dayBar.push(document.getElementById(`day-bar-${i+1}`));
};

let createGif = document.getElementById('create-gif');
let chooseTheme = document.getElementById('choose-theme');
let dropdownButton = document.getElementById('dropdown-button');

let dayFont = [];
for(let i = 0; i<2; i++){
    dayFont.push(document.getElementById(`day-font-${i+1}`));
};

let daySee = [];
for(let i = 0; i<document.getElementsByClassName('day-see').length;i++){
    daySee.push(document.getElementById(`day-see-${i+1}`));
};

let dayMisGifos = document.getElementById('day-mis-gifos');

let dayButtonHistorial =[];
let buttonHistorial = document.getElementsByClassName('button-historial');
// setTimeout(() => {
    for(let i = 0; i<buttonHistorial.length;i++){
        buttonHistorial[i].id =`day-see-historial-${i+1}`;
        dayButtonHistorial.push(document.getElementById(`day-see-historial-${i+1}`));
    };
// }, 1000);


//contiene el div y p de las cards en trending, se llenan en las funciones de cards.js
let switchThemeTagContainer = [];
//logo
let logoHome = document.getElementById('logo-home');
//Evento click Sailor Day
sailorDayButon.addEventListener('click', ()=>{
    nightTheme = false;
    dayBackground.classList.replace('night-background','day-background');

    for(let item of dayBar){
        item.classList.replace('night-bar','day-bar');
    };

    logoHome.setAttribute('src','./assets/gifOF_logo.png');
    createGif.classList.replace('night-button','day-button');
    createGif.classList.replace('night-font','day-font');
    chooseTheme.classList.replace('night-button','day-button');
    chooseTheme.classList.replace('night-font','day-font');
    dropdownButton.classList.replace('night-button','day-button');
    dropdownButton.classList.replace('night-font','day-font');

    for(let item of dayFont){
        item.classList.replace('night-font','day-font');
    };
    
    for(let item of daySee){
        item.classList.replace('night-see','day-see');
    }

    dayMisGifos.classList.replace('night-mis-gifos','day-mis-gifos');

    if(searchButtonActive){
        searchButton.classList.replace('night-search-button-active','day-search-button-active');
        imgLupa.setAttribute('src','./assets/lupa.svg');
        imgLupa.style.opacity = "1";
    }else{
        searchButton.classList.replace('night-search-button-inactive','day-search-button-inactive');
        imgLupa.setAttribute('src','./assets/lupa.svg');
        imgLupa.style.opacity = "0.2";
    };

    for(let item of dayButtonHistorial){
        item.classList.add('day-see');
        item.classList.remove('night-see');
    }
    
    for(let item of switchThemeTagContainer){
        item.classList.replace('night-tag-container','day-tag-container');
    };
});
//Evento click Sailor Night
sailorNightButon.addEventListener('click', ()=>{
    nightTheme = true;
    dayBackground.classList.replace('day-background','night-background');
    
    for(let item of dayBar){
        item.classList.replace('day-bar','night-bar');
    };

    logoHome.setAttribute('src','./assets/gifOF_logo_dark.png');
    createGif.classList.replace('day-button','night-button');
    createGif.classList.replace('day-font','night-font');
    chooseTheme.classList.replace('day-button','night-button');
    chooseTheme.classList.replace('day-font','night-font');
    dropdownButton.classList.replace('day-button','night-button');
    dropdownButton.classList.replace('day-font','night-font');

    for(let item of dayFont){
        item.classList.replace('day-font','night-font');
    };
    
    for(let item of daySee){
        item.classList.replace('day-see','night-see');
    };

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

    for(let item of dayButtonHistorial){
        item.classList.add('night-see');
        item.classList.remove('day-see');
    }

    for(let item of switchThemeTagContainer){
        item.classList.replace('day-tag-container','night-tag-container');
    };
});