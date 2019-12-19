import Chart from './Chart';

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


    initializeCharts(data) {

        let charts = {};

        data.forEach((item, i) => {

            charts[i] = {
                ...item,
                chart: new Chart(item)
            };

        });

        return charts;

    }

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
