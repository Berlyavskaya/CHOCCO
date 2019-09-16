;const elem2 = document.querySelector(".vertical-accord__list");
// const trigger = document.querySelector(".vertical-accord__trigger");
let lastActive2; 
const item2 = document.querySelector ('.vertical-accord__item');

elem2.addEventListener ('click', function(evt) {
    evt.preventDefault();
    
    if (evt.target.classList.contains("vertical-accord__trigger")) {
        if (lastActive2) {
            lastActive2.classList.remove("vertical-accord__item--active");
        }
        lastActive2 = evt.target.parentNode;
        lastActive2.classList.add("vertical-accord__item--active");
    }
    if (evt.target.classList.contains("close")) {
        lastActive2.classList.remove("vertical-accord__item--active");
    }
})
