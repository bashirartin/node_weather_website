const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cbc9cf1fb24400709300edaef8b6c353&query='+ lat +','+ long

    request({url, json: true}, (error, response) => {
        if(error) {
            callback('check your internet connection!-there access to weather stack api', undefined)
        } else if (response.error) {
            callback('unable to find location try another search!- weather stack api',undefined)
        } else {
            callback(undefined, response.body.current)
        }
    })
}

module.exports = forecast