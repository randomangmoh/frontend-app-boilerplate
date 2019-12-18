// Lib
import Chart from 'chart.js';
import Glide from '@glidejs/glide'

/**
 * Class to handle all Campaign functionality
 *
 * @class Campaign
 */
export default class Campaign {

    constructor(container) {

        if(!container) return;

        this.container = container;

        this.questionsContainer = this.container.querySelector('[data-questions="container"]');
        this.carouselContainer = this.container.querySelector('[data-questions="carousel"]');
        this.carousel = this.initCarousel(this.carouselContainer);



    }

    /**
     * Initialize Questions Carousel
     * @return {Void}
     */
    initCarousel(container) {

        if(!container) return;

        return new Glide('[data-questions="container"]', {
            type: 'carousel'
        }).mount();

    }

}
