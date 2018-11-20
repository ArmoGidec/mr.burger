const accordeon = (function() {
    function toggleClass(item, activeClass) {
        return function(e) {
            e.preventDefault();
            item.classList.toggle(`${activeClass}`);
        };
    }

    /**
     * @param {string} selector 
     * @param {string} activeClass
     */
    function init(itemsSelector, activeClass) {
        let items = document.querySelectorAll(itemsSelector);
        for (let item of items) {
            let trigger = item.querySelector(`${itemsSelector}-trigger`);
            trigger.addEventListener("click", toggleClass(item, activeClass));
        }

        return items;
    }

    return init;
})();