document.addEventListener("DOMContentLoaded", async function () {
    loadRandomPoem();

    loadPoems(1);
    loadPoems(2);
    loadPoems(3);
    loadPoems(4);
    loadPoems(5);

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        const pathArray = window.location.pathname.split("/");
        const currentPath = pathArray[pathArray.length - 1];

        if (currentPath === link.getAttribute("href")) {
            link.classList.add("disabled");
        }
    });

    document.addEventListener('click', (event) => {
        const copyButton = event.target.closest('.btn-go1');
        if (copyButton) {
            window.location.href = `poems.html?id=1`;
        }
    });

    document.addEventListener('click', (event) => {
        const copyButton = event.target.closest('.btn-go2');
        if (copyButton) {
            window.location.href = `poems.html?id=2`;
        }
    });

    document.addEventListener('click', (event) => {
        const copyButton = event.target.closest('.btn-go3');
        if (copyButton) {
            window.location.href = `poems.html?id=3`;
        }
    });

    document.addEventListener('click', (event) => {
        const copyButton = event.target.closest('.btn-go4');
        if (copyButton) {
            window.location.href = `poems.html?id=4`;
        }
    });

    document.addEventListener('click', (event) => {
        const copyButton = event.target.closest('.btn-go5');
        if (copyButton) {
            window.location.href = `poems.html?id=5`;
        }
    });
    
});

let currentToast;


function loadPoems(poetId) {
    const filePath = `poems/poems_${poetId}.txt`;

    fetch(filePath)
        .then(response => response.text())
        .then(poems => displayPoems(poems, poetId))
        .catch(error => console.error('Ошибка при загрузке стихов:', error));
}

function displayPoems(poems, poetId) {
    const poemsListContainer = document.getElementById('poems-container');

    const poemsArray = poems.split('====');
    poemsArray.forEach(poemBlock => {
        const poemLines = poemBlock.split('\n');
        const poemTitle = poemLines[0];
        const poemText = poemLines.slice(1).join('<br>');

        const div = document.createElement('div');
        div.className = 'poem-card-main';
        div.innerHTML = `
            <h3 class="poem-title">${poemTitle}</h3>
            <p class="poem-text">${poemText}</p>
            <div class="poem-buttons">
                <img src="images/poet${poetId}.jpg" class="main-poem-author">
                <button class="btn-go${poetId}">К стихам автора</button>
            </div>
        `;
        poemsListContainer.appendChild(div);
    });
}

function loadRandomPoem() {
    const randomPoemContainer = document.getElementById("random-poem-container");
    const randomPoemName = document.getElementById("random-poem-name");

    const randomPoemNumber = Math.floor(Math.random() * 5) + 1;

    const filePath = `poems/poems_${randomPoemNumber}.txt`;

    fetch(filePath)
        .then(response => response.text())
        .then(poemText => {
            const poems = poemText.split('====');
            const [title, ...lines] = getRandomElement(poems, 0).split('\n');

            randomPoemName.innerHTML = title;
            randomPoemContainer.innerHTML = `<div id="random-poem">${lines.join('<br>')}</div>`;
        })
        .catch(error => {
            console.error("Error loading random poem:", error);
            randomPoemContainer.innerHTML = "Ошибка загрузки случайного стиха.";
        });
}


function getRandomElement(array, x) {
    return array[x + Math.floor(Math.random() * (array.length - x))];
}

function createPoemCard(content) {
    const poemCard = document.createElement("div");
    poemCard.classList.add("poem-card");

    const poemContent = document.createElement("p");
    poemContent.textContent = content;

    poemCard.appendChild(poemContent);

    return poemCard;
}