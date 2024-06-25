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



//MODO OSCURO 

const toggleButton = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// Guardar el tema seleccionado en localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'dark-mode') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// Guardar la preferencia del usuario
toggleButton.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.setItem('theme', 'light-mode');
    }
});





// area de Validaciones 

    // LOGIN 

// function validacionLogin {
    
//     var user = document.getElementById('inputMail').value;
//     var pass = document.getElementById('inputPass').value;

//     if ()
// }
