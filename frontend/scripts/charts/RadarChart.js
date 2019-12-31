// Lib
import ApexCharts from 'apexcharts';

// Base Chart
import Chart from './Chart';


/**
 * Radar Chart, extends Chart
 *
 * @class RadarChart
 */
export default class RadarChart extends Chart {


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
            plotOptions: {
                radar: {
                    polygons: {
                        strokeColors: 'rgba(255, 255, 255, 0.05)',
                        connectorColors: 'rgba(255, 255, 255, 0.05)',
                        fill: {
                            colors: ['transparent']
                        }
                    }
                }
            },
            fill: {
                type: 'gradient',
                colors: this.colors,
                gradient: {
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: .1,
                    inverseColors: false,
                    opacityFrom: .5,
                    opacityTo: .1,
                    stops: [0, 100],
                    gradientToColors: this.colors
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            tooltip: {
                followCursor: true
            },
            markers: {
                size: 8,
                strokeColors: this.colors,
                strokeWidth: 3,
                fillOpacity: 0,
                colors: this.backgroundColor,
                hover: {
                    size: 10,
                }
            },
            legend: { show: false },
            grid: { show: false }

        }

    }


}
