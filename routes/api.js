const express = require('express')
const apiRouter = express.Router();
const config = require('../config/config');
const api_key = config.apiKey;

apiRouter.use(express.json());

// console.log('API KEY FROM API.js', api_key);

// apiRouter.get('/', async (req, res) => {
//     console.log('Api Route Get Request ')
//     query = req.query  // RETURNS JS OBJECT 
//     phrase = query.phrase;
//     console.log(`queries = `, query)
//     console.log('phrase = ', phrase)
//
//     const response = await fetch(`https://tenor.googleapis.com/v2/search?q=${phrase}&key=${api_key}&client_key=my_test_app&limit=8`)
//     if (!response.ok) {
//         throw new Error('Tenor Api Error', response)
//
//     }
//     const data = await response.json()
//     console.log('tenor response', data)
//
//     res.json({
//         message: 'success',
//         data: query,
//     });
//     // res.status(404).send('not-found');
// })

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
