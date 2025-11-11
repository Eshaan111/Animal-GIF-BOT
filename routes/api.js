const express = require('express')
const apiRouter = express.Router();
const config = require('../config/config');
const api_key = config.apiKey;

apiRouter.use(express.json());

apiRouter.get('/config', (req, res) => {
    res.json({
        search_limit: config.searchLimit
    })
})


apiRouter.get('/search', (req, res) => {

    query = req.query;
    phrase = query.phrase;
    animal = query.animal;
    fetch(`https://tenor.googleapis.com/v2/search?q=${animal} ${phrase}&key=${api_key}&client_key=my_test_app&limit=${config.searchLimit}`)
        .then(resolve => { return resolve.json() })
        .then(data => {
            console.log(data);
            res.send(data); //syntax = obj {next : <> , results : ARRAY OF OBJECTS <>}
        })
})

module.exports = apiRouter;
