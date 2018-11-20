// (function () {
//     function toggleClass(item) {
//         return function(e) {
//             e.preventDefault();
//             item.classList.toggle('menu__item--active');
//         };
//     }
//     let menuItems = document.querySelectorAll('.menu__list .menu__item');

//     for (let item of menuItems) {
//         let trigger = item.querySelector('.menu__item-trigger');
//         trigger.addEventListener("click", toggleClass(item));
//     }
// })();

// (function() {
//     function toggleClass(item) {
//         return function(e) {
//             e.preventDefault();
//             item.classList.toggle('team__member--active');
//         };
//     }

//     let menuItems = document.querySelectorAll('.team__list .team__member');

//     for (let item of menuItems) {
//         let trigger = item.querySelector('.team__member-trigger');
//         trigger.addEventListener("click", toggleClass(item));
//     }
// })();

const accordeon = (function() {
    function toggleClass(item, activeClass) {
        return function(e) {
            e.preventDefault();
            item.classList.toggle(`${activeClass}`);
        };
    }

    /**
     * @param {string} selector 
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