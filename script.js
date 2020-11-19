window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let imageIcon = document.querySelector('.fas');
  let temperatureSection = document.querySelector('.temperature-section');
  let temperatureSpan = document.querySelector('.temperature-section span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const apiStart = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3794d71893a492265a7c7f132aadec6b&units=imperial
      `;


      fetch(apiStart)
        .then((response) => {
          return response.json();
        })
        .then(data => {
          console.log(data);
         const {temp}  = data.main;
         const name  = data.name;
         const weather = data.weather[0].description;
         const icon = data.weather[0].main;

         // Set DOM Elements from the API
        temperatureDegree.textContent = temp;
        temperatureDescription.textContent = weather;
        locationTimezone.textContent = name;
        // Calculate Celcius to Farenheit
         let celcius = (temp - 32) * (5 / 9);
        // Icon SVG image based on 'icon' variable.
        if (icon === 'Thunderstorm'){
          imageIcon.classList.add('fa-bolt');
        } else if (icon === 'Drizzle'){
          imageIcon.classList.add('fa-tint');
        } else if (icon === 'Rain'){
          imageIcon.classList.add('fa-cloud-showers-heavy');
        } else if (icon === 'Snow'){
          imageIcon.classList.add('fa-snowflake');
        } else if (icon === 'Atmosphere'){
          imageIcon.classList.add('fa-wind');
        } else if (icon === 'Clear'){
          imageIcon.classList.add('fa-sun');
        } else if (icon === 'Clouds'){
          imageIcon.classList.add('fa-cloud');
         } else {
          imageIcon.classList.add('fa-exclamation-triangle');
         } 

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
  }
});