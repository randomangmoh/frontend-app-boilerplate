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
                type: this.data.type,
            },
            labels: this.data.labels,
            series: this.data.values,
            plotOptions: {
                pie: {
                    customScale: 0.9,
                    expandOnClick: false,
                    donut: {
                        size: '50%',
                        labels: {
                            show: this.data.type === 'donut' ? true : false,
                            name: {
                                color: '#FFF'
                            },
                            value: {
                                color: 'rgba(255, 255, 255, 0.5)'
                            }
                        }
                    }
                },
            },
            stroke: {
                show: true,
                opacity: 1,
                width: 0,
                colors: ['#130c26']
            },
            grid: {
                show: false
            }

        }

    }


}
