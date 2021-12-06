const loginForm = document.getElementById('login-form');

var pristine = new Pristine(loginForm, {
    // class of the parent element where the error/success class is added
    classTo: 'form-input-container',
    errorClass: 'has-error',
    successClass: 'has-success',
    // class of the parent element where error text element is appended
    errorTextParent: 'form-input-container',
    // type of element to create for the error text
    errorTextTag: 'div',
    // class of the error text element
    errorTextClass: 'text-help' 
});

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // check if the form is valid
    var valid = pristine.validate(); // returns true or false
    if (valid) {
        loginForm.submit();
    }
});