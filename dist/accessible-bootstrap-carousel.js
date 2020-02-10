"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

var _abcDescriptions = require("./js/abc-descriptions");

var _abcPopup = require("./js/abc-popup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $accesibleCarousels = (0, _jquery.default)('.accessible-carousel');

var initAccessibleCarousels = function initAccessibleCarousels() {
  $accesibleCarousels.each(function (index, value) {
    var $this = (0, _jquery.default)(this);
    var $descriptions = $this.find('.carousel-descriptions');
    var elementId = '#' + $this.attr('id');
    var interval = $this.data('interval');
    var indicatorCurrentText = '(Current)';
    var descriptionPlacement = $this.data('description-placement');
    var $from;
    var $to;
    var $fromDescription;
    var $toDescription;
    var $fromIndicator;
    var $toIndicator;
    $this.find('.carousel-item:first-child').addClass('active');
    $this.find('.carousel-indicators li:first-child').addClass('active');
    $this.carousel({
      interval: interval
    });
    $this.on('slide.bs.carousel', function onSlide(ev) {
      $from = '.carousel-item:nth-child(' + (ev.from + 1) + ')';
      $to = '.carousel-item:nth-child(' + (ev.to + 1) + ')';
      $fromIndicator = '.carousel-indicators li:nth-child(' + (ev.from + 1) + ')';
      $toIndicator = '.carousel-indicators li:nth-child(' + (ev.to + 1) + ')';

      if (descriptionPlacement == "under") {
        $fromDescription = '.carousel-descriptions__item:nth-child(' + (ev.from + 1) + ')';
        $toDescription = '.carousel-descriptions__item:nth-child(' + (ev.to + 1) + ')';
        (0, _jquery.default)(this).find($fromDescription).fadeOut(300);
        (0, _jquery.default)(this).find($toDescription).delay(300).fadeIn(300);
      }
    });
    $this.on('slid.bs.carousel', function onSlide(ev) {
      (0, _jquery.default)(this).find($from).attr('aria-hidden', 'true');
      (0, _jquery.default)(this).find($to).removeAttr('aria-hidden');
      (0, _jquery.default)(this).find($fromIndicator).find('.carousel-tools__indicators-current').html('');
      (0, _jquery.default)(this).find($toIndicator).find('.carousel-tools__indicators-current').html(indicatorCurrentText);
    });
    $this.find('a[data-modal="true"]').on('click', function () {
      (0, _abcPopup.openCarouselPopup)($this);
    });
    $this.find('.carousel-tools__play-pause-button').on('click', function (e) {
      var pauseText = (0, _jquery.default)(this).data('pause');
      var playText = (0, _jquery.default)(this).data('play');
      (0, _jquery.default)(this).tooltip('dispose');

      if ((0, _jquery.default)(this).hasClass('paused')) {
        (0, _jquery.default)(this).toggleClass('paused');
        (0, _jquery.default)(elementId).carousel('cycle');
        var text = pauseText;
        (0, _jquery.default)(this).attr('data-original-title', text);
        (0, _jquery.default)(this).find('span').text(text);
      } else {
        (0, _jquery.default)(this).toggleClass('paused');
        (0, _jquery.default)(elementId).carousel('pause');
        var _text = playText;
        (0, _jquery.default)(this).attr('data-original-title', _text);
        (0, _jquery.default)(this).find('span').text(_text);
      }

      (0, _jquery.default)(this).tooltip('enable');
    });
    $this.find('.carousel-tools__hide-button').on('click', function (e) {
      var $toggleElements = (0, _jquery.default)(elementId).find('.carousel-player, .carousel-descriptions, .carousel-tools__play-pause-button, .carousel-tools__indicators');
      var hideText = (0, _jquery.default)(this).data('hide');
      var showText = (0, _jquery.default)(this).data('show');

      if ((0, _jquery.default)(this).hasClass('hidden')) {
        (0, _jquery.default)(this).toggleClass('hidden');
        (0, _jquery.default)(elementId).carousel('cycle');
        var text = hideText;
        (0, _jquery.default)(this).attr('data-original-title', text);
        (0, _jquery.default)(this).find('span').text(text);
        (0, _jquery.default)($toggleElements).show();
      } else {
        (0, _jquery.default)(this).toggleClass('hidden');
        (0, _jquery.default)(elementId).carousel('pause');
        var _text2 = showText;
        (0, _jquery.default)(this).attr('data-original-title', _text2);
        (0, _jquery.default)(this).find('span').text(_text2);
        (0, _jquery.default)($toggleElements).hide();
      }
    });
  });
}; // INIT


(0, _jquery.default)(function () {
  (0, _jquery.default)('[data-toggle="tooltip"]').tooltip();
  (0, _abcDescriptions.initDescriptionPlacement)();
  initAccessibleCarousels();
  (0, _abcPopup.initCarouselPopupLayout)();
}); // ON RESIZE

(0, _jquery.default)(window).on('resize', function () {
  (0, _abcDescriptions.calculateDescriptionHeight)();
});