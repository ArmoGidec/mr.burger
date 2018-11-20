document.addEventListener('DOMContentLoaded', function () {

    /* modal menu handler */

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

    /* modal menu handler (END)*/


    /* slider handler */

    let bSlider = document.getElementById('burger-slider');
    sliderInit(bSlider);

    /* slider handler (END) */

    /* accordeon handers */
    let teamItems = accordeon('.team__list .team__member', 'team__member--active', function() {
        console.log(this);
    });
    let menuItems = accordeon('.menu__list .menu__item', 'menu__item--active');
    /* accordeon handers (END) */
});