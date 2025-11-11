    const path = require('path')
    const disc = require('discord-interactions')
    const express = require('express');
    const app = express();
    const apiRout = require('./routes/api.js');
    const discordBotRout = require('./routes/discord_bot.js');
    require('dotenv').config();
    const PORT = process.env.PORT || 3000;

    // import {
    //   disc.ButtonStyleTypes,
    //   disc.InteractionResponseFlags,
    //   disc.InteractionResponseType,
    //   disc.InteractionType,
    //   disc.MessageComponentTypes,
    //   disc.verifyKeyMiddleware,
    // } from 'discord-interactions';


    app.use(express.static('./public/'));
    app.use('/api', apiRout)
    app.use('/interactions', discordBotRout)

    app.get('/', (req, res) => {
        console.log('get landing request , serving index.html')
        res.sendFile(path.join(__dirname, "public", 'index.html'))
    })

    // app.post('/interactions', disc.verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
    // // Interaction id, type and data
    // console.log('reaching');
    // const { id, type, data } = req.body;

    // /**
    //  * Handle verification requests
    //  */
    // if (type === disc.InteractionType.PING) {
    //     return res.send({ type: disc.InteractionResponseType.PONG });
    // }

    // /**
    //  * Handle slash command requests
    //  * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
    //  */
    // if (type === disc.InteractionType.APPLICATION_COMMAND) {
    //     const { name } = data;

    //     // "test" command
    //     if (name === 'test') {
    //     // Send a message into the channel where command was triggered from
    //     return res.send({
    //         type: disc.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    //         data: {
    //         flags: disc.InteractionResponseFlags.IS_COMPONENTS_V2,
    //         components: [
    //             {
    //             type: disc.MessageComponentTypes.TEXT_DISPLAY,
    //             // Fetches a random emoji to send from a helper function
    //             content: `hello world`
    //             }
    //         ]
    //         },
    //     });
    //     }

    //     console.error(`unknown command: ${name}`);
    //     return res.status(400).json({ error: 'unknown command' });
    // }

    // console.error('unknown interaction type', type);
    // return res.status(400).json({ error: 'unknown interaction type' });
    // });

    app.listen(PORT, () => {
    console.log('Listening on port', PORT);
    });
