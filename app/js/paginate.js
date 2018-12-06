$(document).ready(function () {

    $(".paginator__link, .nav__link, a[href='#order']").on('click', function (e) {
        e.preventDefault();
        let $that = $($(this).attr('href'));
        $("html, body").animate({ scrollTop: $that.offset().top});
    });

});