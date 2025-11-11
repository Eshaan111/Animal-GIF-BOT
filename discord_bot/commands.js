require('dotenv').config()
const util = require('./utils.js')
const search = require('./search.js')
// Get the game choices from game.js

function createCommandChoices() {
  const choices = search.getAnimalChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: util.capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}




// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};


const YO_COMMAND = {
  name: 'yo',
  description: 'yo command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const GIF_COMMAND = {
  name: 'goppu-gif',
  description: 'gif of an animal',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your object',
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 2],
};

// Command containing options

const ALL_COMMANDS = [TEST_COMMAND, YO_COMMAND, GIF_COMMAND];

util.InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
