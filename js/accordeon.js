const accordeon = (function() {
    /**
     * @callback animationCallback
     * @param {Element} item
     */

    /**
     * 
     * @param {Element} item 
     * @param {string} activeClass 
     * @param {animationCallback} callback 
     */
    function toggleClass(item, activeClass, callback) {
        return function(e) {
            e.preventDefault();
            if (typeof callback === 'function') {
                callback.apply(this);
            }
            item.classList.toggle(`${activeClass}`);
        };
    }

    /**
     * @param {string} itemsSelector 
     * @param {string} activeClass
     * @param {animationCallback} callbackfn
     */
    function init(itemsSelector, activeClass, callbackfn) {
        let items = document.querySelectorAll(itemsSelector);
        for (let item of items) {
            let trigger = item.querySelector(`${itemsSelector}-trigger`);
            trigger.addEventListener("click", toggleClass(item, activeClass, callbackfn));
        }

        return items;
    }

    return init;
})();