//Botón de buscar
$('.search-button').click(function(){
    console.log('click');
    $('.menu-input').toggle();
});

//Resultado al poner texto en input
$('.search').keydown(function(){
    if(event.key === 'Enter' && $('.search').val() !== ''){
        console.log('ingreso: ', $('.search').val());
        $('.menu-input').toggle(true);
    } 
});
