import $ from 'jquery';

import { initDescriptionPlacement, calculateDescriptionHeight } from './js/abc-descriptions';
import { initCarouselPopupLayout, openCarouselPopup } from './js/abc-popup';

const $accesibleCarousels = $('.accessible-carousel');

let initAccessibleCarousels = function () {
    $accesibleCarousels.each(function (index, value) {
        const $this = $(this);
        const $descriptions = $this.find('.carousel-descriptions');
        const elementId = '#' + $this.attr('id');
        let interval = $this.data('interval');
        let indicatorCurrentText = '(Current)';
        let descriptionPlacement = $this.data('description-placement');
        let $from;
        let $to;
        let $fromDescription;
        let $toDescription;
        let $fromIndicator;
        let $toIndicator;

        $this.find('.carousel-item:first-child').addClass('active');
        $this.find('.carousel-indicators li:first-child').addClass('active');

        $this.carousel({ interval: interval });

        $this.on('slide.bs.carousel', function onSlide(ev) {
            $from = '.carousel-item:nth-child(' + (ev.from + 1) + ')';
            $to = '.carousel-item:nth-child(' + (ev.to + 1) + ')';

            $fromIndicator = '.carousel-indicators li:nth-child(' + (ev.from + 1) + ')';
            $toIndicator = '.carousel-indicators li:nth-child(' + (ev.to + 1) + ')';

            if (descriptionPlacement == "under") {
                $fromDescription = '.carousel-descriptions__item:nth-child(' + (ev.from + 1) + ')';
                $toDescription = '.carousel-descriptions__item:nth-child(' + (ev.to + 1) + ')';

                $(this).find($fromDescription).fadeOut(300);
                $(this).find($toDescription).delay(300).fadeIn(300);
            }

        })

        $this.on('slid.bs.carousel', function onSlide(ev) {
            $(this).find($from).attr('aria-hidden', 'true');
            $(this).find($to).removeAttr('aria-hidden');

            $(this).find($fromIndicator).find('.carousel-tools__indicators-current').html('');
            $(this).find($toIndicator).find('.carousel-tools__indicators-current').html(indicatorCurrentText);
        })

        $this.find('a[data-modal="true"]').on('click', function () {
            openCarouselPopup($this);
        });

        $this.find('.carousel-tools__play-pause-button').on('click', function (e) {
            let pauseText = $(this).data('pause');
            let playText = $(this).data('play');

            $(this).tooltip('dispose');

            if ($(this).hasClass('paused')) {
                $(this).toggleClass('paused');
                $(elementId).carousel('cycle');

                let text = pauseText;
                $(this).attr('data-original-title', text);
                $(this).find('span').text(text);
            } else {
                $(this).toggleClass('paused');
                $(elementId).carousel('pause');

                let text = playText;
                $(this).attr('data-original-title', text);
                $(this).find('span').text(text);
            }

            $(this).tooltip('enable');

        });

        $this.find('.carousel-tools__hide-button').on('click', function (e) {
            let $toggleElements = $(elementId).find('.carousel-player, .carousel-descriptions, .carousel-tools__play-pause-button, .carousel-tools__indicators');
            let hideText = $(this).data('hide');
            let showText = $(this).data('show');

            if ($(this).hasClass('hidden')) {
                $(this).toggleClass('hidden');
                $(elementId).carousel('cycle');

                let text = hideText;
                $(this).attr('data-original-title', text);
                $(this).find('span').text(text);
                $($toggleElements).show();
            } else {
                $(this).toggleClass('hidden');
                $(elementId).carousel('pause');

                let text = showText;
                $(this).attr('data-original-title', text);
                $(this).find('span').text(text);
                $($toggleElements).hide();
            }

        });
    });
}

// INIT
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    initDescriptionPlacement();
    initAccessibleCarousels();
    initCarouselPopupLayout();
})

// ON RESIZE
$(window).on('resize', () => {
    calculateDescriptionHeight();
})