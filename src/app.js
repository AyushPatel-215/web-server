const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port =process.env.PORT || 3000

// define paths for express config
const publicDirectlyPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialsPath)

// setup static directiony to serve
app.use(express.static(publicDirectlyPath))

app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather app',
        name : 'Ayush patel'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Ayush patel'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About me',
        name : 'Ayush patel'
    })
})

app.get('/weather', (req,res)=>{

    if(!req.query.address){
        res.send("provide a address!...")
    }

    geocode(req.query.address, (error,{lantitude,longitude,location}={}) =>{
        if(error)
            return res.send({error})

        forecast(lantitude,longitude, (error,forecastData) => {
            if(error)
                return res.send({error})
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    } )

})

app.get('/product', (req,res) =>{
    if(!req.query.search){
        res.send("provide a search value..")
    }

    res.send({
        product:[]
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name:'Ayush patel',
        errorMassage:'Page not Found'
    })
})


app.listen(port, ()=> {
    console.log('Server is up on '+port)
})
