const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//initializing express
const app = express()

//setup dynamic port for Heroku
const port = process.env.PORT
//templates related paths
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname ,'../public/templates')
const partialsPath = path.join(__dirname, '../public/templates/partials')

//Register static content
app.use(express.static(publicDirPath))


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//routers
app.get('',(req,res) => {
    res.render('index', {
        title: ''
    })
})

app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'Get the Weather!'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Let Us Help You'
    })
})

app.get('/forecast', (req, res) => {
    
    if (!req.query.search) {
        return res.send({error:'Please provide the Address'})
    }

    geocode(req.query.search, (error,{ latitude, longitude, location } = {}) => {
        forecast(latitude,longitude,(error,{feelsLike,temperature} = {}) => {
            if (error)
            {
                res.send({
                    error
                })
            } else {
                res.send({
                    feelsLike,
                    temperature
                })
            }
        })
    })
})

app.get('*', (req, res) => {
    res.render('404')
})



app.listen(port, () => {
    console.log('Express has started listening at port '+port)
})