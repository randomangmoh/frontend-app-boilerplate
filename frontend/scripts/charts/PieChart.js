// Lib
import ApexCharts from 'apexcharts';

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
            colors: this.colors,
            labels: this.data.labels,
            series: this.data.values,
            stroke: {
                show: false,
                opacity: 0,
                lineCap: 'butt',
                width: 0,
            },
            plotOptions: {
                pie: {
                    customScale: 0.9,
                    expandOnClick: false,
                    donut: {
                        size: this.data.type === 'pie' ? '0%' : '50%',
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
