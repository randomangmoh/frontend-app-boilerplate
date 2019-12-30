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

        this.font = 'D-Din';

        this.rawData = data;
        this.data = this.sanitizeData(this.rawData);

    }


    /**
     * Sanitize the raw data and
     * build our new data object
     *
     * @method sanitizeData
     * @param  {Object} rawData
     * @return {Object} data
     */
    sanitizeData(rawData) {

        const data = {
            type: rawData.type,
            title: rawData.title,
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
     * @method generateGlobalOptions
     * @return {Object}
     */
    generateGlobalOptions() {

        return {

            /**
             * Chart
             * @type {Object}
             */
            chart: {
                type: this.data.type,
                toolbar: { show: false },
                fontFamily: this.font,
                height: '750px',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 1000,
                    animateGradually: {
                        enabled: false,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: false,
                        speed: 350
                    }
                }
            },

            title: {
                text: this.data.title,
                align: 'center',
                style: {
                    fontSize: '14px',
                    color: '#fff'
                }
            },

            // colors: ['#364f6b', '#3fc1c9', '#f5f5f5', '#fc5185'],
            colors: ['#131244', '#162559', '#315584', '#42D6D6', '#48F2E4'],


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
             * Data label styling
             *
             * @type {Object}
             */
             dataLabels: {
                 enabled: true,
                 textAnchor: 'middle',
                 style: {
                    fontSize: '14px'
                 },
                 dropShadow: {
                     enabled: false
                 }
             },


            /**
             * Legend
             * @type {Object}
             */
            legend: {
                position: 'bottom',
                verticalAlign: 'center',
                labels: {
                    colors: 'rgba(255, 255, 255, .75)'
                },
                markers: {
                    width: 30,
                    height: 10,
                    radius: 0
                },
                itemMargin: {
                    horizontal: 0,
                    vertical: 10
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
                colors: ['#131244', '#162559', '#315584', '#42D6D6', '#48F2E4'],
                gradient: {
                    shade: 'dark',
                    type: 'vertical',
                    shadeIntensity: .05,
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                }
            },


            /**
             * Chart markers
             *
             * @type {Object}
             */
            markers: {
                size: 1,
                colors: undefined,
                strokeColors: 'transparent',
                strokeWidth: 0,
                strokeOpacity: 0.9,
                fillOpacity: 1,
                discrete: [],
                shape: 'circle',
                radius: 2,
                offsetX: 0,
                offsetY: 0,
                onClick: undefined,
                onDblClick: undefined,
                hover: {
                    size: undefined,
                    sizeOffset: 3
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

    /**
     * Performs a deep merge of `source` into `target`.
     * Mutates `target` only but not its objects and arrays.
     *
     * @method mergeDeep
     * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
     */
    mergeDeep(target, source) {

        const isObject = (obj) => obj && typeof obj === 'object';

        if (!isObject(target) || !isObject(source)) {
            return source;
        }

        Object.keys(source).forEach(key => {

            const targetValue = target[key];
            const sourceValue = source[key];

            if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {

                target[key] = targetValue.concat(sourceValue);

            } else if (isObject(targetValue) && isObject(sourceValue)) {

                target[key] = this.mergeDeep(Object.assign({}, targetValue), sourceValue);

            } else {
                target[key] = sourceValue;
            }

        });

        return target;

    }




}
