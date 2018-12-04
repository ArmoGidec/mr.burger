

$(document).ready(function () {

    class VideoPlayer {
        constructor(id, options = {
            src: '',
            height: undefined,
            width: undefined,
            events: {
                'onReady': undefined,
                'onStateChange': undefined
            }
        }) {
            let element = document.getElementById(id);
            if (element) {
                this.element = element;
                this.element.src = options.src;

                if (typeof options.height !== 'undefined') {
                    this.element.height = options.height;
                }

                if (typeof options.width !== 'undefined') {
                    this.element.width = options.width;
                }

                if (typeof options.events.onReady === 'function') {
                    this.element.addEventListener('canplaythrough', function() {
                        options.events.onReady();
                    });
                }

                if (typeof options.events.onStateChange === 'function') {
                    this.element.addEventListener('play', function(e) {
                        options.events.onStateChange(e);
                    });
                    this.element.addEventListener('pause', function(e) {
                        options.events.onStateChange(e);
                    });
                }
            }
            this.status = 'not started yet';
        }

        getDuration() {
            return this.element.duration;
        }

        getCurrentTime() {
            return this.element.currentTime;
        }

        playVideo() {
            this.status = 'play';
            this.element.play();
        }

        pauseVideo() {
            this.status = 'pause';
            this.element.pause();
        }

        getPlayerState() {
            return this.status;
        }

        seekTo(seconds) {
            this.element.currentTime = seconds;
        }

        setVolume(volume) {
            this.element.volume = volume;
        }
    }

    let player = new VideoPlayer('work-player', {
        src: 'https://www.videvo.net/videvo_files/converted/2016_11/preview/GOPR6239_1.mov34724.webm',
        width: 660,
        height: 405,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': togglePlayerDisplay
        }
    });

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

    function togglePlayerDisplay(event) {

        // -1 – воспроизведение видео не началось
        // 0 – воспроизведение видео завершено
        // 1 – воспроизведение
        // 2 – пауза
        // 3 – буферизация
        // 5 – видео находится в очереди

        console.log(event);
        

        switch (event.type) {
            case 'play':
                $(".player").addClass("player--active");
                $(".player__splash-screen").hide();
                break;
            case 'pause':
                $(".player").removeClass("player--active");
                break;
        }
    }

    $(".player__btn").on('click', e => {
        const playerStatus = player.getPlayerState();

        if (playerStatus !== 'pause') {
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

});