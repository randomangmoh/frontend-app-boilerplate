// Lib
import ApexCharts from 'apexcharts';
import Chroma from 'chroma-js';

/**
 * Class to handle all Campaign Charts
 *
 * @class Chart
 */
export default class Chart {



    /**
     * @constructor
     * @param {Object} data
     */
    constructor(data) {

        this.data = data;

        this.element = this.data.el;
        // this.context = this.element.getContext('2d');

        this.type = data.type;
        this.count = this.data.answers.length;

        this.globalOptions = this.generateGlobalOptions();
        this.chartOptions = this.generateChartOptions(this.type);
        this.palette = this.generatePalette();

        this.chart = new ApexCharts(this.element, this.chartOptions);
        this.chart.render();

    }


    /**
     * Generate the global options shared between
     * @return {[type]} [description]
     */
    generateGlobalOptions() {

        return {

            /**
             * Chart
             * @type {Object}
             */
            chart: {
                type: 'donut',
                toolbar: {
                    show: false
                },
            },

            /**
             * Labels
             * @type {Array}
             */
            labels: [],

            /**
             * Data
             * @type {Array}
             */
            series: [],


            /**
             * Legend
             * @type {Object}
             */
            legend: {
                position: 'bottom'
            },

            /**
             * Grid
             * @type {Object}
             */
            grid: {
                show: true,
                borderColor: 'rgba(255, 255, 255, 0.05)',
                strokeDashArray: 5,
                position: 'back',
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },

            /**
             * Tooltip
             * @type {Object}
             */
            tooltip: {
                x: {
                    show: false
                }
            },

            /**
             * Fill
             * @type {Object}
             */
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.25,
                    inverseColors: false,
                    opacityFrom: 0.1,
                    opacityTo: 0.1,
                    colorStops: [
                        {
                            offset: 25,
                            color: "#24B3E8",
                            opacity: 0.75
                        },
                        {
                            offset: 50,
                            color: "#51B748",
                            opacity: 0.75
                        },
                        {
                            offset: 75,
                            color: "#F27024",
                            opacity: 0.75
                        },
                        {
                            offset: 100,
                            color: "#EA0D80",
                            opacity: 0.75
                        }
                    ]
                }
            },

            /**
             * Theme
             * @type {Object}
             */
            theme: {
                mode: 'light'
            }
        }

    }


    generateChartOptions(chartType) {

        // Chart Types
        // pie
        // donut
        // line
        // bar
        // area
        // candlestick
        // heatmap
        // radar
        // radialBar
        // bubble
        // scatter
        //

        console.log(chartType);

        const options = {
            chart: {
                type: chartType
            }
        };

        switch (chartType) {

            /**
             * Pie Chart
             * @type {Array}
             */
            case 'pie':

                options.series = [30, 40, 35]

                break;

            /**
             * Doughnut Chart
             * @type {String}
             */
            case 'doughnut':
            case 'donut':

                options.chart.type = 'donut';
                options.series = [30, 40, 35, 50]

                break;

            /**
             * Bar Chart
             * @type {Object}
             */
            case 'bar':

                options.plotOptions = {
                    bar: {
                        horizontal: true,
                    }
                };
                options.dataLabels = {
                    enabled: false
                };

                options.series = [{
                    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
                }];

                options.xaxis = {
                    categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
                };

                break;

            /**
             * Radar Chart
             * @type {Array}
             */
            case 'radar':

                options.series = [{
                    name: 'Series 1',
                    data: [80, 50, 30, 40, 100, 20],
                }];

                options.title = {
                    text: 'Basic Radar Chart'
                };

                options.labels = ['January', 'February', 'March', 'April', 'May', 'June'];

                break;

            /**
             * Line Chart
             * @type {Array}
             */
            case 'line':

            options.series = [{
                name: 'Series 1',
                data: [80, 50, 30, 40, 100, 20],
            }];

            options.title = {
                text: 'Basic Radar Chart'
            };

            options.labels = ['January', 'February', 'March', 'April', 'May', 'June'];

                break;
            case 'polarArea':

                options.chart.type = 'area';

                options.series = [
                    {
                      name: "Series 1",
                      data: [2, 23, 19, 45, 38, 52, 45]
                    }
                ];

                break;
            case 'bubble':

                options.series = [
                    {
                      name: "Series 1",
                      data: [[20, 32, 45], [10, 0, 56]]
                    }
                ];

                break;
            default:

        }

        return Object.assign({}, this.globalOptions, options);

    }


    generatePalette() {

        return Chroma.scale(['#24B3E8','#51B748', '#F27024', '#EA0D80']).colors(4)

    }



}
