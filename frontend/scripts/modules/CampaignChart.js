// Lib
import Chart from 'chart.js';

/**
 * Class to handle all Campaign Charts
 *
 * @class Campaign
 */
export default class CampaignChart {


    /**
     * @constructor
     * @param {HTMLElement} container
     */
    constructor(container, opts = {}) {

        this.container = this.container;
        this.context = this.container.getContext('2d');

        this.chart = new Chart(this.chartContainer, {
            type: 'pie',
            data: {
                labels: ['Yes', 'No', 'Maybe'],
                datasets: [{
                    fillColor: [this.generateGradient(), this.generateGradient()],
                    data: [243, 984, 544],
                    borderWidth: 0,
                    backgroundColor: [
                        this.generateGradient(),
                        this.generateGradient(),
                        this.generateGradient()
                    ]
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: 'white',
                        padding: 50,
                        boxWidth: 30
                    }
                }
            }
        });

    }


    /**
     * Generate gradients for the charts
     * @return {HTMLElement}
     */
    generateGradient() {

        let gradient = this.chartContext.createLinearGradient(0, 0, 0, 1000);
        gradient.addColorStop(0, this.rgba());
        gradient.addColorStop(1, this.rgba());

        return gradient;

    }


    /**
     * Generate a random RGB value
     * @return {String}
     */
    rgba() {

        const o = Math.round, r = Math.random, s = 255;
        const color = o(r()*s);
        const grad = 'rgba(' + 0 + ',' + 0 + ',' + o(r()*s) + ',' + 1 + ')';

        return grad;

    }

}
