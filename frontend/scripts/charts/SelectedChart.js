// Lib
import ApexCharts from 'apexcharts';

// Base Chart
import Chart from './Chart';


/**
 * Selected Chart, extends Chart
 *
 * @class SelectedChart
 */
export default class SelectedChart extends Chart {


    /**
     * @constructor
     * @param {Object} data
     */
    constructor(data) {

        super(data);

        this.el = data.el;
        this.globalOptions = this.generateGlobalOptions(false);
        this.chartOptions = this.generateChartOptions();
        this.options = this.mergeDeep(this.globalOptions, this.chartOptions);

        this.chart = new ApexCharts(this.el, this.options);
        this.chart.render();

    }


    /**
     * Generating chart specific options
     * @return {Object}
     */
    generateChartOptions() {

        return {
            chart: {
                type: 'radialBar',
                height: '100%',
            },
            labels: this.data.labels,
            series: [50],
            title: {
                text: ''
            },
            stroke: {
                show: false,
                curve: 'smooth',
                lineCap: 'round',
                colors: '#FFF'
            },
            fill: {
                type: 'solid',
                colors: '#fff'
            },
            grid: { show: false },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: '70%',
                        background: 'transparent',
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: 'back',
                        dropShadow: {
                            enabled: true,
                            top: 3,
                            left: 0,
                            blur: 4,
                            opacity: 0
                        }
                    },
                    track: {
                        background: 'rgba(255, 255, 255, 0.25)',
                        strokeWidth: '100%',
                        margin: 0, // margin is in pixels
                        dropShadow: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        showOn: 'always',
                        name: {
                            offsetY: -10,
                            show: true,
                            color: '#FFF',
                            fontSize: '17px'
                        },
                        value: {
                            color: '#FFF',
                            fontSize: '36px',
                            show: true,
                            formatter: function(val) {
                                return parseInt(val) + '%';
                            }
                        }
                    }
                }
            },
            responsive: [
                {
                    breakpoint: 768,
                    options: {
                        chart: {
                            height: '200px',
                        },
                    },
                },
                {
                    breakpoint: 1024,
                    options: {
                        chart: {
                            height: '200px'
                        },
                        plotOptions: {
                            radialBar: {
                                hollow: {
                                    size: '70%',
                                },
                                track: {
                                    strokeWidth: '30%',
                                },
                                dataLabels: {
                                    showOn: 'always',
                                    name: {
                                        offsetY: 0,
                                        show: true,
                                        color: '#FFF',
                                        fontSize: '17px'
                                    },
                                    value: {
                                        offsetY: 0,
                                        color: '#FFF',
                                        fontSize: '16px',
                                        show: true,
                                    }
                                }
                            }
                        },
                    },
                },
            ]

        }

    }


}
