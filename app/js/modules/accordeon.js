const accordeon = (function() {
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
    function toggleClass(item, activeClass,items, func) {
        return function(e) {
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

(function($) {
    $.fn.accordeon = function(options = {
        direction: 'horizontal',
        subjectSelector: "subject", 
        triggerSellector: "trigger",
    }) {
        let subject = this.find(subjectSelector);
        this.find(triggerSellector).on('click', slide);
        return this;
    };

})(jQuery);