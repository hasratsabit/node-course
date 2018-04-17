
const request = require('request');


const geocodeAddressPromise = (address) => {
    
    return new Promise((resolve, reject) => {
        let encodedAddress = encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBN8OamtFk_OB2exqYkW7CVqYxEFttCJ34`,
            json: true
        },(error, response, body) => {
            if(error) {
                reject('Can not connect to the API');
            }else if(body.status === 'ZERO_RESULTS') {
                reject('The address was not found.');
            }else if(body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                })
            }
        })
    })

}

module.exports = {
    geocodeAddressPromise
}

