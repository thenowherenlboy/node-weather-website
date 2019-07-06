const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiZGlja3NvbmgiLCJhIjoiY2p4aTByNTl6MHd1YzN5bzhhbGpibHptdCJ9.5OYznwHacMI8c6228vJMoQ&limit=1';

    request( { url, json: true }, (error, {body}) => {
        if (error) {
            callback({ error: 'Location Services not available. Please try agian'}, undefined);
        } else if (body.features.length === 0) {
            callback({ error: 'Unable to find location. Try another search.'}, undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name 
            });
        }
    });
};

module.exports = geocode;