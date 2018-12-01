const modal = (function () {
    /**
     * @param {Element} element 
     */
    function init(element) {

        let obj = {};
        let headerBlock =element.querySelector(".modal__header-text");
        let bodyBlock = element.querySelector(".modal__body");

        /**
         * @param {string} text 
         */
        const show = ({header = "", body ="" }) => {
            if (header && typeof header === 'string') {
                setText({header});
            }
            if (body && typeof body === "string") {
                setText({body});
            }

            element.classList.add('modal--show');
            document.body.classList.add('modal-opened');
            return obj;
        };

        const close = () => {
            element.classList.remove('modal--show');
            document.body.classList.remove('modal-opened');
            let transitionDuration = parseInt(element.style.transitionDuration) || 300;

            setTimeout(clearText, transitionDuration);
            return obj;
        };

        let closeBtn = element.querySelector(".modal__close");

        if (closeBtn) {
            closeBtn.addEventListener('click', close);
        }

        let backgroundBlock = element.querySelector('.modal__background');
        if (backgroundBlock) {
            backgroundBlock.addEventListener('click', close);
        }

        const clearText = () => {
            headerBlock.textContent = '';
            bodyBlock.textContent = '';
            return obj;
        };

        /**
         * @param {string} text 
         */
        const setText = ({header, body}) => {
            if (typeof header === 'string') {
                headerBlock.textContent = header;
            }
            if (typeof body === "string") {
                bodyBlock.textContent = body;
            }
            return obj;
        };

        obj = { element, setText, clearText, show, close };

        return obj;
    }

    return init;
})();