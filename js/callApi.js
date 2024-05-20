// uso de api

function searchBooks() {
    console.log('In process.. ')
    const query = document.getElementById('searchQuery').value;
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.docs);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
// Traer datos hacia la pagina
function displayResults(docs) {
    console.log('Thats right!');
    const resultsBody = document.getElementById('resultsBody');
    resultsBody.innerHTML = ''; // Clear any existing results

    docs.forEach(doc => {
        const row = document.createElement('tr');
        const titleCell = document.createElement('td');
        const authorCell = document.createElement('td');
        const yearCell = document.createElement('td');

        titleCell.textContent = doc.title;
        authorCell.textContent = doc.author_name ? doc.author_name.join(', ') : 'Unknown';
        yearCell.textContent = doc.first_publish_year || 'Unknown';

        row.appendChild(titleCell);
        row.appendChild(authorCell);
        row.appendChild(yearCell);

        resultsBody.appendChild(row);
    });
}


// efecto fade 
$(document).ready(function() {
    $("body").css("display", "none");
    $("body").fadeIn(2000); // Ajusta el tiempo de desvanecimiento en milisegundos (2000ms = 2s)

    $("a").click(function(event) {
        event.preventDefault();
        newLocation = this.href;
        $("body").fadeOut(1000, function() {
            window.location = newLocation;
        });
    });
});


// modo noche 

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