(function($) {

    $.fn.popup = function(command = 'init', value = null) {
        let $that = this;
        let $textBlock = this.find(".popup__text");

        const commands = {
            show: function(text) {
                if (text && typeof text === 'string') {
                    this.setText(text);
                }

                $that.addClass("popup--show");
                $("body").addClass("modal-opened");
                return $that;
            },
            close: function() {
                $that.removeClass('popup--show');
                $("body").removeClass('modal-opened');

                let transitionDuration = parseInt($that.css('transition-duration') || 300);
                setTimeout(this.clearText, transitionDuration);
                return $that;
            },
            setText: function(text) {
                if (typeof text === 'string') {
                    $textBlock.text(text);
                }
                return $that;
            },
            clearText: function() {
                $textBlock.text('');
                return $that;
            }
        };

        $that.find(".popup__close, .popup__background")
            .on('click', commands.close);

        if (typeof command === 'function') {
            commands[command](value);
        }

        return this;
    };

})(jQuery);