console.log('Client side script loaded')

document.getElementById('weatherForm').addEventListener('submit', (event) => {
    event.preventDefault()

    const address = document.getElementById('address').value
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML='Fetching Weather...'
    fetch('http://localhost:3000/forecast?search='+address)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(!data.error)
                resultDiv.innerHTML = `Temperature : ${data.temperature} and Feels Like : ${data.feelsLike}`
            else
                resultDiv.innerHTML = data.error
        })
})
