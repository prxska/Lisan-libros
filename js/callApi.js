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