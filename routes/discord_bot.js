const express = require('express')
const botRouter = express.Router();
const disc = require('discord-interactions')
const config = require('../config/config');
const { get } = require('./discord_bot');

let url_array;    

async function getGif(animal, mood) {
  try {
    const response = await fetch(`https://tenor.googleapis.com/v2/search?q=${animal} ${mood}&key=${config.apiKey}&client_key=my_test_app&limit=${10}`);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.log('No results found');
      return null;
    }

    const random_int = Math.floor(Math.random() * Math.min(data.results.length, 10));
    const url = data.results[random_int].media_formats.gif.url;
    console.log('Fetched URL:', url);
    return url;
  } catch (error) {
    console.error('Error fetching gif:', error);
    return null;
  }
}

botRouter.post('/', disc.verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
    // Interaction id, type and data
    console.log('reaching');
    // console.log(req.body)
    let { id, type, data } = req.body;
    // console.log(id, type, data)


    /**
     * Handle verification requests
     */
    if (type === disc.InteractionType.PING) {
        return res.send({ type: disc.InteractionResponseType.PONG });
    }

    /**
     * Handle slash command requests
     * See https://discord.com/developers/docs/interactions/botRouterlication-commands#slash-commands
     */
    if (type === disc.InteractionType.APPLICATION_COMMAND) {
        const { name } = data;

        // "test" command
        if (name === 'test') {
        // Send a message into the channel where command was triggered from
        return res.send({
            type: disc.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
            flags: disc.InteractionResponseFlags.IS_COMPONENTS_V2,
            components: [
                {
                type: disc.MessageComponentTypes.TEXT_DISPLAY,
                // Fetches a random emoji to send from a helper function
                content: `hello world`
                }
            ]
            },
        });
        }else if (name === 'yo') {
        // Send a message into the channel where command was triggered from
        return res.send({
            type: disc.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
            flags: disc.InteractionResponseFlags.IS_COMPONENTS_V2,
            components: [
                {
                type: disc.MessageComponentTypes.TEXT_DISPLAY,
                // Fetches a random emoji to send from a helper function
                content: `yo world`
                }
            ]
            },
        });
        }
        else if (name === 'pet-gif') {
            console.log(data)
            let animal = data.options[0].value;
            let mood = data.options[1].value;
            const url = await getGif(animal, mood)
            console.log('yahaaa',url)
        // Send a message into the channel where command was triggered from
        return res.send({
            
            type: disc.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
            flags: disc.InteractionResponseFlags.IS_COMPONENTS_V2,
            components: [
                {
                type: disc.MessageComponentTypes.TEXT_DISPLAY,
                content: `${animal} ${mood}`
                },
                {
                type: 12,  // ComponentType.MEDIA_GALLERY
                items: [
                    {
                    media: {url: `${url}`},
                    description: "An aerial view looking down on older industrial complex buildings. The main building is white with many windows and pipes running up the walls."
                    }
                ]
                }
            ]
            },
        });
        }

        console.error(`unknown command: ${name}`);
        return res.status(400).json({ error: 'unknown command' });
    }

    console.error('unknown interaction type', type);
    return res.status(400).json({ error: 'unknown interaction type' });
});



module.exports = botRouter;