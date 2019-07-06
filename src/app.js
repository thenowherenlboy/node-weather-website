const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const weather = require('./utils/weather.js');

const viewPath = path.join(__dirname, '../templates/views/');
const partialsPath = path.join(__dirname, '../templates/partials/');

const app = express();
const port = process.env.PORT || 3000;

const moniker = 'H. M. Dickson';

app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

// Static directory
app.use(express.static(path.join(__dirname,'../public/')));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather or something...',
        name: moniker
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Beyond Help!',
        message: 'Chug on down to mamby-pamby land, and grab some self-confidence!',
        name: moniker,
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About This Site',
        name: moniker
    });
});
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please enter a valid address'
        });
    } else {
        geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
            if(error) {
                return res.send(error);
            } else {
                
                 //console.log('Place Name: ', data.location);
                weather(latitude,longitude, (err, data) => {
                    if(err) {
                        return res.send({error: 'Error with weather'}, err);
                    } else {
                    res.send( {
                            location,
                            address: req.query.address,
                            forecast: data.weekForecast + ' ',
                            temperature: 'It is currently ' + data.currentTemp + ' degrees F. ',
                            dailyHigh: 'Today\'s high is: ' +data.dailyHigh + '. ',
                            dailyLow: 'Today\'s low is: ' + data.dailyLow + '. ',
                            precip: 'There is a ' + (100 * data.precipProb) + '% chance of rain.'

                        });
                    };
                });
            }            
        });      
    }
 });

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send( {
            error: 'You must provide a search term.'
        });
    }
    console.log(req.query.search);
    res.send({
       products: [],
 
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        error: 'Help article not found.',
        name: moniker
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: moniker
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});