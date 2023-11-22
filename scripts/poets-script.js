document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        const pathArray = window.location.pathname.split("/");
        const currentPath = pathArray[pathArray.length - 1];

        if (currentPath === link.getAttribute("href")) {
            link.classList.add("disabled");
        }
    });
});