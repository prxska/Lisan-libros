

$(document).ready(function() {
    var navbar = $('#dynamicBar');
    var navbarInitialOffsetTop = navbar.offset().top; // Obtener la posición inicial de la barra de navegación
    var navbarHeight = navbar.outerHeight(true);
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
});






$(document).ready(function(){
    $('#searchForm').submit(function(event) {
        event.preventDefault(); // Prevenir el envío del formulario
        
        var searchTerm = removeAccents($('#searchInput').val().toLowerCase()); // Convertir el término de búsqueda a minúsculas y eliminar acentos
        var sectionID = ''; // Variable para almacenar el ID de la sección encontrada

        // Búsqueda de coincidencias en el contenido de la página
        $('.card').each(function() {
            var cardText = removeAccents($(this).text().toLowerCase()); // Convertir el texto de la tarjeta a minúsculas y eliminar acentos
            if (cardText.includes(searchTerm)) {
                sectionID = $(this).attr('id');
                return false; // Salir del bucle cuando se encuentra la primera coincidencia
            }
        });

        if (sectionID !== '') {
            // Si se encuentra una sección que coincide con el término de búsqueda, redirigir al usuario a esa sección
            window.location.href = '#' + sectionID;
        } else {
            // Si no se encuentra ninguna coincidencia, mostrar un mensaje de error o realizar otra acción según sea necesario
            alert('No se encontraron resultados para la búsqueda.');
        }
    });
});

// Función para eliminar acentos de una cadena de texto
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

