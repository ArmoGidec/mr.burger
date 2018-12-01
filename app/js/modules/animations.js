export const slideY = (function () {

    /**
     * @param {Element} element 
     * @param {Number} start 
     * @param {Number} end 
     */
    function animate(element, start, end) {
        let elementTransition = element.style.transition;
        element.style.transition = '';

        requestAnimationFrame(function () {
            element.style.height = start + 'px';
            element.style.transition = elementTransition;
            requestAnimationFrame(function () {
                element.style.height = end + 'px';
                // requestAnimationFrame(function () { element.removeAttribute('style'); });
            });
        });
    }

    /**
     * @param {Element} element 
     */
    function expand(element) {
        animate(element, 0, element.scrollHeight);
    }

    /**
     * @param {Element} element 
     */
    function collapse(element) {
        animate(element, element.scrollHeight, 0);
    }


    return { collapse, expand };
})();