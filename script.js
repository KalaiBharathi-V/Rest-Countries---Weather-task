document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.getElementById('cardsContainer');
  
    function createCard(countryData) {
      const card = document.createElement('div');
      card.classList.add('col-lg-4', 'col-sm-12');
  
      const cardElement = document.createElement('div');
      cardElement.classList.add('card', 'card-header', 'card-body');
  
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-primary');
      button.textContent = 'Click for Weather';
  
      button.addEventListener('click', function () {
        getWeatherData(countryData.alpha2Code);
      });
  
      cardElement.appendChild(button);
      card.appendChild(cardElement);
      cardsContainer.appendChild(card);
  
      displayCountryInfo(countryData, cardElement);
    }
  
    function getCountriesData() {
      fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
          data.forEach(countryData => {
            createCard(countryData);
          });
        })
        .catch(error => console.error('Error fetching countries data:', error));
    }
  
    function displayCountryInfo(countryData, cardElement) {
      const valuesToDisplay = ['capital', 'region', 'latlng', 'name', 'flags', 'currencies'];
  
      valuesToDisplay.forEach(value => {
        const valueElement = document.createElement('p');
        valueElement.textContent = `${value}: ${JSON.stringify(countryData[value])}`;
        cardElement.appendChild(valueElement);
      });
    }
  
    function getWeatherData(countryCode) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryCode}&appid=63673e22c65e01e38dd62f900bbb473e`)
        .then(response => response.json())
        .then(weatherData => {
          alert(`Weather in ${countryCode}: ${JSON.stringify(weatherData)}`);
        })
        .catch(error => console.error('Error fetching weather data:', error));
    }
  
    getCountriesData();
  });