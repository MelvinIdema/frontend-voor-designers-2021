const searchFilter = document.querySelector(".search-filter");
const searchBar = document.querySelector(".search-bar input");

searchBar.addEventListener("click", _ => {
    searchFilter.classList.add("active");
})

let activeColor = document.querySelector(".color.active");
const colors = document.querySelectorAll(".color");

colors.forEach(color => {
    color.addEventListener("click", e => {
        activeColor.classList.remove("active");
        e.target.classList.add("active");
        activeColor = e.target;
    })
})