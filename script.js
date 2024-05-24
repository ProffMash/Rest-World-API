const apiUrl = 'https://restcountries.com/v3.1/all';
const countriesContainer = document.getElementById('countries-container');
const searchInput = document.getElementById('search');
const regionFilter = document.getElementById('region-filter');
const darkModeToggle = document.getElementById('toggle-dark-mode');

let countriesData = [];

// Fetch data from the API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        countriesData = data;
        displayCountries(countriesData);
    });

//display countries
function displayCountries(countries) {
    countriesContainer.innerHTML = '';
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} Flag">
            <div class="details">
                <h2>${country.name.common}</h2>
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Region: ${country.region}</p>
                <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
            </div>
        `;
        countryCard.addEventListener('click', () => {
            window.location.href = `detail.html?name=${encodeURIComponent(country.name.common)}`;
        });
        countriesContainer.appendChild(countryCard);
    });
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredCountries = countriesData.filter(country => 
        country.name.common.toLowerCase().includes(searchQuery)
    );
    displayCountries(filteredCountries);
});

// Region filter 
regionFilter.addEventListener('change', (e) => {
    const selectedRegion = e.target.value;
    if (selectedRegion === 'all') {
        displayCountries(countriesData);
    } else {
        const filteredCountries = countriesData.filter(country => 
            country.region === selectedRegion
        );
        displayCountries(filteredCountries);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
    const body = document.body;

    toggleDarkModeButton.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
    });
});
