// Lib
import ApexCharts from 'apexcharts';
import Chroma from 'chroma-js';

// Base Chart
import Chart from './Chart';


/**
 * Pie Chart, extends Chart
 *
 * @class PieChart
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
                type: 'donut',
            },
            labels: this.data.labels,
            series: this.data.values,
            colors: this.colors,
            fill: {
                type: 'gradient',
                colors: this.colors,
                opacity: .7
            },
            stroke: {
                show: true,
                opacity: 0,
                lineCap: 'butt',
                width: 4,
                curve: 'smooth',
                colors: this.colors,
                dashArray: 20
            },
            plotOptions: {
                pie: {
                    customScale: 0.9,
                    expandOnClick: false,
                    donut: {
                        size: this.data.type === 'pie' ? '5%' : '50%',
                        labels: {
                            show: this.data.type === 'pie' ? false : true,
                            name: {
                                color: 'rgba(255, 255, 255, 0.8)'
                            },
                            value: {
                                color: 'rgba(255, 255, 255, 0.5)'
                            }
                        }
                    }
                },
            },
            grid: {
                show: false
            }

        }

    }


}
