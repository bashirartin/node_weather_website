const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// path definition for application
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// templates setup
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// static files path
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bashir'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bashir'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'for more help call me at 123456',
        title: 'Help',
        name: 'Bashir'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, label} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, {temperature, wind_speed, humidity} = {}) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location: label,
                temperature,
                wind_speed,
                humidity
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('h404', {
        title: '404',
        name: 'Bashir',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bashir',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port: '+ port)
})