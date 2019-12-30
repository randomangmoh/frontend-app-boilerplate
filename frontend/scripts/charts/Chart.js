/**
 * Chart base class, to be extended
 * by sppecific chart types
 *
 * @class Chart
 */
export default class Chart {


    /**
     * @constructor
     * @param {Object} data data passed from the template
     */
    constructor(data) {

        if(!data) throw Error('No data provided');

        this.el = data.el;

        this.rawData = data;
        this.data = this.sanitizeData(this.rawData);

    }


    /**
     * Sanitize the raw data and
     * build our new data object
     *
     * @param  {Object} rawData
     * @return {Object} data
     */
    sanitizeData(rawData) {

        const data = {
            type: rawData.type,
            labels: [],
            values: []
        };

        rawData.answers.map((answer) => {

            data.values.push(parseInt(answer.value));
            data.labels.push(answer.description);

        });

        return data;

    }


    /**
     * Generate the global options
     * shared between all charts
     *
     * @return {Object}
     */
    generateGlobalOptions() {

        return {

            /**
             * Chart
             * @type {Object}
             */
            chart: {
                type: 'pie',
                toolbar: { show: false }
            },


            /**
             * Labels
             * @type {Array}
             */
            labels: [],


            /**
             * Data
             * @type {Array}
             */
            series: [],


            /**
             * Legend
             * @type {Object}
             */
            legend: {
                position: 'bottom',
                verticalAlign: 'center',
                itemMargin: {
                    horizontal: 25
                },
                onItemClick: {
                    toggleDataSeries: false
                }
            },


            /**
             * Grid
             * @type {Object}
             */
            grid: {
                show: true,
                borderColor: 'rgba(255, 255, 255, 0.05)',
                strokeDashArray: 5,
                position: 'back',
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },


            /**
             * Tooltip
             * @type {Object}
             */
            tooltip: {
                enabled: true,
                followCursor: false,
                fillSeriesColor: false,
                theme: 'dark',
                x: {
                    show: false
                }
            },


            /**
             * Fill (Color of the chart objects)
             *
             * Brand Colors [#24B3E8, #51B748, #F27024, #EA0D80]
             * @type {Object}
             */
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'vertical',
                    shadeIntensity: 1,
                    gradientToColors: ['#24B3E8', '#51B748', '#F27024', '#EA0D80'],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 75],
                }
            },


            /**
             * Theme
             * @type {Object}
             */
            theme: {
                mode: 'light'
            }


        };

    }




}
