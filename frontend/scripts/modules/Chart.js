// Lib
import ChartJS from 'chart.js';
import { TinyColor, random } from '@ctrl/tinycolor';


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
                    data: this.generateValues(this.data.answers),
                    borderWidth: 0,
                    fill: this.data.type === 'line' ? false : true,
                    borderColor: this.data.type === 'line' ? this.generateGradient(random({ count: length, hue: 'blue', luminosity: 'bright' })) : false,
                    backgroundColor: this.generateGradients(this.count)
                }]
            },
            options: {
                responsive: true,
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

        return labels;

    }


    /**
     * Generate gradients for the chart
     *
     * @param  {Int}   length
     * @return {Array} gradients
     */
    generateGradients(length) {

        let gradients = [];
        let baseColor = random({
            count: length,
            hue: 'green',
            luminosity: 'bright'
        });

        for (var i = 0; i < length; i++) {

            gradients.push(this.generateGradient(baseColor[i]));

        }

        return gradients;

    }


    /**
     * Generate gradients for the charts
     *
     * @return {HTMLElement}
     */
    generateGradient(baseColor) {

        let color = baseColor;

        let gradient = this.context.createLinearGradient(0, 0, 0, 1000);
        gradient.addColorStop(0, color.lighten(20).toHexString());
        gradient.addColorStop(1, color.darken(20).toHexString());

        return gradient;

    }


    /**
     * Generate a random RGB value
     * @return {String}
     */
    rgba() {

        const o = Math.round, r = Math.random, s = 255;
        const color = o(r()*s);
        const grad = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + color + ',' + 1 + ')';

        return grad;

    }

}
