activateUserMenu();
moveInputLabels()
//  profile icon functionality in navbar
function activateUserMenu() {
    const userMenu = document.getElementById('user-menu');
    const userMenuToggler = document.getElementById('user-menu-toggler');

    userMenuToggler.addEventListener('mouseenter', () => {
        userMenu.classList.remove('d-none')
    });
    userMenuToggler.addEventListener('mouseleave', () => {
        userMenu.classList.add('d-none')
    })
}
// make labels of the inputs move up when the input field is filled
function moveInputLabels() {
    const inputFields = document.getElementsByTagName('input');
    for (const field of inputFields) {
        field.addEventListener('keyup', () => {
            toggleFilledCLass(field);
        })
    }

    const selectFields = document.getElementsByTagName('select');
    for (const field of selectFields) {
        field.addEventListener('change', () => {
            toggleFilledCLass(field);
        })
    }
}
function toggleFilledCLass(field) {
    if (field.value !== '') {
        field.closest('.form-input-container').querySelector('.form-input').classList.add('filled');
    } else {
        field.closest('.form-input-container').querySelector('.form-input').classList.remove('filled');
    }
}