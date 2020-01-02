// Lib
import ApexCharts from 'apexcharts';

// Base Chart
import Chart from './Chart';


/**
 * Line Chart, extends Chart
 *
 * @class LineChart
 */
export default class LineChart extends Chart {


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

        const options = {
            chart: {
                type: this.data.type,
                foreColor: 'rgba(255, 255, 255, 0.2)'
            },
            labels: this.data.labels,
            series: [
                {
                    name: 'Series',
                    data: this.data.values
                }
            ],
            title: {
                align: 'center',
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    type: this.data.type === 'line' ? 'horizontal' : 'vertical',
                    opacityFrom: 0.7,
                    opacityTo: this.data.type === 'line' ? 0.9 : 0
                }
            },
            stroke: {
                curve: 'smooth',
                width: 5,
                colors: this.colors,
            },
            markers: {
                size: 6,
                strokeColors: 'rgba(255, 255, 255, 0.8)',
                strokeWidth: 3,
                fillOpacity: 0,
                colors: this.backgroundColor,
                hover: {
                    size: 8,
                }
            },
            dataLabels: {
                enabled: false,
                offsetY: 10,
                textAnchor: 'middle',
                style: {
                    colors: ['rgba(255, 255, 255, 0.4)']
                }
            },
            legend: { show: false },
            colors: ['#131244', '#162559', '#315584', '#42D6D6', '#48F2E4'],
            plotOptions: {},
            grid: {
                show: true
            }

        }

        if(this.data.type === 'line') {

            options.fill.gradient.colorStops = [
                {
                    offset: 0,
                    color: this.colors[0],
                    opacity: this.data.type === 'line' ? 1 : 0.25
                },
                {
                    offset: 25,
                    color: this.colors[1],
                    opacity: this.data.type === 'line' ? 1 : 0.25
                },
                {
                    offset: 50,
                    color: this.colors[2],
                    opacity: this.data.type === 'line' ? 1 : 0.25
                },
                {
                    offset: 75,
                    color: this.colors[3],
                    opacity: this.data.type === 'line' ? 1 : 0.25
                }
            ];

        } else {

        }

        return options;


    }


}
