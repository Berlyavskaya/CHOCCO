;const formOrder2 = document.querySelector ('#form-order');
const sendBtn2 = document.querySelector ('#send-btn');
var overlayBox = document.querySelector('.overlay-box');
var overlayTextTrue = document.querySelector('.overlay__text--true');
var overlayTextFalse = document.querySelector('.overlay__text--false');


sendBtn2.addEventListener ('click', function(evt){
    evt.preventDefault();

    sendBtn2.addEventListener('click', evt => {
        evt.preventDefault();
        
        // if (validateForm(formOrder)) {
        //     console.log ('все ок');
        // }

        
        
        var formdata = new FormData(formOrder);
        formdata.append('to', 'mail@mail.ru');

        var data = {
            name: formOrder2.elements.name.value,
            phone: formOrder2.elements.phone.value,
            comment: formOrder2.elements.comment.value,
            to: formdata.get('to')
        };

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        // console.log (xhr.open);
        xhr.send (formdata);
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                console.log('ошибка');
                overlayBox.style.display='flex';
                overlayTextTrue.style.display='none';
                overlayTextFalse.style.display='flex';            
            }
            else {
                console.log('ok');
                overlayBox.style.display='flex';
                overlayTextFalse.style.display='none';
                overlayTextTrue.style.display='flex';
            }
            
        })
    });

})