$(document).ready(function () {

    $(".paginator__link").on('click', function (e) {
        e.preventDefault();
        let $that = $($(this).attr('href'));
        $("html, body").animate({ scrollTop: $that.offset().top});
    });

});