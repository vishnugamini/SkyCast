const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c6e557f19184d53a39dd0d920c76b268&query='+latitude+','+longitude+'&units=m'
    request({url,json:true},(error,body = {}) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }
        else if(body.success===false){
            callback('Unable to find location!',undefined)
        }
        else {
            callback(undefined,{
                whole_body:body,
                temperature:body.current.temperature,
                chance_of_rain:body.current.precip,
                weather_description:body.current.weather_descriptions[0],
                weather_icon: body.current.weather_icons[0]
            })
        }

    })
}
module.exports = forecast

