    const path = require('path')
    const disc = require('discord-interactions')
    const express = require('express');
    const app = express();
    const apiRout = require('./routes/api.js');
    const discordBotRout = require('./routes/discord_bot.js');
    require('dotenv').config();
    const PORT = process.env.PORT || 3000;


    app.use(express.static('./public/'));
    app.use('/api', apiRout)
    app.use('/interactions', discordBotRout)

    app.get('/', (req, res) => {
        console.log('get landing request , serving index.html')
        res.sendFile(path.join(__dirname, "public", 'index.html'))
    })

    app.listen(PORT, () => {
    console.log('Listening on port', PORT);
    });

    module.exports = app;
