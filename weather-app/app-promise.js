
const yargs = require('yargs');
const geocode = require('./geocode/geocode-promise');
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


geocode.geocodeAddressPromise(argv.adress)
    .then((address) => {
        console.log(JSON.stringify(address, undefined, 2));
    }).catch((err) => {
        console.log(err);
    })














// let decodedAddress = decodeURIComponent()
// Weather API KEY:  0df457dcc51c0ac33f03821f70cd3ce4
// https://api.darksky.net/forecast/0df457dcc51c0ac33f03821f70cd3ce4/38.8167099,-77.10824439999999

