const request = require('request')

const forecast = (lantitude,longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=937d9d72ed4f5365224c51186ec0b035&query='+longitude+','+lantitude

    request({url, json:true},(error,response) => {

        if(error)
            callback('unable to connect the weather service',undefined)
        else if(response.body.error)
            callback('unnable to find location ',undefined)
        else{
            console.log(response.body.current)
            callback(undefined,"current temperature: "+response.body.current.temperature+", feel like temparature: "+response.body.current.feelslike
            +", visibility is: "+response.body.current.visibility+" and humidity is: "+response.body.current.humidity)
        }
    })
    
}

module.exports = forecast