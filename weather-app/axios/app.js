const axios = require('axios');
const yargs = require('yargs');


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

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBN8OamtFk_OB2exqYkW7CVqYxEFttCJ34`;

axios.get(geocodeUrl)
    .then((response) => {
        if(response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to connect to database');
        }

        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        let forecastUrl = `https://api.darksky.net/forecast/0df457dcc51c0ac33f03821f70cd3ce4/${lat},${lng}`;

        console.log(`The weather forcast for ${response.data.results[0].formatted_address}`)
        return axios.get(forecastUrl);
    }).then((response) => {
        console.log(`
            Temperature: ${response.data.currently.temperature}
            Feels Like: ${response.data.currently.apparentTemperature}
            Humidity: ${response.data.currently.humidity}
        `)
    }).catch((err) => {
        console.log(err);
    })