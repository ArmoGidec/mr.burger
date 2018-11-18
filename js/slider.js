const sliderInit = (function () {
    /**
     * инициализация слайдера
     * @param {HTMLElement} element 
     */
    let slidesElement, slides;

    function init(element) {
        slidesElement = element.querySelector('.slider__slides');
        slidesElement.style.position = 'relative';
        slidesElement.style.overflow = 'hidden';

        slides = element.querySelectorAll('.slider__slides .slider__slide');
        for (let i = 0, len = slides.length; i < len; i++) {
            let slide = slides[i];

            slide.style.position = 'absolute';
            slide.style.width = '100%';
            slide.style.left = `${i * 100}%`;
            slide.style.transition = '0.3s';
        }

        initSliderBtns(element);
    }

    /**
     * добавление обработчиков на кнопки слайдера
     * @param {HTMLElement} element 
     */
    function initSliderBtns(element) {
        let prevBtn = element.querySelector('.slider__btn--prev');
        let nextBtn = element.querySelector('.slider__btn--next');

        const translateX = (direction) => {
            for (let slide of slides) {
                let position = parseInt(slide.style.left);
                position += direction * 100;
                slide.style.left = `${position}%`;
            }
            return count - direction;
        };

        let count = 0, maxCount = slides.length;
        prevBtn.addEventListener('click', function () {
            if (count > 0) {
                count = translateX(1);
            }
        });

        nextBtn.addEventListener('click', function () {
            if (count < maxCount - 1) {
                count = translateX(-1);
            }
        });
    }

    return init;
})();
