const left = document.getElementById("left");
const right = document.getElementById("right");
const list = document.getElementById("list");
const computed = getComputedStyle(list);

const minRight = 0;
const maxRight = list.offsetWidth;
const step = list.offsetWidth;
let currentRight = 0;
console.log(maxRight);

list.style.right = currentRight + 'px';

right.addEventListener("click",function(evt) {
    evt.preventDefault();    
    if (currentRight < maxRight) {
        currentRight += step;
        list.style.right = currentRight + 'px';
    } else {
        currentRight = minRight;
        list.style.right = currentRight + 'px';
    }
});

left.addEventListener("click",function(evt) {
    evt.preventDefault();

    if (currentRight>minRight) {
        currentRight -= step;
        list.style.right = currentRight + 'px';
    } else {
        currentRight = maxRight;
        list.style.right = currentRight + 'px';
    }
});

