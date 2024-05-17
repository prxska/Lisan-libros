
var navbar = $('#dynamicBar');
var navbarInitialOffsetTop = navbar.offset().top;
var navbarHeight = navbar.outerHeight();
var lastScrollTop = 0;
var isFixed = false;

$(window).scroll(function() {
    var scrollTop = $(this).scrollTop();

    // Si se desplaza hacia abajo y ha pasado la posición inicial del navbar
    if (scrollTop > lastScrollTop && scrollTop > navbarInitialOffsetTop && !isFixed) {
        navbar.addClass('fixed-top');
        $('body').css('padding-top', navbarHeight);
        isFixed = true;
    }
    // Si se desplaza hacia arriba y está dentro del área inicial del navbar
    else if (scrollTop < lastScrollTop && scrollTop <= navbarInitialOffsetTop && isFixed) {
        navbar.removeClass('fixed-top');
        $('body').css('padding-top', 0);
        isFixed = false;
    }

    lastScrollTop = scrollTop;
});





$(document).ready(function(){
    $('#searchForm').submit(function(event) {
        event.preventDefault(); 
        
        var searchTerm = removeAccents($('#searchInput').val().toLowerCase()).split(' '); // Convertir el término de búsqueda a minúsculas, eliminar acentos y dividir en palabras
        var sectionID = ''; 

        $('.card').each(function() {
            var cardText = removeAccents($(this).text().toLowerCase()); // Convertir el texto de la tarjeta a minúsculas y eliminar acentos
            var found = searchTerm.every(term => cardText.includes(term)); // Verificar si todas las palabras del término de búsqueda están en el texto de la tarjeta
            if (found) {
                sectionID = $(this).closest('div[id]').attr('id'); // Obtener el ID de la sección que contiene la tarjeta
                return false; // Salir del bucle
            }
        });

        if (sectionID !== '') {
            // Reubicación con coincidencias
            window.location.href = '#' + sectionID;
        } else {
            alert('No se encontraron resultados para la búsqueda.');
        }
    });
});

// Eliminar acentos
function removeAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}




// fade de pagina 
$(document).ready(function() {

    $('#loginModal').on('show.bs.modal', function() {
        $('body').addClass('no-fade');
    }).on('hidden.bs.modal', function() {
        $('body').removeClass('no-fade');
    });

    if (!$('body').hasClass('no-fade')) {
        $('body').css('display', 'none');
        $('body').fadeIn(2000);
    }
});

