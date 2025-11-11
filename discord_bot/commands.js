require('dotenv').config()
const util = require('./utils.js')
// Get the game choices from game.js

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
// Command containing options

const ALL_COMMANDS = [TEST_COMMAND, YO_COMMAND];

util.InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
