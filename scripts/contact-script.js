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

function submitForm() {
    const poetName = document.getElementById('poet-name').value;
    const poemTitle = document.getElementById('poem-title').value;
    const poemText = document.getElementById('poem-text').value;

    if (!poetName || !poemTitle || !poemText) {
        showToast("Пожалуйста, заполните все поля формы.", false);
        return;
    }

    showToast("Форма успешно отправлена! Спасибо за ваш стих!", true);
    document.getElementById('submit-poem-form').reset();
}

function displaySuccessMessage(message) {
    const successMessage = document.getElementById('success-message');
    successMessage.innerText = message;
    successMessage.style.display = 'block';

    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

function displayErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = message;
    errorMessage.style.display = 'block';

    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        const pathArray = window.location.pathname.split("/");
        const currentPath = pathArray[pathArray.length - 1];

        if (currentPath === link.getAttribute("href")) {
            link.classList.add("disabled");
        }
    });

    document.getElementById('submit-poem-form').addEventListener('submit', function (event) {
        event.preventDefault();
        submitForm();
    });
});