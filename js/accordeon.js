(function () {
    function toggleClass(item) {
        return function(e) {
            e.preventDefault();
            item.classList.toggle('menu__item-for--active');
        };
    }

    let menuItems = document.querySelectorAll('.menu__list .menu__item-for');

    for (let item of menuItems) {
        let trigger = item.querySelector('.menu__item-trigger');
        trigger.addEventListener("click", toggleClass(item));
    }
})();