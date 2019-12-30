import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';


/**
 * Class to handle all Charts in the Campaign page
 *
 * @class Charts
 */
export default class Charts {


    /**
     * @constructor
     * @param {HTMLElement} container
     */
    constructor(container) {

        if(!container) return;

        this.container = container;

        this.chartElements = this.container.querySelectorAll('[data-question="chart"]');
        this.chartData = this.getChartData(this.chartElements);
        this.charts = this.initializeCharts(this.chartData);

    }


    /**
     * Initialize all charts
     * @param  {Array} data
     * @return {Object}
     */
    initializeCharts(data) {

        let charts = {};

        data.forEach((item, i) => {

            charts[i] = {
                ...item,
                chart: this.chooseChart(item)
            };

        });

        return charts;

    }


    /**
     * Choose the chart type to instantiate
     * @param  {Object} type
     * @return {Class}
     */
    chooseChart(item) {

        // pie
        // donut
        // line
        // bar
        // area
        // candlestick
        // heatmap
        // radar
        // radialBar
        // bubble
        // scatter

        switch (item.type) {
            case 'pie':
            case 'donut':

                new PieChart(item);

                break;
            default:

        }

    }


    /**
     * Get chart data
     * @param  {Array} chartElements
     * @return {Array
     */
    getChartData(chartElements) {

        let charts = [];

        chartElements.forEach((chart) => {

            charts.push({
                el: chart,
                type: chart.getAttribute('data-chart-type') || 'pie',
                answers: JSON.parse(chart.getAttribute('data-answers')),
            });

        });

        return charts;

    }


}
