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