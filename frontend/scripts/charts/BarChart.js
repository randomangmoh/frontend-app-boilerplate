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

        console.log(this.data);

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
            series: [
                {
                    name: 'Series',
                    data: this.data.values
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '95%',
                    dataLabels: {
                        position: 'center'
                    },
                    colors: {
                        ranges: [{
                            from: 0,
                            to: 1,
                        }],
                        colors: ['#131244', '#162559', '#315584', '#42D6D6', '#48F2E4'],
                        backgroundBarColors: ['#131244', '#162559', '#315584', '#42D6D6', '#48F2E4'],
                        backgroundBarOpacity: .25,
                    },
                }
            },
            dataLabels: {
                style: {
                    fontSize: '15px',
                    colors: ["#FFF"]
                }
            },
            xaxis: {
                enabled: false,
                labels: {
                    rotate: -45
                },
                categories: this.data.labels,
                color: '#FFF'
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
