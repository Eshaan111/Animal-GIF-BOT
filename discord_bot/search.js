require('dotenv').config()
const util = require('./utils.js')

const Animal = {
  cat: {
    description: 'looks and feels like a cat',
  },
  dog: {
    description: 'looks and feels like a dog',
  },
  monkey: {
    description: 'looks and feels like a monkey',
  },
  pegion: {
    description: 'looks and feels like a pegion',
  },
};

function getAnimalChoices() {
  return Object.keys(Animal);
}


function getShuffledOptions() {
  const allChoices = getAnimalChoices();
  const options = [];

  for (let c of allChoices) {
    // Formatted for select menus
    // https://discord.com/developers/docs/components/reference#string-select-select-option-structure
    options.push({
      label: util.capitalize(c),
      value: c.toLowerCase(),
      description: RPSChoices[c]['description'],
    });
  }

  return options.sort(() => Math.random() - 0.5);
}

module.exports = {getAnimalChoices,getShuffledOptions}

