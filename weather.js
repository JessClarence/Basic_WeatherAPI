const { json } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended: true}));

app.get('/' , (req, res) =>{
    res.sendFile(__dirname + "/index.html");
});
app.post('/forecast' , (req, res)=>{
    const keyId = "7e640d2462f1e82599c06a3d3c430003";
    const query = req.body.cityName;
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${keyId}&units=${unit}`;
    https.get(url, (response)=>{
        response.on('data' , (d)=>{
            const weatherData = JSON.parse(d);
            const icon = weatherData.weather[0].icon;
            const temp  = weatherData.main.temp;
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<p>The temperature in ${query} is currently</p>`);
            res.write(`<h1>${temp} degrees Celsius</h1>`);
            res.write(`<img src=${imageURL}>`);
            res.send();
        });
    });
});




app.listen(port, ()=>{
    console.log('...servers running at port ' + port);
});