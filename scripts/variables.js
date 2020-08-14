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

let topLocationTrending = 710; //ubicación Y de #trendings

let nightTheme = false; //switch para cambio de tema

let searchButtonActive = false;

let storageHistorial = []; //array donde se guarda el historial

// CreateElements

// let figureInTrend = document.getElementById('figure-in-trend');