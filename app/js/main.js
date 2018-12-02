$(document).ready(function () {

    /* modal page menu handler */

    function toggleMenu(action = 'show', options = {
        cancelEvent: false,
    }) {
        let method = action === 'close' ? 'removeClass' : 'addClass';
        return function (event) {
            if (options.cancelEvent) {
                event.preventDefault();
            }
            $('#modal-menu')[method]("modal-menu--open");
            $("body")[method]("modal-opened");
        };
    }

    // for (let link of document.querySelectorAll(".modal-menu .modal-menu__link")) {
    //     link.addEventListener('click', toggleMenu('close'));
    // }

    $("#menu-link").on('click', toggleMenu('show', { cancelEvent: true }));
    $("#modal-menu__close").on('click', toggleMenu('close', { cancelEvent: true }));

    /* modal page menu handler (END)*/


    /* slider handler */

    $("#burger-slider").slider();

    /* slider handler (END) */

    /* accordeon handers */

    $(".menu__list").accordeon( {
        itemSelector: '.menu__item',
        activeClass: "menu__item--active",
        triggerSelector: '.menu__item-trigger'
    });

    $(".team__list").accordeon({
        itemSelector: '.team__member',
        activeClass: 'team__member--active',
        func: $item => {
            $item.next(".team__member-description").slideToggle();
        }
    });

    /* accordeon handers (END) */

    // init popup
    // let popup = topop(document.querySelector("#popup"));

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