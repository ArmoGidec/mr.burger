document.addEventListener('DOMContentLoaded', function () {

    /* modal page menu handler */

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

    /* modal page menu handler (END)*/


    /* slider handler */

    $("#burger-slider").slider();

    /* slider handler (END) */

    /* accordeon handers */
    let teamItems = accordeon('.team__list .team__member', 'team__member--active', item => {
        let element = item.querySelector('.team__member-description');
        let method = !item.classList.contains('team__member--active') ? 'expand' : 'collapse';
        slideY[method](element);
    });

    let menuItems = accordeon('.menu__list .menu__item', 'menu__item--active');
    /* accordeon handers (END) */

    // init popup
    let popup = topop(document.querySelector("#popup"));

    /* order form handler */

    $('.order form.order__form').on('submit', function (e) {
        e.preventDefault();
        $that = $(this);
        let data = {};
        for (let input of $that.find("input, textarea")) {
            data[input.name] = input.value;
        }

        fetch($that.attr('action'), {
            method: $that.attr('method'),
            body: JSON.stringify(data),
            headers: new Headers({ 'Content-Type': 'application/json' })
        }).then(response => response.json())
            .then(value => {
                let message = value.status === 1 || value.status === 0 ? value.message : null;
                if (message) {
                    popup.show(message);
                }
            })
            .catch(reason => {
                popup.show(reason.message);
            });
    });

    /* order form handler (END) */

    /* reviews handlers */
    let modalReview = modal(document.querySelector("#modal-review"));

    let author = "Константин Спилберг";

    let bodyText = `Мысли все о них и о них, о них и о них. Нельзя устоять, невозможно забыть... 
                    Никогда не думал, что булочки могут быть такими мягкими, котлетка такой сочной, а сыр таким расплавленным. 
                    Мысли все о них и о них, о них и о них. Нельзя устоять, невозможно забыть... 
                    Никогда не думал, что булочки могут быть такими мягкими, котлетка такой сочной, а сыр таким расплавленным.`;

    function reviewHandler(e) {
        e.preventDefault();

        modalReview.show({header: author, body: bodyText});
    }

    for (let btn of document.querySelectorAll(".reviews__review-link")) {
        btn.addEventListener('click', reviewHandler);
    }
    /* reviews handlers (END)*/

});