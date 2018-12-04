const onYouTubeIframeAPIReady = (function () {

    let player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('yt-player', {
            height: '405',
            width: '660',
            videoId: 'M7lc1UVf-VE',
            playerVars: {
                controls: 0,
                disablekd: 0,
                modestbranding: 1,
                rel: 0,
                autoplay: 0,
                showinfo: 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': togglePlayerDisplay
            }
        });
    }

    function onPlayerReady() {
        const duration = player.getDuration();
        let interval;
        let $item = $(".player__time-scale .player__scale-circle");
        clearInterval(interval);
        setInterval(() => {
            const completed = player.getCurrentTime();
            const percent = (completed / duration) * 100;

            changeCirclePossition($item, percent);
        }, 1000);
    }

    function togglePlayerDisplay(event) {
        
        // -1 – воспроизведение видео не началось
        // 0 – воспроизведение видео завершено
        // 1 – воспроизведение
        // 2 – пауза
        // 3 – буферизация
        // 5 – видео находится в очереди

        switch (event.data) {
            case 1:
                $(".player").addClass("player--active");
                $(".player__splash-screen").hide();
                break;
            case 2:
                $(".player").removeClass("player--active");
                break;
        }
    }

    $(".player__btn").on('click', e => {
        const playerStatus = player.getPlayerState();

        if (playerStatus !== 1) {
            player.playVideo();
        } else {
            player.pauseVideo();
        }
    });

    function computeScale($item, func) {
        return function (e) {
            const bar = $(e.currentTarget);
            const newButtonPossition = e.pageX - bar.offset().left;
            const clickerPrecent = (newButtonPossition / bar.width()) * 100;

            changeCirclePossition($item, clickerPrecent, func);
        };
    }

    $(".player__time-scale .player__scale-line").on('click',
        computeScale($(".player__time-scale .player__scale-circle"), ({ percent }) => {
            const newPlayerTime = (player.getDuration() / 100) * percent;
            player.seekTo(newPlayerTime);
        })
    );

    $(".player__volume-scale .player__scale-line").on('click',
        computeScale($(".player__volume-scale .player__scale-circle"), ({ percent }) => {
            player.setVolume(percent);
        })
    );

    $('.player__volume-btn').on('click', function() {
        // let volume = player.isMuted() ? 100 : 0;
        // player.setVolume(volume);
        
        // changeCirclePossition($(".player__volume-scale .player__scale-circle"), volume);
    });

    function changeCirclePossition($item, percent, func) {
        $item.css({
            left: `${percent}%`
        });

        if (typeof func === 'function') {
            func({
                item: $item,
                percent
            });
        }
    }

    return onYouTubeIframeAPIReady;

})();



