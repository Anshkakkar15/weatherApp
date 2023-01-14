let head = document.querySelector(".topLocations")
head.addEventListener('click', function(e){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${e.target.id}&appid=e57ec90800abb1dc9f861f269422bd76
    `).then(res => res.json()).then(res => {
        let data = "";
        res.weather.forEach(function(el) {
            data += `
            <div class="type">
            <h2>${`weather of `+ e.target.id}</h2>
            <h2>cloudy</h2>
            <h2>Humidity</h2>
            <h2>Wind</h2>
        </div>
        <div class="percentage">
        <h2>${el.id}</h2>
        <h2>${el.main}</h2>
        <h2>${el.description}</h2>
        </div>
            `
        })
        let detail = document.getElementById("details");
        detail.innerHTML = data
    })
})

let search = document.getElementById('search')
search.addEventListener('click', function getData() {
    let formInput = document.querySelector('#city')
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${formInput.value}&appid=e57ec90800abb1dc9f861f269422bd76
    `).then(res => res.json()).then(res => {
        let data = "";
        res.weather.forEach(function(el) {
            data += `
            <div class="type">
            <h2>${`weather of `+ formInput.value}</h2>
            <h2>cloudy</h2>
            <h2>Humidity</h2>
            <h2>Wind</h2>
        </div>
        <div class="percentage">
        <h2>${el.id}</h2>
        <h2>${el.main}</h2>
        <h2>${el.description}</h2>
        </div>
            `
        })
        formInput.value=""
        let detail = document.getElementById("details");
        detail.innerHTML = data
    })
})



