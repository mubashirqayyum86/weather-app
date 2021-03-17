const request = require('request')
const geocode = (address, callback) => {
        const latLongApiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token={your_access_token}&limit=1'

        request({ url: latLongApiUrl, json: true }, (error, response) => {
            if (error) {
                callback('Unable to connect to Weather Service!',undefined)    
            }
            else if(response.body.features.length === 0){
                callback('Unable to locate the address.Please enter a valid address',undefined)
            }
            else {
                const data = response.body
                console.log(data.features[0].center)
                latitude = data.features[0].center[1]
                longitude = data.features[0].center[0]
                location = data.features[0].place_name
                callback('', {
                    latitude,
                    longitude,
                    location 
                })
            }
    
        })
}

module.exports = geocode