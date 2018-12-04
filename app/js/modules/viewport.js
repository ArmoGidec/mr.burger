;(function($){

    $.fn.viewport = function() {

        let $that = this;

        $(window).scroll(function() {

            let viewport = $that.filter(function() {
                return $(this).offset().top === $(window).scrollTop();
            });

            if (viewport.length) {
                $that.trigger('inview', [viewport]);
            }

        });

        return this;
    };

})(jQuery);