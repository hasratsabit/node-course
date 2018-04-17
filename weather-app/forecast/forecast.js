
const request = require('request');

const getForecast = (lat, long, callback) => {

    request({
        url: `https://api.darksky.net/forecast/0df457dcc51c0ac33f03821f70cd3ce4/${lat},${long}`,
        json: true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                humidity: body.currently.humidity
            })
        }else {
            callback('Unable to connect.');
        }
    })
}

module.exports = {
    getForecast
}