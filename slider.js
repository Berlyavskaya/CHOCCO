const left = document.querySelector("#left");
const right = document.querySelector("#right");
const list = document.querySelector("#list");
const computed = getComputedStyle(list);

right.addEventListener("click",function(evt) {
    evt.preventDefault();

    let currentRight = parseInt(computed.right);

    if(!currentRight) {
        currentRight = 0;
    }
    if (currentRight<845) {
        list.style.right = currentRight + 845 + 'px';
    }
});
left.addEventListener("click",function(evt) {
    evt.preventDefault();

    let currentRight = parseInt(computed.right);

    if(!currentRight) {
        currentRight = 0;
    }
    if (currentRight>0) {
        list.style.right = currentRight - 845 + 'px';
    }
});

