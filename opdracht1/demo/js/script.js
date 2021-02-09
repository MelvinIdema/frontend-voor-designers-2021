const search = document.querySelector("#search");
const colorFilter = document.querySelector(".filter-menu");

search.addEventListener("focus", _ => {
    colorFilter.classList.add("show");
})

search.addEventListener("blur", _ => {
    colorFilter.classList.remove('show');
})