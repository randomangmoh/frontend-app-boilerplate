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

        this.type = data.type
        this.count = this.data.answers.length;


        this.chart = new ChartJS(this.element, {
            type: this.type,
            data: {
                labels: this.generateLabels(this.data.answers),
                datasets: [{
                    data: this.generateValues(this.data.answers),
                    borderWidth: 0,
                    fill: this.type === 'line' ? false : true,
                    borderColor: this.type === 'line' ? this.generateGradient(random({ count: this.count, hue: 'blue', luminosity: 'bright' })) : false,
                    backgroundColor: this.generateGradients(this.count)
                }]
            },
            options: this.generateOptions()
        });


        this.generateGlobalOptions();


    }


    generateGlobalOptions() {

        ChartJS.defaults.global.elements.point.radius = 2;

    }


    /**
     * Generate options depending on chart type
     *
     * @return {Object} options
     */
    generateOptions() {

        const options = {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: true,
                position: 'bottom',
                align: 'left',
                onClick: false,
                labels: {
                    fontColor: 'white',
                    padding: 20,
                    boxWidth: 20
                }
            }
        };

        switch (this.type) {
            case 'pie':
                break;
            case 'bar':

                options['scales'] = {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                };

                options['legend'] = false;

                break;

            case 'radar':

                options['scale'] = {
                    gridLines: {
                        color: 'rgba(255, 255, 255, .15)',
                    },
                    ticks: {
                        display: true,
                        backdropColor: 'rgba(255, 255, 255, .15)',
                        fontColor: 'white',
                        fontSize: 14,
                        padding: 30
                    },
                    pointLabels: {
                        fontSize: 14,
                    }
                };

                options['legend'] = false;

                break;

            case 'polarArea':

                options['scale'] = {
                    gridLines: {
                        color: 'rgba(255, 255, 255, .15)',
                    },
                    ticks: {
                        display: false,
                        backdropColor: 'rgba(255, 255, 255, .15)',
                        fontColor: 'white',
                        fontSize: 14,
                        padding: 30,
                        z: 1
                    },
                    pointLabels: {
                        fontSize: 14,
                    }
                };

                break;
            default:

        }

        return options;

    }



    /**
     * Generate data options/values
     *
     * @return {Object} data
     */
    generateData() {


        const data = {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: true,
                position: 'bottom',
                align: 'left',
                onClick: false,
                labels: {
                    fontColor: 'white',
                    padding: 20,
                    boxWidth: 20
                }
            }
        };

        switch (this.type) {
            case 'pie':
                break;
            case 'bar':
                break;
            case 'radar':
                break;
            default:

        }

        return data;


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

        for (var i = 0; i < length; i++) gradients.push(this.generateGradient(baseColor[i]));

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


}
