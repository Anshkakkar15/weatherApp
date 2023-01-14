const date = new Date()
let hour = date.getHours()
let minutes = date.getMinutes()
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var dayName = days[date.getDay()];

function tConvert (time) {
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) { 
      time = time.slice (1);  
      time[5] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = +time[0] % 12 || 12;
    }
    return time.join (''); 
}
let search = document.getElementById('search')
search.addEventListener('click', async function getData() {
    let formInput = document.querySelector('#city')
    if(formInput.value){
        await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${formInput.value}&appid=e57ec90800abb1dc9f861f269422bd76
        `).then(res => res.json()).then(res => {
            if(res.cod==="404"){
             alert(res.message)
            }
            else{
                let data = "";
                res.weather.forEach(function (el) {
            data += `
            <div class="prescription">
                    <i class="fa-duotone fa-clouds"></i>
                    <h1>${el.main}</h1>
                    </div>
                    `
                })
             formInput.value="";
            let weatherData="";
            weatherData += `
            <div class="weatherCondition">
            <img src= "https://source.unsplash.com/300x300?weather,${res?.weather[0]?.main}" />
             </div>
            <div class="temperature">
                    <h1 class="temp_head">${(res.main.temp-273.15).toString().slice(0,2) +"\u2103"}</h1>
                    <p class="dayTime">${dayName}, <span>${tConvert (hour + ":" +minutes)}</span></p>
                    <p class="dayTime">Clouds : ${res.clouds.all} %</span></p>
            </div>`
            let  highlights="";
            
            const meter_per_sec = res.wind.speed /1000
            const one_sec = 1/3600
            let answer = meter_per_sec/one_sec
            highlights +=` <div class="card-body">
            <p>Wind-status</p>
            <h3>${answer.toString().slice(0,5)} <span>km/h</span></h3>
            <h3>${res.wind.deg}<span>deg</span></h3>
        </div>
        <div class="card-body">
            <p>Lattitude & Longitude</p>
            <h3>Lat : ${res.coord.lat}</h3>
            <h3>Lon : ${res.coord.lon}</h3>
            </div>
            <div class="card-body">
            <p> Atmospheric pressure </p>
            <h3>${res.main.pressure} .hPa</h3>
            <h3>${res.main.pressure<1000?"Low Pressure":"High Pressure"}</h3>
        </div>
        <div class="card-body">
            <p>Humidity</p>
            <h3>${res.main.humidity} %</h3>
            <h3>${res.main.humidity<=30 ?"Dry":"Comfortable" ? res.main.humidity<65?"Comfortable" : "Sticky" : "Dry"} </h3>
        </div>
        <div class="card-body">
            <p>Visibility</p>
            <h3>${res.visibility/1000}<span> km</span></h3>
            <h3>${res.visibility/1000<=3?"Visibility poor":"Visibility moderate"?res.visibility/1000<=6?"Visibility moderate":"Visibility good":"Visibility poor"}</h3>
        </div>
        <div class="card-body">
            <p>Low/High</p>
            <h3>${(res.main.temp_min-273.15).toString().slice(0,2)+"\u2103"}</h3>
            <h3>${(res.main.temp_max-273.15).toString().slice(0,2)+"\u2103"}</h3>
        </div>`
            
        let description = document.getElementById("description");
        description.innerHTML = data
        let weather_section = document.getElementById('weather_section')
        weather_section.innerHTML = weatherData
        let card = document.getElementById('card')
        card.innerHTML = highlights
        let country_img = document.querySelector('.country_img')
        country_img.innerHTML = `<h3>${res.name}</h3>`
       
    }
    })
}
})




