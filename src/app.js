const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()

//Defining paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

const port = process.env.PORT || 3000

let data = undefined

app.get('',(req,res) => {
    res.render('index',{
        title : "Weather",
        name:"Vishnu"
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : "About",
        name:"Vishnu"
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title :"Help",
        name:"Vishnu",
        helpText:"This is some helpful text"

    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        res.send({
            error: "You must provide an address"
        })
        return
        
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            res.send({
                error:error
            })
            return
        }
        
        forecast(latitude,longitude,(error,{whole_body,temperature,chance_of_rain,weather_description,weather_icon} = {}) =>{
            if(error){
                res.send({
                    error:error
                })
                return
            }
            res.send({
                address_asked:req.query.address,
                location,
                temperature,
                chance_of_rain,
                weather_description,
                weather_icon
            })
            data = whole_body
        })

    })
})

app.get('/detailedWeatherView',(req,res) => {
    res.send(data)
})

app.get('/details',(req,res) => {
    res.render('details',{
        title: "Details",
        msg:"This is detailed view",
        name:"Vishnu"
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Vishnu",
        errorMsg:"Help article not found"
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:"404",
        name:"Vishnu",
        errorMsg:"Page not found"
    })
})

app.listen(port, ()=>{
    console.log('Sever is up on port'+port+'.')
})