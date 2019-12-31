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
                type: 'donut',
            },
            labels: this.data.labels,
            series: this.data.values,
            plotOptions: {
                pie: {
                    customScale: 0.9,
                    expandOnClick: false,
                    donut: {
                        size: this.data.type === 'pie' ? '5%' : '50%',
                        labels: {
                            show: this.data.type === 'pie' ? false : true,
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
                opacity: .2,
                lineCap: 'round',
                width: 5,
                curve: 'straight',
                colors: this.backgroundColor
            },
            grid: {
                show: false
            }

        }

    }


}
