
$(document).ready(function(){
    $(window).scroll(function(){
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
            // El usuario ha llegado al final de la página
            $("#myFooter").fadeIn();
        } else {
            // El usuario no ha llegado al final de la página
            $("#myFooter").fadeOut();
        }
    });
});