
let search = document.querySelector('form.search-section');

search.addEventListener('click', function (e) {
  let searchInput = document.getElementById('location-search');
  let btnClicked = true;
      //prevent the normal submission of the form
      e.preventDefault();

  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let imageIcon = document.querySelector('.fas');
  let temperatureSection = document.querySelector('.temperature-section');
  let temperatureSpan = document.querySelector('.temperature-section span');
  let rise = document.querySelector('.sunrise');
  let set = document.querySelector('.sunset');

    console.log(searchInput.value);    
    
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=3794d71893a492265a7c7f132aadec6b&units=imperial
    `;

    fetch(api)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      console.log(data);
     const temp  = data.main.temp;
     const name  = data.name;
     const weather = data.weather[0].description;
     let icon = data.weather[0].main;

     //Sunrise and Sunset are in UNIX
     const sunriseUnix = data.sys.sunrise * 1000;
     const sunsetUnix = data.sys.sunset * 1000;

     //Unix To Time
     const sunriseDate = new Date(sunriseUnix);
     const sunsetDate = new Date(sunsetUnix);

     console.log(sunsetDate, sunriseDate);

    //  //Hours, minutes and seconds
     let risehours = sunriseDate.getHours().toString().padStart(2,0);
     let riseminutes = sunriseDate.getMinutes().toString().padStart(2,0);

     let sethours = sunsetDate.getHours().toString().padStart(2,0);
     let setminutes = sunsetDate.getMinutes().toString().padStart(2,0);

     // Set DOM Elements from the API
    temperatureDegree.textContent = temp;
    temperatureDescription.textContent = weather;
    locationTimezone.textContent = `📍${name}`;
    rise.textContent = `Sunrise: ${risehours}:${riseminutes}`;
    set.textContent = `Sunset: ${sethours}:${setminutes}`;

          // Calculate Celcius to Farenheit
          let celcius = (temp - 32) * (5 / 9);
           
           //Change temperature to Celcius/Farenheit on click
           temperatureSection.addEventListener('click', () =>{
            if(temperatureSpan.textContent === '°F'){
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = celcius;
              temperatureDegree.textContent = Math.floor(celcius);
            } else {
              temperatureSpan.textContent = '°F'
              temperatureDegree.textContent = temp;
            }
      });
  });
});