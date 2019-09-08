const formOrder = document.querySelector ('#form-order');
const sendBtn = document.querySelector ('#send-btn');
var overlayBox = document.querySelector('.overlay-box');

sendBtn.addEventListener ('click', function(evt){
    evt.preventDefault();

    sendBtn.addEventListener('click', evt => {
        evt.preventDefault();
        overlayBox.style.display='flex';
        
        // if (validateForm(formOrder)) {
        //     console.log ('все ок');
        // }

        
        
        var formdata = new FormData(formOrder);
        console.log (formdata);
        formdata.append('to', 'mail@mail.ru');

        var data = {
            name: formOrder.elements.name.value,
            phone: formOrder.elements.phone.value,
            comment: formOrder.elements.comment.value,
            to: formdata.get('to')
        };
        console.log (data);

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        console.log (xhr.open);
        xhr.send (JSON.stringify(formdata));
        xhr.addEventListener('load', () => {
            if (xhr.response.status) {
                console.log('ok');
                overlayBox.style.display='flex';
            }
            
        })
    });


    // function validateForm(form) {
    //     let valid = true;
    //     if (!validateField (form.elements.name)) {
    //         valid = false;
    //     }
    //     if (!validateField (form.elements.phone)){
    //         valid = false;
    //     }
    //         return valid;
    // }
    // function validateField(form__input) {
    //     if (!form__input.checkValidity()) {
    //         form__input.nextElementSibling.textContent = form__input.validationMessage;
    //         return false;
    //     } else {
    //         form__input.nextElementSibling.textContent = '';
    //         return true;
    //     }
    // }

    // console.log(formOrder.elements.name.value);
    // console.log(formOrder.elements.phone.value);
    // console.log(formOrder.elements.comment.value);

})