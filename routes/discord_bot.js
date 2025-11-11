const express = require('express')
const botRouter = express.Router();
const disc = require('discord-interactions')
const config = require('../config/config');



botRouter.post('/', disc.verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
    // Interaction id, type and data
    console.log('reaching');
    let { id, type, data } = req.body;


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
        else if (name === 'goppu-gif') {
            console.log(data)
            let animal = data.options[0].value;
            console.log(animal)
        // Send a message into the channel where command was triggered from
        return res.send({
            type: disc.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
            flags: disc.InteractionResponseFlags.IS_COMPONENTS_V2,
            components: [
                {
                type: disc.MessageComponentTypes.TEXT_DISPLAY,
                // Fetches a random emoji to send from a helper function
                content: `${animal} world`
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