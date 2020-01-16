import $ from 'jquery';
import magnificPopup from 'magnific-popup';

const $accesibleCarousels = $('.accessible-carousel');

function initCarouselPopupLayout() {

    $accesibleCarousels.each(function (index, value) {
        let $this = $(this);
        let $modalButton = $(this).find('.carousel-item__link');
        let carouselModal = $this.data('modal');

        if (carouselModal == true) {
            let iconButton = `<span class="btn btn-link carousel-item__open-modal-button">
                            <i class="icon fa fa-search-plus"></i><span class="sr-only">Se bilderna i större format</span>
                        </span>`
            $modalButton.append(iconButton);
        }

        $modalButton.on('click', function (ev) {
            ev.preventDefault();

            openCarouselPopup($this);
        });
    });
}

function openCarouselPopup(el) {
    let $this = el;

    let $el = '<span class="btn btn-link carousel-item__open-modal-button">';
    $el += '<i class="icon fa fa-search-plus"></i><span class="sr-only">Se bilderna i större format</span>';
    $el += '</span>';

    $this.find('.carousel-inner').magnificPopup({
        delegate: 'a',
        type: 'image',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
            tPrev: $this.data('carousel-left'),
            tNext: $this.data('carousel-right'),
            tCounter: '%curr% / %total%'
        },
        image: {
            tError: '<a href="%url%">Bilden #%curr%</a> kunde inte laddas.',
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        },
        tLoading: $this.data('loading-text') +' #%curr%...',
        tClose: '@Html.Translate("/carousel/close") (Esc)',
        closeMarkup: '<button title="%title%" type="button" class="mfp-close">' + $this.data('close-text') + '<span class="fa fa-times-circle"></span></button>',
    });
}

export { initCarouselPopupLayout, openCarouselPopup };