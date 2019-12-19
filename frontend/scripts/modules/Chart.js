// Lib
import ChartJS from 'chart.js';

/**
 * Class to handle all Campaign Charts
 *
 * @class Campaign
 */
export default class Chart {


    /**
     * @constructor
     * @param {Object} data
     */
    constructor(data) {

        this.data = data;

        this.element = this.data.el;
        this.context = this.element.getContext('2d');

        this.count = this.data.answers.length;

        this.chart = new ChartJS(this.element, {
            type: this.data.type,
            data: {
                labels: this.generateLabels(this.data.answers),
                datasets: [{
                    fillColor: this.generateGradients(this.count),
                    data: this.generateValues(this.data.answers),
                    borderWidth: 0,
                    backgroundColor: this.generateGradients(this.count)
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                legend: {
                    display: true,
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
     * Generate Chart Values
     *
     * @param  {Array} answers
     * @return {Array} labels
     */
    generateValues(answers) {

        let values = [];

        answers.forEach((answer) => values.push(parseInt(answer.value)));

        return values;

    }


    /**
     * Generate Chart labels
     *
     * @param  {Array} answers
     * @return {Array} labels
     */
    generateLabels(answers) {

        let labels = [];

        answers.forEach((answer) => labels.push(answer.description));

        console.log(labels);

        return labels;

    }


    /**
     * Generate gradients for the chart
     * @param  {Int}   length
     * @return {Array} gradients
     */
    generateGradients(length) {

        let gradients = [];

        for (var i = 0; i < length; i++) {
            gradients.push(this.generateGradient());
        };

        return gradients;

    }


    /**
     * Generate gradients for the charts
     * @return {HTMLElement}
     */
    generateGradient() {

        let gradient = this.context.createLinearGradient(0, 0, 0, 1000);
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
