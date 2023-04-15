const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoidmlzaG51Z2FtaW5pIiwiYSI6ImNsZXRwMnlkdDFpZjgzcnJ2amNsZmVuOGQifQ.0UBjOavqmPa6Whoz2yYkIg&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        }
        else if(body.message === "Not Found" || !body.features || body.message === "Not Authorized - No Token" ){
            callback('Unable to find location. Try another search.',undefined)
        }
        else if (body.features){
            if(body.features.length === 0){
                callback('Unable to find location. Try another search.',undefined)
                return
            }
            callback(undefined,{ 
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
        else{
            callback('Unable to find location. Try another search.',undefined)
        }
    })

}
module.exports = geocode


