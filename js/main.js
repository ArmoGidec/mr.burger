document.addEventListener('DOMContentLoaded', function () {
    let menuLink = document.getElementById('menu-link');
    let menuClose = document.getElementById('modal-menu__close');

    function toggleMenu(action = 'show', options = {
        cancelEvent: false,
    }) {
        let method = action === 'close' ? 'remove' : 'add';
        return function (event) {
            if (options.cancelEvent) {
                event.preventDefault();
            }
            let modalMenu = document.getElementById('modal-menu');
            modalMenu.classList[method]("modal-menu--open");
            document.body.classList[method]("modal-opened");
        };
    }

    menuLink.addEventListener('click', toggleMenu('show', { cancelEvent: true }));

    menuClose.addEventListener('click', toggleMenu('close', { cancelEvent: true }));

    for (let link of document.querySelectorAll(".modal-menu .modal-menu__link")) {
        link.addEventListener('click', toggleMenu('close'));
    }
});