const topop = (function () {

    /**
     * @param {Element} element 
     */
    function init(element) {

        let obj = {};
        let textBlock = element.querySelector(".popup__text");

        /**
         * @param {string} text 
         */
        const show = text => {
            if (text && typeof text === 'string') {
                setText(text);
            }

            element.classList.add('popup--show');
            document.body.classList.add('modal-opened');
            return obj;
        };

        const close = () => {
            element.classList.remove('popup--show');
            document.body.classList.remove('modal-opened');
            let transitionDuration = parseInt(element.style.transitionDuration) || 300;
            
            setTimeout(clearText, transitionDuration);
            return obj;
        };

        let closeBtn = element.querySelector(".popup__close");

        if (closeBtn) {
            closeBtn.addEventListener('click', close);
        }

        let backgroundBlock = element.querySelector('.popup__background');
        if (backgroundBlock) {
            backgroundBlock.addEventListener('click', close);
        }

        const clearText = () => {
            textBlock.textContent = '';
            return obj;
        };

        /**
         * @param {string} text 
         */
        const setText = (text) => {
            if (typeof text === 'string') {
                textBlock.textContent = text;
            }
            return obj;
        };

        obj = { element, setText, clearText, show, close };

        return obj;
    }

    return init;
})();