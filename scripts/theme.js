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
});
//Sailor Night
$('.sailor-night-button').click(function(){
    $('.day-background').addClass('night-background').removeClass('day-background');
    $('.day-bar').addClass('night-bar').removeClass('day-bar');
    $('.logo').attr('src','./assets/gifOF_logo_dark.png');
    $('.day-button').addClass('night-button').removeClass('day-button');
});