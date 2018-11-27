(function ($) {

    function initSlider($element) {
        $element.find('.slider__slides').css({
            'position': 'relative',
            'overflow': 'hidden'
        });

        let $slides = $element.find(".slider__slide");
        $slides.each(function (i) {
            $(this).css({
                'position': 'absolute',
                'width': '100%',
                'left': `${i * 100}%`
            });
        });
    }

    function initSliderBtns($element) {
        let $prevBtn = $element.find('.slider__btn--prev');
        let $nextBtn = $element.find('.slider__btn--next');

        let $slides = $element.find(".slider__slide");
        let count = 0, maxCount = $slides.length;

        const translateX = (direction) => {
            $slides.each(function (i) {
                $(this).css('left', `${i * 100 - (count - direction) * 100}%`);
            });
            return count - direction;
        };

        $prevBtn.on('click', function () {
            if (count > 0) {
                count = translateX(1);
            }
        });

        $nextBtn.on('click', function () {
            if (count < maxCount - 1) {
                count = translateX(-1);
            }
        });
    }

    $.fn.slider = function () {
        initSlider(this);
        initSliderBtns(this);
        return this;
    };
})(jQuery);
