let APIKey = 'oyAB67SNUuAU6Vd5X7FnZ5YHpGfbGZiD';

let suggestionSection = document.getElementById('suggestions');

let inputText = document.querySelector('#search');

let menuInput = document.querySelector('#menu-input');

let searchButton = document.getElementById('search-button');

let tags = document.getElementsByClassName('tags-hover');

let imgLupa = document.getElementById('lupa');

let trendingTitle = document.getElementById('trending-title');

let closeButton = document.getElementsByClassName('close');

let verMasButton = document.getElementsByClassName('see-more');

let trendingGifCard = document.getElementsByClassName('trend-card');

let trendHover = document.getElementsByClassName('trend-hover');

let containerTrending = document.getElementById('container-trending');

let topLocationTrending = 710; //ubicación eje Y de #trendings

let nightTheme = false; //switch para indicar la activación del night Theme; se usa para aparecer u ocultar elementos al ingresar elementos en el searcher

let searchButtonActive = false;

let storageHistorial = []; //array donde se guarda el historial

let arrayGallery = []; //array donde se guardan los id de guifos para subirlos al localstorage