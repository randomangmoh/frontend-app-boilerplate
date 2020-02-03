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

        this.font = 'Arial';
        // this.colors = ['#24B3E8', '#51B748', '#F27024', '#EA0D80'];
        this.backgroundColor = ['#130c26'];

        this.colors = [
            '#7420E6',
            '#42E496',
            '#40ECDC',
            '#FCE08A',
            '#30B157',
            '#5328FF',
            '#F9729A',
            '#ED650B',
            '#C44139',
            '#7420E6',
            '#42E496',
            '#40ECDC',
            '#FCE08A',
            '#30B157',
            '#5328FF',
            '#F9729A',
            '#ED650B',
            '#C44139'
        ];

        this.gradients = [
            ['#7420E6', '#E95E64'],
            ['#42E496', '#3BB3B7'],
            ['#40ECDC', '#5E7CE9'],
            ['#FCE08A', '#F68682'],
            ['#30B157', '#23A2E1'],
            ['#5328FF', '#36D3E7'],
            ['#F9729A', '#FA9CA4'],
            ['#ED650B', '#FCB562'],
            ['#C44139', '#F55955'],
            /**
             * @todo Don't repeat, create new ones
             */
            ['#7420E6', '#E95E64'],
            ['#42E496', '#3BB3B7'],
            ['#40ECDC', '#5E7CE9'],
            ['#FCE08A', '#F68682'],
            ['#30B157', '#23A2E1'],
            ['#5328FF', '#36D3E7'],
            ['#F9729A', '#FA9CA4'],
            ['#ED650B', '#FCB562'],
            ['#C44139', '#F55955']
        ];

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
    generateGlobalOptions(responsiveness = true) {

        const options = {

            /**
             * Chart
             * @type {Object}
             */
            chart: {
                type: this.data.type,
                toolbar: { show: false },
                fontFamily: this.font,
                height: '600px',
                background: 'transparent',
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


            /**
             * Title (Question)
             * @type {Object}
             */
            title: {
                text: this.data.title,
                align: 'center',
                style: {
                    fontSize: '14px',
                    color: '#fff'
                }
            },


            /**
             * Default colors
             * @type {Array}
             */
            colors: [],


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
                fillSeriesColor: true,
                theme: 'dark',
                x: {
                    show: true,
                    title: '',
                    formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
                        return value;
                    }
                },
                y: {
                    show: true,
                    title: '',
                    formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
                        return value;
                    }
                }
            },


            /**
             * States
             * @type {Object}
             */
            states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0,
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'darken',
                        value: 0.35,
                    }
                },
            },


            /**
             * Fill (Color of the chart objects)
             *
             * Brand Colors [#24B3E8, #51B748, #F27024, #EA0D80]
             * @type {Object}
             */
            fill: {
                type: 'gradient',
                colors: this.colors,
                gradient: {
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: .5,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: .9,
                    stops: [0, 100],
                    gradientToColors: this.colors
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
             * X Axis
             * @type {Object}
             */
            xaxis: {
                tickPlacement: 'on'
            },


            /**
             * Theme
             * @type {Object}
             */
            theme: {
                mode: 'light'
            }

        };

        if(responsiveness === true) {

            options.responsive = [
                {
                    breakpoint: 768,
                    options: {
                        chart: {
                            height: '400px'
                        }
                    },
                },
                {
                    breakpoint: 1024,
                    options: {
                        chart: {
                            height: '400px'
                        }
                    },
                }
            ];

        };

        return options;

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


    generateGradients(values) {

        const count = values.length;

        return this.gradients.slice(0, count);

    }

}
