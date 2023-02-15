const request = require('request')

const getcode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+ '.json?access_token=pk.eyJ1IjoiYXl1c2hwYXRlbDUxMiIsImEiOiJjbGR3cGpzcnYwOW91M3Zxd3lnZ3Q3Z2RzIn0.s0sC1fgpd-iASIJodZnz8g'
    
    request({ url, json: true }, (error, response) => {
        
        if(error) 
            callback('unable to connect the location services! ',undefined)
        else if(response.body.features.length==0)
            callback('unble to find the location. try another search. ',undefined)
        else{
            callback(undefined, {
                // loc: response.body.features[0],
                lantitude: response.body.features[0].center[0],
                longitude : response.body.features[0].center[1],
                location: response.body.features[0].text
            })   
        }
    });  
}

module.exports = getcode








// getcode('Ahemdabad' ,(error,data) => {
//     console.log('error '+error)
//     console.log('our location is: '+data.lantitude+' '+data.longitude+' '+data.location)
// })

// request({ url: url, json: true }, (error, response) => {
    
//     if(error) 
//         callback('unable to connect the location services! ',undefined)
//     else if(response.body.features.length==0)
//         callback('unble to find the location. try another search. ',undefined)
//     else{
//         callback(undefined, {
//             // loc: response.body.features[0],
//             lantitude: response.body.features[0].center[1],
//             longitude : response.body.features[0].center[0],
//             olocation: response.body.features[0].text
//         })   
//     }
// });  
