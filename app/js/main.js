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
                    $("#popup").popup('show', message);
                }
            })
            .catch(reason => {
                $("#popup").popup('show', reason.message);
            });
    });

    /* order form handler (END) */

    /* reviews handlers */

    let author = "Константин Спилберг";

    let bodyText = `Мысли все о них и о них, о них и о них. Нельзя устоять, невозможно забыть... 
                    Никогда не думал, что булочки могут быть такими мягкими, котлетка такой сочной, а сыр таким расплавленным. 
                    Мысли все о них и о них, о них и о них. Нельзя устоять, невозможно забыть... 
                    Никогда не думал, что булочки могут быть такими мягкими, котлетка такой сочной, а сыр таким расплавленным.`;

    $(".reviews__review-link").on('click', function(e) {
        e.preventDefault();
        // modalReview.show({header: author, body: bodyText});
        $("#modal-review").modal('show', { header: author, body: bodyText });
    });

    /* reviews handlers (END)*/

    /* page slider */

    let count = $("html, body").scrollTop() / $(window).height(),
        maxCount = $("body .wrap>section").length;


    $("body .wrap").bind('DOMMouseScroll mousewheel', function(e) {
        let pageHeight = $(window).height();

        if (( e.originalEvent.wheelDeltaY || (e.originalEvent.detail * -1) ) < 0 && count < (maxCount - 1)) {
            // scroll down
            count += 1;
            $("html, body").animate({ scrollTop: count * pageHeight});
        } else if (( e.originalEvent.wheelDeltaY || (e.originalEvent.detail * -1) ) > 0 && count > 0) {
            // scroll up
            count -= 1;
            $("html, body").animate({ scrollTop: count * pageHeight});
        }
    });

});