const request = require('request')
const forecast = (latitude,longitude,callback) => {

    const url = `http://api.weatherstack.com/current?access_key=c63c72fb41b3f658b3635383bd6c0299&query=${latitude},${longitude}`
    console.log(url)
    request({ url, json: true }, (error, {body}) => {
                if (error)
                {
                    callback('Unable to connect to Weather Service!',undefined)  
                }else if (body.error){
                    callback('Invalid input.',undefined)
                } else if (body) {
                    
                    const temperature = body.current.temperature
                    const feelsLike = body.current.feelslike
                    
                        callback('', {
                        temperature,
                        feelsLike 
                    })
                }
            })     
}

module.exports = forecast;