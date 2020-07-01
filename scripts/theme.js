//Botón que abre el menú de Temas
$('.button-theme').click(function(){
    $('.menu-themes').toggle();
});

let nightTheme = false;
//Cambios de temas
//Sailor Day
$('.sailor-day-button').click(function(){
    nightTheme = false;
    $('.night-background').addClass('day-background').removeClass('night-background');
    $('.night-bar').addClass('day-bar').removeClass('night-bar');
    $('.logo').attr('src','./assets/gifOF_logo.png');
    $('.night-button').addClass('day-button').removeClass('night-button');
    $('.night-font').addClass('day-font').removeClass('night-font');
    $('.night-see').addClass('day-see').removeClass('night-see');
    $('.night-mis-gifos').addClass('day-mis-gifos').removeClass('night-mis-gifos');
    $('.night-search-button-inactive').addClass('day-search-button-inactive').removeClass('night-search-button-inactive');
    
});
//Sailor Night
$('.sailor-night-button').click(function(){
    nightTheme = true;
    $('.day-background').addClass('night-background').removeClass('day-background');
    $('.day-bar').addClass('night-bar').removeClass('day-bar');
    $('.logo').attr('src','./assets/gifOF_logo_dark.png');
    $('.day-button').addClass('night-button').removeClass('day-button');
    $('.day-font').addClass('night-font').removeClass('day-font');
    $('.day-see').addClass('night-see').removeClass('day-see');
    $('.day-mis-gifos').addClass('night-mis-gifos').removeClass('day-mis-gifos');
    $('.day-search-button-inactive').addClass('night-search-button-inactive').removeClass('day-search-button-inactive');
    $('#lupa').attr('src','./assets/lupa.svg').css('opacity',0.2);
});

//Sombra a botones con hover
// let shadowButton = document.createElement('div');
// function createShadow(){
    
//     let shadowButton = $('<div></div>');
    
//     shadowButton.addClass('shadow');
    
//     $('.shadow-hover').before(shadowButton);

//     $('.shadow-container-1').hover(function(){
//         shadowButton.addClass('shadow-size-140');
//         shadowButton.toggle();
//     });

    // $('.shadow-container-2').hover(function(){
    //     shadowButton.addClass('shadow-size-127');
    //     shadowButton.toggle();
    // });

// }
// createShadow();