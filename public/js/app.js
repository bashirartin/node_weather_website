const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = 'Location: ' + data.location
            messageTwo.textContent = 'Temperature: ' + data.temperature
            messageThree.textContent = 'Wind Speed: ' + data.wind_speed
            messageFour.textContent = 'Humidity: ' + data.humidity
        }
    })
})

})