import $ from 'jquery';

const $accesibleCarousels = $('.accessible-carousel');

function initDescriptionPlacement () {
    $accesibleCarousels.each(function (index, value) {
        let $this = $(this);
        let descriptionPlacement = $this.data('description-placement');
        let $descriptionsWrapper = $this.find('.carousel-descriptions');
        let $descriptionItem = $this.find('.carousel-caption');
        
        if(descriptionPlacement != "under" || descriptionPlacement == null) {
            // console.log("Over");
            $descriptionsWrapper.remove();
        } else {
            // console.log("Under");
            $descriptionItem.each(function (index, value) {
                let $el = '<li class="carousel-descriptions__item">' + $(this).html() +'</li>';
                $descriptionsWrapper.append($el);
                $(this).remove();
            });
            $descriptionsWrapper.find('.carousel-descriptions__item:first-child').show();
        }
    });
    
    calculateDescriptionHeight();
}


function calculateDescriptionHeight () {
    $accesibleCarousels.each(function (index, value) {
        let $this = $(this);
        let minHeight = 0;
        let descriptionPlacement = $this.data('description-placement');
        let $descriptionsWrapper = $this.find('.carousel-descriptions');
        let $descriptionItem = $this.find('.carousel-descriptions .carousel-descriptions__item');
        
        if(descriptionPlacement === "under") {
            $descriptionItem.each(function (index, value) {
                let $item = $(this);
                if($item.outerHeight() > minHeight) {
                    minHeight = $item.outerHeight();
                }
            });
        }
        $descriptionsWrapper.css('min-height', minHeight + 5);
    });
};

export { initDescriptionPlacement, calculateDescriptionHeight }