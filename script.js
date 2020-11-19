window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let imageIcon = document.querySelector('.fas');
  let temperatureSection = document.querySelector('.temperature-section');
  let temperatureSpan = document.querySelector('.temperature-section span');
  let rise = document.querySelector('.sunrise');
  let set = document.querySelector('.sunset');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3794d71893a492265a7c7f132aadec6b&units=imperial
      `;
      // Fetch API call
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then(data => {
          console.log(data);
         const {temp}  = data.main;
         const name  = data.name;
         const weather = data.weather[0].description;
         const icon = data.weather[0].main;

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
  }
});
