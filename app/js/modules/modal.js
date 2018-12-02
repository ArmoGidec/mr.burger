(function ($) {

    $.fn.modal = function (command = "init", value = null) {
        let $that = this;
        let $headerBlock = this.find(".modal__header-text");
        let $bodyBlock = this.find(".modal__body");

        const commands = {
            show: function ({ header = "", body = "" }) {
                if (typeof header === 'string') {
                    this.setText({ header });
                }
                if (typeof body === 'string') {
                    this.setText({ body });
                }
                $that.addClass("modal--show");
                $("body").addClass("modal--opened");
                return $that;
            },
            close: function () {
                $that.removeClass("modal--show");
                $("body").removeClass("modal--opened");

                let transitionDuration = parseInt($that.css('transition-duration') || 300);

                setTimeout(this.clearText, transitionDuration);
                return $that;
            },
            setText: function ({ header, body }) {
                if (typeof header === 'string') {
                    $headerBlock.text(header);
                }
                if (typeof body === 'string') {
                    $bodyBlock.text(body);
                }

                return $that;
            },
            clearText: function () {
                $headerBlock.text('');
                $bodyBlock.text('');
                return $that;
            }
        };

        
        $that.find(".modal__background, .modal__close")
            .on('click', commands.close);

        if (typeof commands[command] === "function") {
            commands[command](value);
        }

        return $that;
    };

})(jQuery);