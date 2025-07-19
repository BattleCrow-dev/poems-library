let currentToast;

function showToast(message, isSuccess = true) {

    if (currentToast) {
        currentToast.remove();
    }

    const toast = document.createElement("div");
    toast.className = `toast ${isSuccess ? 'success' : 'error'}`;
    toast.textContent = message;

    console.log(message);
    document.body.appendChild(toast);
    currentToast = toast;

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function copyPoem(event) {
    const button = event.target;

    const poemCard = button.closest('.poem-card');

    const poemTextElement = poemCard.querySelector('.poem-text');

    if (poemTextElement) {
        const poemText = poemTextElement.textContent || poemTextElement.innerText;
        navigator.clipboard.writeText(poemText)
            .then(() => {
                showToast('Текст стихотворения скопирован в буфер обмена', true);
            })
            .catch((err) => {
                showToast('Ошибка копирования текста: ' + err, false);
            });
    }
}


function loadPoems(poetId) {
    const filePath = `poems/poems_${poetId}.txt`;

    fetch(filePath)
        .then(response => response.text())
        .then(poems => displayPoems(poems))
        .catch(error => console.error('Ошибка при загрузке стихов:', error));
}

function displayPoems(poems) {
    const poemsListContainer = document.getElementById('poems-list-container');
    poemsListContainer.innerHTML = '';

    const poemsArray = poems.split('====');
    poemsArray.forEach(poemBlock => {
        const poemLines = poemBlock.split('\n');
        const poemTitle = poemLines[0];
        const poemText = poemLines.slice(1).join('<br>');

        const div = document.createElement('div');
        div.className = 'poem-card';
        div.innerHTML = `
            <h3 class="poem-title">${poemTitle}</h3>
            <p class="poem-text">${poemText}</p>
            <div class="poem-buttons">
                <button class="btn-copy">Скопировать</button>
                <button class="btn-share">Поделиться с бабушкой</button>
            </div>
        `;
        poemsListContainer.appendChild(div);
    });
}

function shareOnOdnoklassniki(event) {
    const button = event.target;

    const poemCard = button.closest('.poem-card');

    const poemTextElement = poemCard.querySelector('.poem-title');

    const odnoklassnikiParams = {
        url: window.location.href,
        title: poemTextElement.innerText,
        description: poemCard.innerText
    };

    const odnoklassnikiUrl = `https://connect.ok.ru/offer?url=${odnoklassnikiParams.url}&title=${odnoklassnikiParams.title}&description=${odnoklassnikiParams.description}`;

    showToast("Молодец, что помнишь о бабушке :)", true)

    window.open(odnoklassnikiUrl, 'Одноклассники', 'width=600,height=400');
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const poetId = urlParams.get('id');

    loadPoems(poetId);

    if (poetId === '1') {
        document.getElementById('poems-header').innerText = 'Стихи Пушкина А.С.';
    }
    else if (poetId === '2') {
        document.getElementById('poems-header').innerText = 'Стихи Лермонтова М.Ю.';
    }
    else if (poetId === '3') {
        document.getElementById('poems-header').innerText = 'Стихи Пашкова Д.С.';
    }
    else if (poetId === '4') {
        document.getElementById('poems-header').innerText = 'Стихи Маяковского В.В.';
    }
    else if (poetId === '5') {
        document.getElementById('poems-header').innerText = 'Стихи Есенина С.А.';
    }

    document.addEventListener('click', (event) => {
        const copyButton = event.target.closest('.btn-copy');
        if (copyButton) {
            copyPoem(event);
        }
    });

    document.addEventListener('click', (event) => {
        const shareButton = event.target.closest('.btn-share');
        if (shareButton) {
            shareOnOdnoklassniki(event);
        }
    });
});