let container = document.querySelector('.section-1')
let container2 = document.querySelector('.section-2')
let key  = "26232e8396794b03a51125802241804"
let inputfield = document.querySelector('.input')
// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
window.onload = function() {
    addWeatherInfoToContainer('india');
};
console.log(inputfield)
let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

// let date = new Date()

async function addWeatherInfoToContainer(country){
   
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${country}&days=${6}&aqi=no&alerts=no`)
    if(!response.ok){
        console.log(response)
        modal.style.display = "block";
        return;
        
    }
    let data = await response.json()
    let weather = data.current
    let location = data.location
    let forecast =  data.forecast
    let forecastdata = forecast.forecastday[0].hour
    console.log(data);  
    console.log(forecast);  
    console.log(response)

   
    
    function extractTime(localtime) {
        // Split the localtime string by space to separate date and time
        let parts = localtime.split(' ');
    
        // Return the time portion (the second part after splitting by space)
        return parts[1];
    }
     
    let dayelement = document.createElement('display-weather')
    dayelement.classList.add('display-weather')
    let weekelement = document.createElement('weekweather')
    weekelement.classList.add('weekweather')

    dayelement.innerHTML = ` <div class="display-weather border">
    <div class="weather-info">
        <div class="cityname flex">
            <h1> ${location.name} </h1>
            <h3> Temp : ${weather.temp_c }°C</h3>

        </div>
        <img src="${weather.condition.icon}" id="weather-icon" alt="null">
        <div class="weather-description">
            <h3>${weather.condition.text}</h3>
        </div>

        <div class="time">
            <span>Time: ${extractTime(location.localtime)}</span>
        </div>
    </div>
</div>

<div class="dayweather border">
<div class="forecast-title">
    <span>Today's Forecast</span>
</div>
<div class="flex week">

    <div class="day-data">
        <span>${extractTime(forecastdata[6].time)}</span>
        <img src="${forecastdata[6].condition.icon}" alt="" id="day-icon">
        <span>${forecastdata[6].feelslike_c}°C</span>
    </div>
    <div class="solid-border">
    </div>
    <div class="day-data">
    <span>${extractTime(forecastdata[9].time)}</span>
    <img src="${forecastdata[9].condition.icon}" alt="" id="day-icon">
    <span>${forecastdata[9].feelslike_c}°C</span>
</div>
    <div class="solid-border">
    </div>
    <div class="day-data">
    <span>${extractTime(forecastdata[12].time)}</span>
    <img src="${forecastdata[12].condition.icon}" alt="" id="day-icon">
    <span>${forecastdata[12].feelslike_c}°C</span>
</div>
    <div class="solid-border">
    </div>
    <div class="day-data">
    <span>${extractTime(forecastdata[15].time)}</span>
    <img src="${forecastdata[15].condition.icon}" alt="" id="day-icon">
    <span>${forecastdata[15].feelslike_c}°C</span>
</div>
    <div class="solid-border">
    </div>
    <div class="day-data">
    <span>${extractTime(forecastdata[18].time)}</span>
    <img src="${forecastdata[18].condition.icon}" alt="" id="day-icon">
    <span>${forecastdata[18].feelslike_c}°C</span>
</div>
    <div class="solid-border">
    </div>
    <div class="day-data">
    <span>${extractTime(forecastdata[21].time)}</span>
    <img src="${forecastdata[21].condition.icon}" alt="" id="day-icon">
    <span>${forecastdata[21].feelslike_c}°C</span>
</div>
    <div class="solid-border">
    </div>
    <div class="day-data">
    <span>${extractTime(forecastdata[0].time)}</span>
    <img src="${forecastdata[0].condition.icon}" alt="" id="day-icon">
    <span>${forecastdata[0].feelslike_c}°C</span>
</div>
   
    </div>

</div>`

weekelement.innerHTML = ` <div class="weekweather border">
<div class="forecast-title ">
    <span>Weekely Forecast</span>
</div>
<div class=" flex week-info flex-column  h-full  ">

    <div class="week-data">
        <span>${forecast.forecastday[0].date}</span>
        <img src="${forecastdata[0].condition.icon}" alt="noo" id="week-icon">
        <span>${forecastdata[0].feelslike_c}°C</span>
    </div>
    <div class="v-solid-border ">
    </div>
    <div class="week-data">
        <span>${forecast.forecastday[1].date}</span>
        <img src="${forecast.forecastday[1].day.condition.icon}" alt="" id="week-icon">
        <span>${forecast.forecastday[1].day.mintemp_c}°C</span>
    </div>
    <div class="v-solid-border">
    </div>
    <div class="week-data">
        <span>${forecast.forecastday[2].date}</span>
        <img src="${forecast.forecastday[2].day.condition.icon}" alt="" id="week-icon">
        <span>${forecast.forecastday[2].day.mintemp_c}°C</span>
    </div>
   
    
   
    </div>

</div>`
container.innerHTML='';
container2.innerHTML='';
    container.appendChild(dayelement)
    container2.appendChild(weekelement)
}

inputfield.addEventListener('keydown',(e)=>{

    if(e.key=='Enter'){
        e.preventDefault()
        inputvalue = inputfield.value
       addWeatherInfoToContainer(inputvalue)
        
       

    }
   
})