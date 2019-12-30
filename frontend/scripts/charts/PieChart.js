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
export default class PieChart extends Chart {


    /**
     * @constructor
     * @param {Object} data
     */
    constructor(data) {

        super(data);

        this.el = data.el;
        this.globalOptions = this.generateGlobalOptions();
        this.chartOptions = this.generateChartOptions();

        this.options = Object.assign({}, this.globalOptions, this.chartOptions);

        console.log(this.options);

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
                type: 'donut'
            },
            labels: this.data.labels,
            series: this.data.values,
            dataLabels: {
                enabled: true
            },
            plotOptions: {
                pie: {
                    customScale: 0.9,
                    donut: {
                        size: '50%'
                    }
                }
            },
            stroke: {
                show: false,
                opacity: 0,
                width: 0
            },
            grid: {
                show: false
            }

        }
    }


}
