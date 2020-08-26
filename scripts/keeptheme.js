//Mantiene el tema en los otros html
window.addEventListener('load', ()=>{

    nightTheme = JSON.parse(localStorage.getItem('theme'));

    let dayBackground = document.getElementById('day-background');
    let dayBar = [];
    for(let i= 0; i<document.getElementsByClassName('day-bar').length; i++){
        dayBar.push(document.getElementById(`day-bar-${i+1}`));
    };

    let logoHome = document.getElementById('logo-home');
    let cameraButton = document.getElementById('camera-button');
    let captureButton = document.getElementById('capture-button');
    let camera = document.getElementById('camera');

    if(nightTheme){
        nightTheme = true;

        dayBackground.classList.replace('day-background','night-background');
    
        for(let item of dayBar){
            item.classList.replace('day-bar','night-bar');
        };

        logoHome.setAttribute('src','./assets/gifOF_logo_dark.png');

        cameraButton.classList.replace('day-button','night-button');
        cameraButton.classList.replace('day-font','night-font');
        captureButton.classList.replace('day-button','night-button');
        captureButton.classList.replace('day-font','night-font');

        camera.setAttribute('src','./assets/camera_light.svg');
    }else{
        nightTheme = false;

        dayBackground.classList.replace('night-background','day-background');
    
        for(let item of dayBar){
            item.classList.replace('night-bar','day-bar');
        };

        logoHome.setAttribute('src','./assets/gifOF_logo.png');

        cameraButton.classList.replace('night-button','day-button');
        cameraButton.classList.replace('night-font','day-font');
        captureButton.classList.replace('night-button','day-button');
        captureButton.classList.replace('night-font','day-font');

        camera.setAttribute('src','./assets/camera.svg');
    };
});