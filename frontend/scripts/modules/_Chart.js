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
            data: this.generateData(),
            options: this.generateOptions()
        });


        this.generateGlobalOptions();

    }


    generateData() {

        const data = {
            labels: this.generateLabels(this.data.answers),
            datasets: [{
                data: this.generateValues(this.data.answers),
                borderWidth: 0,
                fill: this.type === 'line' ? false : true,
                borderColor: this.type === 'line' ? this.generateGradient(random()) : false,
                backgroundColor: this.generateGradients(this.count)
            }]
        };

        console.log('data', data);

        return data;


    }



    /**
     * Generate Global options within the charts
     * @return {Void}
     */
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
            devicePixelRatio: 2,
            tooltips: {
                mode: 'index',
                position: 'nearest',
                backgroundColor: 'rgba(19, 12, 38, .75)',
                titleFontSize: 17,
                bodyFontSize: 15,
                xPadding: 10,
                yPadding: 10,
                caretSize: 0,
                cornerRadius: 0
            },
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

            // Pie Chart
            case 'pie':
                break;

            // Bar Chart
            case 'bar':

                options['scales'] = {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    gridLines: {
                        color: 'rgba(255, 255, 255, .15)',
                        tickMarkLength: 50,
                        borderDash: [3]
                    }
                };

                options['legend'] = false;

                break;

            // Radar Chart
            case 'radar':

                options['scale'] = {
                    gridLines: {
                        color: 'rgba(255, 255, 255, .15)',
                        tickMarkLength: 50,
                        borderDash: [3]
                    },
                    ticks: {
                        display: true,
                        backdropColor: 'rgba(255, 255, 255, 0)',
                        fontColor: 'white',
                        fontSize: 14,
                        padding: 100,
                        z: 1
                    },
                    pointLabels: {
                        fontSize: 12,
                        padding: 20
                    }
                };

                options['legend'] = false;

                break;

            // Polar Area Chart
            case 'polarArea':

                options['scale'] = {
                    gridLines: {
                        color: 'rgba(255, 255, 255, .15)',
                        tickMarkLength: 50,
                        borderDash: [3]
                    },
                    ticks: {
                        display: true,
                        backdropColor: 'rgba(255, 255, 255, 0)',
                        fontColor: 'white',
                        fontSize: 14,
                        padding: 100,
                        z: 1
                    },
                    pointLabels: {
                        fontSize: 12,
                        padding: 20
                    }
                };

                break;
            case 'bubble':

                options['scales'] = {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Happiness"
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "GDP (PPP)"
                        }
                    }]
                }

                options['legend'] = false;

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
            hue: 'blue',
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
        gradient.addColorStop(0, color.lighten(50).toHexString());
        gradient.addColorStop(1, color.darken(20).toHexString());

        return gradient;

    }


}
