const accordeon = (function() {
    /**
     * @callback callback
     * @param {Element} item
     */

    /**
     * 
     * @param {Element} item 
     * @param {string} activeClass 
     * @param {callback} func
     */
    function toggleClass(item, activeClass, func) {
        return function(e) {
            e.preventDefault();
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
            trigger.addEventListener("click", toggleClass(item, activeClass, func));
        }

        return items;
    }

    return init;
})();