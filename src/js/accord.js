const element = document.querySelector(".vertical-accord__list");
// const trigger = document.querySelector(".vertical-accord__trigger");
let lastActive; 
const item = document.querySelector ('.vertical-accord__item');

element.addEventListener ('click', function(evt) {
    evt.preventDefault();
    
    if (evt.target.classList.contains("vertical-accord__trigger")) {
        if (lastActive) {
            lastActive.classList.remove("vertical-accord__item--active");
        }
        lastActive = evt.target.parentNode;
        lastActive.classList.add("vertical-accord__item--active");
    }
    if (evt.target.classList.contains("close")) {
        lastActive.classList.remove("vertical-accord__item--active");
    }
})
