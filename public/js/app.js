
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');


messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
        if (data.error){
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.temperature;
            messageTwo.textContent += data.forecast;
            messageTwo.textContent += data.dailyHigh;
            messageTwo.textContent += data.dailyLow;
            messageTwo.textContent += data.precip;
            

        }
    });
});


        console.log(location);
    })

// function showWeather(latitude,longitude) {
//     fetch('https://api.darksky.net/forecast/9423d58b5202586d3257290c377de9c1/' + latitude + ',' + longitude, {mode: 'no-cors'})
//     .then((response) => {
//         response.json((data) => {
//             console.log(data);
//         });
//     });
// }