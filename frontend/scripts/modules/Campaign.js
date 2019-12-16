// Lib
import Chart from 'chart.js';

/**
 * Class to handle all Campaign functionality
 *
 * @class Campaign
 */
export default class Campaign {

    constructor(container) {

        if(!container) return;

        this.container = container;

        this.chartContainer = this.container.querySelector('[data-question="chart"]');
        this.chartContext = this.chartContainer.getContext('2d');

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
                },
                title: {
                    display: true,
                    text: 'Question',
                    fontSize: 20,
                    padding: 50
                },
            }
        });

    }

    generateGradient() {

        let gradient = this.chartContext.createLinearGradient(0, 0, 0, 1000);
        gradient.addColorStop(0, this.rgba());
        gradient.addColorStop(1, this.rgba());

        return gradient;

    }

    rgba() {

        const o = Math.round, r = Math.random, s = 255;
        const color = o(r()*s);
        const grad = 'rgba(' + 0 + ',' + 0 + ',' + o(r()*s) + ',' + 1 + ')';

        return grad;

    }

}
