const request = require('request');

const weather = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9423d58b5202586d3257290c377de9c1/' + latitude + ',' + longitude;

    request({ url,
            json: true}, (error, {body}) => {
        if (error) {
           callback({ error: 'Connection to weather service not available'}, undefined);
        } else if (body.error) {
            callback({ error: 'Location invalid'}, undefined);
        } else {
            //console.log(response.body.currently);
            const daily = body.daily;
            const current = body.currently;
            callback(undefined, {
                currentTemp: current.temperature,
                summary: current.summary,
                weekForecast: daily.summary,
                precipProb: daily.data[0].precipProbability,
            });
        }
    }); 
}

module.exports = weather;
