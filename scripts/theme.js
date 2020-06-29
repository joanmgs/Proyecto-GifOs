//Botón que abre el menú de Temas
$('.button-theme').click(function(){
    $('.menu-themes').toggle();
});

//Cambios de temas
//Sailor Day
$('.sailor-day-button').click(function(){
    $('.night-background').addClass('day-background').removeClass('night-background');
    $('.night-bar').addClass('day-bar').removeClass('night-bar');
    $('.logo').attr('src','./assets/gifOF_logo.png');
    $('.night-button').addClass('day-button').removeClass('night-button');
    $('.night-font').addClass('day-font').removeClass('night-font');
    $('.night-see').addClass('day-see').removeClass('night-see');
});
//Sailor Night
$('.sailor-night-button').click(function(){
    $('.day-background').addClass('night-background').removeClass('day-background');
    $('.day-bar').addClass('night-bar').removeClass('day-bar');
    $('.logo').attr('src','./assets/gifOF_logo_dark.png');
    $('.day-button').addClass('night-button').removeClass('day-button');
    $('.day-font').addClass('night-font').removeClass('day-font');
    $('.day-see').addClass('night-see').removeClass('day-see');
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