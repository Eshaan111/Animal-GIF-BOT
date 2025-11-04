const search_bar = document.getElementById('searchInput');
const search_btn = document.getElementById('searchBtn');
const results = document.getElementById('results');
const controls = document.getElementById('controls');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const downloadBtn = document.getElementById('downloadBtn');
const counter = document.getElementById('counter');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const modeButtons = document.querySelectorAll('.mode-btn');
const animalEmoji = document.getElementById('animalEmoji');
const animalName = document.getElementById('animalName');
const animalAdjective = document.getElementById('animalAdjective');
const searchInput = document.getElementById('searchInput');
const loadingAnimal = document.getElementById('loadingAnimal');

let count;
let curr_phrase;
let url_array = [];
let search_limit = 0;
let in_search = false;
let in_search_phrase = null;

fetch('/api/config')
    .then(result => { return result.json(); })
    .then(data => {
        console.log('Config Recieved from /api/config')
        console.log(data);
        search_limit = data['search_limit']
    })


const animalData = {
    cat: {
        emoji: '🐱',
        name: 'Cat',
        adjective: 'purrfect',
        placeholder: 'Search Tenor, Describe your cat (e.g., happy, sleepy, playful)...'
    },
    dog: {
        emoji: '🐶',
        name: 'Dog',
        adjective: 'pawsome',
        placeholder: 'Search Tenor, Describe your dog (e.g., happy, playful, excited)...'
    },
    monkey: {
        emoji: '🐵',
        name: 'Monkey',
        adjective: 'bananas',
        placeholder: 'Search Tenor, Describe your monkey (e.g., funny, silly, wild)...'
    },
    pigeon: {
        emoji: '🕊️',
        name: 'Pigeon',
        adjective: 'flying',
        placeholder: 'Search Tenor, Describe your pigeon (e.g., flying, cute, funny)...'
    }
};

let currentMode = 'cat';

modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mode = button.dataset.mode;

        // Update active state
        modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Update UI with animal data
        currentMode = mode;
        const data = animalData[mode];
        animalEmoji.textContent = data.emoji;
        animalName.textContent = data.name;
        animalAdjective.textContent = data.adjective;
        searchInput.placeholder = data.placeholder;
        loadingAnimal.textContent = mode;

        // Store current mode for search function
        window.currentAnimalMode = mode;
        if (in_search) {
            search(in_search_phrase)
        }

    });
});

// Initialize with cat mode
window.currentAnimalMode = 'cat';


function search(phrase) {
    in_search = true;
    in_search_phrase = phrase;
    curr_phrase = phrase;
    url_array = [];
    count = 1;
    counter.innerHTML = `${count} / ${search_limit}`
    fetch(`/api/search?animal=${currentMode}&phrase=${phrase}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Api req did not Resolve , server error", response.status);
            }
            return response.json();
        })
        .then(data => {
            count = 0;
            if (data.results.length == 0) {
                console.log('reaching');
                search(`${currentMode}`);
                return;
            }
            console.log(data['results'][0]['media_formats']['gif']['url']);
            let url = (data['results'][0]['media_formats']['gif']['url']);
            for (i = 0; i < Math.min(data.results.length, 49); i++) {
                url_array[(url_array).length] = (data['results'][i]['media_formats']['gif']['url']);
            }
            results.innerHTML = '';
            results.innerHTML = `<img src="${url_array[count]}" alt="Cat GIF">`;
            controls.classList.remove('hidden');
            controls.classList.add('shown');


        })
        .catch(error => {
            console.error(error);
        })

}

function nextScroll() {
    if (count + 1 == search_limit) {
        return
    }
    count++;
    counter.innerHTML = `${count + 1} / ${search_limit}`
    results.innerHTML = '';
    results.innerHTML = `<img src="${url_array[count]}" alt="Cat GIF">`;

}

function prevScroll() {
    if (count + 1 == 2) {
        return
    }
    count--;
    counter.innerHTML = `${count} / ${search_limit}`
    results.innerHTML = '';
    results.innerHTML = `<img src="${url_array[count]}" alt="Cat GIF">`;

}

async function download(phrase) {
    curr_url = url_array[count];
    const img_response = await fetch(curr_url);
    const blob = await img_response.blob();

    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = phrase;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
}

search_btn.addEventListener('click', () => {
    if (search_bar.value != '') {
        search(search_bar.value);
        search_bar.value = ''
    }

})

prevBtn.addEventListener('click', () => {
    prevScroll();
})

nextBtn.addEventListener('click', () => {
    nextScroll();

})

downloadBtn.addEventListener('click', () => {
    download(curr_phrase);

})

search_bar.addEventListener('keypress', (event) => {
    if (event.key == 'Enter' && search_bar.value != '') {
        search(search_bar.value);
        search_bar.value = ''
    }
})


