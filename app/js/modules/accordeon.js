export const accordeon = (function () {
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

    function slideBody(triggerSelector, itemSelector, activeClass, func) {
        let $that = this;
        return function (e) {
            e.preventDefault();

            let $parent = $(this).parent(itemSelector);

            let $another = $that.find(`.${activeClass}`).not($parent);
            $another.removeClass(activeClass);

            if (typeof func === "function") {
                func($another.find(triggerSelector));
                func($(this));
            }

            $parent.toggleClass(activeClass);
        };
    }

    function init(subjectSelector) {
        this.find(subjectSelector).slideUp();
    }

    $.fn.accordeon = function ({
        itemSelector = '.acc__item',
        triggerSelector = '.acc__head',
        subjectSelector = '.acc__body',
        func = () => { },
        activeClass = 'acc__item--active'
    }) {
        init.apply(this, [subjectSelector]);
        this.find(triggerSelector).on('click', slideBody.apply(this, [triggerSelector, itemSelector, activeClass, func]));
        return this;
    };

})(jQuery);