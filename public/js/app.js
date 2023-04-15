console.log("client side java script is loaded")

const loc = document.querySelector('.location')
const button = document.querySelector('.search')
const value = document.querySelector('.temperature')
const error = document.querySelector('.error')
const location_found = document.querySelector('.location_found')
const weather_description = document.querySelector('.weather_description')
const chance_of_rain = document.querySelector('.chance_of_rain')
const weather_icon = document.querySelector('.weather_icon')
let detailed_view = document.querySelector('.detailed_view')

button.addEventListener('click',(e) => {
    e.preventDefault()
    let location_provided = loc.value
    location_found.textContent = "Loading..."
    value.textContent = "Loading..."
    weather_description.textContent = "Loading..."
    chance_of_rain.textContent ="Loading..."
    weather_icon.src = ""
    error.textContent = ""
    fetch('http://localhost:3000/weather?address='+location_provided).then((response) => {
        response.json().then((data) => {
            if(data.error){
                detailed_view.classList.add("hidden")
                location_found.textContent = "Not found"
                value.textContent = "Temperature : ?"
                error.textContent = data.error
                weather_description.textContent = ''
                chance_of_rain.textContent = "Chance of rain: ?"
                weather_icon.src = ""
            }
            else{
                detailed_view.classList.remove("hidden")
                location_found.textContent = "Location: " + data.location
                value.textContent = "Temperature : " + data.temperature + " °C"
                error.textContent = ''
                weather_description.textContent = "Description: " + data.weather_description
                chance_of_rain.textContent = "Chance of rain: " + data.chance_of_rain + '%'
                weather_icon.src = data.weather_icon
                
            }
        })
    })
    
})
