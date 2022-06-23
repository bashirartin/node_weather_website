const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=60de02ea7e7e95d519a00b9bee5dd93c&query='+ encodeURIComponent(address) +'&limit=1'

    request({url, json: true},(error, response) => {
        if (error) {
            callback('check your internet connection!')
        } else if (response.body.error) {
            callback('unable to find location try another search!')
        } else {
            callback(undefined,response.body.data[0])
        }
    })
}

module.exports = geocode