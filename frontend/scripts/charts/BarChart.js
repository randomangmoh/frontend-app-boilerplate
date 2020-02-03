// Lib
import ApexCharts from 'apexcharts';
import Chroma from 'chroma-js';

// Base Chart
import Chart from './Chart';


/**
 * Bar Chart, extends Chart
 *
 * @class BarChart
 */
export default class BarChart extends Chart {


    /**
     * @constructor
     * @param {Object} data
     */
    constructor(data) {

        super(data);

        this.el = data.el;
        this.globalOptions = this.generateGlobalOptions();
        this.chartOptions = this.generateChartOptions();
        this.options = this.mergeDeep(this.globalOptions, this.chartOptions);

        this.chart = new ApexCharts(this.el, this.options);
        this.chart.render();

    }


    /**
     * Generating chart specific options
     *
     * @return {Object}
     */
    generateChartOptions() {

        return {
            chart: {
                type: this.data.type,
            },
            labels: this.data.labels,
            series: [
                {
                    name: 'Answers: ',
                    data: this.data.values
                }
            ],
            title: {
                align: 'left',
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: .9,
                    stops: [0, 100]
                }
            },
            legend: { show: false },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '95%',
                    distributed: true,
                    dataLabels: {
                        position: 'center'
                    },
                    colors: {
                        ranges: [{
                            from: 0,
                            to: 1,
                        }],
                        backgroundBarColors: ['#FFF'],
                        backgroundBarOpacity: .02,
                    },
                }
            },
            xaxis: {
                type: 'categories'
            },
            yaxis: {
                title: {
                    text: 'Answers',
                },
            },
            grid: {
                show: true
            }

        }

    }


}
