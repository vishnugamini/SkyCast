const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a672a2b76f035bcfe1c6616bae065fcf&query='+latitude+','+longitude+'&units=m'
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }
        else if(body.success===false){
            callback('Unable to find location!',undefined)
        }
        else {
            callback(undefined,{
                temperature:body.current.temperature,
                chance_of_rain:body.current.precip,
                weather_description:body.current.weather_descriptions[0]
            })
        }

    })
}
module.exports = forecast


// const request = require('request')

// const forecast = (latitude,longitude,callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=a672a2b76f035bcfe1c6616bae065fcf&query='+latitude+','+longitude+'&units=m'
//     request({url:url,json:true},(error,response) => {
//         if(error){
//             callback('Unable to connect to weather service!',undefined)
//         }
//         else if(response.body.success===false){
//             callback('Unable to find location!',undefined)
//         }
//         else {
//             callback(undefined,{
//                 temperature:response.body.current.temperature,
//                 chance_of_rain:response.body.current.precip,
//                 weather_description:response.body.current.weather_descriptions[0]
//             })
//         }

//     })
// }

// module.exports = forecast