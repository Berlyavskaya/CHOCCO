;const left2 = document.getElementById("left");
const right2 = document.getElementById("right");
const list2 = document.getElementById("list");
const computed2 = getComputedStyle(list2);

const minRight2 = 0;
const maxRight2 = list.offsetWidth;
const step2 = list.offsetWidth;
let currentRight2 = 0;

list2.style.right = currentRight2 + 'px';

right2.addEventListener("click",function(evt) {
    evt.preventDefault();    
    if (currentRight2 < maxRight2) {
        currentRight2 += step2;
        list2.style.right = currentRight2 + 'px';
    } else {
        currentRight2 = minRight2;
        list2.style.right = currentRight2 + 'px';
    }
});

left2.addEventListener("click",function(evt) {
    evt.preventDefault();

    if (currentRight2>minRight2) {
        currentRight2 -= step2;
        list2.style.right = currentRight2 + 'px';
    } else {
        currentRight2 = maxRight2;
        list2.style.right = currentRight2 + 'px';
    }
});

