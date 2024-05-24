const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get('name');
const countryDetailContainer = document.getElementById('country-detail');
const backButton = document.getElementById('back');
const darkModeToggle = document.getElementById('toggle-dark-mode');

backButton.addEventListener('click', () => {
    window.history.back();
});

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Fetch detailed information about the country
fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => response.json())
    .then(data => {
        const country = data[0];
        displayCountryDetail(country);
    })
    .catch(error => {
        console.error('Error fetching country details:', error);
        countryDetailContainer.innerHTML = `<p>Error fetching country details. Please try again later.</p>`;
    });

//display detailed country information
function displayCountryDetail(country) {
    countryDetailContainer.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.png}" alt="${country.name.common} Flag">
        <p>Native Name: ${country.name.nativeName ? Object.values(country.name.nativeName)[0].common : country.name.common}</p>
        <p>Population: ${country.population.toLocaleString()}</p>
        <p>Region: ${country.region}</p>
        <p>Sub Region: ${country.subregion}</p>
        <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p>Top Level Domain: ${country.tld}</p>
        <p>Currencies: ${country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'N/A'}</p>
        <p>Languages: ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
        <p>Border Countries: ${country.borders ? country.borders.map(border => `<button class="border-btn" data-border="${border}">${border}</button>`).join(' ') : 'N/A'}</p>
    `;

    document.querySelectorAll('.border-btn').forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = `detail.html?name=${encodeURIComponent(button.getAttribute('data-border'))}`;
        });
    });
}




