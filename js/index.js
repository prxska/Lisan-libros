

$(document).ready(function(){
    var navbar = $('#myNavbar');
    var navbarHeight = navbar.outerHeight(true); // Consideramos el margen del navbar
    var lastScrollTop = 0;

    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
            // Si se desplaza hacia abajo y ha pasado la altura del navbar
            navbar.addClass('fixed-top');
            // Añadir espacio de padding al cuerpo de la página para evitar solapamiento
            $('body').css('padding-top', navbarHeight);
        } else {
            // Si se desplaza hacia arriba o está en la parte superior de la página
            navbar.removeClass('fixed-top');
            // Restablecer el espacio de padding del cuerpo de la página
            $('body').css('padding-top', 0);
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