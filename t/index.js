const express = require('express')
const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/search/:lat/:lng', (req, res) => {

    var Twitter = require('twitter');

    var client = new Twitter({
    consumer_key: 'IER3A4Cot9rfADJpKqZcaIXUF',
    consumer_secret: 'KtLmJ0wpExzc0zxtYhJlgpJ9l6EsRs6vmHXBY37JQOpClcIu87',
    access_token_key: '200629663-ZOzWFuRGiYZIQQV5V5Ejv2oRDgfnqbymE2xAnwTB',
    access_token_secret: 'sEtQj1OrqZqkbg5aDHgSkyEVS4Pr9UYw4hVKrVpBEQdPD'
    });

/*var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }
});*/

client.get('https://api.twitter.com/1.1/search/tweets.json?q=&count=50&geocode='+req.params.lat+','+req.params.lng+',20km', {}, (error, tweets, response) => {
    res.send(tweets);
});

})
app.listen(3000, () => console.log('Example app listening on port 3000!'))
