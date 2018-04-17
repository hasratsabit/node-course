
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to get weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv


geocode.geocodeAddress(argv.address, (error, results) => {
    if(error) {
        console.log(error);
    }else {
        console.log(`The forecast for ${results.address}:`);

        forecast.getForecast(results.latitude, results.longitude, 
            (errorMessage, weatherData) => {
            if(errorMessage) {
                console.log(errorMessage)
            }else {
                console.log(`
                    Current Temperature: ${weatherData.temperature}
                    Feels like:  ${weatherData.apparentTemperature}
                    Humidity: ${weatherData.humidity}
                `)
            }
        })
    }
});














// let decodedAddress = decodeURIComponent()
// Weather API KEY:  0df457dcc51c0ac33f03821f70cd3ce4
// https://api.darksky.net/forecast/0df457dcc51c0ac33f03821f70cd3ce4/38.8167099,-77.10824439999999

