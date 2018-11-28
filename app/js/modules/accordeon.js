const accordeon = (function () {
    /**
     * @callback callback
     * @param {Element} item
     */

    /**
     * 
     * @param {Element} item 
     * @param {string} activeClass 
     * @param {NodeListOf<Element>} items
     * @param {callback} func
     */
    function toggleClass(item, activeClass, items, func) {
        return function (e) {
            e.preventDefault();

            // close another
            for (let el of items) {
                if (el !== item && el.classList.contains(`${activeClass}`)) {
                    if (typeof func === 'function') {
                        func(el);
                    }
                    el.classList.remove(`${activeClass}`);
                }
            }

            if (typeof func === 'function') {
                func(item);
            }

            item.classList.toggle(`${activeClass}`);
        };
    }

    /**
     * @param {string} itemsSelector 
     * @param {string} activeClass
     * @param {callback} func
     */
    function init(itemsSelector, activeClass, func) {
        let items = document.querySelectorAll(itemsSelector);
        for (let item of items) {
            let trigger = item.querySelector(`${itemsSelector}-trigger`);
            trigger.addEventListener("click", toggleClass(item, activeClass, items, func));
        }

        return items;
    }

    return init;
})();

(function ($) {

    function toggleClass(activeClass, func) {
        return function (e) {
            e.preventDefault();

            $(`.${activeClass}`).removeClass(activeClass);

            if (typeof func !== "undefined") {
                func(this);
            }
            
            $(this).parent().toggleClass(activeClass);
        };
    }

    function init({
        triggerSelector = '.acc__head',
        activeClass = 'acc__active',
        func = () => {}
    }) {
        let $trigger = $(triggerSelector);
        $trigger.on('click', toggleClass(activeClass, func));
    }

    $.fn.accordeon = function (options = {
        triggerSelector : 'acc__head',
        activeClass : 'acc__active',
        func: () => {}
    }) {

        init.apply(this, [options]);
        return this;
    };

})(jQuery);