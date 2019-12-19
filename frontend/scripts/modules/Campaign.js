// Lib
import Glide from '@glidejs/glide'

// Modules
import Charts from './Charts';

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
        this.questionsSelect = this.questionsContainer.querySelector('[data-questions="select"]');
        this.carouselContainer = this.container.querySelector('[data-questions="carousel"]');

        this.carousel = this.initCarousel(this.carouselContainer);
        this.carousel.mount({ arrowDisabler: this.arrowDisabler, selectChanger: this.selectChanger.bind(this) });

        this.charts = new Charts(this.questionsContainer);

        this.questionsSelect.addEventListener('change', (event) => this.onSelectChange(event));

    }

    /**
     * Initialize Questions Carousel
     *
     * @return {Void}
     */
    initCarousel(container) {

        if(!container) return;

        return new Glide('[data-questions="container"]', {
            type: 'slider',
            rewind: false
        });

    }

    onSelectChange(event) {

        this.carousel.go(`=${this.questionsSelect.selectedIndex}`);

    }


    /**
     * Select changer for Glide instance
     *
     * @param  {Class} Glide
     * @return {Object}
     */
    selectChanger(Glide) {

        const select = this.questionsContainer.querySelector('[data-questions="select"]');

        return {

            mount() {

                Glide.on(['mount.after', 'run'], () => select.selectedIndex = Glide.index);

            }

        }

    }


    /**
     * Glide Plugin for disabling and enabling arrows
     *
     * @param  {Class} Glide
     * @param  {Object} Components
     * @param  {Object} Events
     * @return {Object}
     */
    arrowDisabler(Glide, Components) {

        return {

            mount() {

                if (Glide.settings.rewind) return;

                Glide.on(['mount.after', 'run'], () => {

                    // Filter out arrows_control
                    for (let controlItem of Components.Controls.items) {

                        if (!controlItem.classList.contains('glide__arrows')) continue;

                        // Set left arrow state
                        var left = controlItem.querySelectorAll('.glide__arrow--left');

                        if (left) {

                            if (Glide.index === 0) left.forEach((arrow) => arrow.classList.add('disabled'));
                                else left.forEach((arrow) => arrow.classList.remove('disabled'));

                        }

                        var right = controlItem.querySelectorAll('.glide__arrow--right');

                        if (right) {

                            if (Glide.index === Components.Sizes.length - Glide.settings.perView) right.forEach((arrow) => arrow.classList.add('disabled'));
                                else right.forEach((arrow) => arrow.classList.remove('disabled'));

                        }

                    }
                })

            }
        }

    }

}
