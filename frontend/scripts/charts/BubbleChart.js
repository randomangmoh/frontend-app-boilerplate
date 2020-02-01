// Lib
import ApexCharts from 'apexcharts';

// Base Chart
import Chart from './Chart';


/**
 * Bubble Chart, extends Chart
 *
 * @class BubbleChart
 */
export default class BubbleChart extends Chart {


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
                type: 'bubble',
                height: '100%',
            },
            labels: this.data.labels,
            series: [{
                data: this.data.values
            }],
            fill: {
                type: 'solid',
            },
            stroke: {
                lineCap: 'round'
            },
            title: {
                text: ''
            },
            grid: { show: false },
            plotOptions: {}

        }

    }


}
