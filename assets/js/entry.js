(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _apexcharts = require('apexcharts');

var _apexcharts2 = _interopRequireDefault(_apexcharts);

var _chromaJs = require('chroma-js');

var _chromaJs2 = _interopRequireDefault(_chromaJs);

var _Chart2 = require('./Chart');

var _Chart3 = _interopRequireDefault(_Chart2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Lib


// Base Chart


/**
 * Bar Chart, extends Chart
 *
 * @class BarChart
 */
var BarChart = function (_Chart) {
    _inherits(BarChart, _Chart);

    /**
     * @constructor
     * @param {Object} data
     */
    function BarChart(data) {
        _classCallCheck(this, BarChart);

        var _this = _possibleConstructorReturn(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).call(this, data));

        _this.el = data.el;
        _this.globalOptions = _this.generateGlobalOptions();
        _this.chartOptions = _this.generateChartOptions();
        _this.options = _this.mergeDeep(_this.globalOptions, _this.chartOptions);

        console.log(_this.data);

        _this.chart = new _apexcharts2.default(_this.el, _this.options);
        _this.chart.render();

        return _this;
    }

    /**
     * Generating chart specific options
     * @return {Object}
     */


    _createClass(BarChart, [{
        key: 'generateChartOptions',
        value: function generateChartOptions() {

            return {
                chart: {
                    type: this.data.type
                },
                labels: this.data.labels,
                series: [{
                    name: 'Series',
                    data: this.data.values
                }],
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
                                to: 1
                            }],
                            colors: ['#131244', '#162559', '#315584', '#42D6D6', '#48F2E4'],
                            backgroundBarColors: ['#131244', '#162559', '#315584', '#42D6D6', '#48F2E4'],
                            backgroundBarOpacity: .25
                        }
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
                        text: 'Answers'
                    }
                },
                grid: {
                    show: true
                }

            };
        }
    }]);

    return BarChart;
}(_Chart3.default);

exports.default = BarChart;

},{"./Chart":2,"apexcharts":9,"chroma-js":10}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Chart base class, to be extended
 * by sppecific chart types
 *
 * @class Chart
 */
var Chart = function () {

    /**
     * @constructor
     * @param {Object} data data passed from the template
     */
    function Chart(data) {
        _classCallCheck(this, Chart);

        if (!data) throw Error('No data provided');

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


    _createClass(Chart, [{
        key: 'sanitizeData',
        value: function sanitizeData(rawData) {

            var data = {
                type: rawData.type,
                title: rawData.title,
                labels: [],
                values: []
            };

            rawData.answers.map(function (answer) {

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

    }, {
        key: 'generateGlobalOptions',
        value: function generateGlobalOptions() {

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
                        stops: [0, 100]
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

    }, {
        key: 'mergeDeep',
        value: function mergeDeep(target, source) {
            var _this = this;

            var isObject = function isObject(obj) {
                return obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
            };

            if (!isObject(target) || !isObject(source)) {
                return source;
            }

            Object.keys(source).forEach(function (key) {

                var targetValue = target[key];
                var sourceValue = source[key];

                if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {

                    target[key] = targetValue.concat(sourceValue);
                } else if (isObject(targetValue) && isObject(sourceValue)) {

                    target[key] = _this.mergeDeep(Object.assign({}, targetValue), sourceValue);
                } else {
                    target[key] = sourceValue;
                }
            });

            return target;
        }
    }]);

    return Chart;
}();

exports.default = Chart;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _apexcharts = require('apexcharts');

var _apexcharts2 = _interopRequireDefault(_apexcharts);

var _chromaJs = require('chroma-js');

var _chromaJs2 = _interopRequireDefault(_chromaJs);

var _Chart2 = require('./Chart');

var _Chart3 = _interopRequireDefault(_Chart2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Lib


// Base Chart


/**
 * Bar Chart, extends Chart
 *
 * @class BarChart
 */
var PieChart = function (_Chart) {
    _inherits(PieChart, _Chart);

    /**
     * @constructor
     * @param {Object} data
     */
    function PieChart(data) {
        _classCallCheck(this, PieChart);

        var _this = _possibleConstructorReturn(this, (PieChart.__proto__ || Object.getPrototypeOf(PieChart)).call(this, data));

        _this.el = data.el;
        _this.globalOptions = _this.generateGlobalOptions();
        _this.chartOptions = _this.generateChartOptions();
        _this.options = _this.mergeDeep(_this.globalOptions, _this.chartOptions);

        _this.chart = new _apexcharts2.default(_this.el, _this.options);
        _this.chart.render();

        return _this;
    }

    /**
     * Generating chart specific options
     * @return {Object}
     */


    _createClass(PieChart, [{
        key: 'generateChartOptions',
        value: function generateChartOptions() {

            return {
                chart: {
                    type: this.data.type
                },
                labels: this.data.labels,
                series: this.data.values,
                plotOptions: {
                    pie: {
                        customScale: 0.9,
                        expandOnClick: false,
                        donut: {
                            size: '50%',
                            labels: {
                                show: this.data.type === 'donut' ? true : false,
                                name: {
                                    color: '#FFF'
                                },
                                value: {
                                    color: 'rgba(255, 255, 255, 0.5)'
                                }
                            }
                        }
                    }
                },
                stroke: {
                    show: true,
                    opacity: 1,
                    width: 0,
                    colors: ['#130c26']
                },
                grid: {
                    show: false
                }

            };
        }
    }]);

    return PieChart;
}(_Chart3.default);

exports.default = PieChart;

},{"./Chart":2,"apexcharts":9,"chroma-js":10}],4:[function(require,module,exports){
'use strict';

var _Campaign = require('./modules/Campaign');

var _Campaign2 = _interopRequireDefault(_Campaign);

var _MobileNav = require('./modules/MobileNav');

var _MobileNav2 = _interopRequireDefault(_MobileNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Entry Point
document.addEventListener('DOMContentLoaded', function () {

    // Set up campaign
    new _Campaign2.default(document.querySelector('[data-campaign="container"]'));

    var navContainer = document.querySelector('[data-nav="container"]');
    new _MobileNav2.default(navContainer);
});

},{"./modules/Campaign":5,"./modules/MobileNav":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Lib


// Modules


var _glide = require('@glidejs/glide');

var _glide2 = _interopRequireDefault(_glide);

var _Charts = require('./Charts');

var _Charts2 = _interopRequireDefault(_Charts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class to handle all Campaign functionality
 *
 * @class Campaign
 */
var Campaign = function () {
    function Campaign(container) {
        var _this = this;

        _classCallCheck(this, Campaign);

        if (!container) return;

        this.container = container;

        this.questionsContainer = this.container.querySelector('[data-questions="container"]');
        this.questionsSelect = this.questionsContainer.querySelector('[data-questions="select"]');
        this.carouselContainer = this.container.querySelector('[data-questions="carousel"]');

        this.carousel = this.initCarousel(this.carouselContainer);
        this.carousel.mount({ arrowDisabler: this.arrowDisabler, selectChanger: this.selectChanger.bind(this) });

        this.charts = new _Charts2.default(this.questionsContainer);

        this.questionsSelect.addEventListener('change', function (event) {
            return _this.onSelectChange(event);
        });
    }

    /**
     * Initialize Questions Carousel
     *
     * @return {Void}
     */


    _createClass(Campaign, [{
        key: 'initCarousel',
        value: function initCarousel(container) {

            if (!container) return;

            return new _glide2.default('[data-questions="container"]', {
                type: 'slider',
                rewind: false
            });
        }

        /**
         * On select Change
         * 
         * @return {Void}
         */

    }, {
        key: 'onSelectChange',
        value: function onSelectChange() {

            this.carousel.go('=' + this.questionsSelect.selectedIndex);
        }

        /**
         * Select changer for Glide instance
         *
         * @param  {Class} Glide
         * @return {Object}
         */

    }, {
        key: 'selectChanger',
        value: function selectChanger(Glide) {

            var select = this.questionsContainer.querySelector('[data-questions="select"]');

            return {
                mount: function mount() {

                    Glide.on(['mount.after', 'run'], function () {
                        return select.selectedIndex = Glide.index;
                    });
                }
            };
        }

        /**
         * Glide Plugin for disabling and enabling arrows
         *
         * @param  {Class} Glide
         * @param  {Object} Components
         * @param  {Object} Events
         * @return {Object}
         */

    }, {
        key: 'arrowDisabler',
        value: function arrowDisabler(Glide, Components) {

            return {
                mount: function mount() {

                    if (Glide.settings.rewind) return;

                    Glide.on(['mount.after', 'run'], function () {

                        // Filter out arrows_control
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = Components.Controls.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var controlItem = _step.value;


                                if (!controlItem.classList.contains('glide__arrows')) continue;

                                // Set left arrow state
                                var left = controlItem.querySelectorAll('.glide__arrow--left');

                                if (left) {

                                    if (Glide.index === 0) left.forEach(function (arrow) {
                                        return arrow.classList.add('disabled');
                                    });else left.forEach(function (arrow) {
                                        return arrow.classList.remove('disabled');
                                    });
                                }

                                var right = controlItem.querySelectorAll('.glide__arrow--right');

                                if (right) {

                                    if (Glide.index === Components.Sizes.length - Glide.settings.perView) right.forEach(function (arrow) {
                                        return arrow.classList.add('disabled');
                                    });else right.forEach(function (arrow) {
                                        return arrow.classList.remove('disabled');
                                    });
                                }
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    });
                }
            };
        }
    }]);

    return Campaign;
}();

exports.default = Campaign;

},{"./Charts":6,"@glidejs/glide":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BarChart = require('../charts/BarChart');

var _BarChart2 = _interopRequireDefault(_BarChart);

var _PieChart = require('../charts/PieChart');

var _PieChart2 = _interopRequireDefault(_PieChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class to handle all Charts in the Campaign page
 *
 * @class Charts
 */
var Charts = function () {

    /**
     * @constructor
     * @param {HTMLElement} container
     */
    function Charts(container) {
        _classCallCheck(this, Charts);

        if (!container) return;

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


    _createClass(Charts, [{
        key: 'initializeCharts',
        value: function initializeCharts(data) {
            var _this = this;

            var charts = {};

            data.forEach(function (item, i) {

                charts[i] = _extends({}, item, {
                    chart: _this.chooseChart(item)
                });
            });

            return charts;
        }

        /**
         * Choose the chart type to instantiate
         * @param  {Object} type
         * @return {Class}
         */

    }, {
        key: 'chooseChart',
        value: function chooseChart(item) {

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
            //
            console.log(item.type);

            switch (item.type) {
                case 'pie':
                case 'donut':

                    new _PieChart2.default(item);

                    break;
                case 'bar':

                    new _BarChart2.default(item);

                default:

            }
        }

        /**
         * Get chart data
         * @param  {Array} chartElements
         * @return {Array
         */

    }, {
        key: 'getChartData',
        value: function getChartData(chartElements) {

            var charts = [];

            chartElements.forEach(function (chart) {

                console.log(chart);
                charts.push({
                    title: chart.getAttribute('data-question-title'),
                    el: chart,
                    type: chart.getAttribute('data-chart-type') || 'pie',
                    answers: JSON.parse(chart.getAttribute('data-answers'))
                });
            });

            return charts;
        }
    }]);

    return Charts;
}();

exports.default = Charts;

},{"../charts/BarChart":1,"../charts/PieChart":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MobileNav = function () {

    /**
     * @constructor
     */
    function MobileNav(container) {
        var _this = this;

        _classCallCheck(this, MobileNav);

        if (!container) return 'No nav container passed';

        this.container = container;
        this.navBtn = this.container.querySelector('[data-mobile-nav="btn"]');
        this.navBtnClose = this.container.querySelector('[data-mobile-nav="close"]');
        this.mobileNav = this.container.querySelector('[data-mobile-nav="container"]');

        this.navBtn.addEventListener('click', function (e) {
            return _this.onNavBtnClick(e);
        });
        this.navBtnClose.addEventListener('click', function (e) {
            return _this.onNavBtnClick(e);
        });
    }

    _createClass(MobileNav, [{
        key: 'onNavBtnClick',
        value: function onNavBtnClick(event) {

            event.preventDefault();

            this.mobileNav.classList.toggle('active');
        }
    }]);

    return MobileNav;
}();

exports.default = MobileNav;

},{}],8:[function(require,module,exports){
/*!
 * Glide.js v3.4.1
 * (c) 2013-2019 Jędrzej Chałubek <jedrzej.chalubek@gmail.com> (http://jedrzejchalubek.com/)
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Glide = factory());
}(this, (function () { 'use strict';

  var defaults = {
    /**
     * Type of the movement.
     *
     * Available types:
     * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
     * `carousel` - Changes slides without starting over when it reaches the first or last slide.
     *
     * @type {String}
     */
    type: 'slider',

    /**
     * Start at specific slide number defined with zero-based index.
     *
     * @type {Number}
     */
    startAt: 0,

    /**
     * A number of slides visible on the single viewport.
     *
     * @type {Number}
     */
    perView: 1,

    /**
     * Focus currently active slide at a specified position in the track.
     *
     * Available inputs:
     * `center` - Current slide will be always focused at the center of a track.
     * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
     *
     * @type {String|Number}
     */
    focusAt: 0,

    /**
     * A size of the gap added between slides.
     *
     * @type {Number}
     */
    gap: 10,

    /**
     * Change slides after a specified interval. Use `false` for turning off autoplay.
     *
     * @type {Number|Boolean}
     */
    autoplay: false,

    /**
     * Stop autoplay on mouseover event.
     *
     * @type {Boolean}
     */
    hoverpause: true,

    /**
     * Allow for changing slides with left and right keyboard arrows.
     *
     * @type {Boolean}
     */
    keyboard: true,

    /**
     * Stop running `perView` number of slides from the end. Use this
     * option if you don't want to have an empty space after
     * a slider. Works only with `slider` type and a
     * non-centered `focusAt` setting.
     *
     * @type {Boolean}
     */
    bound: false,

    /**
     * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
     *
     * @type {Number|Boolean}
     */
    swipeThreshold: 80,

    /**
     * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
     *
     * @type {Number|Boolean}
     */
    dragThreshold: 120,

    /**
     * A maximum number of slides to which movement will be made on swiping or dragging. Use `false` for unlimited.
     *
     * @type {Number|Boolean}
     */
    perTouch: false,

    /**
     * Moving distance ratio of the slides on a swiping and dragging.
     *
     * @type {Number}
     */
    touchRatio: 0.5,

    /**
     * Angle required to activate slides moving on swiping or dragging.
     *
     * @type {Number}
     */
    touchAngle: 45,

    /**
     * Duration of the animation in milliseconds.
     *
     * @type {Number}
     */
    animationDuration: 400,

    /**
     * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
     *
     * @type {Boolean}
     */
    rewind: true,

    /**
     * Duration of the rewinding animation of the `slider` type in milliseconds.
     *
     * @type {Number}
     */
    rewindDuration: 800,

    /**
     * Easing function for the animation.
     *
     * @type {String}
     */
    animationTimingFunc: 'cubic-bezier(.165, .840, .440, 1)',

    /**
     * Throttle costly events at most once per every wait milliseconds.
     *
     * @type {Number}
     */
    throttle: 10,

    /**
     * Moving direction mode.
     *
     * Available inputs:
     * - 'ltr' - left to right movement,
     * - 'rtl' - right to left movement.
     *
     * @type {String}
     */
    direction: 'ltr',

    /**
     * The distance value of the next and previous viewports which
     * have to peek in the current view. Accepts number and
     * pixels as a string. Left and right peeking can be
     * set up separately with a directions object.
     *
     * For example:
     * `100` - Peek 100px on the both sides.
     * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
     *
     * @type {Number|String|Object}
     */
    peek: 0,

    /**
     * Collection of options applied at specified media breakpoints.
     * For example: display two slides per view under 800px.
     * `{
     *   '800px': {
     *     perView: 2
     *   }
     * }`
     */
    breakpoints: {},

    /**
     * Collection of internally used HTML classes.
     *
     * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
     * @type {Object}
     */
    classes: {
      direction: {
        ltr: 'glide--ltr',
        rtl: 'glide--rtl'
      },
      slider: 'glide--slider',
      carousel: 'glide--carousel',
      swipeable: 'glide--swipeable',
      dragging: 'glide--dragging',
      cloneSlide: 'glide__slide--clone',
      activeNav: 'glide__bullet--active',
      activeSlide: 'glide__slide--active',
      disabledArrow: 'glide__arrow--disabled'
    }
  };

  /**
   * Outputs warning message to the bowser console.
   *
   * @param  {String} msg
   * @return {Void}
   */
  function warn(msg) {
    console.error("[Glide warn]: " + msg);
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  /**
   * Converts value entered as number
   * or string to integer value.
   *
   * @param {String} value
   * @returns {Number}
   */
  function toInt(value) {
    return parseInt(value);
  }

  /**
   * Converts value entered as number
   * or string to flat value.
   *
   * @param {String} value
   * @returns {Number}
   */
  function toFloat(value) {
    return parseFloat(value);
  }

  /**
   * Indicates whether the specified value is a string.
   *
   * @param  {*}   value
   * @return {Boolean}
   */
  function isString(value) {
    return typeof value === 'string';
  }

  /**
   * Indicates whether the specified value is an object.
   *
   * @param  {*} value
   * @return {Boolean}
   *
   * @see https://github.com/jashkenas/underscore
   */
  function isObject(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

    return type === 'function' || type === 'object' && !!value; // eslint-disable-line no-mixed-operators
  }

  /**
   * Indicates whether the specified value is a number.
   *
   * @param  {*} value
   * @return {Boolean}
   */
  function isNumber(value) {
    return typeof value === 'number';
  }

  /**
   * Indicates whether the specified value is a function.
   *
   * @param  {*} value
   * @return {Boolean}
   */
  function isFunction(value) {
    return typeof value === 'function';
  }

  /**
   * Indicates whether the specified value is undefined.
   *
   * @param  {*} value
   * @return {Boolean}
   */
  function isUndefined(value) {
    return typeof value === 'undefined';
  }

  /**
   * Indicates whether the specified value is an array.
   *
   * @param  {*} value
   * @return {Boolean}
   */
  function isArray(value) {
    return value.constructor === Array;
  }

  /**
   * Creates and initializes specified collection of extensions.
   * Each extension receives access to instance of glide and rest of components.
   *
   * @param {Object} glide
   * @param {Object} extensions
   *
   * @returns {Object}
   */
  function mount(glide, extensions, events) {
    var components = {};

    for (var name in extensions) {
      if (isFunction(extensions[name])) {
        components[name] = extensions[name](glide, components, events);
      } else {
        warn('Extension must be a function');
      }
    }

    for (var _name in components) {
      if (isFunction(components[_name].mount)) {
        components[_name].mount();
      }
    }

    return components;
  }

  /**
   * Defines getter and setter property on the specified object.
   *
   * @param  {Object} obj         Object where property has to be defined.
   * @param  {String} prop        Name of the defined property.
   * @param  {Object} definition  Get and set definitions for the property.
   * @return {Void}
   */
  function define(obj, prop, definition) {
    Object.defineProperty(obj, prop, definition);
  }

  /**
   * Sorts aphabetically object keys.
   *
   * @param  {Object} obj
   * @return {Object}
   */
  function sortKeys(obj) {
    return Object.keys(obj).sort().reduce(function (r, k) {
      r[k] = obj[k];

      return r[k], r;
    }, {});
  }

  /**
   * Merges passed settings object with default options.
   *
   * @param  {Object} defaults
   * @param  {Object} settings
   * @return {Object}
   */
  function mergeOptions(defaults, settings) {
    var options = _extends({}, defaults, settings);

    // `Object.assign` do not deeply merge objects, so we
    // have to do it manually for every nested object
    // in options. Although it does not look smart,
    // it's smaller and faster than some fancy
    // merging deep-merge algorithm script.
    if (settings.hasOwnProperty('classes')) {
      options.classes = _extends({}, defaults.classes, settings.classes);

      if (settings.classes.hasOwnProperty('direction')) {
        options.classes.direction = _extends({}, defaults.classes.direction, settings.classes.direction);
      }
    }

    if (settings.hasOwnProperty('breakpoints')) {
      options.breakpoints = _extends({}, defaults.breakpoints, settings.breakpoints);
    }

    return options;
  }

  var EventsBus = function () {
    /**
     * Construct a EventBus instance.
     *
     * @param {Object} events
     */
    function EventsBus() {
      var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, EventsBus);

      this.events = events;
      this.hop = events.hasOwnProperty;
    }

    /**
     * Adds listener to the specifed event.
     *
     * @param {String|Array} event
     * @param {Function} handler
     */


    createClass(EventsBus, [{
      key: 'on',
      value: function on(event, handler) {
        if (isArray(event)) {
          for (var i = 0; i < event.length; i++) {
            this.on(event[i], handler);
          }
        }

        // Create the event's object if not yet created
        if (!this.hop.call(this.events, event)) {
          this.events[event] = [];
        }

        // Add the handler to queue
        var index = this.events[event].push(handler) - 1;

        // Provide handle back for removal of event
        return {
          remove: function remove() {
            delete this.events[event][index];
          }
        };
      }

      /**
       * Runs registered handlers for specified event.
       *
       * @param {String|Array} event
       * @param {Object=} context
       */

    }, {
      key: 'emit',
      value: function emit(event, context) {
        if (isArray(event)) {
          for (var i = 0; i < event.length; i++) {
            this.emit(event[i], context);
          }
        }

        // If the event doesn't exist, or there's no handlers in queue, just leave
        if (!this.hop.call(this.events, event)) {
          return;
        }

        // Cycle through events queue, fire!
        this.events[event].forEach(function (item) {
          item(context || {});
        });
      }
    }]);
    return EventsBus;
  }();

  var Glide = function () {
    /**
     * Construct glide.
     *
     * @param  {String} selector
     * @param  {Object} options
     */
    function Glide(selector) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      classCallCheck(this, Glide);

      this._c = {};
      this._t = [];
      this._e = new EventsBus();

      this.disabled = false;
      this.selector = selector;
      this.settings = mergeOptions(defaults, options);
      this.index = this.settings.startAt;
    }

    /**
     * Initializes glide.
     *
     * @param {Object} extensions Collection of extensions to initialize.
     * @return {Glide}
     */


    createClass(Glide, [{
      key: 'mount',
      value: function mount$$1() {
        var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        this._e.emit('mount.before');

        if (isObject(extensions)) {
          this._c = mount(this, extensions, this._e);
        } else {
          warn('You need to provide a object on `mount()`');
        }

        this._e.emit('mount.after');

        return this;
      }

      /**
       * Collects an instance `translate` transformers.
       *
       * @param  {Array} transformers Collection of transformers.
       * @return {Void}
       */

    }, {
      key: 'mutate',
      value: function mutate() {
        var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        if (isArray(transformers)) {
          this._t = transformers;
        } else {
          warn('You need to provide a array on `mutate()`');
        }

        return this;
      }

      /**
       * Updates glide with specified settings.
       *
       * @param {Object} settings
       * @return {Glide}
       */

    }, {
      key: 'update',
      value: function update() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        this.settings = mergeOptions(this.settings, settings);

        if (settings.hasOwnProperty('startAt')) {
          this.index = settings.startAt;
        }

        this._e.emit('update');

        return this;
      }

      /**
       * Change slide with specified pattern. A pattern must be in the special format:
       * `>` - Move one forward
       * `<` - Move one backward
       * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
       * `>>` - Rewinds to end (last slide)
       * `<<` - Rewinds to start (first slide)
       *
       * @param {String} pattern
       * @return {Glide}
       */

    }, {
      key: 'go',
      value: function go(pattern) {
        this._c.Run.make(pattern);

        return this;
      }

      /**
       * Move track by specified distance.
       *
       * @param {String} distance
       * @return {Glide}
       */

    }, {
      key: 'move',
      value: function move(distance) {
        this._c.Transition.disable();
        this._c.Move.make(distance);

        return this;
      }

      /**
       * Destroy instance and revert all changes done by this._c.
       *
       * @return {Glide}
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this._e.emit('destroy');

        return this;
      }

      /**
       * Start instance autoplaying.
       *
       * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
       * @return {Glide}
       */

    }, {
      key: 'play',
      value: function play() {
        var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (interval) {
          this.settings.autoplay = interval;
        }

        this._e.emit('play');

        return this;
      }

      /**
       * Stop instance autoplaying.
       *
       * @return {Glide}
       */

    }, {
      key: 'pause',
      value: function pause() {
        this._e.emit('pause');

        return this;
      }

      /**
       * Sets glide into a idle status.
       *
       * @return {Glide}
       */

    }, {
      key: 'disable',
      value: function disable() {
        this.disabled = true;

        return this;
      }

      /**
       * Sets glide into a active status.
       *
       * @return {Glide}
       */

    }, {
      key: 'enable',
      value: function enable() {
        this.disabled = false;

        return this;
      }

      /**
       * Adds cuutom event listener with handler.
       *
       * @param  {String|Array} event
       * @param  {Function} handler
       * @return {Glide}
       */

    }, {
      key: 'on',
      value: function on(event, handler) {
        this._e.on(event, handler);

        return this;
      }

      /**
       * Checks if glide is a precised type.
       *
       * @param  {String} name
       * @return {Boolean}
       */

    }, {
      key: 'isType',
      value: function isType(name) {
        return this.settings.type === name;
      }

      /**
       * Gets value of the core options.
       *
       * @return {Object}
       */

    }, {
      key: 'settings',
      get: function get$$1() {
        return this._o;
      }

      /**
       * Sets value of the core options.
       *
       * @param  {Object} o
       * @return {Void}
       */
      ,
      set: function set$$1(o) {
        if (isObject(o)) {
          this._o = o;
        } else {
          warn('Options must be an `object` instance.');
        }
      }

      /**
       * Gets current index of the slider.
       *
       * @return {Object}
       */

    }, {
      key: 'index',
      get: function get$$1() {
        return this._i;
      }

      /**
       * Sets current index a slider.
       *
       * @return {Object}
       */
      ,
      set: function set$$1(i) {
        this._i = toInt(i);
      }

      /**
       * Gets type name of the slider.
       *
       * @return {String}
       */

    }, {
      key: 'type',
      get: function get$$1() {
        return this.settings.type;
      }

      /**
       * Gets value of the idle status.
       *
       * @return {Boolean}
       */

    }, {
      key: 'disabled',
      get: function get$$1() {
        return this._d;
      }

      /**
       * Sets value of the idle status.
       *
       * @return {Boolean}
       */
      ,
      set: function set$$1(status) {
        this._d = !!status;
      }
    }]);
    return Glide;
  }();

  function Run (Glide, Components, Events) {
    var Run = {
      /**
       * Initializes autorunning of the glide.
       *
       * @return {Void}
       */
      mount: function mount() {
        this._o = false;
      },


      /**
       * Makes glides running based on the passed moving schema.
       *
       * @param {String} move
       */
      make: function make(move) {
        var _this = this;

        if (!Glide.disabled) {
          Glide.disable();

          this.move = move;

          Events.emit('run.before', this.move);

          this.calculate();

          Events.emit('run', this.move);

          Components.Transition.after(function () {
            if (_this.isStart()) {
              Events.emit('run.start', _this.move);
            }

            if (_this.isEnd()) {
              Events.emit('run.end', _this.move);
            }

            if (_this.isOffset('<') || _this.isOffset('>')) {
              _this._o = false;

              Events.emit('run.offset', _this.move);
            }

            Events.emit('run.after', _this.move);

            Glide.enable();
          });
        }
      },


      /**
       * Calculates current index based on defined move.
       *
       * @return {Void}
       */
      calculate: function calculate() {
        var move = this.move,
            length = this.length;
        var steps = move.steps,
            direction = move.direction;


        var countableSteps = isNumber(toInt(steps)) && toInt(steps) !== 0;

        switch (direction) {
          case '>':
            if (steps === '>') {
              Glide.index = length;
            } else if (this.isEnd()) {
              if (!(Glide.isType('slider') && !Glide.settings.rewind)) {
                this._o = true;

                Glide.index = 0;
              }
            } else if (countableSteps) {
              Glide.index += Math.min(length - Glide.index, -toInt(steps));
            } else {
              Glide.index++;
            }
            break;

          case '<':
            if (steps === '<') {
              Glide.index = 0;
            } else if (this.isStart()) {
              if (!(Glide.isType('slider') && !Glide.settings.rewind)) {
                this._o = true;

                Glide.index = length;
              }
            } else if (countableSteps) {
              Glide.index -= Math.min(Glide.index, toInt(steps));
            } else {
              Glide.index--;
            }
            break;

          case '=':
            Glide.index = steps;
            break;

          default:
            warn('Invalid direction pattern [' + direction + steps + '] has been used');
            break;
        }
      },


      /**
       * Checks if we are on the first slide.
       *
       * @return {Boolean}
       */
      isStart: function isStart() {
        return Glide.index === 0;
      },


      /**
       * Checks if we are on the last slide.
       *
       * @return {Boolean}
       */
      isEnd: function isEnd() {
        return Glide.index === this.length;
      },


      /**
       * Checks if we are making a offset run.
       *
       * @param {String} direction
       * @return {Boolean}
       */
      isOffset: function isOffset(direction) {
        return this._o && this.move.direction === direction;
      }
    };

    define(Run, 'move', {
      /**
       * Gets value of the move schema.
       *
       * @returns {Object}
       */
      get: function get() {
        return this._m;
      },


      /**
       * Sets value of the move schema.
       *
       * @returns {Object}
       */
      set: function set(value) {
        var step = value.substr(1);

        this._m = {
          direction: value.substr(0, 1),
          steps: step ? toInt(step) ? toInt(step) : step : 0
        };
      }
    });

    define(Run, 'length', {
      /**
       * Gets value of the running distance based
       * on zero-indexing number of slides.
       *
       * @return {Number}
       */
      get: function get() {
        var settings = Glide.settings;
        var length = Components.Html.slides.length;

        // If the `bound` option is acitve, a maximum running distance should be
        // reduced by `perView` and `focusAt` settings. Running distance
        // should end before creating an empty space after instance.

        if (Glide.isType('slider') && settings.focusAt !== 'center' && settings.bound) {
          return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
        }

        return length - 1;
      }
    });

    define(Run, 'offset', {
      /**
       * Gets status of the offsetting flag.
       *
       * @return {Boolean}
       */
      get: function get() {
        return this._o;
      }
    });

    return Run;
  }

  /**
   * Returns a current time.
   *
   * @return {Number}
   */
  function now() {
    return new Date().getTime();
  }

  /**
   * Returns a function, that, when invoked, will only be triggered
   * at most once during a given window of time.
   *
   * @param {Function} func
   * @param {Number} wait
   * @param {Object=} options
   * @return {Function}
   *
   * @see https://github.com/jashkenas/underscore
   */
  function throttle(func, wait, options) {
    var timeout = void 0,
        context = void 0,
        args = void 0,
        result = void 0;
    var previous = 0;
    if (!options) options = {};

    var later = function later() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function throttled() {
      var at = now();
      if (!previous && options.leading === false) previous = at;
      var remaining = wait - (at - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = at;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function () {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  }

  var MARGIN_TYPE = {
    ltr: ['marginLeft', 'marginRight'],
    rtl: ['marginRight', 'marginLeft']
  };

  function Gaps (Glide, Components, Events) {
    var Gaps = {
      /**
       * Applies gaps between slides. First and last
       * slides do not receive it's edge margins.
       *
       * @param {HTMLCollection} slides
       * @return {Void}
       */
      apply: function apply(slides) {
        for (var i = 0, len = slides.length; i < len; i++) {
          var style = slides[i].style;
          var direction = Components.Direction.value;

          if (i !== 0) {
            style[MARGIN_TYPE[direction][0]] = this.value / 2 + 'px';
          } else {
            style[MARGIN_TYPE[direction][0]] = '';
          }

          if (i !== slides.length - 1) {
            style[MARGIN_TYPE[direction][1]] = this.value / 2 + 'px';
          } else {
            style[MARGIN_TYPE[direction][1]] = '';
          }
        }
      },


      /**
       * Removes gaps from the slides.
       *
       * @param {HTMLCollection} slides
       * @returns {Void}
      */
      remove: function remove(slides) {
        for (var i = 0, len = slides.length; i < len; i++) {
          var style = slides[i].style;

          style.marginLeft = '';
          style.marginRight = '';
        }
      }
    };

    define(Gaps, 'value', {
      /**
       * Gets value of the gap.
       *
       * @returns {Number}
       */
      get: function get() {
        return toInt(Glide.settings.gap);
      }
    });

    define(Gaps, 'grow', {
      /**
       * Gets additional dimentions value caused by gaps.
       * Used to increase width of the slides wrapper.
       *
       * @returns {Number}
       */
      get: function get() {
        return Gaps.value * (Components.Sizes.length - 1);
      }
    });

    define(Gaps, 'reductor', {
      /**
       * Gets reduction value caused by gaps.
       * Used to subtract width of the slides.
       *
       * @returns {Number}
       */
      get: function get() {
        var perView = Glide.settings.perView;

        return Gaps.value * (perView - 1) / perView;
      }
    });

    /**
     * Apply calculated gaps:
     * - after building, so slides (including clones) will receive proper margins
     * - on updating via API, to recalculate gaps with new options
     */
    Events.on(['build.after', 'update'], throttle(function () {
      Gaps.apply(Components.Html.wrapper.children);
    }, 30));

    /**
     * Remove gaps:
     * - on destroying to bring markup to its inital state
     */
    Events.on('destroy', function () {
      Gaps.remove(Components.Html.wrapper.children);
    });

    return Gaps;
  }

  /**
   * Finds siblings nodes of the passed node.
   *
   * @param  {Element} node
   * @return {Array}
   */
  function siblings(node) {
    if (node && node.parentNode) {
      var n = node.parentNode.firstChild;
      var matched = [];

      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== node) {
          matched.push(n);
        }
      }

      return matched;
    }

    return [];
  }

  /**
   * Checks if passed node exist and is a valid element.
   *
   * @param  {Element} node
   * @return {Boolean}
   */
  function exist(node) {
    if (node && node instanceof window.HTMLElement) {
      return true;
    }

    return false;
  }

  var TRACK_SELECTOR = '[data-glide-el="track"]';

  function Html (Glide, Components) {
    var Html = {
      /**
       * Setup slider HTML nodes.
       *
       * @param {Glide} glide
       */
      mount: function mount() {
        this.root = Glide.selector;
        this.track = this.root.querySelector(TRACK_SELECTOR);
        this.slides = Array.prototype.slice.call(this.wrapper.children).filter(function (slide) {
          return !slide.classList.contains(Glide.settings.classes.cloneSlide);
        });
      }
    };

    define(Html, 'root', {
      /**
       * Gets node of the glide main element.
       *
       * @return {Object}
       */
      get: function get() {
        return Html._r;
      },


      /**
       * Sets node of the glide main element.
       *
       * @return {Object}
       */
      set: function set(r) {
        if (isString(r)) {
          r = document.querySelector(r);
        }

        if (exist(r)) {
          Html._r = r;
        } else {
          warn('Root element must be a existing Html node');
        }
      }
    });

    define(Html, 'track', {
      /**
       * Gets node of the glide track with slides.
       *
       * @return {Object}
       */
      get: function get() {
        return Html._t;
      },


      /**
       * Sets node of the glide track with slides.
       *
       * @return {Object}
       */
      set: function set(t) {
        if (exist(t)) {
          Html._t = t;
        } else {
          warn('Could not find track element. Please use ' + TRACK_SELECTOR + ' attribute.');
        }
      }
    });

    define(Html, 'wrapper', {
      /**
       * Gets node of the slides wrapper.
       *
       * @return {Object}
       */
      get: function get() {
        return Html.track.children[0];
      }
    });

    return Html;
  }

  function Peek (Glide, Components, Events) {
    var Peek = {
      /**
       * Setups how much to peek based on settings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.value = Glide.settings.peek;
      }
    };

    define(Peek, 'value', {
      /**
       * Gets value of the peek.
       *
       * @returns {Number|Object}
       */
      get: function get() {
        return Peek._v;
      },


      /**
       * Sets value of the peek.
       *
       * @param {Number|Object} value
       * @return {Void}
       */
      set: function set(value) {
        if (isObject(value)) {
          value.before = toInt(value.before);
          value.after = toInt(value.after);
        } else {
          value = toInt(value);
        }

        Peek._v = value;
      }
    });

    define(Peek, 'reductor', {
      /**
       * Gets reduction value caused by peek.
       *
       * @returns {Number}
       */
      get: function get() {
        var value = Peek.value;
        var perView = Glide.settings.perView;

        if (isObject(value)) {
          return value.before / perView + value.after / perView;
        }

        return value * 2 / perView;
      }
    });

    /**
     * Recalculate peeking sizes on:
     * - when resizing window to update to proper percents
     */
    Events.on(['resize', 'update'], function () {
      Peek.mount();
    });

    return Peek;
  }

  function Move (Glide, Components, Events) {
    var Move = {
      /**
       * Constructs move component.
       *
       * @returns {Void}
       */
      mount: function mount() {
        this._o = 0;
      },


      /**
       * Calculates a movement value based on passed offset and currently active index.
       *
       * @param  {Number} offset
       * @return {Void}
       */
      make: function make() {
        var _this = this;

        var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        this.offset = offset;

        Events.emit('move', {
          movement: this.value
        });

        Components.Transition.after(function () {
          Events.emit('move.after', {
            movement: _this.value
          });
        });
      }
    };

    define(Move, 'offset', {
      /**
       * Gets an offset value used to modify current translate.
       *
       * @return {Object}
       */
      get: function get() {
        return Move._o;
      },


      /**
       * Sets an offset value used to modify current translate.
       *
       * @return {Object}
       */
      set: function set(value) {
        Move._o = !isUndefined(value) ? toInt(value) : 0;
      }
    });

    define(Move, 'translate', {
      /**
       * Gets a raw movement value.
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Sizes.slideWidth * Glide.index;
      }
    });

    define(Move, 'value', {
      /**
       * Gets an actual movement value corrected by offset.
       *
       * @return {Number}
       */
      get: function get() {
        var offset = this.offset;
        var translate = this.translate;

        if (Components.Direction.is('rtl')) {
          return translate + offset;
        }

        return translate - offset;
      }
    });

    /**
     * Make movement to proper slide on:
     * - before build, so glide will start at `startAt` index
     * - on each standard run to move to newly calculated index
     */
    Events.on(['build.before', 'run'], function () {
      Move.make();
    });

    return Move;
  }

  function Sizes (Glide, Components, Events) {
    var Sizes = {
      /**
       * Setups dimentions of slides.
       *
       * @return {Void}
       */
      setupSlides: function setupSlides() {
        var width = this.slideWidth + 'px';
        var slides = Components.Html.slides;

        for (var i = 0; i < slides.length; i++) {
          slides[i].style.width = width;
        }
      },


      /**
       * Setups dimentions of slides wrapper.
       *
       * @return {Void}
       */
      setupWrapper: function setupWrapper(dimention) {
        Components.Html.wrapper.style.width = this.wrapperSize + 'px';
      },


      /**
       * Removes applied styles from HTML elements.
       *
       * @returns {Void}
       */
      remove: function remove() {
        var slides = Components.Html.slides;

        for (var i = 0; i < slides.length; i++) {
          slides[i].style.width = '';
        }

        Components.Html.wrapper.style.width = '';
      }
    };

    define(Sizes, 'length', {
      /**
       * Gets count number of the slides.
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Html.slides.length;
      }
    });

    define(Sizes, 'width', {
      /**
       * Gets width value of the glide.
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Html.root.offsetWidth;
      }
    });

    define(Sizes, 'wrapperSize', {
      /**
       * Gets size of the slides wrapper.
       *
       * @return {Number}
       */
      get: function get() {
        return Sizes.slideWidth * Sizes.length + Components.Gaps.grow + Components.Clones.grow;
      }
    });

    define(Sizes, 'slideWidth', {
      /**
       * Gets width value of the single slide.
       *
       * @return {Number}
       */
      get: function get() {
        return Sizes.width / Glide.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
      }
    });

    /**
     * Apply calculated glide's dimensions:
     * - before building, so other dimentions (e.g. translate) will be calculated propertly
     * - when resizing window to recalculate sildes dimensions
     * - on updating via API, to calculate dimensions based on new options
     */
    Events.on(['build.before', 'resize', 'update'], function () {
      Sizes.setupSlides();
      Sizes.setupWrapper();
    });

    /**
     * Remove calculated glide's dimensions:
     * - on destoting to bring markup to its inital state
     */
    Events.on('destroy', function () {
      Sizes.remove();
    });

    return Sizes;
  }

  function Build (Glide, Components, Events) {
    var Build = {
      /**
       * Init glide building. Adds classes, sets
       * dimensions and setups initial state.
       *
       * @return {Void}
       */
      mount: function mount() {
        Events.emit('build.before');

        this.typeClass();
        this.activeClass();

        Events.emit('build.after');
      },


      /**
       * Adds `type` class to the glide element.
       *
       * @return {Void}
       */
      typeClass: function typeClass() {
        Components.Html.root.classList.add(Glide.settings.classes[Glide.settings.type]);
      },


      /**
       * Sets active class to current slide.
       *
       * @return {Void}
       */
      activeClass: function activeClass() {
        var classes = Glide.settings.classes;
        var slide = Components.Html.slides[Glide.index];

        if (slide) {
          slide.classList.add(classes.activeSlide);

          siblings(slide).forEach(function (sibling) {
            sibling.classList.remove(classes.activeSlide);
          });
        }
      },


      /**
       * Removes HTML classes applied at building.
       *
       * @return {Void}
       */
      removeClasses: function removeClasses() {
        var classes = Glide.settings.classes;

        Components.Html.root.classList.remove(classes[Glide.settings.type]);

        Components.Html.slides.forEach(function (sibling) {
          sibling.classList.remove(classes.activeSlide);
        });
      }
    };

    /**
     * Clear building classes:
     * - on destroying to bring HTML to its initial state
     * - on updating to remove classes before remounting component
     */
    Events.on(['destroy', 'update'], function () {
      Build.removeClasses();
    });

    /**
     * Remount component:
     * - on resizing of the window to calculate new dimentions
     * - on updating settings via API
     */
    Events.on(['resize', 'update'], function () {
      Build.mount();
    });

    /**
     * Swap active class of current slide:
     * - after each move to the new index
     */
    Events.on('move.after', function () {
      Build.activeClass();
    });

    return Build;
  }

  function Clones (Glide, Components, Events) {
    var Clones = {
      /**
       * Create pattern map and collect slides to be cloned.
       */
      mount: function mount() {
        this.items = [];

        if (Glide.isType('carousel')) {
          this.items = this.collect();
        }
      },


      /**
       * Collect clones with pattern.
       *
       * @return {Void}
       */
      collect: function collect() {
        var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var slides = Components.Html.slides;
        var _Glide$settings = Glide.settings,
            perView = _Glide$settings.perView,
            classes = _Glide$settings.classes;


        var peekIncrementer = +!!Glide.settings.peek;
        var part = perView + peekIncrementer;
        var start = slides.slice(0, part);
        var end = slides.slice(-part);

        for (var r = 0; r < Math.max(1, Math.floor(perView / slides.length)); r++) {
          for (var i = 0; i < start.length; i++) {
            var clone = start[i].cloneNode(true);

            clone.classList.add(classes.cloneSlide);

            items.push(clone);
          }

          for (var _i = 0; _i < end.length; _i++) {
            var _clone = end[_i].cloneNode(true);

            _clone.classList.add(classes.cloneSlide);

            items.unshift(_clone);
          }
        }

        return items;
      },


      /**
       * Append cloned slides with generated pattern.
       *
       * @return {Void}
       */
      append: function append() {
        var items = this.items;
        var _Components$Html = Components.Html,
            wrapper = _Components$Html.wrapper,
            slides = _Components$Html.slides;


        var half = Math.floor(items.length / 2);
        var prepend = items.slice(0, half).reverse();
        var append = items.slice(half, items.length);
        var width = Components.Sizes.slideWidth + 'px';

        for (var i = 0; i < append.length; i++) {
          wrapper.appendChild(append[i]);
        }

        for (var _i2 = 0; _i2 < prepend.length; _i2++) {
          wrapper.insertBefore(prepend[_i2], slides[0]);
        }

        for (var _i3 = 0; _i3 < items.length; _i3++) {
          items[_i3].style.width = width;
        }
      },


      /**
       * Remove all cloned slides.
       *
       * @return {Void}
       */
      remove: function remove() {
        var items = this.items;


        for (var i = 0; i < items.length; i++) {
          Components.Html.wrapper.removeChild(items[i]);
        }
      }
    };

    define(Clones, 'grow', {
      /**
       * Gets additional dimentions value caused by clones.
       *
       * @return {Number}
       */
      get: function get() {
        return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones.items.length;
      }
    });

    /**
     * Append additional slide's clones:
     * - while glide's type is `carousel`
     */
    Events.on('update', function () {
      Clones.remove();
      Clones.mount();
      Clones.append();
    });

    /**
     * Append additional slide's clones:
     * - while glide's type is `carousel`
     */
    Events.on('build.before', function () {
      if (Glide.isType('carousel')) {
        Clones.append();
      }
    });

    /**
     * Remove clones HTMLElements:
     * - on destroying, to bring HTML to its initial state
     */
    Events.on('destroy', function () {
      Clones.remove();
    });

    return Clones;
  }

  var EventsBinder = function () {
    /**
     * Construct a EventsBinder instance.
     */
    function EventsBinder() {
      var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, EventsBinder);

      this.listeners = listeners;
    }

    /**
     * Adds events listeners to arrows HTML elements.
     *
     * @param  {String|Array} events
     * @param  {Element|Window|Document} el
     * @param  {Function} closure
     * @param  {Boolean|Object} capture
     * @return {Void}
     */


    createClass(EventsBinder, [{
      key: 'on',
      value: function on(events, el, closure) {
        var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (isString(events)) {
          events = [events];
        }

        for (var i = 0; i < events.length; i++) {
          this.listeners[events[i]] = closure;

          el.addEventListener(events[i], this.listeners[events[i]], capture);
        }
      }

      /**
       * Removes event listeners from arrows HTML elements.
       *
       * @param  {String|Array} events
       * @param  {Element|Window|Document} el
       * @param  {Boolean|Object} capture
       * @return {Void}
       */

    }, {
      key: 'off',
      value: function off(events, el) {
        var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (isString(events)) {
          events = [events];
        }

        for (var i = 0; i < events.length; i++) {
          el.removeEventListener(events[i], this.listeners[events[i]], capture);
        }
      }

      /**
       * Destroy collected listeners.
       *
       * @returns {Void}
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        delete this.listeners;
      }
    }]);
    return EventsBinder;
  }();

  function Resize (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();

    var Resize = {
      /**
       * Initializes window bindings.
       */
      mount: function mount() {
        this.bind();
      },


      /**
       * Binds `rezsize` listener to the window.
       * It's a costly event, so we are debouncing it.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('resize', window, throttle(function () {
          Events.emit('resize');
        }, Glide.settings.throttle));
      },


      /**
       * Unbinds listeners from the window.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('resize', window);
      }
    };

    /**
     * Remove bindings from window:
     * - on destroying, to remove added EventListener
     */
    Events.on('destroy', function () {
      Resize.unbind();
      Binder.destroy();
    });

    return Resize;
  }

  var VALID_DIRECTIONS = ['ltr', 'rtl'];
  var FLIPED_MOVEMENTS = {
    '>': '<',
    '<': '>',
    '=': '='
  };

  function Direction (Glide, Components, Events) {
    var Direction = {
      /**
       * Setups gap value based on settings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.value = Glide.settings.direction;
      },


      /**
       * Resolves pattern based on direction value
       *
       * @param {String} pattern
       * @returns {String}
       */
      resolve: function resolve(pattern) {
        var token = pattern.slice(0, 1);

        if (this.is('rtl')) {
          return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
        }

        return pattern;
      },


      /**
       * Checks value of direction mode.
       *
       * @param {String} direction
       * @returns {Boolean}
       */
      is: function is(direction) {
        return this.value === direction;
      },


      /**
       * Applies direction class to the root HTML element.
       *
       * @return {Void}
       */
      addClass: function addClass() {
        Components.Html.root.classList.add(Glide.settings.classes.direction[this.value]);
      },


      /**
       * Removes direction class from the root HTML element.
       *
       * @return {Void}
       */
      removeClass: function removeClass() {
        Components.Html.root.classList.remove(Glide.settings.classes.direction[this.value]);
      }
    };

    define(Direction, 'value', {
      /**
       * Gets value of the direction.
       *
       * @returns {Number}
       */
      get: function get() {
        return Direction._v;
      },


      /**
       * Sets value of the direction.
       *
       * @param {String} value
       * @return {Void}
       */
      set: function set(value) {
        if (VALID_DIRECTIONS.indexOf(value) > -1) {
          Direction._v = value;
        } else {
          warn('Direction value must be `ltr` or `rtl`');
        }
      }
    });

    /**
     * Clear direction class:
     * - on destroy to bring HTML to its initial state
     * - on update to remove class before reappling bellow
     */
    Events.on(['destroy', 'update'], function () {
      Direction.removeClass();
    });

    /**
     * Remount component:
     * - on update to reflect changes in direction value
     */
    Events.on('update', function () {
      Direction.mount();
    });

    /**
     * Apply direction class:
     * - before building to apply class for the first time
     * - on updating to reapply direction class that may changed
     */
    Events.on(['build.before', 'update'], function () {
      Direction.addClass();
    });

    return Direction;
  }

  /**
   * Reflects value of glide movement.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */
  function Rtl (Glide, Components) {
    return {
      /**
       * Negates the passed translate if glide is in RTL option.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        if (Components.Direction.is('rtl')) {
          return -translate;
        }

        return translate;
      }
    };
  }

  /**
   * Updates glide movement with a `gap` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */
  function Gap (Glide, Components) {
    return {
      /**
       * Modifies passed translate value with number in the `gap` settings.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        return translate + Components.Gaps.value * Glide.index;
      }
    };
  }

  /**
   * Updates glide movement with width of additional clones width.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */
  function Grow (Glide, Components) {
    return {
      /**
       * Adds to the passed translate width of the half of clones.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        return translate + Components.Clones.grow / 2;
      }
    };
  }

  /**
   * Updates glide movement with a `peek` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */
  function Peeking (Glide, Components) {
    return {
      /**
       * Modifies passed translate value with a `peek` setting.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        if (Glide.settings.focusAt >= 0) {
          var peek = Components.Peek.value;

          if (isObject(peek)) {
            return translate - peek.before;
          }

          return translate - peek;
        }

        return translate;
      }
    };
  }

  /**
   * Updates glide movement with a `focusAt` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */
  function Focusing (Glide, Components) {
    return {
      /**
       * Modifies passed translate value with index in the `focusAt` setting.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        var gap = Components.Gaps.value;
        var width = Components.Sizes.width;
        var focusAt = Glide.settings.focusAt;
        var slideWidth = Components.Sizes.slideWidth;

        if (focusAt === 'center') {
          return translate - (width / 2 - slideWidth / 2);
        }

        return translate - slideWidth * focusAt - gap * focusAt;
      }
    };
  }

  /**
   * Applies diffrent transformers on translate value.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */
  function mutator (Glide, Components, Events) {
    /**
     * Merge instance transformers with collection of default transformers.
     * It's important that the Rtl component be last on the list,
     * so it reflects all previous transformations.
     *
     * @type {Array}
     */
    var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide._t, [Rtl]);

    return {
      /**
       * Piplines translate value with registered transformers.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      mutate: function mutate(translate) {
        for (var i = 0; i < TRANSFORMERS.length; i++) {
          var transformer = TRANSFORMERS[i];

          if (isFunction(transformer) && isFunction(transformer().modify)) {
            translate = transformer(Glide, Components, Events).modify(translate);
          } else {
            warn('Transformer should be a function that returns an object with `modify()` method');
          }
        }

        return translate;
      }
    };
  }

  function Translate (Glide, Components, Events) {
    var Translate = {
      /**
       * Sets value of translate on HTML element.
       *
       * @param {Number} value
       * @return {Void}
       */
      set: function set(value) {
        var transform = mutator(Glide, Components).mutate(value);

        Components.Html.wrapper.style.transform = 'translate3d(' + -1 * transform + 'px, 0px, 0px)';
      },


      /**
       * Removes value of translate from HTML element.
       *
       * @return {Void}
       */
      remove: function remove() {
        Components.Html.wrapper.style.transform = '';
      }
    };

    /**
     * Set new translate value:
     * - on move to reflect index change
     * - on updating via API to reflect possible changes in options
     */
    Events.on('move', function (context) {
      var gap = Components.Gaps.value;
      var length = Components.Sizes.length;
      var width = Components.Sizes.slideWidth;

      if (Glide.isType('carousel') && Components.Run.isOffset('<')) {
        Components.Transition.after(function () {
          Events.emit('translate.jump');

          Translate.set(width * (length - 1));
        });

        return Translate.set(-width - gap * length);
      }

      if (Glide.isType('carousel') && Components.Run.isOffset('>')) {
        Components.Transition.after(function () {
          Events.emit('translate.jump');

          Translate.set(0);
        });

        return Translate.set(width * length + gap * length);
      }

      return Translate.set(context.movement);
    });

    /**
     * Remove translate:
     * - on destroying to bring markup to its inital state
     */
    Events.on('destroy', function () {
      Translate.remove();
    });

    return Translate;
  }

  function Transition (Glide, Components, Events) {
    /**
     * Holds inactivity status of transition.
     * When true transition is not applied.
     *
     * @type {Boolean}
     */
    var disabled = false;

    var Transition = {
      /**
       * Composes string of the CSS transition.
       *
       * @param {String} property
       * @return {String}
       */
      compose: function compose(property) {
        var settings = Glide.settings;

        if (!disabled) {
          return property + ' ' + this.duration + 'ms ' + settings.animationTimingFunc;
        }

        return property + ' 0ms ' + settings.animationTimingFunc;
      },


      /**
       * Sets value of transition on HTML element.
       *
       * @param {String=} property
       * @return {Void}
       */
      set: function set() {
        var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';

        Components.Html.wrapper.style.transition = this.compose(property);
      },


      /**
       * Removes value of transition from HTML element.
       *
       * @return {Void}
       */
      remove: function remove() {
        Components.Html.wrapper.style.transition = '';
      },


      /**
       * Runs callback after animation.
       *
       * @param  {Function} callback
       * @return {Void}
       */
      after: function after(callback) {
        setTimeout(function () {
          callback();
        }, this.duration);
      },


      /**
       * Enable transition.
       *
       * @return {Void}
       */
      enable: function enable() {
        disabled = false;

        this.set();
      },


      /**
       * Disable transition.
       *
       * @return {Void}
       */
      disable: function disable() {
        disabled = true;

        this.set();
      }
    };

    define(Transition, 'duration', {
      /**
       * Gets duration of the transition based
       * on currently running animation type.
       *
       * @return {Number}
       */
      get: function get() {
        var settings = Glide.settings;

        if (Glide.isType('slider') && Components.Run.offset) {
          return settings.rewindDuration;
        }

        return settings.animationDuration;
      }
    });

    /**
     * Set transition `style` value:
     * - on each moving, because it may be cleared by offset move
     */
    Events.on('move', function () {
      Transition.set();
    });

    /**
     * Disable transition:
     * - before initial build to avoid transitioning from `0` to `startAt` index
     * - while resizing window and recalculating dimentions
     * - on jumping from offset transition at start and end edges in `carousel` type
     */
    Events.on(['build.before', 'resize', 'translate.jump'], function () {
      Transition.disable();
    });

    /**
     * Enable transition:
     * - on each running, because it may be disabled by offset move
     */
    Events.on('run', function () {
      Transition.enable();
    });

    /**
     * Remove transition:
     * - on destroying to bring markup to its inital state
     */
    Events.on('destroy', function () {
      Transition.remove();
    });

    return Transition;
  }

  /**
   * Test via a getter in the options object to see
   * if the passive property is accessed.
   *
   * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
   */

  var supportsPassive = false;

  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassive = true;
      }
    });

    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (e) {}

  var supportsPassive$1 = supportsPassive;

  var START_EVENTS = ['touchstart', 'mousedown'];
  var MOVE_EVENTS = ['touchmove', 'mousemove'];
  var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
  var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];

  function Swipe (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();

    var swipeSin = 0;
    var swipeStartX = 0;
    var swipeStartY = 0;
    var disabled = false;
    var capture = supportsPassive$1 ? { passive: true } : false;

    var Swipe = {
      /**
       * Initializes swipe bindings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.bindSwipeStart();
      },


      /**
       * Handler for `swipestart` event. Calculates entry points of the user's tap.
       *
       * @param {Object} event
       * @return {Void}
       */
      start: function start(event) {
        if (!disabled && !Glide.disabled) {
          this.disable();

          var swipe = this.touches(event);

          swipeSin = null;
          swipeStartX = toInt(swipe.pageX);
          swipeStartY = toInt(swipe.pageY);

          this.bindSwipeMove();
          this.bindSwipeEnd();

          Events.emit('swipe.start');
        }
      },


      /**
       * Handler for `swipemove` event. Calculates user's tap angle and distance.
       *
       * @param {Object} event
       */
      move: function move(event) {
        if (!Glide.disabled) {
          var _Glide$settings = Glide.settings,
              touchAngle = _Glide$settings.touchAngle,
              touchRatio = _Glide$settings.touchRatio,
              classes = _Glide$settings.classes;


          var swipe = this.touches(event);

          var subExSx = toInt(swipe.pageX) - swipeStartX;
          var subEySy = toInt(swipe.pageY) - swipeStartY;
          var powEX = Math.abs(subExSx << 2);
          var powEY = Math.abs(subEySy << 2);
          var swipeHypotenuse = Math.sqrt(powEX + powEY);
          var swipeCathetus = Math.sqrt(powEY);

          swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);

          if (swipeSin * 180 / Math.PI < touchAngle) {
            event.stopPropagation();

            Components.Move.make(subExSx * toFloat(touchRatio));

            Components.Html.root.classList.add(classes.dragging);

            Events.emit('swipe.move');
          } else {
            return false;
          }
        }
      },


      /**
       * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
       *
       * @param {Object} event
       * @return {Void}
       */
      end: function end(event) {
        if (!Glide.disabled) {
          var settings = Glide.settings;

          var swipe = this.touches(event);
          var threshold = this.threshold(event);

          var swipeDistance = swipe.pageX - swipeStartX;
          var swipeDeg = swipeSin * 180 / Math.PI;
          var steps = Math.round(swipeDistance / Components.Sizes.slideWidth);

          this.enable();

          if (swipeDistance > threshold && swipeDeg < settings.touchAngle) {
            // While swipe is positive and greater than threshold move backward.
            if (settings.perTouch) {
              steps = Math.min(steps, toInt(settings.perTouch));
            }

            if (Components.Direction.is('rtl')) {
              steps = -steps;
            }

            Components.Run.make(Components.Direction.resolve('<' + steps));
          } else if (swipeDistance < -threshold && swipeDeg < settings.touchAngle) {
            // While swipe is negative and lower than negative threshold move forward.
            if (settings.perTouch) {
              steps = Math.max(steps, -toInt(settings.perTouch));
            }

            if (Components.Direction.is('rtl')) {
              steps = -steps;
            }

            Components.Run.make(Components.Direction.resolve('>' + steps));
          } else {
            // While swipe don't reach distance apply previous transform.
            Components.Move.make();
          }

          Components.Html.root.classList.remove(settings.classes.dragging);

          this.unbindSwipeMove();
          this.unbindSwipeEnd();

          Events.emit('swipe.end');
        }
      },


      /**
       * Binds swipe's starting event.
       *
       * @return {Void}
       */
      bindSwipeStart: function bindSwipeStart() {
        var _this = this;

        var settings = Glide.settings;

        if (settings.swipeThreshold) {
          Binder.on(START_EVENTS[0], Components.Html.wrapper, function (event) {
            _this.start(event);
          }, capture);
        }

        if (settings.dragThreshold) {
          Binder.on(START_EVENTS[1], Components.Html.wrapper, function (event) {
            _this.start(event);
          }, capture);
        }
      },


      /**
       * Unbinds swipe's starting event.
       *
       * @return {Void}
       */
      unbindSwipeStart: function unbindSwipeStart() {
        Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
        Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
      },


      /**
       * Binds swipe's moving event.
       *
       * @return {Void}
       */
      bindSwipeMove: function bindSwipeMove() {
        var _this2 = this;

        Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function (event) {
          _this2.move(event);
        }, Glide.settings.throttle), capture);
      },


      /**
       * Unbinds swipe's moving event.
       *
       * @return {Void}
       */
      unbindSwipeMove: function unbindSwipeMove() {
        Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
      },


      /**
       * Binds swipe's ending event.
       *
       * @return {Void}
       */
      bindSwipeEnd: function bindSwipeEnd() {
        var _this3 = this;

        Binder.on(END_EVENTS, Components.Html.wrapper, function (event) {
          _this3.end(event);
        });
      },


      /**
       * Unbinds swipe's ending event.
       *
       * @return {Void}
       */
      unbindSwipeEnd: function unbindSwipeEnd() {
        Binder.off(END_EVENTS, Components.Html.wrapper);
      },


      /**
       * Normalizes event touches points accorting to different types.
       *
       * @param {Object} event
       */
      touches: function touches(event) {
        if (MOUSE_EVENTS.indexOf(event.type) > -1) {
          return event;
        }

        return event.touches[0] || event.changedTouches[0];
      },


      /**
       * Gets value of minimum swipe distance settings based on event type.
       *
       * @return {Number}
       */
      threshold: function threshold(event) {
        var settings = Glide.settings;

        if (MOUSE_EVENTS.indexOf(event.type) > -1) {
          return settings.dragThreshold;
        }

        return settings.swipeThreshold;
      },


      /**
       * Enables swipe event.
       *
       * @return {self}
       */
      enable: function enable() {
        disabled = false;

        Components.Transition.enable();

        return this;
      },


      /**
       * Disables swipe event.
       *
       * @return {self}
       */
      disable: function disable() {
        disabled = true;

        Components.Transition.disable();

        return this;
      }
    };

    /**
     * Add component class:
     * - after initial building
     */
    Events.on('build.after', function () {
      Components.Html.root.classList.add(Glide.settings.classes.swipeable);
    });

    /**
     * Remove swiping bindings:
     * - on destroying, to remove added EventListeners
     */
    Events.on('destroy', function () {
      Swipe.unbindSwipeStart();
      Swipe.unbindSwipeMove();
      Swipe.unbindSwipeEnd();
      Binder.destroy();
    });

    return Swipe;
  }

  function Images (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();

    var Images = {
      /**
       * Binds listener to glide wrapper.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.bind();
      },


      /**
       * Binds `dragstart` event on wrapper to prevent dragging images.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('dragstart', Components.Html.wrapper, this.dragstart);
      },


      /**
       * Unbinds `dragstart` event on wrapper.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('dragstart', Components.Html.wrapper);
      },


      /**
       * Event handler. Prevents dragging.
       *
       * @return {Void}
       */
      dragstart: function dragstart(event) {
        event.preventDefault();
      }
    };

    /**
     * Remove bindings from images:
     * - on destroying, to remove added EventListeners
     */
    Events.on('destroy', function () {
      Images.unbind();
      Binder.destroy();
    });

    return Images;
  }

  function Anchors (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();

    /**
     * Holds detaching status of anchors.
     * Prevents detaching of already detached anchors.
     *
     * @private
     * @type {Boolean}
     */
    var detached = false;

    /**
     * Holds preventing status of anchors.
     * If `true` redirection after click will be disabled.
     *
     * @private
     * @type {Boolean}
     */
    var prevented = false;

    var Anchors = {
      /**
       * Setups a initial state of anchors component.
       *
       * @returns {Void}
       */
      mount: function mount() {
        /**
         * Holds collection of anchors elements.
         *
         * @private
         * @type {HTMLCollection}
         */
        this._a = Components.Html.wrapper.querySelectorAll('a');

        this.bind();
      },


      /**
       * Binds events to anchors inside a track.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('click', Components.Html.wrapper, this.click);
      },


      /**
       * Unbinds events attached to anchors inside a track.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('click', Components.Html.wrapper);
      },


      /**
       * Handler for click event. Prevents clicks when glide is in `prevent` status.
       *
       * @param  {Object} event
       * @return {Void}
       */
      click: function click(event) {
        if (prevented) {
          event.stopPropagation();
          event.preventDefault();
        }
      },


      /**
       * Detaches anchors click event inside glide.
       *
       * @return {self}
       */
      detach: function detach() {
        prevented = true;

        if (!detached) {
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].draggable = false;

            this.items[i].setAttribute('data-href', this.items[i].getAttribute('href'));

            this.items[i].removeAttribute('href');
          }

          detached = true;
        }

        return this;
      },


      /**
       * Attaches anchors click events inside glide.
       *
       * @return {self}
       */
      attach: function attach() {
        prevented = false;

        if (detached) {
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].draggable = true;

            this.items[i].setAttribute('href', this.items[i].getAttribute('data-href'));
          }

          detached = false;
        }

        return this;
      }
    };

    define(Anchors, 'items', {
      /**
       * Gets collection of the arrows HTML elements.
       *
       * @return {HTMLElement[]}
       */
      get: function get() {
        return Anchors._a;
      }
    });

    /**
     * Detach anchors inside slides:
     * - on swiping, so they won't redirect to its `href` attributes
     */
    Events.on('swipe.move', function () {
      Anchors.detach();
    });

    /**
     * Attach anchors inside slides:
     * - after swiping and transitions ends, so they can redirect after click again
     */
    Events.on('swipe.end', function () {
      Components.Transition.after(function () {
        Anchors.attach();
      });
    });

    /**
     * Unbind anchors inside slides:
     * - on destroying, to bring anchors to its initial state
     */
    Events.on('destroy', function () {
      Anchors.attach();
      Anchors.unbind();
      Binder.destroy();
    });

    return Anchors;
  }

  var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
  var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';

  function Controls (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();

    var capture = supportsPassive$1 ? { passive: true } : false;

    var Controls = {
      /**
       * Inits arrows. Binds events listeners
       * to the arrows HTML elements.
       *
       * @return {Void}
       */
      mount: function mount() {
        /**
         * Collection of navigation HTML elements.
         *
         * @private
         * @type {HTMLCollection}
         */
        this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);

        /**
         * Collection of controls HTML elements.
         *
         * @private
         * @type {HTMLCollection}
         */
        this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);

        this.addBindings();
      },


      /**
       * Sets active class to current slide.
       *
       * @return {Void}
       */
      setActive: function setActive() {
        for (var i = 0; i < this._n.length; i++) {
          this.addClass(this._n[i].children);
        }
      },


      /**
       * Removes active class to current slide.
       *
       * @return {Void}
       */
      removeActive: function removeActive() {
        for (var i = 0; i < this._n.length; i++) {
          this.removeClass(this._n[i].children);
        }
      },


      /**
       * Toggles active class on items inside navigation.
       *
       * @param  {HTMLElement} controls
       * @return {Void}
       */
      addClass: function addClass(controls) {
        var settings = Glide.settings;
        var item = controls[Glide.index];

        if (item) {
          item.classList.add(settings.classes.activeNav);

          siblings(item).forEach(function (sibling) {
            sibling.classList.remove(settings.classes.activeNav);
          });
        }
      },


      /**
       * Removes active class from active control.
       *
       * @param  {HTMLElement} controls
       * @return {Void}
       */
      removeClass: function removeClass(controls) {
        var item = controls[Glide.index];

        if (item) {
          item.classList.remove(Glide.settings.classes.activeNav);
        }
      },


      /**
       * Adds handles to the each group of controls.
       *
       * @return {Void}
       */
      addBindings: function addBindings() {
        for (var i = 0; i < this._c.length; i++) {
          this.bind(this._c[i].children);
        }
      },


      /**
       * Removes handles from the each group of controls.
       *
       * @return {Void}
       */
      removeBindings: function removeBindings() {
        for (var i = 0; i < this._c.length; i++) {
          this.unbind(this._c[i].children);
        }
      },


      /**
       * Binds events to arrows HTML elements.
       *
       * @param {HTMLCollection} elements
       * @return {Void}
       */
      bind: function bind(elements) {
        for (var i = 0; i < elements.length; i++) {
          Binder.on('click', elements[i], this.click);
          Binder.on('touchstart', elements[i], this.click, capture);
        }
      },


      /**
       * Unbinds events binded to the arrows HTML elements.
       *
       * @param {HTMLCollection} elements
       * @return {Void}
       */
      unbind: function unbind(elements) {
        for (var i = 0; i < elements.length; i++) {
          Binder.off(['click', 'touchstart'], elements[i]);
        }
      },


      /**
       * Handles `click` event on the arrows HTML elements.
       * Moves slider in driection precised in
       * `data-glide-dir` attribute.
       *
       * @param {Object} event
       * @return {Void}
       */
      click: function click(event) {
        event.preventDefault();

        Components.Run.make(Components.Direction.resolve(event.currentTarget.getAttribute('data-glide-dir')));
      }
    };

    define(Controls, 'items', {
      /**
       * Gets collection of the controls HTML elements.
       *
       * @return {HTMLElement[]}
       */
      get: function get() {
        return Controls._c;
      }
    });

    /**
     * Swap active class of current navigation item:
     * - after mounting to set it to initial index
     * - after each move to the new index
     */
    Events.on(['mount.after', 'move.after'], function () {
      Controls.setActive();
    });

    /**
     * Remove bindings and HTML Classes:
     * - on destroying, to bring markup to its initial state
     */
    Events.on('destroy', function () {
      Controls.removeBindings();
      Controls.removeActive();
      Binder.destroy();
    });

    return Controls;
  }

  function Keyboard (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();

    var Keyboard = {
      /**
       * Binds keyboard events on component mount.
       *
       * @return {Void}
       */
      mount: function mount() {
        if (Glide.settings.keyboard) {
          this.bind();
        }
      },


      /**
       * Adds keyboard press events.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('keyup', document, this.press);
      },


      /**
       * Removes keyboard press events.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('keyup', document);
      },


      /**
       * Handles keyboard's arrows press and moving glide foward and backward.
       *
       * @param  {Object} event
       * @return {Void}
       */
      press: function press(event) {
        if (event.keyCode === 39) {
          Components.Run.make(Components.Direction.resolve('>'));
        }

        if (event.keyCode === 37) {
          Components.Run.make(Components.Direction.resolve('<'));
        }
      }
    };

    /**
     * Remove bindings from keyboard:
     * - on destroying to remove added events
     * - on updating to remove events before remounting
     */
    Events.on(['destroy', 'update'], function () {
      Keyboard.unbind();
    });

    /**
     * Remount component
     * - on updating to reflect potential changes in settings
     */
    Events.on('update', function () {
      Keyboard.mount();
    });

    /**
     * Destroy binder:
     * - on destroying to remove listeners
     */
    Events.on('destroy', function () {
      Binder.destroy();
    });

    return Keyboard;
  }

  function Autoplay (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();

    var Autoplay = {
      /**
       * Initializes autoplaying and events.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.start();

        if (Glide.settings.hoverpause) {
          this.bind();
        }
      },


      /**
       * Starts autoplaying in configured interval.
       *
       * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
       * @return {Void}
       */
      start: function start() {
        var _this = this;

        if (Glide.settings.autoplay) {
          if (isUndefined(this._i)) {
            this._i = setInterval(function () {
              _this.stop();

              Components.Run.make('>');

              _this.start();
            }, this.time);
          }
        }
      },


      /**
       * Stops autorunning of the glide.
       *
       * @return {Void}
       */
      stop: function stop() {
        this._i = clearInterval(this._i);
      },


      /**
       * Stops autoplaying while mouse is over glide's area.
       *
       * @return {Void}
       */
      bind: function bind() {
        var _this2 = this;

        Binder.on('mouseover', Components.Html.root, function () {
          _this2.stop();
        });

        Binder.on('mouseout', Components.Html.root, function () {
          _this2.start();
        });
      },


      /**
       * Unbind mouseover events.
       *
       * @returns {Void}
       */
      unbind: function unbind() {
        Binder.off(['mouseover', 'mouseout'], Components.Html.root);
      }
    };

    define(Autoplay, 'time', {
      /**
       * Gets time period value for the autoplay interval. Prioritizes
       * times in `data-glide-autoplay` attrubutes over options.
       *
       * @return {Number}
       */
      get: function get() {
        var autoplay = Components.Html.slides[Glide.index].getAttribute('data-glide-autoplay');

        if (autoplay) {
          return toInt(autoplay);
        }

        return toInt(Glide.settings.autoplay);
      }
    });

    /**
     * Stop autoplaying and unbind events:
     * - on destroying, to clear defined interval
     * - on updating via API to reset interval that may changed
     */
    Events.on(['destroy', 'update'], function () {
      Autoplay.unbind();
    });

    /**
     * Stop autoplaying:
     * - before each run, to restart autoplaying
     * - on pausing via API
     * - on destroying, to clear defined interval
     * - while starting a swipe
     * - on updating via API to reset interval that may changed
     */
    Events.on(['run.before', 'pause', 'destroy', 'swipe.start', 'update'], function () {
      Autoplay.stop();
    });

    /**
     * Start autoplaying:
     * - after each run, to restart autoplaying
     * - on playing via API
     * - while ending a swipe
     */
    Events.on(['run.after', 'play', 'swipe.end'], function () {
      Autoplay.start();
    });

    /**
     * Remount autoplaying:
     * - on updating via API to reset interval that may changed
     */
    Events.on('update', function () {
      Autoplay.mount();
    });

    /**
     * Destroy a binder:
     * - on destroying glide instance to clearup listeners
     */
    Events.on('destroy', function () {
      Binder.destroy();
    });

    return Autoplay;
  }

  /**
   * Sorts keys of breakpoint object so they will be ordered from lower to bigger.
   *
   * @param {Object} points
   * @returns {Object}
   */
  function sortBreakpoints(points) {
    if (isObject(points)) {
      return sortKeys(points);
    } else {
      warn('Breakpoints option must be an object');
    }

    return {};
  }

  function Breakpoints (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();

    /**
     * Holds reference to settings.
     *
     * @type {Object}
     */
    var settings = Glide.settings;

    /**
     * Holds reference to breakpoints object in settings. Sorts breakpoints
     * from smaller to larger. It is required in order to proper
     * matching currently active breakpoint settings.
     *
     * @type {Object}
     */
    var points = sortBreakpoints(settings.breakpoints);

    /**
     * Cache initial settings before overwritting.
     *
     * @type {Object}
     */
    var defaults = _extends({}, settings);

    var Breakpoints = {
      /**
       * Matches settings for currectly matching media breakpoint.
       *
       * @param {Object} points
       * @returns {Object}
       */
      match: function match(points) {
        if (typeof window.matchMedia !== 'undefined') {
          for (var point in points) {
            if (points.hasOwnProperty(point)) {
              if (window.matchMedia('(max-width: ' + point + 'px)').matches) {
                return points[point];
              }
            }
          }
        }

        return defaults;
      }
    };

    /**
     * Overwrite instance settings with currently matching breakpoint settings.
     * This happens right after component initialization.
     */
    _extends(settings, Breakpoints.match(points));

    /**
     * Update glide with settings of matched brekpoint:
     * - window resize to update slider
     */
    Binder.on('resize', window, throttle(function () {
      Glide.settings = mergeOptions(settings, Breakpoints.match(points));
    }, Glide.settings.throttle));

    /**
     * Resort and update default settings:
     * - on reinit via API, so breakpoint matching will be performed with options
     */
    Events.on('update', function () {
      points = sortBreakpoints(points);

      defaults = _extends({}, settings);
    });

    /**
     * Unbind resize listener:
     * - on destroying, to bring markup to its initial state
     */
    Events.on('destroy', function () {
      Binder.off('resize', window);
    });

    return Breakpoints;
  }

  var COMPONENTS = {
    // Required
    Html: Html,
    Translate: Translate,
    Transition: Transition,
    Direction: Direction,
    Peek: Peek,
    Sizes: Sizes,
    Gaps: Gaps,
    Move: Move,
    Clones: Clones,
    Resize: Resize,
    Build: Build,
    Run: Run,

    // Optional
    Swipe: Swipe,
    Images: Images,
    Anchors: Anchors,
    Controls: Controls,
    Keyboard: Keyboard,
    Autoplay: Autoplay,
    Breakpoints: Breakpoints
  };

  var Glide$1 = function (_Core) {
    inherits(Glide$$1, _Core);

    function Glide$$1() {
      classCallCheck(this, Glide$$1);
      return possibleConstructorReturn(this, (Glide$$1.__proto__ || Object.getPrototypeOf(Glide$$1)).apply(this, arguments));
    }

    createClass(Glide$$1, [{
      key: 'mount',
      value: function mount() {
        var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return get(Glide$$1.prototype.__proto__ || Object.getPrototypeOf(Glide$$1.prototype), 'mount', this).call(this, _extends({}, COMPONENTS, extensions));
      }
    }]);
    return Glide$$1;
  }(Glide);

  return Glide$1;

})));

},{}],9:[function(require,module,exports){
(function (setImmediate){
/*!
 * ApexCharts v3.11.2
 * (c) 2018-2019 Juned Chhipa
 * Released under the MIT License.
 */
"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function _createClass(t,e,i){return e&&_defineProperties(t.prototype,e),i&&_defineProperties(t,i),t}function _defineProperty(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function ownKeys(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,s)}return i}function _objectSpread2(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(i),!0).forEach((function(e){_defineProperty(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):ownKeys(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_setPrototypeOf(t,e)}function _getPrototypeOf(t){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function _setPrototypeOf(t,e){return(_setPrototypeOf=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function _possibleConstructorReturn(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?_assertThisInitialized(t):e}function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_nonIterableSpread()}function _arrayWithoutHoles(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}function _iterableToArray(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}var Utils=function(){function t(){_classCallCheck(this,t)}return _createClass(t,[{key:"shadeRGBColor",value:function(t,e){var i=e.split(","),s=t<0?0:255,a=t<0?-1*t:t,r=parseInt(i[0].slice(4),10),n=parseInt(i[1],10),o=parseInt(i[2],10);return"rgb("+(Math.round((s-r)*a)+r)+","+(Math.round((s-n)*a)+n)+","+(Math.round((s-o)*a)+o)+")"}},{key:"shadeHexColor",value:function(t,e){var i=parseInt(e.slice(1),16),s=t<0?0:255,a=t<0?-1*t:t,r=i>>16,n=i>>8&255,o=255&i;return"#"+(16777216+65536*(Math.round((s-r)*a)+r)+256*(Math.round((s-n)*a)+n)+(Math.round((s-o)*a)+o)).toString(16).slice(1)}},{key:"shadeColor",value:function(t,e){return e.length>7?this.shadeRGBColor(t,e):this.shadeHexColor(t,e)}}],[{key:"bind",value:function(t,e){return function(){return t.apply(e,arguments)}}},{key:"isObject",value:function(t){return t&&"object"===_typeof(t)&&!Array.isArray(t)&&null!=t}},{key:"listToArray",value:function(t){var e,i=[];for(e=0;e<t.length;e++)i[e]=t[e];return i}},{key:"extend",value:function(t,e){var i=this;"function"!=typeof Object.assign&&(Object.assign=function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),i=1;i<arguments.length;i++){var s=arguments[i];if(null!=s)for(var a in s)s.hasOwnProperty(a)&&(e[a]=s[a])}return e});var s=Object.assign({},t);return this.isObject(t)&&this.isObject(e)&&Object.keys(e).forEach((function(a){i.isObject(e[a])&&a in t?s[a]=i.extend(t[a],e[a]):Object.assign(s,_defineProperty({},a,e[a]))})),s}},{key:"extendArray",value:function(e,i){var s=[];return e.map((function(e){s.push(t.extend(i,e))})),e=s}},{key:"monthMod",value:function(t){return t%12}},{key:"addProps",value:function(t,e,i){"string"==typeof e&&(e=e.split(".")),t[e[0]]=t[e[0]]||{};var s=t[e[0]];return e.length>1?(e.shift(),this.addProps(s,e,i)):t[e[0]]=i,t}},{key:"clone",value:function(t){if("[object Array]"===Object.prototype.toString.call(t)){for(var e=[],i=0;i<t.length;i++)e[i]=this.clone(t[i]);return e}if("object"===_typeof(t)){var s={};for(var a in t)t.hasOwnProperty(a)&&(s[a]=this.clone(t[a]));return s}return t}},{key:"log10",value:function(t){return Math.log(t)/Math.LN10}},{key:"roundToBase10",value:function(t){return Math.pow(10,Math.floor(Math.log10(t)))}},{key:"roundToBase",value:function(t,e){return Math.pow(e,Math.floor(Math.log(t)/Math.log(e)))}},{key:"parseNumber",value:function(t){return null===t?t:parseFloat(t)}},{key:"randomId",value:function(){return(Math.random()+1).toString(36).substring(4)}},{key:"noExponents",value:function(t){var e=String(t).split(/[eE]/);if(1===e.length)return e[0];var i="",s=t<0?"-":"",a=e[0].replace(".",""),r=Number(e[1])+1;if(r<0){for(i=s+"0.";r++;)i+="0";return i+a.replace(/^-/,"")}for(r-=a.length;r--;)i+="0";return a+i}},{key:"getDimensions",value:function(t){var e=getComputedStyle(t),i=[],s=t.clientHeight,a=t.clientWidth;return s-=parseFloat(e.paddingTop)+parseFloat(e.paddingBottom),a-=parseFloat(e.paddingLeft)+parseFloat(e.paddingRight),i.push(a),i.push(s),i}},{key:"getBoundingClientRect",value:function(t){var e=t.getBoundingClientRect();return{top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.width,height:e.height,x:e.x,y:e.y}}},{key:"hexToRgba",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#999999",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.6;"#"!==t.substring(0,1)&&(t="#999999");var i=t.replace("#","");i=i.match(new RegExp("(.{"+i.length/3+"})","g"));for(var s=0;s<i.length;s++)i[s]=parseInt(1===i[s].length?i[s]+i[s]:i[s],16);return void 0!==e&&i.push(e),"rgba("+i.join(",")+")"}},{key:"getOpacityFromRGBA",value:function(t){return(t=t.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))[3]}},{key:"rgb2hex",value:function(t){return(t=t.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===t.length?"#"+("0"+parseInt(t[1],10).toString(16)).slice(-2)+("0"+parseInt(t[2],10).toString(16)).slice(-2)+("0"+parseInt(t[3],10).toString(16)).slice(-2):""}},{key:"isColorHex",value:function(t){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)}},{key:"polarToCartesian",value:function(t,e,i,s){var a=(s-90)*Math.PI/180;return{x:t+i*Math.cos(a),y:e+i*Math.sin(a)}}},{key:"escapeString",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"x",i=t.toString().slice();return i=i.replace(/[` ~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi,e)}},{key:"negToZero",value:function(t){return t<0?0:t}},{key:"moveIndexInArray",value:function(t,e,i){if(i>=t.length)for(var s=i-t.length+1;s--;)t.push(void 0);return t.splice(i,0,t.splice(e,1)[0]),t}},{key:"extractNumber",value:function(t){return parseFloat(t.replace(/[^\d.]*/g,""))}},{key:"randomString",value:function(t){for(var e="",i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",s=0;s<t;s++)e+=i.charAt(Math.floor(Math.random()*i.length));return e}},{key:"findAncestor",value:function(t,e){for(;(t=t.parentElement)&&!t.classList.contains(e););return t}},{key:"setELstyles",value:function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t.style.key=e[i])}},{key:"isNumber",value:function(t){return!isNaN(t)&&parseFloat(Number(t))===t&&!isNaN(parseInt(t,10))}},{key:"isFloat",value:function(t){return Number(t)===t&&t%1!=0}},{key:"isSafari",value:function(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)}},{key:"isFirefox",value:function(){return navigator.userAgent.toLowerCase().indexOf("firefox")>-1}},{key:"isIE11",value:function(){if(-1!==window.navigator.userAgent.indexOf("MSIE")||window.navigator.appVersion.indexOf("Trident/")>-1)return!0}},{key:"isIE",value:function(){var t=window.navigator.userAgent,e=t.indexOf("MSIE ");if(e>0)return parseInt(t.substring(e+5,t.indexOf(".",e)),10);if(t.indexOf("Trident/")>0){var i=t.indexOf("rv:");return parseInt(t.substring(i+3,t.indexOf(".",i)),10)}var s=t.indexOf("Edge/");return s>0&&parseInt(t.substring(s+5,t.indexOf(".",s)),10)}}]),t}(),Filters=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w}return _createClass(t,[{key:"getDefaultFilter",value:function(t,e){var i=this.w;t.unfilter(!0),(new window.SVG.Filter).size("120%","180%","-5%","-40%"),"none"!==i.config.states.normal.filter?this.applyFilter(t,e,i.config.states.normal.filter.type,i.config.states.normal.filter.value):i.config.chart.dropShadow.enabled&&this.dropShadow(t,i.config.chart.dropShadow,e)}},{key:"addNormalFilter",value:function(t,e){var i=this.w;i.config.chart.dropShadow.enabled&&this.dropShadow(t,i.config.chart.dropShadow,e)}},{key:"addLightenFilter",value:function(t,e,i){var s=this,a=this.w,r=i.intensity;if(!Utils.isFirefox()){t.unfilter(!0);var n=new window.SVG.Filter;n.size("120%","180%","-5%","-40%"),t.filter((function(t){var i=a.config.chart.dropShadow;(n=i.enabled?s.addShadow(t,e,i):t).componentTransfer({rgb:{type:"linear",slope:1.5,intercept:r}})})),t.filterer.node.setAttribute("filterUnits","userSpaceOnUse")}}},{key:"addDarkenFilter",value:function(t,e,i){var s=this,a=this.w,r=i.intensity;if(!Utils.isFirefox()){t.unfilter(!0);var n=new window.SVG.Filter;n.size("120%","180%","-5%","-40%"),t.filter((function(t){var i=a.config.chart.dropShadow;(n=i.enabled?s.addShadow(t,e,i):t).componentTransfer({rgb:{type:"linear",slope:r}})})),t.filterer.node.setAttribute("filterUnits","userSpaceOnUse")}}},{key:"applyFilter",value:function(t,e,i){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.5;switch(i){case"none":this.addNormalFilter(t,e);break;case"lighten":this.addLightenFilter(t,e,{intensity:s});break;case"darken":this.addDarkenFilter(t,e,{intensity:s})}}},{key:"addShadow",value:function(t,e,i){var s=i.blur,a=i.top,r=i.left,n=i.color,o=i.opacity,l=t.flood(Array.isArray(n)?n[e]:n,o).composite(t.sourceAlpha,"in").offset(r,a).gaussianBlur(s).merge(t.source);return t.blend(t.source,l)}},{key:"dropShadow",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=e.top,a=e.left,r=e.blur,n=e.color,o=e.opacity,l=e.noUserSpaceOnUse,h=this.w;if(t.unfilter(!0),Utils.isIE()&&"radialBar"===h.config.chart.type)return t;n=Array.isArray(n)?n[i]:n;var c=new window.SVG.Filter;return c.size("120%","180%","-5%","-40%"),t.filter((function(t){var e=null;e=Utils.isSafari()||Utils.isFirefox()||Utils.isIE()?t.flood(n,o).composite(t.sourceAlpha,"in").offset(a,s).gaussianBlur(r):t.flood(n,o).composite(t.sourceAlpha,"in").offset(a,s).gaussianBlur(r).merge(t.source),t.blend(t.source,e)})),l||t.filterer.node.setAttribute("filterUnits","userSpaceOnUse"),t}},{key:"setSelectionFilter",value:function(t,e,i){var s=this.w;if(void 0!==s.globals.selectedDataPoints[e]&&s.globals.selectedDataPoints[e].indexOf(i)>-1){t.node.setAttribute("selected",!0);var a=s.config.states.active.filter;"none"!==a&&this.applyFilter(t,e,a.type,a.value)}}}]),t}(),Animations=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w,this.setEasingFunctions()}return _createClass(t,[{key:"setEasingFunctions",value:function(){var t;if(!this.w.globals.easing){switch(this.w.config.chart.animations.easing){case"linear":t="-";break;case"easein":t="<";break;case"easeout":t=">";break;case"easeinout":t="<>";break;case"swing":t=function(t){var e=1.70158;return(t-=1)*t*((e+1)*t+e)+1};break;case"bounce":t=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375};break;case"elastic":t=function(t){return t===!!t?t:Math.pow(2,-10*t)*Math.sin((t-.075)*(2*Math.PI)/.3)+1};break;default:t="<>"}this.w.globals.easing=t}}},{key:"animateLine",value:function(t,e,i,s){t.attr(e).animate(s).attr(i)}},{key:"animateCircleRadius",value:function(t,e,i,s,a){e||(e=0),t.attr({r:e}).animate(s,a).attr({r:i})}},{key:"animateCircle",value:function(t,e,i,s,a){t.attr({r:e.r,cx:e.cx,cy:e.cy}).animate(s,a).attr({r:i.r,cx:i.cx,cy:i.cy})}},{key:"animateRect",value:function(t,e,i,s,a){t.attr(e).animate(s).attr(i).afterAll((function(){return a()}))}},{key:"animatePathsGradually",value:function(t){var e=t.el,i=t.j,s=t.pathFrom,a=t.pathTo,r=t.speed,n=t.delay,o=this.w,l=0;o.config.chart.animations.animateGradually.enabled&&(l=o.config.chart.animations.animateGradually.delay),o.config.chart.animations.dynamicAnimation.enabled&&o.globals.dataChanged&&(l=0),this.morphSVG(e,i,s,a,r,n*l)}},{key:"showDelayedElements",value:function(){this.w.globals.delayedElements.forEach((function(t){t.el.classList.remove("hidden")}))}},{key:"animationCompleted",value:function(t){var e=this.w;e.globals.animationEnded=!0,"function"==typeof e.config.chart.events.animationEnd&&e.config.chart.events.animationEnd(this.ctx,{el:t,w:e})}},{key:"morphSVG",value:function(t,e,i,s,a,r){var n=this,o=this.w;i||(i=t.attr("pathFrom")),s||(s=t.attr("pathTo")),(!i||i.indexOf("undefined")>-1||i.indexOf("NaN")>-1)&&(i="M 0 ".concat(o.globals.gridHeight),a=1),(s.indexOf("undefined")>-1||s.indexOf("NaN")>-1)&&(s="M 0 ".concat(o.globals.gridHeight),a=1),o.globals.shouldAnimate||(a=1),t.plot(i).animate(1,o.globals.easing,r).plot(i).animate(a,o.globals.easing,r).plot(s).afterAll((function(){Utils.isNumber(e)?e===o.globals.series[o.globals.maxValsInArrayIndex].length-2&&o.globals.shouldAnimate&&n.animationCompleted(t):o.globals.shouldAnimate&&n.animationCompleted(t),n.showDelayedElements()}))}}]),t}(),Graphics=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w}return _createClass(t,[{key:"drawLine",value:function(t,e,i,s){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"#a8a8a8",r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,n=arguments.length>6&&void 0!==arguments[6]?arguments[6]:null,o=this.w,l=o.globals.dom.Paper.line().attr({x1:t,y1:e,x2:i,y2:s,stroke:a,"stroke-dasharray":r,"stroke-width":n});return l}},{key:"drawRect",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"#fefefe",n=arguments.length>6&&void 0!==arguments[6]?arguments[6]:1,o=arguments.length>7&&void 0!==arguments[7]?arguments[7]:null,l=arguments.length>8&&void 0!==arguments[8]?arguments[8]:null,h=arguments.length>9&&void 0!==arguments[9]?arguments[9]:0,c=this.w,d=c.globals.dom.Paper.rect();return d.attr({x:t,y:e,width:i>0?i:0,height:s>0?s:0,rx:a,ry:a,fill:r,opacity:n,"stroke-width":null!==o?o:0,stroke:null!==l?l:"none","stroke-dasharray":h}),d}},{key:"drawPolygon",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#e1e1e1",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"none",s=this.w,a=s.globals.dom.Paper.polygon(t).attr({fill:i,stroke:e});return a}},{key:"drawCircle",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=this.w,s=i.globals.dom.Paper.circle(2*t);return null!==e&&s.attr(e),s}},{key:"drawPath",value:function(t){var e=t.d,i=void 0===e?"":e,s=t.stroke,a=void 0===s?"#a8a8a8":s,r=t.strokeWidth,n=void 0===r?1:r,o=t.fill,l=t.fillOpacity,h=void 0===l?1:l,c=t.strokeOpacity,d=void 0===c?1:c,u=t.classes,g=t.strokeLinecap,f=void 0===g?null:g,p=t.strokeDashArray,x=void 0===p?0:p,b=this.w;return null===f&&(f=b.config.stroke.lineCap),(i.indexOf("undefined")>-1||i.indexOf("NaN")>-1)&&(i="M 0 ".concat(b.globals.gridHeight)),b.globals.dom.Paper.path(i).attr({fill:o,"fill-opacity":h,stroke:a,"stroke-opacity":d,"stroke-linecap":f,"stroke-width":n,"stroke-dasharray":x,class:u})}},{key:"group",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this.w,i=e.globals.dom.Paper.group();return null!==t&&i.attr(t),i}},{key:"move",value:function(t,e){var i=["M",t,e].join(" ");return i}},{key:"line",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=null;return null===i?s=["L",t,e].join(" "):"H"===i?s=["H",t].join(" "):"V"===i&&(s=["V",e].join(" ")),s}},{key:"curve",value:function(t,e,i,s,a,r){var n=["C",t,e,i,s,a,r].join(" ");return n}},{key:"quadraticCurve",value:function(t,e,i,s){return["Q",t,e,i,s].join(" ")}},{key:"arc",value:function(t,e,i,s,a,r,n){var o=arguments.length>7&&void 0!==arguments[7]&&arguments[7],l="A";o&&(l="a");var h=[l,t,e,i,s,a,r,n].join(" ");return h}},{key:"renderPaths",value:function(t){var e,i=t.j,s=t.realIndex,a=t.pathFrom,r=t.pathTo,n=t.stroke,o=t.strokeWidth,l=t.strokeLinecap,h=t.fill,c=t.animationDelay,d=t.initialSpeed,u=t.dataChangeSpeed,g=t.className,f=t.shouldClipToGrid,p=void 0===f||f,x=t.bindEventsOnPaths,b=void 0===x||x,m=t.drawShadow,v=void 0===m||m,y=this.w,w=new Filters(this.ctx),k=new Animations(this.ctx),A=this.w.config.chart.animations.enabled,S=A&&this.w.config.chart.animations.dynamicAnimation.enabled,C=!!(A&&!y.globals.resized||S&&y.globals.dataChanged&&y.globals.shouldAnimate);C?e=a:(e=r,y.globals.animationEnded=!0);var L=y.config.stroke.dashArray,P=0;P=Array.isArray(L)?L[s]:y.config.stroke.dashArray;var T=this.drawPath({d:e,stroke:n,strokeWidth:o,fill:h,fillOpacity:1,classes:g,strokeLinecap:l,strokeDashArray:P});if(T.attr("index",s),p&&T.attr({"clip-path":"url(#gridRectMask".concat(y.globals.cuid,")")}),"none"!==y.config.states.normal.filter.type)w.getDefaultFilter(T,s);else if(y.config.chart.dropShadow.enabled&&v&&(!y.config.chart.dropShadow.enabledSeries||y.config.chart.dropShadow.enabledSeries&&-1!==y.config.chart.dropShadow.enabledSeries.indexOf(s))){var z=y.config.chart.dropShadow;w.dropShadow(T,z,s)}b&&(T.node.addEventListener("mouseenter",this.pathMouseEnter.bind(this,T)),T.node.addEventListener("mouseleave",this.pathMouseLeave.bind(this,T)),T.node.addEventListener("mousedown",this.pathMouseDown.bind(this,T))),T.attr({pathTo:r,pathFrom:a});var E={el:T,j:i,pathFrom:a,pathTo:r,strokeWidth:o};return!A||y.globals.resized||y.globals.dataChanged?!y.globals.resized&&y.globals.dataChanged||k.showDelayedElements():k.animatePathsGradually(_objectSpread2({},E,{speed:d,delay:c})),y.globals.dataChanged&&S&&C&&k.animatePathsGradually(_objectSpread2({},E,{speed:u})),T}},{key:"drawPattern",value:function(t,e,i){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"#a8a8a8",a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,r=this.w,n=r.globals.dom.Paper.pattern(e,i,(function(r){"horizontalLines"===t?r.line(0,0,i,0).stroke({color:s,width:a+1}):"verticalLines"===t?r.line(0,0,0,e).stroke({color:s,width:a+1}):"slantedLines"===t?r.line(0,0,e,i).stroke({color:s,width:a}):"squares"===t?r.rect(e,i).fill("none").stroke({color:s,width:a}):"circles"===t&&r.circle(e).fill("none").stroke({color:s,width:a})}));return n}},{key:"drawGradient",value:function(t,e,i,s,a){var r,n=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:null,l=arguments.length>7&&void 0!==arguments[7]?arguments[7]:null,h=arguments.length>8&&void 0!==arguments[8]?arguments[8]:0,c=this.w;e=Utils.hexToRgba(e,s),i=Utils.hexToRgba(i,a);var d=0,u=1,g=1,f=null;null!==o&&(d=void 0!==o[0]?o[0]/100:0,u=void 0!==o[1]?o[1]/100:1,g=void 0!==o[2]?o[2]/100:1,f=void 0!==o[3]?o[3]/100:null);var p=!("donut"!==c.config.chart.type&&"pie"!==c.config.chart.type&&"bubble"!==c.config.chart.type);if(r=null===l||0===l.length?c.globals.dom.Paper.gradient(p?"radial":"linear",(function(t){t.at(d,e,s),t.at(u,i,a),t.at(g,i,a),null!==f&&t.at(f,e,s)})):c.globals.dom.Paper.gradient(p?"radial":"linear",(function(t){(Array.isArray(l[h])?l[h]:l).forEach((function(e){t.at(e.offset/100,e.color,e.opacity)}))})),p){var x=c.globals.gridWidth/2,b=c.globals.gridHeight/2;"bubble"!==c.config.chart.type?r.attr({gradientUnits:"userSpaceOnUse",cx:x,cy:b,r:n}):r.attr({cx:.5,cy:.5,r:.8,fx:.2,fy:.2})}else"vertical"===t?r.from(0,0).to(0,1):"diagonal"===t?r.from(0,0).to(1,1):"horizontal"===t?r.from(0,1).to(1,1):"diagonal2"===t&&r.from(0,1).to(2,2);return r}},{key:"drawText",value:function(t){var e,i=this.w,s=t.x,a=t.y,r=t.text,n=t.textAnchor,o=t.fontSize,l=t.fontFamily,h=t.fontWeight,c=t.foreColor,d=t.opacity;return void 0===r&&(r=""),n||(n="start"),c||(c=i.config.chart.foreColor),l=l||i.config.chart.fontFamily,h=h||"regular",(e=Array.isArray(r)?i.globals.dom.Paper.text((function(t){for(var e=0;e<r.length;e++)t.tspan(r[e])})):i.globals.dom.Paper.plain(r)).attr({x:s,y:a,"text-anchor":n,"dominant-baseline":"auto","font-size":o,"font-family":l,"font-weight":h,fill:c,class:(t.cssClass,t.cssClass)}),e.node.style.fontFamily=l,e.node.style.opacity=d,e}},{key:"addTspan",value:function(t,e,i){var s=t.tspan(e);i||(i=this.w.config.chart.fontFamily),s.node.style.fontFamily=i}},{key:"drawMarker",value:function(t,e,i){t=t||0;var s=i.pSize||0,a=null;if("square"===i.shape){var r=void 0===i.pRadius?s/2:i.pRadius;null===e&&(s=0,r=0);var n=1.2*s+r,o=this.drawRect(n,n,n,n,r);o.attr({x:t-n/2,y:e-n/2,cx:t,cy:e,class:i.class?i.class:"",fill:i.pointFillColor,"fill-opacity":i.pointFillOpacity?i.pointFillOpacity:1,stroke:i.pointStrokeColor,"stroke-width":i.pWidth?i.pWidth:0,"stroke-opacity":i.pointStrokeOpacity?i.pointStrokeOpacity:1}),a=o}else"circle"!==i.shape&&i.shape||(Utils.isNumber(e)||(s=0,e=0),a=this.drawCircle(s,{cx:t,cy:e,class:i.class?i.class:"",stroke:i.pointStrokeColor,fill:i.pointFillColor,"fill-opacity":i.pointFillOpacity?i.pointFillOpacity:1,"stroke-width":i.pWidth?i.pWidth:0,"stroke-opacity":i.pointStrokeOpacity?i.pointStrokeOpacity:1}));return a}},{key:"pathMouseEnter",value:function(t,e){var i=this.w,s=new Filters(this.ctx),a=parseInt(t.node.getAttribute("index"),10),r=parseInt(t.node.getAttribute("j"),10);if("function"==typeof i.config.chart.events.dataPointMouseEnter&&i.config.chart.events.dataPointMouseEnter(e,this.ctx,{seriesIndex:a,dataPointIndex:r,w:i}),this.ctx.fireEvent("dataPointMouseEnter",[e,this.ctx,{seriesIndex:a,dataPointIndex:r,w:i}]),("none"===i.config.states.active.filter.type||"true"!==t.node.getAttribute("selected"))&&"none"!==i.config.states.hover.filter.type&&"none"!==i.config.states.active.filter.type&&!i.globals.isTouchDevice){var n=i.config.states.hover.filter;s.applyFilter(t,a,n.type,n.value)}}},{key:"pathMouseLeave",value:function(t,e){var i=this.w,s=new Filters(this.ctx),a=parseInt(t.node.getAttribute("index"),10),r=parseInt(t.node.getAttribute("j"),10);"function"==typeof i.config.chart.events.dataPointMouseLeave&&i.config.chart.events.dataPointMouseLeave(e,this.ctx,{seriesIndex:a,dataPointIndex:r,w:i}),this.ctx.fireEvent("dataPointMouseLeave",[e,this.ctx,{seriesIndex:a,dataPointIndex:r,w:i}]),"none"!==i.config.states.active.filter.type&&"true"===t.node.getAttribute("selected")||"none"!==i.config.states.hover.filter.type&&s.getDefaultFilter(t,a)}},{key:"pathMouseDown",value:function(t,e){var i=this.w,s=new Filters(this.ctx),a=parseInt(t.node.getAttribute("index"),10),r=parseInt(t.node.getAttribute("j"),10),n="false";if("true"===t.node.getAttribute("selected")){if(t.node.setAttribute("selected","false"),i.globals.selectedDataPoints[a].indexOf(r)>-1){var o=i.globals.selectedDataPoints[a].indexOf(r);i.globals.selectedDataPoints[a].splice(o,1)}}else{if(!i.config.states.active.allowMultipleDataPointsSelection&&i.globals.selectedDataPoints.length>0){i.globals.selectedDataPoints=[];var l=i.globals.dom.Paper.select(".apexcharts-series path").members,h=i.globals.dom.Paper.select(".apexcharts-series circle, .apexcharts-series rect").members;l.forEach((function(t){t.node.setAttribute("selected","false"),s.getDefaultFilter(t,a)})),h.forEach((function(t){t.node.setAttribute("selected","false"),s.getDefaultFilter(t,a)}))}t.node.setAttribute("selected","true"),n="true",void 0===i.globals.selectedDataPoints[a]&&(i.globals.selectedDataPoints[a]=[]),i.globals.selectedDataPoints[a].push(r)}if("true"===n){var c=i.config.states.active.filter;"none"!==c&&s.applyFilter(t,a,c.type,c.value)}else"none"!==i.config.states.active.filter.type&&s.getDefaultFilter(t,a);"function"==typeof i.config.chart.events.dataPointSelection&&i.config.chart.events.dataPointSelection(e,this.ctx,{selectedDataPoints:i.globals.selectedDataPoints,seriesIndex:a,dataPointIndex:r,w:i}),e&&this.ctx.fireEvent("dataPointSelection",[e,this.ctx,{selectedDataPoints:i.globals.selectedDataPoints,seriesIndex:a,dataPointIndex:r,w:i}])}},{key:"rotateAroundCenter",value:function(t){var e=t.getBBox();return{x:e.x+e.width/2,y:e.y+e.height/2}}},{key:"getTextRects",value:function(t,e,i,s){var a=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],r=this.w,n=this.drawText({x:-200,y:-200,text:t,textAnchor:"start",fontSize:e,fontFamily:i,foreColor:"#fff",opacity:0});s&&n.attr("transform",s),r.globals.dom.Paper.add(n);var o=n.bbox();return a||(o=n.node.getBoundingClientRect()),n.remove(),{width:o.width,height:o.height}}},{key:"placeTextWithEllipsis",value:function(t,e,i){if(t.textContent=e,e.length>0&&t.getComputedTextLength()>=i){for(var s=e.length-3;s>0;s-=3)if(t.getSubStringLength(0,s)<=i)return void(t.textContent=e.substring(0,s)+"...");t.textContent="..."}}}],[{key:"setAttrs",value:function(t,e){for(var i in e)e.hasOwnProperty(i)&&t.setAttribute(i,e[i])}}]),t}();const name="en",options={months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],toolbar:{exportToSVG:"Download SVG",exportToPNG:"Download PNG",menu:"Menu",selection:"Selection",selectionZoom:"Selection Zoom",zoomIn:"Zoom In",zoomOut:"Zoom Out",pan:"Panning",reset:"Reset Zoom"}};var en={name:"en",options:options},Options=function(){function t(){_classCallCheck(this,t),this.yAxis={show:!0,showAlways:!1,seriesName:void 0,opposite:!1,reversed:!1,logarithmic:!1,tickAmount:void 0,forceNiceScale:!1,max:void 0,min:void 0,floating:!1,decimalsInFloat:void 0,labels:{show:!0,minWidth:0,maxWidth:160,offsetX:0,offsetY:0,align:void 0,rotate:0,padding:20,style:{colors:[],fontSize:"11px",fontFamily:void 0,cssClass:""},formatter:void 0},axisBorder:{show:!1,color:"#78909C",offsetX:0,offsetY:0},axisTicks:{show:!1,color:"#78909C",width:6,offsetX:0,offsetY:0},title:{text:void 0,rotate:90,offsetY:0,offsetX:0,style:{color:void 0,fontSize:"11px",fontFamily:void 0,cssClass:""}},tooltip:{enabled:!1,offsetX:0},crosshairs:{show:!0,position:"front",stroke:{color:"#b6b6b6",width:1,dashArray:0}}},this.xAxisAnnotation={x:0,x2:null,strokeDashArray:1,fillColor:"#c2c2c2",borderColor:"#c2c2c2",opacity:.3,offsetX:0,offsetY:0,label:{borderColor:"#c2c2c2",borderWidth:1,text:void 0,textAnchor:"middle",orientation:"vertical",position:"top",offsetX:0,offsetY:0,style:{background:"#fff",color:void 0,fontSize:"11px",fontFamily:void 0,cssClass:"",padding:{left:5,right:5,top:2,bottom:2}}}},this.yAxisAnnotation={y:0,y2:null,strokeDashArray:1,fillColor:"#c2c2c2",borderColor:"#c2c2c2",opacity:.3,offsetX:0,offsetY:0,yAxisIndex:0,label:{borderColor:"#c2c2c2",borderWidth:1,text:void 0,textAnchor:"end",position:"right",offsetX:0,offsetY:-3,style:{background:"#fff",color:void 0,fontSize:"11px",fontFamily:void 0,cssClass:"",padding:{left:5,right:5,top:0,bottom:2}}}},this.pointAnnotation={x:0,y:null,yAxisIndex:0,seriesIndex:0,marker:{size:4,fillColor:"#fff",strokeWidth:2,strokeColor:"#333",shape:"circle",offsetX:0,offsetY:0,radius:2,cssClass:""},label:{borderColor:"#c2c2c2",borderWidth:1,text:void 0,textAnchor:"middle",offsetX:0,offsetY:-15,style:{background:"#fff",color:void 0,fontSize:"11px",fontFamily:void 0,cssClass:"",padding:{left:5,right:5,top:0,bottom:2}}},customSVG:{SVG:void 0,cssClass:void 0,offsetX:0,offsetY:0}}}return _createClass(t,[{key:"init",value:function(){return{annotations:{position:"front",yaxis:[this.yAxisAnnotation],xaxis:[this.xAxisAnnotation],points:[this.pointAnnotation]},chart:{animations:{enabled:!0,easing:"easeinout",speed:800,animateGradually:{delay:150,enabled:!0},dynamicAnimation:{enabled:!0,speed:350}},background:"transparent",locales:[en],defaultLocale:"en",dropShadow:{enabled:!1,enabledSeries:void 0,top:2,left:2,blur:4,color:"#000",opacity:.35},events:{animationEnd:void 0,beforeMount:void 0,mounted:void 0,updated:void 0,click:void 0,mouseMove:void 0,legendClick:void 0,markerClick:void 0,selection:void 0,dataPointSelection:void 0,dataPointMouseEnter:void 0,dataPointMouseLeave:void 0,beforeZoom:void 0,zoomed:void 0,scrolled:void 0},foreColor:"#373d3f",fontFamily:"Helvetica, Arial, sans-serif",height:"auto",parentHeightOffset:15,id:void 0,group:void 0,offsetX:0,offsetY:0,selection:{enabled:!1,type:"x",fill:{color:"#24292e",opacity:.1},stroke:{width:1,color:"#24292e",opacity:.4,dashArray:3},xaxis:{min:void 0,max:void 0},yaxis:{min:void 0,max:void 0}},sparkline:{enabled:!1},brush:{enabled:!1,autoScaleYaxis:!0,target:void 0},stacked:!1,stackType:"normal",toolbar:{show:!0,tools:{download:!0,selection:!0,zoom:!0,zoomin:!0,zoomout:!0,pan:!0,reset:!0,customIcons:[]},autoSelected:"zoom"},type:"line",width:"100%",zoom:{enabled:!0,type:"x",autoScaleYaxis:!1,zoomedArea:{fill:{color:"#90CAF9",opacity:.4},stroke:{color:"#0D47A1",opacity:.4,width:1}}}},plotOptions:{bar:{horizontal:!1,columnWidth:"70%",barHeight:"70%",distributed:!1,endingShape:"flat",colors:{ranges:[],backgroundBarColors:[],backgroundBarOpacity:1},dataLabels:{position:"top",maxItems:100,hideOverflowingLabels:!0,orientation:"horizontal"}},bubble:{minBubbleRadius:void 0,maxBubbleRadius:void 0},candlestick:{colors:{upward:"#00B746",downward:"#EF403C"},wick:{useFillColor:!0}},heatmap:{radius:2,enableShades:!0,shadeIntensity:.5,reverseNegativeShade:!1,distributed:!1,colorScale:{inverse:!1,ranges:[],min:void 0,max:void 0}},radialBar:{size:void 0,inverseOrder:!1,startAngle:0,endAngle:360,offsetX:0,offsetY:0,hollow:{margin:5,size:"50%",background:"transparent",image:void 0,imageWidth:150,imageHeight:150,imageOffsetX:0,imageOffsetY:0,imageClipped:!0,position:"front",dropShadow:{enabled:!1,top:0,left:0,blur:3,color:"#000",opacity:.5}},track:{show:!0,startAngle:void 0,endAngle:void 0,background:"#f2f2f2",strokeWidth:"97%",opacity:1,margin:5,dropShadow:{enabled:!1,top:0,left:0,blur:3,color:"#000",opacity:.5}},dataLabels:{show:!0,name:{show:!0,fontSize:"16px",fontFamily:void 0,color:void 0,offsetY:0},value:{show:!0,fontSize:"14px",fontFamily:void 0,color:void 0,offsetY:16,formatter:function(t){return t+"%"}},total:{show:!1,label:"Total",color:void 0,formatter:function(t){return t.globals.seriesTotals.reduce((function(t,e){return t+e}),0)/t.globals.series.length+"%"}}}},pie:{size:void 0,customScale:1,offsetX:0,offsetY:0,expandOnClick:!0,dataLabels:{offset:0,minAngleToShowLabel:10},donut:{size:"65%",background:"transparent",labels:{show:!1,name:{show:!0,fontSize:"16px",fontFamily:void 0,color:void 0,offsetY:-10},value:{show:!0,fontSize:"20px",fontFamily:void 0,color:void 0,offsetY:10,formatter:function(t){return t}},total:{show:!1,showAlways:!1,label:"Total",color:void 0,formatter:function(t){return t.globals.seriesTotals.reduce((function(t,e){return t+e}),0)}}}}},radar:{size:void 0,offsetX:0,offsetY:0,polygons:{strokeColors:"#e8e8e8",connectorColors:"#e8e8e8",fill:{colors:void 0}}}},colors:void 0,dataLabels:{enabled:!0,enabledOnSeries:void 0,formatter:function(t){return null!==t?t:""},textAnchor:"middle",offsetX:0,offsetY:0,style:{fontSize:"12px",fontFamily:void 0,colors:void 0},dropShadow:{enabled:!1,top:1,left:1,blur:1,color:"#000",opacity:.45}},fill:{type:"solid",colors:void 0,opacity:.85,gradient:{shade:"dark",type:"horizontal",shadeIntensity:.5,gradientToColors:void 0,inverseColors:!0,opacityFrom:1,opacityTo:1,stops:[0,50,100],colorStops:[]},image:{src:[],width:void 0,height:void 0},pattern:{style:"sqaures",width:6,height:6,strokeWidth:2}},grid:{show:!0,borderColor:"#e0e0e0",strokeDashArray:0,position:"back",xaxis:{lines:{show:!1}},yaxis:{lines:{show:!0}},row:{colors:void 0,opacity:.5},column:{colors:void 0,opacity:.5},padding:{top:0,right:10,bottom:0,left:12}},labels:[],legend:{show:!0,showForSingleSeries:!1,showForNullSeries:!0,showForZeroSeries:!0,floating:!1,position:"bottom",horizontalAlign:"center",inverseOrder:!1,fontSize:"12px",fontFamily:void 0,width:void 0,height:void 0,formatter:void 0,tooltipHoverFormatter:void 0,offsetX:-20,offsetY:0,labels:{colors:void 0,useSeriesColors:!1},markers:{width:12,height:12,strokeWidth:0,fillColors:void 0,strokeColor:"#fff",radius:12,customHTML:void 0,offsetX:0,offsetY:0,onClick:void 0},itemMargin:{horizontal:0,vertical:5},onItemClick:{toggleDataSeries:!0},onItemHover:{highlightDataSeries:!0}},markers:{discrete:[],size:0,colors:void 0,strokeColors:"#fff",strokeWidth:2,strokeOpacity:.9,fillOpacity:1,shape:"circle",radius:2,offsetX:0,offsetY:0,onClick:void 0,onDblClick:void 0,hover:{size:void 0,sizeOffset:3}},noData:{text:void 0,align:"center",verticalAlign:"middle",offsetX:0,offsetY:0,style:{color:void 0,fontSize:"14px",fontFamily:void 0}},responsive:[],series:void 0,states:{normal:{filter:{type:"none",value:0}},hover:{filter:{type:"lighten",value:.15}},active:{allowMultipleDataPointsSelection:!1,filter:{type:"darken",value:.65}}},title:{text:void 0,align:"left",margin:10,offsetX:0,offsetY:0,floating:!1,style:{fontSize:"14px",fontFamily:void 0,color:void 0}},subtitle:{text:void 0,align:"left",margin:10,offsetX:0,offsetY:30,floating:!1,style:{fontSize:"12px",fontFamily:void 0,color:void 0}},stroke:{show:!0,curve:"smooth",lineCap:"butt",width:2,colors:void 0,dashArray:0},tooltip:{enabled:!0,enabledOnSeries:void 0,shared:!0,followCursor:!1,intersect:!1,inverseOrder:!1,custom:void 0,fillSeriesColor:!1,theme:"light",style:{fontSize:"12px",fontFamily:void 0},onDatasetHover:{highlightDataSeries:!1},x:{show:!0,format:"dd MMM",formatter:void 0},y:{formatter:void 0,title:{formatter:function(t){return t}}},z:{formatter:void 0,title:"Size: "},marker:{show:!0,fillColors:void 0},items:{display:"flex"},fixed:{enabled:!1,position:"topRight",offsetX:0,offsetY:0}},xaxis:{type:"category",categories:[],offsetX:0,offsetY:0,labels:{show:!0,rotate:-45,rotateAlways:!1,hideOverlappingLabels:!0,trim:!0,minHeight:void 0,maxHeight:120,showDuplicates:!0,style:{colors:[],fontSize:"12px",fontFamily:void 0,cssClass:""},offsetX:0,offsetY:0,format:void 0,formatter:void 0,datetimeFormatter:{year:"yyyy",month:"MMM 'yy",day:"dd MMM",hour:"HH:mm",minute:"HH:mm:ss"}},axisBorder:{show:!0,color:"#78909C",width:"100%",height:1,offsetX:0,offsetY:0},axisTicks:{show:!0,color:"#78909C",height:6,offsetX:0,offsetY:0},tickAmount:void 0,tickPlacement:"on",min:void 0,max:void 0,range:void 0,floating:!1,position:"bottom",title:{text:void 0,offsetX:0,offsetY:0,style:{color:void 0,fontSize:"12px",fontFamily:void 0,cssClass:""}},crosshairs:{show:!0,width:1,position:"back",opacity:.9,stroke:{color:"#b6b6b6",width:1,dashArray:3},fill:{type:"solid",color:"#B1B9C4",gradient:{colorFrom:"#D8E3F0",colorTo:"#BED1E6",stops:[0,100],opacityFrom:.4,opacityTo:.5}},dropShadow:{enabled:!1,left:0,top:0,blur:1,opacity:.4}},tooltip:{enabled:!0,offsetY:0,formatter:void 0,style:{fontSize:"12px",fontFamily:void 0}}},yaxis:this.yAxis,theme:{mode:"light",palette:"palette1",monochrome:{enabled:!1,color:"#008FFB",shadeTo:"light",shadeIntensity:.65}}}}}]),t}(),Annotations=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w,this.graphics=new Graphics(this.ctx),this.w.globals.isBarHorizontal&&(this.invertAxis=!0),this.xDivision=this.w.globals.gridWidth/this.w.globals.dataPoints}return _createClass(t,[{key:"drawAnnotations",value:function(){var t=this.w;if(t.globals.axisCharts){for(var e=this.drawYAxisAnnotations(),i=this.drawXAxisAnnotations(),s=this.drawPointAnnotations(),a=t.config.chart.animations.enabled,r=[e,i,s],n=[i.node,e.node,s.node],o=0;o<3;o++)t.globals.dom.elGraphical.add(r[o]),!a||t.globals.resized||t.globals.dataChanged||"scatter"!==t.config.chart.type&&"bubble"!==t.config.chart.type&&n[o].classList.add("hidden"),t.globals.delayedElements.push({el:n[o],index:0});this.annotationsBackground()}}},{key:"getStringX",value:function(t){var e=this.w,i=t,s=e.globals.labels.indexOf(t),a=e.globals.dom.baseEl.querySelector(".apexcharts-xaxis-texts-g text:nth-child("+(s+1)+")");return a&&(i=parseFloat(a.getAttribute("x"))),i}},{key:"addXaxisAnnotation",value:function(t,e,i){var s=this.w,a=this.invertAxis?s.globals.minY:s.globals.minX,r=this.invertAxis?s.globals.yRange[0]:s.globals.xRange,n=(t.x-a)/(r/s.globals.gridWidth),o=t.label.text;"category"!==s.config.xaxis.type&&!s.config.xaxis.convertedCatToNumeric||this.invertAxis||s.globals.isXNumeric||(n=this.getStringX(t.x));var l=t.strokeDashArray;if(!(n<0||n>s.globals.gridWidth)){if(null===t.x2){var h=this.graphics.drawLine(n+t.offsetX,0+t.offsetY,n+t.offsetX,s.globals.gridHeight+t.offsetY,t.borderColor,l);e.appendChild(h.node)}else{var c=(t.x2-a)/(r/s.globals.gridWidth);if("category"!==s.config.xaxis.type&&!s.config.xaxis.convertedCatToNumeric||this.invertAxis||s.globals.isXNumeric||(c=this.getStringX(t.x2)),c<n){var d=n;n=c,c=d}if(o){var u=this.graphics.drawRect(n+t.offsetX,0+t.offsetY,c-n,s.globals.gridHeight+t.offsetY,0,t.fillColor,t.opacity,1,t.borderColor,l);e.appendChild(u.node)}}var g="top"===t.label.position?-3:s.globals.gridHeight,f=new Graphics(this.ctx).getTextRects(o,parseFloat(t.label.style.fontSize)),p=this.graphics.drawText({x:n+t.label.offsetX,y:g+t.label.offsetY-("top"===t.label.position?f.width/2-12:-f.width/2),text:o,textAnchor:t.label.textAnchor,fontSize:t.label.style.fontSize,fontFamily:t.label.style.fontFamily,foreColor:t.label.style.color,cssClass:"apexcharts-xaxis-annotation-label ".concat(t.label.style.cssClass," ").concat(t.id?t.id:"")});p.attr({rel:i}),e.appendChild(p.node),this.setOrientations(t,i)}}},{key:"drawXAxisAnnotations",value:function(){var t=this,e=this.w,i=this.graphics.group({class:"apexcharts-xaxis-annotations"});return e.config.annotations.xaxis.map((function(e,s){t.addXaxisAnnotation(e,i.node,s)})),i}},{key:"addYaxisAnnotation",value:function(t,e,i){var s,a,r=this.w,n=t.strokeDashArray;if(this.invertAxis){var o=r.globals.labels.indexOf(t.y),l=r.globals.dom.baseEl.querySelector(".apexcharts-yaxis-texts-g text:nth-child("+(o+1)+")");l&&(s=parseFloat(l.getAttribute("y")))}else s=r.globals.gridHeight-(t.y-r.globals.minYArr[t.yAxisIndex])/(r.globals.yRange[t.yAxisIndex]/r.globals.gridHeight),r.config.yaxis[t.yAxisIndex]&&r.config.yaxis[t.yAxisIndex].reversed&&(s=(t.y-r.globals.minYArr[t.yAxisIndex])/(r.globals.yRange[t.yAxisIndex]/r.globals.gridHeight));var h=t.label.text;if(null===t.y2){var c=this.graphics.drawLine(0+t.offsetX,s+t.offsetY,r.globals.gridWidth+t.offsetX,s+t.offsetY,t.borderColor,n);e.appendChild(c.node)}else{if(this.invertAxis){var d=r.globals.labels.indexOf(t.y2),u=r.globals.dom.baseEl.querySelector(".apexcharts-yaxis-texts-g text:nth-child("+(d+1)+")");u&&(a=parseFloat(u.getAttribute("y")))}else a=r.globals.gridHeight-(t.y2-r.globals.minYArr[t.yAxisIndex])/(r.globals.yRange[t.yAxisIndex]/r.globals.gridHeight),r.config.yaxis[t.yAxisIndex]&&r.config.yaxis[t.yAxisIndex].reversed&&(a=(t.y2-r.globals.minYArr[t.yAxisIndex])/(r.globals.yRange[t.yAxisIndex]/r.globals.gridHeight));if(a>s){var g=s;s=a,a=g}if(h){var f=this.graphics.drawRect(0+t.offsetX,a+t.offsetY,r.globals.gridWidth+t.offsetX,s-a,0,t.fillColor,t.opacity,1,t.borderColor,n);e.appendChild(f.node)}}var p="right"===t.label.position?r.globals.gridWidth:0,x=this.graphics.drawText({x:p+t.label.offsetX,y:(a||s)+t.label.offsetY-3,text:h,textAnchor:t.label.textAnchor,fontSize:t.label.style.fontSize,fontFamily:t.label.style.fontFamily,foreColor:t.label.style.color,cssClass:"apexcharts-yaxis-annotation-label ".concat(t.label.style.cssClass," ").concat(t.id?t.id:"")});x.attr({rel:i}),e.appendChild(x.node)}},{key:"drawYAxisAnnotations",value:function(){var t=this,e=this.w,i=this.graphics.group({class:"apexcharts-yaxis-annotations"});return e.config.annotations.yaxis.map((function(e,s){t.addYaxisAnnotation(e,i.node,s)})),i}},{key:"clearAnnotations",value:function(t){var e=t.w,i=e.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxis-annotations, .apexcharts-xaxis-annotations, .apexcharts-point-annotations");e.globals.memory.methodsToExec.map((function(t,i){"addText"!==t.label&&"addAnnotation"!==t.label||e.globals.memory.methodsToExec.splice(i,1)})),(i=Utils.listToArray(i)).forEach((function(t){for(;t.firstChild;)t.removeChild(t.firstChild)}))}},{key:"removeAnnotation",value:function(t,e){var i=t.w,s=i.globals.dom.baseEl.querySelectorAll(".".concat(e));s&&(i.globals.memory.methodsToExec.map((function(t,s){t.id===e&&i.globals.memory.methodsToExec.splice(s,1)})),s.forEach((function(t){t.parentElement.removeChild(t)})))}},{key:"addPointAnnotation",value:function(t,e,i){var s=this.w,a=0,r=0,n=0;if(this.invertAxis&&console.warn("Point annotation is not supported in horizontal bar charts."),"string"==typeof t.x){var o=s.globals.labels.indexOf(t.x),l=s.globals.dom.baseEl.querySelector(".apexcharts-xaxis-texts-g text:nth-child("+(o+1)+")");a=parseFloat(l.getAttribute("x"));var h=t.y;null===t.y&&(h=s.globals.series[t.seriesIndex][o]),r=s.globals.gridHeight-(h-s.globals.minYArr[t.yAxisIndex])/(s.globals.yRange[t.yAxisIndex]/s.globals.gridHeight)-parseFloat(t.label.style.fontSize)-t.marker.size,n=s.globals.gridHeight-(h-s.globals.minYArr[t.yAxisIndex])/(s.globals.yRange[t.yAxisIndex]/s.globals.gridHeight),s.config.yaxis[t.yAxisIndex]&&s.config.yaxis[t.yAxisIndex].reversed&&(r=(h-s.globals.minYArr[t.yAxisIndex])/(s.globals.yRange[t.yAxisIndex]/s.globals.gridHeight)+parseFloat(t.label.style.fontSize)+t.marker.size,n=(h-s.globals.minYArr[t.yAxisIndex])/(s.globals.yRange[t.yAxisIndex]/s.globals.gridHeight))}else a=(t.x-s.globals.minX)/(s.globals.xRange/s.globals.gridWidth),r=s.globals.gridHeight-(parseFloat(t.y)-s.globals.minYArr[t.yAxisIndex])/(s.globals.yRange[t.yAxisIndex]/s.globals.gridHeight)-parseFloat(t.label.style.fontSize)-t.marker.size,n=s.globals.gridHeight-(t.y-s.globals.minYArr[t.yAxisIndex])/(s.globals.yRange[t.yAxisIndex]/s.globals.gridHeight),s.config.yaxis[t.yAxisIndex]&&s.config.yaxis[t.yAxisIndex].reversed&&(r=(parseFloat(t.y)-s.globals.minYArr[t.yAxisIndex])/(s.globals.yRange[t.yAxisIndex]/s.globals.gridHeight)-parseFloat(t.label.style.fontSize)-t.marker.size,n=(t.y-s.globals.minYArr[t.yAxisIndex])/(s.globals.yRange[t.yAxisIndex]/s.globals.gridHeight));if(!(a<0||a>s.globals.gridWidth)){var c={pSize:t.marker.size,pWidth:t.marker.strokeWidth,pointFillColor:t.marker.fillColor,pointStrokeColor:t.marker.strokeColor,shape:t.marker.shape,radius:t.marker.radius,class:"apexcharts-point-annotation-marker ".concat(t.marker.cssClass," ").concat(t.id?t.id:"")},d=this.graphics.drawMarker(a+t.marker.offsetX,n+t.marker.offsetY,c);e.appendChild(d.node);var u=t.label.text?t.label.text:"",g=this.graphics.drawText({x:a+t.label.offsetX,y:r+t.label.offsetY,text:u,textAnchor:t.label.textAnchor,fontSize:t.label.style.fontSize,fontFamily:t.label.style.fontFamily,foreColor:t.label.style.color,cssClass:"apexcharts-point-annotation-label ".concat(t.label.style.cssClass," ").concat(t.id?t.id:"")});if(g.attr({rel:i}),e.appendChild(g.node),t.customSVG.SVG){var f=this.graphics.group({class:"apexcharts-point-annotations-custom-svg "+t.customSVG.cssClass});f.attr({transform:"translate(".concat(a+t.customSVG.offsetX,", ").concat(r+t.customSVG.offsetY,")")}),f.node.innerHTML=t.customSVG.SVG,e.appendChild(f.node)}}}},{key:"drawPointAnnotations",value:function(){var t=this,e=this.w,i=this.graphics.group({class:"apexcharts-point-annotations"});return e.config.annotations.points.map((function(e,s){t.addPointAnnotation(e,i.node,s)})),i}},{key:"setOrientations",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=this.w;if("vertical"===t.label.orientation){var s=null!==e?e:0,a=i.globals.dom.baseEl.querySelector(".apexcharts-xaxis-annotations .apexcharts-xaxis-annotation-label[rel='".concat(s,"']"));if(null!==a){var r=a.getBoundingClientRect();a.setAttribute("x",parseFloat(a.getAttribute("x"))-r.height+4),"top"===t.label.position?a.setAttribute("y",parseFloat(a.getAttribute("y"))+r.width):a.setAttribute("y",parseFloat(a.getAttribute("y"))-r.width);var n=this.graphics.rotateAroundCenter(a),o=n.x,l=n.y;a.setAttribute("transform","rotate(-90 ".concat(o," ").concat(l,")"))}}}},{key:"addBackgroundToAnno",value:function(t,e){var i=this.w;if(!e.label.text||e.label.text&&!e.label.text.trim())return null;var s=i.globals.dom.baseEl.querySelector(".apexcharts-grid").getBoundingClientRect(),a=t.getBoundingClientRect(),r=e.label.style.padding.left,n=e.label.style.padding.right,o=e.label.style.padding.top,l=e.label.style.padding.bottom;"vertical"===e.label.orientation&&(o=e.label.style.padding.left,l=e.label.style.padding.right,r=e.label.style.padding.top,n=e.label.style.padding.bottom);var h=a.left-s.left-r,c=a.top-s.top-o,d=this.graphics.drawRect(h,c,a.width+r+n,a.height+o+l,0,e.label.style.background,1,e.label.borderWidth,e.label.borderColor,0);return e.id&&d.node.classList.add(e.id),d}},{key:"annotationsBackground",value:function(){var t=this,e=this.w,i=function(i,s,a){var r=e.globals.dom.baseEl.querySelector(".apexcharts-".concat(a,"-annotations .apexcharts-").concat(a,"-annotation-label[rel='").concat(s,"']"));if(r){var n=r.parentNode,o=t.addBackgroundToAnno(r,i);o&&n.insertBefore(o.node,r)}};e.config.annotations.xaxis.map((function(t,e){i(t,e,"xaxis")})),e.config.annotations.yaxis.map((function(t,e){i(t,e,"yaxis")})),e.config.annotations.points.map((function(t,e){i(t,e,"point")}))}},{key:"addText",value:function(t,e,i){var s=t.x,a=t.y,r=t.text,n=t.textAnchor,o=t.appendTo,l=void 0===o?".apexcharts-inner":o,h=t.foreColor,c=t.fontSize,d=t.fontFamily,u=t.cssClass,g=t.backgroundColor,f=t.borderWidth,p=t.strokeDashArray,x=t.radius,b=t.borderColor,m=t.paddingLeft,v=void 0===m?4:m,y=t.paddingRight,w=void 0===y?4:y,k=t.paddingBottom,A=void 0===k?2:k,S=t.paddingTop,C=void 0===S?2:S,L=i,P=L.w,T=P.globals.dom.baseEl.querySelector(l),z=this.graphics.drawText({x:s,y:a,text:r,textAnchor:n||"start",fontSize:c||"12px",fontFamily:d||P.config.chart.fontFamily,foreColor:h||P.config.chart.foreColor,cssClass:u});T.appendChild(z.node);var E=z.bbox();if(r){var M=this.graphics.drawRect(E.x-v,E.y-C,E.width+v+w,E.height+A+C,x,g,1,f,b,p);z.before(M)}return e&&P.globals.memory.methodsToExec.push({context:L,method:L.addText,label:"addText",params:{x:s,y:a,text:r,textAnchor:n,appendTo:l,foreColor:h,fontSize:c,cssClass:u,backgroundColor:g,borderWidth:f,strokeDashArray:p,radius:x,borderColor:b,paddingLeft:v,paddingRight:w,paddingBottom:A,paddingTop:C}}),i}},{key:"addPointAnnotationExternal",value:function(t,e,i){return void 0===this.invertAxis&&(this.invertAxis=i.w.globals.isBarHorizontal),this.addAnnotationExternal({params:t,pushToMemory:e,context:i,type:"point",contextMethod:i.addPointAnnotation}),i}},{key:"addYaxisAnnotationExternal",value:function(t,e,i){return this.addAnnotationExternal({params:t,pushToMemory:e,context:i,type:"yaxis",contextMethod:i.addYaxisAnnotation}),i}},{key:"addXaxisAnnotationExternal",value:function(t,e,i){return this.addAnnotationExternal({params:t,pushToMemory:e,context:i,type:"xaxis",contextMethod:i.addXaxisAnnotation}),i}},{key:"addAnnotationExternal",value:function(t){var e=t.params,i=t.pushToMemory,s=t.context,a=t.type,r=t.contextMethod,n=s,o=n.w,l=o.globals.dom.baseEl.querySelector(".apexcharts-".concat(a,"-annotations")),h=l.childNodes.length+1,c=new Options,d=Object.assign({},"xaxis"===a?c.xAxisAnnotation:"yaxis"===a?c.yAxisAnnotation:c.pointAnnotation),u=Utils.extend(d,e);switch(a){case"xaxis":this.addXaxisAnnotation(u,l,h);break;case"yaxis":this.addYaxisAnnotation(u,l,h);break;case"point":this.addPointAnnotation(u,l,h)}var g=o.globals.dom.baseEl.querySelector(".apexcharts-".concat(a,"-annotations .apexcharts-").concat(a,"-annotation-label[rel='").concat(h,"']")),f=this.addBackgroundToAnno(g,u);return f&&l.insertBefore(f.node,g),i&&o.globals.memory.methodsToExec.push({context:n,id:u.id?u.id:Utils.randomId(),method:r,label:"addAnnotation",params:e}),s}}]),t}(),DateTime=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w,this.months31=[1,3,5,7,8,10,12],this.months30=[2,4,6,9,11],this.daysCntOfYear=[0,31,59,90,120,151,181,212,243,273,304,334]}return _createClass(t,[{key:"isValidDate",value:function(t){return!isNaN(this.parseDate(t))}},{key:"getUTCTimeStamp",value:function(t){return Date.parse(t)?new Date(new Date(t).toISOString().substr(0,25)).getTime():t}},{key:"parseDate",value:function(t){var e=Date.parse(t);if(!isNaN(e))return this.getUTCTimeStamp(t);var i=Date.parse(t.replace(/-/g,"/").replace(/[a-z]+/gi," "));return i=this.getUTCTimeStamp(i)}},{key:"treatAsUtc",value:function(t){var e=new Date(t);return e.setMinutes(e.getMinutes()-e.getTimezoneOffset()),e}},{key:"formatDate",value:function(t,e){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a=this.w.globals.locale,r=["\0"].concat(_toConsumableArray(a.months)),n=["\x01"].concat(_toConsumableArray(a.shortMonths)),o=["\x02"].concat(_toConsumableArray(a.days)),l=["\x03"].concat(_toConsumableArray(a.shortDays));function h(t,e){var i=t+"";for(e=e||2;i.length<e;)i="0"+i;return i}s&&(t=this.treatAsUtc(t));var c=i?t.getUTCFullYear():t.getFullYear();e=(e=(e=e.replace(/(^|[^\\])yyyy+/g,"$1"+c)).replace(/(^|[^\\])yy/g,"$1"+c.toString().substr(2,2))).replace(/(^|[^\\])y/g,"$1"+c);var d=(i?t.getUTCMonth():t.getMonth())+1;e=(e=(e=(e=e.replace(/(^|[^\\])MMMM+/g,"$1"+r[0])).replace(/(^|[^\\])MMM/g,"$1"+n[0])).replace(/(^|[^\\])MM/g,"$1"+h(d))).replace(/(^|[^\\])M/g,"$1"+d);var u=i?t.getUTCDate():t.getDate();e=(e=(e=(e=e.replace(/(^|[^\\])dddd+/g,"$1"+o[0])).replace(/(^|[^\\])ddd/g,"$1"+l[0])).replace(/(^|[^\\])dd/g,"$1"+h(u))).replace(/(^|[^\\])d/g,"$1"+u);var g=i?t.getUTCHours():t.getHours(),f=g>12?g-12:0===g?12:g;e=(e=(e=(e=e.replace(/(^|[^\\])HH+/g,"$1"+h(g))).replace(/(^|[^\\])H/g,"$1"+g)).replace(/(^|[^\\])hh+/g,"$1"+h(f))).replace(/(^|[^\\])h/g,"$1"+f);var p=i?t.getUTCMinutes():t.getMinutes();e=(e=e.replace(/(^|[^\\])mm+/g,"$1"+h(p))).replace(/(^|[^\\])m/g,"$1"+p);var x=i?t.getUTCSeconds():t.getSeconds();e=(e=e.replace(/(^|[^\\])ss+/g,"$1"+h(x))).replace(/(^|[^\\])s/g,"$1"+x);var b=i?t.getUTCMilliseconds():t.getMilliseconds();e=e.replace(/(^|[^\\])fff+/g,"$1"+h(b,3)),b=Math.round(b/10),e=e.replace(/(^|[^\\])ff/g,"$1"+h(b)),b=Math.round(b/10);var m=g<12?"AM":"PM";e=(e=(e=e.replace(/(^|[^\\])f/g,"$1"+b)).replace(/(^|[^\\])TT+/g,"$1"+m)).replace(/(^|[^\\])T/g,"$1"+m.charAt(0));var v=m.toLowerCase();e=(e=e.replace(/(^|[^\\])tt+/g,"$1"+v)).replace(/(^|[^\\])t/g,"$1"+v.charAt(0));var y=-t.getTimezoneOffset(),w=i||!y?"Z":y>0?"+":"-";if(!i){y=Math.abs(y);var k=Math.floor(y/60),A=y%60;w+=h(k)+":"+h(A)}e=e.replace(/(^|[^\\])K/g,"$1"+w);var S=(i?t.getUTCDay():t.getDay())+1;return e=(e=(e=(e=(e=e.replace(new RegExp(o[0],"g"),o[S])).replace(new RegExp(l[0],"g"),l[S])).replace(new RegExp(r[0],"g"),r[d])).replace(new RegExp(n[0],"g"),n[d])).replace(/\\(.)/g,"$1")}},{key:"getTimeUnitsfromTimestamp",value:function(t,e){var i=this.w;void 0!==i.config.xaxis.min&&(t=i.config.xaxis.min),void 0!==i.config.xaxis.max&&(e=i.config.xaxis.max);var s=new Date(t).getFullYear(),a=new Date(e).getFullYear(),r=new Date(t).getMonth(),n=new Date(e).getMonth(),o=new Date(t).getDate(),l=new Date(e).getDate(),h=new Date(t).getHours(),c=new Date(e).getHours();return{minMinute:new Date(t).getMinutes(),maxMinute:new Date(e).getMinutes(),minHour:h,maxHour:c,minDate:o,maxDate:l,minMonth:r,maxMonth:n,minYear:s,maxYear:a}}},{key:"isLeapYear",value:function(t){return t%4==0&&t%100!=0||t%400==0}},{key:"calculcateLastDaysOfMonth",value:function(t,e,i){return this.determineDaysOfMonths(t,e)-i}},{key:"determineDaysOfYear",value:function(t){var e=365;return this.isLeapYear(t)&&(e=366),e}},{key:"determineRemainingDaysOfYear",value:function(t,e,i){var s=this.daysCntOfYear[e]+i;return e>1&&this.isLeapYear()&&s++,s}},{key:"determineDaysOfMonths",value:function(t,e){var i=30;switch(t=Utils.monthMod(t),!0){case this.months30.indexOf(t)>-1:2===t&&(i=this.isLeapYear(e)?29:28);break;case this.months31.indexOf(t)>-1:default:i=31}return i}}]),t}(),Formatters=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w,this.tooltipKeyFormat="dd MMM"}return _createClass(t,[{key:"xLabelFormat",value:function(t,e,i){var s=this.w;if("datetime"===s.config.xaxis.type&&(void 0===s.config.xaxis.labels.formatter&&void 0===s.config.tooltip.x.formatter))return new DateTime(this.ctx).formatDate(new Date(e),s.config.tooltip.x.format,!0,!0);return t(e,i)}},{key:"setLabelFormatters",value:function(){var t=this.w;return t.globals.xLabelFormatter=function(t){return t},t.globals.xaxisTooltipFormatter=function(t){return t},t.globals.ttKeyFormatter=function(t){return t},t.globals.ttZFormatter=function(t){return t},t.globals.legendFormatter=function(t){return t},void 0!==t.config.xaxis.labels.formatter?t.globals.xLabelFormatter=t.config.xaxis.labels.formatter:t.globals.xLabelFormatter=function(e){if(Utils.isNumber(e)){if("numeric"===t.config.xaxis.type&&t.globals.dataPoints<50)return e.toFixed(1);if(t.globals.isBarHorizontal)if(t.globals.maxY-t.globals.minYArr<4)return e.toFixed(1);return e.toFixed(0)}return e},"function"==typeof t.config.tooltip.x.formatter?t.globals.ttKeyFormatter=t.config.tooltip.x.formatter:t.globals.ttKeyFormatter=t.globals.xLabelFormatter,"function"==typeof t.config.xaxis.tooltip.formatter&&(t.globals.xaxisTooltipFormatter=t.config.xaxis.tooltip.formatter),Array.isArray(t.config.tooltip.y)?t.globals.ttVal=t.config.tooltip.y:void 0!==t.config.tooltip.y.formatter&&(t.globals.ttVal=t.config.tooltip.y),void 0!==t.config.tooltip.z.formatter&&(t.globals.ttZFormatter=t.config.tooltip.z.formatter),void 0!==t.config.legend.formatter&&(t.globals.legendFormatter=t.config.legend.formatter),t.config.yaxis.forEach((function(e,i){void 0!==e.labels.formatter?t.globals.yLabelFormatters[i]=e.labels.formatter:t.globals.yLabelFormatters[i]=function(s){return t.globals.xyCharts&&Utils.isNumber(s)?0!==t.globals.yValueDecimal?s.toFixed(void 0!==e.decimalsInFloat?e.decimalsInFloat:t.globals.yValueDecimal):t.globals.maxYArr[i]-t.globals.minYArr[i]<10?s.toFixed(1):s.toFixed(0):s}})),t.globals}},{key:"heatmapLabelFormatters",value:function(){var t=this.w;if("heatmap"===t.config.chart.type){t.globals.yAxisScale[0].result=t.globals.seriesNames.slice();var e=t.globals.seriesNames.reduce((function(t,e){return t.length>e.length?t:e}),0);t.globals.yAxisScale[0].niceMax=e,t.globals.yAxisScale[0].niceMin=e}}}]),t}(),AxesUtils=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w}return _createClass(t,[{key:"getLabel",value:function(t,e,i,s){var a,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[],n=this.w,o=void 0===t[s]?"":t[s],l=n.globals.xLabelFormatter,h=n.config.xaxis.labels.formatter,c=!1,d=new Formatters(this.ctx),u=o;a=d.xLabelFormat(l,o,u),void 0!==h&&(a=h(o,t[s],s));var g=function(t){var i=null;return e.forEach((function(t){"month"===t.unit?i="year":"day"===t.unit?i="month":"hour"===t.unit?i="day":"minute"===t.unit&&(i="hour")})),i===t};return e.length>0?(c=g(e[s].unit),i=e[s].position,a=e[s].value):"datetime"===n.config.xaxis.type&&void 0===h&&(a=""),void 0===a&&(a=""),(0===(a=a.toString()).indexOf("NaN")||0===a.toLowerCase().indexOf("invalid")||a.toLowerCase().indexOf("infinity")>=0||r.indexOf(a)>=0&&!n.config.xaxis.labels.showDuplicates)&&(a=""),{x:i,text:a,isBold:c}}},{key:"drawYAxisTicks",value:function(t,e,i,s,a,r,n){var o=this.w,l=new Graphics(this.ctx),h=o.globals.translateY;if(s.show){!0===o.config.yaxis[a].opposite&&(t+=s.width);for(var c=e;c>=0;c--){var d=h+e/10+o.config.yaxis[a].labels.offsetY-1;o.globals.isBarHorizontal&&(d=r*c);var u=l.drawLine(t+i.offsetX-s.width+s.offsetX,d+s.offsetY,t+i.offsetX+s.offsetX,d+s.offsetY,i.color);n.add(u),h+=r}}}}]),t}(),XAxis=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w;var i=this.w;this.xaxisLabels=i.globals.labels.slice(),i.globals.timelineLabels.length>0&&(this.xaxisLabels=i.globals.timelineLabels.slice()),this.drawnLabels=[],"top"===i.config.xaxis.position?this.offY=0:this.offY=i.globals.gridHeight+1,this.offY=this.offY+i.config.xaxis.axisBorder.offsetY,this.xaxisFontSize=i.config.xaxis.labels.style.fontSize,this.xaxisFontFamily=i.config.xaxis.labels.style.fontFamily,this.xaxisForeColors=i.config.xaxis.labels.style.colors,this.xaxisBorderWidth=i.config.xaxis.axisBorder.width,this.xaxisBorderWidth.indexOf("%")>-1?this.xaxisBorderWidth=i.globals.gridWidth*parseInt(this.xaxisBorderWidth,10)/100:this.xaxisBorderWidth=parseInt(this.xaxisBorderWidth,10),this.xaxisBorderHeight=i.config.xaxis.axisBorder.height,this.yaxis=i.config.yaxis[0],this.axesUtils=new AxesUtils(e)}return _createClass(t,[{key:"drawXaxis",value:function(){var t,e=this.w,i=new Graphics(this.ctx),s=i.group({class:"apexcharts-xaxis",transform:"translate(".concat(e.config.xaxis.offsetX,", ").concat(e.config.xaxis.offsetY,")")}),a=i.group({class:"apexcharts-xaxis-texts-g",transform:"translate(".concat(e.globals.translateXAxisX,", ").concat(e.globals.translateXAxisY,")")});s.add(a);for(var r=e.globals.padHorizontal,n=[],o=0;o<this.xaxisLabels.length;o++)n.push(this.xaxisLabels[o]);r=e.globals.isXNumeric?r+(t=e.globals.gridWidth/(n.length-1))/2+e.config.xaxis.labels.offsetX:r+(t=e.globals.gridWidth/n.length)+e.config.xaxis.labels.offsetX;var l=n.length;if(e.config.xaxis.labels.show)for(var h=0;h<=l-1;h++){var c=r-t/2+e.config.xaxis.labels.offsetX,d=this.axesUtils.getLabel(n,e.globals.timelineLabels,c,h,this.drawnLabels);this.drawnLabels.push(d.text);var u=28;e.globals.rotateXLabels&&(u=22);var g=i.drawText({x:d.x,y:this.offY+e.config.xaxis.labels.offsetY+u,text:"",textAnchor:"middle",fontWeight:d.isBold?600:400,fontSize:this.xaxisFontSize,fontFamily:this.xaxisFontFamily,foreColor:Array.isArray(this.xaxisForeColors)?this.xaxisForeColors[h]:this.xaxisForeColors,cssClass:"apexcharts-xaxis-label "+e.config.xaxis.labels.style.cssClass});h===l-1&&e.globals.skipLastTimelinelabel&&(d.text=""),a.add(g),i.addTspan(g,d.text,this.xaxisFontFamily);var f=document.createElementNS(e.globals.SVGNS,"title");f.textContent=d.text,g.node.appendChild(f),r+=t}if(void 0!==e.config.xaxis.title.text){var p=i.group({class:"apexcharts-xaxis-title"}),x=i.drawText({x:e.globals.gridWidth/2+e.config.xaxis.title.offsetX,y:this.offY-parseFloat(this.xaxisFontSize)+e.globals.xAxisLabelsHeight+e.config.xaxis.title.offsetY,text:e.config.xaxis.title.text,textAnchor:"middle",fontSize:e.config.xaxis.title.style.fontSize,fontFamily:e.config.xaxis.title.style.fontFamily,foreColor:e.config.xaxis.title.style.color,cssClass:"apexcharts-xaxis-title-text "+e.config.xaxis.title.style.cssClass});p.add(x),s.add(p)}if(e.config.xaxis.axisBorder.show){var b=0;"bar"===e.config.chart.type&&e.globals.isXNumeric&&(b-=15);var m=i.drawLine(e.globals.padHorizontal+b+e.config.xaxis.axisBorder.offsetX,this.offY,this.xaxisBorderWidth,this.offY,e.config.xaxis.axisBorder.color,0,this.xaxisBorderHeight);s.add(m)}return s}},{key:"drawXaxisInversed",value:function(t){var e,i,s=this.w,a=new Graphics(this.ctx),r=s.config.yaxis[0].opposite?s.globals.translateYAxisX[t]:0,n=a.group({class:"apexcharts-yaxis apexcharts-xaxis-inversed",rel:t}),o=a.group({class:"apexcharts-yaxis-texts-g apexcharts-xaxis-inversed-texts-g",transform:"translate("+r+", 0)"});n.add(o);var l=[];if(s.config.yaxis[t].show)for(var h=0;h<this.xaxisLabels.length;h++)l.push(this.xaxisLabels[h]);i=-(e=s.globals.gridHeight/l.length)/2.2;var c=s.globals.yLabelFormatters[0],d=s.config.yaxis[0].labels;if(d.show)for(var u=0;u<=l.length-1;u++){var g=void 0===l[u]?"":l[u];g=c(g,{seriesIndex:t,dataPointIndex:u,w:s});var f=a.drawText({x:d.offsetX-15,y:i+e+d.offsetY,text:g,textAnchor:this.yaxis.opposite?"start":"end",foreColor:d.style.color?d.style.color:d.style.colors[u],fontSize:d.style.fontSize,fontFamily:d.style.fontFamily,cssClass:"apexcharts-yaxis-label "+d.style.cssClass});if(o.add(f),0!==s.config.yaxis[t].labels.rotate){var p=a.rotateAroundCenter(f.node);f.node.setAttribute("transform","rotate(".concat(s.config.yaxis[t].labels.rotate," ").concat(p.x," ").concat(p.y,")"))}i+=e}if(void 0!==s.config.yaxis[0].title.text){var x=a.group({class:"apexcharts-yaxis-title apexcharts-xaxis-title-inversed",transform:"translate("+r+", 0)"}),b=a.drawText({x:0,y:s.globals.gridHeight/2,text:s.config.yaxis[0].title.text,textAnchor:"middle",foreColor:s.config.yaxis[0].title.style.color,fontSize:s.config.yaxis[0].title.style.fontSize,fontFamily:s.config.yaxis[0].title.style.fontFamily,cssClass:"apexcharts-yaxis-title-text "+s.config.yaxis[0].title.style.cssClass});x.add(b),n.add(x)}if(s.config.xaxis.axisBorder.show){var m=a.drawLine(s.globals.padHorizontal+s.config.xaxis.axisBorder.offsetX,this.offY,this.xaxisBorderWidth,this.offY,this.yaxis.axisBorder.color,0,this.xaxisBorderHeight);n.add(m),this.axesUtils.drawYAxisTicks(0,l.length,s.config.yaxis[0].axisBorder,s.config.yaxis[0].axisTicks,0,e,n)}return n}},{key:"drawXaxisTicks",value:function(t,e){var i=this.w,s=t;if(!(t<0||t>i.globals.gridWidth)){var a=this.offY+i.config.xaxis.axisTicks.offsetY,r=a+i.config.xaxis.axisTicks.height;if(i.config.xaxis.axisTicks.show){var n=new Graphics(this.ctx).drawLine(t+i.config.xaxis.axisTicks.offsetX,a+i.config.xaxis.offsetY,s+i.config.xaxis.axisTicks.offsetX,r+i.config.xaxis.offsetY,i.config.xaxis.axisTicks.color);e.add(n),n.node.classList.add("apexcharts-xaxis-tick")}}}},{key:"getXAxisTicksPositions",value:function(){var t=this.w,e=[],i=this.xaxisLabels.length,s=t.globals.padHorizontal;if(t.globals.timelineLabels.length>0)for(var a=0;a<i;a++)s=this.xaxisLabels[a].position,e.push(s);else for(var r=i,n=0;n<r;n++){var o=r;t.globals.isXNumeric&&"bar"!==t.config.chart.type&&(o-=1),s+=t.globals.gridWidth/o,e.push(s)}return e}},{key:"xAxisLabelCorrections",value:function(){var t=this.w,e=new Graphics(this.ctx),i=t.globals.dom.baseEl.querySelector(".apexcharts-xaxis-texts-g"),s=t.globals.dom.baseEl.querySelectorAll(".apexcharts-xaxis-texts-g text"),a=t.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxis-inversed text"),r=t.globals.dom.baseEl.querySelectorAll(".apexcharts-xaxis-inversed-texts-g text");if(t.globals.rotateXLabels||t.config.xaxis.labels.rotateAlways)for(var n=0;n<s.length;n++){var o=e.rotateAroundCenter(s[n]);o.y=o.y-1,o.x=o.x+1,s[n].setAttribute("transform","rotate(".concat(t.config.xaxis.labels.rotate," ").concat(o.x," ").concat(o.y,")")),s[n].setAttribute("text-anchor","end");i.setAttribute("transform","translate(0, ".concat(-10,")"));var l=s[n].childNodes;t.config.xaxis.labels.trim&&e.placeTextWithEllipsis(l[0],l[0].textContent,t.config.xaxis.labels.maxHeight-("bottom"===t.config.legend.position?20:10))}else for(var h=t.globals.gridWidth/t.globals.labels.length,c=0;c<s.length;c++){var d=s[c].childNodes;t.config.xaxis.labels.trim&&"datetime"!==t.config.xaxis.type&&e.placeTextWithEllipsis(d[0],d[0].textContent,h)}if(a.length>0){var u=a[a.length-1].getBBox(),g=a[0].getBBox();u.x<-20&&a[a.length-1].parentNode.removeChild(a[a.length-1]),g.x+g.width>t.globals.gridWidth&&!t.globals.isBarHorizontal&&a[0].parentNode.removeChild(a[0]);for(var f=0;f<r.length;f++)e.placeTextWithEllipsis(r[f],r[f].textContent,t.config.yaxis[0].labels.maxWidth-2*parseFloat(t.config.yaxis[0].title.style.fontSize)-20)}}}]),t}(),YAxis=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w;var i=this.w;this.xaxisFontSize=i.config.xaxis.labels.style.fontSize,this.axisFontFamily=i.config.xaxis.labels.style.fontFamily,this.xaxisForeColors=i.config.xaxis.labels.style.colors,this.xAxisoffX=0,"bottom"===i.config.xaxis.position&&(this.xAxisoffX=i.globals.gridHeight),this.drawnLabels=[],this.axesUtils=new AxesUtils(e)}return _createClass(t,[{key:"drawYaxis",value:function(t){var e=this.w,i=new Graphics(this.ctx),s=e.config.yaxis[t].labels.style.fontSize,a=e.config.yaxis[t].labels.style.fontFamily,r=i.group({class:"apexcharts-yaxis",rel:t,transform:"translate("+e.globals.translateYAxisX[t]+", 0)"});if(!e.config.yaxis[t].show)return r;var n=i.group({class:"apexcharts-yaxis-texts-g"});r.add(n);var o=e.globals.yAxisScale[t].result.length-1,l=e.globals.gridHeight/o+.1,h=e.globals.translateY,c=e.globals.yLabelFormatters[t],d=e.globals.yAxisScale[t].result.slice();if(e.config.yaxis[t]&&e.config.yaxis[t].reversed&&d.reverse(),e.config.yaxis[t].labels.show)for(var u=o;u>=0;u--){var g=d[u];g=c(g,u);var f=e.config.yaxis[t].labels.padding;e.config.yaxis[t].opposite&&0!==e.config.yaxis.length&&(f*=-1);var p=i.drawText({x:f,y:h+o/10+e.config.yaxis[t].labels.offsetY+1,text:g,textAnchor:e.config.yaxis[t].opposite?"start":"end",fontSize:s,fontFamily:a,foreColor:e.config.yaxis[t].labels.style.color,cssClass:"apexcharts-yaxis-label "+e.config.yaxis[t].labels.style.cssClass});n.add(p);var x=i.rotateAroundCenter(p.node);0!==e.config.yaxis[t].labels.rotate&&p.node.setAttribute("transform","rotate(".concat(e.config.yaxis[t].labels.rotate," ").concat(x.x," ").concat(x.y,")")),h+=l}if(void 0!==e.config.yaxis[t].title.text){var b=i.group({class:"apexcharts-yaxis-title"}),m=0;e.config.yaxis[t].opposite&&(m=e.globals.translateYAxisX[t]);var v=i.drawText({x:m,y:e.globals.gridHeight/2+e.globals.translateY+e.config.yaxis[t].title.offsetY,text:e.config.yaxis[t].title.text,textAnchor:"end",foreColor:e.config.yaxis[t].title.style.color,fontSize:e.config.yaxis[t].title.style.fontSize,fontFamily:e.config.yaxis[t].title.style.fontFamily,cssClass:"apexcharts-yaxis-title-text "+e.config.yaxis[t].title.style.cssClass});b.add(v),r.add(b)}var y=e.config.yaxis[t].axisBorder;if(y.show){var w=31+y.offsetX;e.config.yaxis[t].opposite&&(w=-31-y.offsetX);var k=i.drawLine(w,e.globals.translateY+y.offsetY-2,w,e.globals.gridHeight+e.globals.translateY+y.offsetY+2,y.color);r.add(k),this.axesUtils.drawYAxisTicks(w,o,y,e.config.yaxis[t].axisTicks,t,l,r)}return r}},{key:"drawYaxisInversed",value:function(t){var e=this.w,i=new Graphics(this.ctx),s=i.group({class:"apexcharts-xaxis apexcharts-yaxis-inversed"}),a=i.group({class:"apexcharts-xaxis-texts-g",transform:"translate(".concat(e.globals.translateXAxisX,", ").concat(e.globals.translateXAxisY,")")});s.add(a);var r=e.globals.yAxisScale[t].result.length-1,n=e.globals.gridWidth/r+.1,o=n+e.config.xaxis.labels.offsetX,l=e.globals.xLabelFormatter,h=e.globals.yAxisScale[t].result.slice(),c=e.globals.invertedTimelineLabels;c.length>0&&(this.xaxisLabels=c.slice(),r=(h=c.slice()).length),e.config.yaxis[t]&&e.config.yaxis[t].reversed&&h.reverse();var d=c.length;if(e.config.xaxis.labels.show)for(var u=d?0:r;d?u<d-1:u>=0;d?u++:u--){var g=h[u];g=l(g,u);var f=e.globals.gridWidth+e.globals.padHorizontal-(o-n+e.config.xaxis.labels.offsetX);if(c.length){var p=this.axesUtils.getLabel(h,c,f,u,this.drawnLabels);f=p.x,g=p.text,this.drawnLabels.push(p.text)}var x=i.drawText({x:f,y:this.xAxisoffX+e.config.xaxis.labels.offsetY+30,text:"",textAnchor:"middle",foreColor:Array.isArray(this.xaxisForeColors)?this.xaxisForeColors[t]:this.xaxisForeColors,fontSize:this.xaxisFontSize,fontFamily:this.xaxisFontFamily,cssClass:"apexcharts-xaxis-label "+e.config.xaxis.labels.style.cssClass});a.add(x),x.tspan(g);var b=document.createElementNS(e.globals.SVGNS,"title");b.textContent=g,x.node.appendChild(b),o+=n}if(void 0!==e.config.xaxis.title.text){var m=i.group({class:"apexcharts-xaxis-title apexcharts-yaxis-title-inversed"}),v=i.drawText({x:e.globals.gridWidth/2,y:this.xAxisoffX+parseFloat(this.xaxisFontSize)+parseFloat(e.config.xaxis.title.style.fontSize)+20,text:e.config.xaxis.title.text,textAnchor:"middle",fontSize:e.config.xaxis.title.style.fontSize,fontFamily:e.config.xaxis.title.style.fontFamily,cssClass:"apexcharts-xaxis-title-text "+e.config.xaxis.title.style.cssClass});m.add(v),s.add(m)}var y=e.config.yaxis[t].axisBorder;if(y.show){var w=i.drawLine(e.globals.padHorizontal+y.offsetX,1+y.offsetY,e.globals.padHorizontal+y.offsetX,e.globals.gridHeight+y.offsetY,y.color);s.add(w)}return s}},{key:"yAxisTitleRotate",value:function(t,e){var i=this.w,s=new Graphics(this.ctx),a={width:0,height:0},r={width:0,height:0},n=i.globals.dom.baseEl.querySelector(" .apexcharts-yaxis[rel='".concat(t,"'] .apexcharts-yaxis-texts-g"));null!==n&&(a=n.getBoundingClientRect());var o=i.globals.dom.baseEl.querySelector(".apexcharts-yaxis[rel='".concat(t,"'] .apexcharts-yaxis-title text"));if(null!==o&&(r=o.getBoundingClientRect()),null!==o){var l=this.xPaddingForYAxisTitle(t,a,r,e);o.setAttribute("x",l.xPos-(e?10:0))}if(null!==o){var h=s.rotateAroundCenter(o);e?o.setAttribute("transform","rotate(".concat(i.config.yaxis[t].title.rotate," ").concat(h.x," ").concat(h.y,")")):o.setAttribute("transform","rotate(-".concat(i.config.yaxis[t].title.rotate," ").concat(h.x," ").concat(h.y,")"))}}},{key:"xPaddingForYAxisTitle",value:function(t,e,i,s){var a=this.w,r=0,n=0,o=10;return void 0===a.config.yaxis[t].title.text||t<0?{xPos:n,padd:0}:(s?(n=e.width+a.config.yaxis[t].title.offsetX+i.width/2+o/2,0===(r+=1)&&(n-=o/2)):(n=-1*e.width+a.config.yaxis[t].title.offsetX+o/2+i.width/2,a.globals.isBarHorizontal&&(o=25,n=-1*e.width-a.config.yaxis[t].title.offsetX-o)),{xPos:n,padd:o})}},{key:"setYAxisXPosition",value:function(t,e){var i=this.w,s=0,a=0,r=21,n=1;i.config.yaxis.length>1&&(this.multipleYs=!0),i.config.yaxis.map((function(o,l){var h=i.globals.ignoreYAxisIndexes.indexOf(l)>-1||!o.show||o.floating||0===t[l].width,c=t[l].width+e[l].width;o.opposite?i.globals.isBarHorizontal?(a=i.globals.gridWidth+i.globals.translateX-1,i.globals.translateYAxisX[l]=a-o.labels.offsetX):(a=i.globals.gridWidth+i.globals.translateX+n,h||(n=n+c+20),i.globals.translateYAxisX[l]=a-o.labels.offsetX+20):(s=i.globals.translateX-r,h||(r=r+c+20),i.globals.translateYAxisX[l]=s+o.labels.offsetX)}))}},{key:"setYAxisTextAlignments",value:function(){var t=this.w,e=t.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxis");(e=Utils.listToArray(e)).forEach((function(e,i){var s=t.config.yaxis[i];if(void 0!==s.labels.align){var a=t.globals.dom.baseEl.querySelector(".apexcharts-yaxis[rel='".concat(i,"'] .apexcharts-yaxis-texts-g")),r=t.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxis[rel='".concat(i,"'] .apexcharts-yaxis-label"));r=Utils.listToArray(r);var n=a.getBoundingClientRect();"left"===s.labels.align?(r.forEach((function(t,e){t.setAttribute("text-anchor","start")})),s.opposite||a.setAttribute("transform","translate(-".concat(n.width,", 0)"))):"center"===s.labels.align?(r.forEach((function(t,e){t.setAttribute("text-anchor","middle")})),a.setAttribute("transform","translate(".concat(n.width/2*(s.opposite?1:-1),", 0)"))):"right"===s.labels.align&&(r.forEach((function(t,e){t.setAttribute("text-anchor","end")})),s.opposite&&a.setAttribute("transform","translate(".concat(n.width,", 0)")))}}))}}]),t}(),Axes=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w}return _createClass(t,[{key:"drawAxis",value:function(t,e){var i,s,a=this.w.globals,r=this.w.config,n=new XAxis(this.ctx),o=new YAxis(this.ctx);a.axisCharts&&"radar"!==t&&(a.isBarHorizontal?(s=o.drawYaxisInversed(0),i=n.drawXaxisInversed(0),a.dom.elGraphical.add(i),a.dom.elGraphical.add(s)):(i=n.drawXaxis(),a.dom.elGraphical.add(i),r.yaxis.map((function(t,e){-1===a.ignoreYAxisIndexes.indexOf(e)&&(s=o.drawYaxis(e),a.dom.Paper.add(s))}))));r.yaxis.map((function(t,e){-1===a.ignoreYAxisIndexes.indexOf(e)&&o.yAxisTitleRotate(e,t.opposite)}))}}]),t}(),Defaults=function(){function t(e){_classCallCheck(this,t),this.opts=e}return _createClass(t,[{key:"line",value:function(){return{chart:{animations:{easing:"swing"}},dataLabels:{enabled:!1},stroke:{width:5,curve:"straight"},markers:{size:0,hover:{sizeOffset:6}},xaxis:{crosshairs:{width:1}}}}},{key:"sparkline",value:function(t){this.opts.yaxis[0].labels.show=!1,this.opts.yaxis[0].floating=!0;return Utils.extend(t,{grid:{show:!1,padding:{left:0,right:0,top:0,bottom:0}},legend:{show:!1},xaxis:{labels:{show:!1},tooltip:{enabled:!1},axisBorder:{show:!1}},chart:{toolbar:{show:!1},zoom:{enabled:!1}},dataLabels:{enabled:!1}})}},{key:"bar",value:function(){return{chart:{stacked:!1,animations:{easing:"swing"}},plotOptions:{bar:{dataLabels:{position:"center"}}},dataLabels:{style:{colors:["#fff"]}},stroke:{width:0},fill:{opacity:.85},legend:{markers:{shape:"square",radius:2,size:8}},tooltip:{shared:!1},xaxis:{tooltip:{enabled:!1},crosshairs:{width:"barWidth",position:"back",fill:{type:"gradient"},dropShadow:{enabled:!1},stroke:{width:0}}}}}},{key:"candlestick",value:function(){return{stroke:{width:1,colors:["#333"]},dataLabels:{enabled:!1},tooltip:{shared:!0,custom:function(t){var e=t.seriesIndex,i=t.dataPointIndex,s=t.w;return'<div class="apexcharts-tooltip-candlestick"><div>Open: <span class="value">'+s.globals.seriesCandleO[e][i]+'</span></div><div>High: <span class="value">'+s.globals.seriesCandleH[e][i]+'</span></div><div>Low: <span class="value">'+s.globals.seriesCandleL[e][i]+'</span></div><div>Close: <span class="value">'+s.globals.seriesCandleC[e][i]+"</span></div></div>"}},states:{active:{filter:{type:"none"}}},xaxis:{crosshairs:{width:1}}}}},{key:"rangeBar",value:function(){return{stroke:{width:0},plotOptions:{bar:{dataLabels:{position:"center"}}},dataLabels:{enabled:!1,formatter:function(t,e){e.ctx;var i=e.seriesIndex,s=e.dataPointIndex,a=e.w,r=a.globals.seriesRangeStart[i][s];return a.globals.seriesRangeEnd[i][s]-r},style:{colors:["#fff"]}},tooltip:{shared:!1,followCursor:!0,custom:function(t){var e=t.ctx,i=t.seriesIndex,s=t.dataPointIndex,a=t.y1,r=t.y2,n=t.w,o=n.globals.seriesRangeStart[i][s],l=n.globals.seriesRangeEnd[i][s],h=n.globals.labels[s];a&&r&&(o=a,l=r,n.config.series[i].data[s].x&&(h=n.config.series[i].data[s].x));var c="",d="",u=n.globals.colors[i];if(void 0===n.config.tooltip.x.formatter)if("datetime"===n.config.xaxis.type){var g=new DateTime(e);c=g.formatDate(new Date(o),n.config.tooltip.x.format,!0,!0),d=g.formatDate(new Date(l),n.config.tooltip.x.format,!0,!0)}else c=o,d=l;else c=n.config.tooltip.x.formatter(o),d=n.config.tooltip.x.formatter(l);return'<div class="apexcharts-tooltip-rangebar"><div> <span class="series-name" style="color: '+u+'">'+(n.config.series[i].name?n.config.series[i].name:"")+'</span></div><div> <span class="category">'+h+': </span> <span class="value start-value">'+c+'</span> <span class="separator">-</span> <span class="value end-value">'+d+"</span></div></div>"}},xaxis:{tooltip:{enabled:!1},crosshairs:{stroke:{width:0}}}}}},{key:"area",value:function(){return{stroke:{width:4},fill:{type:"gradient",gradient:{inverseColors:!1,shade:"light",type:"vertical",opacityFrom:.65,opacityTo:.5,stops:[0,100,100]}},markers:{size:0,hover:{sizeOffset:6}},tooltip:{followCursor:!1}}}},{key:"brush",value:function(t){return Utils.extend(t,{chart:{toolbar:{autoSelected:"selection",show:!1},zoom:{enabled:!1}},dataLabels:{enabled:!1},stroke:{width:1},tooltip:{enabled:!1},xaxis:{tooltip:{enabled:!1}}})}},{key:"stacked100",value:function(){var t=this;this.opts.dataLabels=this.opts.dataLabels||{},this.opts.dataLabels.formatter=this.opts.dataLabels.formatter||void 0;var e=this.opts.dataLabels.formatter;this.opts.yaxis.forEach((function(e,i){t.opts.yaxis[i].min=0,t.opts.yaxis[i].max=100})),"bar"===this.opts.chart.type&&(this.opts.dataLabels.formatter=e||function(t){return"number"==typeof t&&t?t.toFixed(0)+"%":t})}},{key:"bubble",value:function(){return{dataLabels:{style:{colors:["#fff"]}},tooltip:{shared:!1,intersect:!0},xaxis:{crosshairs:{width:0}},fill:{type:"solid",gradient:{shade:"light",inverse:!0,shadeIntensity:.55,opacityFrom:.4,opacityTo:.8}}}}},{key:"scatter",value:function(){return{dataLabels:{enabled:!1},tooltip:{shared:!1,intersect:!0},markers:{size:6,strokeWidth:2,hover:{sizeOffset:2}}}}},{key:"heatmap",value:function(){return{chart:{stacked:!1,zoom:{enabled:!1}},fill:{opacity:1},dataLabels:{style:{colors:["#fff"]}},stroke:{colors:["#fff"]},tooltip:{followCursor:!0,marker:{show:!1},x:{show:!1}},legend:{position:"top",markers:{shape:"square",size:10,offsetY:2}},grid:{padding:{right:20}}}}},{key:"pie",value:function(){return{chart:{toolbar:{show:!1}},plotOptions:{pie:{donut:{labels:{show:!1}}}},dataLabels:{formatter:function(t){return t.toFixed(1)+"%"},style:{colors:["#fff"]},dropShadow:{enabled:!0}},stroke:{colors:["#fff"]},fill:{opacity:1,gradient:{shade:"dark",shadeIntensity:.35,inverseColors:!1,stops:[0,100,100]}},padding:{right:0,left:0},tooltip:{theme:"dark",fillSeriesColor:!0},legend:{position:"right"}}}},{key:"donut",value:function(){return{chart:{toolbar:{show:!1}},dataLabels:{formatter:function(t){return t.toFixed(1)+"%"},style:{colors:["#fff"]},dropShadow:{enabled:!0}},stroke:{colors:["#fff"]},fill:{opacity:1,gradient:{shade:"dark",shadeIntensity:.4,inverseColors:!1,type:"vertical",opacityFrom:1,opacityTo:1,stops:[70,98,100]}},padding:{right:0,left:0},tooltip:{theme:"dark",fillSeriesColor:!0},legend:{position:"right"}}}},{key:"radar",value:function(){return this.opts.yaxis[0].labels.offsetY=this.opts.yaxis[0].labels.offsetY?this.opts.yaxis[0].labels.offsetY:6,{dataLabels:{enabled:!0,style:{colors:["#a8a8a8"],fontSize:"11px"}},stroke:{width:2},markers:{size:3,strokeWidth:1,strokeOpacity:1},fill:{opacity:.2},tooltip:{shared:!1,intersect:!0,followCursor:!0},grid:{show:!1},xaxis:{tooltip:{enabled:!1},crosshairs:{show:!1}}}}},{key:"radialBar",value:function(){return{chart:{animations:{dynamicAnimation:{enabled:!0,speed:800}},toolbar:{show:!1}},fill:{gradient:{shade:"dark",shadeIntensity:.4,inverseColors:!1,type:"diagonal2",opacityFrom:1,opacityTo:1,stops:[70,98,100]}},padding:{right:0,left:0},legend:{show:!1,position:"right"},tooltip:{enabled:!1,fillSeriesColor:!0}}}}],[{key:"convertCatToNumeric",value:function(t){t.xaxis.type="numeric",t.xaxis.convertedCatToNumeric=!0,t.xaxis.labels=t.xaxis.labels||{},t.xaxis.labels.formatter=t.xaxis.labels.formatter||function(t){return t},t.chart=t.chart||{},t.chart.zoom=t.chart.zoom||window.Apex.chart&&window.Apex.chart.zoom||{};var e=t.xaxis.labels.formatter,i=t.xaxis.categories&&t.xaxis.categories.length?t.xaxis.categories:t.labels;return i&&i.length&&(t.xaxis.labels.formatter=function(t){return e(i[t-1])}),t.xaxis.categories=[],t.labels=[],t.chart.zoom.enabled=t.chart.zoom.enabled||!1,t}}]),t}(),CoreUtils=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w}return _createClass(t,[{key:"getStackedSeriesTotals",value:function(){var t=this.w,e=[];if(0===t.globals.series.length)return e;for(var i=0;i<t.globals.series[t.globals.maxValsInArrayIndex].length;i++){for(var s=0,a=0;a<t.globals.series.length;a++)s+=t.globals.series[a][i];e.push(s)}return t.globals.stackedSeriesTotals=e,e}},{key:"getSeriesTotalByIndex",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null===t?this.w.config.series.reduce((function(t,e){return t+e}),0):this.w.globals.series[t].reduce((function(t,e){return t+e}),0)}},{key:"isSeriesNull",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return 0===(null===t?this.w.config.series.filter((function(t){return null!==t})):this.w.globals.series[t].filter((function(t){return null!==t}))).length}},{key:"seriesHaveSameValues",value:function(t){return this.w.globals.series[t].every((function(t,e,i){return t===i[0]}))}},{key:"getLargestSeries",value:function(){var t=this.w;t.globals.maxValsInArrayIndex=t.globals.series.map((function(t){return t.length})).indexOf(Math.max.apply(Math,t.globals.series.map((function(t){return t.length}))))}},{key:"getLargestMarkerSize",value:function(){var t=this.w,e=0;return t.globals.markers.size.forEach((function(t){e=Math.max(e,t)})),t.globals.markers.largestSize=e,e}},{key:"getSeriesTotals",value:function(){var t=this.w;t.globals.seriesTotals=t.globals.series.map((function(t,e){var i=0;if(Array.isArray(t))for(var s=0;s<t.length;s++)i+=t[s];else i+=t;return i}))}},{key:"getSeriesTotalsXRange",value:function(t,e){var i=this.w;return i.globals.series.map((function(s,a){for(var r=0,n=0;n<s.length;n++)i.globals.seriesX[a][n]>t&&i.globals.seriesX[a][n]<e&&(r+=s[n]);return r}))}},{key:"getPercentSeries",value:function(){var t=this.w;t.globals.seriesPercent=t.globals.series.map((function(e,i){var s=[];if(Array.isArray(e))for(var a=0;a<e.length;a++){var r=t.globals.stackedSeriesTotals[a],n=0;r&&(n=100*e[a]/r),s.push(n)}else{var o=100*e/t.globals.seriesTotals.reduce((function(t,e){return t+e}),0);s.push(o)}return s}))}},{key:"getCalculatedRatios",value:function(){var t,e,i,s,a=this.w.globals,r=[],n=0,o=[],l=.1,h=0;if(a.yRange=[],a.isMultipleYAxis)for(var c=0;c<a.minYArr.length;c++)a.yRange.push(Math.abs(a.minYArr[c]-a.maxYArr[c])),o.push(0);else a.yRange.push(Math.abs(a.minY-a.maxY));a.xRange=Math.abs(a.maxX-a.minX),a.zRange=Math.abs(a.maxZ-a.minZ);for(var d=0;d<a.yRange.length;d++)r.push(a.yRange[d]/a.gridHeight);if(e=a.xRange/a.gridWidth,i=Math.abs(a.initialmaxX-a.initialminX)/a.gridWidth,t=a.yRange/a.gridWidth,s=a.xRange/a.gridHeight,(n=a.zRange/a.gridHeight*16)||(n=1),a.minY!==Number.MIN_VALUE&&0!==Math.abs(a.minY)&&(a.hasNegs=!0),a.isMultipleYAxis){o=[];for(var u=0;u<r.length;u++)o.push(-a.minYArr[u]/r[u])}else o.push(-a.minY/r[0]),a.minY!==Number.MIN_VALUE&&0!==Math.abs(a.minY)&&(l=-a.minY/t,h=a.minX/e);return{yRatio:r,invertedYRatio:t,zRatio:n,xRatio:e,initialXRatio:i,invertedXRatio:s,baseLineInvertedY:l,baseLineY:o,baseLineX:h}}},{key:"getLogSeries",value:function(t){var e=this.w;return e.globals.seriesLog=t.map((function(t,i){return e.config.yaxis[i]&&e.config.yaxis[i].logarithmic?t.map((function(t){return null===t?null:(Math.log(t)-Math.log(e.globals.minYArr[i]))/(Math.log(e.globals.maxYArr[i])-Math.log(e.globals.minYArr[i]))})):t})),e.globals.invalidLogScale?t:e.globals.seriesLog}},{key:"getLogYRatios",value:function(t){var e=this,i=this.w,s=this.w.globals;return s.yLogRatio=t.slice(),s.logYRange=s.yRange.map((function(t,a){if(i.config.yaxis[a]&&e.w.config.yaxis[a].logarithmic){var r,n=-Number.MAX_VALUE,o=Number.MIN_VALUE;return s.seriesLog.forEach((function(t,e){t.forEach((function(t){i.config.yaxis[e]&&i.config.yaxis[e].logarithmic&&(n=Math.max(t,n),o=Math.min(t,o))}))})),r=Math.pow(s.yRange[a],Math.abs(o-n)/s.yRange[a]),s.yLogRatio[a]=r/s.gridHeight,r}})),s.invalidLogScale?t.slice():s.yLogRatio}}],[{key:"checkComboSeries",value:function(t){var e=!1,i=!1;return t.length&&void 0!==t[0].type&&(e=!0,t.forEach((function(t){"bar"!==t.type&&"column"!==t.type||(i=!0)}))),{comboCharts:e,comboChartsHasBars:i}}},{key:"extendArrayProps",value:function(t,e){return e.yaxis&&(e=t.extendYAxis(e)),e.annotations&&(e.annotations.yaxis&&(e=t.extendYAxisAnnotations(e)),e.annotations.xaxis&&(e=t.extendXAxisAnnotations(e)),e.annotations.points&&(e=t.extendPointAnnotations(e))),e}}]),t}(),Config=function(){function t(e){_classCallCheck(this,t),this.opts=e}return _createClass(t,[{key:"init",value:function(){var t=this.opts,e=new Options,i=new Defaults(t);this.chartType=t.chart.type,"histogram"===this.chartType&&(t.chart.type="bar",t=Utils.extend({plotOptions:{bar:{columnWidth:"99.99%"}}},t)),t=this.extendYAxis(t),t=this.extendAnnotations(t);var s=e.init(),a={};if(t&&"object"===_typeof(t)){var r={};switch(this.chartType){case"line":r=i.line();break;case"area":r=i.area();break;case"bar":r=i.bar();break;case"candlestick":r=i.candlestick();break;case"rangeBar":r=i.rangeBar();break;case"histogram":r=i.bar();break;case"bubble":r=i.bubble();break;case"scatter":r=i.scatter();break;case"heatmap":r=i.heatmap();break;case"pie":r=i.pie();break;case"donut":r=i.donut();break;case"radar":r=i.radar();break;case"radialBar":r=i.radialBar();break;default:r=i.line()}t.chart.brush&&t.chart.brush.enabled&&(r=i.brush(r)),t.chart.stacked&&"100%"===t.chart.stackType&&i.stacked100(),this.checkForDarkTheme(window.Apex),this.checkForDarkTheme(t),t.xaxis=t.xaxis||window.Apex.xaxis||{};var n=CoreUtils.checkComboSeries(t.series);"line"!==t.chart.type&&"area"!==t.chart.type&&"scatter"!==t.chart.type||n.comboChartsHasBars||"datetime"===t.xaxis.type||"numeric"===t.xaxis.type||"between"===t.xaxis.tickPlacement||(t=Defaults.convertCatToNumeric(t)),(t.chart.sparkline&&t.chart.sparkline.enabled||window.Apex.chart&&window.Apex.chart.sparkline&&window.Apex.chart.sparkline.enabled)&&(r=i.sparkline(r)),a=Utils.extend(s,r)}var o=Utils.extend(a,window.Apex);return s=Utils.extend(o,t),s=this.handleUserInputErrors(s)}},{key:"extendYAxis",value:function(t){var e=new Options;return void 0===t.yaxis&&(t.yaxis={}),t.yaxis.constructor!==Array&&window.Apex.yaxis&&window.Apex.yaxis.constructor!==Array&&(t.yaxis=Utils.extend(t.yaxis,window.Apex.yaxis)),t.yaxis.constructor!==Array?t.yaxis=[Utils.extend(e.yAxis,t.yaxis)]:t.yaxis=Utils.extendArray(t.yaxis,e.yAxis),t}},{key:"extendAnnotations",value:function(t){return void 0===t.annotations&&(t.annotations={},t.annotations.yaxis=[],t.annotations.xaxis=[],t.annotations.points=[]),t=this.extendYAxisAnnotations(t),t=this.extendXAxisAnnotations(t),t=this.extendPointAnnotations(t)}},{key:"extendYAxisAnnotations",value:function(t){var e=new Options;return t.annotations.yaxis=Utils.extendArray(void 0!==t.annotations.yaxis?t.annotations.yaxis:[],e.yAxisAnnotation),t}},{key:"extendXAxisAnnotations",value:function(t){var e=new Options;return t.annotations.xaxis=Utils.extendArray(void 0!==t.annotations.xaxis?t.annotations.xaxis:[],e.xAxisAnnotation),t}},{key:"extendPointAnnotations",value:function(t){var e=new Options;return t.annotations.points=Utils.extendArray(void 0!==t.annotations.points?t.annotations.points:[],e.pointAnnotation),t}},{key:"checkForDarkTheme",value:function(t){t.theme&&"dark"===t.theme.mode&&(t.tooltip||(t.tooltip={}),"light"!==t.tooltip.theme&&(t.tooltip.theme="dark"),t.chart.foreColor||(t.chart.foreColor="#f6f7f8"),t.theme.palette||(t.theme.palette="palette4"))}},{key:"handleUserInputErrors",value:function(t){var e=t;if(e.tooltip.shared&&e.tooltip.intersect)throw new Error("tooltip.shared cannot be enabled when tooltip.intersect is true. Turn off any other option by setting it to false.");if(e.chart.scroller&&console.warn("Scroller has been deprecated since v2.0.0. Please remove the configuration for chart.scroller"),("bar"===e.chart.type||"rangeBar"===e.chart.type)&&e.plotOptions.bar.horizontal){if(e.yaxis.length>1)throw new Error("Multiple Y Axis for bars are not supported. Switch to column chart by setting plotOptions.bar.horizontal=false");e.yaxis[0].reversed&&(e.yaxis[0].opposite=!0),e.xaxis.tooltip.enabled=!1,e.yaxis[0].tooltip.enabled=!1,e.chart.zoom.enabled=!1}return"bar"!==e.chart.type&&"rangeBar"!==e.chart.type||e.tooltip.shared&&("barWidth"===e.xaxis.crosshairs.width&&e.series.length>1&&(console.warn('crosshairs.width = "barWidth" is only supported in single series, not in a multi-series barChart.'),e.xaxis.crosshairs.width="tickWidth"),e.plotOptions.bar.horizontal&&(e.states.hover.type="none",e.tooltip.shared=!1),e.tooltip.followCursor||(console.warn("followCursor option in shared columns cannot be turned off. Please set %ctooltip.followCursor: true","color: blue;"),e.tooltip.followCursor=!0)),"candlestick"===e.chart.type&&e.yaxis[0].reversed&&(console.warn("Reversed y-axis in candlestick chart is not supported."),e.yaxis[0].reversed=!1),e.chart.group&&0===e.yaxis[0].labels.minWidth&&console.warn("It looks like you have multiple charts in synchronization. You must provide yaxis.labels.minWidth which must be EQUAL for all grouped charts to prevent incorrect behaviour."),Array.isArray(e.stroke.width)&&"line"!==e.chart.type&&"area"!==e.chart.type&&(console.warn("stroke.width option accepts array only for line and area charts. Reverted back to Number"),e.stroke.width=e.stroke.width[0]),e}}]),t}(),Globals=function(){function t(){_classCallCheck(this,t)}return _createClass(t,[{key:"globalVars",value:function(t){return{chartID:null,cuid:null,events:{beforeMount:[],mounted:[],updated:[],clicked:[],selection:[],dataPointSelection:[],zoomed:[],scrolled:[]},colors:[],clientX:null,clientY:null,fill:{colors:[]},stroke:{colors:[]},dataLabels:{style:{colors:[]}},radarPolygons:{fill:{colors:[]}},markers:{colors:[],size:t.markers.size,largestSize:0},animationEnded:!1,isTouchDevice:"ontouchstart"in window||navigator.msMaxTouchPoints,isDirty:!1,isExecCalled:!1,initialConfig:null,series:[],seriesRangeStart:[],seriesRangeEnd:[],seriesRangeBarTimeline:[],seriesPercent:[],seriesTotals:[],stackedSeriesTotals:[],seriesX:[],seriesZ:[],columnSeries:null,labels:[],timelineLabels:[],invertedTimelineLabels:[],seriesNames:[],noLabelsProvided:!1,allSeriesCollapsed:!1,collapsedSeries:[],collapsedSeriesIndices:[],ancillaryCollapsedSeries:[],ancillaryCollapsedSeriesIndices:[],risingSeries:[],dataFormatXNumeric:!1,capturedSeriesIndex:-1,capturedDataPointIndex:-1,selectedDataPoints:[],goldenPadding:35,invalidLogScale:!1,ignoreYAxisIndexes:[],yAxisSameScaleIndices:[],padHorizontal:0,maxValsInArrayIndex:0,radialSize:0,zoomEnabled:"zoom"===t.chart.toolbar.autoSelected&&t.chart.toolbar.tools.zoom&&t.chart.zoom.enabled,panEnabled:"pan"===t.chart.toolbar.autoSelected&&t.chart.toolbar.tools.pan,selectionEnabled:"selection"===t.chart.toolbar.autoSelected&&t.chart.toolbar.tools.selection,yaxis:null,minY:Number.MIN_VALUE,maxY:-Number.MAX_VALUE,minYArr:[],maxYArr:[],maxX:-Number.MAX_VALUE,initialmaxX:-Number.MAX_VALUE,minX:Number.MIN_VALUE,initialminX:Number.MIN_VALUE,minZ:Number.MIN_VALUE,maxZ:-Number.MAX_VALUE,minXDiff:Number.MAX_VALUE,mousedown:!1,lastClientPosition:{},visibleXRange:void 0,yRange:[],zRange:0,xRange:0,yValueDecimal:0,total:0,SVGNS:"http://www.w3.org/2000/svg",svgWidth:0,svgHeight:0,noData:!1,locale:{},dom:{},memory:{methodsToExec:[]},shouldAnimate:!0,skipLastTimelinelabel:!1,delayedElements:[],axisCharts:!0,isXNumeric:!1,isDataXYZ:!1,resized:!1,resizeTimer:null,comboCharts:!1,comboChartsHasBars:!1,dataChanged:!1,previousPaths:[],seriesXvalues:[],seriesYvalues:[],seriesCandleO:[],seriesCandleH:[],seriesCandleL:[],seriesCandleC:[],allSeriesHasEqualX:!0,dataPoints:0,pointsArray:[],dataLabelsRects:[],lastDrawnDataLabelsIndexes:[],hasNullValues:!1,easing:null,zoomed:!1,gridWidth:0,gridHeight:0,yAxisScale:[],xAxisScale:null,xAxisTicksPositions:[],timescaleTicks:[],rotateXLabels:!1,defaultLabels:!1,xLabelFormatter:void 0,yLabelFormatters:[],xaxisTooltipFormatter:void 0,ttKeyFormatter:void 0,ttVal:void 0,ttZFormatter:void 0,LINE_HEIGHT_RATIO:1.618,xAxisLabelsHeight:0,yAxisLabelsWidth:0,scaleX:1,scaleY:1,translateX:0,translateY:0,translateYAxisX:[],yLabelsCoords:[],yTitleCoords:[],yAxisWidths:[],translateXAxisY:0,translateXAxisX:0,tooltip:null,tooltipOpts:null}}},{key:"init",value:function(t){var e=this.globalVars(t);return e.initialConfig=Utils.extend({},t),e.initialSeries=JSON.parse(JSON.stringify(e.initialConfig.series)),e}}]),t}(),Base=function(){function t(e){_classCallCheck(this,t),this.opts=e}return _createClass(t,[{key:"init",value:function(){var t=new Config(this.opts).init();return{config:t,globals:(new Globals).init(t)}}}]),t}(),Fill=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w,this.opts=null,this.seriesIndex=0}return _createClass(t,[{key:"clippedImgArea",value:function(t){var e=this.w,i=e.config,s=parseInt(e.globals.gridWidth,10),a=parseInt(e.globals.gridHeight,10),r=s>a?s:a,n=t.image,o=0,l=0;void 0===t.width&&void 0===t.height?void 0!==i.fill.image.width&&void 0!==i.fill.image.height?(o=i.fill.image.width+1,l=i.fill.image.height):(o=r+1,l=r):(o=t.width,l=t.height);var h=document.createElementNS(e.globals.SVGNS,"pattern");Graphics.setAttrs(h,{id:t.patternID,patternUnits:t.patternUnits?t.patternUnits:"userSpaceOnUse",width:o+"px",height:l+"px"});var c=document.createElementNS(e.globals.SVGNS,"image");h.appendChild(c),c.setAttributeNS("http://www.w3.org/1999/xlink","href",n),Graphics.setAttrs(c,{x:0,y:0,preserveAspectRatio:"none",width:o+"px",height:l+"px"}),c.style.opacity=t.opacity,e.globals.dom.elDefs.node.appendChild(h)}},{key:"getSeriesIndex",value:function(t){var e=this.w;return("bar"===e.config.chart.type||"rangeBar"===e.config.chart.type)&&e.config.plotOptions.bar.distributed||"heatmap"===e.config.chart.type?this.seriesIndex=t.seriesNumber:this.seriesIndex=t.seriesNumber%e.globals.series.length,this.seriesIndex}},{key:"fillPath",value:function(t){var e=this.w;this.opts=t;var i,s,a,r=this.w.config;this.seriesIndex=this.getSeriesIndex(t);var n=this.getFillColors()[this.seriesIndex];"function"==typeof n&&(n=n({seriesIndex:this.seriesIndex,value:t.value,w:e}));var o=this.getFillType(this.seriesIndex),l=Array.isArray(r.fill.opacity)?r.fill.opacity[this.seriesIndex]:r.fill.opacity,h=n;if(t.color&&(n=t.color),-1===n.indexOf("rgb")?h=Utils.hexToRgba(n,l):n.indexOf("rgba")>-1&&(l="0."+Utils.getOpacityFromRGBA(n)),t.opacity&&(l=t.opacity),"pattern"===o&&(s=this.handlePatternFill(s,n,l,h)),"gradient"===o&&(a=this.handleGradientFill(a,n,l,this.seriesIndex)),"image"===o){var c=r.fill.image.src,d=t.patternID?t.patternID:"";this.clippedImgArea({opacity:l,image:Array.isArray(c)?t.seriesNumber<c.length?c[t.seriesNumber]:c[0]:c,width:t.width?t.width:void 0,height:t.height?t.height:void 0,patternUnits:t.patternUnits,patternID:"pattern".concat(e.globals.cuid).concat(t.seriesNumber+1).concat(d)}),i="url(#pattern".concat(e.globals.cuid).concat(t.seriesNumber+1).concat(d,")")}else i="gradient"===o?a:"pattern"===o?s:h;return t.solid&&(i=h),i}},{key:"getFillType",value:function(t){var e=this.w;return Array.isArray(e.config.fill.type)?e.config.fill.type[t]:e.config.fill.type}},{key:"getFillColors",value:function(){var t=this.w,e=t.config,i=this.opts,s=[];return t.globals.comboCharts?"line"===t.config.series[this.seriesIndex].type?t.globals.stroke.colors instanceof Array?s=t.globals.stroke.colors:s.push(t.globals.stroke.colors):t.globals.fill.colors instanceof Array?s=t.globals.fill.colors:s.push(t.globals.fill.colors):"line"===e.chart.type?t.globals.stroke.colors instanceof Array?s=t.globals.stroke.colors:s.push(t.globals.stroke.colors):t.globals.fill.colors instanceof Array?s=t.globals.fill.colors:s.push(t.globals.fill.colors),void 0!==i.fillColors&&(s=[],i.fillColors instanceof Array?s=i.fillColors.slice():s.push(i.fillColors)),s}},{key:"handlePatternFill",value:function(t,e,i,s){var a=this.w.config,r=this.opts,n=new Graphics(this.ctx),o=void 0===a.fill.pattern.strokeWidth?Array.isArray(a.stroke.width)?a.stroke.width[this.seriesIndex]:a.stroke.width:Array.isArray(a.fill.pattern.strokeWidth)?a.fill.pattern.strokeWidth[this.seriesIndex]:a.fill.pattern.strokeWidth,l=e;a.fill.pattern.style instanceof Array?t=void 0!==a.fill.pattern.style[r.seriesNumber]?n.drawPattern(a.fill.pattern.style[r.seriesNumber],a.fill.pattern.width,a.fill.pattern.height,l,o,i):s:t=n.drawPattern(a.fill.pattern.style,a.fill.pattern.width,a.fill.pattern.height,l,o,i);return t}},{key:"handleGradientFill",value:function(t,e,i,s){var a,r,n=this.w.config,o=this.opts,l=new Graphics(this.ctx),h=new Utils,c=n.fill.gradient.type,d=void 0===n.fill.gradient.opacityFrom?i:Array.isArray(n.fill.gradient.opacityFrom)?n.fill.gradient.opacityFrom[s]:n.fill.gradient.opacityFrom,u=void 0===n.fill.gradient.opacityTo?i:Array.isArray(n.fill.gradient.opacityTo)?n.fill.gradient.opacityTo[s]:n.fill.gradient.opacityTo;if(a=e,r=void 0===n.fill.gradient.gradientToColors||0===n.fill.gradient.gradientToColors.length?"dark"===n.fill.gradient.shade?h.shadeColor(-1*parseFloat(n.fill.gradient.shadeIntensity),e):h.shadeColor(parseFloat(n.fill.gradient.shadeIntensity),e):n.fill.gradient.gradientToColors[o.seriesNumber],n.fill.gradient.inverseColors){var g=a;a=r,r=g}return l.drawGradient(c,a,r,d,u,o.size,n.fill.gradient.stops,n.fill.gradient.colorStops,s)}}]),t}(),Markers=function(){function t(e,i){_classCallCheck(this,t),this.ctx=e,this.w=e.w}return _createClass(t,[{key:"setGlobalMarkerSize",value:function(){var t=this.w;if(t.globals.markers.size=Array.isArray(t.config.markers.size)?t.config.markers.size:[t.config.markers.size],t.globals.markers.size.length>0){if(t.globals.markers.size.length<t.globals.series.length+1)for(var e=0;e<=t.globals.series.length;e++)void 0===t.globals.markers.size[e]&&t.globals.markers.size.push(t.globals.markers.size[0])}else t.globals.markers.size=t.config.series.map((function(e){return t.config.markers.size}))}},{key:"plotChartMarkers",value:function(t,e,i){var s,a=this.w,r=e,n=t,o=null,l=new Graphics(this.ctx);if(a.globals.markers.size[e]>0&&(o=l.group({class:"apexcharts-series-markers"})).attr("clip-path","url(#gridRectMarkerMask".concat(a.globals.cuid,")")),n.x instanceof Array)for(var h=0;h<n.x.length;h++){var c=i;1===i&&0===h&&(c=0),1===i&&1===h&&(c=1);var d="apexcharts-marker";if("line"!==a.config.chart.type&&"area"!==a.config.chart.type||a.globals.comboCharts||a.config.tooltip.intersect||(d+=" no-pointer-events"),Array.isArray(a.config.markers.size)?a.globals.markers.size[e]>0:a.config.markers.size>0){Utils.isNumber(n.y[h])?d+=" w".concat(Utils.randomId()):d="apexcharts-nullpoint";var u=this.getMarkerConfig(d,e,c);a.config.series[r].data[i]&&(a.config.series[r].data[i].fillColor&&(u.pointFillColor=a.config.series[r].data[i].fillColor),a.config.series[r].data[i].strokeColor&&(u.pointStrokeColor=a.config.series[r].data[i].strokeColor)),(s=l.drawMarker(n.x[h],n.y[h],u)).attr("rel",c),s.attr("j",c),s.attr("index",e),s.node.setAttribute("default-marker-size",u.pSize),new Filters(this.ctx).setSelectionFilter(s,e,c),this.addEvents(s),o&&o.add(s)}else void 0===a.globals.pointsArray[e]&&(a.globals.pointsArray[e]=[]),a.globals.pointsArray[e].push([n.x[h],n.y[h]])}return o}},{key:"getMarkerConfig",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=this.w,a=this.getMarkerStyle(e),r=s.globals.markers.size[e],n=s.config.markers;null!==i&&n.discrete.length&&n.discrete.map((function(t){t.seriesIndex===e&&t.dataPointIndex===i&&(a.pointStrokeColor=t.strokeColor,a.pointFillColor=t.fillColor,r=t.size)}));var o="bubble"===s.config.chart.type?s.config.stroke.width:n.strokeWidth;return{pSize:r,pRadius:n.radius,pWidth:o instanceof Array?o[e]:o,pointStrokeColor:a.pointStrokeColor,pointFillColor:a.pointFillColor,shape:n.shape instanceof Array?n.shape[e]:n.shape,class:t,pointStrokeOpacity:n.strokeOpacity instanceof Array?n.strokeOpacity[e]:n.strokeOpacity,pointFillOpacity:n.fillOpacity instanceof Array?n.fillOpacity[e]:n.fillOpacity,seriesIndex:e}}},{key:"addEvents",value:function(t){var e=this.w,i=new Graphics(this.ctx);t.node.addEventListener("mouseenter",i.pathMouseEnter.bind(this.ctx,t)),t.node.addEventListener("mouseleave",i.pathMouseLeave.bind(this.ctx,t)),t.node.addEventListener("mousedown",i.pathMouseDown.bind(this.ctx,t)),t.node.addEventListener("click",e.config.markers.onClick),t.node.addEventListener("dblclick",e.config.markers.onDblClick),t.node.addEventListener("touchstart",i.pathMouseDown.bind(this.ctx,t),{passive:!0})}},{key:"getMarkerStyle",value:function(t){var e=this.w,i=e.globals.markers.colors,s=e.config.markers.strokeColor||e.config.markers.strokeColors;return{pointStrokeColor:s instanceof Array?s[t]:s,pointFillColor:i instanceof Array?i[t]:i}}}]),t}(),Scatter=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w,this.initialAnim=this.w.config.chart.animations.enabled,this.dynamicAnim=this.initialAnim&&this.w.config.chart.animations.dynamicAnimation.enabled}return _createClass(t,[{key:"draw",value:function(t,e,i){var s=this.w,a=new Graphics(this.ctx),r=i.realIndex,n=i.pointsPos,o=i.zRatio,l=i.elParent,h=a.group({class:"apexcharts-series-markers apexcharts-series-".concat(s.config.chart.type)});if(h.attr("clip-path","url(#gridRectMarkerMask".concat(s.globals.cuid,")")),n.x instanceof Array)for(var c=0;c<n.x.length;c++){var d=e+1,u=!0;0===e&&0===c&&(d=0),0===e&&1===c&&(d=1);var g=0,f=s.globals.markers.size[r];if(o!==1/0){f=s.globals.seriesZ[r][d]/o;var p=s.config.plotOptions.bubble;p.minBubbleRadius&&f<p.minBubbleRadius&&(f=p.minBubbleRadius),p.maxBubbleRadius&&f>p.maxBubbleRadius&&(f=p.maxBubbleRadius)}s.config.chart.animations.enabled||(g=f);var x=n.x[c],b=n.y[c];if(g=g||0,null!==b&&void 0!==s.globals.series[r][d]||(u=!1),u){var m=this.drawPoint(x,b,g,f,r,d,e);h.add(m)}l.add(h)}}},{key:"drawPoint",value:function(t,e,i,s,a,r,n){var o=this.w,l=a,h=new Animations(this.ctx),c=new Filters(this.ctx),d=new Fill(this.ctx),u=new Markers(this.ctx),g=new Graphics(this.ctx),f=u.getMarkerConfig("apexcharts-marker",l),p=d.fillPath({seriesNumber:a,patternUnits:"objectBoundingBox",value:o.globals.series[a][n]}),x=g.drawCircle(i);if(o.config.series[l].data[r]&&o.config.series[l].data[r].fillColor&&(p=o.config.series[l].data[r].fillColor),x.attr({cx:t,cy:e,fill:p,stroke:f.pointStrokeColor,"stroke-width":f.pWidth}),o.config.chart.dropShadow.enabled){var b=o.config.chart.dropShadow;c.dropShadow(x,b,a)}if(this.initialAnim&&!o.globals.dataChanged){var m=1;o.globals.resized||(m=o.config.chart.animations.speed),h.animateCircleRadius(x,0,s,m,o.globals.easing)}if(o.globals.dataChanged)if(this.dynamicAnim){var v,y,w,k,A=o.config.chart.animations.dynamicAnimation.speed;null!=(k=o.globals.previousPaths[a]&&o.globals.previousPaths[a][n])&&(v=k.x,y=k.y,w=void 0!==k.r?k.r:s);for(var S=0;S<o.globals.collapsedSeries.length;S++)o.globals.collapsedSeries[S].index===a&&(A=1,s=0);0===t&&0===e&&(s=0),h.animateCircle(x,{cx:v,cy:y,r:w},{cx:t,cy:e,r:s},A,o.globals.easing)}else x.attr({r:s});return x.attr({rel:r,j:r,index:a,"default-marker-size":s}),c.setSelectionFilter(x,a,r),u.addEvents(x),x.node.classList.add("apexcharts-marker"),x}},{key:"centerTextInBubble",value:function(t){var e=this.w;return{y:t+=parseInt(e.config.dataLabels.style.fontSize,10)/4}}}]),t}(),DataLabels=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w}return _createClass(t,[{key:"dataLabelsCorrection",value:function(t,e,i,s,a,r,n){var o=this.w,l=!1,h=new Graphics(this.ctx).getTextRects(i,n),c=h.width,d=h.height;void 0===o.globals.dataLabelsRects[s]&&(o.globals.dataLabelsRects[s]=[]),o.globals.dataLabelsRects[s].push({x:t,y:e,width:c,height:d});var u=o.globals.dataLabelsRects[s].length-2,g=void 0!==o.globals.lastDrawnDataLabelsIndexes[s]?o.globals.lastDrawnDataLabelsIndexes[s][o.globals.lastDrawnDataLabelsIndexes[s].length-1]:0;if(void 0!==o.globals.dataLabelsRects[s][u]){var f=o.globals.dataLabelsRects[s][g];(t>f.x+f.width+2||e>f.y+f.height+2||t+c<f.x)&&(l=!0)}return(0===a||r)&&(l=!0),{x:t,y:e,textRects:h,drawnextLabel:l}}},{key:"drawDataLabel",value:function(t,e,i){var s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"top",a=this.w,r=new Graphics(this.ctx),n=a.config.dataLabels,o=0,l=0,h=i,c=null;if(!n.enabled||t.x instanceof Array!=!0)return c;c=r.group({class:"apexcharts-data-labels"});for(var d=0;d<t.x.length;d++)if(o=t.x[d]+n.offsetX,l=t.y[d]+n.offsetY-a.globals.markers.size[e]-5,"bottom"===s&&(l=l+2*a.globals.markers.size[e]+1.4*parseInt(n.style.fontSize,10)),!isNaN(o)){1===i&&0===d&&(h=0),1===i&&1===d&&(h=1);var u=a.globals.series[e][h],g="";if("bubble"===a.config.chart.type){u=a.globals.seriesZ[e][h],g=a.config.dataLabels.formatter(u,{ctx:this.ctx,seriesIndex:e,dataPointIndex:h,w:a}),l=t.y[d]+a.config.dataLabels.offsetY;var f=new Scatter(this.ctx),p=f.centerTextInBubble(l,e,h);l=p.y}else void 0!==u&&(g=a.config.dataLabels.formatter(u,{ctx:this.ctx,seriesIndex:e,dataPointIndex:h,w:a}));this.plotDataLabelsText({x:o,y:l,text:g,i:e,j:h,parent:c,offsetCorrection:!0,dataLabelsConfig:a.config.dataLabels})}return c}},{key:"plotDataLabelsText",value:function(t){var e=this.w,i=new Graphics(this.ctx),s=t.x,a=t.y,r=t.i,n=t.j,o=t.text,l=t.textAnchor,h=t.parent,c=t.dataLabelsConfig,d=t.alwaysDrawDataLabel,u=t.offsetCorrection;if(!(Array.isArray(e.config.dataLabels.enabledOnSeries)&&e.config.dataLabels.enabledOnSeries.indexOf(r)<0)){var g={x:s,y:a,drawnextLabel:!0};u&&(g=this.dataLabelsCorrection(s,a,o,r,n,d,parseInt(c.style.fontSize,10))),e.globals.zoomed||(s=g.x,a=g.y),g.textRects&&(s+g.textRects.width<10||s>e.globals.gridWidth+10)&&(o="");var f=e.globals.dataLabels.style.colors[r];if("bar"!==e.config.chart.type&&"rangeBar"!==e.config.chart.type||!e.config.plotOptions.bar.distributed||(f=e.globals.dataLabels.style.colors[n]),g.drawnextLabel){var p=i.drawText({width:100,height:parseInt(c.style.fontSize,10),x:s,y:a,foreColor:f,textAnchor:l||c.textAnchor,text:o,fontSize:c.style.fontSize,fontFamily:c.style.fontFamily});if(p.attr({class:"apexcharts-datalabel",cx:s,cy:a}),c.dropShadow.enabled){var x=c.dropShadow;new Filters(this.ctx).dropShadow(p,x)}h.add(p),void 0===e.globals.lastDrawnDataLabelsIndexes[r]&&(e.globals.lastDrawnDataLabelsIndexes[r]=[]),e.globals.lastDrawnDataLabelsIndexes[r].push(n)}}}}]),t}(),BarDataLabels=function(){function t(e){_classCallCheck(this,t),this.w=e.w,this.barCtx=e}return _createClass(t,[{key:"handleBarDataLabels",value:function(t){var e=t.x,i=t.y,s=t.y1,a=t.y2,r=t.i,n=t.j,o=t.realIndex,l=t.series,h=t.barHeight,c=t.barWidth,d=t.barYPosition,u=t.visibleSeries,g=t.renderedPath,f=this.w,p=new Graphics(this.barCtx.ctx),x=Array.isArray(this.barCtx.strokeWidth)?this.barCtx.strokeWidth[o]:this.barCtx.strokeWidth,b=e+parseFloat(c*u),m=i+parseFloat(h*u);f.globals.isXNumeric&&!f.globals.isBarHorizontal&&(b=e+parseFloat(c*(u+1)),m=i+parseFloat(h*(u+1))-x);var v=e,y=i,w={},k=f.config.dataLabels,A=this.barCtx.barOptions.dataLabels;void 0!==d&&this.barCtx.isTimelineBar&&(m=d,y=d);var S=k.offsetX,C=k.offsetY,L={width:0,height:0};f.config.dataLabels.enabled&&(L=p.getTextRects(f.globals.yLabelFormatters[0](f.globals.maxY),parseFloat(k.style.fontSize)));var P={x:e,y:i,i:r,j:n,renderedPath:g,bcx:b,bcy:m,barHeight:h,barWidth:c,textRects:L,strokeWidth:x,dataLabelsX:v,dataLabelsY:y,barDataLabelsConfig:A,offX:S,offY:C};return w=this.barCtx.isHorizontal?this.calculateBarsDataLabelsPosition(P):this.calculateColumnsDataLabelsPosition(P),g.attr({cy:w.bcy,cx:w.bcx,j:n,val:l[r][n],barHeight:h,barWidth:c}),this.drawCalculatedDataLabels({x:w.dataLabelsX,y:w.dataLabelsY,val:this.barCtx.isTimelineBar?[s,a]:l[r][n],i:o,j:n,barWidth:c,barHeight:h,textRects:L,dataLabelsConfig:k})}},{key:"calculateColumnsDataLabelsPosition",value:function(t){var e,i=this.w,s=t.i,a=t.j,r=t.y,n=t.bcx,o=t.barWidth,l=t.barHeight,h=t.textRects,c=t.dataLabelsY,d=t.barDataLabelsConfig,u=t.strokeWidth,g=t.offX,f=t.offY,p="vertical"===i.config.plotOptions.bar.dataLabels.orientation;n-=u/2;var x=i.globals.gridWidth/i.globals.dataPoints;if(e=i.globals.isXNumeric?n-o/2+g:n-x+o/2+g,p){e=e+h.height/2-u/2-2}var b=this.barCtx.series[s][a]<=0;switch(this.barCtx.isReversed&&(r-=l),d.position){case"center":c=p?b?r+l/2+f:r+l/2-f:b?r+l/2+h.height/2+f:r+l/2+h.height/2-f;break;case"bottom":c=p?b?r+l+f:r+l-f:b?r+l+h.height+u+f:r+l-h.height/2+u-f;break;case"top":c=p?b?r+f:r-f:b?r-h.height/2-f:r+h.height+f}return i.config.chart.stacked||(c<0?c=0+u:c+h.height/3>i.globals.gridHeight&&(c=i.globals.gridHeight-u)),{bcx:n,bcy:r,dataLabelsX:e,dataLabelsY:c}}},{key:"calculateBarsDataLabelsPosition",value:function(t){var e=this.w,i=t.x,s=t.i,a=t.j,r=t.bcy,n=t.barHeight,o=t.barWidth,l=t.textRects,h=t.dataLabelsX,c=t.strokeWidth,d=t.barDataLabelsConfig,u=t.offX,g=t.offY,f=e.globals.gridHeight/e.globals.dataPoints,p=r-(this.barCtx.isTimelineBar?0:f)+n/2+l.height/2+g-3,x=this.barCtx.series[s][a]<=0;switch(this.barCtx.isReversed&&(i+=o),d.position){case"center":h=x?i-o/2-u:i-o/2+u;break;case"bottom":h=x?i-o-c-Math.round(l.width/2)-u:i-o+c+Math.round(l.width/2)+u;break;case"top":h=x?i-c+Math.round(l.width/2)-u:i-c-Math.round(l.width/2)+u}return e.config.chart.stacked||(h<0?h=h+l.width+c:h+l.width/2>e.globals.gridWidth&&(h=e.globals.gridWidth-l.width-c)),{bcx:i,bcy:r,dataLabelsX:h,dataLabelsY:p}}},{key:"drawCalculatedDataLabels",value:function(t){var e=t.x,i=t.y,s=t.val,a=t.i,r=t.j,n=t.textRects,o=t.barHeight,l=t.barWidth,h=t.dataLabelsConfig,c=this.w,d="rotate(0)";"vertical"===c.config.plotOptions.bar.dataLabels.orientation&&(d="rotate(-90, ".concat(e,", ").concat(i,")"));var u=new DataLabels(this.barCtx.ctx),g=new Graphics(this.barCtx.ctx),f=h.formatter,p=null,x=c.globals.collapsedSeriesIndices.indexOf(a)>-1;if(h.enabled&&!x){p=g.group({class:"apexcharts-data-labels",transform:d});var b="";void 0!==s&&(b=f(s,{seriesIndex:a,dataPointIndex:r,w:c})),0===s&&c.config.chart.stacked&&(b="");var m=c.globals.series[a][r]<=0,v=c.config.plotOptions.bar.dataLabels.position;if("vertical"===c.config.plotOptions.bar.dataLabels.orientation&&("top"===v&&(h.textAnchor=m?"end":"start"),"center"===v&&(h.textAnchor="middle"),"bottom"===v&&(h.textAnchor=m?"end":"start")),this.barCtx.isTimelineBar&&this.barCtx.barOptions.dataLabels.hideOverflowingLabels)l<g.getTextRects(b,parseFloat(h.style.fontSize)).width&&(b="");c.config.chart.stacked&&this.barCtx.barOptions.dataLabels.hideOverflowingLabels&&(this.barCtx.isHorizontal?((l=c.globals.series[a][r]/this.barCtx.yRatio[this.barCtx.yaxisIndex])>0&&n.width/1.6>l||l<0&&n.width/1.6<l)&&(b=""):(o=c.globals.series[a][r]/this.barCtx.yRatio[this.barCtx.yaxisIndex],n.height/1.6>o&&(b="")));var y=_objectSpread2({},h);this.barCtx.isHorizontal&&s<0&&("start"===h.textAnchor?y.textAnchor="end":"end"===h.textAnchor&&(y.textAnchor="start")),u.plotDataLabelsText({x:e,y:i,text:b,i:a,j:r,parent:p,dataLabelsConfig:y,alwaysDrawDataLabel:!0,offsetCorrection:!0})}return p}}]),t}(),Helpers=function(){function t(e){_classCallCheck(this,t),this.w=e.w,this.barCtx=e}return _createClass(t,[{key:"initVariables",value:function(t){var e=this.w;this.barCtx.series=t,this.barCtx.totalItems=0,this.barCtx.seriesLen=0,this.barCtx.visibleI=-1,this.barCtx.visibleItems=1;for(var i=0;i<t.length;i++)if(t[i].length>0&&(this.barCtx.seriesLen=this.barCtx.seriesLen+1,this.barCtx.totalItems+=t[i].length),e.globals.isXNumeric)for(var s=0;s<t[i].length;s++)e.globals.seriesX[i][s]>e.globals.minX&&e.globals.seriesX[i][s]<e.globals.maxX&&this.barCtx.visibleItems++;else this.barCtx.visibleItems=e.globals.dataPoints;0===this.barCtx.seriesLen&&(this.barCtx.seriesLen=1)}},{key:"initialPositions",value:function(){var t,e,i,s,a,r,n,o,l=this.w,h=l.globals.dataPoints;return this.barCtx.isTimelineBar&&(h=l.globals.labels.length),this.barCtx.isHorizontal?(a=(i=l.globals.gridHeight/h)/this.barCtx.seriesLen,l.globals.isXNumeric&&(a=(i=l.globals.gridHeight/this.barCtx.totalItems)/this.barCtx.seriesLen),a=a*parseInt(this.barCtx.barOptions.barHeight,10)/100,o=this.barCtx.baseLineInvertedY+l.globals.padHorizontal+(this.barCtx.isReversed?l.globals.gridWidth:0)-(this.barCtx.isReversed?2*this.barCtx.baseLineInvertedY:0),e=(i-a*this.barCtx.seriesLen)/2):(r=(s=l.globals.gridWidth/this.barCtx.visibleItems)/this.barCtx.seriesLen*parseInt(this.barCtx.barOptions.columnWidth,10)/100,l.globals.isXNumeric&&(l.globals.minXDiff&&l.globals.minXDiff/this.barCtx.xRatio>0&&(s=l.globals.minXDiff/this.barCtx.xRatio),(r=s/this.barCtx.seriesLen*parseInt(this.barCtx.barOptions.columnWidth,10)/100)<1&&(r=1)),n=l.globals.gridHeight-this.barCtx.baseLineY[this.barCtx.yaxisIndex]-(this.barCtx.isReversed?l.globals.gridHeight:0)+(this.barCtx.isReversed?2*this.barCtx.baseLineY[this.barCtx.yaxisIndex]:0),t=l.globals.padHorizontal+(s-r*this.barCtx.seriesLen)/2),{x:t,y:e,yDivision:i,xDivision:s,barHeight:a,barWidth:r,zeroH:n,zeroW:o}}},{key:"getPathFillColor",value:function(t,e,i,s){var a=this.w,r=new Fill(this.barCtx.ctx),n=null,o=this.barCtx.barOptions.distributed?i:e;this.barCtx.barOptions.colors.ranges.length>0&&this.barCtx.barOptions.colors.ranges.map((function(s){t[e][i]>=s.from&&t[e][i]<=s.to&&(n=s.color)}));return a.config.series[e].data[i]&&a.config.series[e].data[i].fillColor&&(n=a.config.series[e].data[i].fillColor),r.fillPath({seriesNumber:this.barCtx.barOptions.distributed?o:s,color:n,value:t[e][i]})}},{key:"getStrokeWidth",value:function(t,e,i){var s=0,a=this.w;return void 0===this.barCtx.series[t][e]||null===this.barCtx.series[t][e]?this.barCtx.isNullValue=!0:this.barCtx.isNullValue=!1,a.config.stroke.show&&(this.barCtx.isNullValue||(s=Array.isArray(this.barCtx.strokeWidth)?this.barCtx.strokeWidth[i]:this.barCtx.strokeWidth)),s}},{key:"getBarEndingShape",value:function(t,e,i,s,a){var r=new Graphics(this.barCtx.ctx);if(this.barCtx.isHorizontal){var n=null,o=e.x;if(void 0!==i[s][a]||null!==i[s][a]){var l=i[s][a]<0,h=e.barHeight/2-e.strokeWidth;switch(l&&(h=-e.barHeight/2-e.strokeWidth),t.config.chart.stacked||"rounded"===this.barCtx.barOptions.endingShape&&(o=e.x-h/2),this.barCtx.barOptions.endingShape){case"flat":n=r.line(o,e.barYPosition+e.barHeight-e.strokeWidth);break;case"rounded":n=r.quadraticCurve(o+h,e.barYPosition+(e.barHeight-e.strokeWidth)/2,o,e.barYPosition+e.barHeight-e.strokeWidth)}}return{path:n,ending_p_from:"",newX:o}}var c=null,d=e.y;if(void 0!==i[s][a]||null!==i[s][a]){var u=i[s][a]<0,g=e.barWidth/2-e.strokeWidth;switch(u&&(g=-e.barWidth/2-e.strokeWidth),t.config.chart.stacked||"rounded"===this.barCtx.barOptions.endingShape&&(d+=g/2),this.barCtx.barOptions.endingShape){case"flat":c=r.line(e.barXPosition+e.barWidth-e.strokeWidth,d);break;case"rounded":c=r.quadraticCurve(e.barXPosition+(e.barWidth-e.strokeWidth)/2,d-g,e.barXPosition+e.barWidth-e.strokeWidth,d)}}return{path:c,ending_p_from:"",newY:d}}}]),t}(),Bar=function(){function t(e,i){_classCallCheck(this,t),this.ctx=e,this.w=e.w;var s=this.w;this.barOptions=s.config.plotOptions.bar,this.isHorizontal=this.barOptions.horizontal,this.strokeWidth=s.config.stroke.width,this.isNullValue=!1,this.isTimelineBar="datetime"===s.config.xaxis.type&&s.globals.seriesRangeBarTimeline.length,this.xyRatios=i,null!==this.xyRatios&&(this.xRatio=i.xRatio,this.yRatio=i.yRatio,this.invertedXRatio=i.invertedXRatio,this.invertedYRatio=i.invertedYRatio,this.baseLineY=i.baseLineY,this.baseLineInvertedY=i.baseLineInvertedY),this.yaxisIndex=0,this.seriesLen=0,this.barHelpers=new Helpers(this)}return _createClass(t,[{key:"draw",value:function(t,e){var i=this.w,s=new Graphics(this.ctx),a=new CoreUtils(this.ctx,i);t=a.getLogSeries(t),this.series=t,this.yRatio=a.getLogYRatios(this.yRatio),this.barHelpers.initVariables(t);var r=s.group({class:"apexcharts-bar-series apexcharts-plot-series"});i.config.dataLabels.enabled&&this.totalItems>this.barOptions.dataLabels.maxItems&&console.warn("WARNING: DataLabels are enabled but there are too many to display. This may cause performance issue when rendering.");for(var n=0,o=0;n<t.length;n++,o++){var l,h,c,d,u=void 0,g=void 0,f=[],p=[],x=i.globals.comboCharts?e[n]:n,b=s.group({class:"apexcharts-series",rel:n+1,seriesName:Utils.escapeString(i.globals.seriesNames[x]),"data:realIndex":x});this.ctx.series.addCollapsedClassToSeries(b,x),t[n].length>0&&(this.visibleI=this.visibleI+1);var m=0,v=0;this.yRatio.length>1&&(this.yaxisIndex=x),this.isReversed=i.config.yaxis[this.yaxisIndex]&&i.config.yaxis[this.yaxisIndex].reversed;var y=this.barHelpers.initialPositions();g=y.y,m=y.barHeight,h=y.yDivision,d=y.zeroW,u=y.x,v=y.barWidth,l=y.xDivision,c=y.zeroH,this.horizontal||p.push(u+v/2);for(var w=s.group({class:"apexcharts-datalabels"}),k=0;k<i.globals.dataPoints;k++){var A=this.barHelpers.getStrokeWidth(n,k,x),S=null,C={indexes:{i:n,j:k,realIndex:x,bc:o},x:u,y:g,strokeWidth:A,elSeries:b};this.isHorizontal?(S=this.drawBarPaths(_objectSpread2({},C,{barHeight:m,zeroW:d,yDivision:h})),v=this.series[n][k]/this.invertedYRatio):(S=this.drawColumnPaths(_objectSpread2({},C,{xDivision:l,barWidth:v,zeroH:c})),m=this.series[n][k]/this.yRatio[this.yaxisIndex]),g=S.y,u=S.x,k>0&&p.push(u+v/2),f.push(g);var L=this.barHelpers.getPathFillColor(t,n,k,x);this.renderSeries({realIndex:x,pathFill:L,j:k,i:n,pathFrom:S.pathFrom,pathTo:S.pathTo,strokeWidth:A,elSeries:b,x:u,y:g,series:t,barHeight:m,barWidth:v,elDataLabelsWrap:w,visibleSeries:this.visibleI,type:"bar"})}i.globals.seriesXvalues[x]=p,i.globals.seriesYvalues[x]=f,r.add(b)}return r}},{key:"renderSeries",value:function(t){var e=t.realIndex,i=t.pathFill,s=t.lineFill,a=t.j,r=t.i,n=t.pathFrom,o=t.pathTo,l=t.strokeWidth,h=t.elSeries,c=t.x,d=t.y,u=t.y1,g=t.y2,f=t.series,p=t.barHeight,x=t.barWidth,b=t.barYPosition,m=t.elDataLabelsWrap,v=t.visibleSeries,y=t.type,w=this.w,k=new Graphics(this.ctx);s||(s=this.barOptions.distributed?w.globals.stroke.colors[a]:w.globals.stroke.colors[e]),w.config.series[r].data[a]&&w.config.series[r].data[a].strokeColor&&(s=w.config.series[r].data[a].strokeColor),this.isNullValue&&(i="none");var A=a/w.config.chart.animations.animateGradually.delay*(w.config.chart.animations.speed/w.globals.dataPoints)/2.4,S=k.renderPaths({i:r,j:a,realIndex:e,pathFrom:n,pathTo:o,stroke:s,strokeWidth:l,strokeLineCap:w.config.stroke.lineCap,fill:i,animationDelay:A,initialSpeed:w.config.chart.animations.speed,dataChangeSpeed:w.config.chart.animations.dynamicAnimation.speed,className:"apexcharts-".concat(y,"-area")});S.attr("clip-path","url(#gridRectMask".concat(w.globals.cuid,")")),void 0!==u&&void 0!==g&&(S.attr("data-range-y1",u),S.attr("data-range-y2",g)),new Filters(this.ctx).setSelectionFilter(S,e,a),h.add(S);var C=new BarDataLabels(this).handleBarDataLabels({x:c,y:d,y1:u,y2:g,i:r,j:a,series:f,realIndex:e,barHeight:p,barWidth:x,barYPosition:b,renderedPath:S,visibleSeries:v});return null!==C&&m.add(C),h.add(m),h}},{key:"drawBarPaths",value:function(t){var e=t.indexes,i=t.barHeight,s=t.strokeWidth,a=t.zeroW,r=t.x,n=t.y,o=t.yDivision,l=t.elSeries,h=this.w,c=new Graphics(this.ctx),d=e.i,u=e.j,g=e.realIndex,f=e.bc;h.globals.isXNumeric&&(n=(h.globals.seriesX[d][u]-h.globals.minX)/this.invertedXRatio-i);var p=n+i*this.visibleI,x=c.move(a,p),b=c.move(a,p);h.globals.previousPaths.length>0&&(b=this.getPreviousPath(g,u));var m={barHeight:i,strokeWidth:s,barYPosition:p,x:r=void 0===this.series[d][u]||null===this.series[d][u]?a:a+this.series[d][u]/this.invertedYRatio-2*(this.isReversed?this.series[d][u]/this.invertedYRatio:0),zeroW:a},v=this.barHelpers.getBarEndingShape(h,m,this.series,d,u);if(x=x+c.line(v.newX,p)+v.path+c.line(a,p+i-s)+c.line(a,p),b=b+c.line(a,p)+v.ending_p_from+c.line(a,p+i-s)+c.line(a,p+i-s)+c.line(a,p),h.globals.isXNumeric||(n+=o),this.barOptions.colors.backgroundBarColors.length>0&&0===d){f>=this.barOptions.colors.backgroundBarColors.length&&(f=0);var y=this.barOptions.colors.backgroundBarColors[f],w=c.drawRect(0,p-i*this.visibleI,h.globals.gridWidth,i*this.seriesLen,0,y,this.barOptions.colors.backgroundBarOpacity);l.add(w),w.node.classList.add("apexcharts-backgroundBar")}return{pathTo:x,pathFrom:b,x:r,y:n,barYPosition:p}}},{key:"drawColumnPaths",value:function(t){var e=t.indexes,i=t.x,s=t.y,a=t.xDivision,r=t.barWidth,n=t.zeroH,o=t.strokeWidth,l=t.elSeries,h=this.w,c=new Graphics(this.ctx),d=e.i,u=e.j,g=e.realIndex,f=e.bc;if(h.globals.isXNumeric){var p=d;h.globals.seriesX[d].length||(p=h.globals.maxValsInArrayIndex),i=(h.globals.seriesX[p][u]-h.globals.minX)/this.xRatio-r/2}var x=i+r*this.visibleI,b=c.move(x,n),m=c.move(x,n);h.globals.previousPaths.length>0&&(m=this.getPreviousPath(g,u));var v={barWidth:r,strokeWidth:o,barXPosition:x,y:s=void 0===this.series[d][u]||null===this.series[d][u]?n:n-this.series[d][u]/this.yRatio[this.yaxisIndex]+2*(this.isReversed?this.series[d][u]/this.yRatio[this.yaxisIndex]:0),zeroH:n},y=this.barHelpers.getBarEndingShape(h,v,this.series,d,u);if(b=b+c.line(x,y.newY)+y.path+c.line(x+r-o,n)+c.line(x-o/2,n),m=m+c.line(x,n)+y.ending_p_from+c.line(x+r-o,n)+c.line(x+r-o,n)+c.line(x-o/2,n),h.globals.isXNumeric||(i+=a),this.barOptions.colors.backgroundBarColors.length>0&&0===d){f>=this.barOptions.colors.backgroundBarColors.length&&(f=0);var w=this.barOptions.colors.backgroundBarColors[f],k=c.drawRect(x-r*this.visibleI,0,r*this.seriesLen,h.globals.gridHeight,0,w,this.barOptions.colors.backgroundBarOpacity);l.add(k),k.node.classList.add("apexcharts-backgroundBar")}return{pathTo:b,pathFrom:m,x:i,y:s,barXPosition:x}}},{key:"getPreviousPath",value:function(t,e){for(var i,s=this.w,a=0;a<s.globals.previousPaths.length;a++){var r=s.globals.previousPaths[a];r.paths&&r.paths.length>0&&parseInt(r.realIndex,10)===parseInt(t,10)&&void 0!==s.globals.previousPaths[a].paths[e]&&(i=s.globals.previousPaths[a].paths[e].d)}return i}}]),t}(),BarStacked=function(t){function e(){return _classCallCheck(this,e),_possibleConstructorReturn(this,_getPrototypeOf(e).apply(this,arguments))}return _inherits(e,Bar),_createClass(e,[{key:"draw",value:function(t,e){var i=this.w;this.graphics=new Graphics(this.ctx),this.bar=new Bar(this.ctx,this.xyRatios);var s=new CoreUtils(this.ctx,i);t=s.getLogSeries(t),this.yRatio=s.getLogYRatios(this.yRatio),this.barHelpers.initVariables(t),"100%"===i.config.chart.stackType&&(t=i.globals.seriesPercent.slice()),this.series=t,this.totalItems=0,this.prevY=[],this.prevX=[],this.prevYF=[],this.prevXF=[],this.prevYVal=[],this.prevXVal=[],this.xArrj=[],this.xArrjF=[],this.xArrjVal=[],this.yArrj=[],this.yArrjF=[],this.yArrjVal=[];for(var a=0;a<t.length;a++)t[a].length>0&&(this.totalItems+=t[a].length);for(var r=this.graphics.group({class:"apexcharts-bar-series apexcharts-plot-series"}),n=0,o=0,l=0,h=0;l<t.length;l++,h++){var c=void 0,d=void 0,u=void 0,g=void 0,f=[],p=[],x=i.globals.comboCharts?e[l]:l;this.yRatio.length>1&&(this.yaxisIndex=x),this.isReversed=i.config.yaxis[this.yaxisIndex]&&i.config.yaxis[this.yaxisIndex].reversed;var b=this.graphics.group({class:"apexcharts-series",seriesName:Utils.escapeString(i.globals.seriesNames[x]),rel:l+1,"data:realIndex":x}),m=this.graphics.group({class:"apexcharts-datalabels"}),v=0,y=0,w=this.initialPositions(n,o,c,d,u,g);o=w.y,v=w.barHeight,d=w.yDivision,g=w.zeroW,n=w.x,y=w.barWidth,c=w.xDivision,u=w.zeroH,this.yArrj=[],this.yArrjF=[],this.yArrjVal=[],this.xArrj=[],this.xArrjF=[],this.xArrjVal=[];for(var k=0;k<i.globals.dataPoints;k++){var A=this.barHelpers.getStrokeWidth(l,k,x),S=null;this.isHorizontal?(S=this.drawBarPaths({indexes:{i:l,j:k,realIndex:x,bc:h},barHeight:v,strokeWidth:A,zeroW:g,x:n,y:o,yDivision:d,elSeries:b}),y=this.series[l][k]/this.invertedYRatio):(S=this.drawColumnPaths({indexes:{i:l,j:k,realIndex:x,bc:h},x:n,y:o,xDivision:c,barWidth:y,zeroH:u,strokeWidth:A,elSeries:b}),v=this.series[l][k]/this.yRatio[this.yaxisIndex]),o=S.y,n=S.x,f.push(n),p.push(o);var C=this.barHelpers.getPathFillColor(t,l,k,x);b=this.renderSeries({realIndex:x,pathFill:C,j:k,i:l,pathFrom:S.pathFrom,pathTo:S.pathTo,strokeWidth:A,elSeries:b,x:n,y:o,series:t,barHeight:v,barWidth:y,elDataLabelsWrap:m,type:"bar",visibleSeries:0})}i.globals.seriesXvalues[x]=f,i.globals.seriesYvalues[x]=p,this.prevY.push(this.yArrj),this.prevYF.push(this.yArrjF),this.prevYVal.push(this.yArrjVal),this.prevX.push(this.xArrj),this.prevXF.push(this.xArrjF),this.prevXVal.push(this.xArrjVal),r.add(b)}return r}},{key:"initialPositions",value:function(t,e,i,s,a,r){var n,o,l=this.w;return this.isHorizontal?(n=(n=s=l.globals.gridHeight/l.globals.dataPoints)*parseInt(l.config.plotOptions.bar.barHeight,10)/100,r=this.baseLineInvertedY+l.globals.padHorizontal+(this.isReversed?l.globals.gridWidth:0)-(this.isReversed?2*this.baseLineInvertedY:0),e=(s-n)/2):(o=i=l.globals.gridWidth/l.globals.dataPoints,o=l.globals.isXNumeric?(i=l.globals.minXDiff/this.xRatio)*parseInt(this.barOptions.columnWidth,10)/100:o*parseInt(l.config.plotOptions.bar.columnWidth,10)/100,a=this.baseLineY[this.yaxisIndex]+(this.isReversed?l.globals.gridHeight:0)-(this.isReversed?2*this.baseLineY[this.yaxisIndex]:0),t=l.globals.padHorizontal+(i-o)/2),{x:t,y:e,yDivision:s,xDivision:i,barHeight:n,barWidth:o,zeroH:a,zeroW:r}}},{key:"drawBarPaths",value:function(t){for(var e,i=t.indexes,s=t.barHeight,a=t.strokeWidth,r=t.zeroW,n=t.x,o=t.y,l=t.yDivision,h=t.elSeries,c=this.w,d=o,u=i.i,g=i.j,f=i.realIndex,p=i.bc,x=0,b=0;b<this.prevXF.length;b++)x+=this.prevXF[b][g];if(u>0){var m=r;this.prevXVal[u-1][g]<0?m=this.series[u][g]>=0?this.prevX[u-1][g]+x-2*(this.isReversed?x:0):this.prevX[u-1][g]:this.prevXVal[u-1][g]>=0&&(m=this.series[u][g]>=0?this.prevX[u-1][g]:this.prevX[u-1][g]-x+2*(this.isReversed?x:0)),e=m}else e=r;n=null===this.series[u][g]?e:e+this.series[u][g]/this.invertedYRatio-2*(this.isReversed?this.series[u][g]/this.invertedYRatio:0);var v={barHeight:s,strokeWidth:a,invertedYRatio:this.invertedYRatio,barYPosition:d,x:n},y=this.barHelpers.getBarEndingShape(c,v,this.series,u,g);this.series.length>1&&u!==this.endingShapeOnSeriesNumber&&(y.path=this.graphics.line(y.newX,d+s-a)),this.xArrj.push(y.newX),this.xArrjF.push(Math.abs(e-y.newX)),this.xArrjVal.push(this.series[u][g]);var w=this.graphics.move(e,d),k=this.graphics.move(e,d);if(c.globals.previousPaths.length>0&&(k=this.bar.getPreviousPath(f,g,!1)),w=w+this.graphics.line(y.newX,d)+y.path+this.graphics.line(e,d+s-a)+this.graphics.line(e,d),k=k+this.graphics.line(e,d)+this.graphics.line(e,d+s-a)+this.graphics.line(e,d+s-a)+this.graphics.line(e,d+s-a)+this.graphics.line(e,d),c.config.plotOptions.bar.colors.backgroundBarColors.length>0&&0===u){p>=c.config.plotOptions.bar.colors.backgroundBarColors.length&&(p=0);var A=c.config.plotOptions.bar.colors.backgroundBarColors[p],S=this.graphics.drawRect(0,d,c.globals.gridWidth,s,0,A,c.config.plotOptions.bar.colors.backgroundBarOpacity);h.add(S),S.node.classList.add("apexcharts-backgroundBar")}return{pathTo:w,pathFrom:k,x:n,y:o+=l}}},{key:"drawColumnPaths",value:function(t){var e=t.indexes,i=t.x,s=t.y,a=t.xDivision,r=t.barWidth,n=t.zeroH,o=t.strokeWidth,l=t.elSeries,h=this.w,c=e.i,d=e.j,u=e.realIndex,g=e.bc;if(h.globals.isXNumeric){var f=h.globals.seriesX[c][d];f||(f=0),i=(f-h.globals.minX)/this.xRatio-r/2}for(var p,x=i,b=0,m=0;m<this.prevYF.length;m++)b+=this.prevYF[m][d];if(c>0&&!h.globals.isXNumeric||c>0&&h.globals.isXNumeric&&h.globals.seriesX[c-1][d]===h.globals.seriesX[c][d]){var v=this.prevY[c-1][d];p=this.prevYVal[c-1][d]<0?this.series[c][d]>=0?v-b+2*(this.isReversed?b:0):v:this.series[c][d]>=0?v:v+b-2*(this.isReversed?b:0)}else p=h.globals.gridHeight-n;s=p-this.series[c][d]/this.yRatio[this.yaxisIndex]+2*(this.isReversed?this.series[c][d]/this.yRatio[this.yaxisIndex]:0);var y={barWidth:r,strokeWidth:o,yRatio:this.yRatio[this.yaxisIndex],barXPosition:x,y:s},w=this.barHelpers.getBarEndingShape(h,y,this.series,c,d);this.yArrj.push(w.newY),this.yArrjF.push(Math.abs(p-w.newY)),this.yArrjVal.push(this.series[c][d]);var k=this.graphics.move(x,p),A=this.graphics.move(x,p);if(h.globals.previousPaths.length>0&&(A=this.bar.getPreviousPath(u,d,!1)),k=k+this.graphics.line(x,w.newY)+w.path+this.graphics.line(x+r-o,p)+this.graphics.line(x-o/2,p),A=A+this.graphics.line(x,p)+this.graphics.line(x+r-o,p)+this.graphics.line(x+r-o,p)+this.graphics.line(x+r-o,p)+this.graphics.line(x-o/2,p),h.config.plotOptions.bar.colors.backgroundBarColors.length>0&&0===c){g>=h.config.plotOptions.bar.colors.backgroundBarColors.length&&(g=0);var S=h.config.plotOptions.bar.colors.backgroundBarColors[g],C=this.graphics.drawRect(x,0,r,h.globals.gridHeight,0,S,h.config.plotOptions.bar.colors.backgroundBarOpacity);l.add(C),C.node.classList.add("apexcharts-backgroundBar")}return i+=a,{pathTo:k,pathFrom:A,x:h.globals.isXNumeric?i-a:i,y:s}}},{key:"checkZeroSeries",value:function(t){for(var e=t.series,i=this.w,s=0;s<e.length;s++){for(var a=0,r=0;r<e[i.globals.maxValsInArrayIndex].length;r++)a+=e[s][r];0===a&&this.zeroSerieses.push(s)}for(var n=e.length-1;n>=0;n--)this.zeroSerieses.indexOf(n)>-1&&n===this.endingShapeOnSeriesNumber&&(this.endingShapeOnSeriesNumber-=1)}}]),e}(),CandleStick=function(t){function e(){return _classCallCheck(this,e),_possibleConstructorReturn(this,_getPrototypeOf(e).apply(this,arguments))}return _inherits(e,Bar),_createClass(e,[{key:"draw",value:function(t,e){var i=this.w,s=new Graphics(this.ctx),a=new Fill(this.ctx);this.candlestickOptions=this.w.config.plotOptions.candlestick;var r=new CoreUtils(this.ctx,i);t=r.getLogSeries(t),this.series=t,this.yRatio=r.getLogYRatios(this.yRatio),this.barHelpers.initVariables(t);for(var n=s.group({class:"apexcharts-candlestick-series apexcharts-plot-series"}),o=0;o<t.length;o++){var l,h,c=void 0,d=void 0,u=[],g=[],f=i.globals.comboCharts?e[o]:o,p=s.group({class:"apexcharts-series",seriesName:Utils.escapeString(i.globals.seriesNames[f]),rel:o+1,"data:realIndex":f});t[o].length>0&&(this.visibleI=this.visibleI+1);var x,b;this.yRatio.length>1&&(this.yaxisIndex=f);var m=this.barHelpers.initialPositions();d=m.y,x=m.barHeight,c=m.x,b=m.barWidth,l=m.xDivision,h=m.zeroH,g.push(c+b/2);for(var v=s.group({class:"apexcharts-datalabels"}),y=0;y<i.globals.dataPoints;y++){var w,k=this.barHelpers.getStrokeWidth(o,y,f),A=this.drawCandleStickPaths({indexes:{i:o,j:y,realIndex:f},x:c,y:d,xDivision:l,barWidth:b,zeroH:h,strokeWidth:k,elSeries:p});d=A.y,c=A.x,w=A.color,y>0&&g.push(c+b/2),u.push(d);var S=a.fillPath({seriesNumber:f,color:w,value:t[o][y]}),C=this.candlestickOptions.wick.useFillColor?w:void 0;this.renderSeries({realIndex:f,pathFill:S,lineFill:C,j:y,i:o,pathFrom:A.pathFrom,pathTo:A.pathTo,strokeWidth:k,elSeries:p,x:c,y:d,series:t,barHeight:x,barWidth:b,elDataLabelsWrap:v,visibleSeries:this.visibleI,type:"candlestick"})}i.globals.seriesXvalues[f]=g,i.globals.seriesYvalues[f]=u,n.add(p)}return n}},{key:"drawCandleStickPaths",value:function(t){var e=t.indexes,i=t.x,s=(t.y,t.xDivision),a=t.barWidth,r=t.zeroH,n=t.strokeWidth,o=this.w,l=new Graphics(this.ctx),h=e.i,c=e.j,d=!0,u=o.config.plotOptions.candlestick.colors.upward,g=o.config.plotOptions.candlestick.colors.downward,f=this.yRatio[this.yaxisIndex],p=e.realIndex,x=this.getOHLCValue(p,c),b=r,m=r;x.o>x.c&&(d=!1);var v=Math.min(x.o,x.c),y=Math.max(x.o,x.c);o.globals.isXNumeric&&(i=(o.globals.seriesX[p][c]-o.globals.minX)/this.xRatio-a/2);var w=i+a*this.visibleI;void 0===this.series[h][c]||null===this.series[h][c]?v=r:(v=r-v/f,y=r-y/f,b=r-x.h/f,m=r-x.l/f);var k=l.move(w,r),A=l.move(w,v);return o.globals.previousPaths.length>0&&(A=this.getPreviousPath(p,c,!0)),k=l.move(w,y)+l.line(w+a/2,y)+l.line(w+a/2,b)+l.line(w+a/2,y)+l.line(w+a,y)+l.line(w+a,v)+l.line(w+a/2,v)+l.line(w+a/2,m)+l.line(w+a/2,v)+l.line(w,v)+l.line(w,y-n/2),A+=l.move(w,v),o.globals.isXNumeric||(i+=s),{pathTo:k,pathFrom:A,x:i,y:y,barXPosition:w,color:d?u:g}}},{key:"getOHLCValue",value:function(t,e){var i=this.w;return{o:i.globals.seriesCandleO[t][e],h:i.globals.seriesCandleH[t][e],l:i.globals.seriesCandleL[t][e],c:i.globals.seriesCandleC[t][e]}}}]),e}(),Crosshairs=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w}return _createClass(t,[{key:"drawXCrosshairs",value:function(){var t=this.w,e=new Graphics(this.ctx),i=new Filters(this.ctx),s=t.config.xaxis.crosshairs.fill.gradient,a=t.config.xaxis.crosshairs.dropShadow,r=t.config.xaxis.crosshairs.fill.type,n=s.colorFrom,o=s.colorTo,l=s.opacityFrom,h=s.opacityTo,c=s.stops,d=a.enabled,u=a.left,g=a.top,f=a.blur,p=a.color,x=a.opacity,b=t.config.xaxis.crosshairs.fill.color;if(t.config.xaxis.crosshairs.show){"gradient"===r&&(b=e.drawGradient("vertical",n,o,l,h,null,c,null));var m=e.drawRect();1===t.config.xaxis.crosshairs.width&&(m=e.drawLine()),m.attr({class:"apexcharts-xcrosshairs",x:0,y:0,y2:t.globals.gridHeight,width:Utils.isNumber(t.config.xaxis.crosshairs.width)?t.config.xaxis.crosshairs.width:0,height:t.globals.gridHeight,fill:b,filter:"none","fill-opacity":t.config.xaxis.crosshairs.opacity,stroke:t.config.xaxis.crosshairs.stroke.color,"stroke-width":t.config.xaxis.crosshairs.stroke.width,"stroke-dasharray":t.config.xaxis.crosshairs.stroke.dashArray}),d&&(m=i.dropShadow(m,{left:u,top:g,blur:f,color:p,opacity:x})),t.globals.dom.elGraphical.add(m)}}},{key:"drawYCrosshairs",value:function(){var t=this.w,e=new Graphics(this.ctx),i=t.config.yaxis[0].crosshairs;if(t.config.yaxis[0].crosshairs.show){var s=e.drawLine(0,0,t.globals.gridWidth,0,i.stroke.color,i.stroke.dashArray,i.stroke.width);s.attr({class:"apexcharts-ycrosshairs"}),t.globals.dom.elGraphical.add(s)}var a=e.drawLine(0,0,t.globals.gridWidth,0,i.stroke.color,0,0);a.attr({class:"apexcharts-ycrosshairs-hidden"}),t.globals.dom.elGraphical.add(a)}}]),t}(),HeatMap=function(){function t(e,i){_classCallCheck(this,t),this.ctx=e,this.w=e.w,this.xRatio=i.xRatio,this.yRatio=i.yRatio,this.negRange=!1,this.dynamicAnim=this.w.config.chart.animations.dynamicAnimation,this.rectRadius=this.w.config.plotOptions.heatmap.radius,this.strokeWidth=this.w.config.stroke.width}return _createClass(t,[{key:"draw",value:function(t){var e=this.w,i=new Graphics(this.ctx),s=i.group({class:"apexcharts-heatmap"});s.attr("clip-path","url(#gridRectMask".concat(e.globals.cuid,")"));var a=e.globals.gridWidth/e.globals.dataPoints,r=e.globals.gridHeight/e.globals.series.length,n=0,o=!1;this.checkColorRange();var l=t.slice();e.config.yaxis[0].reversed&&(o=!0,l.reverse());for(var h=o?0:l.length-1;o?h<l.length:h>=0;o?h++:h--){var c=i.group({class:"apexcharts-series apexcharts-heatmap-series",seriesName:Utils.escapeString(e.globals.seriesNames[h]),rel:h+1,"data:realIndex":h});if(e.config.chart.dropShadow.enabled){var d=e.config.chart.dropShadow;new Filters(this.ctx).dropShadow(c,d,h)}for(var u=0,g=0;g<l[h].length;g++){var f=1,p=e.config.plotOptions.heatmap.shadeIntensity,x=this.determineHeatColor(h,g);f=e.globals.hasNegs||this.negRange?e.config.plotOptions.heatmap.reverseNegativeShade?x.percent<0?x.percent/100*(1.25*p):(1-x.percent/100)*(1.25*p):x.percent<0?1-(1+x.percent/100)*p:(1-x.percent/100)*p:1-x.percent/100;var b=x.color,m=new Utils;if(e.config.plotOptions.heatmap.enableShades&&(b=Utils.hexToRgba(m.shadeColor(f,x.color),e.config.fill.opacity)),"image"===e.config.fill.type)b=new Fill(this.ctx).fillPath({seriesNumber:h,opacity:e.globals.hasNegs?x.percent<0?1-(1+x.percent/100):p+x.percent/100:x.percent/100,patternID:Utils.randomId(),width:e.config.fill.image.width?e.config.fill.image.width:a,height:e.config.fill.image.height?e.config.fill.image.height:r});var v=this.rectRadius,y=i.drawRect(u,n,a,r,v);if(y.attr({cx:u,cy:n}),y.node.classList.add("apexcharts-heatmap-rect"),c.add(y),y.attr({fill:b,i:h,index:h,j:g,val:l[h][g],"stroke-width":this.strokeWidth,stroke:e.globals.stroke.colors[0],color:b}),y.node.addEventListener("mouseenter",i.pathMouseEnter.bind(this,y)),y.node.addEventListener("mouseleave",i.pathMouseLeave.bind(this,y)),y.node.addEventListener("mousedown",i.pathMouseDown.bind(this,y)),e.config.chart.animations.enabled&&!e.globals.dataChanged){var w=1;e.globals.resized||(w=e.config.chart.animations.speed),this.animateHeatMap(y,u,n,a,r,w)}if(e.globals.dataChanged){var k=1;if(this.dynamicAnim.enabled&&e.globals.shouldAnimate){k=this.dynamicAnim.speed;var A=e.globals.previousPaths[h]&&e.globals.previousPaths[h][g]&&e.globals.previousPaths[h][g].color;A||(A="rgba(255, 255, 255, 0)"),this.animateHeatColor(y,Utils.isColorHex(A)?A:Utils.rgb2hex(A),Utils.isColorHex(b)?b:Utils.rgb2hex(b),k)}}var S=this.calculateHeatmapDataLabels({x:u,y:n,i:h,j:g,series:l,rectHeight:r,rectWidth:a});null!==S&&c.add(S),u+=a}n+=r,s.add(c)}var C=e.globals.yAxisScale[0].result.slice();e.config.yaxis[0].reversed?C.unshift(""):C.push(""),e.globals.yAxisScale[0].result=C;var L=e.globals.gridHeight/e.globals.series.length;return e.config.yaxis[0].labels.offsetY=-L/2,s}},{key:"checkColorRange",value:function(){var t=this,e=this.w.config.plotOptions.heatmap;e.colorScale.ranges.length>0&&e.colorScale.ranges.map((function(e,i){e.from<0&&(t.negRange=!0)}))}},{key:"determineHeatColor",value:function(t,e){var i=this.w,s=i.globals.series[t][e],a=i.config.plotOptions.heatmap,r=a.colorScale.inverse?e:t,n=i.globals.colors[r],o=Math.min.apply(Math,_toConsumableArray(i.globals.series[t])),l=Math.max.apply(Math,_toConsumableArray(i.globals.series[t]));a.distributed||(o=i.globals.minY,l=i.globals.maxY),void 0!==a.colorScale.min&&(o=a.colorScale.min<i.globals.minY?a.colorScale.min:i.globals.minY,l=a.colorScale.max>i.globals.maxY?a.colorScale.max:i.globals.maxY);var h=Math.abs(l)+Math.abs(o);0===s&&(s=1e-6);var c=100*s/(0===h?h-1e-6:h);a.colorScale.ranges.length>0&&a.colorScale.ranges.map((function(t,e){if(s>=t.from&&s<=t.to){n=t.color,o=t.from,l=t.to;var i=Math.abs(l)+Math.abs(o);c=100*s/(0===i?i-1e-6:i)}}));return{color:n,percent:c}}},{key:"calculateHeatmapDataLabels",value:function(t){var e=t.x,i=t.y,s=t.i,a=t.j,r=(t.series,t.rectHeight),n=t.rectWidth,o=this.w,l=o.config.dataLabels,h=new Graphics(this.ctx),c=new DataLabels(this.ctx),d=l.formatter,u=null;if(l.enabled){u=h.group({class:"apexcharts-data-labels"});var g=l.offsetX,f=l.offsetY,p=e+n/2+g,x=i+r/2+parseFloat(l.style.fontSize)/3+f,b=d(o.globals.series[s][a],{seriesIndex:s,dataPointIndex:a,w:o});c.plotDataLabelsText({x:p,y:x,text:b,i:s,j:a,parent:u,dataLabelsConfig:l})}return u}},{key:"animateHeatMap",value:function(t,e,i,s,a,r){var n=new Animations(this.ctx);n.animateRect(t,{x:e+s/2,y:i+a/2,width:0,height:0},{x:e,y:i,width:s,height:a},r,(function(){n.animationCompleted(t)}))}},{key:"animateHeatColor",value:function(t,e,i,s){t.attr({fill:e}).animate(s).attr({fill:i})}}]),t}(),Pie=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w,this.chartType=this.w.config.chart.type,this.initialAnim=this.w.config.chart.animations.enabled,this.dynamicAnim=this.initialAnim&&this.w.config.chart.animations.dynamicAnimation.enabled,this.animBeginArr=[0],this.animDur=0,this.donutDataLabels=this.w.config.plotOptions.pie.donut.labels;var i=this.w;this.lineColorArr=void 0!==i.globals.stroke.colors?i.globals.stroke.colors:i.globals.colors,this.defaultSize=i.globals.svgHeight<i.globals.svgWidth?i.globals.gridHeight:i.globals.gridWidth,this.centerY=this.defaultSize/2,this.centerX=i.globals.gridWidth/2,this.fullAngle=360,i.globals.radialSize=this.defaultSize/2.05-i.config.stroke.width-i.config.chart.dropShadow.blur,void 0!==i.config.plotOptions.pie.size&&(i.globals.radialSize=i.config.plotOptions.pie.size),this.donutSize=i.globals.radialSize*parseInt(i.config.plotOptions.pie.donut.size,10)/100,this.sliceLabels=[],this.prevSectorAngleArr=[]}return _createClass(t,[{key:"draw",value:function(t){var e=this.w,i=new Graphics(this.ctx),s=i.group({class:"apexcharts-pie"});if(e.globals.noData)return s;for(var a=0,r=0;r<t.length;r++)a+=Utils.negToZero(t[r]);var n=[],o=i.group();0===a&&(a=1e-5);for(var l=0;l<t.length;l++){var h=this.fullAngle*Utils.negToZero(t[l])/a;n.push(h)}if(e.globals.dataChanged){for(var c,d=0,u=0;u<e.globals.previousPaths.length;u++)d+=Utils.negToZero(e.globals.previousPaths[u]);for(var g=0;g<e.globals.previousPaths.length;g++)c=this.fullAngle*Utils.negToZero(e.globals.previousPaths[g])/d,this.prevSectorAngleArr.push(c)}this.donutSize<0&&(this.donutSize=0);var f=e.config.plotOptions.pie.customScale,p=e.globals.gridWidth/2,x=e.globals.gridHeight/2,b=p-e.globals.gridWidth/2*f,m=x-e.globals.gridHeight/2*f;if("donut"===e.config.chart.type){var v=i.drawCircle(this.donutSize);v.attr({cx:this.centerX,cy:this.centerY,fill:e.config.plotOptions.pie.donut.background}),o.add(v)}var y=this.drawArcs(n,t);if(this.sliceLabels.forEach((function(t){y.add(t)})),o.attr({transform:"translate(".concat(b,", ").concat(m-5,") scale(").concat(f,")")}),s.attr({"data:innerTranslateX":b,"data:innerTranslateY":m-25}),o.add(y),s.add(o),this.donutDataLabels.show){var w=this.renderInnerDataLabels(this.donutDataLabels,{hollowSize:this.donutSize,centerX:this.centerX,centerY:this.centerY,opacity:this.donutDataLabels.show,translateX:b,translateY:m});s.add(w)}return s}},{key:"drawArcs",value:function(t,e){var i=this.w,s=new Filters(this.ctx),a=new Graphics(this.ctx),r=new Fill(this.ctx),n=a.group({class:"apexcharts-slices"}),o=0,l=0,h=0,c=0;this.strokeWidth=i.config.stroke.show?i.config.stroke.width:0;for(var d=0;d<t.length;d++){var u=a.group({class:"apexcharts-series apexcharts-pie-series",seriesName:Utils.escapeString(i.globals.seriesNames[d]),rel:d+1,"data:realIndex":d});n.add(u),l=c,h=(o=h)+t[d],c=l+this.prevSectorAngleArr[d];var g=h-o,f=r.fillPath({seriesNumber:d,size:i.globals.radialSize,value:e[d]}),p=this.getChangedPath(l,c),x=a.drawPath({d:p,stroke:this.lineColorArr instanceof Array?this.lineColorArr[d]:this.lineColorArr,strokeWidth:this.strokeWidth,fill:f,fillOpacity:i.config.fill.opacity,classes:"apexcharts-pie-area apexcharts-".concat(i.config.chart.type,"-slice-").concat(d)});if(x.attr({index:0,j:d}),i.config.chart.dropShadow.enabled){var b=i.config.chart.dropShadow;s.dropShadow(x,b,d)}this.addListeners(x,this.donutDataLabels),Graphics.setAttrs(x.node,{"data:angle":g,"data:startAngle":o,"data:strokeWidth":this.strokeWidth,"data:value":e[d]});var m={x:0,y:0};"pie"===i.config.chart.type?m=Utils.polarToCartesian(this.centerX,this.centerY,i.globals.radialSize/1.25+i.config.plotOptions.pie.dataLabels.offset,o+(h-o)/2):"donut"===i.config.chart.type&&(m=Utils.polarToCartesian(this.centerX,this.centerY,(i.globals.radialSize+this.donutSize)/2+i.config.plotOptions.pie.dataLabels.offset,o+(h-o)/2)),u.add(x);var v=0;if(!this.initialAnim||i.globals.resized||i.globals.dataChanged?this.animBeginArr.push(0):(v=(h-o)/this.fullAngle*i.config.chart.animations.speed,this.animDur=v+this.animDur,this.animBeginArr.push(this.animDur)),this.dynamicAnim&&i.globals.dataChanged?this.animatePaths(x,{size:i.globals.radialSize,endAngle:h,startAngle:o,prevStartAngle:l,prevEndAngle:c,animateStartingPos:!0,i:d,animBeginArr:this.animBeginArr,dur:i.config.chart.animations.dynamicAnimation.speed}):this.animatePaths(x,{size:i.globals.radialSize,endAngle:h,startAngle:o,i:d,totalItems:t.length-1,animBeginArr:this.animBeginArr,dur:v}),i.config.plotOptions.pie.expandOnClick&&x.click(this.pieClicked.bind(this,d)),i.config.dataLabels.enabled){var y=m.x,w=m.y,k=100*(h-o)/360+"%";if(0!==g&&i.config.plotOptions.pie.dataLabels.minAngleToShowLabel<t[d]){var A=i.config.dataLabels.formatter;void 0!==A&&(k=A(i.globals.seriesPercent[d][0],{seriesIndex:d,w:i}));var S=i.globals.dataLabels.style.colors[d],C=a.drawText({x:y,y:w,text:k,textAnchor:"middle",fontSize:i.config.dataLabels.style.fontSize,fontFamily:i.config.dataLabels.style.fontFamily,foreColor:S});if(i.config.dataLabels.dropShadow.enabled){var L=i.config.dataLabels.dropShadow;s.dropShadow(C,L)}C.node.classList.add("apexcharts-pie-label"),i.config.chart.animations.animate&&!1===i.globals.resized&&(C.node.classList.add("apexcharts-pie-label-delay"),C.node.style.animationDelay=i.config.chart.animations.speed/940+"s"),this.sliceLabels.push(C)}}}return n}},{key:"addListeners",value:function(t,e){var i=new Graphics(this.ctx);t.node.addEventListener("mouseenter",i.pathMouseEnter.bind(this,t)),t.node.addEventListener("mouseleave",i.pathMouseLeave.bind(this,t)),t.node.addEventListener("mouseleave",this.revertDataLabelsInner.bind(this,t.node,e)),t.node.addEventListener("mousedown",i.pathMouseDown.bind(this,t)),this.donutDataLabels.total.showAlways||(t.node.addEventListener("mouseenter",this.printDataLabelsInner.bind(this,t.node,e)),t.node.addEventListener("mousedown",this.printDataLabelsInner.bind(this,t.node,e)))}},{key:"animatePaths",value:function(t,e){var i=this.w,s=e.endAngle-e.startAngle,a=s,r=e.startAngle,n=e.startAngle;void 0!==e.prevStartAngle&&void 0!==e.prevEndAngle&&(r=e.prevEndAngle,a=e.prevEndAngle-e.prevStartAngle),e.i===i.config.series.length-1&&(s+n>this.fullAngle?e.endAngle=e.endAngle-(s+n):s+n<this.fullAngle&&(e.endAngle=e.endAngle+(this.fullAngle-(s+n)))),s===this.fullAngle&&(s=this.fullAngle-.01),this.animateArc(t,r,n,s,a,e)}},{key:"animateArc",value:function(t,e,i,s,a,r){var n,o=this,l=this.w,h=new Animations(this.ctx),c=r.size;(isNaN(e)||isNaN(a))&&(e=i,a=s,r.dur=0);var d=s,u=i,g=e-i;l.globals.dataChanged&&r.shouldSetPrevPaths&&(n=o.getPiePath({me:o,startAngle:u,angle:a,size:c}),t.attr({d:n})),0!==r.dur?t.animate(r.dur,l.globals.easing,r.animBeginArr[r.i]).afterAll((function(){"pie"!==l.config.chart.type&&"donut"!==l.config.chart.type||this.animate(300).attr({"stroke-width":l.config.stroke.width}),r.i===l.config.series.length-1&&h.animationCompleted(t)})).during((function(l){d=g+(s-g)*l,r.animateStartingPos&&(d=a+(s-a)*l,u=e-a+(i-(e-a))*l),n=o.getPiePath({me:o,startAngle:u,angle:d,size:c}),t.node.setAttribute("data:pathOrig",n),t.attr({d:n})})):(n=o.getPiePath({me:o,startAngle:u,angle:s,size:c}),r.isTrack||(l.globals.animationEnded=!0),t.node.setAttribute("data:pathOrig",n),t.attr({d:n}))}},{key:"pieClicked",value:function(t){var e,i=this.w,s=this.w.globals.radialSize+(i.config.plotOptions.pie.expandOnClick?4:0),a=i.globals.dom.Paper.select(".apexcharts-".concat(i.config.chart.type.toLowerCase(),"-slice-").concat(t)).members[0],r=a.attr("d");if("true"!==a.attr("data:pieClicked")){var n=i.globals.dom.baseEl.querySelectorAll(".apexcharts-pie-area");Array.prototype.forEach.call(n,(function(t){t.setAttribute("data:pieClicked","false");var e=t.getAttribute("data:pathOrig");t.setAttribute("d",e)})),a.attr("data:pieClicked","true");var o=parseInt(a.attr("data:startAngle"),10),l=parseInt(a.attr("data:angle"),10);e=this.getPiePath({me:this,startAngle:o,angle:l,size:s}),360!==l&&a.plot(e).animate(1).plot(r).animate(100).plot(e)}else{a.attr({"data:pieClicked":"false"}),this.revertDataLabelsInner(a.node,this.donutDataLabels);var h=a.attr("data:pathOrig");a.attr({d:h})}}},{key:"getChangedPath",value:function(t,e){var i="";return this.dynamicAnim&&this.w.globals.dataChanged&&(i=this.getPiePath({me:this,startAngle:t,angle:e-t,size:this.size})),i}},{key:"getPiePath",value:function(t){var e=t.me,i=t.startAngle,s=t.angle,a=t.size,r=this.w,n=i,o=Math.PI*(n-90)/180,l=s+i;Math.ceil(l)>=360&&(l=359.99);var h=Math.PI*(l-90)/180,c=e.centerX+a*Math.cos(o),d=e.centerY+a*Math.sin(o),u=e.centerX+a*Math.cos(h),g=e.centerY+a*Math.sin(h),f=Utils.polarToCartesian(e.centerX,e.centerY,e.donutSize,l),p=Utils.polarToCartesian(e.centerX,e.centerY,e.donutSize,n),x=s>180?1:0,b=["M",c,d,"A",a,a,0,x,1,u,g];return"donut"===r.config.chart.type?[].concat(b,["L",f.x,f.y,"A",e.donutSize,e.donutSize,0,x,0,p.x,p.y,"L",c,d,"z"]).join(" "):"pie"===r.config.chart.type?[].concat(b,["L",e.centerX,e.centerY,"L",c,d]).join(" "):[].concat(b).join(" ")}},{key:"renderInnerDataLabels",value:function(t,e){var i=this.w,s=new Graphics(this.ctx),a=s.group({class:"apexcharts-datalabels-group",transform:"translate(".concat(e.translateX?e.translateX:0,", ").concat(e.translateY?e.translateY:0,") scale(").concat(i.config.plotOptions.pie.customScale,")")}),r=t.total.show;a.node.style.opacity=e.opacity;var n,o,l=e.centerX,h=e.centerY;n=void 0===t.name.color?i.globals.colors[0]:t.name.color,o=void 0===t.value.color?i.config.chart.foreColor:t.value.color;var c=t.value.formatter,d="",u="";if(r?(n=t.total.color,u=t.total.label,d=t.total.formatter(i)):1===i.globals.series.length&&(d=c(i.globals.series[0],i),u=i.globals.seriesNames[0]),t.name.show){var g=s.drawText({x:l,y:h+parseFloat(t.name.offsetY),text:u,textAnchor:"middle",foreColor:n,fontSize:t.name.fontSize,fontFamily:t.name.fontFamily});g.node.classList.add("apexcharts-datalabel-label"),a.add(g)}if(t.value.show){var f=t.name.show?parseFloat(t.value.offsetY)+16:t.value.offsetY,p=s.drawText({x:l,y:h+f,text:d,textAnchor:"middle",foreColor:o,fontSize:t.value.fontSize,fontFamily:t.value.fontFamily});p.node.classList.add("apexcharts-datalabel-value"),a.add(p)}return a}},{key:"printInnerLabels",value:function(t,e,i,s){var a,r=this.w;s?a=void 0===t.name.color?r.globals.colors[parseInt(s.parentNode.getAttribute("rel"),10)-1]:t.name.color:r.globals.series.length>1&&t.total.show&&(a=t.total.color);var n=r.globals.dom.baseEl.querySelector(".apexcharts-datalabel-label"),o=r.globals.dom.baseEl.querySelector(".apexcharts-datalabel-value");i=(0,t.value.formatter)(i,r),s||"function"!=typeof t.total.formatter||(i=t.total.formatter(r)),null!==n&&(n.textContent=e),null!==o&&(o.textContent=i),null!==n&&(n.style.fill=a)}},{key:"printDataLabelsInner",value:function(t,e){var i=this.w,s=t.getAttribute("data:value"),a=i.globals.seriesNames[parseInt(t.parentNode.getAttribute("rel"),10)-1];i.globals.series.length>1&&this.printInnerLabels(e,a,s,t);var r=i.globals.dom.baseEl.querySelector(".apexcharts-datalabels-group");null!==r&&(r.style.opacity=1)}},{key:"revertDataLabelsInner",value:function(e,i,s){var a=this,r=this.w,n=r.globals.dom.baseEl.querySelector(".apexcharts-datalabels-group");if(i.total.show&&r.globals.series.length>1){new t(this.ctx).printInnerLabels(i,i.total.label,i.total.formatter(r))}else{var o=document.querySelectorAll(".apexcharts-pie-area"),l=!1;if(Array.prototype.forEach.call(o,(function(t){"true"===t.getAttribute("data:pieClicked")&&(l=!0,a.printDataLabelsInner(t,i))})),!l)if(r.globals.selectedDataPoints.length&&r.globals.series.length>1)if(r.globals.selectedDataPoints[0].length>0){var h=r.globals.selectedDataPoints[0],c=r.globals.dom.baseEl.querySelector(".apexcharts-".concat(r.config.chart.type.toLowerCase(),"-slice-").concat(h));this.printDataLabelsInner(c,i)}else n&&r.globals.selectedDataPoints.length&&0===r.globals.selectedDataPoints[0].length&&(n.style.opacity=0);else n&&r.globals.series.length>1&&(n.style.opacity=0)}}}]),t}(),Radar=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w,this.chartType=this.w.config.chart.type,this.initialAnim=this.w.config.chart.animations.enabled,this.dynamicAnim=this.initialAnim&&this.w.config.chart.animations.dynamicAnimation.enabled,this.animDur=0;var i=this.w;this.graphics=new Graphics(this.ctx),this.lineColorArr=void 0!==i.globals.stroke.colors?i.globals.stroke.colors:i.globals.colors,this.defaultSize=i.globals.svgHeight<i.globals.svgWidth?i.globals.gridHeight+1.5*i.globals.goldenPadding:i.globals.gridWidth,this.maxValue=this.w.globals.maxY,this.polygons=i.config.plotOptions.radar.polygons,this.maxLabelWidth=20;var s=i.globals.labels.slice().sort((function(t,e){return e.length-t.length}))[0],a=this.graphics.getTextRects(s,i.config.dataLabels.style.fontSize);this.size=this.defaultSize/2.1-i.config.stroke.width-i.config.chart.dropShadow.blur-a.width/1.75,void 0!==i.config.plotOptions.radar.size&&(this.size=i.config.plotOptions.radar.size),this.dataRadiusOfPercent=[],this.dataRadius=[],this.angleArr=[],this.yaxisLabelsTextsPos=[]}return _createClass(t,[{key:"draw",value:function(t){var e=this,i=this.w,s=new Fill(this.ctx),a=[];t.length&&(this.dataPointsLen=t[i.globals.maxValsInArrayIndex].length),this.disAngle=2*Math.PI/this.dataPointsLen;var r=i.globals.gridWidth/2,n=i.globals.gridHeight/2,o=this.graphics.group({class:"apexcharts-radar-series","data:innerTranslateX":r,"data:innerTranslateY":n-25,transform:"translate(".concat(r||0,", ").concat(n||0,")")}),l=[],h=null;if(this.yaxisLabels=this.graphics.group({class:"apexcharts-yaxis"}),t.forEach((function(t,r){var n=e.graphics.group().attr({class:"apexcharts-series",seriesName:Utils.escapeString(i.globals.seriesNames[r]),rel:r+1,"data:realIndex":r});e.dataRadiusOfPercent[r]=[],e.dataRadius[r]=[],e.angleArr[r]=[],t.forEach((function(t,i){e.dataRadiusOfPercent[r][i]=t/e.maxValue,e.dataRadius[r][i]=e.dataRadiusOfPercent[r][i]*e.size,e.angleArr[r][i]=i*e.disAngle})),l=e.getDataPointsPos(e.dataRadius[r],e.angleArr[r]);var o=e.createPaths(l,{x:0,y:0});h=e.graphics.group({class:"apexcharts-series-markers-wrap hidden"}),i.globals.delayedElements.push({el:h.node,index:r});var c={i:r,realIndex:r,animationDelay:r,initialSpeed:i.config.chart.animations.speed,dataChangeSpeed:i.config.chart.animations.dynamicAnimation.speed,className:"apexcharts-radar",shouldClipToGrid:!1,bindEventsOnPaths:!1,stroke:i.globals.stroke.colors[r],strokeLineCap:i.config.stroke.lineCap},d=null;i.globals.previousPaths.length>0&&(d=e.getPreviousPath(r));for(var u=0;u<o.linePathsTo.length;u++){var g=e.graphics.renderPaths(_objectSpread2({},c,{pathFrom:null===d?o.linePathsFrom[u]:d,pathTo:o.linePathsTo[u],strokeWidth:Array.isArray(i.config.stroke.width)?i.config.stroke.width[r]:i.config.stroke.width,fill:"none",drawShadow:!1}));n.add(g);var f=s.fillPath({seriesNumber:r}),p=e.graphics.renderPaths(_objectSpread2({},c,{pathFrom:null===d?o.areaPathsFrom[u]:d,pathTo:o.areaPathsTo[u],strokeWidth:0,fill:f,drawShadow:!1}));if(i.config.chart.dropShadow.enabled){var x=new Filters(e.ctx),b=i.config.chart.dropShadow;x.dropShadow(p,Object.assign({},b,{noUserSpaceOnUse:!0}),r)}n.add(p)}t.forEach((function(t,i){var s=new Markers(e.ctx).getMarkerConfig("apexcharts-marker",r,i),a=e.graphics.drawMarker(l[i].x,l[i].y,s);a.attr("rel",i),a.attr("j",i),a.attr("index",r),a.node.setAttribute("default-marker-size",s.pSize);var o=e.graphics.group({class:"apexcharts-series-markers"});o&&o.add(a),h.add(o),n.add(h)})),a.push(n)})),this.drawPolygons({parent:o}),i.config.dataLabels.enabled){var c=this.drawLabels();o.add(c)}return o.add(this.yaxisLabels),a.forEach((function(t){o.add(t)})),o}},{key:"drawPolygons",value:function(t){for(var e=this,i=this.w,s=t.parent,a=i.globals.yAxisScale[0].result.reverse(),r=a.length,n=[],o=this.size/(r-1),l=0;l<r;l++)n[l]=o*l;n.reverse();var h=[],c=[];n.forEach((function(t,i){var s=e.getPolygonPos(t),a="";s.forEach((function(t,s){if(0===i){var r=e.graphics.drawLine(t.x,t.y,0,0,Array.isArray(e.polygons.connectorColors)?e.polygons.connectorColors[s]:e.polygons.connectorColors);c.push(r)}0===s&&e.yaxisLabelsTextsPos.push({x:t.x,y:t.y}),a+=t.x+","+t.y+" "})),h.push(a)})),h.forEach((function(t,a){var r=e.polygons.strokeColors,n=e.graphics.drawPolygon(t,Array.isArray(r)?r[a]:r,i.globals.radarPolygons.fill.colors[a]);s.add(n)})),c.forEach((function(t){s.add(t)})),i.config.yaxis[0].show&&this.yaxisLabelsTextsPos.forEach((function(t,i){var s=e.drawYAxisText(t.x,t.y,i,a[i]);e.yaxisLabels.add(s)}))}},{key:"drawYAxisText",value:function(t,e,i,s){var a=this.w,r=a.config.yaxis[0],n=a.globals.yLabelFormatters[0];return this.graphics.drawText({x:t+r.labels.offsetX,y:e+r.labels.offsetY,text:n(s,i),textAnchor:"middle",fontSize:r.labels.style.fontSize,fontFamily:r.labels.style.fontFamily,foreColor:r.labels.style.color})}},{key:"drawLabels",value:function(){var t=this,e=this.w,i="middle",s=e.config.dataLabels,a=this.graphics.group({class:"apexcharts-datalabels"}),r=this.getPolygonPos(this.size),n=0,o=0;return e.globals.labels.forEach((function(l,h){var c=s.formatter,d=new DataLabels(t.ctx);if(r[h]){n=r[h].x,o=r[h].y,Math.abs(r[h].x)>=10?r[h].x>0?(i="start",n+=10):r[h].x<0&&(i="end",n-=10):i="middle",Math.abs(r[h].y)>=t.size-10&&(r[h].y<0?o-=10:r[h].y>0&&(o+=10));var u=c(l,{seriesIndex:-1,dataPointIndex:h,w:e});d.plotDataLabelsText({x:n,y:o,text:u,textAnchor:i,i:h,j:h,parent:a,dataLabelsConfig:s,offsetCorrection:!1})}})),a}},{key:"createPaths",value:function(t,e){var i=this,s=[],a=[],r=[],n=[];if(t.length){a=[this.graphics.move(e.x,e.y)],n=[this.graphics.move(e.x,e.y)];var o=this.graphics.move(t[0].x,t[0].y),l=this.graphics.move(t[0].x,t[0].y);t.forEach((function(e,s){o+=i.graphics.line(e.x,e.y),l+=i.graphics.line(e.x,e.y),s===t.length-1&&(o+="Z",l+="Z")})),s.push(o),r.push(l)}return{linePathsFrom:a,linePathsTo:s,areaPathsFrom:n,areaPathsTo:r}}},{key:"getPreviousPath",value:function(t){for(var e=this.w,i=null,s=0;s<e.globals.previousPaths.length;s++){var a=e.globals.previousPaths[s];a.paths.length>0&&parseInt(a.realIndex,10)===parseInt(t,10)&&void 0!==e.globals.previousPaths[s].paths[0]&&(i=e.globals.previousPaths[s].paths[0].d)}return i}},{key:"getDataPointsPos",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.dataPointsLen;t=t||[],e=e||[];for(var s=[],a=0;a<i;a++){var r={};r.x=t[a]*Math.sin(e[a]),r.y=-t[a]*Math.cos(e[a]),s.push(r)}return s}},{key:"getPolygonPos",value:function(t){for(var e=[],i=2*Math.PI/this.dataPointsLen,s=0;s<this.dataPointsLen;s++){var a={};a.x=t*Math.sin(s*i),a.y=-t*Math.cos(s*i),e.push(a)}return e}}]),t}(),Radial=function(t){function e(t){var i;_classCallCheck(this,e),(i=_possibleConstructorReturn(this,_getPrototypeOf(e).call(this,t))).ctx=t,i.w=t.w,i.animBeginArr=[0],i.animDur=0;var s=i.w;return i.startAngle=s.config.plotOptions.radialBar.startAngle,i.endAngle=s.config.plotOptions.radialBar.endAngle,i.totalAngle=Math.abs(s.config.plotOptions.radialBar.endAngle-s.config.plotOptions.radialBar.startAngle),i.trackStartAngle=s.config.plotOptions.radialBar.track.startAngle,i.trackEndAngle=s.config.plotOptions.radialBar.track.endAngle,i.radialDataLabels=s.config.plotOptions.radialBar.dataLabels,i.trackStartAngle||(i.trackStartAngle=i.startAngle),i.trackEndAngle||(i.trackEndAngle=i.endAngle),360===i.endAngle&&(i.endAngle=359.99),i.fullAngle=360-s.config.plotOptions.radialBar.endAngle-s.config.plotOptions.radialBar.startAngle,i.margin=parseInt(s.config.plotOptions.radialBar.track.margin,10),i}return _inherits(e,Pie),_createClass(e,[{key:"draw",value:function(t){var e=this.w,i=new Graphics(this.ctx),s=i.group({class:"apexcharts-radialbar"});if(e.globals.noData)return s;var a=i.group(),r=this.defaultSize/2,n=e.globals.gridWidth/2,o=this.defaultSize/2.05-e.config.stroke.width-e.config.chart.dropShadow.blur;void 0!==e.config.plotOptions.radialBar.size&&(o=e.config.plotOptions.radialBar.size);var l=e.globals.fill.colors;if(e.config.plotOptions.radialBar.track.show){var h=this.drawTracks({size:o,centerX:n,centerY:r,colorArr:l,series:t});a.add(h)}var c=this.drawArcs({size:o,centerX:n,centerY:r,colorArr:l,series:t}),d=360;e.config.plotOptions.radialBar.startAngle<0&&(d=this.totalAngle);var u=(360-d)/360;if(e.globals.radialSize=o-o*u,this.radialDataLabels.value.show){var g=Math.max(this.radialDataLabels.value.offsetY,this.radialDataLabels.name.offsetY);e.globals.radialSize+=g*u}return a.add(c.g),"front"===e.config.plotOptions.radialBar.hollow.position&&(c.g.add(c.elHollow),c.dataLabels&&c.g.add(c.dataLabels)),s.add(a),s}},{key:"drawTracks",value:function(t){var e=this.w,i=new Graphics(this.ctx),s=i.group({class:"apexcharts-tracks"}),a=new Filters(this.ctx),r=new Fill(this.ctx),n=this.getStrokeWidth(t);t.size=t.size-n/2;for(var o=0;o<t.series.length;o++){var l=i.group({class:"apexcharts-radialbar-track apexcharts-track"});s.add(l),l.attr({rel:o+1}),t.size=t.size-n-this.margin;var h=e.config.plotOptions.radialBar.track,c=r.fillPath({seriesNumber:0,size:t.size,fillColors:Array.isArray(h.background)?h.background[o]:h.background,solid:!0}),d=this.trackStartAngle,u=this.trackEndAngle;Math.abs(u)+Math.abs(d)>=360&&(u=360-Math.abs(this.startAngle)-.1);var g=i.drawPath({d:"",stroke:c,strokeWidth:n*parseInt(h.strokeWidth,10)/100,fill:"none",strokeOpacity:h.opacity,classes:"apexcharts-radialbar-area"});if(h.dropShadow.enabled){var f=h.dropShadow;a.dropShadow(g,f)}l.add(g),g.attr("id","apexcharts-radialbarTrack-"+o),this.animatePaths(g,{centerX:t.centerX,centerY:t.centerY,endAngle:u,startAngle:d,size:t.size,i:o,totalItems:2,animBeginArr:0,dur:0,isTrack:!0,easing:e.globals.easing})}return s}},{key:"drawArcs",value:function(t){var e=this.w,i=new Graphics(this.ctx),s=new Fill(this.ctx),a=new Filters(this.ctx),r=i.group(),n=this.getStrokeWidth(t);t.size=t.size-n/2;var o=e.config.plotOptions.radialBar.hollow.background,l=t.size-n*t.series.length-this.margin*t.series.length-n*parseInt(e.config.plotOptions.radialBar.track.strokeWidth,10)/100/2,h=l-e.config.plotOptions.radialBar.hollow.margin;void 0!==e.config.plotOptions.radialBar.hollow.image&&(o=this.drawHollowImage(t,r,l,o));var c=this.drawHollow({size:h,centerX:t.centerX,centerY:t.centerY,fill:o});if(e.config.plotOptions.radialBar.hollow.dropShadow.enabled){var d=e.config.plotOptions.radialBar.hollow.dropShadow;a.dropShadow(c,d)}var u=1;!this.radialDataLabels.total.show&&e.globals.series.length>1&&(u=0);var g=null;this.radialDataLabels.show&&(g=this.renderInnerDataLabels(this.radialDataLabels,{hollowSize:l,centerX:t.centerX,centerY:t.centerY,opacity:u})),"back"===e.config.plotOptions.radialBar.hollow.position&&(r.add(c),g&&r.add(g));var f=!1;e.config.plotOptions.radialBar.inverseOrder&&(f=!0);for(var p=f?t.series.length-1:0;f?p>=0:p<t.series.length;f?p--:p++){var x=i.group({class:"apexcharts-series apexcharts-radial-series",seriesName:Utils.escapeString(e.globals.seriesNames[p])});r.add(x),x.attr({rel:p+1,"data:realIndex":p}),this.ctx.series.addCollapsedClassToSeries(x,p),t.size=t.size-n-this.margin;var b=s.fillPath({seriesNumber:p,size:t.size,value:t.series[p]}),m=this.startAngle,v=void 0,y=Utils.negToZero(t.series[p]>100?100:t.series[p])/100,w=Math.round(this.totalAngle*y)+this.startAngle,k=void 0;e.globals.dataChanged&&(v=this.startAngle,k=Math.round(this.totalAngle*Utils.negToZero(e.globals.previousPaths[p])/100)+v),Math.abs(w)+Math.abs(m)>=360&&(w-=.01),Math.abs(k)+Math.abs(v)>=360&&(k-=.01);var A=w-m,S=Array.isArray(e.config.stroke.dashArray)?e.config.stroke.dashArray[p]:e.config.stroke.dashArray,C=i.drawPath({d:"",stroke:b,strokeWidth:n,fill:"none",fillOpacity:e.config.fill.opacity,classes:"apexcharts-radialbar-area apexcharts-radialbar-slice-"+p,strokeDashArray:S});if(Graphics.setAttrs(C.node,{"data:angle":A,"data:value":t.series[p]}),e.config.chart.dropShadow.enabled){var L=e.config.chart.dropShadow;a.dropShadow(C,L,p)}this.addListeners(C,this.radialDataLabels),x.add(C),C.attr({index:0,j:p});var P=0;!this.initialAnim||e.globals.resized||e.globals.dataChanged||(P=(w-m)/360*e.config.chart.animations.speed,this.animDur=P/(1.2*t.series.length)+this.animDur,this.animBeginArr.push(this.animDur)),e.globals.dataChanged&&(P=(w-m)/360*e.config.chart.animations.dynamicAnimation.speed,this.animDur=P/(1.2*t.series.length)+this.animDur,this.animBeginArr.push(this.animDur)),this.animatePaths(C,{centerX:t.centerX,centerY:t.centerY,endAngle:w,startAngle:m,prevEndAngle:k,prevStartAngle:v,size:t.size,i:p,totalItems:2,animBeginArr:this.animBeginArr,dur:P,shouldSetPrevPaths:!0,easing:e.globals.easing})}return{g:r,elHollow:c,dataLabels:g}}},{key:"drawHollow",value:function(t){var e=new Graphics(this.ctx).drawCircle(2*t.size);return e.attr({class:"apexcharts-radialbar-hollow",cx:t.centerX,cy:t.centerY,r:t.size,fill:t.fill}),e}},{key:"drawHollowImage",value:function(t,e,i,s){var a=this.w,r=new Fill(this.ctx),n=Utils.randomId(),o=a.config.plotOptions.radialBar.hollow.image;if(a.config.plotOptions.radialBar.hollow.imageClipped)r.clippedImgArea({width:i,height:i,image:o,patternID:"pattern".concat(a.globals.cuid).concat(n)}),s="url(#pattern".concat(a.globals.cuid).concat(n,")");else{var l=a.config.plotOptions.radialBar.hollow.imageWidth,h=a.config.plotOptions.radialBar.hollow.imageHeight;if(void 0===l&&void 0===h){var c=a.globals.dom.Paper.image(o).loaded((function(e){this.move(t.centerX-e.width/2+a.config.plotOptions.radialBar.hollow.imageOffsetX,t.centerY-e.height/2+a.config.plotOptions.radialBar.hollow.imageOffsetY)}));e.add(c)}else{var d=a.globals.dom.Paper.image(o).loaded((function(e){this.move(t.centerX-l/2+a.config.plotOptions.radialBar.hollow.imageOffsetX,t.centerY-h/2+a.config.plotOptions.radialBar.hollow.imageOffsetY),this.size(l,h)}));e.add(d)}}return s}},{key:"getStrokeWidth",value:function(t){var e=this.w;return t.size*(100-parseInt(e.config.plotOptions.radialBar.hollow.size,10))/100/(t.series.length+1)-this.margin}}]),e}(),RangeBar=function(t){function e(){return _classCallCheck(this,e),_possibleConstructorReturn(this,_getPrototypeOf(e).apply(this,arguments))}return _inherits(e,Bar),_createClass(e,[{key:"draw",value:function(t,e){var i=this.w,s=new Graphics(this.ctx);this.rangeBarOptions=this.w.config.plotOptions.rangeBar,this.series=t,this.seriesRangeStart=i.globals.seriesRangeStart,this.seriesRangeEnd=i.globals.seriesRangeEnd,this.barHelpers.initVariables(t);for(var a=s.group({class:"apexcharts-rangebar-series apexcharts-plot-series"}),r=0;r<t.length;r++){var n,o,l,h=void 0,c=void 0,d=void 0,u=i.globals.comboCharts?e[r]:r,g=s.group({class:"apexcharts-series",seriesName:Utils.escapeString(i.globals.seriesNames[u]),rel:r+1,"data:realIndex":u});t[r].length>0&&(this.visibleI=this.visibleI+1);var f=0,p=0;this.yRatio.length>1&&(this.yaxisIndex=u);var x=this.barHelpers.initialPositions();c=x.y,l=x.zeroW,h=x.x,p=x.barWidth,n=x.xDivision,o=x.zeroH;for(var b=s.group({class:"apexcharts-datalabels"}),m=0;m<i.globals.dataPoints;m++){var v=this.barHelpers.getStrokeWidth(r,m,u),y=this.seriesRangeStart[r][m],w=this.seriesRangeEnd[r][m],k=null,A=null,S={x:h,y:c,strokeWidth:v,elSeries:g};if(d=x.yDivision,f=x.barHeight,this.isHorizontal){A=c+f*this.visibleI;var C=(d-f*this.seriesLen)/2;if(void 0===i.config.series[r].data[m])break;if(this.isTimelineBar&&i.config.series[r].data[m].x){var L=this.detectOverlappingBars({i:r,j:m,barYPosition:A,srty:C,barHeight:f,yDivision:d,initPositions:x});f=L.barHeight,A=L.barYPosition}p=(k=this.drawRangeBarPaths(_objectSpread2({indexes:{i:r,j:m,realIndex:u},barHeight:f,barYPosition:A,zeroW:l,yDivision:d,y1:y,y2:w},S))).barWidth}else f=(k=this.drawRangeColumnPaths(_objectSpread2({indexes:{i:r,j:m,realIndex:u},zeroH:o,barWidth:p,xDivision:n},S))).barHeight;c=k.y,h=k.x;var P=this.barHelpers.getPathFillColor(t,r,m,u),T=i.globals.stroke.colors[u];this.renderSeries({realIndex:u,pathFill:P,lineFill:T,j:m,i:r,x:h,y:c,y1:y,y2:w,pathFrom:k.pathFrom,pathTo:k.pathTo,strokeWidth:v,elSeries:g,series:t,barHeight:f,barYPosition:A,barWidth:p,elDataLabelsWrap:b,visibleSeries:this.visibleI,type:"rangebar"})}a.add(g)}return a}},{key:"detectOverlappingBars",value:function(t){var e=t.i,i=t.j,s=t.barYPosition,a=t.srty,r=t.barHeight,n=t.yDivision,o=t.initPositions,l=this.w,h=[],c=l.config.series[e].data[i].rangeName,d=l.config.series[e].data[i].x,u=l.globals.labels.indexOf(d),g=l.globals.seriesRangeBarTimeline[e].findIndex((function(t){return t.x===d&&t.overlaps.length>0}));return s=a+r*this.visibleI+n*u,g>-1&&(h=l.globals.seriesRangeBarTimeline[e][g].overlaps).indexOf(c)>-1&&(s=(r=o.barHeight/h.length)*this.visibleI+n*(100-parseInt(this.barOptions.barHeight,10))/100/2+r*(this.visibleI+h.indexOf(c))+n*u),{barYPosition:s,barHeight:r}}},{key:"drawRangeColumnPaths",value:function(t){var e=t.indexes,i=t.x,s=t.strokeWidth,a=t.xDivision,r=t.barWidth,n=t.zeroH,o=this.w,l=new Graphics(this.ctx),h=e.i,c=e.j,d=this.yRatio[this.yaxisIndex],u=e.realIndex,g=this.getRangeValue(u,c),f=Math.min(g.start,g.end),p=Math.max(g.start,g.end);o.globals.isXNumeric&&(i=(o.globals.seriesX[h][c]-o.globals.minX)/this.xRatio-r/2);var x=i+r*this.visibleI;void 0===this.series[h][c]||null===this.series[h][c]?f=n:(f=n-f/d,p=n-p/d);var b=Math.abs(p-f),m=l.move(x,n),v=l.move(x,f);return o.globals.previousPaths.length>0&&(v=this.getPreviousPath(u,c,!0)),m=l.move(x,p)+l.line(x+r,p)+l.line(x+r,f)+l.line(x,f)+l.line(x,p-s/2),v=v+l.move(x,f)+l.line(x+r,f)+l.line(x+r,f)+l.line(x,f),o.globals.isXNumeric||(i+=a),{pathTo:m,pathFrom:v,barHeight:b,x:i,y:p,barXPosition:x}}},{key:"drawRangeBarPaths",value:function(t){var e=t.indexes,i=t.y,s=t.y1,a=t.y2,r=t.yDivision,n=t.barHeight,o=t.barYPosition,l=t.zeroW,h=this.w,c=new Graphics(this.ctx),d=l+s/this.invertedYRatio,u=l+a/this.invertedYRatio,g=c.move(l,o),f=c.move(d,o);h.globals.previousPaths.length>0&&(f=this.getPreviousPath(e.realIndex,e.j));var p=Math.abs(u-d);return g=c.move(d,o)+c.line(u,o)+c.line(u,o+n)+c.line(d,o+n)+c.line(d,o),f=f+c.line(d,o)+c.line(d,o+n)+c.line(d,o+n)+c.line(d,o),h.globals.isXNumeric||(i+=r),{pathTo:g,pathFrom:f,barWidth:p,x:u,y:i}}},{key:"getRangeValue",value:function(t,e){var i=this.w;return{start:i.globals.seriesRangeStart[t][e],end:i.globals.seriesRangeEnd[t][e]}}}]),e}(),Dimensions=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w,this.lgRect={},this.yAxisWidth=0,this.xAxisHeight=0,this.isSparkline=this.w.config.chart.sparkline.enabled,this.xPadRight=0,this.xPadLeft=0}return _createClass(t,[{key:"plotCoords",value:function(){var t=this.w,e=t.globals,i=this.getLegendsRect();e.axisCharts?this.setGridCoordsForAxisCharts(i):this.setGridCoordsForNonAxisCharts(i),this.titleSubtitleOffset(),e.gridHeight=e.gridHeight-t.config.grid.padding.top-t.config.grid.padding.bottom,e.gridWidth=e.gridWidth-t.config.grid.padding.left-t.config.grid.padding.right-this.xPadRight-this.xPadLeft,e.translateX=e.translateX+t.config.grid.padding.left+this.xPadLeft,e.translateY=e.translateY+t.config.grid.padding.top}},{key:"conditionalChecksForAxisCoords",value:function(t,e){var i=this.w;this.xAxisHeight=(t.height+e.height)*i.globals.LINE_HEIGHT_RATIO+15,this.xAxisWidth=t.width,this.xAxisHeight-e.height>i.config.xaxis.labels.maxHeight&&(this.xAxisHeight=i.config.xaxis.labels.maxHeight),i.config.xaxis.labels.minHeight&&this.xAxisHeight<i.config.xaxis.labels.minHeight&&(this.xAxisHeight=i.config.xaxis.labels.minHeight),i.config.xaxis.floating&&(this.xAxisHeight=0),i.globals.isBarHorizontal?this.yAxisWidth=i.globals.yLabelsCoords[0].width+i.globals.yTitleCoords[0].width+15:this.yAxisWidth=this.getTotalYAxisWidth();var s=0,a=0;i.config.yaxis.forEach((function(t){s+=t.labels.minWidth,a+=t.labels.maxWidth})),this.yAxisWidth<s&&(this.yAxisWidth=s),this.yAxisWidth>a&&(this.yAxisWidth=a)}},{key:"setGridCoordsForAxisCharts",value:function(t){var e=this.w,i=e.globals,s=this.getyAxisLabelsCoords(),a=this.getxAxisLabelsCoords(),r=this.getyAxisTitleCoords(),n=this.getxAxisTitleCoords();e.globals.yLabelsCoords=[],e.globals.yTitleCoords=[],e.config.yaxis.map((function(t,i){e.globals.yLabelsCoords.push({width:s[i].width,index:i}),e.globals.yTitleCoords.push({width:r[i].width,index:i})})),this.conditionalChecksForAxisCoords(a,n),i.translateXAxisY=e.globals.rotateXLabels?this.xAxisHeight/8:-4,i.translateXAxisX=e.globals.rotateXLabels&&e.globals.isXNumeric&&e.config.xaxis.labels.rotate<=-45?-this.xAxisWidth/4:0,e.globals.isBarHorizontal&&(i.rotateXLabels=!1,i.translateXAxisY=parseInt(e.config.xaxis.labels.style.fontSize,10)/1.5*-1),i.translateXAxisY=i.translateXAxisY+e.config.xaxis.labels.offsetY,i.translateXAxisX=i.translateXAxisX+e.config.xaxis.labels.offsetX;var o=this.yAxisWidth,l=this.xAxisHeight;i.xAxisLabelsHeight=this.xAxisHeight,i.xAxisHeight=this.xAxisHeight;var h=10;switch(e.config.grid.show&&"radar"!==e.config.chart.type||(o=0,l=i.goldenPadding),this.isSparkline&&(t={height:0,width:0},l=0,o=0,h=0),this.additionalPaddingXLabels(a),e.config.legend.position){case"bottom":i.translateY=h,i.translateX=o,i.gridHeight=i.svgHeight-t.height-l-(this.isSparkline?0:e.globals.rotateXLabels?10:15),i.gridWidth=i.svgWidth-o;break;case"top":i.translateY=t.height+h,i.translateX=o,i.gridHeight=i.svgHeight-t.height-l-(this.isSparkline?0:e.globals.rotateXLabels?10:15),i.gridWidth=i.svgWidth-o;break;case"left":i.translateY=h,i.translateX=t.width+o,i.gridHeight=i.svgHeight-l-12,i.gridWidth=i.svgWidth-t.width-o;break;case"right":i.translateY=h,i.translateX=o,i.gridHeight=i.svgHeight-l-12,i.gridWidth=i.svgWidth-t.width-o-5;break;default:throw new Error("Legend position not supported")}this.setGridXPosForDualYAxis(r,s),new YAxis(this.ctx).setYAxisXPosition(s,r)}},{key:"setGridCoordsForNonAxisCharts",value:function(t){var e=this.w,i=e.globals,s=e.config,a=0;e.config.legend.show&&!e.config.legend.floating&&(a=20);var r=10,n=0;if("pie"===s.chart.type||"donut"===s.chart.type?(r+=s.plotOptions.pie.offsetY,n+=s.plotOptions.pie.offsetX):"radialBar"===s.chart.type&&(r+=s.plotOptions.radialBar.offsetY,n+=s.plotOptions.radialBar.offsetX),!s.legend.show||s.legend.floating)return i.gridHeight=i.svgHeight-i.goldenPadding,i.gridWidth=i.gridHeight,i.translateY=r-10,void(i.translateX=n+(i.svgWidth-i.gridWidth)/2);switch(s.legend.position){case"bottom":i.gridHeight=i.svgHeight-t.height-i.goldenPadding,i.gridWidth=i.gridHeight,i.translateY=r-20,i.translateX=n+(i.svgWidth-i.gridWidth)/2;break;case"top":i.gridHeight=i.svgHeight-t.height-i.goldenPadding,i.gridWidth=i.gridHeight,i.translateY=t.height+r+10,i.translateX=n+(i.svgWidth-i.gridWidth)/2;break;case"left":i.gridWidth=i.svgWidth-t.width-a,i.gridHeight="auto"!==s.chart.height?i.svgHeight:i.gridWidth,i.translateY=r,i.translateX=n+t.width+a;break;case"right":i.gridWidth=i.svgWidth-t.width-a-5,i.gridHeight="auto"!==s.chart.height?i.svgHeight:i.gridWidth,i.translateY=r,i.translateX=n+10;break;default:throw new Error("Legend position not supported")}}},{key:"setGridXPosForDualYAxis",value:function(t,e){var i=this.w;i.config.yaxis.map((function(s,a){-1===i.globals.ignoreYAxisIndexes.indexOf(a)&&!i.config.yaxis[a].floating&&i.config.yaxis[a].show&&s.opposite&&(i.globals.translateX=i.globals.translateX-(e[a].width+t[a].width)-parseInt(i.config.yaxis[a].labels.style.fontSize,10)/1.2-12)}))}},{key:"additionalPaddingXLabels",value:function(t){var e=this,i=this.w,s=i.config.xaxis.type,a=i.globals.isXNumeric,r=function(t){return-1!==i.globals.collapsedSeriesIndices.indexOf(t)},n=function(n,o,l){var h;o&&a&&((a&&i.globals.isMultipleYAxis&&r(l)||i.globals.isBarHorizontal&&n.opposite)&&(h=t,i.config.grid.padding.left<h.width&&(e.xPadLeft=h.width/2+1)),(!i.globals.isBarHorizontal&&n.opposite&&r(l)||a&&!i.globals.isMultipleYAxis)&&function(t){e.timescaleLabels?e.timescaleLabels[e.timescaleLabels.length-1].position+t.width>i.globals.gridWidth?i.globals.skipLastTimelinelabel=!0:i.globals.skipLastTimelinelabel=!1:"datetime"===s?i.config.grid.padding.right<t.width&&(i.globals.skipLastTimelinelabel=!0):"datetime"!==s&&i.config.grid.padding.right<t.width&&(e.xPadRight=t.width/2+1)}(t))};("category"!==s||i.globals.isBarHorizontal)&&i.config.yaxis.forEach((function(t,e){var s=!t.show||t.floating,a=t.opposite&&i.globals.isBarHorizontal,o=s||r(e)||a;n(t,o,e)})),i.globals.isBarHorizontal&&(this.xPadRight=t.width/2+1)}},{key:"titleSubtitleOffset",value:function(){var t=this.w,e=t.globals,i=this.isSparkline||!t.globals.axisCharts?0:10;void 0!==t.config.title.text?i+=t.config.title.margin:i+=this.isSparkline||!t.globals.axisCharts?0:5,void 0!==t.config.subtitle.text?i+=t.config.subtitle.margin:i+=this.isSparkline||!t.globals.axisCharts?0:5;var s=t.config.series.length>1||!t.globals.axisCharts||t.config.legend.showForSingleSeries;t.config.legend.show&&"bottom"===t.config.legend.position&&!t.config.legend.floating&&s&&(i+=10);var a=this.getTitleSubtitleCoords("title"),r=this.getTitleSubtitleCoords("subtitle");e.gridHeight=e.gridHeight-a.height-r.height-i,e.translateY=e.translateY+a.height+r.height+i}},{key:"getTotalYAxisWidth",value:function(){var t=this.w,e=0,i=t.globals.yAxisScale.length>1?10:0,s=function(s,a){var r=t.config.yaxis[a].floating;s.width>0&&!r?(e=e+s.width+i,function(e){return t.globals.ignoreYAxisIndexes.indexOf(e)>-1}(a)&&(e=e-s.width-i)):e+=r||!t.config.yaxis[a].show?0:5};return t.globals.yLabelsCoords.map((function(t,e){s(t,e)})),t.globals.yTitleCoords.map((function(t,e){s(t,e)})),e}},{key:"getxAxisTimeScaleLabelsCoords",value:function(){var t,e=this.w;this.timescaleLabels=e.globals.timelineLabels.slice(),e.globals.invertedTimelineLabels.length&&(this.timescaleLabels=e.globals.invertedTimelineLabels.slice());var i=this.timescaleLabels.map((function(t){return t.value})),s=i.reduce((function(t,e){return void 0===t?(console.error("You have possibly supplied invalid Date format. Please supply a valid JavaScript Date"),0):t.length>e.length?t:e}),0);return 1.05*(t=new Graphics(this.ctx).getTextRects(s,e.config.xaxis.labels.style.fontSize)).width*i.length>e.globals.gridWidth&&0!==e.config.xaxis.labels.rotate&&(e.globals.overlappingXLabels=!0),t}},{key:"getxAxisLabelsCoords",value:function(){var t,e=this.w,i=e.globals.labels.slice();if(e.globals.timelineLabels.length>0){var s=this.getxAxisTimeScaleLabelsCoords();t={width:s.width,height:s.height}}else{var a="left"!==e.config.legend.position||"right"!==e.config.legend.position||e.config.legend.floating?0:this.lgRect.width,r=e.globals.xLabelFormatter,n=i.reduce((function(t,e){return t.length>e.length?t:e}),0);e.globals.isBarHorizontal&&(n=e.globals.yAxisScale[0].result.reduce((function(t,e){return t.length>e.length?t:e}),0));var o=n;n=new Formatters(this.ctx).xLabelFormat(r,n,o);var l=new Graphics(this.ctx),h=l.getTextRects(n,e.config.xaxis.labels.style.fontSize);(t={width:h.width,height:h.height}).width*i.length>e.globals.svgWidth-a-this.yAxisWidth&&0!==e.config.xaxis.labels.rotate?e.globals.isBarHorizontal||(e.globals.rotateXLabels=!0,h=l.getTextRects(n,e.config.xaxis.labels.style.fontSize,e.config.xaxis.labels.style.fontFamily,"rotate(".concat(e.config.xaxis.labels.rotate," 0 0)"),!1),t.height=h.height/1.66):e.globals.rotateXLabels=!1}return e.config.xaxis.labels.show||(t={width:0,height:0}),{width:t.width,height:t.height}}},{key:"getyAxisLabelsCoords",value:function(){var t=this,e=this.w,i=[],s=10;return e.config.yaxis.map((function(a,r){if(a.show&&a.labels.show&&e.globals.yAxisScale[r].result.length){var n=e.globals.yLabelFormatters[r],o=n(e.globals.yAxisScale[r].niceMax,{seriesIndex:r,dataPointIndex:-1,w:e});if(void 0!==o&&0!==o.length||(o=e.globals.yAxisScale[r].niceMax),e.globals.isBarHorizontal)s=0,o=n(o=e.globals.labels.slice().reduce((function(t,e){return t.length>e.length?t:e}),0),{seriesIndex:r,dataPointIndex:-1,w:e});var l=new Graphics(t.ctx).getTextRects(o,a.labels.style.fontSize);i.push({width:l.width+s,height:l.height})}else i.push({width:0,height:0})})),i}},{key:"getxAxisTitleCoords",value:function(){var t=this.w,e=0,i=0;if(void 0!==t.config.xaxis.title.text){var s=new Graphics(this.ctx).getTextRects(t.config.xaxis.title.text,t.config.xaxis.title.style.fontSize);e=s.width,i=s.height}return{width:e,height:i}}},{key:"getyAxisTitleCoords",value:function(){var t=this,e=this.w,i=[];return e.config.yaxis.map((function(e,s){if(e.show&&void 0!==e.title.text){var a=new Graphics(t.ctx).getTextRects(e.title.text,e.title.style.fontSize,e.title.style.fontFamily,"rotate(-90 0 0)",!1);i.push({width:a.width,height:a.height})}else i.push({width:0,height:0})})),i}},{key:"getTitleSubtitleCoords",value:function(t){var e=this.w,i=0,s=0,a="title"===t?e.config.title.floating:e.config.subtitle.floating,r=e.globals.dom.baseEl.querySelector(".apexcharts-".concat(t,"-text"));if(null!==r&&!a){var n=r.getBoundingClientRect();i=n.width,s=e.globals.axisCharts?n.height+5:n.height}return{width:i,height:s}}},{key:"getLegendsRect",value:function(){var t=this.w,e=t.globals.dom.baseEl.querySelector(".apexcharts-legend"),i=Object.assign({},Utils.getBoundingClientRect(e));return null!==e&&!t.config.legend.floating&&t.config.legend.show?this.lgRect={x:i.x,y:i.y,height:i.height,width:0===i.height?0:i.width}:this.lgRect={x:0,y:0,height:0,width:0},this.lgRect}}]),t}(),Series=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w}return _createClass(t,[{key:"getAllSeriesEls",value:function(){return this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-series")}},{key:"getSeriesByName",value:function(t){return this.w.globals.dom.baseEl.querySelector("[seriesName='".concat(Utils.escapeString(t),"']"))}},{key:"isSeriesHidden",value:function(t){var e=this.getSeriesByName(t),i=parseInt(e.getAttribute("data:realIndex"),10);return{isHidden:e.classList.contains("apexcharts-series-collapsed"),realIndex:i}}},{key:"addCollapsedClassToSeries",value:function(t,e){var i=this.w;function s(i){for(var s=0;s<i.length;s++)i[s].index===e&&t.node.classList.add("apexcharts-series-collapsed")}s(i.globals.collapsedSeries),s(i.globals.ancillaryCollapsedSeries)}},{key:"resetSeries",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=this.w,i=e.globals.initialSeries.slice();e.config.series=i,e.globals.collapsedSeries=[],e.globals.ancillaryCollapsedSeries=[],e.globals.collapsedSeriesIndices=[],e.globals.ancillaryCollapsedSeriesIndices=[],e.globals.previousPaths=[],t&&this.ctx._updateSeries(i,e.config.chart.animations.dynamicAnimation.enabled)}},{key:"toggleSeriesOnHover",value:function(t,e){var i=this.w,s=i.globals.dom.baseEl.querySelectorAll(".apexcharts-series");if("mousemove"===t.type){var a=parseInt(e.getAttribute("rel"),10)-1,r=null;r=i.globals.axisCharts||"radialBar"===i.config.chart.type?i.globals.axisCharts?i.globals.dom.baseEl.querySelector(".apexcharts-series[data\\:realIndex='".concat(a,"']")):i.globals.dom.baseEl.querySelector(".apexcharts-series[rel='".concat(a+1,"']")):i.globals.dom.baseEl.querySelector(".apexcharts-series[rel='".concat(a+1,"'] path"));for(var n=0;n<s.length;n++)s[n].classList.add("legend-mouseover-inactive");null!==r&&(i.globals.axisCharts||r.parentNode.classList.remove("legend-mouseover-inactive"),r.classList.remove("legend-mouseover-inactive"))}else if("mouseout"===t.type)for(var o=0;o<s.length;o++)s[o].classList.remove("legend-mouseover-inactive")}},{key:"highlightRangeInSeries",value:function(t,e){var i=this.w,s=i.globals.dom.baseEl.querySelectorAll(".apexcharts-heatmap-rect"),a=function(){for(var t=0;t<s.length;t++)s[t].classList.remove("legend-mouseover-inactive")};if("mousemove"===t.type){var r=parseInt(e.getAttribute("rel"),10)-1;a(),function(){for(var t=0;t<s.length;t++)s[t].classList.add("legend-mouseover-inactive")}(),function(t){for(var e=0;e<s.length;e++){var i=parseInt(s[e].getAttribute("val"),10);i>=t.from&&i<=t.to&&s[e].classList.remove("legend-mouseover-inactive")}}(i.config.plotOptions.heatmap.colorScale.ranges[r])}else"mouseout"===t.type&&a()}},{key:"getActiveSeriesIndex",value:function(){var t=this.w,e=0;if(t.globals.series.length>1)for(var i=t.globals.series.map((function(e,i){return e.length>0&&"bar"!==t.config.series[i].type&&"column"!==t.config.series[i].type?i:-1})),s=0;s<i.length;s++)if(-1!==i[s]){e=i[s];break}return e}},{key:"getActiveConfigSeriesIndex",value:function(){var t=this.w,e=0;if(t.config.series.length>1)for(var i=t.config.series.map((function(t,e){return t.data&&t.data.length>0?e:-1})),s=0;s<i.length;s++)if(-1!==i[s]){e=i[s];break}return e}},{key:"getPreviousPaths",value:function(){var t=this.w;function e(e,i,s){for(var a=e[i].childNodes,r={type:s,paths:[],realIndex:e[i].getAttribute("data:realIndex")},n=0;n<a.length;n++)if(a[n].hasAttribute("pathTo")){var o=a[n].getAttribute("pathTo");r.paths.push({d:o})}t.globals.previousPaths.push(r)}t.globals.previousPaths=[];var i=t.globals.dom.baseEl.querySelectorAll(".apexcharts-line-series .apexcharts-series");if(i.length>0)for(var s=i.length-1;s>=0;s--)e(i,s,"line");var a=t.globals.dom.baseEl.querySelectorAll(".apexcharts-area-series .apexcharts-series");if(a.length>0)for(var r=a.length-1;r>=0;r--)e(a,r,"area");var n=t.globals.dom.baseEl.querySelectorAll(".apexcharts-bar-series .apexcharts-series");if(n.length>0)for(var o=0;o<n.length;o++)e(n,o,"bar");var l=t.globals.dom.baseEl.querySelectorAll(".apexcharts-candlestick-series .apexcharts-series");if(l.length>0)for(var h=0;h<l.length;h++)e(l,h,"candlestick");var c=t.globals.dom.baseEl.querySelectorAll(".apexcharts-radar-series .apexcharts-series");if(c.length>0)for(var d=0;d<c.length;d++)e(c,d,"radar");var u=t.globals.dom.baseEl.querySelectorAll(".apexcharts-bubble-series .apexcharts-series");if(u.length>0)for(var g=0;g<u.length;g++){for(var f=t.globals.dom.baseEl.querySelectorAll(".apexcharts-bubble-series .apexcharts-series[data\\:realIndex='".concat(g,"'] circle")),p=[],x=0;x<f.length;x++)p.push({x:f[x].getAttribute("cx"),y:f[x].getAttribute("cy"),r:f[x].getAttribute("r")});t.globals.previousPaths.push(p)}var b=t.globals.dom.baseEl.querySelectorAll(".apexcharts-scatter-series .apexcharts-series");if(b.length>0)for(var m=0;m<b.length;m++){for(var v=t.globals.dom.baseEl.querySelectorAll(".apexcharts-scatter-series .apexcharts-series[data\\:realIndex='".concat(m,"'] circle")),y=[],w=0;w<v.length;w++)y.push({x:v[w].getAttribute("cx"),y:v[w].getAttribute("cy"),r:v[w].getAttribute("r")});t.globals.previousPaths.push(y)}var k=t.globals.dom.baseEl.querySelectorAll(".apexcharts-heatmap .apexcharts-series");if(k.length>0)for(var A=0;A<k.length;A++){for(var S=t.globals.dom.baseEl.querySelectorAll(".apexcharts-heatmap .apexcharts-series[data\\:realIndex='".concat(A,"'] rect")),C=[],L=0;L<S.length;L++)C.push({color:S[L].getAttribute("color")});t.globals.previousPaths.push(C)}t.globals.axisCharts||(t.globals.previousPaths=t.globals.series)}},{key:"handleNoData",value:function(){var t=this.w,e=t.config.noData,i=new Graphics(this.ctx),s=t.globals.svgWidth/2,a=t.globals.svgHeight/2,r="middle";if(t.globals.noData=!0,t.globals.animationEnded=!0,"left"===e.align?(s=10,r="start"):"right"===e.align&&(s=t.globals.svgWidth-10,r="end"),"top"===e.verticalAlign?a=50:"bottom"===e.verticalAlign&&(a=t.globals.svgHeight-50),s+=e.offsetX,a=a+parseInt(e.style.fontSize,10)+2+e.offsetY,void 0!==e.text&&""!==e.text){var n=i.drawText({x:s,y:a,text:e.text,textAnchor:r,fontSize:e.style.fontSize,fontFamily:e.style.fontFamily,foreColor:e.style.color,opacity:1,class:"apexcharts-text-nodata"});n.node.setAttribute("class","apexcharts-title-text"),t.globals.dom.Paper.add(n)}}},{key:"setNullSeriesToZeroValues",value:function(t){for(var e=this.w,i=0;i<t.length;i++)if(0===t[i].length)for(var s=0;s<t[e.globals.maxValsInArrayIndex].length;s++)t[i].push(0);return t}},{key:"hasAllSeriesEqualX",value:function(){for(var t=!0,e=this.w,i=this.filteredSeriesX(),s=0;s<i.length-1;s++)if(i[s][0]!==i[s+1][0]){t=!1;break}return e.globals.allSeriesHasEqualX=t,t}},{key:"filteredSeriesX",value:function(){var t=this.w.globals.seriesX.map((function(t){return t.length>0?t:[]}));return t}}]),t}(),Legend=function(){function t(e,i){_classCallCheck(this,t),this.ctx=e,this.w=e.w,this.onLegendClick=this.onLegendClick.bind(this),this.onLegendHovered=this.onLegendHovered.bind(this),this.isBarsDistributed="bar"===this.w.config.chart.type&&this.w.config.plotOptions.bar.distributed&&1===this.w.config.series.length}return _createClass(t,[{key:"init",value:function(){var t=this.w,e=t.globals,i=t.config;if((i.legend.showForSingleSeries&&1===e.series.length||this.isBarsDistributed||e.series.length>1||!e.axisCharts)&&i.legend.show){for(;e.dom.elLegendWrap.firstChild;)e.dom.elLegendWrap.removeChild(e.dom.elLegendWrap.firstChild);this.drawLegends(),Utils.isIE11()?document.getElementsByTagName("head")[0].appendChild(this.getLegendStyles()):this.appendToForeignObject(),"bottom"===i.legend.position||"top"===i.legend.position?this.legendAlignHorizontal():"right"!==i.legend.position&&"left"!==i.legend.position||this.legendAlignVertical()}}},{key:"getLegendStyles",value:function(){var t=document.createElement("style");t.setAttribute("type","text/css");var e=document.createTextNode("\t\n    \t\n      .apexcharts-legend {\t\n        display: flex;\t\n        overflow: auto;\t\n        padding: 0 10px;\t\n      }\t\n      .apexcharts-legend.position-bottom, .apexcharts-legend.position-top {\t\n        flex-wrap: wrap\t\n      }\t\n      .apexcharts-legend.position-right, .apexcharts-legend.position-left {\t\n        flex-direction: column;\t\n        bottom: 0;\t\n      }\t\n      .apexcharts-legend.position-bottom.left, .apexcharts-legend.position-top.left, .apexcharts-legend.position-right, .apexcharts-legend.position-left {\t\n        justify-content: flex-start;\t\n      }\t\n      .apexcharts-legend.position-bottom.center, .apexcharts-legend.position-top.center {\t\n        justify-content: center;  \t\n      }\t\n      .apexcharts-legend.position-bottom.right, .apexcharts-legend.position-top.right {\t\n        justify-content: flex-end;\t\n      }\t\n      .apexcharts-legend-series {\t\n        cursor: pointer;\t\n        line-height: normal;\t\n      }\t\n      .apexcharts-legend.position-bottom .apexcharts-legend-series, .apexcharts-legend.position-top .apexcharts-legend-series{\t\n        display: flex;\t\n        align-items: center;\t\n      }\t\n      .apexcharts-legend-text {\t\n        position: relative;\t\n        font-size: 14px;\t\n      }\t\n      .apexcharts-legend-text *, .apexcharts-legend-marker * {\t\n        pointer-events: none;\t\n      }\t\n      .apexcharts-legend-marker {\t\n        position: relative;\t\n        display: inline-block;\t\n        cursor: pointer;\t\n        margin-right: 3px;\t\n      }\t\n      \t\n      .apexcharts-legend.right .apexcharts-legend-series, .apexcharts-legend.left .apexcharts-legend-series{\t\n        display: inline-block;\t\n      }\t\n      .apexcharts-legend-series.no-click {\t\n        cursor: auto;\t\n      }\t\n      .apexcharts-legend .apexcharts-hidden-zero-series, .apexcharts-legend .apexcharts-hidden-null-series {\t\n        display: none !important;\t\n      }\t\n      .inactive-legend {\t\n        opacity: 0.45;\t\n      }");return t.appendChild(e),t}},{key:"appendToForeignObject",value:function(){var t=this.w.globals;t.dom.elLegendForeign=document.createElementNS(t.SVGNS,"foreignObject");var e=t.dom.elLegendForeign;e.setAttribute("x",0),e.setAttribute("y",0),e.setAttribute("width",t.svgWidth),e.setAttribute("height",t.svgHeight),t.dom.elLegendWrap.setAttribute("xmlns","http://www.w3.org/1999/xhtml"),e.appendChild(t.dom.elLegendWrap),e.appendChild(this.getLegendStyles()),t.dom.Paper.node.insertBefore(e,t.dom.elGraphical.node)}},{key:"drawLegends",value:function(){var t=this.w,e=t.config.legend.fontFamily,i=t.globals.seriesNames,s=t.globals.colors.slice();if("heatmap"===t.config.chart.type){var a=t.config.plotOptions.heatmap.colorScale.ranges;i=a.map((function(t){return t.name?t.name:t.from+" - "+t.to})),s=a.map((function(t){return t.color}))}else this.isBarsDistributed&&(i=t.globals.labels.slice());for(var r=t.globals.legendFormatter,n=t.config.legend.inverseOrder,o=n?i.length-1:0;n?o>=0:o<=i.length-1;n?o--:o++){var l=r(i[o],{seriesIndex:o,w:t}),h=!1,c=!1;if(t.globals.collapsedSeries.length>0)for(var d=0;d<t.globals.collapsedSeries.length;d++)t.globals.collapsedSeries[d].index===o&&(h=!0);if(t.globals.ancillaryCollapsedSeriesIndices.length>0)for(var u=0;u<t.globals.ancillaryCollapsedSeriesIndices.length;u++)t.globals.ancillaryCollapsedSeriesIndices[u]===o&&(c=!0);var g=document.createElement("span");g.classList.add("apexcharts-legend-marker");var f=t.config.legend.markers.offsetX,p=t.config.legend.markers.offsetY,x=t.config.legend.markers.height,b=t.config.legend.markers.width,m=t.config.legend.markers.strokeWidth,v=t.config.legend.markers.strokeColor,y=t.config.legend.markers.radius,w=g.style;w.background=s[o],w.color=s[o],t.config.legend.markers.fillColors&&t.config.legend.markers.fillColors[o]&&(w.background=t.config.legend.markers.fillColors[o]),w.height=Array.isArray(x)?parseFloat(x[o])+"px":parseFloat(x)+"px",w.width=Array.isArray(b)?parseFloat(b[o])+"px":parseFloat(b)+"px",w.left=Array.isArray(f)?f[o]:f,w.top=Array.isArray(p)?p[o]:p,w.borderWidth=Array.isArray(m)?m[o]:m,w.borderColor=Array.isArray(v)?v[o]:v,w.borderRadius=Array.isArray(y)?parseFloat(y[o])+"px":parseFloat(y)+"px",t.config.legend.markers.customHTML&&(Array.isArray(t.config.legend.markers.customHTML)?g.innerHTML=t.config.legend.markers.customHTML[o]():g.innerHTML=t.config.legend.markers.customHTML()),Graphics.setAttrs(g,{rel:o+1,"data:collapsed":h||c}),(h||c)&&g.classList.add("inactive-legend");var k=document.createElement("div"),A=document.createElement("span");A.classList.add("apexcharts-legend-text"),A.innerHTML=l;var S=t.config.legend.labels.useSeriesColors?t.globals.colors[o]:t.config.legend.labels.colors;S||(S=t.config.chart.foreColor),A.style.color=S,A.style.fontSize=parseFloat(t.config.legend.fontSize)+"px",A.style.fontFamily=e||t.config.chart.fontFamily,Graphics.setAttrs(A,{rel:o+1,i:o,"data:default-text":encodeURIComponent(l),"data:collapsed":h||c}),k.appendChild(g),k.appendChild(A);var C=new CoreUtils(this.ctx);if(!t.config.legend.showForZeroSeries)0===C.getSeriesTotalByIndex(o)&&C.seriesHaveSameValues(o)&&!C.isSeriesNull(o)&&-1===t.globals.collapsedSeriesIndices.indexOf(o)&&-1===t.globals.ancillaryCollapsedSeriesIndices.indexOf(o)&&k.classList.add("apexcharts-hidden-zero-series");t.config.legend.showForNullSeries||C.isSeriesNull(o)&&-1===t.globals.collapsedSeriesIndices.indexOf(o)&&-1===t.globals.ancillaryCollapsedSeriesIndices.indexOf(o)&&k.classList.add("apexcharts-hidden-null-series"),t.globals.dom.elLegendWrap.appendChild(k),t.globals.dom.elLegendWrap.classList.add(t.config.legend.horizontalAlign),t.globals.dom.elLegendWrap.classList.add("position-"+t.config.legend.position),k.classList.add("apexcharts-legend-series"),k.style.margin="".concat(t.config.legend.itemMargin.horizontal,"px ").concat(t.config.legend.itemMargin.vertical,"px"),t.globals.dom.elLegendWrap.style.width=t.config.legend.width?t.config.legend.width+"px":"",t.globals.dom.elLegendWrap.style.height=t.config.legend.height?t.config.legend.height+"px":"",Graphics.setAttrs(k,{rel:o+1,"data:collapsed":h||c}),(h||c)&&k.classList.add("inactive-legend"),t.config.legend.onItemClick.toggleDataSeries||k.classList.add("no-click")}"heatmap"!==t.config.chart.type&&!this.isBarsDistributed&&t.config.legend.onItemClick.toggleDataSeries&&t.globals.dom.elWrap.addEventListener("click",this.onLegendClick,!0),t.config.legend.onItemHover.highlightDataSeries&&(t.globals.dom.elWrap.addEventListener("mousemove",this.onLegendHovered,!0),t.globals.dom.elWrap.addEventListener("mouseout",this.onLegendHovered,!0))}},{key:"getLegendBBox",value:function(){var t=this.w.globals.dom.baseEl.querySelector(".apexcharts-legend").getBoundingClientRect(),e=t.width;return{clwh:t.height,clww:e}}},{key:"setLegendWrapXY",value:function(t,e){var i=this.w,s=i.globals.dom.baseEl.querySelector(".apexcharts-legend"),a=s.getBoundingClientRect(),r=0,n=0;if("bottom"===i.config.legend.position)n+=i.globals.svgHeight-a.height/2;else if("top"===i.config.legend.position){var o=new Dimensions(this.ctx),l=o.getTitleSubtitleCoords("title").height,h=o.getTitleSubtitleCoords("subtitle").height;n=n+(l>0?l-10:0)+(h>0?h-10:0)}s.style.position="absolute",r=r+t+i.config.legend.offsetX,n=n+e+i.config.legend.offsetY,s.style.left=r+"px",s.style.top=n+"px","bottom"===i.config.legend.position?(s.style.top="auto",s.style.bottom=10+i.config.legend.offsetY+"px"):"right"===i.config.legend.position&&(s.style.left="auto",s.style.right=25+i.config.legend.offsetX+"px"),s.style.width&&(s.style.width=parseInt(i.config.legend.width,10)+"px"),s.style.height&&(s.style.height=parseInt(i.config.legend.height,10)+"px")}},{key:"legendAlignHorizontal",value:function(){var t=this.w;t.globals.dom.baseEl.querySelector(".apexcharts-legend").style.right=0;var e=this.getLegendBBox(),i=new Dimensions(this.ctx),s=i.getTitleSubtitleCoords("title"),a=i.getTitleSubtitleCoords("subtitle"),r=0;"bottom"===t.config.legend.position?r=-e.clwh/1.8:"top"===t.config.legend.position&&(r=s.height+a.height+t.config.title.margin+t.config.subtitle.margin-15),this.setLegendWrapXY(20,r)}},{key:"legendAlignVertical",value:function(){var t=this.w,e=this.getLegendBBox(),i=0;"left"===t.config.legend.position&&(i=20),"right"===t.config.legend.position&&(i=t.globals.svgWidth-e.clww-10),this.setLegendWrapXY(i,20)}},{key:"onLegendHovered",value:function(t){var e=this.w,i=t.target.classList.contains("apexcharts-legend-text")||t.target.classList.contains("apexcharts-legend-marker");if("heatmap"===e.config.chart.type||this.isBarsDistributed){if(i){var s=parseInt(t.target.getAttribute("rel"),10)-1;this.ctx.fireEvent("legendHover",[this.ctx,s,this.w]),new Series(this.ctx).highlightRangeInSeries(t,t.target)}}else!t.target.classList.contains("inactive-legend")&&i&&new Series(this.ctx).toggleSeriesOnHover(t,t.target)}},{key:"onLegendClick",value:function(t){if(t.target.classList.contains("apexcharts-legend-text")||t.target.classList.contains("apexcharts-legend-marker")){var e=parseInt(t.target.getAttribute("rel"),10)-1,i="true"===t.target.getAttribute("data:collapsed"),s=this.w.config.chart.events.legendClick;"function"==typeof s&&s(this.ctx,e,this.w),this.ctx.fireEvent("legendClick",[this.ctx,e,this.w]);var a=this.w.config.legend.markers.onClick;"function"==typeof a&&t.target.classList.contains("apexcharts-legend-marker")&&(a(this.ctx,e,this.w),this.ctx.fireEvent("legendMarkerClick",[this.ctx,e,this.w])),this.toggleDataSeries(e,i)}}},{key:"toggleDataSeries",value:function(t,e){var i=this.w;if(i.globals.axisCharts||"radialBar"===i.config.chart.type){i.globals.resized=!0;var s=null,a=null;if(i.globals.risingSeries=[],i.globals.axisCharts?(s=i.globals.dom.baseEl.querySelector(".apexcharts-series[data\\:realIndex='".concat(t,"']")),a=parseInt(s.getAttribute("data:realIndex"),10)):(s=i.globals.dom.baseEl.querySelector(".apexcharts-series[rel='".concat(t+1,"']")),a=parseInt(s.getAttribute("rel"),10)-1),e)this.riseCollapsedSeries(i.globals.collapsedSeries,i.globals.collapsedSeriesIndices,a),this.riseCollapsedSeries(i.globals.ancillaryCollapsedSeries,i.globals.ancillaryCollapsedSeriesIndices,a);else{if(i.globals.axisCharts){var r=!1;if(i.config.yaxis[a]&&i.config.yaxis[a].show&&i.config.yaxis[a].showAlways&&(r=!0,i.globals.ancillaryCollapsedSeriesIndices.indexOf(a)<0&&(i.globals.ancillaryCollapsedSeries.push({index:a,data:i.config.series[a].data.slice(),type:s.parentNode.className.baseVal.split("-")[1]}),i.globals.ancillaryCollapsedSeriesIndices.push(a))),!r){i.globals.collapsedSeries.push({index:a,data:i.config.series[a].data.slice(),type:s.parentNode.className.baseVal.split("-")[1]}),i.globals.collapsedSeriesIndices.push(a);var n=i.globals.risingSeries.indexOf(a);i.globals.risingSeries.splice(n,1)}i.config.series[a].data=[]}else i.globals.collapsedSeries.push({index:a,data:i.config.series[a]}),i.globals.collapsedSeriesIndices.push(a),i.config.series[a]=0;for(var o=s.childNodes,l=0;l<o.length;l++)o[l].classList.contains("apexcharts-series-markers-wrap")&&(o[l].classList.contains("apexcharts-hide")?o[l].classList.remove("apexcharts-hide"):o[l].classList.add("apexcharts-hide"));i.globals.allSeriesCollapsed=i.globals.collapsedSeries.length===i.globals.series.length,this.ctx._updateSeries(i.config.series,i.config.chart.animations.dynamicAnimation.enabled)}}else{var h=i.globals.dom.Paper.select(" .apexcharts-series[rel='".concat(t+1,"'] path")),c=i.config.chart.type;if("pie"===c||"donut"===c){var d=i.config.plotOptions.pie.donut.labels,u=new Graphics(this.ctx),g=new Pie(this.ctx);u.pathMouseDown(h.members[0],null),g.printDataLabelsInner(h.members[0].node,d)}h.fire("click")}}},{key:"riseCollapsedSeries",value:function(t,e,i){var s=this.w;if(t.length>0)for(var a=0;a<t.length;a++)t[a].index===i&&(s.globals.axisCharts?(s.config.series[i].data=t[a].data.slice(),t.splice(a,1),e.splice(a,1),s.globals.risingSeries.push(i)):(s.config.series[i]=t[a].data,t.splice(a,1),e.splice(a,1),s.globals.risingSeries.push(i)),this.ctx._updateSeries(s.config.series,s.config.chart.animations.dynamicAnimation.enabled))}}]),t}(),Line=function(){function t(e,i,s){_classCallCheck(this,t),this.ctx=e,this.w=e.w,this.xyRatios=i,this.pointsChart=!("bubble"!==this.w.config.chart.type&&"scatter"!==this.w.config.chart.type)||s,this.scatter=new Scatter(this.ctx),this.noNegatives=this.w.globals.minX===Number.MAX_VALUE,this.yaxisIndex=0}return _createClass(t,[{key:"draw",value:function(t,e,i){var s=this.w,a=new Graphics(this.ctx),r=new Fill(this.ctx),n=s.globals.comboCharts?e:s.config.chart.type,o=a.group({class:"apexcharts-".concat(n,"-series apexcharts-plot-series")}),l=new CoreUtils(this.ctx,s);t=l.getLogSeries(t);var h=this.xyRatios.yRatio;h=l.getLogYRatios(h);for(var c=this.xyRatios.zRatio,d=this.xyRatios.xRatio,u=this.xyRatios.baseLineY,g=[],f=[],p=0,x=0;x<t.length;x++){if("line"===n&&("gradient"===s.config.fill.type||"gradient"===s.config.fill.type[x])&&l.seriesHaveSameValues(x)){var b=t[x].slice();b[b.length-1]=b[b.length-1]+1e-6,t[x]=b}var m=s.globals.gridWidth/s.globals.dataPoints,v=s.globals.comboCharts?i[x]:x;h.length>1&&(this.yaxisIndex=v),this.isReversed=s.config.yaxis[this.yaxisIndex]&&s.config.yaxis[this.yaxisIndex].reversed;var y=[],w=[],k=s.globals.gridHeight-u[this.yaxisIndex]-(this.isReversed?s.globals.gridHeight:0)+(this.isReversed?2*u[this.yaxisIndex]:0),A=k;k>s.globals.gridHeight&&(A=s.globals.gridHeight),p=m/2;var S=s.globals.padHorizontal+p,C=1;s.globals.isXNumeric&&s.globals.seriesX.length>0&&(S=(s.globals.seriesX[v][0]-s.globals.minX)/d),w.push(S);var L=void 0,P=void 0,T=void 0,z=void 0,E=[],M=[],I=a.group({class:"apexcharts-series",seriesName:Utils.escapeString(s.globals.seriesNames[v])}),X=a.group({class:"apexcharts-series-markers-wrap"}),Y=a.group({class:"apexcharts-datalabels"});this.ctx.series.addCollapsedClassToSeries(I,v);var R=t[x].length===s.globals.dataPoints;I.attr({"data:longestSeries":R,rel:x+1,"data:realIndex":v}),this.appendPathFrom=!0;var F=S,D=void 0,O=F,H=k,N=0;if(H=this.determineFirstPrevY({i:x,series:t,yRatio:h[this.yaxisIndex],zeroY:k,prevY:H,prevSeriesY:f,lineYPosition:N}).prevY,y.push(H),D=H,null===t[x][0]){for(var _=0;_<t[x].length;_++)if(null!==t[x][_]){O=m*_,H=k-t[x][_]/h[this.yaxisIndex],L=a.move(O,H),P=a.move(O,A);break}}else L=a.move(O,H),P=a.move(O,A)+a.line(O,H);if(T=a.move(-1,k)+a.line(-1,k),z=a.move(-1,k)+a.line(-1,k),s.globals.previousPaths.length>0){var B=this.checkPreviousPaths({pathFromLine:T,pathFromArea:z,realIndex:v});T=B.pathFromLine,z=B.pathFromArea}for(var W=s.globals.dataPoints>1?s.globals.dataPoints-1:s.globals.dataPoints,G=0;G<W;G++){var V=void 0===t[x][G+1]||null===t[x][G+1];if(s.globals.isXNumeric){var U=s.globals.seriesX[v][G+1];void 0===s.globals.seriesX[v][G+1]&&(U=s.globals.seriesX[v][W-1]),S=(U-s.globals.minX)/d}else S+=m;var j=Utils.isNumber(s.globals.minYArr[v])?s.globals.minYArr[v]:s.globals.minY;N=s.config.chart.stacked&&x>0&&s.globals.collapsedSeries.length<s.config.series.length-1?f[x-1][G+1]:k,C=V?N-j/h[this.yaxisIndex]+2*(this.isReversed?j/h[this.yaxisIndex]:0):N-t[x][G+1]/h[this.yaxisIndex]+2*(this.isReversed?t[x][G+1]/h[this.yaxisIndex]:0),w.push(S),y.push(C);var q=this.createPaths({series:t,i:x,j:G,x:S,y:C,xDivision:m,pX:F,pY:D,areaBottomY:A,linePath:L,areaPath:P,linePaths:E,areaPaths:M,seriesIndex:i});M=q.areaPaths,E=q.linePaths,F=q.pX,D=q.pY,P=q.areaPath,L=q.linePath,this.appendPathFrom&&(T+=a.line(S,k),z+=a.line(S,k));var Z=this.calculatePoints({series:t,x:S,y:C,realIndex:v,i:x,j:G,prevY:H,categoryAxisCorrection:p,xRatio:d});if(this.pointsChart)this.scatter.draw(I,G,{realIndex:v,pointsPos:Z,zRatio:c,elParent:X});else{var $=new Markers(this.ctx);s.globals.dataPoints>1&&X.node.classList.add("hidden");var J=$.plotChartMarkers(Z,v,G+1);null!==J&&X.add(J)}var Q=!t[x][G+1]||t[x][G+1]>t[x][G]?"top":"bottom",K=new DataLabels(this.ctx).drawDataLabel(Z,v,G+1,null,Q);null!==K&&Y.add(K)}f.push(y),s.globals.seriesXvalues[v]=w,s.globals.seriesYvalues[v]=y,this.pointsChart||s.globals.delayedElements.push({el:X.node,index:v});var tt={i:x,realIndex:v,animationDelay:x,initialSpeed:s.config.chart.animations.speed,dataChangeSpeed:s.config.chart.animations.dynamicAnimation.speed,className:"apexcharts-".concat(n)};if("area"===n)for(var et=r.fillPath({seriesNumber:v}),it=0;it<M.length;it++){var st=a.renderPaths(_objectSpread2({},tt,{pathFrom:z,pathTo:M[it],stroke:"none",strokeWidth:0,strokeLineCap:null,fill:et}));I.add(st)}if(s.config.stroke.show&&!this.pointsChart){var at=null;at="line"===n?r.fillPath({seriesNumber:v,i:x}):s.globals.stroke.colors[v];for(var rt=0;rt<E.length;rt++){var nt=a.renderPaths(_objectSpread2({},tt,{pathFrom:T,pathTo:E[rt],stroke:at,strokeWidth:Array.isArray(s.config.stroke.width)?s.config.stroke.width[v]:s.config.stroke.width,strokeLineCap:s.config.stroke.lineCap,fill:"none"}));I.add(nt)}}I.add(X),I.add(Y),g.push(I)}for(var ot=g.length;ot>0;ot--)o.add(g[ot-1]);return o}},{key:"createPaths",value:function(t){var e=t.series,i=t.i,s=t.j,a=t.x,r=t.y,n=t.pX,o=t.pY,l=t.xDivision,h=t.areaBottomY,c=t.linePath,d=t.areaPath,u=t.linePaths,g=t.areaPaths,f=t.seriesIndex,p=this.w,x=new Graphics(this.ctx),b=p.config.stroke.curve;if(Array.isArray(p.config.stroke.curve)&&(b=Array.isArray(f)?p.config.stroke.curve[f[i]]:p.config.stroke.curve[i]),"smooth"===b){var m=.35*(a-n);p.globals.hasNullValues?(null!==e[i][s]&&(null!==e[i][s+1]?(c=x.move(n,o)+x.curve(n+m,o,a-m,r,a+1,r),d=x.move(n+1,o)+x.curve(n+m,o,a-m,r,a+1,r)+x.line(a,h)+x.line(n,h)+"z"):(c=x.move(n,o),d=x.move(n,o)+"z")),u.push(c),g.push(d)):(c+=x.curve(n+m,o,a-m,r,a,r),d+=x.curve(n+m,o,a-m,r,a,r)),n=a,o=r,s===e[i].length-2&&(d=d+x.curve(n,o,a,r,a,h)+x.move(a,r)+"z",p.globals.hasNullValues||(u.push(c),g.push(d)))}else null===e[i][s+1]&&(c+=x.move(a,r),d=d+x.line(a-l,h)+x.move(a,r)),null===e[i][s]&&(c+=x.move(a,r),d+=x.move(a,h)),"stepline"===b?(c=c+x.line(a,null,"H")+x.line(null,r,"V"),d=d+x.line(a,null,"H")+x.line(null,r,"V")):"straight"===b&&(c+=x.line(a,r),d+=x.line(a,r)),s===e[i].length-2&&(d=d+x.line(a,h)+x.move(a,r)+"z",u.push(c),g.push(d));return{linePaths:u,areaPaths:g,pX:n,pY:o,linePath:c,areaPath:d}}},{key:"calculatePoints",value:function(t){var e=t.series,i=t.realIndex,s=t.x,a=t.y,r=t.i,n=t.j,o=t.prevY,l=t.categoryAxisCorrection,h=t.xRatio,c=this.w,d=[],u=[];if(0===n){var g=l+c.config.markers.offsetX;c.globals.isXNumeric&&(g=(c.globals.seriesX[i][0]-c.globals.minX)/h+c.config.markers.offsetX),d.push(g),u.push(Utils.isNumber(e[r][0])?o+c.config.markers.offsetY:null),d.push(s+c.config.markers.offsetX),u.push(Utils.isNumber(e[r][n+1])?a+c.config.markers.offsetY:null)}else d.push(s+c.config.markers.offsetX),u.push(Utils.isNumber(e[r][n+1])?a+c.config.markers.offsetY:null);return{x:d,y:u}}},{key:"checkPreviousPaths",value:function(t){for(var e=t.pathFromLine,i=t.pathFromArea,s=t.realIndex,a=this.w,r=0;r<a.globals.previousPaths.length;r++){var n=a.globals.previousPaths[r];("line"===n.type||"area"===n.type)&&n.paths.length>0&&parseInt(n.realIndex,10)===parseInt(s,10)&&("line"===n.type?(this.appendPathFrom=!1,e=a.globals.previousPaths[r].paths[0].d):"area"===n.type&&(this.appendPathFrom=!1,i=a.globals.previousPaths[r].paths[0].d,a.config.stroke.show&&(e=a.globals.previousPaths[r].paths[1].d)))}return{pathFromLine:e,pathFromArea:i}}},{key:"determineFirstPrevY",value:function(t){var e=t.i,i=t.series,s=t.yRatio,a=t.zeroY,r=t.prevY,n=t.prevSeriesY,o=t.lineYPosition,l=this.w;if(void 0!==i[e][0])r=(o=l.config.chart.stacked&&e>0?n[e-1][0]:a)-i[e][0]/s+2*(this.isReversed?i[e][0]/s:0);else if(l.config.chart.stacked&&e>0&&void 0===i[e][0])for(var h=e-1;h>=0;h--)if(null!==i[h][0]&&void 0!==i[h][0]){r=o=n[h][0];break}return{prevY:r,lineYPosition:o}}}]),t}(),Range=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w}return _createClass(t,[{key:"niceScale",value:function(t,e,i){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:10,r=this.w,n=void 0===this.w.config.yaxis[s].max&&void 0===this.w.config.yaxis[s].min||this.w.config.yaxis[s].forceNiceScale;if(t===Number.MIN_VALUE&&0===e||!Utils.isNumber(t)&&!Utils.isNumber(e)||t===Number.MIN_VALUE&&e===-Number.MAX_VALUE){t=0,e=a;var o=this.linearScale(t,e,a);return o}t>e?(console.warn("yaxis.min cannot be greater than yaxis.max"),e=t+.1):t===e&&(t=0===t?0:t-.5,e=0===e?2:e+.5);var l=[],h=Math.abs(e-t);h<1&&n&&("candlestick"===r.config.chart.type||"candlestick"===r.config.series[s].type||r.globals.isRangeData)&&(e*=1.01);var c=a+1;c<2?c=2:c>2&&(c-=2);var d=h/c,u=Math.floor(Utils.log10(d)),g=Math.pow(10,u),f=Math.round(d/g);f<1&&(f=1);var p=f*g,x=p*Math.floor(t/p),b=p*Math.ceil(e/p),m=x;if(n&&h>2){for(;l.push(m),!((m+=p)>b););return{result:l,niceMin:l[0],niceMax:l[l.length-1]}}var v=t;(l=[]).push(v);for(var y=Math.abs(e-t)/a,w=0;w<=a;w++)v+=y,l.push(v);return l[l.length-2]>=e&&l.pop(),{result:l,niceMin:l[0],niceMax:l[l.length-1]}}},{key:"linearScale",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,s=Math.abs(e-t),a=s/i;i===Number.MAX_VALUE&&(i=10,a=1);for(var r=[],n=t;i>=0;)r.push(n),n+=a,i-=1;return{result:r,niceMin:r[0],niceMax:r[r.length-1]}}},{key:"logarithmicScale",value:function(t,e,i,s){(e<0||e===Number.MIN_VALUE)&&(e=.01);for(var a=Math.log(e)/Math.log(10),r=Math.log(i)/Math.log(10),n=Math.abs(i-e)/s,o=[],l=e;s>=0;)o.push(l),l+=n,s-=1;var h=o.map((function(t,s){t<=0&&(t=.01);var n=(r-a)/(i-e),o=Math.pow(10,a+n*(t-a));return Math.round(o/Utils.roundToBase(o,10))*Utils.roundToBase(o,10)}));return 0===h[0]&&(h[0]=1),{result:h,niceMin:h[0],niceMax:h[h.length-1]}}},{key:"setYScaleForIndex",value:function(t,e,i){var s=this.w.globals,a=this.w.config,r=s.isBarHorizontal?a.xaxis:a.yaxis[t];void 0===s.yAxisScale[t]&&(s.yAxisScale[t]=[]);var n=Math.abs(i-e);r.logarithmic&&n<=5&&(s.invalidLogScale=!0),r.logarithmic&&n>5?(s.allSeriesCollapsed=!1,s.yAxisScale[t]=this.logarithmicScale(t,e,i,r.tickAmount?r.tickAmount:Math.floor(Math.log10(i)))):i!==-Number.MAX_VALUE&&Utils.isNumber(i)?(s.allSeriesCollapsed=!1,void 0===r.min&&void 0===r.max||r.forceNiceScale?s.yAxisScale[t]=this.niceScale(e,i,n,t,r.tickAmount?r.tickAmount:n<5&&n>1?n+1:5):s.yAxisScale[t]=this.linearScale(e,i,r.tickAmount)):s.yAxisScale[t]=this.linearScale(0,5,5)}},{key:"setMultipleYScales",value:function(){var t=this,e=this.w.globals,i=this.w.config,s=e.minYArr.concat([]),a=e.maxYArr.concat([]),r=[];i.yaxis.forEach((function(n,o){var l=o;i.series.forEach((function(t,i){t.name===n.seriesName&&-1===e.collapsedSeriesIndices.indexOf(i)&&(l=i,o!==i?r.push({index:i,similarIndex:o,alreadyExists:!0}):r.push({index:i}))}));var h=s[l],c=a[l];t.setYScaleForIndex(o,h,c)})),this.sameScaleInMultipleAxes(s,a,r)}},{key:"sameScaleInMultipleAxes",value:function(t,e,i){var s=this,a=this.w.config,r=this.w.globals,n=[];i.forEach((function(t){t.alreadyExists&&(void 0===n[t.index]&&(n[t.index]=[]),n[t.index].push(t.index),n[t.index].push(t.similarIndex))})),r.yAxisSameScaleIndices=n,n.forEach((function(t,e){n.forEach((function(i,s){var a,r;e!==s&&(a=t,r=i,a.filter((function(t){return-1!==r.indexOf(t)}))).length>0&&(n[e]=n[e].concat(n[s]))}))}));var o=n.map((function(t){return t.filter((function(e,i){return t.indexOf(e)===i}))})).map((function(t){return t.sort()}));n=n.filter((function(t){return!!t}));var l=o.slice(),h=l.map((function(t){return JSON.stringify(t)}));l=l.filter((function(t,e){return h.indexOf(JSON.stringify(t))===e}));var c=[],d=[];t.forEach((function(t,i){l.forEach((function(s,a){s.indexOf(i)>-1&&(void 0===c[a]&&(c[a]=[],d[a]=[]),c[a].push({key:i,value:t}),d[a].push({key:i,value:e[i]}))}))}));var u=Array.apply(null,Array(l.length)).map(Number.prototype.valueOf,Number.MIN_VALUE),g=Array.apply(null,Array(l.length)).map(Number.prototype.valueOf,-Number.MAX_VALUE);c.forEach((function(t,e){t.forEach((function(t,i){u[e]=Math.min(t.value,u[e])}))})),d.forEach((function(t,e){t.forEach((function(t,i){g[e]=Math.max(t.value,g[e])}))})),t.forEach((function(t,e){d.forEach((function(t,i){var n=u[i],o=g[i];a.chart.stacked&&(o=0,t.forEach((function(t,e){o+=t.value,n!==Number.MIN_VALUE&&(n+=c[i][e].value)}))),t.forEach((function(i,l){t[l].key===e&&(void 0!==a.yaxis[e].min&&(n="function"==typeof a.yaxis[e].min?a.yaxis[e].min(r.minY):a.yaxis[e].min),void 0!==a.yaxis[e].max&&(o="function"==typeof a.yaxis[e].max?a.yaxis[e].max(r.maxY):a.yaxis[e].max),s.setYScaleForIndex(e,n,o))}))}))}))}},{key:"autoScaleY",value:function(t,e,i){t||(t=this);var s=t.w;if(s.globals.isMultipleYAxis||s.globals.collapsedSeries.length)return console.warn("autoScaleYaxis is not supported in a multi-yaxis chart."),e;var a=s.globals.seriesX[0],r=s.config.chart.stacked;return e.forEach((function(t,n){for(var o=0,l=0;l<a.length;l++)if(a[l]>=i.xaxis.min){o=l;break}var h,c,d=s.globals.minYArr[n],u=s.globals.maxYArr[n],g=s.globals.stackedSeriesTotals;s.globals.series.forEach((function(n,l){var f=n[o];r?(f=g[o],h=c=f,g.forEach((function(t,e){a[e]<=i.xaxis.max&&a[e]>=i.xaxis.min&&(t>c&&null!==t&&(c=t),n[e]<h&&null!==n[e]&&(h=n[e]))}))):(h=c=f,n.forEach((function(t,e){if(a[e]<=i.xaxis.max&&a[e]>=i.xaxis.min){var r=t,n=t;s.globals.series.forEach((function(i,s){null!==t&&(r=Math.min(i[e],r),n=Math.max(i[e],n))})),n>c&&null!==n&&(c=n),r<h&&null!==r&&(h=r)}}))),void 0===h&&void 0===c&&(h=d,c=u),(c*=c<0?.9:1.1)<0&&c<u&&(c=u),(h*=h<0?1.1:.9)<0&&h>d&&(h=d),e.length>1?(e[l].min=void 0===t.min?h:t.min,e[l].max=void 0===t.max?c:t.max):(e[0].min=void 0===t.min?h:t.min,e[0].max=void 0===t.max?c:t.max)}))})),e}}]),t}(),Range$1=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w,this.scales=new Range(e)}return _createClass(t,[{key:"init",value:function(){this.setYRange(),this.setXRange(),this.setZRange()}},{key:"getMinYMaxY",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Number.MAX_VALUE,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-Number.MAX_VALUE,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=this.w.config,r=this.w.globals,n=-Number.MAX_VALUE,o=Number.MIN_VALUE;null===s&&(s=t+1);var l=r.series,h=l,c=l;"candlestick"===a.chart.type?(h=r.seriesCandleL,c=r.seriesCandleH):r.isRangeData&&(h=r.seriesRangeStart,c=r.seriesRangeEnd);for(var d=t;d<s;d++){r.dataPoints=Math.max(r.dataPoints,l[d].length);for(var u=0;u<r.series[d].length;u++){var g=l[d][u];null!==g&&Utils.isNumber(g)?(n=Math.max(n,c[d][u]),e=Math.min(e,h[d][u]),i=Math.max(i,h[d][u]),"candlestick"===this.w.config.chart.type&&(n=Math.max(n,r.seriesCandleO[d][u]),n=Math.max(n,r.seriesCandleH[d][u]),n=Math.max(n,r.seriesCandleL[d][u]),i=n=Math.max(n,r.seriesCandleC[d][u])),Utils.isFloat(g)&&(g=Utils.noExponents(g),r.yValueDecimal=Math.max(r.yValueDecimal,g.toString().split(".")[1].length)),o>h[d][u]&&h[d][u]<0&&(o=h[d][u])):r.hasNullValues=!0}}return"rangeBar"===a.chart.type&&r.seriesRangeStart.length&&"datetime"===a.xaxis.type&&(o=e),{minY:o,maxY:n,lowestY:e,highestY:i}}},{key:"setYRange",value:function(){var t=this.w.globals,e=this.w.config;t.maxY=-Number.MAX_VALUE,t.minY=Number.MIN_VALUE;var i=Number.MAX_VALUE;if(t.isMultipleYAxis)for(var s=0;s<t.series.length;s++){var a=this.getMinYMaxY(s,i,null,s+1);t.minYArr.push(a.minY),t.maxYArr.push(a.maxY),i=a.lowestY}var r=this.getMinYMaxY(0,i,null,t.series.length);if(t.minY=r.minY,t.maxY=r.maxY,i=r.lowestY,e.chart.stacked){var n=[],o=[];if(t.series.length)for(var l=0;l<t.series[t.maxValsInArrayIndex].length;l++)for(var h=0,c=0,d=0;d<t.series.length;d++)null!==t.series[d][l]&&Utils.isNumber(t.series[d][l])&&(t.series[d][l]>0?h=h+parseFloat(t.series[d][l])+1e-4:c+=parseFloat(t.series[d][l])),d===t.series.length-1&&(n.push(h),o.push(c));for(var u=0;u<n.length;u++)t.maxY=Math.max(t.maxY,n[u]),t.minY=Math.min(t.minY,o[u])}if(("line"===e.chart.type||"area"===e.chart.type||"candlestick"===e.chart.type)&&t.minY===Number.MIN_VALUE&&i!==-Number.MAX_VALUE&&i!==t.maxY){var g=t.maxY-i;i>=0&&i<=10&&(g=0),t.minY=i-5*g/100,i>0&&t.minY<0&&(t.minY=0),t.maxY=t.maxY+5*g/100}return e.yaxis.map((function(e,i){void 0!==e.max&&("number"==typeof e.max?t.maxYArr[i]=e.max:"function"==typeof e.max&&(t.maxYArr[i]=e.max(t.maxY)),t.maxY=t.maxYArr[i]),void 0!==e.min&&("number"==typeof e.min?t.minYArr[i]=e.min:"function"==typeof e.min&&(t.minYArr[i]=e.min(t.minY)),t.minY=t.minYArr[i])})),t.isBarHorizontal&&(void 0!==e.xaxis.min&&"number"==typeof e.xaxis.min&&(t.minY=e.xaxis.min),void 0!==e.xaxis.max&&"number"==typeof e.xaxis.max&&(t.maxY=e.xaxis.max)),t.isMultipleYAxis?(this.scales.setMultipleYScales(),t.minY=i,t.yAxisScale.forEach((function(e,i){t.minYArr[i]=e.niceMin,t.maxYArr[i]=e.niceMax}))):(this.scales.setYScaleForIndex(0,t.minY,t.maxY),t.minY=t.yAxisScale[0].niceMin,t.maxY=t.yAxisScale[0].niceMax,t.minYArr[0]=t.yAxisScale[0].niceMin,t.maxYArr[0]=t.yAxisScale[0].niceMax),{minY:t.minY,maxY:t.maxY,minYArr:t.minYArr,maxYArr:t.maxYArr}}},{key:"setXRange",value:function(){var t,e=this.w.globals,i=this.w.config,s="numeric"===i.xaxis.type||"datetime"===i.xaxis.type||"category"===i.xaxis.type&&!e.noLabelsProvided||e.noLabelsProvided||e.isXNumeric;if(e.isXNumeric)for(var a=0;a<e.series.length;a++)if(e.labels[a])for(var r=0;r<e.labels[a].length;r++)null!==e.labels[a][r]&&Utils.isNumber(e.labels[a][r])&&(e.maxX=Math.max(e.maxX,e.labels[a][r]),e.initialmaxX=Math.max(e.maxX,e.labels[a][r]),e.minX=Math.min(e.minX,e.labels[a][r]),e.initialminX=Math.min(e.minX,e.labels[a][r]));if(e.noLabelsProvided&&0===i.xaxis.categories.length&&(e.maxX=e.labels[e.labels.length-1],e.initialmaxX=e.labels[e.labels.length-1],e.minX=1,e.initialminX=1),(e.comboChartsHasBars||"candlestick"===i.chart.type||"bar"===i.chart.type&&e.isXNumeric)&&("category"!==i.xaxis.type||e.isXNumeric)){var n=e.svgWidth/e.dataPoints*(Math.abs(e.maxX-e.minX)/e.svgWidth),o=e.minX-n/2;e.minX=o,e.initialminX=o;var l=e.maxX+n/((e.series.length+1)/e.series.length);e.maxX=l,e.initialmaxX=l}!e.isXNumeric&&!e.noLabelsProvided||i.xaxis.convertedCatToNumeric&&!e.dataFormatXNumeric||(void 0===i.xaxis.tickAmount?(t=Math.round(e.svgWidth/150),"numeric"===i.xaxis.type&&e.dataPoints<20&&(t=e.dataPoints-1),t>e.dataPoints&&0!==e.dataPoints&&(t=e.dataPoints-1)):t="dataPoints"===i.xaxis.tickAmount?e.series[e.maxValsInArrayIndex].length-1:i.xaxis.tickAmount,void 0!==i.xaxis.max&&"number"==typeof i.xaxis.max&&(e.maxX=i.xaxis.max),void 0!==i.xaxis.min&&"number"==typeof i.xaxis.min&&(e.minX=i.xaxis.min),void 0!==i.xaxis.range&&(e.minX=e.maxX-i.xaxis.range),e.minX!==Number.MAX_VALUE&&e.maxX!==-Number.MAX_VALUE?e.xAxisScale=this.scales.linearScale(e.minX,e.maxX,t):(e.xAxisScale=this.scales.linearScale(1,t,t),e.noLabelsProvided&&e.labels.length>0&&(e.xAxisScale=this.scales.linearScale(1,e.labels.length,t-1),e.seriesX=e.labels.slice())),s&&(e.labels=e.xAxisScale.result.slice()));if(e.minX===e.maxX)if("datetime"===i.xaxis.type){var h=new Date(e.minX);h.setDate(h.getDate()-2),e.minX=new Date(h).getTime();var c=new Date(e.maxX);c.setDate(c.getDate()+2),e.maxX=new Date(c).getTime()}else("numeric"===i.xaxis.type||"category"===i.xaxis.type&&!e.noLabelsProvided)&&(e.minX=e.minX-2,e.maxX=e.maxX+2);return e.isXNumeric&&e.seriesX.forEach((function(t,i){1===t.length&&t.push(e.seriesX[e.maxValsInArrayIndex][e.seriesX[e.maxValsInArrayIndex].length-1]);var s=t.slice();s.sort((function(t,e){return t-e})),s.forEach((function(t,s){if(s>0){var a=t-e.seriesX[i][s-1];e.minXDiff=Math.min(a,e.minXDiff)}}))})),{minX:e.minX,maxX:e.maxX}}},{key:"setZRange",value:function(){var t=this.w.globals;if(t.isDataXYZ)for(var e=0;e<t.series.length;e++)if(void 0!==t.seriesZ[e])for(var i=0;i<t.seriesZ[e].length;i++)null!==t.seriesZ[e][i]&&Utils.isNumber(t.seriesZ[e][i])&&(t.maxZ=Math.max(t.maxZ,t.seriesZ[e][i]),t.minZ=Math.min(t.minZ,t.seriesZ[e][i]))}}]),t}(),TimeScale=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w,this.timeScaleArray=[]}return _createClass(t,[{key:"calculateTimeScaleTicks",value:function(t,e){var i=this,s=this.w;if(s.globals.allSeriesCollapsed)return s.globals.labels=[],s.globals.timelineLabels=[],[];var a=new DateTime(this.ctx),r=(e-t)/864e5;this.determineInterval(r),s.globals.disableZoomIn=!1,s.globals.disableZoomOut=!1,r<.005?s.globals.disableZoomIn=!0:r>5e4&&(s.globals.disableZoomOut=!0);var n=a.getTimeUnitsfromTimestamp(t,e),o=s.globals.gridWidth/r,l=o/24,h=l/60,c=Math.floor(24*r),d=Math.floor(24*r*60),u=Math.floor(r),g=Math.floor(r/30),f=Math.floor(r/365),p={minMinute:n.minMinute,minHour:n.minHour,minDate:n.minDate,minMonth:n.minMonth,minYear:n.minYear},x={firstVal:p,currentMinute:p.minMinute,currentHour:p.minHour,currentMonthDate:p.minDate,currentDate:p.minDate,currentMonth:p.minMonth,currentYear:p.minYear,daysWidthOnXAxis:o,hoursWidthOnXAxis:l,minutesWidthOnXAxis:h,numberOfMinutes:d,numberOfHours:c,numberOfDays:u,numberOfMonths:g,numberOfYears:f};switch(this.tickInterval){case"years":this.generateYearScale(x);break;case"months":case"half_year":this.generateMonthScale(x);break;case"months_days":case"months_fortnight":case"days":case"week_days":this.generateDayScale(x);break;case"hours":this.generateHourScale(x);break;case"minutes":this.generateMinuteScale(x)}var b=this.timeScaleArray.map((function(t){var e={position:t.position,unit:t.unit,year:t.year,day:t.day?t.day:1,hour:t.hour?t.hour:0,month:t.month+1};return"month"===t.unit?_objectSpread2({},e,{day:1,value:t.value+1}):"day"===t.unit||"hour"===t.unit?_objectSpread2({},e,{value:t.value}):"minute"===t.unit?_objectSpread2({},e,{value:t.value,minute:t.value}):t}));return b.filter((function(t){var e=1,a=Math.ceil(s.globals.gridWidth/120),r=t.value;void 0!==s.config.xaxis.tickAmount&&(a=s.config.xaxis.tickAmount),b.length>a&&(e=Math.floor(b.length/a));var n=!1,o=!1;switch(i.tickInterval){case"half_year":e=7,"year"===t.unit&&(n=!0);break;case"months":e=1,"year"===t.unit&&(n=!0);break;case"months_fortnight":e=15,"year"!==t.unit&&"month"!==t.unit||(n=!0),30===r&&(o=!0);break;case"months_days":e=10,"month"===t.unit&&(n=!0),30===r&&(o=!0);break;case"week_days":e=8,"month"===t.unit&&(n=!0);break;case"days":e=1,"month"===t.unit&&(n=!0);break;case"hours":"day"===t.unit&&(n=!0);break;case"minutes":r%5!=0&&(o=!0)}if("minutes"===i.tickInterval||"hours"===i.tickInterval){if(!o)return!0}else if((r%e==0||n)&&!o)return!0}))}},{key:"recalcDimensionsBasedOnFormat",value:function(t,e){var i=this.w,s=this.formatDates(t),a=this.removeOverlappingTS(s);e?i.globals.invertedTimelineLabels=a.slice():i.globals.timelineLabels=a.slice(),new Dimensions(this.ctx).plotCoords()}},{key:"determineInterval",value:function(t){switch(!0){case t>1825:this.tickInterval="years";break;case t>800&&t<=1825:this.tickInterval="half_year";break;case t>180&&t<=800:this.tickInterval="months";break;case t>90&&t<=180:this.tickInterval="months_fortnight";break;case t>60&&t<=90:this.tickInterval="months_days";break;case t>30&&t<=60:this.tickInterval="week_days";break;case t>2&&t<=30:this.tickInterval="days";break;case t>.1&&t<=2:this.tickInterval="hours";break;case t<.1:this.tickInterval="minutes";break;default:this.tickInterval="days"}}},{key:"generateYearScale",value:function(t){var e=t.firstVal,i=t.currentMonth,s=t.currentYear,a=t.daysWidthOnXAxis,r=t.numberOfYears,n=e.minYear,o=0,l=new DateTime(this.ctx);if(e.minDate>1&&e.minMonth>0){var h=l.determineRemainingDaysOfYear(e.minYear,e.minMonth,e.minDate);o=(l.determineDaysOfYear(e.minYear)-h+1)*a,n=e.minYear+1,this.timeScaleArray.push({position:o,value:n,unit:"year",year:n,month:Utils.monthMod(i+1)})}else 1===e.minDate&&0===e.minMonth&&this.timeScaleArray.push({position:o,value:n,unit:"year",year:s,month:Utils.monthMod(i+1)});for(var c=n,d=o,u=0;u<r;u++)c++,d=l.determineDaysOfYear(c-1)*a+d,this.timeScaleArray.push({position:d,value:c,unit:"year",year:c,month:1})}},{key:"generateMonthScale",value:function(t){var e=t.firstVal,i=t.currentMonthDate,s=t.currentMonth,a=t.currentYear,r=t.daysWidthOnXAxis,n=t.numberOfMonths,o=s,l=0,h=new DateTime(this.ctx),c="month",d=0;if(e.minDate>1){l=(h.determineDaysOfMonths(s+1,e.minYear)-i+1)*r,o=Utils.monthMod(s+1);var u=a+d,g=Utils.monthMod(o),f=o;0===o&&(c="year",f=u,g=1,u+=d+=1),this.timeScaleArray.push({position:l,value:f,unit:c,year:u,month:g})}else this.timeScaleArray.push({position:l,value:o,unit:c,year:a,month:Utils.monthMod(s)});for(var p=o+1,x=l,b=0,m=1;b<n;b++,m++){0===(p=Utils.monthMod(p))?(c="year",d+=1):c="month";var v=a+Math.floor(p/12)+d;x=h.determineDaysOfMonths(p,v)*r+x;var y=0===p?v:p;this.timeScaleArray.push({position:x,value:y,unit:c,year:v,month:0===p?1:p}),p++}}},{key:"generateDayScale",value:function(t){var e=t.firstVal,i=t.currentMonth,s=t.currentYear,a=t.hoursWidthOnXAxis,r=t.numberOfDays,n=new DateTime(this.ctx),o="day",l=(24-e.minHour)*a,h=e.minDate+1,c=h,d=function(t,e,i){return t>n.determineDaysOfMonths(e+1,i)?(u=1,o="month",c=e+=1,e):e},u=h,g=d(u,i,s);this.timeScaleArray.push({position:l,value:c,unit:o,year:s,month:Utils.monthMod(g),day:u});for(var f=l,p=0;p<r;p++){o="day",g=d(u+=1,g,s+Math.floor(g/12)+0);var x=s+Math.floor(g/12)+0;f=24*a+f;var b=1===u?Utils.monthMod(g):u;this.timeScaleArray.push({position:f,value:b,unit:o,year:x,month:Utils.monthMod(g),day:b})}}},{key:"generateHourScale",value:function(t){var e=t.firstVal,i=t.currentDate,s=t.currentMonth,a=t.currentYear,r=t.minutesWidthOnXAxis,n=t.numberOfHours,o=new DateTime(this.ctx),l="hour",h=function(t,e){return t>o.determineDaysOfMonths(e+1,a)&&(p=1,e+=1),{month:e,date:p}},c=function(t,e){return t>o.determineDaysOfMonths(e+1,a)?e+=1:e},d=60-e.minMinute,u=d*r,g=e.minHour+1,f=g+1;60===d&&(u=0,f=(g=e.minHour)+1);var p=i,x=c(p,s);this.timeScaleArray.push({position:u,value:g,unit:l,day:p,hour:f,year:a,month:Utils.monthMod(x)});for(var b=u,m=0;m<n;m++){if(l="hour",f>=24)f=0,l="day",x=h(p+=1,x).month,x=c(p,x);var v=a+Math.floor(x/12)+0;b=0===f&&0===m?d*r:60*r+b;var y=0===f?p:f;this.timeScaleArray.push({position:b,value:y,unit:l,hour:f,day:p,year:v,month:Utils.monthMod(x)}),f++}}},{key:"generateMinuteScale",value:function(t){var e=t.firstVal,i=t.currentMinute,s=t.currentHour,a=t.currentDate,r=t.currentMonth,n=t.currentYear,o=t.minutesWidthOnXAxis,l=t.numberOfMinutes,h=o-(i-e.minMinute),c=e.minMinute+1,d=c+1,u=a,g=r,f=n,p=s;this.timeScaleArray.push({position:h,value:c,unit:"minute",day:u,hour:p,minute:d,year:f,month:Utils.monthMod(g)});for(var x=h,b=0;b<l;b++)d>=60&&(d=0,24===(p+=1)&&(p=0)),x=o+x,this.timeScaleArray.push({position:x,value:d,unit:"minute",hour:p,minute:d,day:u,year:n+Math.floor(g/12)+0,month:Utils.monthMod(g)}),d++}},{key:"createRawDateString",value:function(t,e){var i=t.year;return i+="-"+("0"+t.month.toString()).slice(-2),"day"===t.unit?i+="day"===t.unit?"-"+("0"+e).slice(-2):"-01":i+="-"+("0"+(t.day?t.day:"1")).slice(-2),"hour"===t.unit?i+="hour"===t.unit?"T"+("0"+e).slice(-2):"T00":i+="T"+("0"+(t.hour?t.hour:"0")).slice(-2),i+="minute"===t.unit?":"+("0"+e).slice(-2)+":00.000Z":":00:00.000Z"}},{key:"formatDates",value:function(t){var e=this,i=this.w;return t.map((function(t){var s=t.value.toString(),a=new DateTime(e.ctx),r=e.createRawDateString(t,s),n=new Date(Date.parse(r));if(void 0===i.config.xaxis.labels.format){var o="dd MMM",l=i.config.xaxis.labels.datetimeFormatter;"year"===t.unit&&(o=l.year),"month"===t.unit&&(o=l.month),"day"===t.unit&&(o=l.day),"hour"===t.unit&&(o=l.hour),"minute"===t.unit&&(o=l.minute),s=a.formatDate(n,o,!0,!1)}else s=a.formatDate(n,i.config.xaxis.labels.format);return{dateString:r,position:t.position,value:s,unit:t.unit,year:t.year,month:t.month}}))}},{key:"removeOverlappingTS",value:function(t){var e=this,i=new Graphics(this.ctx),s=0,a=t.map((function(a,r){if(r>0&&e.w.config.xaxis.labels.hideOverlappingLabels){var n=i.getTextRects(t[s].value).width,o=t[s].position;return a.position>o+n+10?(s=r,a):null}return a}));return a=a.filter((function(t){return null!==t}))}}]),t}(),Core=function(){function t(e,i){_classCallCheck(this,t),this.ctx=i,this.w=i.w,this.el=e}return _createClass(t,[{key:"setupElements",value:function(){var t=this.w.globals,e=this.w.config,i=e.chart.type;t.axisCharts=["line","area","bar","rangeBar","candlestick","radar","scatter","bubble","heatmap"].indexOf(i)>-1,t.xyCharts=["line","area","bar","rangeBar","candlestick","scatter","bubble"].indexOf(i)>-1,t.isBarHorizontal=("bar"===e.chart.type||"rangeBar"===e.chart.type)&&e.plotOptions.bar.horizontal,t.chartClass=".apexcharts"+t.cuid,t.dom.baseEl=this.el,t.dom.elWrap=document.createElement("div"),Graphics.setAttrs(t.dom.elWrap,{id:t.chartClass.substring(1),class:"apexcharts-canvas "+t.chartClass.substring(1)}),this.el.appendChild(t.dom.elWrap),t.dom.Paper=new window.SVG.Doc(t.dom.elWrap),t.dom.Paper.attr({class:"apexcharts-svg","xmlns:data":"ApexChartsNS",transform:"translate(".concat(e.chart.offsetX,", ").concat(e.chart.offsetY,")")}),t.dom.Paper.node.style.background=e.chart.background,this.setSVGDimensions(),t.dom.elGraphical=t.dom.Paper.group().attr({class:"apexcharts-inner apexcharts-graphical"}),t.dom.elDefs=t.dom.Paper.defs(),t.dom.elLegendWrap=document.createElement("div"),t.dom.elLegendWrap.classList.add("apexcharts-legend"),t.dom.elWrap.appendChild(t.dom.elLegendWrap),t.dom.Paper.add(t.dom.elGraphical),t.dom.elGraphical.add(t.dom.elDefs)}},{key:"plotChartType",value:function(t,e){var i=this.w,s=i.config,a=i.globals,r={series:[],i:[]},n={series:[],i:[]},o={series:[],i:[]},l={series:[],i:[]},h={series:[],i:[]},c={series:[],i:[]};a.series.map((function(e,s){void 0!==t[s].type?("column"===t[s].type||"bar"===t[s].type?(i.config.plotOptions.bar.horizontal=!1,h.series.push(e),h.i.push(s),i.globals.columnSeries=h.series):"area"===t[s].type?(n.series.push(e),n.i.push(s)):"line"===t[s].type?(r.series.push(e),r.i.push(s)):"scatter"===t[s].type?(o.series.push(e),o.i.push(s)):"bubble"===t[s].type?(l.series.push(e),l.i.push(s)):"candlestick"===t[s].type?(c.series.push(e),c.i.push(s)):console.warn("You have specified an unrecognized chart type. Available types for this propery are line/area/column/bar/scatter/bubble"),a.comboCharts=!0):(r.series.push(e),r.i.push(s))}));var d=new Line(this.ctx,e),u=new CandleStick(this.ctx,e),g=new Pie(this.ctx),f=new Radial(this.ctx),p=new RangeBar(this.ctx,e),x=new Radar(this.ctx),b=[];if(a.comboCharts){if(n.series.length>0&&b.push(d.draw(n.series,"area",n.i)),h.series.length>0)if(i.config.chart.stacked){var m=new BarStacked(this.ctx,e);b.push(m.draw(h.series,h.i))}else{var v=new Bar(this.ctx,e);b.push(v.draw(h.series,h.i))}if(r.series.length>0&&b.push(d.draw(r.series,"line",r.i)),c.series.length>0&&b.push(u.draw(c.series,c.i)),o.series.length>0){var y=new Line(this.ctx,e,!0);b.push(y.draw(o.series,"scatter",o.i))}if(l.series.length>0){var w=new Line(this.ctx,e,!0);b.push(w.draw(l.series,"bubble",l.i))}}else switch(s.chart.type){case"line":b=d.draw(a.series,"line");break;case"area":b=d.draw(a.series,"area");break;case"bar":if(s.chart.stacked)b=new BarStacked(this.ctx,e).draw(a.series);else b=new Bar(this.ctx,e).draw(a.series);break;case"candlestick":b=new CandleStick(this.ctx,e).draw(a.series);break;case"rangeBar":b=p.draw(a.series);break;case"heatmap":b=new HeatMap(this.ctx,e).draw(a.series);break;case"pie":case"donut":b=g.draw(a.series);break;case"radialBar":b=f.draw(a.series);break;case"radar":b=x.draw(a.series);break;default:b=d.draw(a.series)}return b}},{key:"setSVGDimensions",value:function(){var t=this.w.globals,e=this.w.config;t.svgWidth=e.chart.width,t.svgHeight=e.chart.height;var i=Utils.getDimensions(this.el),s=e.chart.width.toString().split(/[0-9]+/g).pop();if("%"===s?Utils.isNumber(i[0])&&(0===i[0].width&&(i=Utils.getDimensions(this.el.parentNode)),t.svgWidth=i[0]*parseInt(e.chart.width,10)/100):"px"!==s&&""!==s||(t.svgWidth=parseInt(e.chart.width,10)),"auto"!==t.svgHeight&&""!==t.svgHeight)if("%"===e.chart.height.toString().split(/[0-9]+/g).pop()){var a=Utils.getDimensions(this.el.parentNode);t.svgHeight=a[1]*parseInt(e.chart.height,10)/100}else t.svgHeight=parseInt(e.chart.height,10);else t.axisCharts?t.svgHeight=t.svgWidth/1.61:t.svgHeight=t.svgWidth/1.2;t.svgWidth<0&&(t.svgWidth=0),t.svgHeight<0&&(t.svgHeight=0),Graphics.setAttrs(t.dom.Paper.node,{width:t.svgWidth,height:t.svgHeight});var r=e.chart.sparkline.enabled?0:t.axisCharts?e.chart.parentHeightOffset:0;t.dom.Paper.node.parentNode.parentNode.style.minHeight=t.svgHeight+r+"px",t.dom.elWrap.style.width=t.svgWidth+"px",t.dom.elWrap.style.height=t.svgHeight+"px"}},{key:"shiftGraphPosition",value:function(){var t=this.w.globals,e=t.translateY,i={transform:"translate("+t.translateX+", "+e+")"};Graphics.setAttrs(t.dom.elGraphical.node,i)}},{key:"resizeNonAxisCharts",value:function(){var t=this.w,e=t.globals,i=0;"top"!==t.config.legend.position&&"bottom"!==t.config.legend.position||(i=new Legend(this.ctx).getLegendBBox().clwh+10);var s=t.globals.dom.baseEl.querySelector(".apexcharts-radialbar .apexcharts-tracks"),a=t.globals.dom.baseEl.querySelector(".apexcharts-radialbar .apexcharts-datalabels-group"),r=2*t.globals.radialSize;if(s){var n=Utils.getBoundingClientRect(s);if(r=n.bottom,a){var o=Utils.getBoundingClientRect(a),l=Math.max(n.bottom,o.bottom)-n.top+o.height;r=Math.max(2*t.globals.radialSize,l)}}var h=r+e.translateY+i+20;e.dom.elLegendForeign&&e.dom.elLegendForeign.setAttribute("height",h),e.dom.elWrap.style.height=h+"px",Graphics.setAttrs(e.dom.Paper.node,{height:h}),e.dom.Paper.node.parentNode.parentNode.style.minHeight=h+"px"}},{key:"coreCalculations",value:function(){new Range$1(this.ctx).init()}},{key:"resetGlobals",value:function(){var t=this,e=function(){return t.w.config.series.map((function(t){return[]}))},i=this.w.globals;i.series=[],i.seriesCandleO=[],i.seriesCandleH=[],i.seriesCandleL=[],i.seriesCandleC=[],i.seriesRangeStart=[],i.seriesRangeEnd=[],i.seriesRangeBarTimeline=[],i.seriesPercent=[],i.seriesX=[],i.seriesZ=[],i.seriesNames=[],i.seriesTotals=[],i.stackedSeriesTotals=[],i.labels=[],i.timelineLabels=[],i.noLabelsProvided=!1,i.timescaleTicks=[],i.resizeTimer=null,i.selectionResizeTimer=null,i.seriesXvalues=e(),i.seriesYvalues=e(),i.delayedElements=[],i.pointsArray=[],i.dataLabelsRects=[],i.isXNumeric=!1,i.isDataXYZ=!1,i.maxY=-Number.MAX_VALUE,i.minY=Number.MIN_VALUE,i.minYArr=[],i.maxYArr=[],i.maxX=-Number.MAX_VALUE,i.minX=Number.MAX_VALUE,i.initialmaxX=-Number.MAX_VALUE,i.initialminX=Number.MAX_VALUE,i.maxDate=0,i.minDate=Number.MAX_VALUE,i.minZ=Number.MAX_VALUE,i.maxZ=-Number.MAX_VALUE,i.minXDiff=Number.MAX_VALUE,i.yAxisScale=[],i.xAxisScale=null,i.xAxisTicksPositions=[],i.yLabelsCoords=[],i.yTitleCoords=[],i.xRange=0,i.yRange=[],i.zRange=0,i.dataPoints=0}},{key:"isMultipleY",value:function(){if(this.w.config.yaxis.constructor===Array&&this.w.config.yaxis.length>1)return this.w.globals.isMultipleYAxis=!0,!0}},{key:"xySettings",value:function(){var t=null,e=this.w;if(e.globals.axisCharts){if("back"===e.config.xaxis.crosshairs.position)new Crosshairs(this.ctx).drawXCrosshairs();if("back"===e.config.yaxis[0].crosshairs.position)new Crosshairs(this.ctx).drawYCrosshairs();if(t=new CoreUtils(this.ctx).getCalculatedRatios(),"datetime"===e.config.xaxis.type&&void 0===e.config.xaxis.labels.formatter){var i,s=new TimeScale(this.ctx);isFinite(e.globals.minX)&&isFinite(e.globals.maxX)&&!e.globals.isBarHorizontal?(i=s.calculateTimeScaleTicks(e.globals.minX,e.globals.maxX),s.recalcDimensionsBasedOnFormat(i,!1)):e.globals.isBarHorizontal&&(i=s.calculateTimeScaleTicks(e.globals.minY,e.globals.maxY),s.recalcDimensionsBasedOnFormat(i,!0))}}return t}},{key:"setupBrushHandler",value:function(){var t=this,e=this.w;if(e.config.chart.brush.enabled&&"function"!=typeof e.config.chart.events.selection){var i=e.config.chart.brush.targets||[e.config.chart.brush.target];i.forEach((function(e){var i=ApexCharts.getChartByID(e);i.w.globals.brushSource=t.ctx;var s=function(){t.ctx._updateOptions({chart:{selection:{xaxis:{min:i.w.globals.minX,max:i.w.globals.maxX}}}},!1,!1)};"function"!=typeof i.w.config.chart.events.zoomed&&(i.w.config.chart.events.zoomed=function(){s()}),"function"!=typeof i.w.config.chart.events.scrolled&&(i.w.config.chart.events.scrolled=function(){s()})})),e.config.chart.events.selection=function(t,s){i.forEach((function(t){var i=ApexCharts.getChartByID(t),a=Utils.clone(e.config.yaxis);e.config.chart.brush.autoScaleYaxis&&(a=new Range(i).autoScaleY(i,a,s));i._updateOptions({xaxis:{min:s.xaxis.min,max:s.xaxis.max},yaxis:a},!1,!1,!1,!1)}))}}}}]),t}(),Data=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w,this.twoDSeries=[],this.threeDSeries=[],this.twoDSeriesX=[],this.coreUtils=new CoreUtils(this.ctx)}return _createClass(t,[{key:"isMultiFormat",value:function(){return this.isFormatXY()||this.isFormat2DArray()}},{key:"isFormatXY",value:function(){var t=this.w.config.series.slice(),e=new Series(this.ctx);if(this.activeSeriesIndex=e.getActiveConfigSeriesIndex(),void 0!==t[this.activeSeriesIndex].data&&t[this.activeSeriesIndex].data.length>0&&null!==t[this.activeSeriesIndex].data[0]&&void 0!==t[this.activeSeriesIndex].data[0].x&&null!==t[this.activeSeriesIndex].data[0])return!0}},{key:"isFormat2DArray",value:function(){var t=this.w.config.series.slice(),e=new Series(this.ctx);if(this.activeSeriesIndex=e.getActiveConfigSeriesIndex(),void 0!==t[this.activeSeriesIndex].data&&t[this.activeSeriesIndex].data.length>0&&void 0!==t[this.activeSeriesIndex].data[0]&&null!==t[this.activeSeriesIndex].data[0]&&t[this.activeSeriesIndex].data[0].constructor===Array)return!0}},{key:"handleFormat2DArray",value:function(t,e){for(var i=this.w.config,s=this.w.globals,a=0;a<t[e].data.length;a++)if(void 0!==t[e].data[a][1]&&(Array.isArray(t[e].data[a][1])&&4===t[e].data[a][1].length?this.twoDSeries.push(Utils.parseNumber(t[e].data[a][1][3])):5===t[e].data[a].length?this.twoDSeries.push(Utils.parseNumber(t[e].data[a][4])):this.twoDSeries.push(Utils.parseNumber(t[e].data[a][1])),s.dataFormatXNumeric=!0),"datetime"===i.xaxis.type){var r=new Date(t[e].data[a][0]);r=new Date(r).getTime(),this.twoDSeriesX.push(r)}else this.twoDSeriesX.push(t[e].data[a][0]);for(var n=0;n<t[e].data.length;n++)void 0!==t[e].data[n][2]&&(this.threeDSeries.push(t[e].data[n][2]),s.isDataXYZ=!0)}},{key:"handleFormatXY",value:function(t,e){var i=this.w.config,s=this.w.globals,a=new DateTime(this.ctx),r=e;s.collapsedSeriesIndices.indexOf(e)>-1&&(r=this.activeSeriesIndex);for(var n=0;n<t[e].data.length;n++)void 0!==t[e].data[n].y&&(Array.isArray(t[e].data[n].y)?this.twoDSeries.push(Utils.parseNumber(t[e].data[n].y[t[e].data[n].y.length-1])):this.twoDSeries.push(Utils.parseNumber(t[e].data[n].y)));for(var o=0;o<t[r].data.length;o++){var l="string"==typeof t[r].data[o].x,h=!!a.isValidDate(t[r].data[o].x.toString());l||h?l?"datetime"!==i.xaxis.type||s.isRangeData?(this.fallbackToCategory=!0,this.twoDSeriesX.push(t[r].data[o].x)):this.twoDSeriesX.push(a.parseDate(t[r].data[o].x)):"datetime"===i.xaxis.type?this.twoDSeriesX.push(a.parseDate(t[r].data[o].x.toString())):(s.dataFormatXNumeric=!0,s.isXNumeric=!0,this.twoDSeriesX.push(parseFloat(t[r].data[o].x))):(s.isXNumeric=!0,s.dataFormatXNumeric=!0,this.twoDSeriesX.push(t[r].data[o].x))}if(t[e].data[0]&&void 0!==t[e].data[0].z){for(var c=0;c<t[e].data.length;c++)this.threeDSeries.push(t[e].data[c].z);s.isDataXYZ=!0}}},{key:"handleRangeData",value:function(t,e){var i=this.w.config,s=this.w.globals,a={};return this.isFormat2DArray()?a=this.handleRangeDataFormat("array",t,e):this.isFormatXY()&&(a=this.handleRangeDataFormat("xy",t,e)),s.seriesRangeStart.push(a.start),s.seriesRangeEnd.push(a.end),"datetime"===i.xaxis.type&&s.seriesRangeBarTimeline.push(a.rangeUniques),s.seriesRangeBarTimeline.forEach((function(t,e){t.forEach((function(t,e){t.y.forEach((function(e,i){for(var s=0;s<t.y.length;s++)if(i!==s){var a=e.y1,r=e.y2,n=t.y[s].y1;a<=t.y[s].y2&&n<=r&&(t.overlaps.indexOf(e.rangeName)<0&&t.overlaps.push(e.rangeName),t.overlaps.indexOf(t.y[s].rangeName)<0&&t.overlaps.push(t.y[s].rangeName))}}))}))})),a}},{key:"handleCandleStickData",value:function(t,e){var i=this.w.globals,s={};return this.isFormat2DArray()?s=this.handleCandleStickDataFormat("array",t,e):this.isFormatXY()&&(s=this.handleCandleStickDataFormat("xy",t,e)),i.seriesCandleO[e]=s.o,i.seriesCandleH[e]=s.h,i.seriesCandleL[e]=s.l,i.seriesCandleC[e]=s.c,s}},{key:"handleRangeDataFormat",value:function(t,e,i){var s=[],a=[],r=e[i].data.filter((function(t,e,i){return e===i.findIndex((function(e){return e.x===t.x}))})).map((function(t,e){return{x:t.x,overlaps:[],y:[]}})),n="Please provide [Start, End] values in valid format. Read more https://apexcharts.com/docs/series/#rangecharts",o=new Series(this.ctx).getActiveConfigSeriesIndex();if("array"===t){if(2!==e[o].data[0][1].length)throw new Error(n);for(var l=0;l<e[i].data.length;l++)s.push(e[i].data[l][1][0]),a.push(e[i].data[l][1][1])}else if("xy"===t){if(2!==e[o].data[0].y.length)throw new Error(n);for(var h=function(t){var n=Utils.randomId(),o=e[i].data[t].x,l={y1:e[i].data[t].y[0],y2:e[i].data[t].y[1],rangeName:n};e[i].data[t].rangeName=n;var h=r.findIndex((function(t){return t.x===o}));r[h].y.push(l),s.push(l.y1),a.push(l.y2)},c=0;c<e[i].data.length;c++)h(c)}return{start:s,end:a,rangeUniques:r}}},{key:"handleCandleStickDataFormat",value:function(t,e,i){var s=[],a=[],r=[],n=[],o="Please provide [Open, High, Low and Close] values in valid format. Read more https://apexcharts.com/docs/series/#candlestick";if("array"===t){if(!Array.isArray(e[i].data[0][1])&&5!==e[i].data[0].length||Array.isArray(e[i].data[0][1])&&4!==e[i].data[0][1].length)throw new Error(o);if(5===e[i].data[0].length)for(var l=0;l<e[i].data.length;l++)s.push(e[i].data[l][1]),a.push(e[i].data[l][2]),r.push(e[i].data[l][3]),n.push(e[i].data[l][4]);else for(var h=0;h<e[i].data.length;h++)s.push(e[i].data[h][1][0]),a.push(e[i].data[h][1][1]),r.push(e[i].data[h][1][2]),n.push(e[i].data[h][1][3])}else if("xy"===t){if(4!==e[i].data[0].y.length)throw new Error(o);for(var c=0;c<e[i].data.length;c++)s.push(e[i].data[c].y[0]),a.push(e[i].data[c].y[1]),r.push(e[i].data[c].y[2]),n.push(e[i].data[c].y[3])}return{o:s,h:a,l:r,c:n}}},{key:"parseDataAxisCharts",value:function(t){for(var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.ctx,s=this.w.config,a=this.w.globals,r=new DateTime(i),n=s.labels.length>0?s.labels.slice():s.xaxis.categories.slice(),o=function(){for(var t=0;t<n.length;t++)if("string"==typeof n[t]){if(!r.isValidDate(n[t]))throw new Error("You have provided invalid Date format. Please provide a valid JavaScript Date");e.twoDSeriesX.push(r.parseDate(n[t]))}else{if(13!==String(n[t]).length)throw new Error("Please provide a valid JavaScript timestamp");e.twoDSeriesX.push(n[t])}},l=0;l<t.length;l++){if(this.twoDSeries=[],this.twoDSeriesX=[],this.threeDSeries=[],void 0===t[l].data)return void console.error("It is a possibility that you may have not included 'data' property in series.");if("rangeBar"!==s.chart.type&&"rangeArea"!==s.chart.type&&"rangeBar"!==t[l].type&&"rangeArea"!==t[l].type||(a.isRangeData=!0,this.handleRangeData(t,l)),this.isMultiFormat())this.isFormat2DArray()?this.handleFormat2DArray(t,l):this.isFormatXY()&&this.handleFormatXY(t,l),"candlestick"!==s.chart.type&&"candlestick"!==t[l].type||this.handleCandleStickData(t,l),a.series.push(this.twoDSeries),a.labels.push(this.twoDSeriesX),a.seriesX.push(this.twoDSeriesX),this.fallbackToCategory||(a.isXNumeric=!0);else{"datetime"===s.xaxis.type?(a.isXNumeric=!0,o(),a.seriesX.push(this.twoDSeriesX)):"numeric"===s.xaxis.type&&(a.isXNumeric=!0,n.length>0&&(this.twoDSeriesX=n,a.seriesX.push(this.twoDSeriesX))),a.labels.push(this.twoDSeriesX);var h=t[l].data.map((function(t){return Utils.parseNumber(t)}));a.series.push(h)}a.seriesZ.push(this.threeDSeries),void 0!==t[l].name?a.seriesNames.push(t[l].name):a.seriesNames.push("series-"+parseInt(l+1,10))}return this.w}},{key:"parseDataNonAxisCharts",value:function(t){var e=this.w.globals,i=this.w.config;e.series=t.slice(),e.seriesNames=i.labels.slice();for(var s=0;s<e.series.length;s++)void 0===e.seriesNames[s]&&e.seriesNames.push("series-"+(s+1));return this.w}},{key:"handleExternalLabelsData",value:function(t){var e=this.w.config,i=this.w.globals;if(e.xaxis.categories.length>0)i.labels=e.xaxis.categories;else if(e.labels.length>0)i.labels=e.labels.slice();else if(this.fallbackToCategory)i.labels=i.labels[0],i.seriesRangeBarTimeline.length&&(i.seriesRangeBarTimeline.map((function(t){t.forEach((function(t){i.labels.indexOf(t.x)<0&&t.x&&i.labels.push(t.x)}))})),i.labels=i.labels.filter((function(t,e,i){return i.indexOf(t)===e})));else{var s=[];if(i.axisCharts){if(i.series.length>0)for(var a=0;a<i.series[i.maxValsInArrayIndex].length;a++)s.push(a+1);for(var r=0;r<t.length;r++)i.seriesX.push(s);i.isXNumeric=!0}if(0===s.length){s=[0,10];for(var n=0;n<t.length;n++)i.seriesX.push(s)}i.labels=s,i.noLabelsProvided=!0}}},{key:"parseData",value:function(t){var e=this.w,i=e.config,s=e.globals;if(this.excludeCollapsedSeriesInYAxis(),this.fallbackToCategory=!1,this.ctx.core.resetGlobals(),this.ctx.core.isMultipleY(),s.axisCharts?this.parseDataAxisCharts(t):this.parseDataNonAxisCharts(t),this.coreUtils.getLargestSeries(),"bar"===i.chart.type&&i.chart.stacked){var a=new Series(this.ctx);s.series=a.setNullSeriesToZeroValues(s.series)}this.coreUtils.getSeriesTotals(),s.axisCharts&&this.coreUtils.getStackedSeriesTotals(),this.coreUtils.getPercentSeries(),s.dataFormatXNumeric||s.isXNumeric&&("numeric"!==i.xaxis.type||0!==i.labels.length||0!==i.xaxis.categories.length)||this.handleExternalLabelsData(t)}},{key:"excludeCollapsedSeriesInYAxis",value:function(){var t=this,e=this.w;e.globals.ignoreYAxisIndexes=e.globals.collapsedSeries.map((function(e,i){if(t.w.globals.isMultipleYAxis)return e.index}))}}]),t}();function finallyConstructor(t){var e=this.constructor;return this.then((function(i){return e.resolve(t()).then((function(){return i}))}),(function(i){return e.resolve(t()).then((function(){return e.reject(i)}))}))}var setTimeoutFunc=setTimeout;function noop(){}function bind(t,e){return function(){t.apply(e,arguments)}}function Promise$1(t){if(!(this instanceof Promise$1))throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],doResolve(t,this)}function handle(t,e){for(;3===t._state;)t=t._value;0!==t._state?(t._handled=!0,Promise$1._immediateFn((function(){var i=1===t._state?e.onFulfilled:e.onRejected;if(null!==i){var s;try{s=i(t._value)}catch(t){return void reject(e.promise,t)}resolve(e.promise,s)}else(1===t._state?resolve:reject)(e.promise,t._value)}))):t._deferreds.push(e)}function resolve(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var i=e.then;if(e instanceof Promise$1)return t._state=3,t._value=e,void finale(t);if("function"==typeof i)return void doResolve(bind(i,e),t)}t._state=1,t._value=e,finale(t)}catch(e){reject(t,e)}}function reject(t,e){t._state=2,t._value=e,finale(t)}function finale(t){2===t._state&&0===t._deferreds.length&&Promise$1._immediateFn((function(){t._handled||Promise$1._unhandledRejectionFn(t._value)}));for(var e=0,i=t._deferreds.length;e<i;e++)handle(t,t._deferreds[e]);t._deferreds=null}function Handler(t,e,i){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=i}function doResolve(t,e){var i=!1;try{t((function(t){i||(i=!0,resolve(e,t))}),(function(t){i||(i=!0,reject(e,t))}))}catch(t){if(i)return;i=!0,reject(e,t)}}Promise$1.prototype.catch=function(t){return this.then(null,t)},Promise$1.prototype.then=function(t,e){var i=new this.constructor(noop);return handle(this,new Handler(t,e,i)),i},Promise$1.prototype.finally=finallyConstructor,Promise$1.all=function(t){return new Promise$1((function(e,i){if(!t||void 0===t.length)throw new TypeError("Promise.all accepts an array");var s=Array.prototype.slice.call(t);if(0===s.length)return e([]);var a=s.length;function r(t,n){try{if(n&&("object"==typeof n||"function"==typeof n)){var o=n.then;if("function"==typeof o)return void o.call(n,(function(e){r(t,e)}),i)}s[t]=n,0==--a&&e(s)}catch(t){i(t)}}for(var n=0;n<s.length;n++)r(n,s[n])}))},Promise$1.resolve=function(t){return t&&"object"==typeof t&&t.constructor===Promise$1?t:new Promise$1((function(e){e(t)}))},Promise$1.reject=function(t){return new Promise$1((function(e,i){i(t)}))},Promise$1.race=function(t){return new Promise$1((function(e,i){for(var s=0,a=t.length;s<a;s++)t[s].then(e,i)}))},Promise$1._immediateFn="function"==typeof setImmediate&&function(t){setImmediate(t)}||function(t){setTimeoutFunc(t,0)},Promise$1._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)};var Exports=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w}return _createClass(t,[{key:"getSvgString",value:function(){return this.w.globals.dom.Paper.svg()}},{key:"cleanup",value:function(){var t=this.w,e=t.globals.dom.baseEl.querySelector(".apexcharts-xcrosshairs"),i=t.globals.dom.baseEl.querySelector(".apexcharts-ycrosshairs");e&&(e.setAttribute("x1",-500),e.setAttribute("x2",-500)),i&&(i.setAttribute("y1",-100),i.setAttribute("y2",-100))}},{key:"svgUrl",value:function(){this.cleanup();var t=this.getSvgString(),e=new Blob([t],{type:"image/svg+xml;charset=utf-8"});return URL.createObjectURL(e)}},{key:"dataURI",value:function(){var t=this;return new Promise$1((function(e){var i=t.w;t.cleanup();var s=document.createElement("canvas");s.width=i.globals.svgWidth,s.height=parseInt(i.globals.dom.elWrap.style.height,10);var a="transparent"===i.config.chart.background?"#fff":i.config.chart.background,r=s.getContext("2d");r.fillStyle=a,r.fillRect(0,0,s.width,s.height);var n=window.URL||window.webkitURL||window,o=new Image;o.crossOrigin="anonymous";var l=t.getSvgString(),h="data:image/svg+xml,"+encodeURIComponent(l);o.onload=function(){r.drawImage(o,0,0),n.revokeObjectURL(h);var t=s.toDataURL("image/png");e(t)},o.src=h}))}},{key:"exportToSVG",value:function(){this.triggerDownload(this.svgUrl(),".svg")}},{key:"exportToPng",value:function(){var t=this;this.dataURI().then((function(e){t.triggerDownload(e,".png")}))}},{key:"triggerDownload",value:function(t,e){var i=document.createElement("a");i.href=t,i.download=this.w.globals.chartID+e,document.body.appendChild(i),i.click(),document.body.removeChild(i)}}]),t}(),Grid=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w;var i=this.w;this.xaxisLabels=i.globals.labels.slice(),this.isTimelineBar="datetime"===i.config.xaxis.type&&i.globals.seriesRangeBarTimeline.length,i.globals.timelineLabels.length>0&&(this.xaxisLabels=i.globals.timelineLabels.slice()),i.globals.invertedTimelineLabels.length>0&&(this.xaxisLabels=i.globals.invertedTimelineLabels.slice())}return _createClass(t,[{key:"drawGridArea",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this.w,i=new Graphics(this.ctx);null===t&&(t=i.group({class:"apexcharts-grid"}));var s=i.drawLine(e.globals.padHorizontal,1,e.globals.padHorizontal,e.globals.gridHeight,"transparent"),a=i.drawLine(e.globals.padHorizontal,e.globals.gridHeight,e.globals.gridWidth,e.globals.gridHeight,"transparent");return t.add(a),t.add(s),t}},{key:"drawGrid",value:function(){var t=this.w,e=new XAxis(this.ctx),i=new YAxis(this.ctx),s=this.w.globals,a=null;if(s.axisCharts){if(t.config.grid.show)a=this.renderGrid(),s.dom.elGraphical.add(a.el),this.drawGridArea(a.el);else{var r=this.drawGridArea();s.dom.elGraphical.add(r)}null!==a&&e.xAxisLabelCorrections(a.xAxisTickWidth),i.setYAxisTextAlignments()}}},{key:"createGridMask",value:function(){var t=this.w,e=t.globals,i=new Graphics(this.ctx),s=Array.isArray(t.config.stroke.width)?0:t.config.stroke.width;if(Array.isArray(t.config.stroke.width)){var a=0;t.config.stroke.width.forEach((function(t){a=Math.max(a,t)})),s=a}e.dom.elGridRectMask=document.createElementNS(e.SVGNS,"clipPath"),e.dom.elGridRectMask.setAttribute("id","gridRectMask".concat(e.cuid)),e.dom.elGridRectMarkerMask=document.createElementNS(e.SVGNS,"clipPath"),e.dom.elGridRectMarkerMask.setAttribute("id","gridRectMarkerMask".concat(e.cuid)),e.dom.elGridRect=i.drawRect(-s/2,-s/2,e.gridWidth+s,e.gridHeight+s,0,"#fff"),new CoreUtils(this).getLargestMarkerSize();var r=t.globals.markers.largestSize+1;e.dom.elGridRectMarker=i.drawRect(-r,-r,e.gridWidth+2*r,e.gridHeight+2*r,0,"#fff"),e.dom.elGridRectMask.appendChild(e.dom.elGridRect.node),e.dom.elGridRectMarkerMask.appendChild(e.dom.elGridRectMarker.node);var n=e.dom.baseEl.querySelector("defs");n.appendChild(e.dom.elGridRectMask),n.appendChild(e.dom.elGridRectMarkerMask)}},{key:"_drawGridLine",value:function(t){var e=t.x1,i=t.y1,s=t.x2,a=t.y2,r=t.parent,n=this.w,o=n.config.grid.strokeDashArray,l=new Graphics(this).drawLine(e,i,s,a,n.config.grid.borderColor,o);l.node.classList.add("apexcharts-gridline"),r.add(l)}},{key:"_drawGridBandRect",value:function(t){var e=t.c,i=t.x1,s=t.y1,a=t.x2,r=t.y2,n=t.type,o=t.parent,l=this.w,h=new Graphics(this.ctx);if("column"!==n||"datetime"!==l.config.xaxis.type){var c=l.config.grid[n].colors[e],d=h.drawRect(i,s,a,r,0,c,l.config.grid[n].opacity);o.add(d),d.node.classList.add("apexcharts-grid-".concat(n))}}},{key:"renderGrid",value:function(){var t=this,e=this.w,i=new Graphics(this.ctx),s=i.group({class:"apexcharts-grid"}),a=i.group({class:"apexcharts-gridlines-horizontal"}),r=i.group({class:"apexcharts-gridlines-vertical"});s.add(a),s.add(r);for(var n=8,o=0;o<e.globals.series.length&&(void 0!==e.globals.yAxisScale[o]&&(n=e.globals.yAxisScale[o].result.length-1),!(n>2));o++);var l;if(!e.globals.isBarHorizontal||this.isTimelineBar){if(l=this.xaxisLabels.length,e.config.grid.xaxis.lines.show||e.config.xaxis.axisTicks.show){var h=e.globals.padHorizontal,c=e.globals.gridHeight;e.globals.timelineLabels.length||e.globals.invertedTimelineLabels.length?function(i){for(var a=i.xCount,n=i.x1,o=i.y1,l=i.x2,h=i.y2,c=0;c<a;c++){n=t.xaxisLabels[c].position,l=t.xaxisLabels[c].position,e.config.grid.xaxis.lines.show&&n>0&&n<e.globals.gridWidth&&t._drawGridLine({x1:n,y1:o,x2:l,y2:h,parent:r});var d=new XAxis(t.ctx);c===a-1&&e.globals.skipLastTimelinelabel||d.drawXaxisTicks(n,s)}}({xCount:l,x1:h,y1:0,x2:void 0,y2:c}):function(i){for(var a=i.xCount,n=i.x1,o=i.y1,l=i.x2,h=i.y2,c=0;c<a;c++){var d=a;if(e.globals.isXNumeric&&(d-=1),l=n+=e.globals.gridWidth/d,c===d-1)break;e.config.grid.xaxis.lines.show&&t._drawGridLine({x1:n,y1:o,x2:l,y2:h,parent:r}),new XAxis(t.ctx).drawXaxisTicks(n,s)}}({xCount:l,x1:h,y1:0,x2:void 0,y2:c})}if(e.config.grid.yaxis.lines.show){var d=0,u=0,g=e.globals.gridWidth,f=n+1;this.isTimelineBar&&(f=e.globals.labels.length);for(var p=0;p<f;p++)this._drawGridLine({x1:0,y1:d,x2:g,y2:u,parent:a}),u=d+=e.globals.gridHeight/(this.isTimelineBar?f:n)}}else{if(l=n,e.config.grid.xaxis.lines.show||e.config.xaxis.axisTicks.show)for(var x,b=e.globals.padHorizontal,m=e.globals.gridHeight,v=0;v<l+1&&(x=b=b+e.globals.gridWidth/l+.3,v!==l-1);v++){e.config.grid.xaxis.lines.show&&this._drawGridLine({x1:b,y1:0,x2:x,y2:m,parent:r}),new XAxis(this.ctx).drawXaxisTicks(b,s)}if(e.config.grid.yaxis.lines.show)for(var y=0,w=0,k=e.globals.gridWidth,A=0;A<e.globals.dataPoints+1;A++)this._drawGridLine({x1:0,y1:y,x2:k,y2:w,parent:a}),w=y+=e.globals.gridHeight/e.globals.dataPoints}return this.isTimelineBar&&(n=e.globals.labels.length),this.drawGridBands(s,l,n),{el:s,xAxisTickWidth:e.globals.gridWidth/l}}},{key:"drawGridBands",value:function(t,e,i){var s=this.w;if(void 0!==s.config.grid.row.colors&&s.config.grid.row.colors.length>0)for(var a=0,r=s.globals.gridHeight/i,n=s.globals.gridWidth,o=0,l=0;o<i;o++,l++)l>=s.config.grid.row.colors.length&&(l=0),this._drawGridBandRect({c:l,x1:0,y1:a,x2:n,y2:r,parent:t,type:"row"}),a+=s.globals.gridHeight/i;if(void 0!==s.config.grid.column.colors&&s.config.grid.column.colors.length>0)for(var h="category"===s.config.xaxis.type||s.config.xaxis.convertedCatToNumeric?e-1:e,c=s.globals.padHorizontal,d=s.globals.padHorizontal+s.globals.gridWidth/h,u=s.globals.gridHeight,g=0,f=0;g<e;g++,f++)f>=s.config.grid.column.colors.length&&(f=0),this._drawGridBandRect({c:f,x1:c,y1:0,x2:d,y2:u,parent:t,type:"column"}),c+=s.globals.gridWidth/h}}]),t}(),Responsive=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w}return _createClass(t,[{key:"checkResponsiveConfig",value:function(t){var e=this,i=this.w,s=i.config;if(0!==s.responsive.length){var a=s.responsive.slice();a.sort((function(t,e){return t.breakpoint>e.breakpoint?1:e.breakpoint>t.breakpoint?-1:0})).reverse();var r=new Config({}),n=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},s=a[0].breakpoint,n=window.innerWidth>0?window.innerWidth:screen.width;if(n>s){var o=CoreUtils.extendArrayProps(r,i.globals.initialConfig);t=Utils.extend(o,t),t=Utils.extend(i.config,t),e.overrideResponsiveOptions(t)}else for(var l=0;l<a.length;l++)n<a[l].breakpoint&&(t=CoreUtils.extendArrayProps(r,a[l].options),t=Utils.extend(i.config,t),e.overrideResponsiveOptions(t))};if(t){var o=CoreUtils.extendArrayProps(r,t);o=Utils.extend(i.config,o),n(o=Utils.extend(o,t))}else n({})}}},{key:"overrideResponsiveOptions",value:function(t){var e=new Config(t).init();this.w.config=e}}]),t}(),Theme=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.colors=[],this.w=e.w;var i=this.w;this.isBarDistributed=i.config.plotOptions.bar.distributed&&("bar"===i.config.chart.type||"rangeBar"===i.config.chart.type)}return _createClass(t,[{key:"init",value:function(){this.setDefaultColors()}},{key:"setDefaultColors",value:function(){var t=this.w,e=new Utils;if(t.globals.dom.elWrap.classList.add(t.config.theme.mode),void 0===t.config.colors?t.globals.colors=this.predefined():(t.globals.colors=t.config.colors,t.globals.axisCharts&&"bar"!==t.config.chart.type&&Array.isArray(t.config.colors)&&t.config.colors.length>0&&t.config.colors.length===t.config.series.length&&(t.globals.colors=t.config.colors.map((function(e,i){return"function"==typeof e?e({value:t.globals.axisCharts?t.globals.series[i][0]?t.globals.series[i][0]:0:t.globals.series[i],seriesIndex:i,w:t}):e})))),t.config.theme.monochrome.enabled){var i=[],s=t.globals.series.length;this.isBarDistributed&&(s=t.globals.series[0].length*t.globals.series.length);for(var a=t.config.theme.monochrome.color,r=1/(s/t.config.theme.monochrome.shadeIntensity),n=t.config.theme.monochrome.shadeTo,o=0,l=0;l<s;l++){var h=void 0;"dark"===n?(h=e.shadeColor(-1*o,a),o+=r):(h=e.shadeColor(o,a),o+=r),i.push(h)}t.globals.colors=i.slice()}var c=t.globals.colors.slice();this.pushExtraColors(t.globals.colors),void 0===t.config.stroke.colors?t.globals.stroke.colors=c:t.globals.stroke.colors=t.config.stroke.colors,this.pushExtraColors(t.globals.stroke.colors),void 0===t.config.fill.colors?t.globals.fill.colors=c:t.globals.fill.colors=t.config.fill.colors,this.pushExtraColors(t.globals.fill.colors),void 0===t.config.dataLabels.style.colors?t.globals.dataLabels.style.colors=c:t.globals.dataLabels.style.colors=t.config.dataLabels.style.colors,this.pushExtraColors(t.globals.dataLabels.style.colors,50),void 0===t.config.plotOptions.radar.polygons.fill.colors?t.globals.radarPolygons.fill.colors=["dark"===t.config.theme.mode?"#202D48":"#fff"]:t.globals.radarPolygons.fill.colors=t.config.plotOptions.radar.polygons.fill.colors,this.pushExtraColors(t.globals.radarPolygons.fill.colors,20),void 0===t.config.markers.colors?t.globals.markers.colors=c:t.globals.markers.colors=t.config.markers.colors,this.pushExtraColors(t.globals.markers.colors)}},{key:"pushExtraColors",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=this.w,a=e||s.globals.series.length;if(null===i&&(i=this.isBarDistributed||"heatmap"===s.config.chart.type&&s.config.plotOptions.heatmap.colorScale.inverse),i&&(a=s.globals.series[0].length*s.globals.series.length),t.length<a)for(var r=a-t.length,n=0;n<r;n++)t.push(t[n])}},{key:"updateThemeOptions",value:function(t){t.chart=t.chart||{},t.tooltip=t.tooltip||{};var e=t.theme.mode||"light",i=t.theme.palette?t.theme.palette:"dark"===e?"palette4":"palette1",s=t.chart.foreColor?t.chart.foreColor:"dark"===e?"#f6f7f8":"#373d3f";return t.tooltip.theme=e,t.chart.foreColor=s,t.theme.palette=i,t}},{key:"predefined",value:function(){switch(this.w.config.theme.palette){case"palette1":this.colors=["#008FFB","#00E396","#FEB019","#FF4560","#775DD0"];break;case"palette2":this.colors=["#3f51b5","#03a9f4","#4caf50","#f9ce1d","#FF9800"];break;case"palette3":this.colors=["#33b2df","#546E7A","#d4526e","#13d8aa","#A5978B"];break;case"palette4":this.colors=["#4ecdc4","#c7f464","#81D4FA","#fd6a6a","#546E7A"];break;case"palette5":this.colors=["#2b908f","#f9a3a4","#90ee7e","#fa4443","#69d2e7"];break;case"palette6":this.colors=["#449DD1","#F86624","#EA3546","#662E9B","#C5D86D"];break;case"palette7":this.colors=["#D7263D","#1B998B","#2E294E","#F46036","#E2C044"];break;case"palette8":this.colors=["#662E9B","#F86624","#F9C80E","#EA3546","#43BCCD"];break;case"palette9":this.colors=["#5C4742","#A5978B","#8D5B4C","#5A2A27","#C4BBAF"];break;case"palette10":this.colors=["#A300D6","#7D02EB","#5653FE","#2983FF","#00B1F2"];break;default:this.colors=["#008FFB","#00E396","#FEB019","#FF4560","#775DD0"]}return this.colors}}]),t}(),Utils$1=function(){function t(e){_classCallCheck(this,t),this.w=e.w,this.ttCtx=e,this.ctx=e.ctx}return _createClass(t,[{key:"getNearestValues",value:function(t){var e=t.hoverArea,i=t.elGrid,s=t.clientX,a=t.clientY,r=t.hasBars,n=this.w,o=n.globals.gridWidth,l=o/(n.globals.dataPoints-1),h=i.getBoundingClientRect();(r&&n.globals.comboCharts||r)&&(l=o/n.globals.dataPoints);var c=s-h.left,d=a-h.top;c<0||d<0||c>n.globals.gridWidth||d>n.globals.gridHeight?(e.classList.remove("hovering-zoom"),e.classList.remove("hovering-pan")):n.globals.zoomEnabled?(e.classList.remove("hovering-pan"),e.classList.add("hovering-zoom")):n.globals.panEnabled&&(e.classList.remove("hovering-zoom"),e.classList.add("hovering-pan"));var u=Math.round(c/l);r&&(u=Math.ceil(c/l),u-=1);for(var g,f=null,p=null,x=[],b=0;b<n.globals.seriesXvalues.length;b++)x.push([n.globals.seriesXvalues[b][0]-1e-6].concat(n.globals.seriesXvalues[b]));return x=x.map((function(t){return t.filter((function(t){return t}))})),g=n.globals.seriesYvalues.map((function(t){return t.filter((function(t){return Utils.isNumber(t)}))})),n.globals.isXNumeric&&(f=(p=this.closestInMultiArray(c,d,x,g)).index,u=p.j,null!==f&&(x=n.globals.seriesXvalues[f],u=(p=this.closestInArray(c,x)).index)),n.globals.capturedSeriesIndex=null===f?-1:f,n.globals.capturedDataPointIndex=null===u?-1:u,(!u||u<1)&&(u=0),{capturedSeries:f,j:u,hoverX:c,hoverY:d}}},{key:"closestInMultiArray",value:function(t,e,i,s){var a=this.w,r=0,n=null,o=-1;a.globals.series.length>1?r=this.getFirstActiveXArray(i):n=0;var l=s[r][0],h=i[r][0],c=Math.abs(t-h),d=Math.abs(e-l),u=d+c;return s.map((function(a,r){a.map((function(a,l){var h=Math.abs(e-s[r][l]),g=Math.abs(t-i[r][l]),f=g+h;f<u&&(u=f,c=g,d=h,n=r,o=l)}))})),{index:n,j:o}}},{key:"getFirstActiveXArray",value:function(t){for(var e=0,i=new CoreUtils(this.ctx),s=t.map((function(t,e){return t.length>0?e:-1})),a=0;a<s.length;a++){var r=i.getSeriesTotalByIndex(a);if(-1!==s[a]&&0!==r&&!i.seriesHaveSameValues(a)){e=s[a];break}}return e}},{key:"closestInArray",value:function(t,e){for(var i=e[0],s=null,a=Math.abs(t-i),r=0;r<e.length;r++){var n=Math.abs(t-e[r]);n<a&&(a=n,s=r)}return{index:s}}},{key:"isXoverlap",value:function(t){var e=[],i=this.w.globals.seriesX.filter((function(t){return void 0!==t[0]}));if(i.length>0)for(var s=0;s<i.length-1;s++)void 0!==i[s][t]&&void 0!==i[s+1][t]&&i[s][t]!==i[s+1][t]&&e.push("unEqual");return 0===e.length}},{key:"isInitialSeriesSameLen",value:function(){for(var t=!0,e=this.w.globals.initialSeries,i=0;i<e.length-1;i++)if(e[i].data.length!==e[i+1].data.length){t=!1;break}return t}},{key:"getBarsHeight",value:function(t){return _toConsumableArray(t).reduce((function(t,e){return t+e.getBBox().height}),0)}},{key:"toggleAllTooltipSeriesGroups",value:function(t){var e=this.w,i=this.ttCtx;0===i.allTooltipSeriesGroups.length&&(i.allTooltipSeriesGroups=e.globals.dom.baseEl.querySelectorAll(".apexcharts-tooltip-series-group"));for(var s=i.allTooltipSeriesGroups,a=0;a<s.length;a++)"enable"===t?(s[a].classList.add("active"),s[a].style.display=e.config.tooltip.items.display):(s[a].classList.remove("active"),s[a].style.display="none")}}]),t}(),Labels=function(){function t(e){_classCallCheck(this,t),this.w=e.w,this.ctx=e.ctx,this.ttCtx=e,this.tooltipUtil=new Utils$1(e)}return _createClass(t,[{key:"drawSeriesTexts",value:function(t){var e=t.shared,i=void 0===e||e,s=t.ttItems,a=t.i,r=void 0===a?0:a,n=t.j,o=void 0===n?null:n,l=t.y1,h=t.y2,c=this.w;void 0!==c.config.tooltip.custom?Array.isArray(c.config.tooltip.custom)?this.handleCustomTooltip({i:r,j:o,y1:l,y2:h,isArray:!0}):this.handleCustomTooltip({i:r,j:o,y1:l,y2:h,isArray:!1}):this.toggleActiveInactiveSeries(i);var d=this.getValuesToPrint({i:r,j:o});this.printLabels({i:r,j:o,values:d,ttItems:s,shared:i});var u=this.ttCtx.getElTooltip();this.ttCtx.tooltipRect.ttWidth=u.getBoundingClientRect().width,this.ttCtx.tooltipRect.ttHeight=u.getBoundingClientRect().height}},{key:"printLabels",value:function(t){var e,i=t.i,s=t.j,a=t.values,r=t.ttItems,n=t.shared,o=this.w,l=a.xVal,h=a.zVal,c=a.xAxisTTVal,d="",u=o.globals.colors[i];null!==s&&o.config.plotOptions.bar.distributed&&(u=o.globals.colors[s]);for(var g=0,f=o.globals.series.length-1;g<o.globals.series.length;g++,f--){var p=this.getFormatters(i);d=this.getSeriesName({fn:p.yLbTitleFormatter,index:i,seriesIndex:i,j:s});var x=o.config.tooltip.inverseOrder?f:g;n?(p=this.getFormatters(x),d=this.getSeriesName({fn:p.yLbTitleFormatter,index:x,seriesIndex:i,j:s}),u=o.globals.colors[x],e=p.yLbFormatter(o.globals.series[x][s],{series:o.globals.series,seriesIndex:x,dataPointIndex:s,w:o}),(this.ttCtx.hasBars()&&o.config.chart.stacked&&0===o.globals.series[x][s]||void 0===o.globals.series[x][s])&&(e=void 0)):e=p.yLbFormatter(o.globals.series[i][s],{series:o.globals.series,seriesIndex:i,dataPointIndex:s,w:o}),null===s&&(e=p.yLbFormatter(o.globals.series[i],o)),this.DOMHandling({i:i,t:x,ttItems:r,values:{val:e,xVal:l,xAxisTTVal:c,zVal:h},seriesName:d,shared:n,pColor:u})}}},{key:"getFormatters",value:function(t){var e,i=this.w,s=i.globals.yLabelFormatters[t];return void 0!==i.globals.ttVal?Array.isArray(i.globals.ttVal)?(s=i.globals.ttVal[t]&&i.globals.ttVal[t].formatter,e=i.globals.ttVal[t]&&i.globals.ttVal[t].title&&i.globals.ttVal[t].title.formatter):(s=i.globals.ttVal.formatter,"function"==typeof i.globals.ttVal.title.formatter&&(e=i.globals.ttVal.title.formatter)):e=i.config.tooltip.y.title.formatter,"function"!=typeof s&&(s=i.globals.yLabelFormatters[0]?i.globals.yLabelFormatters[0]:function(t){return t}),"function"!=typeof e&&(e=function(t){return t}),{yLbFormatter:s,yLbTitleFormatter:e}}},{key:"getSeriesName",value:function(t){var e=t.fn,i=t.index,s=t.seriesIndex,a=t.j,r=this.w;return e(String(r.globals.seriesNames[i]),{series:r.globals.series,seriesIndex:s,dataPointIndex:a,w:r})}},{key:"DOMHandling",value:function(t){var e=t.i,i=t.t,s=t.ttItems,a=t.values,r=t.seriesName,n=t.shared,o=t.pColor,l=this.w,h=this.ttCtx,c=a.val,d=a.xVal,u=a.xAxisTTVal,g=a.zVal,f=null;f=s[i].children,l.config.tooltip.fillSeriesColor&&(s[i].style.backgroundColor=o,f[0].style.display="none"),h.showTooltipTitle&&(null===h.tooltipTitle&&(h.tooltipTitle=l.globals.dom.baseEl.querySelector(".apexcharts-tooltip-title")),h.tooltipTitle.innerHTML=d),h.blxaxisTooltip&&(h.xaxisTooltipText.innerHTML=""!==u?u:d);var p=s[i].querySelector(".apexcharts-tooltip-text-label");p&&(p.innerHTML=r?r+": ":"");var x=s[i].querySelector(".apexcharts-tooltip-text-value");(x&&(x.innerHTML=c),f[0]&&f[0].classList.contains("apexcharts-tooltip-marker")&&(l.config.tooltip.marker.fillColors&&Array.isArray(l.config.tooltip.marker.fillColors)&&(o=l.config.tooltip.marker.fillColors[e]),f[0].style.backgroundColor=o),l.config.tooltip.marker.show||(f[0].style.display="none"),null!==g)&&(s[i].querySelector(".apexcharts-tooltip-text-z-label").innerHTML=l.config.tooltip.z.title,s[i].querySelector(".apexcharts-tooltip-text-z-value").innerHTML=void 0!==g?g:"");n&&f[0]&&(null==c||l.globals.collapsedSeriesIndices.indexOf(i)>-1?f[0].parentNode.style.display="none":f[0].parentNode.style.display=l.config.tooltip.items.display)}},{key:"toggleActiveInactiveSeries",value:function(t){var e=this.w;if(t)this.tooltipUtil.toggleAllTooltipSeriesGroups("enable");else{this.tooltipUtil.toggleAllTooltipSeriesGroups("disable");var i=e.globals.dom.baseEl.querySelector(".apexcharts-tooltip-series-group");i&&(i.classList.add("active"),i.style.display=e.config.tooltip.items.display)}}},{key:"getValuesToPrint",value:function(t){var e=t.i,i=t.j,s=this.w,a=this.ctx.series.filteredSeriesX(),r="",n=null,o=null,l={series:s.globals.series,seriesIndex:e,dataPointIndex:i,w:s},h=s.globals.ttZFormatter;null===i?o=s.globals.series[e]:s.globals.isXNumeric?(r=a[e][i],0===a[e].length&&(r=a[this.tooltipUtil.getFirstActiveXArray(a)][i])):r=void 0!==s.globals.labels[i]?s.globals.labels[i]:"";var c=r;s.globals.isXNumeric&&"datetime"===s.config.xaxis.type?r=new Formatters(this.ctx).xLabelFormat(s.globals.ttKeyFormatter,c,c):s.globals.isBarHorizontal||(r=s.globals.xLabelFormatter(c,l));return void 0!==s.config.tooltip.x.formatter&&(r=s.globals.ttKeyFormatter(c,l)),s.globals.seriesZ.length>0&&s.globals.seriesZ[0].length>0&&(n=h(s.globals.seriesZ[e][i],s)),{val:o,xVal:r,xAxisTTVal:"function"==typeof s.config.xaxis.tooltip.formatter?s.globals.xaxisTooltipFormatter(c,l):r,zVal:n}}},{key:"handleCustomTooltip",value:function(t){var e=t.i,i=t.j,s=t.y1,a=t.y2,r=t.isArray,n=this.w,o=this.ttCtx.getElTooltip(),l=n.config.tooltip.custom;r&&l[e]&&(l=n.config.tooltip.custom[e]),o.innerHTML=l({ctx:this.ctx,series:n.globals.series,seriesIndex:e,dataPointIndex:i,y1:s,y2:a,w:n})}}]),t}(),Position=function(){function t(e){_classCallCheck(this,t),this.ttCtx=e,this.ctx=e.ctx,this.w=e.w}return _createClass(t,[{key:"moveXCrosshairs",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=this.ttCtx,s=this.w,a=i.getElXCrosshairs(),r=t-i.xcrosshairsWidth/2,n=s.globals.labels.slice().length;if(null!==e&&(r=s.globals.gridWidth/n*e),"tickWidth"===s.config.xaxis.crosshairs.width||"barWidth"===s.config.xaxis.crosshairs.width?r+i.xcrosshairsWidth>s.globals.gridWidth&&(r=s.globals.gridWidth-i.xcrosshairsWidth):null!==e&&(r+=s.globals.gridWidth/n/2),r<0&&(r=0),r>s.globals.gridWidth&&(r=s.globals.gridWidth),null!==a&&(a.setAttribute("x",r),a.setAttribute("x1",r),a.setAttribute("x2",r),a.setAttribute("y2",s.globals.gridHeight),a.classList.add("active")),i.blxaxisTooltip){var o=r;"tickWidth"!==s.config.xaxis.crosshairs.width&&"barWidth"!==s.config.xaxis.crosshairs.width||(o=r+i.xcrosshairsWidth/2),this.moveXAxisTooltip(o)}}},{key:"moveYCrosshairs",value:function(t){var e=this.ttCtx;null!==e.ycrosshairs&&(Graphics.setAttrs(e.ycrosshairs,{y1:t,y2:t}),Graphics.setAttrs(e.ycrosshairsHidden,{y1:t,y2:t}))}},{key:"moveXAxisTooltip",value:function(t){var e=this.w,i=this.ttCtx;if(null!==i.xaxisTooltip){i.xaxisTooltip.classList.add("active");var s=i.xaxisOffY+e.config.xaxis.tooltip.offsetY+e.globals.translateY+1+e.config.xaxis.offsetY;if(t-=i.xaxisTooltip.getBoundingClientRect().width/2,!isNaN(t)){t+=e.globals.translateX;var a;a=new Graphics(this.ctx).getTextRects(i.xaxisTooltipText.innerHTML),i.xaxisTooltipText.style.minWidth=a.width+"px",i.xaxisTooltip.style.left=t+"px",i.xaxisTooltip.style.top=s+"px"}}}},{key:"moveYAxisTooltip",value:function(t){var e=this.w,i=this.ttCtx;null===i.yaxisTTEls&&(i.yaxisTTEls=e.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxistooltip"));var s=parseInt(i.ycrosshairsHidden.getAttribute("y1"),10),a=e.globals.translateY+s,r=i.yaxisTTEls[t].getBoundingClientRect().height,n=e.globals.translateYAxisX[t]-2;e.config.yaxis[t].opposite&&(n-=26),a-=r/2,-1===e.globals.ignoreYAxisIndexes.indexOf(t)?(i.yaxisTTEls[t].classList.add("active"),i.yaxisTTEls[t].style.top=a+"px",i.yaxisTTEls[t].style.left=n+e.config.yaxis[t].tooltip.offsetX+"px"):i.yaxisTTEls[t].classList.remove("active")}},{key:"moveTooltip",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=this.w,a=this.ttCtx,r=a.getElTooltip(),n=a.tooltipRect,o=null!==i?parseFloat(i):1,l=parseFloat(t)+o+5,h=parseFloat(e)+o/2;if(l>s.globals.gridWidth/2&&(l=l-n.ttWidth-o-15),l>s.globals.gridWidth-n.ttWidth-10&&(l=s.globals.gridWidth-n.ttWidth),l<-20&&(l=-20),s.config.tooltip.followCursor){var c=a.getElGrid(),d=c.getBoundingClientRect();h=a.e.clientY+s.globals.translateY-d.top-n.ttHeight/2}var u=this.positionChecks(n,l,h);l=u.x,h=u.y,isNaN(l)||(l+=s.globals.translateX,r.style.left=l+"px",r.style.top=h+"px")}},{key:"positionChecks",value:function(t,e,i){var s=this.w;return t.ttHeight+i>s.globals.gridHeight&&(i=s.globals.gridHeight-t.ttHeight+s.globals.translateY),i<0&&(i=0),{x:e,y:i}}},{key:"moveMarkers",value:function(t,e){var i=this.w,s=this.ttCtx;if(i.globals.markers.size[t]>0)for(var a=i.globals.dom.baseEl.querySelectorAll(" .apexcharts-series[data\\:realIndex='".concat(t,"'] .apexcharts-marker")),r=0;r<a.length;r++)parseInt(a[r].getAttribute("rel"),10)===e&&(s.marker.resetPointsSize(),s.marker.enlargeCurrentPoint(e,a[r]));else s.marker.resetPointsSize(),this.moveDynamicPointOnHover(e,t)}},{key:"moveDynamicPointOnHover",value:function(t,e){var i,s,a=this.w,r=this.ttCtx,n=a.globals.pointsArray,o=a.config.markers.hover.size;if(void 0===o&&(o=a.globals.markers.size[e]+a.config.markers.hover.sizeOffset),!a.config.series[e].type||"column"!==a.config.series[e].type&&"candlestick"!==a.config.series[e].type){i=n[e][t][0],s=n[e][t][1]?n[e][t][1]:0;var l=a.globals.dom.baseEl.querySelector(".apexcharts-series[data\\:realIndex='".concat(e,"'] .apexcharts-series-markers circle"));l&&(l.setAttribute("r",o),l.setAttribute("cx",i),l.setAttribute("cy",s)),this.moveXCrosshairs(i),r.fixedTooltip||this.moveTooltip(i,s,o)}}},{key:"moveDynamicPointsOnHover",value:function(t){var e,i=this.ttCtx,s=i.w,a=0,r=0,n=s.globals.pointsArray;e=new Series(this.ctx).getActiveSeriesIndex();var o=s.config.markers.hover.size;void 0===o&&(o=s.globals.markers.size[e]+s.config.markers.hover.sizeOffset),n[e]&&(a=n[e][t][0],r=n[e][t][1]);var l=null,h=i.getAllMarkers();if(null!==(l=null!==h?h:s.globals.dom.baseEl.querySelectorAll(".apexcharts-series-markers circle")))for(var c=0;c<l.length;c++){var d=n[c];if(d&&d.length){var u=n[c][t][1];l[c].setAttribute("cx",a);var g=parseInt(l[c].parentNode.parentNode.parentNode.getAttribute("data:realIndex"),10);null!==u?(l[g]&&l[g].setAttribute("r",o),l[g]&&l[g].setAttribute("cy",u)):l[g]&&l[g].setAttribute("r",0)}}if(this.moveXCrosshairs(a),!i.fixedTooltip){var f=r||s.globals.gridHeight;this.moveTooltip(a,f,o)}}},{key:"moveStickyTooltipOverBars",value:function(t){var e,i=this.w,s=this.ttCtx,a=i.globals.columnSeries?i.globals.columnSeries.length:i.globals.series.length,r=a>=2&&a%2==0?Math.floor(a/2):Math.floor(a/2)+1,n=i.globals.dom.baseEl.querySelector(".apexcharts-bar-series .apexcharts-series[rel='".concat(r,"'] path[j='").concat(t,"'], .apexcharts-candlestick-series .apexcharts-series[rel='").concat(r,"'] path[j='").concat(t,"'], .apexcharts-rangebar-series .apexcharts-series[rel='").concat(r,"'] path[j='").concat(t,"']")),o=n?parseFloat(n.getAttribute("cx")):0,l=n?parseFloat(n.getAttribute("barWidth")):0;i.globals.isXNumeric?o-=a%2!=0?l/2:0:(o=s.xAxisTicksPositions[t-1]+s.dataPointsDividedWidth/2,isNaN(o)&&(o=s.xAxisTicksPositions[t]-s.dataPointsDividedWidth/2));var h=s.getElGrid().getBoundingClientRect();if(e=s.e.clientY-h.top-s.tooltipRect.ttHeight/2,this.moveXCrosshairs(o),!s.fixedTooltip){var c=e||i.globals.gridHeight;this.moveTooltip(o,c)}}}]),t}(),Marker=function(){function t(e){_classCallCheck(this,t),this.w=e.w,this.ttCtx=e,this.ctx=e.ctx,this.tooltipPosition=new Position(e)}return _createClass(t,[{key:"drawDynamicPoints",value:function(){for(var t=this.w,e=new Graphics(this.ctx),i=new Markers(this.ctx),s=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series"),a=0;a<s.length;a++){var r=parseInt(s[a].getAttribute("data:realIndex"),10),n=t.globals.dom.baseEl.querySelector(".apexcharts-series[data\\:realIndex='".concat(r,"'] .apexcharts-series-markers-wrap"));if(null!==n){var o=void 0,l="apexcharts-marker w".concat((Math.random()+1).toString(36).substring(4));"line"!==t.config.chart.type&&"area"!==t.config.chart.type||t.globals.comboCharts||t.config.tooltip.intersect||(l+=" no-pointer-events");var h=i.getMarkerConfig(l,r);(o=e.drawMarker(0,0,h)).node.setAttribute("default-marker-size",0);var c=document.createElementNS(t.globals.SVGNS,"g");c.classList.add("apexcharts-series-markers"),c.appendChild(o.node),n.appendChild(c)}}}},{key:"enlargeCurrentPoint",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=this.w;"bubble"!==a.config.chart.type&&this.newPointSize(t,e);var r=e.getAttribute("cx"),n=e.getAttribute("cy");if(null!==i&&null!==s&&(r=i,n=s),this.tooltipPosition.moveXCrosshairs(r),!this.fixedTooltip){if("radar"===a.config.chart.type){var o=this.ttCtx.getElGrid(),l=o.getBoundingClientRect();r=this.ttCtx.e.clientX-l.left}this.tooltipPosition.moveTooltip(r,n,a.config.markers.hover.size)}}},{key:"enlargePoints",value:function(t){for(var e=this.w,i=this.ttCtx,s=t,a=e.globals.dom.baseEl.querySelectorAll(".apexcharts-series:not(.apexcharts-series-collapsed) .apexcharts-marker"),r=e.config.markers.hover.size,n=0;n<a.length;n++){var o=a[n].getAttribute("rel"),l=a[n].getAttribute("index");if(void 0===r&&(r=e.globals.markers.size[l]+e.config.markers.hover.sizeOffset),s===parseInt(o,10)){this.newPointSize(s,a[n]);var h=a[n].getAttribute("cx"),c=a[n].getAttribute("cy");this.tooltipPosition.moveXCrosshairs(h),i.fixedTooltip||this.tooltipPosition.moveTooltip(h,c,r)}else this.oldPointSize(a[n])}}},{key:"newPointSize",value:function(t,e){var i=this.w,s=i.config.markers.hover.size,a=null;a=0===t?e.parentNode.firstChild:e.parentNode.lastChild;var r=parseInt(a.getAttribute("index"),10);void 0===s&&(s=i.globals.markers.size[r]+i.config.markers.hover.sizeOffset),a.setAttribute("r",s)}},{key:"oldPointSize",value:function(t){var e=parseFloat(t.getAttribute("default-marker-size"));t.setAttribute("r",e)}},{key:"resetPointsSize",value:function(){for(var t=this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-series:not(.apexcharts-series-collapsed) .apexcharts-marker"),e=0;e<t.length;e++){var i=parseFloat(t[e].getAttribute("default-marker-size"));Utils.isNumber(i)?t[e].setAttribute("r",i):t[e].setAttribute("r",0)}}}]),t}(),Intersect=function(){function t(e){_classCallCheck(this,t),this.w=e.w,this.ttCtx=e}return _createClass(t,[{key:"getAttr",value:function(t,e){return parseFloat(t.target.getAttribute(e))}},{key:"handleHeatTooltip",value:function(t){var e=t.e,i=t.opt,s=t.x,a=t.y,r=this.ttCtx,n=this.w;if(e.target.classList.contains("apexcharts-heatmap-rect")){var o=this.getAttr(e,"i"),l=this.getAttr(e,"j"),h=this.getAttr(e,"cx"),c=this.getAttr(e,"cy"),d=this.getAttr(e,"width"),u=this.getAttr(e,"height");if(r.tooltipLabels.drawSeriesTexts({ttItems:i.ttItems,i:o,j:l,shared:!1}),n.globals.capturedSeriesIndex=o,n.globals.capturedDataPointIndex=l,s=h+r.tooltipRect.ttWidth/2+d,a=c+r.tooltipRect.ttHeight/2-u/2,r.tooltipPosition.moveXCrosshairs(h+d/2),s>n.globals.gridWidth/2&&(s=h-r.tooltipRect.ttWidth/2+d),r.w.config.tooltip.followCursor){var g=r.getElGrid().getBoundingClientRect();a=r.e.clientY-g.top+n.globals.translateY/2-10}}return{x:s,y:a}}},{key:"handleMarkerTooltip",value:function(t){var e,i,s=t.e,a=t.opt,r=t.x,n=t.y,o=this.w,l=this.ttCtx;if(s.target.classList.contains("apexcharts-marker")){var h=parseInt(a.paths.getAttribute("cx"),10),c=parseInt(a.paths.getAttribute("cy"),10),d=parseFloat(a.paths.getAttribute("val"));if(i=parseInt(a.paths.getAttribute("rel"),10),e=parseInt(a.paths.parentNode.parentNode.parentNode.getAttribute("rel"),10)-1,l.intersect){var u=Utils.findAncestor(a.paths,"apexcharts-series");u&&(e=parseInt(u.getAttribute("data:realIndex"),10))}if(l.tooltipLabels.drawSeriesTexts({ttItems:a.ttItems,i:e,j:i,shared:!l.showOnIntersect&&o.config.tooltip.shared}),"mouseup"===s.type&&l.markerClick(s,e,i),o.globals.capturedSeriesIndex=e,o.globals.capturedDataPointIndex=i,r=h,n=c+o.globals.translateY-1.4*l.tooltipRect.ttHeight,l.w.config.tooltip.followCursor){var g=l.getElGrid().getBoundingClientRect();n=l.e.clientY+o.globals.translateY-g.top}d<0&&(n=c),l.marker.enlargeCurrentPoint(i,a.paths,r,n)}return{x:r,y:n}}},{key:"handleBarTooltip",value:function(t){var e,i,s=t.e,a=t.opt,r=this.w,n=this.ttCtx,o=n.getElTooltip(),l=0,h=0,c=0,d=this.getBarTooltipXY({e:s,opt:a});e=d.i;var u=d.barHeight,g=d.j;if(r.globals.capturedSeriesIndex=e,r.globals.capturedDataPointIndex=g,r.globals.isBarHorizontal&&n.hasBars()||!r.config.tooltip.shared?(h=d.x,c=d.y,i=Array.isArray(r.config.stroke.width)?r.config.stroke.width[e]:r.config.stroke.width,l=h):r.globals.comboCharts||r.config.tooltip.shared||(l/=2),isNaN(c)&&(c=r.globals.svgHeight-n.tooltipRect.ttHeight),h+n.tooltipRect.ttWidth>r.globals.gridWidth?h-=n.tooltipRect.ttWidth:h<0&&(h+=n.tooltipRect.ttWidth),n.w.config.tooltip.followCursor){var f=n.getElGrid().getBoundingClientRect();c=n.e.clientY-f.top}if(null===n.tooltip&&(n.tooltip=r.globals.dom.baseEl.querySelector(".apexcharts-tooltip")),r.config.tooltip.shared||(r.globals.comboChartsHasBars?n.tooltipPosition.moveXCrosshairs(l+i/2):n.tooltipPosition.moveXCrosshairs(l)),!n.fixedTooltip&&(!r.config.tooltip.shared||r.globals.isBarHorizontal&&n.hasBars())){var p=r.globals.isMultipleYAxis?r.config.yaxis[x]&&r.config.yaxis[x].reversed:r.config.yaxis[0].reversed;p&&(h=r.globals.gridWidth-h),o.style.left=h+r.globals.translateX+"px";var x=parseInt(a.paths.parentNode.getAttribute("data:realIndex"),10);!p||r.globals.isBarHorizontal&&n.hasBars()||(c=c+u-2*(r.globals.series[e][g]<0?u:0)),n.tooltipRect.ttHeight+c>r.globals.gridHeight?(c=r.globals.gridHeight-n.tooltipRect.ttHeight+r.globals.translateY,o.style.top=c+"px"):o.style.top=c+r.globals.translateY-n.tooltipRect.ttHeight/2+"px"}}},{key:"getBarTooltipXY",value:function(t){var e=t.e,i=t.opt,s=this.w,a=null,r=this.ttCtx,n=0,o=0,l=0,h=0,c=0,d=e.target.classList;if(d.contains("apexcharts-bar-area")||d.contains("apexcharts-candlestick-area")||d.contains("apexcharts-rangebar-area")){var u=e.target,g=u.getBoundingClientRect(),f=i.elGrid.getBoundingClientRect(),p=g.height;c=g.height;var x=g.width,b=parseInt(u.getAttribute("cx"),10),m=parseInt(u.getAttribute("cy"),10);h=parseFloat(u.getAttribute("barWidth"));var v="touchmove"===e.type?e.touches[0].clientX:e.clientX;a=parseInt(u.getAttribute("j"),10),n=parseInt(u.parentNode.getAttribute("rel"),10)-1;var y=u.getAttribute("data-range-y1"),w=u.getAttribute("data-range-y2");s.globals.comboCharts&&(n=parseInt(u.parentNode.getAttribute("data:realIndex"),10)),r.tooltipLabels.drawSeriesTexts({ttItems:i.ttItems,i:n,j:a,y1:y?parseInt(y,10):null,y2:w?parseInt(w,10):null,shared:!r.showOnIntersect&&s.config.tooltip.shared}),s.config.tooltip.followCursor?s.globals.isBarHorizontal?(o=v-f.left+15,l=m-r.dataPointsDividedHeight+p/2-r.tooltipRect.ttHeight/2):(o=s.globals.isXNumeric?b-x/2:b-r.dataPointsDividedWidth+x/2,l=e.clientY-f.top-r.tooltipRect.ttHeight/2-15):s.globals.isBarHorizontal?((o=b)<r.xyRatios.baseLineInvertedY&&(o=b-r.tooltipRect.ttWidth),l=m-r.dataPointsDividedHeight+p/2-r.tooltipRect.ttHeight/2):(o=s.globals.isXNumeric?b-x/2:b-r.dataPointsDividedWidth+x/2,l=m)}return{x:o,y:l,barHeight:c,barWidth:h,i:n,j:a}}}]),t}(),AxesTooltip=function(){function t(e){_classCallCheck(this,t),this.w=e.w,this.ttCtx=e}return _createClass(t,[{key:"drawXaxisTooltip",value:function(){var t=this.w,e=this.ttCtx,i="bottom"===t.config.xaxis.position;e.xaxisOffY=i?t.globals.gridHeight+1:1;var s=i?"apexcharts-xaxistooltip apexcharts-xaxistooltip-bottom":"apexcharts-xaxistooltip apexcharts-xaxistooltip-top",a=t.globals.dom.elWrap;e.blxaxisTooltip&&(null===t.globals.dom.baseEl.querySelector(".apexcharts-xaxistooltip")&&(e.xaxisTooltip=document.createElement("div"),e.xaxisTooltip.setAttribute("class",s+" "+t.config.tooltip.theme),a.appendChild(e.xaxisTooltip),e.xaxisTooltipText=document.createElement("div"),e.xaxisTooltipText.classList.add("apexcharts-xaxistooltip-text"),e.xaxisTooltipText.style.fontFamily=t.config.xaxis.tooltip.style.fontFamily||t.config.chart.fontFamily,e.xaxisTooltipText.style.fontSize=t.config.xaxis.tooltip.style.fontSize,e.xaxisTooltip.appendChild(e.xaxisTooltipText)))}},{key:"drawYaxisTooltip",value:function(){for(var t=this.w,e=this.ttCtx,i=function(i){var s=t.config.yaxis[i].opposite||t.config.yaxis[i].crosshairs.opposite;e.yaxisOffX=s?t.globals.gridWidth+1:1;var a="apexcharts-yaxistooltip apexcharts-yaxistooltip-".concat(i,s?" apexcharts-yaxistooltip-right":" apexcharts-yaxistooltip-left");t.globals.yAxisSameScaleIndices.map((function(e,s){e.map((function(e,s){s===i&&(a+=t.config.yaxis[s].show?" ":" apexcharts-yaxistooltip-hidden")}))}));var r=t.globals.dom.elWrap;e.blyaxisTooltip&&(null===t.globals.dom.baseEl.querySelector(".apexcharts-yaxistooltip apexcharts-yaxistooltip-".concat(i))&&(e.yaxisTooltip=document.createElement("div"),e.yaxisTooltip.setAttribute("class",a+" "+t.config.tooltip.theme),r.appendChild(e.yaxisTooltip),0===i&&(e.yaxisTooltipText=[]),e.yaxisTooltipText.push(document.createElement("div")),e.yaxisTooltipText[i].classList.add("apexcharts-yaxistooltip-text"),e.yaxisTooltip.appendChild(e.yaxisTooltipText[i])))},s=0;s<t.config.yaxis.length;s++)i(s)}},{key:"setXCrosshairWidth",value:function(){var t=this.w,e=this.ttCtx,i=e.getElXCrosshairs();if(e.xcrosshairsWidth=parseInt(t.config.xaxis.crosshairs.width,10),t.globals.comboCharts){var s=t.globals.dom.baseEl.querySelector(".apexcharts-bar-area");if(null!==s&&"barWidth"===t.config.xaxis.crosshairs.width){var a=parseFloat(s.getAttribute("barWidth"));e.xcrosshairsWidth=a}else if("tickWidth"===t.config.xaxis.crosshairs.width){var r=t.globals.labels.length;e.xcrosshairsWidth=t.globals.gridWidth/r}}else if("tickWidth"===t.config.xaxis.crosshairs.width){var n=t.globals.labels.length;e.xcrosshairsWidth=t.globals.gridWidth/n}else if("barWidth"===t.config.xaxis.crosshairs.width){var o=t.globals.dom.baseEl.querySelector(".apexcharts-bar-area");if(null!==o){var l=parseFloat(o.getAttribute("barWidth"));e.xcrosshairsWidth=l}else e.xcrosshairsWidth=1}t.globals.isBarHorizontal&&(e.xcrosshairsWidth=0),null!==i&&e.xcrosshairsWidth>0&&i.setAttribute("width",e.xcrosshairsWidth)}},{key:"handleYCrosshair",value:function(){var t=this.w,e=this.ttCtx;e.ycrosshairs=t.globals.dom.baseEl.querySelector(".apexcharts-ycrosshairs"),e.ycrosshairsHidden=t.globals.dom.baseEl.querySelector(".apexcharts-ycrosshairs-hidden")}},{key:"drawYaxisTooltipText",value:function(t,e,i){var s=this.ttCtx,a=this.w,r=a.globals.yLabelFormatters[t];if(s.blyaxisTooltip){var n=s.getElGrid().getBoundingClientRect(),o=(e-n.top)*i.yRatio[t],l=a.globals.maxYArr[t]-a.globals.minYArr[t],h=a.globals.minYArr[t]+(l-o);s.tooltipPosition.moveYCrosshairs(e-n.top),s.yaxisTooltipText[t].innerHTML=r(h),s.tooltipPosition.moveYAxisTooltip(t)}}}]),t}(),Tooltip=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w;var i=this.w;this.tConfig=i.config.tooltip,this.tooltipUtil=new Utils$1(this),this.tooltipLabels=new Labels(this),this.tooltipPosition=new Position(this),this.marker=new Marker(this),this.intersect=new Intersect(this),this.axesTooltip=new AxesTooltip(this),this.showOnIntersect=this.tConfig.intersect,this.showTooltipTitle=this.tConfig.x.show,this.fixedTooltip=this.tConfig.fixed.enabled,this.xaxisTooltip=null,this.yaxisTTEls=null,this.isBarShared=!i.globals.isBarHorizontal&&this.tConfig.shared}return _createClass(t,[{key:"getElTooltip",value:function(t){return t||(t=this),t.w.globals.dom.baseEl.querySelector(".apexcharts-tooltip")}},{key:"getElXCrosshairs",value:function(){return this.w.globals.dom.baseEl.querySelector(".apexcharts-xcrosshairs")}},{key:"getElGrid",value:function(){return this.w.globals.dom.baseEl.querySelector(".apexcharts-grid")}},{key:"drawTooltip",value:function(t){var e=this.w;this.xyRatios=t,this.blxaxisTooltip=e.config.xaxis.tooltip.enabled&&e.globals.axisCharts,this.blyaxisTooltip=e.config.yaxis[0].tooltip.enabled&&e.globals.axisCharts,this.allTooltipSeriesGroups=[],e.globals.axisCharts||(this.showTooltipTitle=!1);var i=document.createElement("div");if(i.classList.add("apexcharts-tooltip"),i.classList.add(this.tConfig.theme),e.globals.dom.elWrap.appendChild(i),e.globals.axisCharts){this.axesTooltip.drawXaxisTooltip(),this.axesTooltip.drawYaxisTooltip(),this.axesTooltip.setXCrosshairWidth(),this.axesTooltip.handleYCrosshair();var s=new XAxis(this.ctx);this.xAxisTicksPositions=s.getXAxisTicksPositions()}if((e.globals.comboCharts&&!this.tConfig.shared||this.tConfig.intersect&&!this.tConfig.shared||("bar"===e.config.chart.type||"rangeBar"===e.config.chart.type)&&!this.tConfig.shared)&&(this.showOnIntersect=!0),0!==e.config.markers.size&&0!==e.globals.markers.largestSize||this.marker.drawDynamicPoints(this),e.globals.collapsedSeries.length!==e.globals.series.length){this.dataPointsDividedHeight=e.globals.gridHeight/e.globals.dataPoints,this.dataPointsDividedWidth=e.globals.gridWidth/e.globals.dataPoints,this.showTooltipTitle&&(this.tooltipTitle=document.createElement("div"),this.tooltipTitle.classList.add("apexcharts-tooltip-title"),this.tooltipTitle.style.fontFamily=this.tConfig.style.fontFamily||e.config.chart.fontFamily,this.tooltipTitle.style.fontSize=this.tConfig.style.fontSize,i.appendChild(this.tooltipTitle));var a=e.globals.series.length;(e.globals.xyCharts||e.globals.comboCharts)&&this.tConfig.shared&&(a=this.showOnIntersect?1:e.globals.series.length),this.legendLabels=e.globals.dom.baseEl.querySelectorAll(".apexcharts-legend-text"),this.ttItems=this.createTTElements(a),this.addSVGEvents()}}},{key:"createTTElements",value:function(t){for(var e=this.w,i=[],s=this.getElTooltip(),a=0;a<t;a++){var r=document.createElement("div");r.classList.add("apexcharts-tooltip-series-group"),this.tConfig.shared&&this.tConfig.enabledOnSeries&&Array.isArray(this.tConfig.enabledOnSeries)&&this.tConfig.enabledOnSeries.indexOf(a)<0&&r.classList.add("apexcharts-tooltip-series-group-hidden");var n=document.createElement("span");n.classList.add("apexcharts-tooltip-marker"),n.style.backgroundColor=e.globals.colors[a],r.appendChild(n);var o=document.createElement("div");o.classList.add("apexcharts-tooltip-text"),o.style.fontFamily=this.tConfig.style.fontFamily||e.config.chart.fontFamily,o.style.fontSize=this.tConfig.style.fontSize;var l=document.createElement("div");l.classList.add("apexcharts-tooltip-y-group");var h=document.createElement("span");h.classList.add("apexcharts-tooltip-text-label"),l.appendChild(h);var c=document.createElement("span");c.classList.add("apexcharts-tooltip-text-value"),l.appendChild(c);var d=document.createElement("div");d.classList.add("apexcharts-tooltip-z-group");var u=document.createElement("span");u.classList.add("apexcharts-tooltip-text-z-label"),d.appendChild(u);var g=document.createElement("span");g.classList.add("apexcharts-tooltip-text-z-value"),d.appendChild(g),o.appendChild(l),o.appendChild(d),r.appendChild(o),s.appendChild(r),i.push(r)}return i}},{key:"addSVGEvents",value:function(){var t=this.w,e=t.config.chart.type,i=this.getElTooltip(),s=!("bar"!==e&&"candlestick"!==e&&"rangeBar"!==e),a=t.globals.dom.Paper.node,r=this.getElGrid();r&&(this.seriesBound=r.getBoundingClientRect());var n,o=[],l=[],h={hoverArea:a,elGrid:r,tooltipEl:i,tooltipY:o,tooltipX:l,ttItems:this.ttItems};if(t.globals.axisCharts&&("area"===e||"line"===e||"scatter"===e||"bubble"===e?n=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series[data\\:longestSeries='true'] .apexcharts-marker"):s?n=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series .apexcharts-bar-area, .apexcharts-series .apexcharts-candlestick-area, .apexcharts-series .apexcharts-rangebar-area"):"heatmap"===e?n=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series .apexcharts-heatmap"):"radar"===e&&(n=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series .apexcharts-marker")),n&&n.length))for(var c=0;c<n.length;c++)o.push(n[c].getAttribute("cy")),l.push(n[c].getAttribute("cx"));if(t.globals.xyCharts&&!this.showOnIntersect||t.globals.comboCharts&&!this.showOnIntersect||s&&this.hasBars()&&this.tConfig.shared)this.addPathsEventListeners([a],h);else if(s&&!t.globals.comboCharts)this.addBarsEventListeners(h);else if("bubble"===e||"scatter"===e||"radar"===e||this.showOnIntersect&&("area"===e||"line"===e))this.addPointsEventsListeners(h);else if(!t.globals.axisCharts||"heatmap"===e){var d=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series");this.addPathsEventListeners(d,h)}if(this.showOnIntersect){var u=t.globals.dom.baseEl.querySelectorAll(".apexcharts-line-series .apexcharts-marker");u.length>0&&this.addPathsEventListeners(u,h);var g=t.globals.dom.baseEl.querySelectorAll(".apexcharts-area-series .apexcharts-marker");g.length>0&&this.addPathsEventListeners(g,h),this.hasBars()&&!this.tConfig.shared&&this.addBarsEventListeners(h)}}},{key:"drawFixedTooltipRect",value:function(){var t=this.w,e=this.getElTooltip(),i=e.getBoundingClientRect(),s=i.width+10,a=i.height+10,r=this.tConfig.fixed.offsetX,n=this.tConfig.fixed.offsetY;return this.tConfig.fixed.position.toLowerCase().indexOf("right")>-1&&(r=r+t.globals.svgWidth-s+10),this.tConfig.fixed.position.toLowerCase().indexOf("bottom")>-1&&(n=n+t.globals.svgHeight-a-10),e.style.left=r+"px",e.style.top=n+"px",{x:r,y:n,ttWidth:s,ttHeight:a}}},{key:"addPointsEventsListeners",value:function(t){var e=this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-series-markers .apexcharts-marker");this.addPathsEventListeners(e,t)}},{key:"addBarsEventListeners",value:function(t){var e=this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-bar-area, .apexcharts-candlestick-area, .apexcharts-rangebar-area");this.addPathsEventListeners(e,t)}},{key:"addPathsEventListeners",value:function(t,e){for(var i=this,s=this,a=function(a){var r={paths:t[a],tooltipEl:e.tooltipEl,tooltipY:e.tooltipY,tooltipX:e.tooltipX,elGrid:e.elGrid,hoverArea:e.hoverArea,ttItems:e.ttItems};i.w.globals.tooltipOpts=r;["mousemove","mouseup","touchmove","mouseout","touchend"].map((function(e){return t[a].addEventListener(e,s.seriesHover.bind(s,r),{capture:!1,passive:!0})}))},r=0;r<t.length;r++)a(r)}},{key:"seriesHover",value:function(t,e){var i=this,s=[],a=this.w;a.config.chart.group&&(s=this.ctx.getGroupedCharts()),a.globals.axisCharts&&(a.globals.minX===-1/0&&a.globals.maxX===1/0||0===a.globals.dataPoints)||(s.length?s.forEach((function(s){var a=i.getElTooltip(s),r={paths:t.paths,tooltipEl:a,tooltipY:t.tooltipY,tooltipX:t.tooltipX,elGrid:t.elGrid,hoverArea:t.hoverArea,ttItems:s.w.globals.tooltip.ttItems};s.w.globals.minX===i.w.globals.minX&&s.w.globals.maxX===i.w.globals.maxX&&s.w.globals.tooltip.seriesHoverByContext({chartCtx:s,ttCtx:s.w.globals.tooltip,opt:r,e:e})})):this.seriesHoverByContext({chartCtx:this.ctx,ttCtx:this.w.globals.tooltip,opt:t,e:e}))}},{key:"seriesHoverByContext",value:function(t){var e=t.chartCtx,i=t.ttCtx,s=t.opt,a=t.e,r=e.w,n=this.getElTooltip();(i.tooltipRect={x:0,y:0,ttWidth:n.getBoundingClientRect().width,ttHeight:n.getBoundingClientRect().height},i.e=a,!i.hasBars()||r.globals.comboCharts||i.isBarShared)||this.tConfig.onDatasetHover.highlightDataSeries&&new Series(e).toggleSeriesOnHover(a,a.target.parentNode);i.fixedTooltip&&i.drawFixedTooltipRect(),r.globals.axisCharts?i.axisChartsTooltips({e:a,opt:s,tooltipRect:i.tooltipRect}):i.nonAxisChartsTooltips({e:a,opt:s,tooltipRect:i.tooltipRect})}},{key:"axisChartsTooltips",value:function(t){var e,i,s,a=t.e,r=t.opt,n=this.w,o=null,l=r.elGrid.getBoundingClientRect(),h="touchmove"===a.type?a.touches[0].clientX:a.clientX,c="touchmove"===a.type?a.touches[0].clientY:a.clientY;if(this.clientY=c,this.clientX=h,n.globals.capturedSeriesIndex=-1,n.globals.capturedDataPointIndex=-1,c<l.top||c>l.top+l.height)this.handleMouseOut(r);else{if(Array.isArray(this.tConfig.enabledOnSeries)&&!n.config.tooltip.shared){var d=parseInt(r.paths.getAttribute("index"),10);if(this.tConfig.enabledOnSeries.indexOf(d)<0)return void this.handleMouseOut(r)}var u=this.getElTooltip(),g=this.getElXCrosshairs(),f=n.globals.xyCharts||"bar"===n.config.chart.type&&!n.globals.isBarHorizontal&&this.hasBars()&&this.tConfig.shared||n.globals.comboCharts&&this.hasBars;if(n.globals.isBarHorizontal&&this.hasBars()&&(f=!1),"mousemove"===a.type||"touchmove"===a.type||"mouseup"===a.type){if(null!==g&&g.classList.add("active"),null!==this.ycrosshairs&&this.blyaxisTooltip&&this.ycrosshairs.classList.add("active"),f&&!this.showOnIntersect){e=(o=this.tooltipUtil.getNearestValues({context:this,hoverArea:r.hoverArea,elGrid:r.elGrid,clientX:h,clientY:c,hasBars:this.hasBars})).j;var p=o.capturedSeries;if(o.hoverX<0||o.hoverX>n.globals.gridWidth)return void this.handleMouseOut(r);if(null!==p){if(null===n.globals.series[p][e])return void this.handleMouseOut(r);void 0!==n.globals.series[p][e]?this.tConfig.shared&&this.tooltipUtil.isXoverlap(e)&&this.tooltipUtil.isInitialSeriesSameLen()?this.create(a,this,p,e,r.ttItems):this.create(a,this,p,e,r.ttItems,!1):this.tooltipUtil.isXoverlap(e)&&this.create(a,this,0,e,r.ttItems)}else this.tooltipUtil.isXoverlap(e)&&this.create(a,this,0,e,r.ttItems)}else if("heatmap"===n.config.chart.type){var x=this.intersect.handleHeatTooltip({e:a,opt:r,x:i,y:s});i=x.x,s=x.y,u.style.left=i+"px",u.style.top=s+"px"}else this.hasBars&&this.intersect.handleBarTooltip({e:a,opt:r}),this.hasMarkers&&this.intersect.handleMarkerTooltip({e:a,opt:r,x:i,y:s});if(this.blyaxisTooltip)for(var b=0;b<n.config.yaxis.length;b++)this.axesTooltip.drawYaxisTooltipText(b,c,this.xyRatios);r.tooltipEl.classList.add("active")}else"mouseout"!==a.type&&"touchend"!==a.type||this.handleMouseOut(r)}}},{key:"nonAxisChartsTooltips",value:function(t){var e=t.e,i=t.opt,s=t.tooltipRect,a=this.w,r=i.paths.getAttribute("rel"),n=this.getElTooltip(),o=a.globals.dom.elWrap.getBoundingClientRect();if("mousemove"===e.type||"touchmove"===e.type){n.classList.add("active"),this.tooltipLabels.drawSeriesTexts({ttItems:i.ttItems,i:parseInt(r,10)-1,shared:!1});var l=a.globals.clientX-o.left-s.ttWidth/2,h=a.globals.clientY-o.top-s.ttHeight-10;n.style.left=l+"px",n.style.top=h+"px"}else"mouseout"!==e.type&&"touchend"!==e.type||n.classList.remove("active")}},{key:"deactivateHoverFilter",value:function(){for(var t=this.w,e=new Graphics(this.ctx),i=t.globals.dom.Paper.select(".apexcharts-bar-area"),s=0;s<i.length;s++)e.pathMouseLeave(i[s])}},{key:"handleMouseOut",value:function(t){var e=this.w,i=this.getElXCrosshairs();if(t.tooltipEl.classList.remove("active"),this.deactivateHoverFilter(),"bubble"!==e.config.chart.type&&this.marker.resetPointsSize(),null!==i&&i.classList.remove("active"),null!==this.ycrosshairs&&this.ycrosshairs.classList.remove("active"),this.blxaxisTooltip&&this.xaxisTooltip.classList.remove("active"),this.blyaxisTooltip){null===this.yaxisTTEls&&(this.yaxisTTEls=e.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxistooltip"));for(var s=0;s<this.yaxisTTEls.length;s++)this.yaxisTTEls[s].classList.remove("active")}e.config.legend.tooltipHoverFormatter&&this.legendLabels.forEach((function(t){var e=t.getAttribute("data:default-text");t.innerHTML=decodeURIComponent(e)}))}},{key:"getElMarkers",value:function(){return this.w.globals.dom.baseEl.querySelectorAll(" .apexcharts-series-markers")}},{key:"getAllMarkers",value:function(){return this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-series-markers .apexcharts-marker")}},{key:"hasMarkers",value:function(){return this.getElMarkers().length>0}},{key:"getElBars",value:function(){return this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-bar-series,  .apexcharts-candlestick-series, .apexcharts-rangebar-series")}},{key:"hasBars",value:function(){return this.getElBars().length>0}},{key:"markerClick",value:function(t,e,i){var s=this.w;"function"==typeof s.config.chart.events.markerClick&&s.config.chart.events.markerClick(t,this.ctx,{seriesIndex:e,dataPointIndex:i,w:s}),this.ctx.fireEvent("markerClick",[t,this.ctx,{seriesIndex:e,dataPointIndex:i,w:s}])}},{key:"create",value:function(t,e,i,s,a){var r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,n=this.w,o=e;"mouseup"===t.type&&this.markerClick(t,i,s),null===r&&(r=this.tConfig.shared);var l=this.hasMarkers(),h=this.getElBars();if(n.config.legend.tooltipHoverFormatter){var c=n.config.legend.tooltipHoverFormatter,d=Array.from(this.legendLabels);d.forEach((function(t){var e=t.getAttribute("data:default-text");t.innerHTML=decodeURIComponent(e)}));for(var u=0;u<d.length;u++){var g=d[u],f=parseInt(g.getAttribute("i"),10),p=decodeURIComponent(g.getAttribute("data:default-text")),x=c(p,{seriesIndex:r?f:i,dataPointIndex:s,w:n});if(r)g.innerHTML=n.globals.collapsedSeriesIndices.indexOf(f)<0?x:p;else if(g.innerHTML=f===i?x:p,i===f)break}}if(r){if(o.tooltipLabels.drawSeriesTexts({ttItems:a,i:i,j:s,shared:!this.showOnIntersect&&this.tConfig.shared}),l&&(n.globals.markers.largestSize>0?o.marker.enlargePoints(s):o.tooltipPosition.moveDynamicPointsOnHover(s)),this.hasBars()&&(this.barSeriesHeight=this.tooltipUtil.getBarsHeight(h),this.barSeriesHeight>0)){var b=new Graphics(this.ctx),m=n.globals.dom.Paper.select(".apexcharts-bar-area[j='".concat(s,"']"));this.deactivateHoverFilter(),this.tooltipPosition.moveStickyTooltipOverBars(s);for(var v=0;v<m.length;v++)b.pathMouseEnter(m[v])}}else o.tooltipLabels.drawSeriesTexts({shared:!1,ttItems:a,i:i,j:s}),this.hasBars()&&o.tooltipPosition.moveStickyTooltipOverBars(s),l&&o.tooltipPosition.moveMarkers(i,s)}}]),t}(),icoPan='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="24" viewBox="0 0 24 24" width="24">\n    <defs>\n        <path d="M0 0h24v24H0z" id="a"/>\n    </defs>\n    <clipPath id="b">\n        <use overflow="visible" xlink:href="#a"/>\n    </clipPath>\n    <path clip-path="url(#b)" d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"/>\n</svg>',icoZoom='<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">\n    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>\n    <path d="M0 0h24v24H0V0z" fill="none"/>\n    <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>\n</svg>',icoReset='<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>\n    <path d="M0 0h24v24H0z" fill="none"/>\n</svg>',icoZoomIn='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n    <path d="M0 0h24v24H0z" fill="none"/>\n    <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>\n</svg>\n',icoZoomOut='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n    <path d="M0 0h24v24H0z" fill="none"/>\n    <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>\n</svg>\n',icoSelect='<svg fill="#6E8192" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M0 0h24v24H0z" fill="none"/>\n    <path d="M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2z"/>\n</svg>',icoMenu='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>',Toolbar=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w,this.ev=this.w.config.chart.events,this.localeValues=this.w.globals.locale.toolbar}return _createClass(t,[{key:"createToolbar",value:function(){var t=this.w,e=document.createElement("div");if(e.setAttribute("class","apexcharts-toolbar"),t.globals.dom.elWrap.appendChild(e),this.elZoom=document.createElement("div"),this.elZoomIn=document.createElement("div"),this.elZoomOut=document.createElement("div"),this.elPan=document.createElement("div"),this.elSelection=document.createElement("div"),this.elZoomReset=document.createElement("div"),this.elMenuIcon=document.createElement("div"),this.elMenu=document.createElement("div"),this.elCustomIcons=[],this.t=t.config.chart.toolbar.tools,Array.isArray(this.t.customIcons))for(var i=0;i<this.t.customIcons.length;i++)this.elCustomIcons.push(document.createElement("div"));this.elMenuItems=[];var s=[];this.t.zoomin&&t.config.chart.zoom.enabled&&s.push({el:this.elZoomIn,icon:"string"==typeof this.t.zoomin?this.t.zoomin:icoZoomIn,title:this.localeValues.zoomIn,class:"apexcharts-zoom-in-icon"}),this.t.zoomout&&t.config.chart.zoom.enabled&&s.push({el:this.elZoomOut,icon:"string"==typeof this.t.zoomout?this.t.zoomout:icoZoomOut,title:this.localeValues.zoomOut,class:"apexcharts-zoom-out-icon"}),this.t.zoom&&t.config.chart.zoom.enabled&&s.push({el:this.elZoom,icon:"string"==typeof this.t.zoom?this.t.zoom:icoZoom,title:this.localeValues.selectionZoom,class:t.globals.isTouchDevice?"hidden":"apexcharts-zoom-icon"}),this.t.selection&&t.config.chart.selection.enabled&&s.push({el:this.elSelection,icon:"string"==typeof this.t.selection?this.t.selection:icoSelect,title:this.localeValues.selection,class:t.globals.isTouchDevice?"hidden":"apexcharts-selection-icon"}),this.t.pan&&t.config.chart.zoom.enabled&&s.push({el:this.elPan,icon:"string"==typeof this.t.pan?this.t.pan:icoPan,title:this.localeValues.pan,class:t.globals.isTouchDevice?"hidden":"apexcharts-pan-icon"}),this.t.reset&&t.config.chart.zoom.enabled&&s.push({el:this.elZoomReset,icon:"string"==typeof this.t.reset?this.t.reset:icoReset,title:this.localeValues.reset,class:"apexcharts-reset-zoom-icon"}),this.t.download&&s.push({el:this.elMenuIcon,icon:"string"==typeof this.t.download?this.t.download:icoMenu,title:this.localeValues.menu,class:"apexcharts-menu-icon"});for(var a=0;a<this.elCustomIcons.length;a++)s.push({el:this.elCustomIcons[a],icon:this.t.customIcons[a].icon,title:this.t.customIcons[a].title,index:this.t.customIcons[a].index,class:"apexcharts-toolbar-custom-icon "+this.t.customIcons[a].class});s.forEach((function(t,e){t.index&&Utils.moveIndexInArray(s,e,t.index)}));for(var r=0;r<s.length;r++)Graphics.setAttrs(s[r].el,{class:s[r].class,title:s[r].title}),s[r].el.innerHTML=s[r].icon,e.appendChild(s[r].el);e.appendChild(this.elMenu),Graphics.setAttrs(this.elMenu,{class:"apexcharts-menu"});for(var n=[{name:"exportSVG",title:this.localeValues.exportToSVG},{name:"exportPNG",title:this.localeValues.exportToPNG}],o=0;o<n.length;o++)this.elMenuItems.push(document.createElement("div")),this.elMenuItems[o].innerHTML=n[o].title,Graphics.setAttrs(this.elMenuItems[o],{class:"apexcharts-menu-item ".concat(n[o].name),title:n[o].title}),this.elMenu.appendChild(this.elMenuItems[o]);t.globals.zoomEnabled?this.elZoom.classList.add("selected"):t.globals.panEnabled?this.elPan.classList.add("selected"):t.globals.selectionEnabled&&this.elSelection.classList.add("selected"),this.addToolbarEventListeners()}},{key:"addToolbarEventListeners",value:function(){var t=this;this.elZoomReset.addEventListener("click",this.handleZoomReset.bind(this)),this.elSelection.addEventListener("click",this.toggleSelection.bind(this)),this.elZoom.addEventListener("click",this.toggleZooming.bind(this)),this.elZoomIn.addEventListener("click",this.handleZoomIn.bind(this)),this.elZoomOut.addEventListener("click",this.handleZoomOut.bind(this)),this.elPan.addEventListener("click",this.togglePanning.bind(this)),this.elMenuIcon.addEventListener("click",this.toggleMenu.bind(this)),this.elMenuItems.forEach((function(e){e.classList.contains("exportSVG")?e.addEventListener("click",t.downloadSVG.bind(t)):e.classList.contains("exportPNG")&&e.addEventListener("click",t.downloadPNG.bind(t))}));for(var e=0;e<this.t.customIcons.length;e++)this.elCustomIcons[e].addEventListener("click",this.t.customIcons[e].click.bind(this,this.ctx,this.ctx.w))}},{key:"toggleSelection",value:function(){this.toggleOtherControls(),this.w.globals.selectionEnabled=!this.w.globals.selectionEnabled,this.elSelection.classList.contains("selected")?this.elSelection.classList.remove("selected"):this.elSelection.classList.add("selected")}},{key:"toggleZooming",value:function(){this.toggleOtherControls(),this.w.globals.zoomEnabled=!this.w.globals.zoomEnabled,this.elZoom.classList.contains("selected")?this.elZoom.classList.remove("selected"):this.elZoom.classList.add("selected")}},{key:"getToolbarIconsReference",value:function(){var t=this.w;this.elZoom||(this.elZoom=t.globals.dom.baseEl.querySelector(".apexcharts-zoom-icon")),this.elPan||(this.elPan=t.globals.dom.baseEl.querySelector(".apexcharts-pan-icon")),this.elSelection||(this.elSelection=t.globals.dom.baseEl.querySelector(".apexcharts-selection-icon"))}},{key:"enableZooming",value:function(){this.toggleOtherControls(),this.w.globals.zoomEnabled=!0,this.elZoom&&this.elZoom.classList.add("selected"),this.elPan&&this.elPan.classList.remove("selected")}},{key:"enablePanning",value:function(){this.toggleOtherControls(),this.w.globals.panEnabled=!0,this.elPan&&this.elPan.classList.add("selected"),this.elZoom&&this.elZoom.classList.remove("selected")}},{key:"togglePanning",value:function(){this.toggleOtherControls(),this.w.globals.panEnabled=!this.w.globals.panEnabled,this.elPan.classList.contains("selected")?this.elPan.classList.remove("selected"):this.elPan.classList.add("selected")}},{key:"toggleOtherControls",value:function(){var t=this.w;t.globals.panEnabled=!1,t.globals.zoomEnabled=!1,t.globals.selectionEnabled=!1,this.getToolbarIconsReference(),this.elPan&&this.elPan.classList.remove("selected"),this.elSelection&&this.elSelection.classList.remove("selected"),this.elZoom&&this.elZoom.classList.remove("selected")}},{key:"handleZoomIn",value:function(){var t=this.w,e=(t.globals.minX+t.globals.maxX)/2,i=(t.globals.minX+e)/2,s=(t.globals.maxX+e)/2;t.globals.disableZoomIn||this.zoomUpdateOptions(i,s)}},{key:"handleZoomOut",value:function(){var t=this.w;if(!("datetime"===t.config.xaxis.type&&new Date(t.globals.minX).getUTCFullYear()<1e3)){var e=(t.globals.minX+t.globals.maxX)/2,i=t.globals.minX-(e-t.globals.minX),s=t.globals.maxX-(e-t.globals.maxX);t.globals.disableZoomOut||this.zoomUpdateOptions(i,s)}}},{key:"zoomUpdateOptions",value:function(t,e){var i=this.w,s={min:t,max:e},a=this.getBeforeZoomRange(s);a&&(s=a.xaxis);var r={xaxis:s},n=Utils.clone(i.globals.initialConfig.yaxis);i.config.chart.zoom.autoScaleYaxis&&(n=new Range(this.ctx).autoScaleY(this.ctx,n,{xaxis:s}));i.config.chart.group||(r.yaxis=n),this.w.globals.zoomed=!0,this.ctx._updateOptions(r,!1,this.w.config.chart.animations.dynamicAnimation.enabled),this.zoomCallback(s,n)}},{key:"zoomCallback",value:function(t,e){"function"==typeof this.ev.zoomed&&this.ev.zoomed(this.ctx,{xaxis:t,yaxis:e})}},{key:"getBeforeZoomRange",value:function(t,e){var i=null;return"function"==typeof this.ev.beforeZoom&&(i=this.ev.beforeZoom(this,{xaxis:t,yaxis:e})),i}},{key:"toggleMenu",value:function(){this.elMenu.classList.contains("open")?this.elMenu.classList.remove("open"):this.elMenu.classList.add("open")}},{key:"downloadPNG",value:function(){var t=new Exports(this.ctx);t.exportToPng(this.ctx),this.toggleMenu()}},{key:"downloadSVG",value:function(){var t=new Exports(this.ctx);t.exportToSVG(),this.toggleMenu()}},{key:"handleZoomReset",value:function(t){var e=this;this.ctx.getSyncedCharts().forEach((function(t){var i=t.w;i.globals.minX!==i.globals.initialminX&&i.globals.maxX!==i.globals.initialmaxX&&(t.revertDefaultAxisMinMax(),"function"==typeof i.config.chart.events.zoomed&&e.zoomCallback({min:i.config.xaxis.min,max:i.config.xaxis.max}),i.globals.zoomed=!1,t._updateSeries(i.globals.initialSeries,i.config.chart.animations.dynamicAnimation.enabled))}))}},{key:"destroy",value:function(){this.elZoom=null,this.elZoomIn=null,this.elZoomOut=null,this.elPan=null,this.elSelection=null,this.elZoomReset=null,this.elMenuIcon=null}}]),t}(),ZoomPanSelection=function(t){function e(t){var i;return _classCallCheck(this,e),(i=_possibleConstructorReturn(this,_getPrototypeOf(e).call(this,t))).ctx=t,i.w=t.w,i.dragged=!1,i.graphics=new Graphics(i.ctx),i.eventList=["mousedown","mouseleave","mousemove","touchstart","touchmove","mouseup","touchend"],i.clientX=0,i.clientY=0,i.startX=0,i.endX=0,i.dragX=0,i.startY=0,i.endY=0,i.dragY=0,i}return _inherits(e,Toolbar),_createClass(e,[{key:"init",value:function(t){var e=this,i=t.xyRatios,s=this.w,a=this;this.xyRatios=i,this.zoomRect=this.graphics.drawRect(0,0,0,0),this.selectionRect=this.graphics.drawRect(0,0,0,0),this.gridRect=s.globals.dom.baseEl.querySelector(".apexcharts-grid"),this.zoomRect.node.classList.add("apexcharts-zoom-rect"),this.selectionRect.node.classList.add("apexcharts-selection-rect"),s.globals.dom.elGraphical.add(this.zoomRect),s.globals.dom.elGraphical.add(this.selectionRect),"x"===s.config.chart.selection.type?this.slDraggableRect=this.selectionRect.draggable({minX:0,minY:0,maxX:s.globals.gridWidth,maxY:s.globals.gridHeight}).on("dragmove",this.selectionDragging.bind(this,"dragging")):"y"===s.config.chart.selection.type?this.slDraggableRect=this.selectionRect.draggable({minX:0,maxX:s.globals.gridWidth}).on("dragmove",this.selectionDragging.bind(this,"dragging")):this.slDraggableRect=this.selectionRect.draggable().on("dragmove",this.selectionDragging.bind(this,"dragging")),this.preselectedSelection(),this.hoverArea=s.globals.dom.baseEl.querySelector(s.globals.chartClass),this.hoverArea.classList.add("zoomable"),this.eventList.forEach((function(t){e.hoverArea.addEventListener(t,a.svgMouseEvents.bind(a,i),{capture:!1,passive:!0})}))}},{key:"destroy",value:function(){this.slDraggableRect&&(this.slDraggableRect.draggable(!1),this.slDraggableRect.off(),this.selectionRect.off()),this.selectionRect=null,this.zoomRect=null,this.gridRect=null}},{key:"svgMouseEvents",value:function(t,e){var i=this.w,s=this,a=this.ctx.toolbar,r=i.globals.zoomEnabled?i.config.chart.zoom.type:i.config.chart.selection.type;if(e.shiftKey?(this.shiftWasPressed=!0,a.enablePanning()):this.shiftWasPressed&&(a.enableZooming(),this.shiftWasPressed=!1),!(e.target.classList.contains("apexcharts-selection-rect")||e.target.parentNode.classList.contains("apexcharts-toolbar"))){if(s.clientX="touchmove"===e.type||"touchstart"===e.type?e.touches[0].clientX:"touchend"===e.type?e.changedTouches[0].clientX:e.clientX,s.clientY="touchmove"===e.type||"touchstart"===e.type?e.touches[0].clientY:"touchend"===e.type?e.changedTouches[0].clientY:e.clientY,"mousedown"===e.type&&1===e.which){var n=s.gridRect.getBoundingClientRect();s.startX=s.clientX-n.left,s.startY=s.clientY-n.top,s.dragged=!1,s.w.globals.mousedown=!0}if(("mousemove"===e.type&&1===e.which||"touchmove"===e.type)&&(s.dragged=!0,i.globals.panEnabled?(i.globals.selection=null,s.w.globals.mousedown&&s.panDragging({context:s,zoomtype:r,xyRatios:t})):(s.w.globals.mousedown&&i.globals.zoomEnabled||s.w.globals.mousedown&&i.globals.selectionEnabled)&&(s.selection=s.selectionDrawing({context:s,zoomtype:r}))),"mouseup"===e.type||"touchend"===e.type||"mouseleave"===e.type){var o=s.gridRect.getBoundingClientRect();s.w.globals.mousedown&&(s.endX=s.clientX-o.left,s.endY=s.clientY-o.top,s.dragX=Math.abs(s.endX-s.startX),s.dragY=Math.abs(s.endY-s.startY),(i.globals.zoomEnabled||i.globals.selectionEnabled)&&s.selectionDrawn({context:s,zoomtype:r})),i.globals.zoomEnabled&&s.hideSelectionRect(this.selectionRect),s.dragged=!1,s.w.globals.mousedown=!1}this.makeSelectionRectDraggable()}}},{key:"makeSelectionRectDraggable",value:function(){var t=this.w;if(this.selectionRect){var e=this.selectionRect.node.getBoundingClientRect();e.width>0&&e.height>0&&this.slDraggableRect.selectize().resize({constraint:{minX:0,minY:0,maxX:t.globals.gridWidth,maxY:t.globals.gridHeight}}).on("resizing",this.selectionDragging.bind(this,"resizing"))}}},{key:"preselectedSelection",value:function(){var t=this.w,e=this.xyRatios;if(!t.globals.zoomEnabled)if(void 0!==t.globals.selection&&null!==t.globals.selection)this.drawSelectionRect(t.globals.selection);else if(void 0!==t.config.chart.selection.xaxis.min&&void 0!==t.config.chart.selection.xaxis.max){var i=(t.config.chart.selection.xaxis.min-t.globals.minX)/e.xRatio,s={x:i,y:0,width:t.globals.gridWidth-(t.globals.maxX-t.config.chart.selection.xaxis.max)/e.xRatio-i,height:t.globals.gridHeight,translateX:0,translateY:0,selectionEnabled:!0};this.drawSelectionRect(s),this.makeSelectionRectDraggable(),"function"==typeof t.config.chart.events.selection&&t.config.chart.events.selection(this.ctx,{xaxis:{min:t.config.chart.selection.xaxis.min,max:t.config.chart.selection.xaxis.max},yaxis:{}})}}},{key:"drawSelectionRect",value:function(t){var e=t.x,i=t.y,s=t.width,a=t.height,r=t.translateX,n=t.translateY,o=this.w,l=this.zoomRect,h=this.selectionRect;if(this.dragged||null!==o.globals.selection){var c={transform:"translate("+r+", "+n+")"};o.globals.zoomEnabled&&this.dragged&&(l.attr({x:e,y:i,width:s,height:a,fill:o.config.chart.zoom.zoomedArea.fill.color,"fill-opacity":o.config.chart.zoom.zoomedArea.fill.opacity,stroke:o.config.chart.zoom.zoomedArea.stroke.color,"stroke-width":o.config.chart.zoom.zoomedArea.stroke.width,"stroke-opacity":o.config.chart.zoom.zoomedArea.stroke.opacity}),Graphics.setAttrs(l.node,c)),o.globals.selectionEnabled&&(h.attr({x:e,y:i,width:s>0?s:0,height:a>0?a:0,fill:o.config.chart.selection.fill.color,"fill-opacity":o.config.chart.selection.fill.opacity,stroke:o.config.chart.selection.stroke.color,"stroke-width":o.config.chart.selection.stroke.width,"stroke-dasharray":o.config.chart.selection.stroke.dashArray,"stroke-opacity":o.config.chart.selection.stroke.opacity}),Graphics.setAttrs(h.node,c))}}},{key:"hideSelectionRect",value:function(t){t&&t.attr({x:0,y:0,width:0,height:0})}},{key:"selectionDrawing",value:function(t){var e=t.context,i=t.zoomtype,s=this.w,a=e,r=this.gridRect.getBoundingClientRect(),n=a.startX-1,o=a.startY,l=a.clientX-r.left-n,h=a.clientY-r.top-o,c=0,d=0,u={};return Math.abs(l+n)>s.globals.gridWidth?l=s.globals.gridWidth-n:a.clientX-r.left<0&&(l=n),n>a.clientX-r.left&&(c=-(l=Math.abs(l))),o>a.clientY-r.top&&(d=-(h=Math.abs(h))),u="x"===i?{x:n,y:0,width:l,height:s.globals.gridHeight,translateX:c,translateY:0}:"y"===i?{x:0,y:o,width:s.globals.gridWidth,height:h,translateX:0,translateY:d}:{x:n,y:o,width:l,height:h,translateX:c,translateY:d},a.drawSelectionRect(u),a.selectionDragging("resizing"),u}},{key:"selectionDragging",value:function(t,e){var i=this,s=this.w,a=this.xyRatios,r=this.selectionRect,n=0;"resizing"===t&&(n=30),"function"==typeof s.config.chart.events.selection&&s.globals.selectionEnabled&&(clearTimeout(this.w.globals.selectionResizeTimer),this.w.globals.selectionResizeTimer=window.setTimeout((function(){var t=i.gridRect.getBoundingClientRect(),e=r.node.getBoundingClientRect(),n=s.globals.xAxisScale.niceMin+(e.left-t.left)*a.xRatio,o=s.globals.xAxisScale.niceMin+(e.right-t.left)*a.xRatio,l=s.globals.yAxisScale[0].niceMin+(t.bottom-e.bottom)*a.yRatio[0],h=s.globals.yAxisScale[0].niceMax-(e.top-t.top)*a.yRatio[0];s.config.chart.events.selection(i.ctx,{xaxis:{min:n,max:o},yaxis:{min:l,max:h}})}),n))}},{key:"selectionDrawn",value:function(t){var e=t.context,i=t.zoomtype,s=this.w,a=e,r=this.xyRatios,n=this.ctx.toolbar;if(a.startX>a.endX){var o=a.startX;a.startX=a.endX,a.endX=o}if(a.startY>a.endY){var l=a.startY;a.startY=a.endY,a.endY=l}var h=s.globals.xAxisScale.niceMin+a.startX*r.xRatio,c=s.globals.xAxisScale.niceMin+a.endX*r.xRatio,d=[],u=[];if(s.config.yaxis.forEach((function(t,e){d.push(s.globals.yAxisScale[e].niceMax-r.yRatio[e]*a.startY),u.push(s.globals.yAxisScale[e].niceMax-r.yRatio[e]*a.endY)})),a.dragged&&(a.dragX>10||a.dragY>10)&&h!==c)if(s.globals.zoomEnabled){var g=Utils.clone(s.globals.initialConfig.yaxis),f={min:h,max:c};if("xy"!==i&&"y"!==i||g.forEach((function(t,e){g[e].min=u[e],g[e].max=d[e]})),s.config.chart.zoom.autoScaleYaxis){var p=new Range(a.ctx);g=p.autoScaleY(a.ctx,g,{xaxis:f})}if(n){var x=n.getBeforeZoomRange(f,g);x&&(f=x.xaxis?x.xaxis:f,g=x.yaxis?x.yaxe:g)}var b={xaxis:f};s.config.chart.group||(b.yaxis=g),a.ctx._updateOptions(b,!1,a.w.config.chart.animations.dynamicAnimation.enabled),"function"==typeof s.config.chart.events.zoomed&&n.zoomCallback(f,g),s.globals.zoomed=!0}else if(s.globals.selectionEnabled){var m,v=null;m={min:h,max:c},"xy"!==i&&"y"!==i||(v=Utils.clone(s.config.yaxis)).forEach((function(t,e){v[e].min=u[e],v[e].max=d[e]})),s.globals.selection=a.selection,"function"==typeof s.config.chart.events.selection&&s.config.chart.events.selection(a.ctx,{xaxis:m,yaxis:v})}}},{key:"panDragging",value:function(t){var e,i=t.context,s=this.w,a=i;if(void 0!==s.globals.lastClientPosition.x){var r=s.globals.lastClientPosition.x-a.clientX,n=s.globals.lastClientPosition.y-a.clientY;Math.abs(r)>Math.abs(n)&&r>0?e="left":Math.abs(r)>Math.abs(n)&&r<0?e="right":Math.abs(n)>Math.abs(r)&&n>0?e="up":Math.abs(n)>Math.abs(r)&&n<0&&(e="down")}s.globals.lastClientPosition={x:a.clientX,y:a.clientY};var o=s.globals.minX,l=s.globals.maxX;a.panScrolled(e,o,l)}},{key:"panScrolled",value:function(t,e,i){var s=this.w,a=this.xyRatios,r=Utils.clone(s.globals.initialConfig.yaxis);"left"===t?(e=s.globals.minX+s.globals.gridWidth/15*a.xRatio,i=s.globals.maxX+s.globals.gridWidth/15*a.xRatio):"right"===t&&(e=s.globals.minX-s.globals.gridWidth/15*a.xRatio,i=s.globals.maxX-s.globals.gridWidth/15*a.xRatio),(e<s.globals.initialminX||i>s.globals.initialmaxX)&&(e=s.globals.minX,i=s.globals.maxX);var n={min:e,max:i};s.config.chart.zoom.autoScaleYaxis&&(r=new Range(this.ctx).autoScaleY(this.ctx,r,{xaxis:n}));var o={xaxis:{min:e,max:i}};s.config.chart.group||(o.yaxis=r),this.ctx._updateOptions(o,!1,!1),"function"==typeof s.config.chart.events.scrolled&&s.config.chart.events.scrolled(this.ctx,{xaxis:{min:e,max:i}})}}]),e}(),TitleSubtitle=function(){function t(e){_classCallCheck(this,t),this.ctx=e,this.w=e.w}return _createClass(t,[{key:"draw",value:function(){this.drawTitleSubtitle("title"),this.drawTitleSubtitle("subtitle")}},{key:"drawTitleSubtitle",value:function(t){var e=this.w,i="title"===t?e.config.title:e.config.subtitle,s=e.globals.svgWidth/2,a=i.offsetY,r="middle";if("left"===i.align?(s=10,r="start"):"right"===i.align&&(s=e.globals.svgWidth-10,r="end"),s+=i.offsetX,a=a+parseInt(i.style.fontSize,10)+2,void 0!==i.text){var n=new Graphics(this.ctx).drawText({x:s,y:a,text:i.text,textAnchor:r,fontSize:i.style.fontSize,fontFamily:i.style.fontFamily,foreColor:i.style.color,opacity:1});n.node.setAttribute("class","apexcharts-".concat(t,"-text")),e.globals.dom.Paper.add(n)}}}]),t}();function styleInject(t,e){void 0===e&&(e={});var i=e.insertAt;if(t&&"undefined"!=typeof document){var s=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===i&&s.firstChild?s.insertBefore(a,s.firstChild):s.appendChild(a),a.styleSheet?a.styleSheet.cssText=t:a.appendChild(document.createTextNode(t))}}!function(t,e){"function"==typeof define&&define.amd?define((function(){return e(t,t.document)})):"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=t.document?e(t,t.document):function(t){return e(t,t.document)}:t.SVG=e(t,t.document)}("undefined"!=typeof window?window:void 0,(function(t,e){var i=(void 0!==this?this:t).SVG=function(t){if(i.supported)return t=new i.Doc(t),i.parser.draw||i.prepare(),t};if(i.ns="http://www.w3.org/2000/svg",i.xmlns="http://www.w3.org/2000/xmlns/",i.xlink="http://www.w3.org/1999/xlink",i.svgjs="http://svgjs.com/svgjs",i.supported=!0,!i.supported)return!1;i.did=1e3,i.eid=function(t){return"Svgjs"+c(t)+i.did++},i.create=function(t){var i=e.createElementNS(this.ns,t);return i.setAttribute("id",this.eid(t)),i},i.extend=function(){var t,e,s,a;for(e=(t=[].slice.call(arguments)).pop(),a=t.length-1;a>=0;a--)if(t[a])for(s in e)t[a].prototype[s]=e[s];i.Set&&i.Set.inherit&&i.Set.inherit()},i.invent=function(t){var e="function"==typeof t.create?t.create:function(){this.constructor.call(this,i.create(t.create))};return t.inherit&&(e.prototype=new t.inherit),t.extend&&i.extend(e,t.extend),t.construct&&i.extend(t.parent||i.Container,t.construct),e},i.adopt=function(e){return e?e.instance?e.instance:((s="svg"==e.nodeName?e.parentNode instanceof t.SVGElement?new i.Nested:new i.Doc:"linearGradient"==e.nodeName?new i.Gradient("linear"):"radialGradient"==e.nodeName?new i.Gradient("radial"):i[c(e.nodeName)]?new(i[c(e.nodeName)]):new i.Element(e)).type=e.nodeName,s.node=e,e.instance=s,s instanceof i.Doc&&s.namespace().defs(),s.setData(JSON.parse(e.getAttribute("svgjs:data"))||{}),s):null;var s},i.prepare=function(){var t=e.getElementsByTagName("body")[0],s=(t?new i.Doc(t):i.adopt(e.documentElement).nested()).size(2,0);i.parser={body:t||e.documentElement,draw:s.style("opacity:0;position:absolute;left:-100%;top:-100%;overflow:hidden").node,poly:s.polyline().node,path:s.path().node,native:i.create("svg")}},i.parser={native:i.create("svg")},e.addEventListener("DOMContentLoaded",(function(){i.parser.draw||i.prepare()}),!1),i.regex={numberAndUnit:/^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i,hex:/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,rgb:/rgb\((\d+),(\d+),(\d+)\)/,reference:/#([a-z0-9\-_]+)/i,transforms:/\)\s*,?\s*/,whitespace:/\s/g,isHex:/^#[a-f0-9]{3,6}$/i,isRgb:/^rgb\(/,isCss:/[^:]+:[^;]+;?/,isBlank:/^(\s+)?$/,isNumber:/^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,isPercent:/^-?[\d\.]+%$/,isImage:/\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i,delimiter:/[\s,]+/,hyphen:/([^e])\-/gi,pathLetters:/[MLHVCSQTAZ]/gi,isPathLetter:/[MLHVCSQTAZ]/i,numbersWithDots:/((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi,dots:/\./g},i.utils={map:function(t,e){var i,s=t.length,a=[];for(i=0;i<s;i++)a.push(e(t[i]));return a},filter:function(t,e){var i,s=t.length,a=[];for(i=0;i<s;i++)e(t[i])&&a.push(t[i]);return a},radians:function(t){return t%360*Math.PI/180},degrees:function(t){return 180*t/Math.PI%360},filterSVGElements:function(e){return this.filter(e,(function(e){return e instanceof t.SVGElement}))}},i.defaults={attrs:{"fill-opacity":1,"stroke-opacity":1,"stroke-width":0,"stroke-linejoin":"miter","stroke-linecap":"butt",fill:"#000000",stroke:"#000000",opacity:1,x:0,y:0,cx:0,cy:0,width:0,height:0,r:0,rx:0,ry:0,offset:0,"stop-opacity":1,"stop-color":"#000000","font-size":16,"font-family":"Helvetica, Arial, sans-serif","text-anchor":"start"}},i.Color=function(t){var e,s;(this.r=0,this.g=0,this.b=0,t)&&("string"==typeof t?i.regex.isRgb.test(t)?(e=i.regex.rgb.exec(t.replace(i.regex.whitespace,"")),this.r=parseInt(e[1]),this.g=parseInt(e[2]),this.b=parseInt(e[3])):i.regex.isHex.test(t)&&(e=i.regex.hex.exec(4==(s=t).length?["#",s.substring(1,2),s.substring(1,2),s.substring(2,3),s.substring(2,3),s.substring(3,4),s.substring(3,4)].join(""):s),this.r=parseInt(e[1],16),this.g=parseInt(e[2],16),this.b=parseInt(e[3],16)):"object"===_typeof(t)&&(this.r=t.r,this.g=t.g,this.b=t.b))},i.extend(i.Color,{toString:function(){return this.toHex()},toHex:function(){return"#"+d(this.r)+d(this.g)+d(this.b)},toRgb:function(){return"rgb("+[this.r,this.g,this.b].join()+")"},brightness:function(){return this.r/255*.3+this.g/255*.59+this.b/255*.11},morph:function(t){return this.destination=new i.Color(t),this},at:function(t){return this.destination?(t=t<0?0:t>1?1:t,new i.Color({r:~~(this.r+(this.destination.r-this.r)*t),g:~~(this.g+(this.destination.g-this.g)*t),b:~~(this.b+(this.destination.b-this.b)*t)})):this}}),i.Color.test=function(t){return t+="",i.regex.isHex.test(t)||i.regex.isRgb.test(t)},i.Color.isRgb=function(t){return t&&"number"==typeof t.r&&"number"==typeof t.g&&"number"==typeof t.b},i.Color.isColor=function(t){return i.Color.isRgb(t)||i.Color.test(t)},i.Array=function(t,e){0==(t=(t||[]).valueOf()).length&&e&&(t=e.valueOf()),this.value=this.parse(t)},i.extend(i.Array,{morph:function(t){if(this.destination=this.parse(t),this.value.length!=this.destination.length){for(var e=this.value[this.value.length-1],i=this.destination[this.destination.length-1];this.value.length>this.destination.length;)this.destination.push(i);for(;this.value.length<this.destination.length;)this.value.push(e)}return this},settle:function(){for(var t=0,e=this.value.length,i=[];t<e;t++)-1==i.indexOf(this.value[t])&&i.push(this.value[t]);return this.value=i},at:function(t){if(!this.destination)return this;for(var e=0,s=this.value.length,a=[];e<s;e++)a.push(this.value[e]+(this.destination[e]-this.value[e])*t);return new i.Array(a)},toString:function(){return this.value.join(" ")},valueOf:function(){return this.value},parse:function(t){return t=t.valueOf(),Array.isArray(t)?t:this.split(t)},split:function(t){return t.trim().split(i.regex.delimiter).map(parseFloat)},reverse:function(){return this.value.reverse(),this},clone:function(){var t=new this.constructor;return t.value=function t(e){for(var i=e.slice(0),s=i.length;s--;)Array.isArray(i[s])&&(i[s]=t(i[s]));return i}(this.value),t}}),i.PointArray=function(t,e){i.Array.call(this,t,e||[[0,0]])},i.PointArray.prototype=new i.Array,i.PointArray.prototype.constructor=i.PointArray,i.extend(i.PointArray,{toString:function(){for(var t=0,e=this.value.length,i=[];t<e;t++)i.push(this.value[t].join(","));return i.join(" ")},toLine:function(){return{x1:this.value[0][0],y1:this.value[0][1],x2:this.value[1][0],y2:this.value[1][1]}},at:function(t){if(!this.destination)return this;for(var e=0,s=this.value.length,a=[];e<s;e++)a.push([this.value[e][0]+(this.destination[e][0]-this.value[e][0])*t,this.value[e][1]+(this.destination[e][1]-this.value[e][1])*t]);return new i.PointArray(a)},parse:function(t){var e=[];if(t=t.valueOf(),Array.isArray(t)){if(Array.isArray(t[0]))return t.map((function(t){return t.slice()}));if(null!=t[0].x)return t.map((function(t){return[t.x,t.y]}))}else t=t.trim().split(i.regex.delimiter).map(parseFloat);t.length%2!=0&&t.pop();for(var s=0,a=t.length;s<a;s+=2)e.push([t[s],t[s+1]]);return e},move:function(t,e){var i=this.bbox();if(t-=i.x,e-=i.y,!isNaN(t)&&!isNaN(e))for(var s=this.value.length-1;s>=0;s--)this.value[s]=[this.value[s][0]+t,this.value[s][1]+e];return this},size:function(t,e){var i,s=this.bbox();for(i=this.value.length-1;i>=0;i--)s.width&&(this.value[i][0]=(this.value[i][0]-s.x)*t/s.width+s.x),s.height&&(this.value[i][1]=(this.value[i][1]-s.y)*e/s.height+s.y);return this},bbox:function(){return i.parser.draw||i.prepare(),i.parser.poly.setAttribute("points",this.toString()),i.parser.poly.getBBox()}});for(var s={M:function(t,e,i){return e.x=i.x=t[0],e.y=i.y=t[1],["M",e.x,e.y]},L:function(t,e){return e.x=t[0],e.y=t[1],["L",t[0],t[1]]},H:function(t,e){return e.x=t[0],["H",t[0]]},V:function(t,e){return e.y=t[0],["V",t[0]]},C:function(t,e){return e.x=t[4],e.y=t[5],["C",t[0],t[1],t[2],t[3],t[4],t[5]]},S:function(t,e){return e.x=t[2],e.y=t[3],["S",t[0],t[1],t[2],t[3]]},Q:function(t,e){return e.x=t[2],e.y=t[3],["Q",t[0],t[1],t[2],t[3]]},T:function(t,e){return e.x=t[0],e.y=t[1],["T",t[0],t[1]]},Z:function(t,e,i){return e.x=i.x,e.y=i.y,["Z"]},A:function(t,e){return e.x=t[5],e.y=t[6],["A",t[0],t[1],t[2],t[3],t[4],t[5],t[6]]}},a="mlhvqtcsaz".split(""),r=0,n=a.length;r<n;++r)s[a[r]]=function(t){return function(e,i,a){if("H"==t)e[0]=e[0]+i.x;else if("V"==t)e[0]=e[0]+i.y;else if("A"==t)e[5]=e[5]+i.x,e[6]=e[6]+i.y;else for(var r=0,n=e.length;r<n;++r)e[r]=e[r]+(r%2?i.y:i.x);return s[t](e,i,a)}}(a[r].toUpperCase());i.PathArray=function(t,e){i.Array.call(this,t,e||[["M",0,0]])},i.PathArray.prototype=new i.Array,i.PathArray.prototype.constructor=i.PathArray,i.extend(i.PathArray,{toString:function(){return function(t){for(var e=0,i=t.length,s="";e<i;e++)s+=t[e][0],null!=t[e][1]&&(s+=t[e][1],null!=t[e][2]&&(s+=" ",s+=t[e][2],null!=t[e][3]&&(s+=" ",s+=t[e][3],s+=" ",s+=t[e][4],null!=t[e][5]&&(s+=" ",s+=t[e][5],s+=" ",s+=t[e][6],null!=t[e][7]&&(s+=" ",s+=t[e][7])))));return s+" "}(this.value)},move:function(t,e){var i=this.bbox();if(t-=i.x,e-=i.y,!isNaN(t)&&!isNaN(e))for(var s,a=this.value.length-1;a>=0;a--)"M"==(s=this.value[a][0])||"L"==s||"T"==s?(this.value[a][1]+=t,this.value[a][2]+=e):"H"==s?this.value[a][1]+=t:"V"==s?this.value[a][1]+=e:"C"==s||"S"==s||"Q"==s?(this.value[a][1]+=t,this.value[a][2]+=e,this.value[a][3]+=t,this.value[a][4]+=e,"C"==s&&(this.value[a][5]+=t,this.value[a][6]+=e)):"A"==s&&(this.value[a][6]+=t,this.value[a][7]+=e);return this},size:function(t,e){var i,s,a=this.bbox();for(i=this.value.length-1;i>=0;i--)"M"==(s=this.value[i][0])||"L"==s||"T"==s?(this.value[i][1]=(this.value[i][1]-a.x)*t/a.width+a.x,this.value[i][2]=(this.value[i][2]-a.y)*e/a.height+a.y):"H"==s?this.value[i][1]=(this.value[i][1]-a.x)*t/a.width+a.x:"V"==s?this.value[i][1]=(this.value[i][1]-a.y)*e/a.height+a.y:"C"==s||"S"==s||"Q"==s?(this.value[i][1]=(this.value[i][1]-a.x)*t/a.width+a.x,this.value[i][2]=(this.value[i][2]-a.y)*e/a.height+a.y,this.value[i][3]=(this.value[i][3]-a.x)*t/a.width+a.x,this.value[i][4]=(this.value[i][4]-a.y)*e/a.height+a.y,"C"==s&&(this.value[i][5]=(this.value[i][5]-a.x)*t/a.width+a.x,this.value[i][6]=(this.value[i][6]-a.y)*e/a.height+a.y)):"A"==s&&(this.value[i][1]=this.value[i][1]*t/a.width,this.value[i][2]=this.value[i][2]*e/a.height,this.value[i][6]=(this.value[i][6]-a.x)*t/a.width+a.x,this.value[i][7]=(this.value[i][7]-a.y)*e/a.height+a.y);return this},equalCommands:function(t){var e,s,a;for(t=new i.PathArray(t),a=this.value.length===t.value.length,e=0,s=this.value.length;a&&e<s;e++)a=this.value[e][0]===t.value[e][0];return a},morph:function(t){return t=new i.PathArray(t),this.equalCommands(t)?this.destination=t:this.destination=null,this},at:function(t){if(!this.destination)return this;var e,s,a,r,n=this.value,o=this.destination.value,l=[],h=new i.PathArray;for(e=0,s=n.length;e<s;e++){for(l[e]=[n[e][0]],a=1,r=n[e].length;a<r;a++)l[e][a]=n[e][a]+(o[e][a]-n[e][a])*t;"A"===l[e][0]&&(l[e][4]=+(0!=l[e][4]),l[e][5]=+(0!=l[e][5]))}return h.value=l,h},parse:function(t){if(t instanceof i.PathArray)return t.valueOf();var e,a={M:2,L:2,H:1,V:1,C:6,S:4,Q:4,T:2,A:7,Z:0};t="string"==typeof t?t.replace(i.regex.numbersWithDots,l).replace(i.regex.pathLetters," $& ").replace(i.regex.hyphen,"$1 -").trim().split(i.regex.delimiter):t.reduce((function(t,e){return[].concat.call(t,e)}),[]);var r=[],n=new i.Point,o=new i.Point,h=0,c=t.length;do{i.regex.isPathLetter.test(t[h])?(e=t[h],++h):"M"==e?e="L":"m"==e&&(e="l"),r.push(s[e].call(null,t.slice(h,h+=a[e.toUpperCase()]).map(parseFloat),n,o))}while(c>h);return r},bbox:function(){return i.parser.draw||i.prepare(),i.parser.path.setAttribute("d",this.toString()),i.parser.path.getBBox()}}),i.Number=i.invent({create:function(t,e){this.value=0,this.unit=e||"","number"==typeof t?this.value=isNaN(t)?0:isFinite(t)?t:t<0?-34e37:34e37:"string"==typeof t?(e=t.match(i.regex.numberAndUnit))&&(this.value=parseFloat(e[1]),"%"==e[5]?this.value/=100:"s"==e[5]&&(this.value*=1e3),this.unit=e[5]):t instanceof i.Number&&(this.value=t.valueOf(),this.unit=t.unit)},extend:{toString:function(){return("%"==this.unit?~~(1e8*this.value)/1e6:"s"==this.unit?this.value/1e3:this.value)+this.unit},toJSON:function(){return this.toString()},valueOf:function(){return this.value},plus:function(t){return t=new i.Number(t),new i.Number(this+t,this.unit||t.unit)},minus:function(t){return t=new i.Number(t),new i.Number(this-t,this.unit||t.unit)},times:function(t){return t=new i.Number(t),new i.Number(this*t,this.unit||t.unit)},divide:function(t){return t=new i.Number(t),new i.Number(this/t,this.unit||t.unit)},to:function(t){var e=new i.Number(this);return"string"==typeof t&&(e.unit=t),e},morph:function(t){return this.destination=new i.Number(t),t.relative&&(this.destination.value+=this.value),this},at:function(t){return this.destination?new i.Number(this.destination).minus(this).times(t).plus(this):this}}}),i.Element=i.invent({create:function(t){this._stroke=i.defaults.attrs.stroke,this._event=null,this.dom={},(this.node=t)&&(this.type=t.nodeName,this.node.instance=this,this._stroke=t.getAttribute("stroke")||this._stroke)},extend:{x:function(t){return this.attr("x",t)},y:function(t){return this.attr("y",t)},cx:function(t){return null==t?this.x()+this.width()/2:this.x(t-this.width()/2)},cy:function(t){return null==t?this.y()+this.height()/2:this.y(t-this.height()/2)},move:function(t,e){return this.x(t).y(e)},center:function(t,e){return this.cx(t).cy(e)},width:function(t){return this.attr("width",t)},height:function(t){return this.attr("height",t)},size:function(t,e){var s=u(this,t,e);return this.width(new i.Number(s.width)).height(new i.Number(s.height))},clone:function(t){this.writeDataToDom();var e=x(this.node.cloneNode(!0));return t?t.add(e):this.after(e),e},remove:function(){return this.parent()&&this.parent().removeElement(this),this},replace:function(t){return this.after(t).remove(),t},addTo:function(t){return t.put(this)},putIn:function(t){return t.add(this)},id:function(t){return this.attr("id",t)},inside:function(t,e){var i=this.bbox();return t>i.x&&e>i.y&&t<i.x+i.width&&e<i.y+i.height},show:function(){return this.style("display","")},hide:function(){return this.style("display","none")},visible:function(){return"none"!=this.style("display")},toString:function(){return this.attr("id")},classes:function(){var t=this.attr("class");return null==t?[]:t.trim().split(i.regex.delimiter)},hasClass:function(t){return-1!=this.classes().indexOf(t)},addClass:function(t){if(!this.hasClass(t)){var e=this.classes();e.push(t),this.attr("class",e.join(" "))}return this},removeClass:function(t){return this.hasClass(t)&&this.attr("class",this.classes().filter((function(e){return e!=t})).join(" ")),this},toggleClass:function(t){return this.hasClass(t)?this.removeClass(t):this.addClass(t)},reference:function(t){return i.get(this.attr(t))},parent:function(e){var s=this;if(!s.node.parentNode)return null;if(s=i.adopt(s.node.parentNode),!e)return s;for(;s&&s.node instanceof t.SVGElement;){if("string"==typeof e?s.matches(e):s instanceof e)return s;if(!s.node.parentNode||"#document"==s.node.parentNode.nodeName)return null;s=i.adopt(s.node.parentNode)}},doc:function(){return this instanceof i.Doc?this:this.parent(i.Doc)},parents:function(t){var e=[],i=this;do{if(!(i=i.parent(t))||!i.node)break;e.push(i)}while(i.parent);return e},matches:function(t){return function(t,e){return(t.matches||t.matchesSelector||t.msMatchesSelector||t.mozMatchesSelector||t.webkitMatchesSelector||t.oMatchesSelector).call(t,e)}(this.node,t)},native:function(){return this.node},svg:function(t){var s=e.createElement("svg");if(!(t&&this instanceof i.Parent))return s.appendChild(t=e.createElement("svg")),this.writeDataToDom(),t.appendChild(this.node.cloneNode(!0)),s.innerHTML.replace(/^<svg>/,"").replace(/<\/svg>$/,"");s.innerHTML="<svg>"+t.replace(/\n/,"").replace(/<([\w:-]+)([^<]+?)\/>/g,"<$1$2></$1>")+"</svg>";for(var a=0,r=s.firstChild.childNodes.length;a<r;a++)this.node.appendChild(s.firstChild.firstChild);return this},writeDataToDom:function(){(this.each||this.lines)&&(this.each?this:this.lines()).each((function(){this.writeDataToDom()}));return this.node.removeAttribute("svgjs:data"),Object.keys(this.dom).length&&this.node.setAttribute("svgjs:data",JSON.stringify(this.dom)),this},setData:function(t){return this.dom=t,this},is:function(t){return function(t,e){return t instanceof e}(this,t)}}}),i.easing={"-":function(t){return t},"<>":function(t){return-Math.cos(t*Math.PI)/2+.5},">":function(t){return Math.sin(t*Math.PI/2)},"<":function(t){return 1-Math.cos(t*Math.PI/2)}},i.morph=function(t){return function(e,s){return new i.MorphObj(e,s).at(t)}},i.Situation=i.invent({create:function(t){this.init=!1,this.reversed=!1,this.reversing=!1,this.duration=new i.Number(t.duration).valueOf(),this.delay=new i.Number(t.delay).valueOf(),this.start=+new Date+this.delay,this.finish=this.start+this.duration,this.ease=t.ease,this.loop=0,this.loops=!1,this.animations={},this.attrs={},this.styles={},this.transforms=[],this.once={}}}),i.FX=i.invent({create:function(t){this._target=t,this.situations=[],this.active=!1,this.situation=null,this.paused=!1,this.lastPos=0,this.pos=0,this.absPos=0,this._speed=1},extend:{animate:function(t,e,s){"object"===_typeof(t)&&(e=t.ease,s=t.delay,t=t.duration);var a=new i.Situation({duration:t||1e3,delay:s||0,ease:i.easing[e||"-"]||e});return this.queue(a),this},delay:function(t){var e=new i.Situation({duration:t,delay:0,ease:i.easing["-"]});return this.queue(e)},target:function(t){return t&&t instanceof i.Element?(this._target=t,this):this._target},timeToAbsPos:function(t){return(t-this.situation.start)/(this.situation.duration/this._speed)},absPosToTime:function(t){return this.situation.duration/this._speed*t+this.situation.start},startAnimFrame:function(){this.stopAnimFrame(),this.animationFrame=t.requestAnimationFrame(function(){this.step()}.bind(this))},stopAnimFrame:function(){t.cancelAnimationFrame(this.animationFrame)},start:function(){return!this.active&&this.situation&&(this.active=!0,this.startCurrent()),this},startCurrent:function(){return this.situation.start=+new Date+this.situation.delay/this._speed,this.situation.finish=this.situation.start+this.situation.duration/this._speed,this.initAnimations().step()},queue:function(t){return("function"==typeof t||t instanceof i.Situation)&&this.situations.push(t),this.situation||(this.situation=this.situations.shift()),this},dequeue:function(){return this.stop(),this.situation=this.situations.shift(),this.situation&&(this.situation instanceof i.Situation?this.start():this.situation.call(this)),this},initAnimations:function(){var t,e,s,a=this.situation;if(a.init)return this;for(t in a.animations)for(s=this.target()[t](),Array.isArray(s)||(s=[s]),Array.isArray(a.animations[t])||(a.animations[t]=[a.animations[t]]),e=s.length;e--;)a.animations[t][e]instanceof i.Number&&(s[e]=new i.Number(s[e])),a.animations[t][e]=s[e].morph(a.animations[t][e]);for(t in a.attrs)a.attrs[t]=new i.MorphObj(this.target().attr(t),a.attrs[t]);for(t in a.styles)a.styles[t]=new i.MorphObj(this.target().style(t),a.styles[t]);return a.initialTransformation=this.target().matrixify(),a.init=!0,this},clearQueue:function(){return this.situations=[],this},clearCurrent:function(){return this.situation=null,this},stop:function(t,e){var i=this.active;return this.active=!1,e&&this.clearQueue(),t&&this.situation&&(!i&&this.startCurrent(),this.atEnd()),this.stopAnimFrame(),this.clearCurrent()},reset:function(){if(this.situation){var t=this.situation;this.stop(),this.situation=t,this.atStart()}return this},finish:function(){for(this.stop(!0,!1);this.dequeue().situation&&this.stop(!0,!1););return this.clearQueue().clearCurrent(),this},atStart:function(){return this.at(0,!0)},atEnd:function(){return!0===this.situation.loops&&(this.situation.loops=this.situation.loop+1),"number"==typeof this.situation.loops?this.at(this.situation.loops,!0):this.at(1,!0)},at:function(t,e){var i=this.situation.duration/this._speed;return this.absPos=t,e||(this.situation.reversed&&(this.absPos=1-this.absPos),this.absPos+=this.situation.loop),this.situation.start=+new Date-this.absPos*i,this.situation.finish=this.situation.start+i,this.step(!0)},speed:function(t){return 0===t?this.pause():t?(this._speed=t,this.at(this.absPos,!0)):this._speed},loop:function(t,e){var i=this.last();return i.loops=null==t||t,i.loop=0,e&&(i.reversing=!0),this},pause:function(){return this.paused=!0,this.stopAnimFrame(),this},play:function(){return this.paused?(this.paused=!1,this.at(this.absPos,!0)):this},reverse:function(t){var e=this.last();return e.reversed=void 0===t?!e.reversed:t,this},progress:function(t){return t?this.situation.ease(this.pos):this.pos},after:function(t){var e=this.last();return this.target().on("finished.fx",(function i(s){s.detail.situation==e&&(t.call(this,e),this.off("finished.fx",i))})),this._callStart()},during:function(t){var e=this.last(),s=function(s){s.detail.situation==e&&t.call(this,s.detail.pos,i.morph(s.detail.pos),s.detail.eased,e)};return this.target().off("during.fx",s).on("during.fx",s),this.after((function(){this.off("during.fx",s)})),this._callStart()},afterAll:function(t){var e=function e(i){t.call(this),this.off("allfinished.fx",e)};return this.target().off("allfinished.fx",e).on("allfinished.fx",e),this._callStart()},duringAll:function(t){var e=function(e){t.call(this,e.detail.pos,i.morph(e.detail.pos),e.detail.eased,e.detail.situation)};return this.target().off("during.fx",e).on("during.fx",e),this.afterAll((function(){this.off("during.fx",e)})),this._callStart()},last:function(){return this.situations.length?this.situations[this.situations.length-1]:this.situation},add:function(t,e,i){return this.last()[i||"animations"][t]=e,this._callStart()},step:function(t){var e,i,s;(t||(this.absPos=this.timeToAbsPos(+new Date)),!1!==this.situation.loops)?(e=Math.max(this.absPos,0),i=Math.floor(e),!0===this.situation.loops||i<this.situation.loops?(this.pos=e-i,s=this.situation.loop,this.situation.loop=i):(this.absPos=this.situation.loops,this.pos=1,s=this.situation.loop-1,this.situation.loop=this.situation.loops),this.situation.reversing&&(this.situation.reversed=this.situation.reversed!=Boolean((this.situation.loop-s)%2))):(this.absPos=Math.min(this.absPos,1),this.pos=this.absPos);this.pos<0&&(this.pos=0),this.situation.reversed&&(this.pos=1-this.pos);var a=this.situation.ease(this.pos);for(var r in this.situation.once)r>this.lastPos&&r<=a&&(this.situation.once[r].call(this.target(),this.pos,a),delete this.situation.once[r]);return this.active&&this.target().fire("during",{pos:this.pos,eased:a,fx:this,situation:this.situation}),this.situation?(this.eachAt(),1==this.pos&&!this.situation.reversed||this.situation.reversed&&0==this.pos?(this.stopAnimFrame(),this.target().fire("finished",{fx:this,situation:this.situation}),this.situations.length||(this.target().fire("allfinished"),this.situations.length||(this.target().off(".fx"),this.active=!1)),this.active?this.dequeue():this.clearCurrent()):!this.paused&&this.active&&this.startAnimFrame(),this.lastPos=a,this):this},eachAt:function(){var t,e,s,a=this,r=this.target(),n=this.situation;for(t in n.animations)s=[].concat(n.animations[t]).map((function(t){return"string"!=typeof t&&t.at?t.at(n.ease(a.pos),a.pos):t})),r[t].apply(r,s);for(t in n.attrs)s=[t].concat(n.attrs[t]).map((function(t){return"string"!=typeof t&&t.at?t.at(n.ease(a.pos),a.pos):t})),r.attr.apply(r,s);for(t in n.styles)s=[t].concat(n.styles[t]).map((function(t){return"string"!=typeof t&&t.at?t.at(n.ease(a.pos),a.pos):t})),r.style.apply(r,s);if(n.transforms.length){for(s=n.initialTransformation,t=0,e=n.transforms.length;t<e;t++){var o=n.transforms[t];o instanceof i.Matrix?s=o.relative?s.multiply((new i.Matrix).morph(o).at(n.ease(this.pos))):s.morph(o).at(n.ease(this.pos)):(o.relative||o.undo(s.extract()),s=s.multiply(o.at(n.ease(this.pos))))}r.matrix(s)}return this},once:function(t,e,i){var s=this.last();return i||(t=s.ease(t)),s.once[t]=e,this},_callStart:function(){return setTimeout(function(){this.start()}.bind(this),0),this}},parent:i.Element,construct:{animate:function(t,e,s){return(this.fx||(this.fx=new i.FX(this))).animate(t,e,s)},delay:function(t){return(this.fx||(this.fx=new i.FX(this))).delay(t)},stop:function(t,e){return this.fx&&this.fx.stop(t,e),this},finish:function(){return this.fx&&this.fx.finish(),this},pause:function(){return this.fx&&this.fx.pause(),this},play:function(){return this.fx&&this.fx.play(),this},speed:function(t){if(this.fx){if(null==t)return this.fx.speed();this.fx.speed(t)}return this}}}),i.MorphObj=i.invent({create:function(t,e){return i.Color.isColor(e)?new i.Color(t).morph(e):i.regex.delimiter.test(t)?i.regex.pathLetters.test(t)?new i.PathArray(t).morph(e):new i.Array(t).morph(e):i.regex.numberAndUnit.test(e)?new i.Number(t).morph(e):(this.value=t,void(this.destination=e))},extend:{at:function(t,e){return e<1?this.value:this.destination},valueOf:function(){return this.value}}}),i.extend(i.FX,{attr:function(t,e,i){if("object"===_typeof(t))for(var s in t)this.attr(s,t[s]);else this.add(t,e,"attrs");return this},style:function(t,e){if("object"===_typeof(t))for(var i in t)this.style(i,t[i]);else this.add(t,e,"styles");return this},x:function(t,e){if(this.target()instanceof i.G)return this.transform({x:t},e),this;var s=new i.Number(t);return s.relative=e,this.add("x",s)},y:function(t,e){if(this.target()instanceof i.G)return this.transform({y:t},e),this;var s=new i.Number(t);return s.relative=e,this.add("y",s)},cx:function(t){return this.add("cx",new i.Number(t))},cy:function(t){return this.add("cy",new i.Number(t))},move:function(t,e){return this.x(t).y(e)},center:function(t,e){return this.cx(t).cy(e)},size:function(t,e){var s;this.target()instanceof i.Text?this.attr("font-size",t):(t&&e||(s=this.target().bbox()),t||(t=s.width/s.height*e),e||(e=s.height/s.width*t),this.add("width",new i.Number(t)).add("height",new i.Number(e)));return this},width:function(t){return this.add("width",new i.Number(t))},height:function(t){return this.add("height",new i.Number(t))},plot:function(t,e,i,s){return 4==arguments.length?this.plot([t,e,i,s]):this.add("plot",new(this.target().morphArray)(t))},leading:function(t){return this.target().leading?this.add("leading",new i.Number(t)):this},viewbox:function(t,e,s,a){return this.target()instanceof i.Container&&this.add("viewbox",new i.ViewBox(t,e,s,a)),this},update:function(t){if(this.target()instanceof i.Stop){if("number"==typeof t||t instanceof i.Number)return this.update({offset:arguments[0],color:arguments[1],opacity:arguments[2]});null!=t.opacity&&this.attr("stop-opacity",t.opacity),null!=t.color&&this.attr("stop-color",t.color),null!=t.offset&&this.attr("offset",t.offset)}return this}}),i.Box=i.invent({create:function(t,e,s,a){if(!("object"!==_typeof(t)||t instanceof i.Element))return i.Box.call(this,null!=t.left?t.left:t.x,null!=t.top?t.top:t.y,t.width,t.height);4==arguments.length&&(this.x=t,this.y=e,this.width=s,this.height=a),b(this)},extend:{merge:function(t){var e=new this.constructor;return e.x=Math.min(this.x,t.x),e.y=Math.min(this.y,t.y),e.width=Math.max(this.x+this.width,t.x+t.width)-e.x,e.height=Math.max(this.y+this.height,t.y+t.height)-e.y,b(e)},transform:function(t){var e,s=1/0,a=-1/0,r=1/0,n=-1/0;return[new i.Point(this.x,this.y),new i.Point(this.x2,this.y),new i.Point(this.x,this.y2),new i.Point(this.x2,this.y2)].forEach((function(e){e=e.transform(t),s=Math.min(s,e.x),a=Math.max(a,e.x),r=Math.min(r,e.y),n=Math.max(n,e.y)})),(e=new this.constructor).x=s,e.width=a-s,e.y=r,e.height=n-r,b(e),e}}}),i.BBox=i.invent({create:function(t){if(i.Box.apply(this,[].slice.call(arguments)),t instanceof i.Element){var s;try{if(!e.documentElement.contains){for(var a=t.node;a.parentNode;)a=a.parentNode;if(a!=e)throw new Error("Element not in the dom")}s=t.node.getBBox()}catch(e){if(t instanceof i.Shape){i.parser.draw||i.prepare();var r=t.clone(i.parser.draw.instance).show();s=r.node.getBBox(),r.remove()}else s={x:t.node.clientLeft,y:t.node.clientTop,width:t.node.clientWidth,height:t.node.clientHeight}}i.Box.call(this,s)}},inherit:i.Box,parent:i.Element,construct:{bbox:function(){return new i.BBox(this)}}}),i.BBox.prototype.constructor=i.BBox,i.extend(i.Element,{tbox:function(){return console.warn("Use of TBox is deprecated and mapped to RBox. Use .rbox() instead."),this.rbox(this.doc())}}),i.RBox=i.invent({create:function(t){i.Box.apply(this,[].slice.call(arguments)),t instanceof i.Element&&i.Box.call(this,t.node.getBoundingClientRect())},inherit:i.Box,parent:i.Element,extend:{addOffset:function(){return this.x+=t.pageXOffset,this.y+=t.pageYOffset,this}},construct:{rbox:function(t){return t?new i.RBox(this).transform(t.screenCTM().inverse()):new i.RBox(this).addOffset()}}}),i.RBox.prototype.constructor=i.RBox,i.Matrix=i.invent({create:function(t){var e,s=f([1,0,0,1,0,0]);for(t=t instanceof i.Element?t.matrixify():"string"==typeof t?f(t.split(i.regex.delimiter).map(parseFloat)):6==arguments.length?f([].slice.call(arguments)):Array.isArray(t)?f(t):"object"===_typeof(t)?t:s,e=v.length-1;e>=0;--e)this[v[e]]=null!=t[v[e]]?t[v[e]]:s[v[e]]},extend:{extract:function(){var t=g(this,0,1),e=g(this,1,0),s=180/Math.PI*Math.atan2(t.y,t.x)-90;return{x:this.e,y:this.f,transformedX:(this.e*Math.cos(s*Math.PI/180)+this.f*Math.sin(s*Math.PI/180))/Math.sqrt(this.a*this.a+this.b*this.b),transformedY:(this.f*Math.cos(s*Math.PI/180)+this.e*Math.sin(-s*Math.PI/180))/Math.sqrt(this.c*this.c+this.d*this.d),skewX:-s,skewY:180/Math.PI*Math.atan2(e.y,e.x),scaleX:Math.sqrt(this.a*this.a+this.b*this.b),scaleY:Math.sqrt(this.c*this.c+this.d*this.d),rotation:s,a:this.a,b:this.b,c:this.c,d:this.d,e:this.e,f:this.f,matrix:new i.Matrix(this)}},clone:function(){return new i.Matrix(this)},morph:function(t){return this.destination=new i.Matrix(t),this},at:function(t){return this.destination?new i.Matrix({a:this.a+(this.destination.a-this.a)*t,b:this.b+(this.destination.b-this.b)*t,c:this.c+(this.destination.c-this.c)*t,d:this.d+(this.destination.d-this.d)*t,e:this.e+(this.destination.e-this.e)*t,f:this.f+(this.destination.f-this.f)*t}):this},multiply:function(t){return new i.Matrix(this.native().multiply(function(t){t instanceof i.Matrix||(t=new i.Matrix(t));return t}(t).native()))},inverse:function(){return new i.Matrix(this.native().inverse())},translate:function(t,e){return new i.Matrix(this.native().translate(t||0,e||0))},scale:function(t,e,s,a){return 1==arguments.length?e=t:3==arguments.length&&(a=s,s=e,e=t),this.around(s,a,new i.Matrix(t,0,0,e,0,0))},rotate:function(t,e,s){return t=i.utils.radians(t),this.around(e,s,new i.Matrix(Math.cos(t),Math.sin(t),-Math.sin(t),Math.cos(t),0,0))},flip:function(t,e){return"x"==t?this.scale(-1,1,e,0):"y"==t?this.scale(1,-1,0,e):this.scale(-1,-1,t,null!=e?e:t)},skew:function(t,e,s,a){return 1==arguments.length?e=t:3==arguments.length&&(a=s,s=e,e=t),t=i.utils.radians(t),e=i.utils.radians(e),this.around(s,a,new i.Matrix(1,Math.tan(e),Math.tan(t),1,0,0))},skewX:function(t,e,i){return this.skew(t,0,e,i)},skewY:function(t,e,i){return this.skew(0,t,e,i)},around:function(t,e,s){return this.multiply(new i.Matrix(1,0,0,1,t||0,e||0)).multiply(s).multiply(new i.Matrix(1,0,0,1,-t||0,-e||0))},native:function(){for(var t=i.parser.native.createSVGMatrix(),e=v.length-1;e>=0;e--)t[v[e]]=this[v[e]];return t},toString:function(){return"matrix("+m(this.a)+","+m(this.b)+","+m(this.c)+","+m(this.d)+","+m(this.e)+","+m(this.f)+")"}},parent:i.Element,construct:{ctm:function(){return new i.Matrix(this.node.getCTM())},screenCTM:function(){if(this instanceof i.Nested){var t=this.rect(1,1),e=t.node.getScreenCTM();return t.remove(),new i.Matrix(e)}return new i.Matrix(this.node.getScreenCTM())}}}),i.Point=i.invent({create:function(t,e){var i;i=Array.isArray(t)?{x:t[0],y:t[1]}:"object"===_typeof(t)?{x:t.x,y:t.y}:null!=t?{x:t,y:null!=e?e:t}:{x:0,y:0},this.x=i.x,this.y=i.y},extend:{clone:function(){return new i.Point(this)},morph:function(t,e){return this.destination=new i.Point(t,e),this},at:function(t){return this.destination?new i.Point({x:this.x+(this.destination.x-this.x)*t,y:this.y+(this.destination.y-this.y)*t}):this},native:function(){var t=i.parser.native.createSVGPoint();return t.x=this.x,t.y=this.y,t},transform:function(t){return new i.Point(this.native().matrixTransform(t.native()))}}}),i.extend(i.Element,{point:function(t,e){return new i.Point(t,e).transform(this.screenCTM().inverse())}}),i.extend(i.Element,{attr:function(t,e,s){if(null==t){for(t={},s=(e=this.node.attributes).length-1;s>=0;s--)t[e[s].nodeName]=i.regex.isNumber.test(e[s].nodeValue)?parseFloat(e[s].nodeValue):e[s].nodeValue;return t}if("object"===_typeof(t))for(e in t)this.attr(e,t[e]);else if(null===e)this.node.removeAttribute(t);else{if(null==e)return null==(e=this.node.getAttribute(t))?i.defaults.attrs[t]:i.regex.isNumber.test(e)?parseFloat(e):e;"stroke-width"==t?this.attr("stroke",parseFloat(e)>0?this._stroke:null):"stroke"==t&&(this._stroke=e),"fill"!=t&&"stroke"!=t||(i.regex.isImage.test(e)&&(e=this.doc().defs().image(e,0,0)),e instanceof i.Image&&(e=this.doc().defs().pattern(0,0,(function(){this.add(e)})))),"number"==typeof e?e=new i.Number(e):i.Color.isColor(e)?e=new i.Color(e):Array.isArray(e)&&(e=new i.Array(e)),"leading"==t?this.leading&&this.leading(e):"string"==typeof s?this.node.setAttributeNS(s,t,e.toString()):this.node.setAttribute(t,e.toString()),!this.rebuild||"font-size"!=t&&"x"!=t||this.rebuild(t,e)}return this}}),i.extend(i.Element,{transform:function(t,e){var s,a;if("object"!==_typeof(t))return s=new i.Matrix(this).extract(),"string"==typeof t?s[t]:s;if(s=new i.Matrix(this),e=!!e||!!t.relative,null!=t.a)s=e?s.multiply(new i.Matrix(t)):new i.Matrix(t);else if(null!=t.rotation)p(t,this),s=e?s.rotate(t.rotation,t.cx,t.cy):s.rotate(t.rotation-s.extract().rotation,t.cx,t.cy);else if(null!=t.scale||null!=t.scaleX||null!=t.scaleY){if(p(t,this),t.scaleX=null!=t.scale?t.scale:null!=t.scaleX?t.scaleX:1,t.scaleY=null!=t.scale?t.scale:null!=t.scaleY?t.scaleY:1,!e){var r=s.extract();t.scaleX=1*t.scaleX/r.scaleX,t.scaleY=1*t.scaleY/r.scaleY}s=s.scale(t.scaleX,t.scaleY,t.cx,t.cy)}else if(null!=t.skew||null!=t.skewX||null!=t.skewY){if(p(t,this),t.skewX=null!=t.skew?t.skew:null!=t.skewX?t.skewX:0,t.skewY=null!=t.skew?t.skew:null!=t.skewY?t.skewY:0,!e){r=s.extract();s=s.multiply((new i.Matrix).skew(r.skewX,r.skewY,t.cx,t.cy).inverse())}s=s.skew(t.skewX,t.skewY,t.cx,t.cy)}else t.flip?("x"==t.flip||"y"==t.flip?t.offset=null==t.offset?this.bbox()["c"+t.flip]:t.offset:null==t.offset?(a=this.bbox(),t.flip=a.cx,t.offset=a.cy):t.flip=t.offset,s=(new i.Matrix).flip(t.flip,t.offset)):null==t.x&&null==t.y||(e?s=s.translate(t.x,t.y):(null!=t.x&&(s.e=t.x),null!=t.y&&(s.f=t.y)));return this.attr("transform",s)}}),i.extend(i.FX,{transform:function(t,e){var s,a,r=this.target();return"object"!==_typeof(t)?(s=new i.Matrix(r).extract(),"string"==typeof t?s[t]:s):(e=!!e||!!t.relative,null!=t.a?s=new i.Matrix(t):null!=t.rotation?(p(t,r),s=new i.Rotate(t.rotation,t.cx,t.cy)):null!=t.scale||null!=t.scaleX||null!=t.scaleY?(p(t,r),t.scaleX=null!=t.scale?t.scale:null!=t.scaleX?t.scaleX:1,t.scaleY=null!=t.scale?t.scale:null!=t.scaleY?t.scaleY:1,s=new i.Scale(t.scaleX,t.scaleY,t.cx,t.cy)):null!=t.skewX||null!=t.skewY?(p(t,r),t.skewX=null!=t.skewX?t.skewX:0,t.skewY=null!=t.skewY?t.skewY:0,s=new i.Skew(t.skewX,t.skewY,t.cx,t.cy)):t.flip?("x"==t.flip||"y"==t.flip?t.offset=null==t.offset?r.bbox()["c"+t.flip]:t.offset:null==t.offset?(a=r.bbox(),t.flip=a.cx,t.offset=a.cy):t.flip=t.offset,s=(new i.Matrix).flip(t.flip,t.offset)):null==t.x&&null==t.y||(s=new i.Translate(t.x,t.y)),s?(s.relative=e,this.last().transforms.push(s),this._callStart()):this)}}),i.extend(i.Element,{untransform:function(){return this.attr("transform",null)},matrixify:function(){return(this.attr("transform")||"").split(i.regex.transforms).slice(0,-1).map((function(t){var e=t.trim().split("(");return[e[0],e[1].split(i.regex.delimiter).map((function(t){return parseFloat(t)}))]})).reduce((function(t,e){return"matrix"==e[0]?t.multiply(f(e[1])):t[e[0]].apply(t,e[1])}),new i.Matrix)},toParent:function(t){if(this==t)return this;var e=this.screenCTM(),i=t.screenCTM().inverse();return this.addTo(t).untransform().transform(i.multiply(e)),this},toDoc:function(){return this.toParent(this.doc())}}),i.Transformation=i.invent({create:function(t,e){if(arguments.length>1&&"boolean"!=typeof e)return this.constructor.call(this,[].slice.call(arguments));if(Array.isArray(t))for(var i=0,s=this.arguments.length;i<s;++i)this[this.arguments[i]]=t[i];else if("object"===_typeof(t))for(i=0,s=this.arguments.length;i<s;++i)this[this.arguments[i]]=t[this.arguments[i]];this.inversed=!1,!0===e&&(this.inversed=!0)},extend:{arguments:[],method:"",at:function(t){for(var e=[],s=0,a=this.arguments.length;s<a;++s)e.push(this[this.arguments[s]]);var r=this._undo||new i.Matrix;return r=(new i.Matrix).morph(i.Matrix.prototype[this.method].apply(r,e)).at(t),this.inversed?r.inverse():r},undo:function(t){for(var e=0,s=this.arguments.length;e<s;++e)t[this.arguments[e]]=void 0===this[this.arguments[e]]?0:t[this.arguments[e]];return t.cx=this.cx,t.cy=this.cy,this._undo=new(i[c(this.method)])(t,!0).at(1),this}}}),i.Translate=i.invent({parent:i.Matrix,inherit:i.Transformation,create:function(t,e){this.constructor.apply(this,[].slice.call(arguments))},extend:{arguments:["transformedX","transformedY"],method:"translate"}}),i.Rotate=i.invent({parent:i.Matrix,inherit:i.Transformation,create:function(t,e){this.constructor.apply(this,[].slice.call(arguments))},extend:{arguments:["rotation","cx","cy"],method:"rotate",at:function(t){var e=(new i.Matrix).rotate((new i.Number).morph(this.rotation-(this._undo?this._undo.rotation:0)).at(t),this.cx,this.cy);return this.inversed?e.inverse():e},undo:function(t){return this._undo=t,this}}}),i.Scale=i.invent({parent:i.Matrix,inherit:i.Transformation,create:function(t,e){this.constructor.apply(this,[].slice.call(arguments))},extend:{arguments:["scaleX","scaleY","cx","cy"],method:"scale"}}),i.Skew=i.invent({parent:i.Matrix,inherit:i.Transformation,create:function(t,e){this.constructor.apply(this,[].slice.call(arguments))},extend:{arguments:["skewX","skewY","cx","cy"],method:"skew"}}),i.extend(i.Element,{style:function(t,e){if(0==arguments.length)return this.node.style.cssText||"";if(arguments.length<2)if("object"===_typeof(t))for(e in t)this.style(e,t[e]);else{if(!i.regex.isCss.test(t))return this.node.style[h(t)];for(t=t.split(/\s*;\s*/).filter((function(t){return!!t})).map((function(t){return t.split(/\s*:\s*/)}));e=t.pop();)this.style(e[0],e[1])}else this.node.style[h(t)]=null===e||i.regex.isBlank.test(e)?"":e;return this}}),i.Parent=i.invent({create:function(t){this.constructor.call(this,t)},inherit:i.Element,extend:{children:function(){return i.utils.map(i.utils.filterSVGElements(this.node.childNodes),(function(t){return i.adopt(t)}))},add:function(t,e){return null==e?this.node.appendChild(t.node):t.node!=this.node.childNodes[e]&&this.node.insertBefore(t.node,this.node.childNodes[e]),this},put:function(t,e){return this.add(t,e),t},has:function(t){return this.index(t)>=0},index:function(t){return[].slice.call(this.node.childNodes).indexOf(t.node)},get:function(t){return i.adopt(this.node.childNodes[t])},first:function(){return this.get(0)},last:function(){return this.get(this.node.childNodes.length-1)},each:function(t,e){var s,a,r=this.children();for(s=0,a=r.length;s<a;s++)r[s]instanceof i.Element&&t.apply(r[s],[s,r]),e&&r[s]instanceof i.Container&&r[s].each(t,e);return this},removeElement:function(t){return this.node.removeChild(t.node),this},clear:function(){for(;this.node.hasChildNodes();)this.node.removeChild(this.node.lastChild);return delete this._defs,this},defs:function(){return this.doc().defs()}}}),i.extend(i.Parent,{ungroup:function(t,e){return 0===e||this instanceof i.Defs||this.node==i.parser.draw?this:(t=t||(this instanceof i.Doc?this:this.parent(i.Parent)),e=e||1/0,this.each((function(){return this instanceof i.Defs?this:this instanceof i.Parent?this.ungroup(t,e-1):this.toParent(t)})),this.node.firstChild||this.remove(),this)},flatten:function(t,e){return this.ungroup(t,e)}}),i.Container=i.invent({create:function(t){this.constructor.call(this,t)},inherit:i.Parent}),i.ViewBox=i.invent({create:function(t){var e,s,a,r,n,o,l,h=[0,0,0,0],c=1,d=1,u=/[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/gi;if(t instanceof i.Element){for(o=t,l=t,n=(t.attr("viewBox")||"").match(u),t.bbox,a=new i.Number(t.width()),r=new i.Number(t.height());"%"==a.unit;)c*=a.value,a=new i.Number(o instanceof i.Doc?o.parent().offsetWidth:o.parent().width()),o=o.parent();for(;"%"==r.unit;)d*=r.value,r=new i.Number(l instanceof i.Doc?l.parent().offsetHeight:l.parent().height()),l=l.parent();this.x=0,this.y=0,this.width=a*c,this.height=r*d,this.zoom=1,n&&(e=parseFloat(n[0]),s=parseFloat(n[1]),a=parseFloat(n[2]),r=parseFloat(n[3]),this.zoom=this.width/this.height>a/r?this.height/r:this.width/a,this.x=e,this.y=s,this.width=a,this.height=r)}else t="string"==typeof t?t.match(u).map((function(t){return parseFloat(t)})):Array.isArray(t)?t:"object"===_typeof(t)?[t.x,t.y,t.width,t.height]:4==arguments.length?[].slice.call(arguments):h,this.x=t[0],this.y=t[1],this.width=t[2],this.height=t[3]},extend:{toString:function(){return this.x+" "+this.y+" "+this.width+" "+this.height},morph:function(t,e,s,a){return this.destination=new i.ViewBox(t,e,s,a),this},at:function(t){return this.destination?new i.ViewBox([this.x+(this.destination.x-this.x)*t,this.y+(this.destination.y-this.y)*t,this.width+(this.destination.width-this.width)*t,this.height+(this.destination.height-this.height)*t]):this}},parent:i.Container,construct:{viewbox:function(t,e,s,a){return 0==arguments.length?new i.ViewBox(this):this.attr("viewBox",new i.ViewBox(t,e,s,a))}}}),["click","dblclick","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchmove","touchleave","touchend","touchcancel"].forEach((function(t){i.Element.prototype[t]=function(e){return i.on(this.node,t,e),this}})),i.listeners=[],i.handlerMap=[],i.listenerId=0,i.on=function(t,e,s,a,r){var n=s.bind(a||t.instance||t),o=(i.handlerMap.indexOf(t)+1||i.handlerMap.push(t))-1,l=e.split(".")[0],h=e.split(".")[1]||"*";i.listeners[o]=i.listeners[o]||{},i.listeners[o][l]=i.listeners[o][l]||{},i.listeners[o][l][h]=i.listeners[o][l][h]||{},s._svgjsListenerId||(s._svgjsListenerId=++i.listenerId),i.listeners[o][l][h][s._svgjsListenerId]=n,t.addEventListener(l,n,r||!1)},i.off=function(t,e,s){var a=i.handlerMap.indexOf(t),r=e&&e.split(".")[0],n=e&&e.split(".")[1],o="";if(-1!=a)if(s){if("function"==typeof s&&(s=s._svgjsListenerId),!s)return;i.listeners[a][r]&&i.listeners[a][r][n||"*"]&&(t.removeEventListener(r,i.listeners[a][r][n||"*"][s],!1),delete i.listeners[a][r][n||"*"][s])}else if(n&&r){if(i.listeners[a][r]&&i.listeners[a][r][n]){for(s in i.listeners[a][r][n])i.off(t,[r,n].join("."),s);delete i.listeners[a][r][n]}}else if(n)for(e in i.listeners[a])for(o in i.listeners[a][e])n===o&&i.off(t,[e,n].join("."));else if(r){if(i.listeners[a][r]){for(o in i.listeners[a][r])i.off(t,[r,o].join("."));delete i.listeners[a][r]}}else{for(e in i.listeners[a])i.off(t,e);delete i.listeners[a],delete i.handlerMap[a]}},i.extend(i.Element,{on:function(t,e,s,a){return i.on(this.node,t,e,s,a),this},off:function(t,e){return i.off(this.node,t,e),this},fire:function(e,s){return e instanceof t.Event?this.node.dispatchEvent(e):this.node.dispatchEvent(e=new i.CustomEvent(e,{detail:s,cancelable:!0})),this._event=e,this},event:function(){return this._event}}),i.Defs=i.invent({create:"defs",inherit:i.Container}),i.G=i.invent({create:"g",inherit:i.Container,extend:{x:function(t){return null==t?this.transform("x"):this.transform({x:t-this.x()},!0)},y:function(t){return null==t?this.transform("y"):this.transform({y:t-this.y()},!0)},cx:function(t){return null==t?this.gbox().cx:this.x(t-this.gbox().width/2)},cy:function(t){return null==t?this.gbox().cy:this.y(t-this.gbox().height/2)},gbox:function(){var t=this.bbox(),e=this.transform();return t.x+=e.x,t.x2+=e.x,t.cx+=e.x,t.y+=e.y,t.y2+=e.y,t.cy+=e.y,t}},construct:{group:function(){return this.put(new i.G)}}}),i.Doc=i.invent({create:function(t){t&&("svg"==(t="string"==typeof t?e.getElementById(t):t).nodeName?this.constructor.call(this,t):(this.constructor.call(this,i.create("svg")),t.appendChild(this.node),this.size("100%","100%")),this.namespace().defs())},inherit:i.Container,extend:{namespace:function(){return this.attr({xmlns:i.ns,version:"1.1"}).attr("xmlns:xlink",i.xlink,i.xmlns).attr("xmlns:svgjs",i.svgjs,i.xmlns)},defs:function(){var t;this._defs||((t=this.node.getElementsByTagName("defs")[0])?this._defs=i.adopt(t):this._defs=new i.Defs,this.node.appendChild(this._defs.node));return this._defs},parent:function(){return this.node.parentNode&&"#document"!=this.node.parentNode.nodeName?this.node.parentNode:null},spof:function(){var t=this.node.getScreenCTM();return t&&this.style("left",-t.e%1+"px").style("top",-t.f%1+"px"),this},remove:function(){return this.parent()&&this.parent().removeChild(this.node),this},clear:function(){for(;this.node.hasChildNodes();)this.node.removeChild(this.node.lastChild);return delete this._defs,i.parser.draw&&!i.parser.draw.parentNode&&this.node.appendChild(i.parser.draw),this},clone:function(t){this.writeDataToDom();var e=this.node,i=x(e.cloneNode(!0));return t?(t.node||t).appendChild(i.node):e.parentNode.insertBefore(i.node,e.nextSibling),i}}}),i.extend(i.Element,{siblings:function(){return this.parent().children()},position:function(){return this.parent().index(this)},next:function(){return this.siblings()[this.position()+1]},previous:function(){return this.siblings()[this.position()-1]},forward:function(){var t=this.position()+1,e=this.parent();return e.removeElement(this).add(this,t),e instanceof i.Doc&&e.node.appendChild(e.defs().node),this},backward:function(){var t=this.position();return t>0&&this.parent().removeElement(this).add(this,t-1),this},front:function(){var t=this.parent();return t.node.appendChild(this.node),t instanceof i.Doc&&t.node.appendChild(t.defs().node),this},back:function(){return this.position()>0&&this.parent().removeElement(this).add(this,0),this},before:function(t){t.remove();var e=this.position();return this.parent().add(t,e),this},after:function(t){t.remove();var e=this.position();return this.parent().add(t,e+1),this}}),i.Mask=i.invent({create:function(){this.constructor.call(this,i.create("mask")),this.targets=[]},inherit:i.Container,extend:{remove:function(){for(var t=this.targets.length-1;t>=0;t--)this.targets[t]&&this.targets[t].unmask();return this.targets=[],i.Element.prototype.remove.call(this),this}},construct:{mask:function(){return this.defs().put(new i.Mask)}}}),i.extend(i.Element,{maskWith:function(t){return this.masker=t instanceof i.Mask?t:this.parent().mask().add(t),this.masker.targets.push(this),this.attr("mask",'url("#'+this.masker.attr("id")+'")')},unmask:function(){return delete this.masker,this.attr("mask",null)}}),i.ClipPath=i.invent({create:function(){this.constructor.call(this,i.create("clipPath")),this.targets=[]},inherit:i.Container,extend:{remove:function(){for(var t=this.targets.length-1;t>=0;t--)this.targets[t]&&this.targets[t].unclip();return this.targets=[],this.parent().removeElement(this),this}},construct:{clip:function(){return this.defs().put(new i.ClipPath)}}}),i.extend(i.Element,{clipWith:function(t){return this.clipper=t instanceof i.ClipPath?t:this.parent().clip().add(t),this.clipper.targets.push(this),this.attr("clip-path",'url("#'+this.clipper.attr("id")+'")')},unclip:function(){return delete this.clipper,this.attr("clip-path",null)}}),i.Gradient=i.invent({create:function(t){this.constructor.call(this,i.create(t+"Gradient")),this.type=t},inherit:i.Container,extend:{at:function(t,e,s){return this.put(new i.Stop).update(t,e,s)},update:function(t){return this.clear(),"function"==typeof t&&t.call(this,this),this},fill:function(){return"url(#"+this.id()+")"},toString:function(){return this.fill()},attr:function(t,e,s){return"transform"==t&&(t="gradientTransform"),i.Container.prototype.attr.call(this,t,e,s)}},construct:{gradient:function(t,e){return this.defs().gradient(t,e)}}}),i.extend(i.Gradient,i.FX,{from:function(t,e){return"radial"==(this._target||this).type?this.attr({fx:new i.Number(t),fy:new i.Number(e)}):this.attr({x1:new i.Number(t),y1:new i.Number(e)})},to:function(t,e){return"radial"==(this._target||this).type?this.attr({cx:new i.Number(t),cy:new i.Number(e)}):this.attr({x2:new i.Number(t),y2:new i.Number(e)})}}),i.extend(i.Defs,{gradient:function(t,e){return this.put(new i.Gradient(t)).update(e)}}),i.Stop=i.invent({create:"stop",inherit:i.Element,extend:{update:function(t){return("number"==typeof t||t instanceof i.Number)&&(t={offset:arguments[0],color:arguments[1],opacity:arguments[2]}),null!=t.opacity&&this.attr("stop-opacity",t.opacity),null!=t.color&&this.attr("stop-color",t.color),null!=t.offset&&this.attr("offset",new i.Number(t.offset)),this}}}),i.Pattern=i.invent({create:"pattern",inherit:i.Container,extend:{fill:function(){return"url(#"+this.id()+")"},update:function(t){return this.clear(),"function"==typeof t&&t.call(this,this),this},toString:function(){return this.fill()},attr:function(t,e,s){return"transform"==t&&(t="patternTransform"),i.Container.prototype.attr.call(this,t,e,s)}},construct:{pattern:function(t,e,i){return this.defs().pattern(t,e,i)}}}),i.extend(i.Defs,{pattern:function(t,e,s){return this.put(new i.Pattern).update(s).attr({x:0,y:0,width:t,height:e,patternUnits:"userSpaceOnUse"})}}),i.Shape=i.invent({create:function(t){this.constructor.call(this,t)},inherit:i.Element}),i.Bare=i.invent({create:function(t,e){if(this.constructor.call(this,i.create(t)),e)for(var s in e.prototype)"function"==typeof e.prototype[s]&&(this[s]=e.prototype[s])},inherit:i.Element,extend:{words:function(t){for(;this.node.hasChildNodes();)this.node.removeChild(this.node.lastChild);return this.node.appendChild(e.createTextNode(t)),this}}}),i.extend(i.Parent,{element:function(t,e){return this.put(new i.Bare(t,e))}}),i.Symbol=i.invent({create:"symbol",inherit:i.Container,construct:{symbol:function(){return this.put(new i.Symbol)}}}),i.Use=i.invent({create:"use",inherit:i.Shape,extend:{element:function(t,e){return this.attr("href",(e||"")+"#"+t,i.xlink)}},construct:{use:function(t,e){return this.put(new i.Use).element(t,e)}}}),i.Rect=i.invent({create:"rect",inherit:i.Shape,construct:{rect:function(t,e){return this.put(new i.Rect).size(t,e)}}}),i.Circle=i.invent({create:"circle",inherit:i.Shape,construct:{circle:function(t){return this.put(new i.Circle).rx(new i.Number(t).divide(2)).move(0,0)}}}),i.extend(i.Circle,i.FX,{rx:function(t){return this.attr("r",t)},ry:function(t){return this.rx(t)}}),i.Ellipse=i.invent({create:"ellipse",inherit:i.Shape,construct:{ellipse:function(t,e){return this.put(new i.Ellipse).size(t,e).move(0,0)}}}),i.extend(i.Ellipse,i.Rect,i.FX,{rx:function(t){return this.attr("rx",t)},ry:function(t){return this.attr("ry",t)}}),i.extend(i.Circle,i.Ellipse,{x:function(t){return null==t?this.cx()-this.rx():this.cx(t+this.rx())},y:function(t){return null==t?this.cy()-this.ry():this.cy(t+this.ry())},cx:function(t){return null==t?this.attr("cx"):this.attr("cx",t)},cy:function(t){return null==t?this.attr("cy"):this.attr("cy",t)},width:function(t){return null==t?2*this.rx():this.rx(new i.Number(t).divide(2))},height:function(t){return null==t?2*this.ry():this.ry(new i.Number(t).divide(2))},size:function(t,e){var s=u(this,t,e);return this.rx(new i.Number(s.width).divide(2)).ry(new i.Number(s.height).divide(2))}}),i.Line=i.invent({create:"line",inherit:i.Shape,extend:{array:function(){return new i.PointArray([[this.attr("x1"),this.attr("y1")],[this.attr("x2"),this.attr("y2")]])},plot:function(t,e,s,a){return null==t?this.array():(t=void 0!==e?{x1:t,y1:e,x2:s,y2:a}:new i.PointArray(t).toLine(),this.attr(t))},move:function(t,e){return this.attr(this.array().move(t,e).toLine())},size:function(t,e){var i=u(this,t,e);return this.attr(this.array().size(i.width,i.height).toLine())}},construct:{line:function(t,e,s,a){return i.Line.prototype.plot.apply(this.put(new i.Line),null!=t?[t,e,s,a]:[0,0,0,0])}}}),i.Polyline=i.invent({create:"polyline",inherit:i.Shape,construct:{polyline:function(t){return this.put(new i.Polyline).plot(t||new i.PointArray)}}}),i.Polygon=i.invent({create:"polygon",inherit:i.Shape,construct:{polygon:function(t){return this.put(new i.Polygon).plot(t||new i.PointArray)}}}),i.extend(i.Polyline,i.Polygon,{array:function(){return this._array||(this._array=new i.PointArray(this.attr("points")))},plot:function(t){return null==t?this.array():this.clear().attr("points","string"==typeof t?t:this._array=new i.PointArray(t))},clear:function(){return delete this._array,this},move:function(t,e){return this.attr("points",this.array().move(t,e))},size:function(t,e){var i=u(this,t,e);return this.attr("points",this.array().size(i.width,i.height))}}),i.extend(i.Line,i.Polyline,i.Polygon,{morphArray:i.PointArray,x:function(t){return null==t?this.bbox().x:this.move(t,this.bbox().y)},y:function(t){return null==t?this.bbox().y:this.move(this.bbox().x,t)},width:function(t){var e=this.bbox();return null==t?e.width:this.size(t,e.height)},height:function(t){var e=this.bbox();return null==t?e.height:this.size(e.width,t)}}),i.Path=i.invent({create:"path",inherit:i.Shape,extend:{morphArray:i.PathArray,array:function(){return this._array||(this._array=new i.PathArray(this.attr("d")))},plot:function(t){return null==t?this.array():this.clear().attr("d","string"==typeof t?t:this._array=new i.PathArray(t))},clear:function(){return delete this._array,this},move:function(t,e){return this.attr("d",this.array().move(t,e))},x:function(t){return null==t?this.bbox().x:this.move(t,this.bbox().y)},y:function(t){return null==t?this.bbox().y:this.move(this.bbox().x,t)},size:function(t,e){var i=u(this,t,e);return this.attr("d",this.array().size(i.width,i.height))},width:function(t){return null==t?this.bbox().width:this.size(t,this.bbox().height)},height:function(t){return null==t?this.bbox().height:this.size(this.bbox().width,t)}},construct:{path:function(t){return this.put(new i.Path).plot(t||new i.PathArray)}}}),i.Image=i.invent({create:"image",inherit:i.Shape,extend:{load:function(e){if(!e)return this;var s=this,a=new t.Image;return i.on(a,"load",(function(){i.off(a);var t=s.parent(i.Pattern);null!==t&&(0==s.width()&&0==s.height()&&s.size(a.width,a.height),t&&0==t.width()&&0==t.height()&&t.size(s.width(),s.height()),"function"==typeof s._loaded&&s._loaded.call(s,{width:a.width,height:a.height,ratio:a.width/a.height,url:e}))})),i.on(a,"error",(function(t){i.off(a),"function"==typeof s._error&&s._error.call(s,t)})),this.attr("href",a.src=this.src=e,i.xlink)},loaded:function(t){return this._loaded=t,this},error:function(t){return this._error=t,this}},construct:{image:function(t,e,s){return this.put(new i.Image).load(t).size(e||0,s||e||0)}}}),i.Text=i.invent({create:function(){this.constructor.call(this,i.create("text")),this.dom.leading=new i.Number(1.3),this._rebuild=!0,this._build=!1,this.attr("font-family",i.defaults.attrs["font-family"])},inherit:i.Shape,extend:{x:function(t){return null==t?this.attr("x"):this.attr("x",t)},y:function(t){var e=this.attr("y"),i="number"==typeof e?e-this.bbox().y:0;return null==t?"number"==typeof e?e-i:e:this.attr("y","number"==typeof t.valueOf()?t+i:t)},cx:function(t){return null==t?this.bbox().cx:this.x(t-this.bbox().width/2)},cy:function(t){return null==t?this.bbox().cy:this.y(t-this.bbox().height/2)},text:function(t){if(void 0===t){t="";for(var e=this.node.childNodes,s=0,a=e.length;s<a;++s)0!=s&&3!=e[s].nodeType&&1==i.adopt(e[s]).dom.newLined&&(t+="\n"),t+=e[s].textContent;return t}if(this.clear().build(!0),"function"==typeof t)t.call(this,this);else{s=0;for(var r=(t=t.split("\n")).length;s<r;s++)this.tspan(t[s]).newLine()}return this.build(!1).rebuild()},size:function(t){return this.attr("font-size",t).rebuild()},leading:function(t){return null==t?this.dom.leading:(this.dom.leading=new i.Number(t),this.rebuild())},lines:function(){var t=(this.textPath&&this.textPath()||this).node,e=i.utils.map(i.utils.filterSVGElements(t.childNodes),(function(t){return i.adopt(t)}));return new i.Set(e)},rebuild:function(t){if("boolean"==typeof t&&(this._rebuild=t),this._rebuild){var e=this,s=0,a=this.dom.leading*new i.Number(this.attr("font-size"));this.lines().each((function(){this.dom.newLined&&(e.textPath()||this.attr("x",e.attr("x")),"\n"==this.text()?s+=a:(this.attr("dy",a+s),s=0))})),this.fire("rebuild")}return this},build:function(t){return this._build=!!t,this},setData:function(t){return this.dom=t,this.dom.leading=new i.Number(t.leading||1.3),this}},construct:{text:function(t){return this.put(new i.Text).text(t)},plain:function(t){return this.put(new i.Text).plain(t)}}}),i.Tspan=i.invent({create:"tspan",inherit:i.Shape,extend:{text:function(t){return null==t?this.node.textContent+(this.dom.newLined?"\n":""):("function"==typeof t?t.call(this,this):this.plain(t),this)},dx:function(t){return this.attr("dx",t)},dy:function(t){return this.attr("dy",t)},newLine:function(){var t=this.parent(i.Text);return this.dom.newLined=!0,this.dy(t.dom.leading*t.attr("font-size")).attr("x",t.x())}}}),i.extend(i.Text,i.Tspan,{plain:function(t){return!1===this._build&&this.clear(),this.node.appendChild(e.createTextNode(t)),this},tspan:function(t){var e=(this.textPath&&this.textPath()||this).node,s=new i.Tspan;return!1===this._build&&this.clear(),e.appendChild(s.node),s.text(t)},clear:function(){for(var t=(this.textPath&&this.textPath()||this).node;t.hasChildNodes();)t.removeChild(t.lastChild);return this},length:function(){return this.node.getComputedTextLength()}}),i.TextPath=i.invent({create:"textPath",inherit:i.Parent,parent:i.Text,construct:{morphArray:i.PathArray,path:function(t){for(var e=new i.TextPath,s=this.doc().defs().path(t);this.node.hasChildNodes();)e.node.appendChild(this.node.firstChild);return this.node.appendChild(e.node),e.attr("href","#"+s,i.xlink),this},array:function(){var t=this.track();return t?t.array():null},plot:function(t){var e=this.track(),i=null;return e&&(i=e.plot(t)),null==t?i:this},track:function(){var t=this.textPath();if(t)return t.reference("href")},textPath:function(){if(this.node.firstChild&&"textPath"==this.node.firstChild.nodeName)return i.adopt(this.node.firstChild)}}}),i.Nested=i.invent({create:function(){this.constructor.call(this,i.create("svg")),this.style("overflow","visible")},inherit:i.Container,construct:{nested:function(){return this.put(new i.Nested)}}}),i.A=i.invent({create:"a",inherit:i.Container,extend:{to:function(t){return this.attr("href",t,i.xlink)},show:function(t){return this.attr("show",t,i.xlink)},target:function(t){return this.attr("target",t)}},construct:{link:function(t){return this.put(new i.A).to(t)}}}),i.extend(i.Element,{linkTo:function(t){var e=new i.A;return"function"==typeof t?t.call(e,e):e.to(t),this.parent().put(e).put(this)}}),i.Marker=i.invent({create:"marker",inherit:i.Container,extend:{width:function(t){return this.attr("markerWidth",t)},height:function(t){return this.attr("markerHeight",t)},ref:function(t,e){return this.attr("refX",t).attr("refY",e)},update:function(t){return this.clear(),"function"==typeof t&&t.call(this,this),this},toString:function(){return"url(#"+this.id()+")"}},construct:{marker:function(t,e,i){return this.defs().marker(t,e,i)}}}),i.extend(i.Defs,{marker:function(t,e,s){return this.put(new i.Marker).size(t,e).ref(t/2,e/2).viewbox(0,0,t,e).attr("orient","auto").update(s)}}),i.extend(i.Line,i.Polyline,i.Polygon,i.Path,{marker:function(t,e,s,a){var r=["marker"];return"all"!=t&&r.push(t),r=r.join("-"),t=arguments[1]instanceof i.Marker?arguments[1]:this.doc().marker(e,s,a),this.attr(r,t)}});var o={stroke:["color","width","opacity","linecap","linejoin","miterlimit","dasharray","dashoffset"],fill:["color","opacity","rule"],prefix:function(t,e){return"color"==e?t:t+"-"+e}};function l(t,e,s,a){return s+a.replace(i.regex.dots," .")}function h(t){return t.toLowerCase().replace(/-(.)/g,(function(t,e){return e.toUpperCase()}))}function c(t){return t.charAt(0).toUpperCase()+t.slice(1)}function d(t){var e=t.toString(16);return 1==e.length?"0"+e:e}function u(t,e,i){if(null==e||null==i){var s=t.bbox();null==e?e=s.width/s.height*i:null==i&&(i=s.height/s.width*e)}return{width:e,height:i}}function g(t,e,i){return{x:e*t.a+i*t.c+0,y:e*t.b+i*t.d+0}}function f(t){return{a:t[0],b:t[1],c:t[2],d:t[3],e:t[4],f:t[5]}}function p(t,e){t.cx=null==t.cx?e.bbox().cx:t.cx,t.cy=null==t.cy?e.bbox().cy:t.cy}function x(e){for(var s=e.childNodes.length-1;s>=0;s--)e.childNodes[s]instanceof t.SVGElement&&x(e.childNodes[s]);return i.adopt(e).id(i.eid(e.nodeName))}function b(t){return null==t.x&&(t.x=0,t.y=0,t.width=0,t.height=0),t.w=t.width,t.h=t.height,t.x2=t.x+t.width,t.y2=t.y+t.height,t.cx=t.x+t.width/2,t.cy=t.y+t.height/2,t}function m(t){return Math.abs(t)>1e-37?t:0}["fill","stroke"].forEach((function(t){var e,s={};s[t]=function(s){if(void 0===s)return this;if("string"==typeof s||i.Color.isRgb(s)||s&&"function"==typeof s.fill)this.attr(t,s);else for(e=o[t].length-1;e>=0;e--)null!=s[o[t][e]]&&this.attr(o.prefix(t,o[t][e]),s[o[t][e]]);return this},i.extend(i.Element,i.FX,s)})),i.extend(i.Element,i.FX,{rotate:function(t,e,i){return this.transform({rotation:t,cx:e,cy:i})},skew:function(t,e,i,s){return 1==arguments.length||3==arguments.length?this.transform({skew:t,cx:e,cy:i}):this.transform({skewX:t,skewY:e,cx:i,cy:s})},scale:function(t,e,i,s){return 1==arguments.length||3==arguments.length?this.transform({scale:t,cx:e,cy:i}):this.transform({scaleX:t,scaleY:e,cx:i,cy:s})},translate:function(t,e){return this.transform({x:t,y:e})},flip:function(t,e){return e="number"==typeof t?t:e,this.transform({flip:t||"both",offset:e})},matrix:function(t){return this.attr("transform",new i.Matrix(6==arguments.length?[].slice.call(arguments):t))},opacity:function(t){return this.attr("opacity",t)},dx:function(t){return this.x(new i.Number(t).plus(this instanceof i.FX?0:this.x()),!0)},dy:function(t){return this.y(new i.Number(t).plus(this instanceof i.FX?0:this.y()),!0)},dmove:function(t,e){return this.dx(t).dy(e)}}),i.extend(i.Rect,i.Ellipse,i.Circle,i.Gradient,i.FX,{radius:function(t,e){var s=(this._target||this).type;return"radial"==s||"circle"==s?this.attr("r",new i.Number(t)):this.rx(t).ry(null==e?t:e)}}),i.extend(i.Path,{length:function(){return this.node.getTotalLength()},pointAt:function(t){return this.node.getPointAtLength(t)}}),i.extend(i.Parent,i.Text,i.Tspan,i.FX,{font:function(t,e){if("object"===_typeof(t))for(e in t)this.font(e,t[e]);return"leading"==t?this.leading(e):"anchor"==t?this.attr("text-anchor",e):"size"==t||"family"==t||"weight"==t||"stretch"==t||"variant"==t||"style"==t?this.attr("font-"+t,e):this.attr(t,e)}}),i.Set=i.invent({create:function(t){Array.isArray(t)?this.members=t:this.clear()},extend:{add:function(){var t,e,i=[].slice.call(arguments);for(t=0,e=i.length;t<e;t++)this.members.push(i[t]);return this},remove:function(t){var e=this.index(t);return e>-1&&this.members.splice(e,1),this},each:function(t){for(var e=0,i=this.members.length;e<i;e++)t.apply(this.members[e],[e,this.members]);return this},clear:function(){return this.members=[],this},length:function(){return this.members.length},has:function(t){return this.index(t)>=0},index:function(t){return this.members.indexOf(t)},get:function(t){return this.members[t]},first:function(){return this.get(0)},last:function(){return this.get(this.members.length-1)},valueOf:function(){return this.members},bbox:function(){if(0==this.members.length)return new i.RBox;var t=this.members[0].rbox(this.members[0].doc());return this.each((function(){t=t.merge(this.rbox(this.doc()))})),t}},construct:{set:function(t){return new i.Set(t)}}}),i.FX.Set=i.invent({create:function(t){this.set=t}}),i.Set.inherit=function(){var t=[];for(var e in i.Shape.prototype)"function"==typeof i.Shape.prototype[e]&&"function"!=typeof i.Set.prototype[e]&&t.push(e);for(var e in t.forEach((function(t){i.Set.prototype[t]=function(){for(var e=0,s=this.members.length;e<s;e++)this.members[e]&&"function"==typeof this.members[e][t]&&this.members[e][t].apply(this.members[e],arguments);return"animate"==t?this.fx||(this.fx=new i.FX.Set(this)):this}})),t=[],i.FX.prototype)"function"==typeof i.FX.prototype[e]&&"function"!=typeof i.FX.Set.prototype[e]&&t.push(e);t.forEach((function(t){i.FX.Set.prototype[t]=function(){for(var e=0,i=this.set.members.length;e<i;e++)this.set.members[e].fx[t].apply(this.set.members[e].fx,arguments);return this}}))},i.extend(i.Element,{data:function(t,e,i){if("object"===_typeof(t))for(e in t)this.data(e,t[e]);else if(arguments.length<2)try{return JSON.parse(this.attr("data-"+t))}catch(e){return this.attr("data-"+t)}else this.attr("data-"+t,null===e?null:!0===i||"string"==typeof e||"number"==typeof e?e:JSON.stringify(e));return this}}),i.extend(i.Element,{remember:function(t,e){if("object"===_typeof(arguments[0]))for(var e in t)this.remember(e,t[e]);else{if(1==arguments.length)return this.memory()[t];this.memory()[t]=e}return this},forget:function(){if(0==arguments.length)this._memory={};else for(var t=arguments.length-1;t>=0;t--)delete this.memory()[arguments[t]];return this},memory:function(){return this._memory||(this._memory={})}}),i.get=function(t){var s=e.getElementById(function(t){var e=(t||"").toString().match(i.regex.reference);if(e)return e[1]}(t)||t);return i.adopt(s)},i.select=function(t,s){return new i.Set(i.utils.map((s||e).querySelectorAll(t),(function(t){return i.adopt(t)})))},i.extend(i.Parent,{select:function(t){return i.select(t,this.node)}});var v="abcdef".split("");if("function"!=typeof t.CustomEvent){var y=function(t,i){i=i||{bubbles:!1,cancelable:!1,detail:void 0};var s=e.createEvent("CustomEvent");return s.initCustomEvent(t,i.bubbles,i.cancelable,i.detail),s};y.prototype=t.Event.prototype,i.CustomEvent=y}else i.CustomEvent=t.CustomEvent;return function(e){for(var i=0,s=["moz","webkit"],a=0;a<s.length&&!t.requestAnimationFrame;++a)e.requestAnimationFrame=e[s[a]+"RequestAnimationFrame"],e.cancelAnimationFrame=e[s[a]+"CancelAnimationFrame"]||e[s[a]+"CancelRequestAnimationFrame"];e.requestAnimationFrame=e.requestAnimationFrame||function(t){var s=(new Date).getTime(),a=Math.max(0,16-(s-i)),r=e.setTimeout((function(){t(s+a)}),a);return i=s+a,r},e.cancelAnimationFrame=e.cancelAnimationFrame||e.clearTimeout}(t),i})),
/*! svg.filter.js - v2.0.2 - 2016-02-24
* https://github.com/wout/svg.filter.js
* Copyright (c) 2016 Wout Fierens; Licensed MIT */
function(){SVG.Filter=SVG.invent({create:"filter",inherit:SVG.Parent,extend:{source:"SourceGraphic",sourceAlpha:"SourceAlpha",background:"BackgroundImage",backgroundAlpha:"BackgroundAlpha",fill:"FillPaint",stroke:"StrokePaint",autoSetIn:!0,put:function(t,e){return this.add(t,e),!t.attr("in")&&this.autoSetIn&&t.attr("in",this.source),t.attr("result")||t.attr("result",t),t},blend:function(t,e,i){return this.put(new SVG.BlendEffect(t,e,i))},colorMatrix:function(t,e){return this.put(new SVG.ColorMatrixEffect(t,e))},convolveMatrix:function(t){return this.put(new SVG.ConvolveMatrixEffect(t))},componentTransfer:function(t){return this.put(new SVG.ComponentTransferEffect(t))},composite:function(t,e,i){return this.put(new SVG.CompositeEffect(t,e,i))},flood:function(t,e){return this.put(new SVG.FloodEffect(t,e))},offset:function(t,e){return this.put(new SVG.OffsetEffect(t,e))},image:function(t){return this.put(new SVG.ImageEffect(t))},merge:function(){var t=[void 0];for(var e in arguments)t.push(arguments[e]);return this.put(new(SVG.MergeEffect.bind.apply(SVG.MergeEffect,t)))},gaussianBlur:function(t,e){return this.put(new SVG.GaussianBlurEffect(t,e))},morphology:function(t,e){return this.put(new SVG.MorphologyEffect(t,e))},diffuseLighting:function(t,e,i){return this.put(new SVG.DiffuseLightingEffect(t,e,i))},displacementMap:function(t,e,i,s,a){return this.put(new SVG.DisplacementMapEffect(t,e,i,s,a))},specularLighting:function(t,e,i,s){return this.put(new SVG.SpecularLightingEffect(t,e,i,s))},tile:function(){return this.put(new SVG.TileEffect)},turbulence:function(t,e,i,s,a){return this.put(new SVG.TurbulenceEffect(t,e,i,s,a))},toString:function(){return"url(#"+this.attr("id")+")"}}}),SVG.extend(SVG.Defs,{filter:function(t){var e=this.put(new SVG.Filter);return"function"==typeof t&&t.call(e,e),e}}),SVG.extend(SVG.Container,{filter:function(t){return this.defs().filter(t)}}),SVG.extend(SVG.Element,SVG.G,SVG.Nested,{filter:function(t){return this.filterer=t instanceof SVG.Element?t:this.doc().filter(t),this.doc()&&this.filterer.doc()!==this.doc()&&this.doc().defs().add(this.filterer),this.attr("filter",this.filterer),this.filterer},unfilter:function(t){return this.filterer&&!0===t&&this.filterer.remove(),delete this.filterer,this.attr("filter",null)}}),SVG.Effect=SVG.invent({create:function(){this.constructor.call(this)},inherit:SVG.Element,extend:{in:function(t){return null==t?this.parent()&&this.parent().select('[result="'+this.attr("in")+'"]').get(0)||this.attr("in"):this.attr("in",t)},result:function(t){return null==t?this.attr("result"):this.attr("result",t)},toString:function(){return this.result()}}}),SVG.ParentEffect=SVG.invent({create:function(){this.constructor.call(this)},inherit:SVG.Parent,extend:{in:function(t){return null==t?this.parent()&&this.parent().select('[result="'+this.attr("in")+'"]').get(0)||this.attr("in"):this.attr("in",t)},result:function(t){return null==t?this.attr("result"):this.attr("result",t)},toString:function(){return this.result()}}});var t={blend:function(t,e){return this.parent()&&this.parent().blend(this,t,e)},colorMatrix:function(t,e){return this.parent()&&this.parent().colorMatrix(t,e).in(this)},convolveMatrix:function(t){return this.parent()&&this.parent().convolveMatrix(t).in(this)},componentTransfer:function(t){return this.parent()&&this.parent().componentTransfer(t).in(this)},composite:function(t,e){return this.parent()&&this.parent().composite(this,t,e)},flood:function(t,e){return this.parent()&&this.parent().flood(t,e)},offset:function(t,e){return this.parent()&&this.parent().offset(t,e).in(this)},image:function(t){return this.parent()&&this.parent().image(t)},merge:function(){return this.parent()&&this.parent().merge.apply(this.parent(),[this].concat(arguments))},gaussianBlur:function(t,e){return this.parent()&&this.parent().gaussianBlur(t,e).in(this)},morphology:function(t,e){return this.parent()&&this.parent().morphology(t,e).in(this)},diffuseLighting:function(t,e,i){return this.parent()&&this.parent().diffuseLighting(t,e,i).in(this)},displacementMap:function(t,e,i,s){return this.parent()&&this.parent().displacementMap(this,t,e,i,s)},specularLighting:function(t,e,i,s){return this.parent()&&this.parent().specularLighting(t,e,i,s).in(this)},tile:function(){return this.parent()&&this.parent().tile().in(this)},turbulence:function(t,e,i,s,a){return this.parent()&&this.parent().turbulence(t,e,i,s,a).in(this)}};SVG.extend(SVG.Effect,t),SVG.extend(SVG.ParentEffect,t),SVG.ChildEffect=SVG.invent({create:function(){this.constructor.call(this)},inherit:SVG.Element,extend:{in:function(t){this.attr("in",t)}}});var e={blend:function(t,e,i){this.attr({in:t,in2:e,mode:i||"normal"})},colorMatrix:function(t,e){"matrix"==t&&(e=a(e)),this.attr({type:t,values:void 0===e?null:e})},convolveMatrix:function(t){t=a(t),this.attr({order:Math.sqrt(t.split(" ").length),kernelMatrix:t})},composite:function(t,e,i){this.attr({in:t,in2:e,operator:i})},flood:function(t,e){this.attr("flood-color",t),null!=e&&this.attr("flood-opacity",e)},offset:function(t,e){this.attr({dx:t,dy:e})},image:function(t){this.attr("href",t,SVG.xlink)},displacementMap:function(t,e,i,s,a){this.attr({in:t,in2:e,scale:i,xChannelSelector:s,yChannelSelector:a})},gaussianBlur:function(t,e){null!=t||null!=e?this.attr("stdDeviation",r(Array.prototype.slice.call(arguments))):this.attr("stdDeviation","0 0")},morphology:function(t,e){this.attr({operator:t,radius:e})},tile:function(){},turbulence:function(t,e,i,s,a){this.attr({numOctaves:e,seed:i,stitchTiles:s,baseFrequency:t,type:a})}},i={merge:function(){var t;if(arguments[0]instanceof SVG.Set){var e=this;arguments[0].each((function(t){this instanceof SVG.MergeNode?e.put(this):(this instanceof SVG.Effect||this instanceof SVG.ParentEffect)&&e.put(new SVG.MergeNode(this))}))}else{t=Array.isArray(arguments[0])?arguments[0]:arguments;for(var i=0;i<t.length;i++)t[i]instanceof SVG.MergeNode?this.put(t[i]):this.put(new SVG.MergeNode(t[i]))}},componentTransfer:function(t){if(this.rgb=new SVG.Set,["r","g","b","a"].forEach(function(t){this[t]=new(SVG["Func"+t.toUpperCase()])("identity"),this.rgb.add(this[t]),this.node.appendChild(this[t].node)}.bind(this)),t)for(var e in t.rgb&&(["r","g","b"].forEach(function(e){this[e].attr(t.rgb)}.bind(this)),delete t.rgb),t)this[e].attr(t[e])},diffuseLighting:function(t,e,i){this.attr({surfaceScale:t,diffuseConstant:e,kernelUnitLength:i})},specularLighting:function(t,e,i,s){this.attr({surfaceScale:t,diffuseConstant:e,specularExponent:i,kernelUnitLength:s})}},s={distantLight:function(t,e){this.attr({azimuth:t,elevation:e})},pointLight:function(t,e,i){this.attr({x:t,y:e,z:i})},spotLight:function(t,e,i,s,a,r){this.attr({x:t,y:e,z:i,pointsAtX:s,pointsAtY:a,pointsAtZ:r})},mergeNode:function(t){this.attr("in",t)}};function a(t){return Array.isArray(t)&&(t=new SVG.Array(t)),t.toString().replace(/^\s+/,"").replace(/\s+$/,"").replace(/\s+/g," ")}function r(t){if(!Array.isArray(t))return t;for(var e=0,i=t.length,s=[];e<i;e++)s.push(t[e]);return s.join(" ")}function n(){var t=function(){};for(var e in"function"==typeof arguments[arguments.length-1]&&(t=arguments[arguments.length-1],Array.prototype.splice.call(arguments,arguments.length-1,1)),arguments)for(var i in arguments[e])t(arguments[e][i],i,arguments[e])}["r","g","b","a"].forEach((function(t){s["Func"+t.toUpperCase()]=function(t){switch(this.attr("type",t),t){case"table":this.attr("tableValues",arguments[1]);break;case"linear":this.attr("slope",arguments[1]),this.attr("intercept",arguments[2]);break;case"gamma":this.attr("amplitude",arguments[1]),this.attr("exponent",arguments[2]),this.attr("offset",arguments[2])}}})),n(e,(function(t,e){var i=e.charAt(0).toUpperCase()+e.slice(1);SVG[i+"Effect"]=SVG.invent({create:function(){this.constructor.call(this,SVG.create("fe"+i)),t.apply(this,arguments),this.result(this.attr("id")+"Out")},inherit:SVG.Effect,extend:{}})})),n(i,(function(t,e){var i=e.charAt(0).toUpperCase()+e.slice(1);SVG[i+"Effect"]=SVG.invent({create:function(){this.constructor.call(this,SVG.create("fe"+i)),t.apply(this,arguments),this.result(this.attr("id")+"Out")},inherit:SVG.ParentEffect,extend:{}})})),n(s,(function(t,e){var i=e.charAt(0).toUpperCase()+e.slice(1);SVG[i]=SVG.invent({create:function(){this.constructor.call(this,SVG.create("fe"+i)),t.apply(this,arguments)},inherit:SVG.ChildEffect,extend:{}})})),SVG.extend(SVG.MergeEffect,{in:function(t){return t instanceof SVG.MergeNode?this.add(t,0):this.add(new SVG.MergeNode(t),0),this}}),SVG.extend(SVG.CompositeEffect,SVG.BlendEffect,SVG.DisplacementMapEffect,{in2:function(t){return null==t?this.parent()&&this.parent().select('[result="'+this.attr("in2")+'"]').get(0)||this.attr("in2"):this.attr("in2",t)}}),SVG.filter={sepiatone:[.343,.669,.119,0,0,.249,.626,.13,0,0,.172,.334,.111,0,0,0,0,0,1,0]}}.call(void 0),function(){function t(t,a,r,n,o,l,h){for(var c=t.slice(a,r||h),d=n.slice(o,l||h),u=0,g={pos:[0,0],start:[0,0]},f={pos:[0,0],start:[0,0]};;){if(c[u]=e.call(g,c[u]),d[u]=e.call(f,d[u]),c[u][0]!=d[u][0]||"M"==c[u][0]||"A"==c[u][0]&&(c[u][4]!=d[u][4]||c[u][5]!=d[u][5])?(Array.prototype.splice.apply(c,[u,1].concat(s.call(g,c[u]))),Array.prototype.splice.apply(d,[u,1].concat(s.call(f,d[u])))):(c[u]=i.call(g,c[u]),d[u]=i.call(f,d[u])),++u==c.length&&u==d.length)break;u==c.length&&c.push(["C",g.pos[0],g.pos[1],g.pos[0],g.pos[1],g.pos[0],g.pos[1]]),u==d.length&&d.push(["C",f.pos[0],f.pos[1],f.pos[0],f.pos[1],f.pos[0],f.pos[1]])}return{start:c,dest:d}}function e(t){switch(t[0]){case"z":case"Z":t[0]="L",t[1]=this.start[0],t[2]=this.start[1];break;case"H":t[0]="L",t[2]=this.pos[1];break;case"V":t[0]="L",t[2]=t[1],t[1]=this.pos[0];break;case"T":t[0]="Q",t[3]=t[1],t[4]=t[2],t[1]=this.reflection[1],t[2]=this.reflection[0];break;case"S":t[0]="C",t[6]=t[4],t[5]=t[3],t[4]=t[2],t[3]=t[1],t[2]=this.reflection[1],t[1]=this.reflection[0]}return t}function i(t){var e=t.length;return this.pos=[t[e-2],t[e-1]],-1!="SCQT".indexOf(t[0])&&(this.reflection=[2*this.pos[0]-t[e-4],2*this.pos[1]-t[e-3]]),t}function s(t){var e=[t];switch(t[0]){case"M":return this.pos=this.start=[t[1],t[2]],e;case"L":t[5]=t[3]=t[1],t[6]=t[4]=t[2],t[1]=this.pos[0],t[2]=this.pos[1];break;case"Q":t[6]=t[4],t[5]=t[3],t[4]=1*t[4]/3+2*t[2]/3,t[3]=1*t[3]/3+2*t[1]/3,t[2]=1*this.pos[1]/3+2*t[2]/3,t[1]=1*this.pos[0]/3+2*t[1]/3;break;case"A":t=(e=function(t,e){var i,s,a,r,n,o,l,h,c,d,u,g,f,p,x,b,m,v,y,w,k,A,S,C,L,P,T=Math.abs(e[1]),z=Math.abs(e[2]),E=e[3]%360,M=e[4],I=e[5],X=e[6],Y=e[7],R=new SVG.Point(t),F=new SVG.Point(X,Y),D=[];if(0===T||0===z||R.x===F.x&&R.y===F.y)return[["C",R.x,R.y,F.x,F.y,F.x,F.y]];i=new SVG.Point((R.x-F.x)/2,(R.y-F.y)/2).transform((new SVG.Matrix).rotate(E)),(s=i.x*i.x/(T*T)+i.y*i.y/(z*z))>1&&(s=Math.sqrt(s),T*=s,z*=s);a=(new SVG.Matrix).rotate(E).scale(1/T,1/z).rotate(-E),R=R.transform(a),F=F.transform(a),r=[F.x-R.x,F.y-R.y],o=r[0]*r[0]+r[1]*r[1],n=Math.sqrt(o),r[0]/=n,r[1]/=n,l=o<4?Math.sqrt(1-o/4):0,M===I&&(l*=-1);h=new SVG.Point((F.x+R.x)/2+l*-r[1],(F.y+R.y)/2+l*r[0]),c=new SVG.Point(R.x-h.x,R.y-h.y),d=new SVG.Point(F.x-h.x,F.y-h.y),u=Math.acos(c.x/Math.sqrt(c.x*c.x+c.y*c.y)),c.y<0&&(u*=-1);g=Math.acos(d.x/Math.sqrt(d.x*d.x+d.y*d.y)),d.y<0&&(g*=-1);I&&u>g&&(g+=2*Math.PI);!I&&u<g&&(g-=2*Math.PI);for(p=Math.ceil(2*Math.abs(u-g)/Math.PI),b=[],m=u,f=(g-u)/p,x=4*Math.tan(f/4)/3,k=0;k<=p;k++)y=Math.cos(m),v=Math.sin(m),w=new SVG.Point(h.x+y,h.y+v),b[k]=[new SVG.Point(w.x+x*v,w.y-x*y),w,new SVG.Point(w.x-x*v,w.y+x*y)],m+=f;for(b[0][0]=b[0][1].clone(),b[b.length-1][2]=b[b.length-1][1].clone(),a=(new SVG.Matrix).rotate(E).scale(T,z).rotate(-E),k=0,A=b.length;k<A;k++)b[k][0]=b[k][0].transform(a),b[k][1]=b[k][1].transform(a),b[k][2]=b[k][2].transform(a);for(k=1,A=b.length;k<A;k++)w=b[k-1][2],S=w.x,C=w.y,w=b[k][0],L=w.x,P=w.y,w=b[k][1],X=w.x,Y=w.y,D.push(["C",S,C,L,P,X,Y]);return D}(this.pos,t))[0]}return t[0]="C",this.pos=[t[5],t[6]],this.reflection=[2*t[5]-t[3],2*t[6]-t[4]],e}function a(t,e){if(!1===e)return!1;for(var i=e,s=t.length;i<s;++i)if("M"==t[i][0])return i;return!1}SVG.extend(SVG.PathArray,{morph:function(e){for(var i=this.value,s=this.parse(e),r=0,n=0,o=!1,l=!1;!1!==r||!1!==n;){var h;o=a(i,!1!==r&&r+1),l=a(s,!1!==n&&n+1),!1===r&&(r=0==(h=new SVG.PathArray(c.start).bbox()).height||0==h.width?i.push(i[0])-1:i.push(["M",h.x+h.width/2,h.y+h.height/2])-1),!1===n&&(n=0==(h=new SVG.PathArray(c.dest).bbox()).height||0==h.width?s.push(s[0])-1:s.push(["M",h.x+h.width/2,h.y+h.height/2])-1);var c=t(i,r,o,s,n,l);i=i.slice(0,r).concat(c.start,!1===o?[]:i.slice(o)),s=s.slice(0,n).concat(c.dest,!1===l?[]:s.slice(l)),r=!1!==o&&r+c.start.length,n=!1!==l&&n+c.dest.length}return this.value=i,this.destination=new SVG.PathArray,this.destination.value=s,this}})}(),
/*! svg.draggable.js - v2.2.2 - 2019-01-08
* https://github.com/svgdotjs/svg.draggable.js
* Copyright (c) 2019 Wout Fierens; Licensed MIT */
function(){function t(t){t.remember("_draggable",this),this.el=t}t.prototype.init=function(t,e){var i=this;this.constraint=t,this.value=e,this.el.on("mousedown.drag",(function(t){i.start(t)})),this.el.on("touchstart.drag",(function(t){i.start(t)}))},t.prototype.transformPoint=function(t,e){var i=(t=t||window.event).changedTouches&&t.changedTouches[0]||t;return this.p.x=i.clientX-(e||0),this.p.y=i.clientY,this.p.matrixTransform(this.m)},t.prototype.getBBox=function(){var t=this.el.bbox();return this.el instanceof SVG.Nested&&(t=this.el.rbox()),(this.el instanceof SVG.G||this.el instanceof SVG.Use||this.el instanceof SVG.Nested)&&(t.x=this.el.x(),t.y=this.el.y()),t},t.prototype.start=function(t){if("click"!=t.type&&"mousedown"!=t.type&&"mousemove"!=t.type||1==(t.which||t.buttons)){var e=this;if(this.el.fire("beforedrag",{event:t,handler:this}),!this.el.event().defaultPrevented){t.preventDefault(),t.stopPropagation(),this.parent=this.parent||this.el.parent(SVG.Nested)||this.el.parent(SVG.Doc),this.p=this.parent.node.createSVGPoint(),this.m=this.el.node.getScreenCTM().inverse();var i,s=this.getBBox();if(this.el instanceof SVG.Text)switch(i=this.el.node.getComputedTextLength(),this.el.attr("text-anchor")){case"middle":i/=2;break;case"start":i=0}this.startPoints={point:this.transformPoint(t,i),box:s,transform:this.el.transform()},SVG.on(window,"mousemove.drag",(function(t){e.drag(t)})),SVG.on(window,"touchmove.drag",(function(t){e.drag(t)})),SVG.on(window,"mouseup.drag",(function(t){e.end(t)})),SVG.on(window,"touchend.drag",(function(t){e.end(t)})),this.el.fire("dragstart",{event:t,p:this.startPoints.point,m:this.m,handler:this})}}},t.prototype.drag=function(t){var e=this.getBBox(),i=this.transformPoint(t),s=this.startPoints.box.x+i.x-this.startPoints.point.x,a=this.startPoints.box.y+i.y-this.startPoints.point.y,r=this.constraint,n=i.x-this.startPoints.point.x,o=i.y-this.startPoints.point.y;if(this.el.fire("dragmove",{event:t,p:i,m:this.m,handler:this}),this.el.event().defaultPrevented)return i;if("function"==typeof r){var l=r.call(this.el,s,a,this.m);"boolean"==typeof l&&(l={x:l,y:l}),!0===l.x?this.el.x(s):!1!==l.x&&this.el.x(l.x),!0===l.y?this.el.y(a):!1!==l.y&&this.el.y(l.y)}else"object"==typeof r&&(null!=r.minX&&s<r.minX?n=(s=r.minX)-this.startPoints.box.x:null!=r.maxX&&s>r.maxX-e.width&&(n=(s=r.maxX-e.width)-this.startPoints.box.x),null!=r.minY&&a<r.minY?o=(a=r.minY)-this.startPoints.box.y:null!=r.maxY&&a>r.maxY-e.height&&(o=(a=r.maxY-e.height)-this.startPoints.box.y),null!=r.snapToGrid&&(s-=s%r.snapToGrid,a-=a%r.snapToGrid,n-=n%r.snapToGrid,o-=o%r.snapToGrid),this.el instanceof SVG.G?this.el.matrix(this.startPoints.transform).transform({x:n,y:o},!0):this.el.move(s,a));return i},t.prototype.end=function(t){var e=this.drag(t);this.el.fire("dragend",{event:t,p:e,m:this.m,handler:this}),SVG.off(window,"mousemove.drag"),SVG.off(window,"touchmove.drag"),SVG.off(window,"mouseup.drag"),SVG.off(window,"touchend.drag")},SVG.extend(SVG.Element,{draggable:function(e,i){"function"!=typeof e&&"object"!=typeof e||(i=e,e=!0);var s=this.remember("_draggable")||new t(this);return(e=void 0===e||e)?s.init(i||{},e):(this.off("mousedown.drag"),this.off("touchstart.drag")),this}})}.call(void 0),function(){function t(t){this.el=t,t.remember("_selectHandler",this),this.pointSelection={isSelected:!1},this.rectSelection={isSelected:!1}}t.prototype.init=function(t,e){var i=this.el.bbox();for(var s in this.options={},this.el.selectize.defaults)this.options[s]=this.el.selectize.defaults[s],void 0!==e[s]&&(this.options[s]=e[s]);this.parent=this.el.parent(),this.nested=this.nested||this.parent.group(),this.nested.matrix(new SVG.Matrix(this.el).translate(i.x,i.y)),this.options.deepSelect&&-1!==["line","polyline","polygon"].indexOf(this.el.type)?this.selectPoints(t):this.selectRect(t),this.observe(),this.cleanup()},t.prototype.selectPoints=function(t){return this.pointSelection.isSelected=t,this.pointSelection.set?this:(this.pointSelection.set=this.parent.set(),this.drawCircles(),this)},t.prototype.getPointArray=function(){var t=this.el.bbox();return this.el.array().valueOf().map((function(e){return[e[0]-t.x,e[1]-t.y]}))},t.prototype.drawCircles=function(){for(var t=this,e=this.getPointArray(),i=0,s=e.length;i<s;++i){var a=function(e){return function(i){(i=i||window.event).preventDefault?i.preventDefault():i.returnValue=!1,i.stopPropagation();var s=i.pageX||i.touches[0].pageX,a=i.pageY||i.touches[0].pageY;t.el.fire("point",{x:s,y:a,i:e,event:i})}}(i);this.pointSelection.set.add(this.nested.circle(this.options.radius).center(e[i][0],e[i][1]).addClass(this.options.classPoints).addClass(this.options.classPoints+"_point").on("touchstart",a).on("mousedown",a))}},t.prototype.updatePointSelection=function(){var t=this.getPointArray();this.pointSelection.set.each((function(e){this.cx()===t[e][0]&&this.cy()===t[e][1]||this.center(t[e][0],t[e][1])}))},t.prototype.updateRectSelection=function(){var t=this.el.bbox();this.rectSelection.set.get(0).attr({width:t.width,height:t.height}),this.options.points&&(this.rectSelection.set.get(2).center(t.width,0),this.rectSelection.set.get(3).center(t.width,t.height),this.rectSelection.set.get(4).center(0,t.height),this.rectSelection.set.get(5).center(t.width/2,0),this.rectSelection.set.get(6).center(t.width,t.height/2),this.rectSelection.set.get(7).center(t.width/2,t.height),this.rectSelection.set.get(8).center(0,t.height/2)),this.options.rotationPoint&&(this.options.points?this.rectSelection.set.get(9).center(t.width/2,20):this.rectSelection.set.get(1).center(t.width/2,20))},t.prototype.selectRect=function(t){var e=this,i=this.el.bbox();function s(t){return function(i){(i=i||window.event).preventDefault?i.preventDefault():i.returnValue=!1,i.stopPropagation();var s=i.pageX||i.touches[0].pageX,a=i.pageY||i.touches[0].pageY;e.el.fire(t,{x:s,y:a,event:i})}}if(this.rectSelection.isSelected=t,this.rectSelection.set=this.rectSelection.set||this.parent.set(),this.rectSelection.set.get(0)||this.rectSelection.set.add(this.nested.rect(i.width,i.height).addClass(this.options.classRect)),this.options.points&&!this.rectSelection.set.get(1)){var a="touchstart",r="mousedown";this.rectSelection.set.add(this.nested.circle(this.options.radius).center(0,0).attr("class",this.options.classPoints+"_lt").on(r,s("lt")).on(a,s("lt"))),this.rectSelection.set.add(this.nested.circle(this.options.radius).center(i.width,0).attr("class",this.options.classPoints+"_rt").on(r,s("rt")).on(a,s("rt"))),this.rectSelection.set.add(this.nested.circle(this.options.radius).center(i.width,i.height).attr("class",this.options.classPoints+"_rb").on(r,s("rb")).on(a,s("rb"))),this.rectSelection.set.add(this.nested.circle(this.options.radius).center(0,i.height).attr("class",this.options.classPoints+"_lb").on(r,s("lb")).on(a,s("lb"))),this.rectSelection.set.add(this.nested.circle(this.options.radius).center(i.width/2,0).attr("class",this.options.classPoints+"_t").on(r,s("t")).on(a,s("t"))),this.rectSelection.set.add(this.nested.circle(this.options.radius).center(i.width,i.height/2).attr("class",this.options.classPoints+"_r").on(r,s("r")).on(a,s("r"))),this.rectSelection.set.add(this.nested.circle(this.options.radius).center(i.width/2,i.height).attr("class",this.options.classPoints+"_b").on(r,s("b")).on(a,s("b"))),this.rectSelection.set.add(this.nested.circle(this.options.radius).center(0,i.height/2).attr("class",this.options.classPoints+"_l").on(r,s("l")).on(a,s("l"))),this.rectSelection.set.each((function(){this.addClass(e.options.classPoints)}))}if(this.options.rotationPoint&&(this.options.points&&!this.rectSelection.set.get(9)||!this.options.points&&!this.rectSelection.set.get(1))){var n=function(t){(t=t||window.event).preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation();var i=t.pageX||t.touches[0].pageX,s=t.pageY||t.touches[0].pageY;e.el.fire("rot",{x:i,y:s,event:t})};this.rectSelection.set.add(this.nested.circle(this.options.radius).center(i.width/2,20).attr("class",this.options.classPoints+"_rot").on("touchstart",n).on("mousedown",n))}},t.prototype.handler=function(){var t=this.el.bbox();this.nested.matrix(new SVG.Matrix(this.el).translate(t.x,t.y)),this.rectSelection.isSelected&&this.updateRectSelection(),this.pointSelection.isSelected&&this.updatePointSelection()},t.prototype.observe=function(){var t=this;if(MutationObserver)if(this.rectSelection.isSelected||this.pointSelection.isSelected)this.observerInst=this.observerInst||new MutationObserver((function(){t.handler()})),this.observerInst.observe(this.el.node,{attributes:!0});else try{this.observerInst.disconnect(),delete this.observerInst}catch(t){}else this.el.off("DOMAttrModified.select"),(this.rectSelection.isSelected||this.pointSelection.isSelected)&&this.el.on("DOMAttrModified.select",(function(){t.handler()}))},t.prototype.cleanup=function(){!this.rectSelection.isSelected&&this.rectSelection.set&&(this.rectSelection.set.each((function(){this.remove()})),this.rectSelection.set.clear(),delete this.rectSelection.set),!this.pointSelection.isSelected&&this.pointSelection.set&&(this.pointSelection.set.each((function(){this.remove()})),this.pointSelection.set.clear(),delete this.pointSelection.set),this.pointSelection.isSelected||this.rectSelection.isSelected||(this.nested.remove(),delete this.nested)},SVG.extend(SVG.Element,{selectize:function(e,i){return"object"==typeof e&&(i=e,e=!0),(this.remember("_selectHandler")||new t(this)).init(void 0===e||e,i||{}),this}}),SVG.Element.prototype.selectize.defaults={points:!0,classRect:"svg_select_boundingRect",classPoints:"svg_select_points",radius:7,rotationPoint:!0,deepSelect:!1}}(),function(){(function(){function t(t){t.remember("_resizeHandler",this),this.el=t,this.parameters={},this.lastUpdateCall=null,this.p=t.doc().node.createSVGPoint()}t.prototype.transformPoint=function(t,e,i){return this.p.x=t-(this.offset.x-window.pageXOffset),this.p.y=e-(this.offset.y-window.pageYOffset),this.p.matrixTransform(i||this.m)},t.prototype._extractPosition=function(t){return{x:null!=t.clientX?t.clientX:t.touches[0].clientX,y:null!=t.clientY?t.clientY:t.touches[0].clientY}},t.prototype.init=function(t){var e=this;if(this.stop(),"stop"!==t){for(var i in this.options={},this.el.resize.defaults)this.options[i]=this.el.resize.defaults[i],void 0!==t[i]&&(this.options[i]=t[i]);this.el.on("lt.resize",(function(t){e.resize(t||window.event)})),this.el.on("rt.resize",(function(t){e.resize(t||window.event)})),this.el.on("rb.resize",(function(t){e.resize(t||window.event)})),this.el.on("lb.resize",(function(t){e.resize(t||window.event)})),this.el.on("t.resize",(function(t){e.resize(t||window.event)})),this.el.on("r.resize",(function(t){e.resize(t||window.event)})),this.el.on("b.resize",(function(t){e.resize(t||window.event)})),this.el.on("l.resize",(function(t){e.resize(t||window.event)})),this.el.on("rot.resize",(function(t){e.resize(t||window.event)})),this.el.on("point.resize",(function(t){e.resize(t||window.event)})),this.update()}},t.prototype.stop=function(){return this.el.off("lt.resize"),this.el.off("rt.resize"),this.el.off("rb.resize"),this.el.off("lb.resize"),this.el.off("t.resize"),this.el.off("r.resize"),this.el.off("b.resize"),this.el.off("l.resize"),this.el.off("rot.resize"),this.el.off("point.resize"),this},t.prototype.resize=function(t){var e=this;this.m=this.el.node.getScreenCTM().inverse(),this.offset={x:window.pageXOffset,y:window.pageYOffset};var i=this._extractPosition(t.detail.event);if(this.parameters={type:this.el.type,p:this.transformPoint(i.x,i.y),x:t.detail.x,y:t.detail.y,box:this.el.bbox(),rotation:this.el.transform().rotation},"text"===this.el.type&&(this.parameters.fontSize=this.el.attr()["font-size"]),void 0!==t.detail.i){var s=this.el.array().valueOf();this.parameters.i=t.detail.i,this.parameters.pointCoords=[s[t.detail.i][0],s[t.detail.i][1]]}switch(t.type){case"lt":this.calc=function(t,e){var i=this.snapToGrid(t,e);if(this.parameters.box.width-i[0]>0&&this.parameters.box.height-i[1]>0){if("text"===this.parameters.type)return this.el.move(this.parameters.box.x+i[0],this.parameters.box.y),void this.el.attr("font-size",this.parameters.fontSize-i[0]);i=this.checkAspectRatio(i),this.el.move(this.parameters.box.x+i[0],this.parameters.box.y+i[1]).size(this.parameters.box.width-i[0],this.parameters.box.height-i[1])}};break;case"rt":this.calc=function(t,e){var i=this.snapToGrid(t,e,2);if(this.parameters.box.width+i[0]>0&&this.parameters.box.height-i[1]>0){if("text"===this.parameters.type)return this.el.move(this.parameters.box.x-i[0],this.parameters.box.y),void this.el.attr("font-size",this.parameters.fontSize+i[0]);i=this.checkAspectRatio(i,!0),this.el.move(this.parameters.box.x,this.parameters.box.y+i[1]).size(this.parameters.box.width+i[0],this.parameters.box.height-i[1])}};break;case"rb":this.calc=function(t,e){var i=this.snapToGrid(t,e,0);if(this.parameters.box.width+i[0]>0&&this.parameters.box.height+i[1]>0){if("text"===this.parameters.type)return this.el.move(this.parameters.box.x-i[0],this.parameters.box.y),void this.el.attr("font-size",this.parameters.fontSize+i[0]);i=this.checkAspectRatio(i),this.el.move(this.parameters.box.x,this.parameters.box.y).size(this.parameters.box.width+i[0],this.parameters.box.height+i[1])}};break;case"lb":this.calc=function(t,e){var i=this.snapToGrid(t,e,1);if(this.parameters.box.width-i[0]>0&&this.parameters.box.height+i[1]>0){if("text"===this.parameters.type)return this.el.move(this.parameters.box.x+i[0],this.parameters.box.y),void this.el.attr("font-size",this.parameters.fontSize-i[0]);i=this.checkAspectRatio(i,!0),this.el.move(this.parameters.box.x+i[0],this.parameters.box.y).size(this.parameters.box.width-i[0],this.parameters.box.height+i[1])}};break;case"t":this.calc=function(t,e){var i=this.snapToGrid(t,e,2);if(this.parameters.box.height-i[1]>0){if("text"===this.parameters.type)return;this.el.move(this.parameters.box.x,this.parameters.box.y+i[1]).height(this.parameters.box.height-i[1])}};break;case"r":this.calc=function(t,e){var i=this.snapToGrid(t,e,0);if(this.parameters.box.width+i[0]>0){if("text"===this.parameters.type)return;this.el.move(this.parameters.box.x,this.parameters.box.y).width(this.parameters.box.width+i[0])}};break;case"b":this.calc=function(t,e){var i=this.snapToGrid(t,e,0);if(this.parameters.box.height+i[1]>0){if("text"===this.parameters.type)return;this.el.move(this.parameters.box.x,this.parameters.box.y).height(this.parameters.box.height+i[1])}};break;case"l":this.calc=function(t,e){var i=this.snapToGrid(t,e,1);if(this.parameters.box.width-i[0]>0){if("text"===this.parameters.type)return;this.el.move(this.parameters.box.x+i[0],this.parameters.box.y).width(this.parameters.box.width-i[0])}};break;case"rot":this.calc=function(t,e){var i=t+this.parameters.p.x,s=e+this.parameters.p.y,a=Math.atan2(this.parameters.p.y-this.parameters.box.y-this.parameters.box.height/2,this.parameters.p.x-this.parameters.box.x-this.parameters.box.width/2),r=Math.atan2(s-this.parameters.box.y-this.parameters.box.height/2,i-this.parameters.box.x-this.parameters.box.width/2),n=this.parameters.rotation+180*(r-a)/Math.PI+this.options.snapToAngle/2;this.el.center(this.parameters.box.cx,this.parameters.box.cy).rotate(n-n%this.options.snapToAngle,this.parameters.box.cx,this.parameters.box.cy)};break;case"point":this.calc=function(t,e){var i=this.snapToGrid(t,e,this.parameters.pointCoords[0],this.parameters.pointCoords[1]),s=this.el.array().valueOf();s[this.parameters.i][0]=this.parameters.pointCoords[0]+i[0],s[this.parameters.i][1]=this.parameters.pointCoords[1]+i[1],this.el.plot(s)}}this.el.fire("resizestart",{dx:this.parameters.x,dy:this.parameters.y,event:t}),SVG.on(window,"touchmove.resize",(function(t){e.update(t||window.event)})),SVG.on(window,"touchend.resize",(function(){e.done()})),SVG.on(window,"mousemove.resize",(function(t){e.update(t||window.event)})),SVG.on(window,"mouseup.resize",(function(){e.done()}))},t.prototype.update=function(t){if(t){var e=this._extractPosition(t),i=this.transformPoint(e.x,e.y),s=i.x-this.parameters.p.x,a=i.y-this.parameters.p.y;this.lastUpdateCall=[s,a],this.calc(s,a),this.el.fire("resizing",{dx:s,dy:a,event:t})}else this.lastUpdateCall&&this.calc(this.lastUpdateCall[0],this.lastUpdateCall[1])},t.prototype.done=function(){this.lastUpdateCall=null,SVG.off(window,"mousemove.resize"),SVG.off(window,"mouseup.resize"),SVG.off(window,"touchmove.resize"),SVG.off(window,"touchend.resize"),this.el.fire("resizedone")},t.prototype.snapToGrid=function(t,e,i,s){var a;return void 0!==s?a=[(i+t)%this.options.snapToGrid,(s+e)%this.options.snapToGrid]:(i=null==i?3:i,a=[(this.parameters.box.x+t+(1&i?0:this.parameters.box.width))%this.options.snapToGrid,(this.parameters.box.y+e+(2&i?0:this.parameters.box.height))%this.options.snapToGrid]),t<0&&(a[0]-=this.options.snapToGrid),e<0&&(a[1]-=this.options.snapToGrid),t-=Math.abs(a[0])<this.options.snapToGrid/2?a[0]:a[0]-(t<0?-this.options.snapToGrid:this.options.snapToGrid),e-=Math.abs(a[1])<this.options.snapToGrid/2?a[1]:a[1]-(e<0?-this.options.snapToGrid:this.options.snapToGrid),this.constraintToBox(t,e,i,s)},t.prototype.constraintToBox=function(t,e,i,s){var a,r,n=this.options.constraint||{};return void 0!==s?(a=i,r=s):(a=this.parameters.box.x+(1&i?0:this.parameters.box.width),r=this.parameters.box.y+(2&i?0:this.parameters.box.height)),void 0!==n.minX&&a+t<n.minX&&(t=n.minX-a),void 0!==n.maxX&&a+t>n.maxX&&(t=n.maxX-a),void 0!==n.minY&&r+e<n.minY&&(e=n.minY-r),void 0!==n.maxY&&r+e>n.maxY&&(e=n.maxY-r),[t,e]},t.prototype.checkAspectRatio=function(t,e){if(!this.options.saveAspectRatio)return t;var i=t.slice(),s=this.parameters.box.width/this.parameters.box.height,a=this.parameters.box.width+t[0],r=this.parameters.box.height-t[1],n=a/r;return n<s?(i[1]=a/s-this.parameters.box.height,e&&(i[1]=-i[1])):n>s&&(i[0]=this.parameters.box.width-r*s,e&&(i[0]=-i[0])),i},SVG.extend(SVG.Element,{resize:function(e){return(this.remember("_resizeHandler")||new t(this)).init(e||{}),this}}),SVG.Element.prototype.resize.defaults={snapToAngle:.1,snapToGrid:1,constraint:{},saveAspectRatio:!1}}).call(this)}();var css='.apexcharts-canvas {\n  position: relative;\n  user-select: none;\n  /* cannot give overflow: hidden as it will crop tooltips which overflow outside chart area */\n}\n\n/* scrollbar is not visible by default for legend, hence forcing the visibility */\n.apexcharts-canvas ::-webkit-scrollbar {\n  -webkit-appearance: none;\n  width: 6px;\n}\n.apexcharts-canvas ::-webkit-scrollbar-thumb {\n  border-radius: 4px;\n  background-color: rgba(0,0,0,.5);\n  box-shadow: 0 0 1px rgba(255,255,255,.5);\n  -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);\n}\n.apexcharts-canvas.dark {\n  background: #343F57;\n}\n\n.apexcharts-inner {\n  position: relative;\n}\n\n.legend-mouseover-inactive {\n  transition: 0.15s ease all;\n  opacity: 0.20;\n}\n\n.apexcharts-series-collapsed {\n  opacity: 0;\n}\n\n.apexcharts-gridline, .apexcharts-text {\n  pointer-events: none;\n}\n\n.apexcharts-tooltip {\n  border-radius: 5px;\n  box-shadow: 2px 2px 6px -4px #999;\n  cursor: default;\n  font-size: 14px;\n  left: 62px;\n  opacity: 0;\n  pointer-events: none;\n  position: absolute;\n  top: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n  z-index: 12;\n  transition: 0.15s ease all;\n}\n.apexcharts-tooltip.light {\n  border: 1px solid #e3e3e3;\n  background: rgba(255, 255, 255, 0.96);\n}\n.apexcharts-tooltip.dark {\n  color: #fff;\n  background: rgba(30,30,30, 0.8);\n}\n.apexcharts-tooltip * {\n  font-family: inherit;\n}\n\n.apexcharts-tooltip .apexcharts-marker,\n.apexcharts-area-series .apexcharts-area,\n.apexcharts-line {\n  pointer-events: none;\n}\n\n.apexcharts-tooltip.active {\n  opacity: 1;\n  transition: 0.15s ease all;\n}\n\n.apexcharts-tooltip-title {\n  padding: 6px;\n  font-size: 15px;\n  margin-bottom: 4px;\n}\n.apexcharts-tooltip.light .apexcharts-tooltip-title {\n  background: #ECEFF1;\n  border-bottom: 1px solid #ddd;\n}\n.apexcharts-tooltip.dark .apexcharts-tooltip-title {\n  background: rgba(0, 0, 0, 0.7);\n  border-bottom: 1px solid #333;\n}\n\n.apexcharts-tooltip-text-value,\n.apexcharts-tooltip-text-z-value {\n  display: inline-block;\n  font-weight: 600;\n  margin-left: 5px;\n}\n\n.apexcharts-tooltip-text-z-label:empty,\n.apexcharts-tooltip-text-z-value:empty {\n  display: none;\n}\n\n.apexcharts-tooltip-text-value,\n.apexcharts-tooltip-text-z-value {\n  font-weight: 600;\n}\n\n.apexcharts-tooltip-marker {\n  width: 12px;\n  height: 12px;\n  position: relative;\n  top: 0px;\n  margin-right: 10px;\n  border-radius: 50%;\n}\n\n.apexcharts-tooltip-series-group {\n  padding: 0 10px;\n  display: none;\n  text-align: left;\n  justify-content: left;\n  align-items: center;\n}\n\n.apexcharts-tooltip-series-group.active .apexcharts-tooltip-marker {\n  opacity: 1;\n}\n.apexcharts-tooltip-series-group.active, .apexcharts-tooltip-series-group:last-child {\n  padding-bottom: 4px;\n}\n.apexcharts-tooltip-series-group-hidden {\n  opacity: 0;\n  height: 0;\n  line-height: 0;\n  padding: 0 !important;\n}\n.apexcharts-tooltip-y-group {\n  padding: 6px 0 5px;\n}\n.apexcharts-tooltip-candlestick {\n  padding: 4px 8px;\n}\n.apexcharts-tooltip-candlestick > div {\n  margin: 4px 0;\n}\n.apexcharts-tooltip-candlestick span.value {\n  font-weight: bold;\n}\n\n.apexcharts-tooltip-rangebar {\n  padding: 5px 8px;\n}\n\n.apexcharts-tooltip-rangebar .category {\n  font-weight: 600;\n  color: #777;\n}\n\n.apexcharts-tooltip-rangebar .series-name {\n  font-weight: bold;\n  display: block;\n  margin-bottom: 5px;\n}\n\n.apexcharts-xaxistooltip {\n  opacity: 0;\n  padding: 9px 10px;\n  pointer-events: none;\n  color: #373d3f;\n  font-size: 13px;\n  text-align: center;\n  border-radius: 2px;\n  position: absolute;\n  z-index: 10;\n  background: #ECEFF1;\n  border: 1px solid #90A4AE;\n  transition: 0.15s ease all;\n}\n\n.apexcharts-xaxistooltip.dark {\n  background: rgba(0, 0, 0, 0.7);\n  border: 1px solid rgba(0, 0, 0, 0.5);\n  color: #fff;\n}\n\n.apexcharts-xaxistooltip:after, .apexcharts-xaxistooltip:before {\n  left: 50%;\n  border: solid transparent;\n  content: " ";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n}\n\n.apexcharts-xaxistooltip:after {\n  border-color: rgba(236, 239, 241, 0);\n  border-width: 6px;\n  margin-left: -6px;\n}\n.apexcharts-xaxistooltip:before {\n  border-color: rgba(144, 164, 174, 0);\n  border-width: 7px;\n  margin-left: -7px;\n}\n\n.apexcharts-xaxistooltip-bottom:after, .apexcharts-xaxistooltip-bottom:before {\n  bottom: 100%;\n}\n\n.apexcharts-xaxistooltip-top:after, .apexcharts-xaxistooltip-top:before {\n  top: 100%;\n}\n\n.apexcharts-xaxistooltip-bottom:after {\n  border-bottom-color: #ECEFF1;\n}\n.apexcharts-xaxistooltip-bottom:before {\n  border-bottom-color: #90A4AE;\n}\n\n.apexcharts-xaxistooltip-bottom.dark:after {\n  border-bottom-color: rgba(0, 0, 0, 0.5);\n}\n.apexcharts-xaxistooltip-bottom.dark:before {\n  border-bottom-color: rgba(0, 0, 0, 0.5);\n}\n\n.apexcharts-xaxistooltip-top:after {\n  border-top-color:#ECEFF1\n}\n.apexcharts-xaxistooltip-top:before {\n  border-top-color: #90A4AE;\n}\n.apexcharts-xaxistooltip-top.dark:after {\n  border-top-color:rgba(0, 0, 0, 0.5);\n}\n.apexcharts-xaxistooltip-top.dark:before {\n  border-top-color: rgba(0, 0, 0, 0.5);\n}\n\n\n.apexcharts-xaxistooltip.active {\n  opacity: 1;\n  transition: 0.15s ease all;\n}\n\n.apexcharts-yaxistooltip {\n  opacity: 0;\n  padding: 4px 10px;\n  pointer-events: none;\n  color: #373d3f;\n  font-size: 13px;\n  text-align: center;\n  border-radius: 2px;\n  position: absolute;\n  z-index: 10;\n  background: #ECEFF1;\n  border: 1px solid #90A4AE;\n}\n\n.apexcharts-yaxistooltip.dark {\n  background: rgba(0, 0, 0, 0.7);\n  border: 1px solid rgba(0, 0, 0, 0.5);\n  color: #fff;\n}\n\n.apexcharts-yaxistooltip:after, .apexcharts-yaxistooltip:before {\n  top: 50%;\n  border: solid transparent;\n  content: " ";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n}\n.apexcharts-yaxistooltip:after {\n  border-color: rgba(236, 239, 241, 0);\n  border-width: 6px;\n  margin-top: -6px;\n}\n.apexcharts-yaxistooltip:before {\n  border-color: rgba(144, 164, 174, 0);\n  border-width: 7px;\n  margin-top: -7px;\n}\n\n.apexcharts-yaxistooltip-left:after, .apexcharts-yaxistooltip-left:before {\n  left: 100%;\n}\n\n.apexcharts-yaxistooltip-right:after, .apexcharts-yaxistooltip-right:before {\n  right: 100%;\n}\n\n.apexcharts-yaxistooltip-left:after {\n  border-left-color: #ECEFF1;\n}\n.apexcharts-yaxistooltip-left:before {\n  border-left-color: #90A4AE;\n}\n.apexcharts-yaxistooltip-left.dark:after {\n  border-left-color: rgba(0, 0, 0, 0.5);\n}\n.apexcharts-yaxistooltip-left.dark:before {\n  border-left-color: rgba(0, 0, 0, 0.5);\n}\n\n.apexcharts-yaxistooltip-right:after {\n  border-right-color: #ECEFF1;\n}\n.apexcharts-yaxistooltip-right:before {\n  border-right-color: #90A4AE;\n}\n.apexcharts-yaxistooltip-right.dark:after {\n  border-right-color: rgba(0, 0, 0, 0.5);\n}\n.apexcharts-yaxistooltip-right.dark:before {\n  border-right-color: rgba(0, 0, 0, 0.5);\n}\n\n.apexcharts-yaxistooltip.active {\n  opacity: 1;\n}\n.apexcharts-yaxistooltip-hidden {\n  display: none;\n}\n\n.apexcharts-xcrosshairs, .apexcharts-ycrosshairs {\n  pointer-events: none;\n  opacity: 0;\n  transition: 0.15s ease all;\n}\n\n.apexcharts-xcrosshairs.active, .apexcharts-ycrosshairs.active {\n  opacity: 1;\n  transition: 0.15s ease all;\n}\n\n.apexcharts-ycrosshairs-hidden {\n  opacity: 0;\n}\n\n.apexcharts-zoom-rect {\n  pointer-events: none;\n}\n.apexcharts-selection-rect {\n  cursor: move;\n}\n\n.svg_select_points, .svg_select_points_rot {\n  opacity: 0;\n  visibility: hidden;\n}\n.svg_select_points_l, .svg_select_points_r {\n  cursor: ew-resize;\n  opacity: 1;\n  visibility: visible;\n  fill: #888;\n}\n.apexcharts-canvas.zoomable .hovering-zoom {\n  cursor: crosshair\n}\n.apexcharts-canvas.zoomable .hovering-pan {\n  cursor: move\n}\n\n.apexcharts-xaxis,\n.apexcharts-yaxis {\n  pointer-events: none;\n}\n\n.apexcharts-zoom-icon,\n.apexcharts-zoom-in-icon,\n.apexcharts-zoom-out-icon,\n.apexcharts-reset-zoom-icon,\n.apexcharts-pan-icon,\n.apexcharts-selection-icon,\n.apexcharts-menu-icon,\n.apexcharts-toolbar-custom-icon {\n  cursor: pointer;\n  width: 20px;\n  height: 20px;\n  line-height: 24px;\n  color: #6E8192;\n  text-align: center;\n}\n\n\n.apexcharts-zoom-icon svg,\n.apexcharts-zoom-in-icon svg,\n.apexcharts-zoom-out-icon svg,\n.apexcharts-reset-zoom-icon svg,\n.apexcharts-menu-icon svg {\n  fill: #6E8192;\n}\n.apexcharts-selection-icon svg {\n  fill: #444;\n  transform: scale(0.76)\n}\n\n.dark .apexcharts-zoom-icon svg,\n.dark .apexcharts-zoom-in-icon svg,\n.dark .apexcharts-zoom-out-icon svg,\n.dark .apexcharts-reset-zoom-icon svg,\n.dark .apexcharts-pan-icon svg,\n.dark .apexcharts-selection-icon svg,\n.dark .apexcharts-menu-icon svg,\n.dark .apexcharts-toolbar-custom-icon svg{\n  fill: #f3f4f5;\n}\n\n.apexcharts-canvas .apexcharts-zoom-icon.selected svg,\n.apexcharts-canvas .apexcharts-selection-icon.selected svg,\n.apexcharts-canvas .apexcharts-reset-zoom-icon.selected svg {\n  fill: #008FFB;\n}\n.light .apexcharts-selection-icon:not(.selected):hover svg,\n.light .apexcharts-zoom-icon:not(.selected):hover svg,\n.light .apexcharts-zoom-in-icon:hover svg,\n.light .apexcharts-zoom-out-icon:hover svg,\n.light .apexcharts-reset-zoom-icon:hover svg,\n.light .apexcharts-menu-icon:hover svg {\n  fill: #333;\n}\n\n.apexcharts-selection-icon, .apexcharts-menu-icon {\n  position: relative;\n}\n.apexcharts-reset-zoom-icon {\n  margin-left: 5px;\n}\n.apexcharts-zoom-icon, .apexcharts-reset-zoom-icon, .apexcharts-menu-icon {\n  transform: scale(0.85);\n}\n\n.apexcharts-zoom-in-icon, .apexcharts-zoom-out-icon {\n  transform: scale(0.7)\n}\n\n.apexcharts-zoom-out-icon {\n  margin-right: 3px;\n}\n\n.apexcharts-pan-icon {\n  transform: scale(0.62);\n  position: relative;\n  left: 1px;\n  top: 0px;\n}\n.apexcharts-pan-icon svg {\n  fill: #fff;\n  stroke: #6E8192;\n  stroke-width: 2;\n}\n.apexcharts-pan-icon.selected svg {\n  stroke: #008FFB;\n}\n.apexcharts-pan-icon:not(.selected):hover svg {\n  stroke: #333;\n}\n\n.apexcharts-toolbar {\n  position: absolute;\n  z-index: 11;\n  top: 0px;\n  right: 3px;\n  max-width: 176px;\n  text-align: right;\n  border-radius: 3px;\n  padding: 0px 6px 2px 6px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.apexcharts-toolbar svg {\n  pointer-events: none;\n}\n\n.apexcharts-menu {\n  background: #fff;\n  position: absolute;\n  top: 100%;\n  border: 1px solid #ddd;\n  border-radius: 3px;\n  padding: 3px;\n  right: 10px;\n  opacity: 0;\n  min-width: 110px;\n  transition: 0.15s ease all;\n  pointer-events: none;\n}\n\n.apexcharts-menu.open {\n  opacity: 1;\n  pointer-events: all;\n  transition: 0.15s ease all;\n}\n\n.apexcharts-menu-item {\n  padding: 6px 7px;\n  font-size: 12px;\n  cursor: pointer;\n}\n.light .apexcharts-menu-item:hover {\n  background: #eee;\n}\n.dark .apexcharts-menu {\n  background: rgba(0, 0, 0, 0.7);\n  color: #fff;\n}\n\n@media screen and (min-width: 768px) {\n  .apexcharts-toolbar {\n    /*opacity: 0;*/\n  }\n\n  .apexcharts-canvas:hover .apexcharts-toolbar {\n    opacity: 1;\n  }\n}\n\n.apexcharts-datalabel.hidden {\n  opacity: 0;\n}\n\n.apexcharts-pie-label,\n.apexcharts-datalabel, .apexcharts-datalabel-label, .apexcharts-datalabel-value {\n  cursor: default;\n  pointer-events: none;\n}\n\n.apexcharts-pie-label-delay {\n  opacity: 0;\n  animation-name: opaque;\n  animation-duration: 0.3s;\n  animation-fill-mode: forwards;\n  animation-timing-function: ease;\n}\n\n.apexcharts-canvas .hidden {\n  opacity: 0;\n}\n\n.apexcharts-hide .apexcharts-series-points {\n  opacity: 0;\n}\n\n.apexcharts-area-series .apexcharts-series-markers .apexcharts-marker.no-pointer-events,\n.apexcharts-line-series .apexcharts-series-markers .apexcharts-marker.no-pointer-events, .apexcharts-radar-series path, .apexcharts-radar-series polygon {\n  pointer-events: none;\n}\n\n/* markers */\n\n.apexcharts-marker {\n  transition: 0.15s ease all;\n}\n\n@keyframes opaque {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n/* Resize generated styles */\n@keyframes resizeanim {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n.resize-triggers {\n  animation: 1ms resizeanim;\n  visibility: hidden;\n  opacity: 0;\n}\n\n.resize-triggers, .resize-triggers > div, .contract-trigger:before {\n  content: " ";\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n}\n\n.resize-triggers > div {\n  background: #eee;\n  overflow: auto;\n}\n\n.contract-trigger:before {\n  width: 200%;\n  height: 200%;\n}\n';styleInject(css),
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
"document"in self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))||function(t){if("Element"in t){var e=t.Element.prototype,i=Object,s=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")},a=Array.prototype.indexOf||function(t){for(var e=0,i=this.length;e<i;e++)if(e in this&&this[e]===t)return e;return-1},r=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},n=function(t,e){if(""===e)throw new r("SYNTAX_ERR","The token must not be empty.");if(/\s/.test(e))throw new r("INVALID_CHARACTER_ERR","The token must not contain space characters.");return a.call(t,e)},o=function(t){for(var e=s.call(t.getAttribute("class")||""),i=e?e.split(/\s+/):[],a=0,r=i.length;a<r;a++)this.push(i[a]);this._updateClassName=function(){t.setAttribute("class",this.toString())}},l=o.prototype=[],h=function(){return new o(this)};if(r.prototype=Error.prototype,l.item=function(t){return this[t]||null},l.contains=function(t){return~n(this,t+"")},l.add=function(){var t,e=arguments,i=0,s=e.length,a=!1;do{t=e[i]+"",~n(this,t)||(this.push(t),a=!0)}while(++i<s);a&&this._updateClassName()},l.remove=function(){var t,e,i=arguments,s=0,a=i.length,r=!1;do{for(t=i[s]+"",e=n(this,t);~e;)this.splice(e,1),r=!0,e=n(this,t)}while(++s<a);r&&this._updateClassName()},l.toggle=function(t,e){var i=this.contains(t),s=i?!0!==e&&"remove":!1!==e&&"add";return s&&this[s](t),!0===e||!1===e?e:!i},l.replace=function(t,e){var i=n(t+"");~i&&(this.splice(i,1,e),this._updateClassName())},l.toString=function(){return this.join(" ")},i.defineProperty){var c={get:h,enumerable:!0,configurable:!0};try{i.defineProperty(e,"classList",c)}catch(t){void 0!==t.number&&-2146823252!==t.number||(c.enumerable=!1,i.defineProperty(e,"classList",c))}}else i.prototype.__defineGetter__&&e.__defineGetter__("classList",h)}}(self),function(){var t=document.createElement("_");if(t.classList.add("c1","c2"),!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var i,s=arguments.length;for(i=0;i<s;i++)t=arguments[i],e.call(this,t)}};e("add"),e("remove")}if(t.classList.toggle("c3",!1),t.classList.contains("c3")){var i=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){return 1 in arguments&&!this.contains(t)==!e?e:i.call(this,t)}}"replace"in document.createElement("_").classList||(DOMTokenList.prototype.replace=function(t,e){var i=this.toString().split(" "),s=i.indexOf(t+"");~s&&(i=i.slice(s),this.remove.apply(this,i),this.add(e),this.add.apply(this,i.slice(1)))}),t=null}()),function(){function t(t){var e=t.__resizeTriggers__,i=e.firstElementChild,s=e.lastElementChild,a=i.firstElementChild;s.scrollLeft=s.scrollWidth,s.scrollTop=s.scrollHeight,a.style.width=i.offsetWidth+1+"px",a.style.height=i.offsetHeight+1+"px",i.scrollLeft=i.scrollWidth,i.scrollTop=i.scrollHeight}function e(e){var i=this;t(this),this.__resizeRAF__&&r(this.__resizeRAF__),this.__resizeRAF__=a((function(){(function(t){return t.offsetWidth!=t.__resizeLast__.width||t.offsetHeight!=t.__resizeLast__.height})(i)&&(i.__resizeLast__.width=i.offsetWidth,i.__resizeLast__.height=i.offsetHeight,i.__resizeListeners__.forEach((function(t){t.call(e)})))}))}var i,s,a=(i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(t){return window.setTimeout(t,20)},function(t){return i(t)}),r=(s=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.clearTimeout,function(t){return s(t)}),n=!1,o="animationstart",l="Webkit Moz O ms".split(" "),h="webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),c=document.createElement("fakeelement");if(void 0!==c.style.animationName&&(n=!0),!1===n)for(var d=0;d<l.length;d++)if(void 0!==c.style[l[d]+"AnimationName"]){o=h[d];break}window.addResizeListener=function(i,s){i.__resizeTriggers__||("static"==getComputedStyle(i).position&&(i.style.position="relative"),i.__resizeLast__={},i.__resizeListeners__=[],(i.__resizeTriggers__=document.createElement("div")).className="resize-triggers",i.__resizeTriggers__.innerHTML='<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>',i.appendChild(i.__resizeTriggers__),t(i),i.addEventListener("scroll",e,!0),o&&i.__resizeTriggers__.addEventListener(o,(function(e){"resizeanim"==e.animationName&&t(i)}))),i.__resizeListeners__.push(s)},window.removeResizeListener=function(t,i){t&&(t.__resizeListeners__.splice(t.__resizeListeners__.indexOf(i),1),t.__resizeListeners__.length||(t.removeEventListener("scroll",e),t.__resizeTriggers__=!t.removeChild(t.__resizeTriggers__)))}}(),window.Apex={};var ApexCharts$1=function(){function t(e,i){_classCallCheck(this,t),this.opts=i,this.ctx=this,this.w=new Base(i).init(),this.el=e,this.w.globals.cuid=Utils.randomId(),this.w.globals.chartID=this.w.config.chart.id?this.w.config.chart.id:this.w.globals.cuid,this.eventList=["mousedown","mousemove","touchstart","touchmove","mouseup","touchend"],this.initModules(),this.create=Utils.bind(this.create,this),this.documentEvent=Utils.bind(this.documentEvent,this),this.windowResizeHandler=this.windowResize.bind(this)}return _createClass(t,[{key:"render",value:function(){var t=this;return new Promise$1((function(e,i){if(null!==t.el){void 0===Apex._chartInstances&&(Apex._chartInstances=[]),t.w.config.chart.id&&Apex._chartInstances.push({id:t.w.globals.chartID,group:t.w.config.chart.group,chart:t}),t.setLocale(t.w.config.chart.defaultLocale);var s=t.w.config.chart.events.beforeMount;"function"==typeof s&&s(t,t.w),t.fireEvent("beforeMount",[t,t.w]),window.addEventListener("resize",t.windowResizeHandler),window.addResizeListener(t.el.parentNode,t.parentResizeCallback.bind(t));var a=t.create(t.w.config.series,{});if(!a)return e(t);t.mount(a).then((function(){e(a),"function"==typeof t.w.config.chart.events.mounted&&t.w.config.chart.events.mounted(t,t.w),t.fireEvent("mounted",[t,t.w])})).catch((function(t){i(t)}))}else i(new Error("Element not found"))}))}},{key:"initModules",value:function(){this.animations=new Animations(this),this.axes=new Axes(this),this.core=new Core(this.el,this),this.data=new Data(this),this.grid=new Grid(this),this.coreUtils=new CoreUtils(this),this.config=new Config({}),this.crosshairs=new Crosshairs(this),this.options=new Options,this.responsive=new Responsive(this),this.series=new Series(this),this.theme=new Theme(this),this.formatters=new Formatters(this),this.titleSubtitle=new TitleSubtitle(this),this.legend=new Legend(this),this.toolbar=new Toolbar(this),this.dimensions=new Dimensions(this),this.zoomPanSelection=new ZoomPanSelection(this),this.w.globals.tooltip=new Tooltip(this)}},{key:"addEventListener",value:function(t,e){var i=this.w;i.globals.events.hasOwnProperty(t)?i.globals.events[t].push(e):i.globals.events[t]=[e]}},{key:"removeEventListener",value:function(t,e){var i=this.w;if(i.globals.events.hasOwnProperty(t)){var s=i.globals.events[t].indexOf(e);-1!==s&&i.globals.events[t].splice(s,1)}}},{key:"fireEvent",value:function(t,e){var i=this.w;if(i.globals.events.hasOwnProperty(t)){e&&e.length||(e=[]);for(var s=i.globals.events[t],a=s.length,r=0;r<a;r++)s[r].apply(null,e)}}},{key:"create",value:function(t,e){var i=this.w;this.initModules();var s=this.w.globals;if(s.noData=!1,s.animationEnded=!1,this.responsive.checkResponsiveConfig(e),null===this.el)return s.animationEnded=!0,null;if(this.core.setupElements(),0===s.svgWidth)return s.animationEnded=!0,null;var a=CoreUtils.checkComboSeries(t);s.comboCharts=a.comboCharts,s.comboChartsHasBars=a.comboChartsHasBars,(0===t.length||1===t.length&&t[0].data&&0===t[0].data.length)&&this.series.handleNoData(),this.setupEventHandlers(),this.data.parseData(t),this.theme.init(),new Markers(this).setGlobalMarkerSize(),this.formatters.setLabelFormatters(),this.titleSubtitle.draw(),s.noData&&s.collapsedSeries.length!==s.series.length||this.legend.init(),this.series.hasAllSeriesEqualX(),s.axisCharts&&(this.core.coreCalculations(),"category"!==i.config.xaxis.type&&this.formatters.setLabelFormatters()),this.formatters.heatmapLabelFormatters(),this.dimensions.plotCoords();var r=this.core.xySettings();this.grid.createGridMask();var n=this.core.plotChartType(t,r);this.core.shiftGraphPosition();var o={plot:{left:i.globals.translateX,top:i.globals.translateY,width:i.globals.gridWidth,height:i.globals.gridHeight}};return{elGraph:n,xyRatios:r,elInner:i.globals.dom.elGraphical,dimensions:o}}},{key:"mount",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this,i=e.w;return new Promise$1((function(s,a){if(null===e.el)return a(new Error("Not enough data to display or target element not found"));if((null===t||i.globals.allSeriesCollapsed)&&e.series.handleNoData(),e.annotations=new Annotations(e),e.axes.drawAxis(i.config.chart.type,t.xyRatios),e.grid=new Grid(e),"back"===i.config.grid.position&&e.grid.drawGrid(),"back"===i.config.annotations.position&&e.annotations.drawAnnotations(),t.elGraph instanceof Array)for(var r=0;r<t.elGraph.length;r++)i.globals.dom.elGraphical.add(t.elGraph[r]);else i.globals.dom.elGraphical.add(t.elGraph);if("front"===i.config.grid.position&&e.grid.drawGrid(),"front"===i.config.xaxis.crosshairs.position&&e.crosshairs.drawXCrosshairs(),"front"===i.config.yaxis[0].crosshairs.position&&e.crosshairs.drawYCrosshairs(),"front"===i.config.annotations.position&&e.annotations.drawAnnotations(),!i.globals.noData){if(i.config.tooltip.enabled&&!i.globals.noData&&e.w.globals.tooltip.drawTooltip(t.xyRatios),i.globals.axisCharts&&i.globals.isXNumeric)(i.config.chart.zoom.enabled||i.config.chart.selection&&i.config.chart.selection.enabled||i.config.chart.pan&&i.config.chart.pan.enabled)&&e.zoomPanSelection.init({xyRatios:t.xyRatios});else{var n=i.config.chart.toolbar.tools;n.zoom=!1,n.zoomin=!1,n.zoomout=!1,n.selection=!1,n.pan=!1,n.reset=!1}i.config.chart.toolbar.show&&!i.globals.allSeriesCollapsed&&e.toolbar.createToolbar()}i.globals.memory.methodsToExec.length>0&&i.globals.memory.methodsToExec.forEach((function(t){t.method(t.params,!1,t.context)})),i.globals.axisCharts||i.globals.noData||e.core.resizeNonAxisCharts(),s(e)}))}},{key:"clearPreviousPaths",value:function(){var t=this.w;t.globals.previousPaths=[],t.globals.allSeriesCollapsed=!1,t.globals.collapsedSeries=[],t.globals.collapsedSeriesIndices=[]}},{key:"updateOptions",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],r=this.w;return t.series&&(this.resetSeries(!1),t.series.length&&t.series[0].data&&(t.series=t.series.map((function(t,e){return _objectSpread2({},r.config.series[e],{name:t.name?t.name:r.config.series[e]&&r.config.series[e].name,type:t.type?t.type:r.config.series[e]&&r.config.series[e].type,data:t.data?t.data:r.config.series[e]&&r.config.series[e].data})}))),this.revertDefaultAxisMinMax()),t.xaxis&&((t.xaxis.min||t.xaxis.max)&&this.forceXAxisUpdate(t),t.xaxis.categories&&t.xaxis.categories.length&&r.config.xaxis.convertedCatToNumeric&&(t=Defaults.convertCatToNumeric(t))),r.globals.collapsedSeriesIndices.length>0&&this.clearPreviousPaths(),t.theme&&(t=this.theme.updateThemeOptions(t)),this._updateOptions(t,e,i,s,a)}},{key:"_updateOptions",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r=[this];s&&(r=this.getSyncedCharts()),this.w.globals.isExecCalled&&(r=[this],this.w.globals.isExecCalled=!1),r.forEach((function(s){var r=s.w;return r.globals.shouldAnimate=i,e||(r.globals.resized=!0,r.globals.dataChanged=!0,i&&s.series.getPreviousPaths()),t&&"object"===_typeof(t)&&(s.config=new Config(t),t=CoreUtils.extendArrayProps(s.config,t),r.config=Utils.extend(r.config,t),a&&(r.globals.initialConfig=Utils.extend({},r.config),r.globals.initialSeries=JSON.parse(JSON.stringify(r.config.series)))),s.update(t)}))}},{key:"updateSeries",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return this.resetSeries(!1),this.revertDefaultAxisMinMax(),this._updateSeries(t,e,i)}},{key:"appendSeries",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=this.w.config.series.slice();return s.push(t),this.resetSeries(!1),this.revertDefaultAxisMinMax(),this._updateSeries(s,e,i)}},{key:"_updateSeries",value:function(t,e){var i,s=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=this.w;return this.w.globals.shouldAnimate=e,a.globals.dataChanged=!0,a.globals.allSeriesCollapsed&&(a.globals.allSeriesCollapsed=!1),e&&this.series.getPreviousPaths(),a.globals.axisCharts?(0===(i=t.map((function(t,e){return _objectSpread2({},a.config.series[e],{name:t.name?t.name:a.config.series[e]&&a.config.series[e].name,type:t.type?t.type:a.config.series[e]&&a.config.series[e].type,data:t.data?t.data:a.config.series[e]&&a.config.series[e].data})}))).length&&(i=[{data:[]}]),a.config.series=i):a.config.series=t.slice(),s&&(a.globals.initialConfig.series=JSON.parse(JSON.stringify(a.config.series)),a.globals.initialSeries=JSON.parse(JSON.stringify(a.config.series))),this.update()}},{key:"getSyncedCharts",value:function(){var t=this.getGroupedCharts(),e=[this];return t.length&&(e=[],t.forEach((function(t){e.push(t)}))),e}},{key:"getGroupedCharts",value:function(){var t=this;return Apex._chartInstances.filter((function(t){if(t.group)return!0})).map((function(e){return t.w.config.chart.group===e.group?e.chart:t}))}},{key:"appendData",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=this;i.w.globals.dataChanged=!0,i.series.getPreviousPaths();for(var s=i.w.config.series.slice(),a=0;a<s.length;a++)if(void 0!==t[a])for(var r=0;r<t[a].data.length;r++)s[a].data.push(t[a].data[r]);return i.w.config.series=s,e&&(i.w.globals.initialSeries=JSON.parse(JSON.stringify(i.w.config.series))),this.update()}},{key:"update",value:function(t){var e=this;return new Promise$1((function(i,s){e.clear();var a=e.create(e.w.config.series,t);if(!a)return i(e);e.mount(a).then((function(){"function"==typeof e.w.config.chart.events.updated&&e.w.config.chart.events.updated(e,e.w),e.fireEvent("updated",[e,e.w]),e.w.globals.isDirty=!0,i(e)})).catch((function(t){s(t)}))}))}},{key:"forceXAxisUpdate",value:function(t){var e=this.w;void 0!==t.xaxis.min&&(e.config.xaxis.min=t.xaxis.min),void 0!==t.xaxis.max&&(e.config.xaxis.max=t.xaxis.max)}},{key:"revertDefaultAxisMinMax",value:function(){var t=this,e=this.w;e.config.xaxis.min=this.opts.xaxis.min||Apex.xaxis&&Apex.xaxis.min,e.config.xaxis.max=this.opts.xaxis.max||Apex.xaxis&&Apex.xaxis.max,e.config.yaxis.map((function(i,s){e.globals.zoomed&&void 0!==t.opts.yaxis[s]&&(i.min=t.opts.yaxis[s].min,i.max=t.opts.yaxis[s].max)}))}},{key:"clear",value:function(){this.zoomPanSelection&&this.zoomPanSelection.destroy(),this.toolbar&&this.toolbar.destroy(),this.animations=null,this.axes=null,this.annotations=null,this.core=null,this.data=null,this.grid=null,this.series=null,this.responsive=null,this.theme=null,this.formatters=null,this.titleSubtitle=null,this.legend=null,this.dimensions=null,this.options=null,this.crosshairs=null,this.zoomPanSelection=null,this.toolbar=null,this.w.globals.tooltip=null,this.clearDomElements()}},{key:"killSVG",value:function(t){return new Promise$1((function(e,i){t.each((function(t,e){this.removeClass("*"),this.off(),this.stop()}),!0),t.ungroup(),t.clear(),e("done")}))}},{key:"clearDomElements",value:function(){var t=this;this.eventList.forEach((function(e){document.removeEventListener(e,t.documentEvent)}));var e=this.w.globals.dom;if(null!==this.el)for(;this.el.firstChild;)this.el.removeChild(this.el.firstChild);this.killSVG(e.Paper),e.Paper.remove(),e.elWrap=null,e.elGraphical=null,e.elLegendWrap=null,e.baseEl=null,e.elGridRect=null,e.elGridRectMask=null,e.elGridRectMarkerMask=null,e.elDefs=null}},{key:"destroy",value:function(){this.clear();var t=this.w.config.chart.id;t&&Apex._chartInstances.forEach((function(e,i){e.id===t&&Apex._chartInstances.splice(i,1)})),window.removeEventListener("resize",this.windowResizeHandler),window.removeResizeListener(this.el.parentNode,this.parentResizeCallback.bind(this))}},{key:"toggleSeries",value:function(t){var e=this.series.isSeriesHidden(t);return this.legend.toggleDataSeries(e.realIndex,e.isHidden),e.isHidden}},{key:"showSeries",value:function(t){var e=this.series.isSeriesHidden(t);e.isHidden&&this.legend.toggleDataSeries(e.realIndex,!0)}},{key:"hideSeries",value:function(t){var e=this.series.isSeriesHidden(t);e.isHidden||this.legend.toggleDataSeries(e.realIndex,!1)}},{key:"resetSeries",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.series.resetSeries(t)}},{key:"setupEventHandlers",value:function(){var t=this,e=this.w,i=this,s=e.globals.dom.baseEl.querySelector(e.globals.chartClass);this.eventListHandlers=[],this.eventList.forEach((function(t){s.addEventListener(t,(function(t){var s=Object.assign({},e,{seriesIndex:e.globals.capturedSeriesIndex,dataPointIndex:e.globals.capturedDataPointIndex});"mousemove"===t.type||"touchmove"===t.type?"function"==typeof e.config.chart.events.mouseMove&&e.config.chart.events.mouseMove(t,i,s):("mouseup"===t.type&&1===t.which||"touchend"===t.type)&&("function"==typeof e.config.chart.events.click&&e.config.chart.events.click(t,i,s),i.fireEvent("click",[t,i,s]))}),{capture:!1,passive:!0})})),this.eventList.forEach((function(e){document.addEventListener(e,t.documentEvent)})),this.core.setupBrushHandler()}},{key:"documentEvent",value:function(t){var e=this.w;e.globals.clientX="touchmove"===t.type?t.touches[0].clientX:t.clientX,e.globals.clientY="touchmove"===t.type?t.touches[0].clientY:t.clientY}},{key:"addXaxisAnnotation",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,s=this;i&&(s=i),s.annotations.addXaxisAnnotationExternal(t,e,s)}},{key:"addYaxisAnnotation",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,s=this;i&&(s=i),s.annotations.addYaxisAnnotationExternal(t,e,s)}},{key:"addPointAnnotation",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,s=this;i&&(s=i),s.annotations.addPointAnnotationExternal(t,e,s)}},{key:"clearAnnotations",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,e=this;t&&(e=t),e.annotations.clearAnnotations(e)}},{key:"removeAnnotation",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,i=this;e&&(i=e),i.annotations.removeAnnotation(i,t)}},{key:"addText",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,s=this;i&&(s=i),s.annotations.addText(t,e,s)}},{key:"getChartArea",value:function(){return this.w.globals.dom.baseEl.querySelector(".apexcharts-inner")}},{key:"getSeriesTotalXRange",value:function(t,e){return this.coreUtils.getSeriesTotalsXRange(t,e)}},{key:"getHighestValueInSeries",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=new Range$1(this.ctx),i=e.getMinYMaxY(t);return i.highestY}},{key:"getLowestValueInSeries",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=new Range$1(this.ctx),i=e.getMinYMaxY(t);return i.lowestY}},{key:"getSeriesTotal",value:function(){return this.w.globals.seriesTotals}},{key:"setLocale",value:function(t){this.setCurrentLocaleValues(t)}},{key:"toggleDataPointSelection",value:function(t,e){var i=this.w,s=null;i.globals.axisCharts?s=i.globals.dom.Paper.select(".apexcharts-series[data\\:realIndex='".concat(t,"'] path[j='").concat(e,"'], .apexcharts-series[data\\:realIndex='").concat(t,"'] circle[j='").concat(e,"'], .apexcharts-series[data\\:realIndex='").concat(t,"'] rect[j='").concat(e,"']")).members[0]:(s=i.globals.dom.Paper.select(".apexcharts-series[data\\:realIndex='".concat(t,"']")).members[0],("pie"===i.config.chart.type||"donut"===i.config.chart.type)&&new Pie(this.ctx).pieClicked(t));s?new Graphics(this.ctx).pathMouseDown(s,null):console.warn("toggleDataPointSelection: Element not found");return s.node?s.node:null}},{key:"setCurrentLocaleValues",value:function(t){var e=this.w.config.chart.locales;window.Apex.chart&&window.Apex.chart.locales&&window.Apex.chart.locales.length>0&&(e=this.w.config.chart.locales.concat(window.Apex.chart.locales));var i=e.filter((function(e){return e.name===t}))[0];if(!i)throw new Error("Wrong locale name provided. Please make sure you set the correct locale name in options");var s=Utils.extend(en,i);this.w.globals.locale=s.options}},{key:"dataURI",value:function(){return new Exports(this.ctx).dataURI()}},{key:"paper",value:function(){return this.w.globals.dom.Paper}},{key:"parentResizeCallback",value:function(){this.w.globals.animationEnded&&this.windowResize()}},{key:"windowResize",value:function(){var t=this;clearTimeout(this.w.globals.resizeTimer),this.w.globals.resizeTimer=window.setTimeout((function(){t.w.globals.resized=!0,t.w.globals.dataChanged=!1,t.update()}),150)}}],[{key:"initOnLoad",value:function(){for(var e=document.querySelectorAll("[data-apexcharts]"),i=0;i<e.length;i++){new t(e[i],JSON.parse(e[i].getAttribute("data-options"))).render()}}},{key:"exec",value:function(t,e){var i=this.getChartByID(t);if(i){i.w.globals.isExecCalled=!0;var s=["updateOptions","updateSeries","appendData","appendSeries","toggleSeries","resetSeries","toggleDataPointSelection","dataURI","addXaxisAnnotation","addYaxisAnnotation","addPointAnnotation","addText","clearAnnotations","removeAnnotation","paper","destroy"],a=null;if(-1!==s.indexOf(e)){for(var r=arguments.length,n=new Array(r>2?r-2:0),o=2;o<r;o++)n[o-2]=arguments[o];a=i[e].apply(i,n)}return a}}},{key:"merge",value:function(t,e){return Utils.extend(t,e)}},{key:"getChartByID",value:function(t){return Apex._chartInstances.filter((function(e){return e.id===t}))[0].chart}}]),t}();module.exports=ApexCharts$1;
}).call(this,require("timers").setImmediate)
},{"timers":12}],10:[function(require,module,exports){
/**
 * chroma.js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2019, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * -------------------------------------------------------
 *
 * chroma.js includes colors from colorbrewer2.org, which are released under
 * the following license:
 *
 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
 * and The Pennsylvania State University.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * ------------------------------------------------------
 *
 * Named colors are taken from X11 Color Names.
 * http://www.w3.org/TR/css3-color/#svg-color
 *
 * @preserve
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.chroma = factory());
}(this, (function () { 'use strict';

    var limit = function (x, min, max) {
        if ( min === void 0 ) min=0;
        if ( max === void 0 ) max=1;

        return x < min ? min : x > max ? max : x;
    };

    var clip_rgb = function (rgb) {
        rgb._clipped = false;
        rgb._unclipped = rgb.slice(0);
        for (var i=0; i<=3; i++) {
            if (i < 3) {
                if (rgb[i] < 0 || rgb[i] > 255) { rgb._clipped = true; }
                rgb[i] = limit(rgb[i], 0, 255);
            } else if (i === 3) {
                rgb[i] = limit(rgb[i], 0, 1);
            }
        }
        return rgb;
    };

    // ported from jQuery's $.type
    var classToType = {};
    for (var i = 0, list = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null']; i < list.length; i += 1) {
        var name = list[i];

        classToType[("[object " + name + "]")] = name.toLowerCase();
    }
    var type = function(obj) {
        return classToType[Object.prototype.toString.call(obj)] || "object";
    };

    var unpack = function (args, keyOrder) {
        if ( keyOrder === void 0 ) keyOrder=null;

    	// if called with more than 3 arguments, we return the arguments
        if (args.length >= 3) { return Array.prototype.slice.call(args); }
        // with less than 3 args we check if first arg is object
        // and use the keyOrder string to extract and sort properties
    	if (type(args[0]) == 'object' && keyOrder) {
    		return keyOrder.split('')
    			.filter(function (k) { return args[0][k] !== undefined; })
    			.map(function (k) { return args[0][k]; });
    	}
    	// otherwise we just return the first argument
    	// (which we suppose is an array of args)
        return args[0];
    };

    var last = function (args) {
        if (args.length < 2) { return null; }
        var l = args.length-1;
        if (type(args[l]) == 'string') { return args[l].toLowerCase(); }
        return null;
    };

    var PI = Math.PI;

    var utils = {
    	clip_rgb: clip_rgb,
    	limit: limit,
    	type: type,
    	unpack: unpack,
    	last: last,
    	PI: PI,
    	TWOPI: PI*2,
    	PITHIRD: PI/3,
    	DEG2RAD: PI / 180,
    	RAD2DEG: 180 / PI
    };

    var input = {
    	format: {},
    	autodetect: []
    };

    var last$1 = utils.last;
    var clip_rgb$1 = utils.clip_rgb;
    var type$1 = utils.type;


    var Color = function Color() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var me = this;
        if (type$1(args[0]) === 'object' &&
            args[0].constructor &&
            args[0].constructor === this.constructor) {
            // the argument is already a Color instance
            return args[0];
        }

        // last argument could be the mode
        var mode = last$1(args);
        var autodetect = false;

        if (!mode) {
            autodetect = true;
            if (!input.sorted) {
                input.autodetect = input.autodetect.sort(function (a,b) { return b.p - a.p; });
                input.sorted = true;
            }
            // auto-detect format
            for (var i = 0, list = input.autodetect; i < list.length; i += 1) {
                var chk = list[i];

                mode = chk.test.apply(chk, args);
                if (mode) { break; }
            }
        }

        if (input.format[mode]) {
            var rgb = input.format[mode].apply(null, autodetect ? args : args.slice(0,-1));
            me._rgb = clip_rgb$1(rgb);
        } else {
            throw new Error('unknown format: '+args);
        }

        // add alpha channel
        if (me._rgb.length === 3) { me._rgb.push(1); }
    };

    Color.prototype.toString = function toString () {
        if (type$1(this.hex) == 'function') { return this.hex(); }
        return ("[" + (this._rgb.join(',')) + "]");
    };

    var Color_1 = Color;

    var chroma = function () {
    	var args = [], len = arguments.length;
    	while ( len-- ) args[ len ] = arguments[ len ];

    	return new (Function.prototype.bind.apply( chroma.Color, [ null ].concat( args) ));
    };

    chroma.Color = Color_1;
    chroma.version = '2.1.0';

    var chroma_1 = chroma;

    var unpack$1 = utils.unpack;
    var max = Math.max;

    var rgb2cmyk = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$1(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r = r / 255;
        g = g / 255;
        b = b / 255;
        var k = 1 - max(r,max(g,b));
        var f = k < 1 ? 1 / (1-k) : 0;
        var c = (1-r-k) * f;
        var m = (1-g-k) * f;
        var y = (1-b-k) * f;
        return [c,m,y,k];
    };

    var rgb2cmyk_1 = rgb2cmyk;

    var unpack$2 = utils.unpack;

    var cmyk2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$2(args, 'cmyk');
        var c = args[0];
        var m = args[1];
        var y = args[2];
        var k = args[3];
        var alpha = args.length > 4 ? args[4] : 1;
        if (k === 1) { return [0,0,0,alpha]; }
        return [
            c >= 1 ? 0 : 255 * (1-c) * (1-k), // r
            m >= 1 ? 0 : 255 * (1-m) * (1-k), // g
            y >= 1 ? 0 : 255 * (1-y) * (1-k), // b
            alpha
        ];
    };

    var cmyk2rgb_1 = cmyk2rgb;

    var unpack$3 = utils.unpack;
    var type$2 = utils.type;



    Color_1.prototype.cmyk = function() {
        return rgb2cmyk_1(this._rgb);
    };

    chroma_1.cmyk = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['cmyk']) ));
    };

    input.format.cmyk = cmyk2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$3(args, 'cmyk');
            if (type$2(args) === 'array' && args.length === 4) {
                return 'cmyk';
            }
        }
    });

    var unpack$4 = utils.unpack;
    var last$2 = utils.last;
    var rnd = function (a) { return Math.round(a*100)/100; };

    /*
     * supported arguments:
     * - hsl2css(h,s,l)
     * - hsl2css(h,s,l,a)
     * - hsl2css([h,s,l], mode)
     * - hsl2css([h,s,l,a], mode)
     * - hsl2css({h,s,l,a}, mode)
     */
    var hsl2css = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var hsla = unpack$4(args, 'hsla');
        var mode = last$2(args) || 'lsa';
        hsla[0] = rnd(hsla[0] || 0);
        hsla[1] = rnd(hsla[1]*100) + '%';
        hsla[2] = rnd(hsla[2]*100) + '%';
        if (mode === 'hsla' || (hsla.length > 3 && hsla[3]<1)) {
            hsla[3] = hsla.length > 3 ? hsla[3] : 1;
            mode = 'hsla';
        } else {
            hsla.length = 3;
        }
        return (mode + "(" + (hsla.join(',')) + ")");
    };

    var hsl2css_1 = hsl2css;

    var unpack$5 = utils.unpack;

    /*
     * supported arguments:
     * - rgb2hsl(r,g,b)
     * - rgb2hsl(r,g,b,a)
     * - rgb2hsl([r,g,b])
     * - rgb2hsl([r,g,b,a])
     * - rgb2hsl({r,g,b,a})
     */
    var rgb2hsl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$5(args, 'rgba');
        var r = args[0];
        var g = args[1];
        var b = args[2];

        r /= 255;
        g /= 255;
        b /= 255;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);

        var l = (max + min) / 2;
        var s, h;

        if (max === min){
            s = 0;
            h = Number.NaN;
        } else {
            s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
        }

        if (r == max) { h = (g - b) / (max - min); }
        else if (g == max) { h = 2 + (b - r) / (max - min); }
        else if (b == max) { h = 4 + (r - g) / (max - min); }

        h *= 60;
        if (h < 0) { h += 360; }
        if (args.length>3 && args[3]!==undefined) { return [h,s,l,args[3]]; }
        return [h,s,l];
    };

    var rgb2hsl_1 = rgb2hsl;

    var unpack$6 = utils.unpack;
    var last$3 = utils.last;


    var round = Math.round;

    /*
     * supported arguments:
     * - rgb2css(r,g,b)
     * - rgb2css(r,g,b,a)
     * - rgb2css([r,g,b], mode)
     * - rgb2css([r,g,b,a], mode)
     * - rgb2css({r,g,b,a}, mode)
     */
    var rgb2css = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack$6(args, 'rgba');
        var mode = last$3(args) || 'rgb';
        if (mode.substr(0,3) == 'hsl') {
            return hsl2css_1(rgb2hsl_1(rgba), mode);
        }
        rgba[0] = round(rgba[0]);
        rgba[1] = round(rgba[1]);
        rgba[2] = round(rgba[2]);
        if (mode === 'rgba' || (rgba.length > 3 && rgba[3]<1)) {
            rgba[3] = rgba.length > 3 ? rgba[3] : 1;
            mode = 'rgba';
        }
        return (mode + "(" + (rgba.slice(0,mode==='rgb'?3:4).join(',')) + ")");
    };

    var rgb2css_1 = rgb2css;

    var unpack$7 = utils.unpack;
    var round$1 = Math.round;

    var hsl2rgb = function () {
        var assign;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$7(args, 'hsl');
        var h = args[0];
        var s = args[1];
        var l = args[2];
        var r,g,b;
        if (s === 0) {
            r = g = b = l*255;
        } else {
            var t3 = [0,0,0];
            var c = [0,0,0];
            var t2 = l < 0.5 ? l * (1+s) : l+s-l*s;
            var t1 = 2 * l - t2;
            var h_ = h / 360;
            t3[0] = h_ + 1/3;
            t3[1] = h_;
            t3[2] = h_ - 1/3;
            for (var i=0; i<3; i++) {
                if (t3[i] < 0) { t3[i] += 1; }
                if (t3[i] > 1) { t3[i] -= 1; }
                if (6 * t3[i] < 1)
                    { c[i] = t1 + (t2 - t1) * 6 * t3[i]; }
                else if (2 * t3[i] < 1)
                    { c[i] = t2; }
                else if (3 * t3[i] < 2)
                    { c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6; }
                else
                    { c[i] = t1; }
            }
            (assign = [round$1(c[0]*255),round$1(c[1]*255),round$1(c[2]*255)], r = assign[0], g = assign[1], b = assign[2]);
        }
        if (args.length > 3) {
            // keep alpha channel
            return [r,g,b,args[3]];
        }
        return [r,g,b,1];
    };

    var hsl2rgb_1 = hsl2rgb;

    var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
    var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;

    var round$2 = Math.round;

    var css2rgb = function (css) {
        css = css.toLowerCase().trim();
        var m;

        if (input.format.named) {
            try {
                return input.format.named(css);
            } catch (e) {
                // eslint-disable-next-line
            }
        }

        // rgb(250,20,0)
        if ((m = css.match(RE_RGB))) {
            var rgb = m.slice(1,4);
            for (var i=0; i<3; i++) {
                rgb[i] = +rgb[i];
            }
            rgb[3] = 1;  // default alpha
            return rgb;
        }

        // rgba(250,20,0,0.4)
        if ((m = css.match(RE_RGBA))) {
            var rgb$1 = m.slice(1,5);
            for (var i$1=0; i$1<4; i$1++) {
                rgb$1[i$1] = +rgb$1[i$1];
            }
            return rgb$1;
        }

        // rgb(100%,0%,0%)
        if ((m = css.match(RE_RGB_PCT))) {
            var rgb$2 = m.slice(1,4);
            for (var i$2=0; i$2<3; i$2++) {
                rgb$2[i$2] = round$2(rgb$2[i$2] * 2.55);
            }
            rgb$2[3] = 1;  // default alpha
            return rgb$2;
        }

        // rgba(100%,0%,0%,0.4)
        if ((m = css.match(RE_RGBA_PCT))) {
            var rgb$3 = m.slice(1,5);
            for (var i$3=0; i$3<3; i$3++) {
                rgb$3[i$3] = round$2(rgb$3[i$3] * 2.55);
            }
            rgb$3[3] = +rgb$3[3];
            return rgb$3;
        }

        // hsl(0,100%,50%)
        if ((m = css.match(RE_HSL))) {
            var hsl = m.slice(1,4);
            hsl[1] *= 0.01;
            hsl[2] *= 0.01;
            var rgb$4 = hsl2rgb_1(hsl);
            rgb$4[3] = 1;
            return rgb$4;
        }

        // hsla(0,100%,50%,0.5)
        if ((m = css.match(RE_HSLA))) {
            var hsl$1 = m.slice(1,4);
            hsl$1[1] *= 0.01;
            hsl$1[2] *= 0.01;
            var rgb$5 = hsl2rgb_1(hsl$1);
            rgb$5[3] = +m[4];  // default alpha = 1
            return rgb$5;
        }
    };

    css2rgb.test = function (s) {
        return RE_RGB.test(s) ||
            RE_RGBA.test(s) ||
            RE_RGB_PCT.test(s) ||
            RE_RGBA_PCT.test(s) ||
            RE_HSL.test(s) ||
            RE_HSLA.test(s);
    };

    var css2rgb_1 = css2rgb;

    var type$3 = utils.type;




    Color_1.prototype.css = function(mode) {
        return rgb2css_1(this._rgb, mode);
    };

    chroma_1.css = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['css']) ));
    };

    input.format.css = css2rgb_1;

    input.autodetect.push({
        p: 5,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$3(h) === 'string' && css2rgb_1.test(h)) {
                return 'css';
            }
        }
    });

    var unpack$8 = utils.unpack;

    input.format.gl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgb = unpack$8(args, 'rgba');
        rgb[0] *= 255;
        rgb[1] *= 255;
        rgb[2] *= 255;
        return rgb;
    };

    chroma_1.gl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['gl']) ));
    };

    Color_1.prototype.gl = function() {
        var rgb = this._rgb;
        return [rgb[0]/255, rgb[1]/255, rgb[2]/255, rgb[3]];
    };

    var unpack$9 = utils.unpack;

    var rgb2hcg = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$9(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var delta = max - min;
        var c = delta * 100 / 255;
        var _g = min / (255 - delta) * 100;
        var h;
        if (delta === 0) {
            h = Number.NaN;
        } else {
            if (r === max) { h = (g - b) / delta; }
            if (g === max) { h = 2+(b - r) / delta; }
            if (b === max) { h = 4+(r - g) / delta; }
            h *= 60;
            if (h < 0) { h += 360; }
        }
        return [h, c, _g];
    };

    var rgb2hcg_1 = rgb2hcg;

    var unpack$a = utils.unpack;
    var floor = Math.floor;

    /*
     * this is basically just HSV with some minor tweaks
     *
     * hue.. [0..360]
     * chroma .. [0..1]
     * grayness .. [0..1]
     */

    var hcg2rgb = function () {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$a(args, 'hcg');
        var h = args[0];
        var c = args[1];
        var _g = args[2];
        var r,g,b;
        _g = _g * 255;
        var _c = c * 255;
        if (c === 0) {
            r = g = b = _g;
        } else {
            if (h === 360) { h = 0; }
            if (h > 360) { h -= 360; }
            if (h < 0) { h += 360; }
            h /= 60;
            var i = floor(h);
            var f = h - i;
            var p = _g * (1 - c);
            var q = p + _c * (1 - f);
            var t = p + _c * f;
            var v = p + _c;
            switch (i) {
                case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
                case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
                case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
                case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
                case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
                case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
            }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var hcg2rgb_1 = hcg2rgb;

    var unpack$b = utils.unpack;
    var type$4 = utils.type;






    Color_1.prototype.hcg = function() {
        return rgb2hcg_1(this._rgb);
    };

    chroma_1.hcg = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hcg']) ));
    };

    input.format.hcg = hcg2rgb_1;

    input.autodetect.push({
        p: 1,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$b(args, 'hcg');
            if (type$4(args) === 'array' && args.length === 3) {
                return 'hcg';
            }
        }
    });

    var unpack$c = utils.unpack;
    var last$4 = utils.last;
    var round$3 = Math.round;

    var rgb2hex = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$c(args, 'rgba');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var a = ref[3];
        var mode = last$4(args) || 'auto';
        if (a === undefined) { a = 1; }
        if (mode === 'auto') {
            mode = a < 1 ? 'rgba' : 'rgb';
        }
        r = round$3(r);
        g = round$3(g);
        b = round$3(b);
        var u = r << 16 | g << 8 | b;
        var str = "000000" + u.toString(16); //#.toUpperCase();
        str = str.substr(str.length - 6);
        var hxa = '0' + round$3(a * 255).toString(16);
        hxa = hxa.substr(hxa.length - 2);
        switch (mode.toLowerCase()) {
            case 'rgba': return ("#" + str + hxa);
            case 'argb': return ("#" + hxa + str);
            default: return ("#" + str);
        }
    };

    var rgb2hex_1 = rgb2hex;

    var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

    var hex2rgb = function (hex) {
        if (hex.match(RE_HEX)) {
            // remove optional leading #
            if (hex.length === 4 || hex.length === 7) {
                hex = hex.substr(1);
            }
            // expand short-notation to full six-digit
            if (hex.length === 3) {
                hex = hex.split('');
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            }
            var u = parseInt(hex, 16);
            var r = u >> 16;
            var g = u >> 8 & 0xFF;
            var b = u & 0xFF;
            return [r,g,b,1];
        }

        // match rgba hex format, eg #FF000077
        if (hex.match(RE_HEXA)) {
            if (hex.length === 5 || hex.length === 9) {
                // remove optional leading #
                hex = hex.substr(1);
            }
            // expand short-notation to full eight-digit
            if (hex.length === 4) {
                hex = hex.split('');
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
            }
            var u$1 = parseInt(hex, 16);
            var r$1 = u$1 >> 24 & 0xFF;
            var g$1 = u$1 >> 16 & 0xFF;
            var b$1 = u$1 >> 8 & 0xFF;
            var a = Math.round((u$1 & 0xFF) / 0xFF * 100) / 100;
            return [r$1,g$1,b$1,a];
        }

        // we used to check for css colors here
        // if _input.css? and rgb = _input.css hex
        //     return rgb

        throw new Error(("unknown hex color: " + hex));
    };

    var hex2rgb_1 = hex2rgb;

    var type$5 = utils.type;




    Color_1.prototype.hex = function(mode) {
        return rgb2hex_1(this._rgb, mode);
    };

    chroma_1.hex = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hex']) ));
    };

    input.format.hex = hex2rgb_1;
    input.autodetect.push({
        p: 4,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$5(h) === 'string' && [3,4,5,6,7,8,9].indexOf(h.length) >= 0) {
                return 'hex';
            }
        }
    });

    var unpack$d = utils.unpack;
    var TWOPI = utils.TWOPI;
    var min = Math.min;
    var sqrt = Math.sqrt;
    var acos = Math.acos;

    var rgb2hsi = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
        */
        var ref = unpack$d(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var h;
        var min_ = min(r,g,b);
        var i = (r+g+b) / 3;
        var s = i > 0 ? 1 - min_/i : 0;
        if (s === 0) {
            h = NaN;
        } else {
            h = ((r-g)+(r-b)) / 2;
            h /= sqrt((r-g)*(r-g) + (r-b)*(g-b));
            h = acos(h);
            if (b > g) {
                h = TWOPI - h;
            }
            h /= TWOPI;
        }
        return [h*360,s,i];
    };

    var rgb2hsi_1 = rgb2hsi;

    var unpack$e = utils.unpack;
    var limit$1 = utils.limit;
    var TWOPI$1 = utils.TWOPI;
    var PITHIRD = utils.PITHIRD;
    var cos = Math.cos;

    /*
     * hue [0..360]
     * saturation [0..1]
     * intensity [0..1]
     */
    var hsi2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
        */
        args = unpack$e(args, 'hsi');
        var h = args[0];
        var s = args[1];
        var i = args[2];
        var r,g,b;

        if (isNaN(h)) { h = 0; }
        if (isNaN(s)) { s = 0; }
        // normalize hue
        if (h > 360) { h -= 360; }
        if (h < 0) { h += 360; }
        h /= 360;
        if (h < 1/3) {
            b = (1-s)/3;
            r = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
            g = 1 - (b+r);
        } else if (h < 2/3) {
            h -= 1/3;
            r = (1-s)/3;
            g = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
            b = 1 - (r+g);
        } else {
            h -= 2/3;
            g = (1-s)/3;
            b = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
            r = 1 - (g+b);
        }
        r = limit$1(i*r*3);
        g = limit$1(i*g*3);
        b = limit$1(i*b*3);
        return [r*255, g*255, b*255, args.length > 3 ? args[3] : 1];
    };

    var hsi2rgb_1 = hsi2rgb;

    var unpack$f = utils.unpack;
    var type$6 = utils.type;






    Color_1.prototype.hsi = function() {
        return rgb2hsi_1(this._rgb);
    };

    chroma_1.hsi = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsi']) ));
    };

    input.format.hsi = hsi2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$f(args, 'hsi');
            if (type$6(args) === 'array' && args.length === 3) {
                return 'hsi';
            }
        }
    });

    var unpack$g = utils.unpack;
    var type$7 = utils.type;






    Color_1.prototype.hsl = function() {
        return rgb2hsl_1(this._rgb);
    };

    chroma_1.hsl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsl']) ));
    };

    input.format.hsl = hsl2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$g(args, 'hsl');
            if (type$7(args) === 'array' && args.length === 3) {
                return 'hsl';
            }
        }
    });

    var unpack$h = utils.unpack;
    var min$1 = Math.min;
    var max$1 = Math.max;

    /*
     * supported arguments:
     * - rgb2hsv(r,g,b)
     * - rgb2hsv([r,g,b])
     * - rgb2hsv({r,g,b})
     */
    var rgb2hsl$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$h(args, 'rgb');
        var r = args[0];
        var g = args[1];
        var b = args[2];
        var min_ = min$1(r, g, b);
        var max_ = max$1(r, g, b);
        var delta = max_ - min_;
        var h,s,v;
        v = max_ / 255.0;
        if (max_ === 0) {
            h = Number.NaN;
            s = 0;
        } else {
            s = delta / max_;
            if (r === max_) { h = (g - b) / delta; }
            if (g === max_) { h = 2+(b - r) / delta; }
            if (b === max_) { h = 4+(r - g) / delta; }
            h *= 60;
            if (h < 0) { h += 360; }
        }
        return [h, s, v]
    };

    var rgb2hsv = rgb2hsl$1;

    var unpack$i = utils.unpack;
    var floor$1 = Math.floor;

    var hsv2rgb = function () {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$i(args, 'hsv');
        var h = args[0];
        var s = args[1];
        var v = args[2];
        var r,g,b;
        v *= 255;
        if (s === 0) {
            r = g = b = v;
        } else {
            if (h === 360) { h = 0; }
            if (h > 360) { h -= 360; }
            if (h < 0) { h += 360; }
            h /= 60;

            var i = floor$1(h);
            var f = h - i;
            var p = v * (1 - s);
            var q = v * (1 - s * f);
            var t = v * (1 - s * (1 - f));

            switch (i) {
                case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
                case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
                case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
                case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
                case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
                case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
            }
        }
        return [r,g,b,args.length > 3?args[3]:1];
    };

    var hsv2rgb_1 = hsv2rgb;

    var unpack$j = utils.unpack;
    var type$8 = utils.type;






    Color_1.prototype.hsv = function() {
        return rgb2hsv(this._rgb);
    };

    chroma_1.hsv = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsv']) ));
    };

    input.format.hsv = hsv2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$j(args, 'hsv');
            if (type$8(args) === 'array' && args.length === 3) {
                return 'hsv';
            }
        }
    });

    var labConstants = {
        // Corresponds roughly to RGB brighter/darker
        Kn: 18,

        // D65 standard referent
        Xn: 0.950470,
        Yn: 1,
        Zn: 1.088830,

        t0: 0.137931034,  // 4 / 29
        t1: 0.206896552,  // 6 / 29
        t2: 0.12841855,   // 3 * t1 * t1
        t3: 0.008856452,  // t1 * t1 * t1
    };

    var unpack$k = utils.unpack;
    var pow = Math.pow;

    var rgb2lab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$k(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2xyz(r,g,b);
        var x = ref$1[0];
        var y = ref$1[1];
        var z = ref$1[2];
        var l = 116 * y - 16;
        return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
    };

    var rgb_xyz = function (r) {
        if ((r /= 255) <= 0.04045) { return r / 12.92; }
        return pow((r + 0.055) / 1.055, 2.4);
    };

    var xyz_lab = function (t) {
        if (t > labConstants.t3) { return pow(t, 1 / 3); }
        return t / labConstants.t2 + labConstants.t0;
    };

    var rgb2xyz = function (r,g,b) {
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / labConstants.Xn);
        var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / labConstants.Yn);
        var z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / labConstants.Zn);
        return [x,y,z];
    };

    var rgb2lab_1 = rgb2lab;

    var unpack$l = utils.unpack;
    var pow$1 = Math.pow;

    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */
    var lab2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$l(args, 'lab');
        var l = args[0];
        var a = args[1];
        var b = args[2];
        var x,y,z, r,g,b_;

        y = (l + 16) / 116;
        x = isNaN(a) ? y : y + a / 500;
        z = isNaN(b) ? y : y - b / 200;

        y = labConstants.Yn * lab_xyz(y);
        x = labConstants.Xn * lab_xyz(x);
        z = labConstants.Zn * lab_xyz(z);

        r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);  // D65 -> sRGB
        g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
        b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);

        return [r,g,b_,args.length > 3 ? args[3] : 1];
    };

    var xyz_rgb = function (r) {
        return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow$1(r, 1 / 2.4) - 0.055)
    };

    var lab_xyz = function (t) {
        return t > labConstants.t1 ? t * t * t : labConstants.t2 * (t - labConstants.t0)
    };

    var lab2rgb_1 = lab2rgb;

    var unpack$m = utils.unpack;
    var type$9 = utils.type;






    Color_1.prototype.lab = function() {
        return rgb2lab_1(this._rgb);
    };

    chroma_1.lab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['lab']) ));
    };

    input.format.lab = lab2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$m(args, 'lab');
            if (type$9(args) === 'array' && args.length === 3) {
                return 'lab';
            }
        }
    });

    var unpack$n = utils.unpack;
    var RAD2DEG = utils.RAD2DEG;
    var sqrt$1 = Math.sqrt;
    var atan2 = Math.atan2;
    var round$4 = Math.round;

    var lab2lch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$n(args, 'lab');
        var l = ref[0];
        var a = ref[1];
        var b = ref[2];
        var c = sqrt$1(a * a + b * b);
        var h = (atan2(b, a) * RAD2DEG + 360) % 360;
        if (round$4(c*10000) === 0) { h = Number.NaN; }
        return [l, c, h];
    };

    var lab2lch_1 = lab2lch;

    var unpack$o = utils.unpack;



    var rgb2lch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$o(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2lab_1(r,g,b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch_1(l,a,b_);
    };

    var rgb2lch_1 = rgb2lch;

    var unpack$p = utils.unpack;
    var DEG2RAD = utils.DEG2RAD;
    var sin = Math.sin;
    var cos$1 = Math.cos;

    var lch2lab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
        These formulas were invented by David Dalrymple to obtain maximum contrast without going
        out of gamut if the parameters are in the range 0-1.

        A saturation multiplier was added by Gregor Aisch
        */
        var ref = unpack$p(args, 'lch');
        var l = ref[0];
        var c = ref[1];
        var h = ref[2];
        if (isNaN(h)) { h = 0; }
        h = h * DEG2RAD;
        return [l, cos$1(h) * c, sin(h) * c]
    };

    var lch2lab_1 = lch2lab;

    var unpack$q = utils.unpack;



    var lch2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$q(args, 'lch');
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab_1 (l,c,h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = lab2rgb_1 (L,a,b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var lch2rgb_1 = lch2rgb;

    var unpack$r = utils.unpack;


    var hcl2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var hcl = unpack$r(args, 'hcl').reverse();
        return lch2rgb_1.apply(void 0, hcl);
    };

    var hcl2rgb_1 = hcl2rgb;

    var unpack$s = utils.unpack;
    var type$a = utils.type;






    Color_1.prototype.lch = function() { return rgb2lch_1(this._rgb); };
    Color_1.prototype.hcl = function() { return rgb2lch_1(this._rgb).reverse(); };

    chroma_1.lch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['lch']) ));
    };
    chroma_1.hcl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hcl']) ));
    };

    input.format.lch = lch2rgb_1;
    input.format.hcl = hcl2rgb_1;

    ['lch','hcl'].forEach(function (m) { return input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$s(args, m);
            if (type$a(args) === 'array' && args.length === 3) {
                return m;
            }
        }
    }); });

    /**
    	X11 color names

    	http://www.w3.org/TR/css3-color/#svg-color
    */

    var w3cx11 = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflower: '#6495ed',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkgrey: '#a9a9a9',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        grey: '#808080',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        laserlemon: '#ffff54',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrod: '#fafad2',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgreen: '#90ee90',
        lightgrey: '#d3d3d3',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        maroon2: '#7f0000',
        maroon3: '#b03060',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        purple2: '#7f007f',
        purple3: '#a020f0',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32'
    };

    var w3cx11_1 = w3cx11;

    var type$b = utils.type;





    Color_1.prototype.name = function() {
        var hex = rgb2hex_1(this._rgb, 'rgb');
        for (var i = 0, list = Object.keys(w3cx11_1); i < list.length; i += 1) {
            var n = list[i];

            if (w3cx11_1[n] === hex) { return n.toLowerCase(); }
        }
        return hex;
    };

    input.format.named = function (name) {
        name = name.toLowerCase();
        if (w3cx11_1[name]) { return hex2rgb_1(w3cx11_1[name]); }
        throw new Error('unknown color name: '+name);
    };

    input.autodetect.push({
        p: 5,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$b(h) === 'string' && w3cx11_1[h.toLowerCase()]) {
                return 'named';
            }
        }
    });

    var unpack$t = utils.unpack;

    var rgb2num = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$t(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        return (r << 16) + (g << 8) + b;
    };

    var rgb2num_1 = rgb2num;

    var type$c = utils.type;

    var num2rgb = function (num) {
        if (type$c(num) == "number" && num >= 0 && num <= 0xFFFFFF) {
            var r = num >> 16;
            var g = (num >> 8) & 0xFF;
            var b = num & 0xFF;
            return [r,g,b,1];
        }
        throw new Error("unknown num color: "+num);
    };

    var num2rgb_1 = num2rgb;

    var type$d = utils.type;



    Color_1.prototype.num = function() {
        return rgb2num_1(this._rgb);
    };

    chroma_1.num = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['num']) ));
    };

    input.format.num = num2rgb_1;

    input.autodetect.push({
        p: 5,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            if (args.length === 1 && type$d(args[0]) === 'number' && args[0] >= 0 && args[0] <= 0xFFFFFF) {
                return 'num';
            }
        }
    });

    var unpack$u = utils.unpack;
    var type$e = utils.type;
    var round$5 = Math.round;

    Color_1.prototype.rgb = function(rnd) {
        if ( rnd === void 0 ) rnd=true;

        if (rnd === false) { return this._rgb.slice(0,3); }
        return this._rgb.slice(0,3).map(round$5);
    };

    Color_1.prototype.rgba = function(rnd) {
        if ( rnd === void 0 ) rnd=true;

        return this._rgb.slice(0,4).map(function (v,i) {
            return i<3 ? (rnd === false ? v : round$5(v)) : v;
        });
    };

    chroma_1.rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['rgb']) ));
    };

    input.format.rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack$u(args, 'rgba');
        if (rgba[3] === undefined) { rgba[3] = 1; }
        return rgba;
    };

    input.autodetect.push({
        p: 3,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$u(args, 'rgba');
            if (type$e(args) === 'array' && (args.length === 3 ||
                args.length === 4 && type$e(args[3]) == 'number' && args[3] >= 0 && args[3] <= 1)) {
                return 'rgb';
            }
        }
    });

    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     */

    var log = Math.log;

    var temperature2rgb = function (kelvin) {
        var temp = kelvin / 100;
        var r,g,b;
        if (temp < 66) {
            r = 255;
            g = -155.25485562709179 - 0.44596950469579133 * (g = temp-2) + 104.49216199393888 * log(g);
            b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp-10) + 115.67994401066147 * log(b);
        } else {
            r = 351.97690566805693 + 0.114206453784165 * (r = temp-55) - 40.25366309332127 * log(r);
            g = 325.4494125711974 + 0.07943456536662342 * (g = temp-50) - 28.0852963507957 * log(g);
            b = 255;
        }
        return [r,g,b,1];
    };

    var temperature2rgb_1 = temperature2rgb;

    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     **/


    var unpack$v = utils.unpack;
    var round$6 = Math.round;

    var rgb2temperature = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgb = unpack$v(args, 'rgb');
        var r = rgb[0], b = rgb[2];
        var minTemp = 1000;
        var maxTemp = 40000;
        var eps = 0.4;
        var temp;
        while (maxTemp - minTemp > eps) {
            temp = (maxTemp + minTemp) * 0.5;
            var rgb$1 = temperature2rgb_1(temp);
            if ((rgb$1[2] / rgb$1[0]) >= (b / r)) {
                maxTemp = temp;
            } else {
                minTemp = temp;
            }
        }
        return round$6(temp);
    };

    var rgb2temperature_1 = rgb2temperature;

    Color_1.prototype.temp =
    Color_1.prototype.kelvin =
    Color_1.prototype.temperature = function() {
        return rgb2temperature_1(this._rgb);
    };

    chroma_1.temp =
    chroma_1.kelvin =
    chroma_1.temperature = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['temp']) ));
    };

    input.format.temp =
    input.format.kelvin =
    input.format.temperature = temperature2rgb_1;

    var type$f = utils.type;

    Color_1.prototype.alpha = function(a, mutate) {
        if ( mutate === void 0 ) mutate=false;

        if (a !== undefined && type$f(a) === 'number') {
            if (mutate) {
                this._rgb[3] = a;
                return this;
            }
            return new Color_1([this._rgb[0], this._rgb[1], this._rgb[2], a], 'rgb');
        }
        return this._rgb[3];
    };

    Color_1.prototype.clipped = function() {
        return this._rgb._clipped || false;
    };

    Color_1.prototype.darken = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	var me = this;
    	var lab = me.lab();
    	lab[0] -= labConstants.Kn * amount;
    	return new Color_1(lab, 'lab').alpha(me.alpha(), true);
    };

    Color_1.prototype.brighten = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	return this.darken(-amount);
    };

    Color_1.prototype.darker = Color_1.prototype.darken;
    Color_1.prototype.brighter = Color_1.prototype.brighten;

    Color_1.prototype.get = function(mc) {
        var ref = mc.split('.');
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel);
            if (i > -1) { return src[i]; }
            throw new Error(("unknown channel " + channel + " in mode " + mode));
        } else {
            return src;
        }
    };

    var type$g = utils.type;
    var pow$2 = Math.pow;

    var EPS = 1e-7;
    var MAX_ITER = 20;

    Color_1.prototype.luminance = function(lum) {
        if (lum !== undefined && type$g(lum) === 'number') {
            if (lum === 0) {
                // return pure black
                return new Color_1([0,0,0,this._rgb[3]], 'rgb');
            }
            if (lum === 1) {
                // return pure white
                return new Color_1([255,255,255,this._rgb[3]], 'rgb');
            }
            // compute new color using...
            var cur_lum = this.luminance();
            var mode = 'rgb';
            var max_iter = MAX_ITER;

            var test = function (low, high) {
                var mid = low.interpolate(high, 0.5, mode);
                var lm = mid.luminance();
                if (Math.abs(lum - lm) < EPS || !max_iter--) {
                    // close enough
                    return mid;
                }
                return lm > lum ? test(low, mid) : test(mid, high);
            };

            var rgb = (cur_lum > lum ? test(new Color_1([0,0,0]), this) : test(this, new Color_1([255,255,255]))).rgb();
            return new Color_1(rgb.concat( [this._rgb[3]]));
        }
        return rgb2luminance.apply(void 0, (this._rgb).slice(0,3));
    };


    var rgb2luminance = function (r,g,b) {
        // relative luminance
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        r = luminance_x(r);
        g = luminance_x(g);
        b = luminance_x(b);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    var luminance_x = function (x) {
        x /= 255;
        return x <= 0.03928 ? x/12.92 : pow$2((x+0.055)/1.055, 2.4);
    };

    var interpolator = {};

    var type$h = utils.type;


    var mix = function (col1, col2, f) {
        if ( f === void 0 ) f=0.5;
        var rest = [], len = arguments.length - 3;
        while ( len-- > 0 ) rest[ len ] = arguments[ len + 3 ];

        var mode = rest[0] || 'lrgb';
        if (!interpolator[mode] && !rest.length) {
            // fall back to the first supported mode
            mode = Object.keys(interpolator)[0];
        }
        if (!interpolator[mode]) {
            throw new Error(("interpolation mode " + mode + " is not defined"));
        }
        if (type$h(col1) !== 'object') { col1 = new Color_1(col1); }
        if (type$h(col2) !== 'object') { col2 = new Color_1(col2); }
        return interpolator[mode](col1, col2, f)
            .alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
    };

    Color_1.prototype.mix =
    Color_1.prototype.interpolate = function(col2, f) {
    	if ( f === void 0 ) f=0.5;
    	var rest = [], len = arguments.length - 2;
    	while ( len-- > 0 ) rest[ len ] = arguments[ len + 2 ];

    	return mix.apply(void 0, [ this, col2, f ].concat( rest ));
    };

    Color_1.prototype.premultiply = function(mutate) {
    	if ( mutate === void 0 ) mutate=false;

    	var rgb = this._rgb;
    	var a = rgb[3];
    	if (mutate) {
    		this._rgb = [rgb[0]*a, rgb[1]*a, rgb[2]*a, a];
    		return this;
    	} else {
    		return new Color_1([rgb[0]*a, rgb[1]*a, rgb[2]*a, a], 'rgb');
    	}
    };

    Color_1.prototype.saturate = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	var me = this;
    	var lch = me.lch();
    	lch[1] += labConstants.Kn * amount;
    	if (lch[1] < 0) { lch[1] = 0; }
    	return new Color_1(lch, 'lch').alpha(me.alpha(), true);
    };

    Color_1.prototype.desaturate = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	return this.saturate(-amount);
    };

    var type$i = utils.type;

    Color_1.prototype.set = function(mc, value, mutate) {
        if ( mutate === void 0 ) mutate=false;

        var ref = mc.split('.');
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel);
            if (i > -1) {
                if (type$i(value) == 'string') {
                    switch(value.charAt(0)) {
                        case '+': src[i] += +value; break;
                        case '-': src[i] += +value; break;
                        case '*': src[i] *= +(value.substr(1)); break;
                        case '/': src[i] /= +(value.substr(1)); break;
                        default: src[i] = +value;
                    }
                } else if (type$i(value) === 'number') {
                    src[i] = value;
                } else {
                    throw new Error("unsupported value for Color.set");
                }
                var out = new Color_1(src, mode);
                if (mutate) {
                    this._rgb = out._rgb;
                    return this;
                }
                return out;
            }
            throw new Error(("unknown channel " + channel + " in mode " + mode));
        } else {
            return src;
        }
    };

    var rgb$1 = function (col1, col2, f) {
        var xyz0 = col1._rgb;
        var xyz1 = col2._rgb;
        return new Color_1(
            xyz0[0] + f * (xyz1[0]-xyz0[0]),
            xyz0[1] + f * (xyz1[1]-xyz0[1]),
            xyz0[2] + f * (xyz1[2]-xyz0[2]),
            'rgb'
        )
    };

    // register interpolator
    interpolator.rgb = rgb$1;

    var sqrt$2 = Math.sqrt;
    var pow$3 = Math.pow;

    var lrgb = function (col1, col2, f) {
        var ref = col1._rgb;
        var x1 = ref[0];
        var y1 = ref[1];
        var z1 = ref[2];
        var ref$1 = col2._rgb;
        var x2 = ref$1[0];
        var y2 = ref$1[1];
        var z2 = ref$1[2];
        return new Color_1(
            sqrt$2(pow$3(x1,2) * (1-f) + pow$3(x2,2) * f),
            sqrt$2(pow$3(y1,2) * (1-f) + pow$3(y2,2) * f),
            sqrt$2(pow$3(z1,2) * (1-f) + pow$3(z2,2) * f),
            'rgb'
        )
    };

    // register interpolator
    interpolator.lrgb = lrgb;

    var lab$1 = function (col1, col2, f) {
        var xyz0 = col1.lab();
        var xyz1 = col2.lab();
        return new Color_1(
            xyz0[0] + f * (xyz1[0]-xyz0[0]),
            xyz0[1] + f * (xyz1[1]-xyz0[1]),
            xyz0[2] + f * (xyz1[2]-xyz0[2]),
            'lab'
        )
    };

    // register interpolator
    interpolator.lab = lab$1;

    var _hsx = function (col1, col2, f, m) {
        var assign, assign$1;

        var xyz0, xyz1;
        if (m === 'hsl') {
            xyz0 = col1.hsl();
            xyz1 = col2.hsl();
        } else if (m === 'hsv') {
            xyz0 = col1.hsv();
            xyz1 = col2.hsv();
        } else if (m === 'hcg') {
            xyz0 = col1.hcg();
            xyz1 = col2.hcg();
        } else if (m === 'hsi') {
            xyz0 = col1.hsi();
            xyz1 = col2.hsi();
        } else if (m === 'lch' || m === 'hcl') {
            m = 'hcl';
            xyz0 = col1.hcl();
            xyz1 = col2.hcl();
        }

        var hue0, hue1, sat0, sat1, lbv0, lbv1;
        if (m.substr(0, 1) === 'h') {
            (assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2]);
            (assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2]);
        }

        var sat, hue, lbv, dh;

        if (!isNaN(hue0) && !isNaN(hue1)) {
            // both colors have hue
            if (hue1 > hue0 && hue1 - hue0 > 180) {
                dh = hue1-(hue0+360);
            } else if (hue1 < hue0 && hue0 - hue1 > 180) {
                dh = hue1+360-hue0;
            } else{
                dh = hue1 - hue0;
            }
            hue = hue0 + f * dh;
        } else if (!isNaN(hue0)) {
            hue = hue0;
            if ((lbv1 == 1 || lbv1 == 0) && m != 'hsv') { sat = sat0; }
        } else if (!isNaN(hue1)) {
            hue = hue1;
            if ((lbv0 == 1 || lbv0 == 0) && m != 'hsv') { sat = sat1; }
        } else {
            hue = Number.NaN;
        }

        if (sat === undefined) { sat = sat0 + f * (sat1 - sat0); }
        lbv = lbv0 + f * (lbv1-lbv0);
        return new Color_1([hue, sat, lbv], m);
    };

    var lch$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'lch');
    };

    // register interpolator
    interpolator.lch = lch$1;
    interpolator.hcl = lch$1;

    var num$1 = function (col1, col2, f) {
        var c1 = col1.num();
        var c2 = col2.num();
        return new Color_1(c1 + f * (c2-c1), 'num')
    };

    // register interpolator
    interpolator.num = num$1;

    var hcg$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'hcg');
    };

    // register interpolator
    interpolator.hcg = hcg$1;

    var hsi$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'hsi');
    };

    // register interpolator
    interpolator.hsi = hsi$1;

    var hsl$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'hsl');
    };

    // register interpolator
    interpolator.hsl = hsl$1;

    var hsv$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'hsv');
    };

    // register interpolator
    interpolator.hsv = hsv$1;

    var clip_rgb$2 = utils.clip_rgb;
    var pow$4 = Math.pow;
    var sqrt$3 = Math.sqrt;
    var PI$1 = Math.PI;
    var cos$2 = Math.cos;
    var sin$1 = Math.sin;
    var atan2$1 = Math.atan2;

    var average = function (colors, mode, weights) {
        if ( mode === void 0 ) mode='lrgb';
        if ( weights === void 0 ) weights=null;

        var l = colors.length;
        if (!weights) { weights = Array.from(new Array(l)).map(function () { return 1; }); }
        // normalize weights
        var k = l / weights.reduce(function(a, b) { return a + b; });
        weights.forEach(function (w,i) { weights[i] *= k; });
        // convert colors to Color objects
        colors = colors.map(function (c) { return new Color_1(c); });
        if (mode === 'lrgb') {
            return _average_lrgb(colors, weights)
        }
        var first = colors.shift();
        var xyz = first.get(mode);
        var cnt = [];
        var dx = 0;
        var dy = 0;
        // initial color
        for (var i=0; i<xyz.length; i++) {
            xyz[i] = (xyz[i] || 0) * weights[0];
            cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
            if (mode.charAt(i) === 'h' && !isNaN(xyz[i])) {
                var A = xyz[i] / 180 * PI$1;
                dx += cos$2(A) * weights[0];
                dy += sin$1(A) * weights[0];
            }
        }

        var alpha = first.alpha() * weights[0];
        colors.forEach(function (c,ci) {
            var xyz2 = c.get(mode);
            alpha += c.alpha() * weights[ci+1];
            for (var i=0; i<xyz.length; i++) {
                if (!isNaN(xyz2[i])) {
                    cnt[i] += weights[ci+1];
                    if (mode.charAt(i) === 'h') {
                        var A = xyz2[i] / 180 * PI$1;
                        dx += cos$2(A) * weights[ci+1];
                        dy += sin$1(A) * weights[ci+1];
                    } else {
                        xyz[i] += xyz2[i] * weights[ci+1];
                    }
                }
            }
        });

        for (var i$1=0; i$1<xyz.length; i$1++) {
            if (mode.charAt(i$1) === 'h') {
                var A$1 = atan2$1(dy / cnt[i$1], dx / cnt[i$1]) / PI$1 * 180;
                while (A$1 < 0) { A$1 += 360; }
                while (A$1 >= 360) { A$1 -= 360; }
                xyz[i$1] = A$1;
            } else {
                xyz[i$1] = xyz[i$1]/cnt[i$1];
            }
        }
        alpha /= l;
        return (new Color_1(xyz, mode)).alpha(alpha > 0.99999 ? 1 : alpha, true);
    };


    var _average_lrgb = function (colors, weights) {
        var l = colors.length;
        var xyz = [0,0,0,0];
        for (var i=0; i < colors.length; i++) {
            var col = colors[i];
            var f = weights[i] / l;
            var rgb = col._rgb;
            xyz[0] += pow$4(rgb[0],2) * f;
            xyz[1] += pow$4(rgb[1],2) * f;
            xyz[2] += pow$4(rgb[2],2) * f;
            xyz[3] += rgb[3] * f;
        }
        xyz[0] = sqrt$3(xyz[0]);
        xyz[1] = sqrt$3(xyz[1]);
        xyz[2] = sqrt$3(xyz[2]);
        if (xyz[3] > 0.9999999) { xyz[3] = 1; }
        return new Color_1(clip_rgb$2(xyz));
    };

    // minimal multi-purpose interface

    // @requires utils color analyze


    var type$j = utils.type;

    var pow$5 = Math.pow;

    var scale = function(colors) {

        // constructor
        var _mode = 'rgb';
        var _nacol = chroma_1('#ccc');
        var _spread = 0;
        // const _fixed = false;
        var _domain = [0, 1];
        var _pos = [];
        var _padding = [0,0];
        var _classes = false;
        var _colors = [];
        var _out = false;
        var _min = 0;
        var _max = 1;
        var _correctLightness = false;
        var _colorCache = {};
        var _useCache = true;
        var _gamma = 1;

        // private methods

        var setColors = function(colors) {
            colors = colors || ['#fff', '#000'];
            if (colors && type$j(colors) === 'string' && chroma_1.brewer &&
                chroma_1.brewer[colors.toLowerCase()]) {
                colors = chroma_1.brewer[colors.toLowerCase()];
            }
            if (type$j(colors) === 'array') {
                // handle single color
                if (colors.length === 1) {
                    colors = [colors[0], colors[0]];
                }
                // make a copy of the colors
                colors = colors.slice(0);
                // convert to chroma classes
                for (var c=0; c<colors.length; c++) {
                    colors[c] = chroma_1(colors[c]);
                }
                // auto-fill color position
                _pos.length = 0;
                for (var c$1=0; c$1<colors.length; c$1++) {
                    _pos.push(c$1/(colors.length-1));
                }
            }
            resetCache();
            return _colors = colors;
        };

        var getClass = function(value) {
            if (_classes != null) {
                var n = _classes.length-1;
                var i = 0;
                while (i < n && value >= _classes[i]) {
                    i++;
                }
                return i-1;
            }
            return 0;
        };

        var tMapLightness = function (t) { return t; };
        var tMapDomain = function (t) { return t; };

        // const classifyValue = function(value) {
        //     let val = value;
        //     if (_classes.length > 2) {
        //         const n = _classes.length-1;
        //         const i = getClass(value);
        //         const minc = _classes[0] + ((_classes[1]-_classes[0]) * (0 + (_spread * 0.5)));  // center of 1st class
        //         const maxc = _classes[n-1] + ((_classes[n]-_classes[n-1]) * (1 - (_spread * 0.5)));  // center of last class
        //         val = _min + ((((_classes[i] + ((_classes[i+1] - _classes[i]) * 0.5)) - minc) / (maxc-minc)) * (_max - _min));
        //     }
        //     return val;
        // };

        var getColor = function(val, bypassMap) {
            var col, t;
            if (bypassMap == null) { bypassMap = false; }
            if (isNaN(val) || (val === null)) { return _nacol; }
            if (!bypassMap) {
                if (_classes && (_classes.length > 2)) {
                    // find the class
                    var c = getClass(val);
                    t = c / (_classes.length-2);
                } else if (_max !== _min) {
                    // just interpolate between min/max
                    t = (val - _min) / (_max - _min);
                } else {
                    t = 1;
                }
            } else {
                t = val;
            }

            // domain map
            t = tMapDomain(t);

            if (!bypassMap) {
                t = tMapLightness(t);  // lightness correction
            }

            if (_gamma !== 1) { t = pow$5(t, _gamma); }

            t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));

            t = Math.min(1, Math.max(0, t));

            var k = Math.floor(t * 10000);

            if (_useCache && _colorCache[k]) {
                col = _colorCache[k];
            } else {
                if (type$j(_colors) === 'array') {
                    //for i in [0.._pos.length-1]
                    for (var i=0; i<_pos.length; i++) {
                        var p = _pos[i];
                        if (t <= p) {
                            col = _colors[i];
                            break;
                        }
                        if ((t >= p) && (i === (_pos.length-1))) {
                            col = _colors[i];
                            break;
                        }
                        if (t > p && t < _pos[i+1]) {
                            t = (t-p)/(_pos[i+1]-p);
                            col = chroma_1.interpolate(_colors[i], _colors[i+1], t, _mode);
                            break;
                        }
                    }
                } else if (type$j(_colors) === 'function') {
                    col = _colors(t);
                }
                if (_useCache) { _colorCache[k] = col; }
            }
            return col;
        };

        var resetCache = function () { return _colorCache = {}; };

        setColors(colors);

        // public interface

        var f = function(v) {
            var c = chroma_1(getColor(v));
            if (_out && c[_out]) { return c[_out](); } else { return c; }
        };

        f.classes = function(classes) {
            if (classes != null) {
                if (type$j(classes) === 'array') {
                    _classes = classes;
                    _domain = [classes[0], classes[classes.length-1]];
                } else {
                    var d = chroma_1.analyze(_domain);
                    if (classes === 0) {
                        _classes = [d.min, d.max];
                    } else {
                        _classes = chroma_1.limits(d, 'e', classes);
                    }
                }
                return f;
            }
            return _classes;
        };


        f.domain = function(domain) {
            if (!arguments.length) {
                return _domain;
            }
            _min = domain[0];
            _max = domain[domain.length-1];
            _pos = [];
            var k = _colors.length;
            if ((domain.length === k) && (_min !== _max)) {
                // update positions
                for (var i = 0, list = Array.from(domain); i < list.length; i += 1) {
                    var d = list[i];

                  _pos.push((d-_min) / (_max-_min));
                }
            } else {
                for (var c=0; c<k; c++) {
                    _pos.push(c/(k-1));
                }
                if (domain.length > 2) {
                    // set domain map
                    var tOut = domain.map(function (d,i) { return i/(domain.length-1); });
                    var tBreaks = domain.map(function (d) { return (d - _min) / (_max - _min); });
                    if (!tBreaks.every(function (val, i) { return tOut[i] === val; })) {
                        tMapDomain = function (t) {
                            if (t <= 0 || t >= 1) { return t; }
                            var i = 0;
                            while (t >= tBreaks[i+1]) { i++; }
                            var f = (t - tBreaks[i]) / (tBreaks[i+1] - tBreaks[i]);
                            var out = tOut[i] + f * (tOut[i+1] - tOut[i]);
                            return out;
                        };
                    }

                }
            }
            _domain = [_min, _max];
            return f;
        };

        f.mode = function(_m) {
            if (!arguments.length) {
                return _mode;
            }
            _mode = _m;
            resetCache();
            return f;
        };

        f.range = function(colors, _pos) {
            setColors(colors, _pos);
            return f;
        };

        f.out = function(_o) {
            _out = _o;
            return f;
        };

        f.spread = function(val) {
            if (!arguments.length) {
                return _spread;
            }
            _spread = val;
            return f;
        };

        f.correctLightness = function(v) {
            if (v == null) { v = true; }
            _correctLightness = v;
            resetCache();
            if (_correctLightness) {
                tMapLightness = function(t) {
                    var L0 = getColor(0, true).lab()[0];
                    var L1 = getColor(1, true).lab()[0];
                    var pol = L0 > L1;
                    var L_actual = getColor(t, true).lab()[0];
                    var L_ideal = L0 + ((L1 - L0) * t);
                    var L_diff = L_actual - L_ideal;
                    var t0 = 0;
                    var t1 = 1;
                    var max_iter = 20;
                    while ((Math.abs(L_diff) > 1e-2) && (max_iter-- > 0)) {
                        (function() {
                            if (pol) { L_diff *= -1; }
                            if (L_diff < 0) {
                                t0 = t;
                                t += (t1 - t) * 0.5;
                            } else {
                                t1 = t;
                                t += (t0 - t) * 0.5;
                            }
                            L_actual = getColor(t, true).lab()[0];
                            return L_diff = L_actual - L_ideal;
                        })();
                    }
                    return t;
                };
            } else {
                tMapLightness = function (t) { return t; };
            }
            return f;
        };

        f.padding = function(p) {
            if (p != null) {
                if (type$j(p) === 'number') {
                    p = [p,p];
                }
                _padding = p;
                return f;
            } else {
                return _padding;
            }
        };

        f.colors = function(numColors, out) {
            // If no arguments are given, return the original colors that were provided
            if (arguments.length < 2) { out = 'hex'; }
            var result = [];

            if (arguments.length === 0) {
                result = _colors.slice(0);

            } else if (numColors === 1) {
                result = [f(0.5)];

            } else if (numColors > 1) {
                var dm = _domain[0];
                var dd = _domain[1] - dm;
                result = __range__(0, numColors, false).map(function (i) { return f( dm + ((i/(numColors-1)) * dd) ); });

            } else { // returns all colors based on the defined classes
                colors = [];
                var samples = [];
                if (_classes && (_classes.length > 2)) {
                    for (var i = 1, end = _classes.length, asc = 1 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
                        samples.push((_classes[i-1]+_classes[i])*0.5);
                    }
                } else {
                    samples = _domain;
                }
                result = samples.map(function (v) { return f(v); });
            }

            if (chroma_1[out]) {
                result = result.map(function (c) { return c[out](); });
            }
            return result;
        };

        f.cache = function(c) {
            if (c != null) {
                _useCache = c;
                return f;
            } else {
                return _useCache;
            }
        };

        f.gamma = function(g) {
            if (g != null) {
                _gamma = g;
                return f;
            } else {
                return _gamma;
            }
        };

        f.nodata = function(d) {
            if (d != null) {
                _nacol = chroma_1(d);
                return f;
            } else {
                return _nacol;
            }
        };

        return f;
    };

    function __range__(left, right, inclusive) {
      var range = [];
      var ascending = left < right;
      var end = !inclusive ? right : ascending ? right + 1 : right - 1;
      for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
        range.push(i);
      }
      return range;
    }

    //
    // interpolates between a set of colors uzing a bezier spline
    //

    // @requires utils lab




    var bezier = function(colors) {
        var assign, assign$1, assign$2;

        var I, lab0, lab1, lab2;
        colors = colors.map(function (c) { return new Color_1(c); });
        if (colors.length === 2) {
            // linear interpolation
            (assign = colors.map(function (c) { return c.lab(); }), lab0 = assign[0], lab1 = assign[1]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return lab0[i] + (t * (lab1[i] - lab0[i])); }));
                return new Color_1(lab, 'lab');
            };
        } else if (colors.length === 3) {
            // quadratic bezier interpolation
            (assign$1 = colors.map(function (c) { return c.lab(); }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t) * lab0[i]) + (2 * (1-t) * t * lab1[i]) + (t * t * lab2[i]); }));
                return new Color_1(lab, 'lab');
            };
        } else if (colors.length === 4) {
            // cubic bezier interpolation
            var lab3;
            (assign$2 = colors.map(function (c) { return c.lab(); }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t)*(1-t) * lab0[i]) + (3 * (1-t) * (1-t) * t * lab1[i]) + (3 * (1-t) * t * t * lab2[i]) + (t*t*t * lab3[i]); }));
                return new Color_1(lab, 'lab');
            };
        } else if (colors.length === 5) {
            var I0 = bezier(colors.slice(0, 3));
            var I1 = bezier(colors.slice(2, 5));
            I = function(t) {
                if (t < 0.5) {
                    return I0(t*2);
                } else {
                    return I1((t-0.5)*2);
                }
            };
        }
        return I;
    };

    var bezier_1 = function (colors) {
        var f = bezier(colors);
        f.scale = function () { return scale(f); };
        return f;
    };

    /*
     * interpolates between a set of colors uzing a bezier spline
     * blend mode formulas taken from http://www.venture-ware.com/kevin/coding/lets-learn-math-photoshop-blend-modes/
     */




    var blend = function (bottom, top, mode) {
        if (!blend[mode]) {
            throw new Error('unknown blend mode ' + mode);
        }
        return blend[mode](bottom, top);
    };

    var blend_f = function (f) { return function (bottom,top) {
            var c0 = chroma_1(top).rgb();
            var c1 = chroma_1(bottom).rgb();
            return chroma_1.rgb(f(c0, c1));
        }; };

    var each = function (f) { return function (c0, c1) {
            var out = [];
            out[0] = f(c0[0], c1[0]);
            out[1] = f(c0[1], c1[1]);
            out[2] = f(c0[2], c1[2]);
            return out;
        }; };

    var normal = function (a) { return a; };
    var multiply = function (a,b) { return a * b / 255; };
    var darken$1 = function (a,b) { return a > b ? b : a; };
    var lighten = function (a,b) { return a > b ? a : b; };
    var screen = function (a,b) { return 255 * (1 - (1-a/255) * (1-b/255)); };
    var overlay = function (a,b) { return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255 ) * ( 1 - b / 255 )); };
    var burn = function (a,b) { return 255 * (1 - (1 - b / 255) / (a/255)); };
    var dodge = function (a,b) {
        if (a === 255) { return 255; }
        a = 255 * (b / 255) / (1 - a / 255);
        return a > 255 ? 255 : a
    };

    // # add = (a,b) ->
    // #     if (a + b > 255) then 255 else a + b

    blend.normal = blend_f(each(normal));
    blend.multiply = blend_f(each(multiply));
    blend.screen = blend_f(each(screen));
    blend.overlay = blend_f(each(overlay));
    blend.darken = blend_f(each(darken$1));
    blend.lighten = blend_f(each(lighten));
    blend.dodge = blend_f(each(dodge));
    blend.burn = blend_f(each(burn));
    // blend.add = blend_f(each(add));

    var blend_1 = blend;

    // cubehelix interpolation
    // based on D.A. Green "A colour scheme for the display of astronomical intensity images"
    // http://astron-soc.in/bulletin/11June/289392011.pdf

    var type$k = utils.type;
    var clip_rgb$3 = utils.clip_rgb;
    var TWOPI$2 = utils.TWOPI;
    var pow$6 = Math.pow;
    var sin$2 = Math.sin;
    var cos$3 = Math.cos;


    var cubehelix = function(start, rotations, hue, gamma, lightness) {
        if ( start === void 0 ) start=300;
        if ( rotations === void 0 ) rotations=-1.5;
        if ( hue === void 0 ) hue=1;
        if ( gamma === void 0 ) gamma=1;
        if ( lightness === void 0 ) lightness=[0,1];

        var dh = 0, dl;
        if (type$k(lightness) === 'array') {
            dl = lightness[1] - lightness[0];
        } else {
            dl = 0;
            lightness = [lightness, lightness];
        }

        var f = function(fract) {
            var a = TWOPI$2 * (((start+120)/360) + (rotations * fract));
            var l = pow$6(lightness[0] + (dl * fract), gamma);
            var h = dh !== 0 ? hue[0] + (fract * dh) : hue;
            var amp = (h * l * (1-l)) / 2;
            var cos_a = cos$3(a);
            var sin_a = sin$2(a);
            var r = l + (amp * ((-0.14861 * cos_a) + (1.78277* sin_a)));
            var g = l + (amp * ((-0.29227 * cos_a) - (0.90649* sin_a)));
            var b = l + (amp * (+1.97294 * cos_a));
            return chroma_1(clip_rgb$3([r*255,g*255,b*255,1]));
        };

        f.start = function(s) {
            if ((s == null)) { return start; }
            start = s;
            return f;
        };

        f.rotations = function(r) {
            if ((r == null)) { return rotations; }
            rotations = r;
            return f;
        };

        f.gamma = function(g) {
            if ((g == null)) { return gamma; }
            gamma = g;
            return f;
        };

        f.hue = function(h) {
            if ((h == null)) { return hue; }
            hue = h;
            if (type$k(hue) === 'array') {
                dh = hue[1] - hue[0];
                if (dh === 0) { hue = hue[1]; }
            } else {
                dh = 0;
            }
            return f;
        };

        f.lightness = function(h) {
            if ((h == null)) { return lightness; }
            if (type$k(h) === 'array') {
                lightness = h;
                dl = h[1] - h[0];
            } else {
                lightness = [h,h];
                dl = 0;
            }
            return f;
        };

        f.scale = function () { return chroma_1.scale(f); };

        f.hue(hue);

        return f;
    };

    var digits = '0123456789abcdef';

    var floor$2 = Math.floor;
    var random = Math.random;

    var random_1 = function () {
        var code = '#';
        for (var i=0; i<6; i++) {
            code += digits.charAt(floor$2(random() * 16));
        }
        return new Color_1(code, 'hex');
    };

    var log$1 = Math.log;
    var pow$7 = Math.pow;
    var floor$3 = Math.floor;
    var abs = Math.abs;


    var analyze = function (data, key) {
        if ( key === void 0 ) key=null;

        var r = {
            min: Number.MAX_VALUE,
            max: Number.MAX_VALUE*-1,
            sum: 0,
            values: [],
            count: 0
        };
        if (type(data) === 'object') {
            data = Object.values(data);
        }
        data.forEach(function (val) {
            if (key && type(val) === 'object') { val = val[key]; }
            if (val !== undefined && val !== null && !isNaN(val)) {
                r.values.push(val);
                r.sum += val;
                if (val < r.min) { r.min = val; }
                if (val > r.max) { r.max = val; }
                r.count += 1;
            }
        });

        r.domain = [r.min, r.max];

        r.limits = function (mode, num) { return limits(r, mode, num); };

        return r;
    };


    var limits = function (data, mode, num) {
        if ( mode === void 0 ) mode='equal';
        if ( num === void 0 ) num=7;

        if (type(data) == 'array') {
            data = analyze(data);
        }
        var min = data.min;
        var max = data.max;
        var values = data.values.sort(function (a,b) { return a-b; });

        if (num === 1) { return [min,max]; }

        var limits = [];

        if (mode.substr(0,1) === 'c') { // continuous
            limits.push(min);
            limits.push(max);
        }

        if (mode.substr(0,1) === 'e') { // equal interval
            limits.push(min);
            for (var i=1; i<num; i++) {
                limits.push(min+((i/num)*(max-min)));
            }
            limits.push(max);
        }

        else if (mode.substr(0,1) === 'l') { // log scale
            if (min <= 0) {
                throw new Error('Logarithmic scales are only possible for values > 0');
            }
            var min_log = Math.LOG10E * log$1(min);
            var max_log = Math.LOG10E * log$1(max);
            limits.push(min);
            for (var i$1=1; i$1<num; i$1++) {
                limits.push(pow$7(10, min_log + ((i$1/num) * (max_log - min_log))));
            }
            limits.push(max);
        }

        else if (mode.substr(0,1) === 'q') { // quantile scale
            limits.push(min);
            for (var i$2=1; i$2<num; i$2++) {
                var p = ((values.length-1) * i$2)/num;
                var pb = floor$3(p);
                if (pb === p) {
                    limits.push(values[pb]);
                } else { // p > pb
                    var pr = p - pb;
                    limits.push((values[pb]*(1-pr)) + (values[pb+1]*pr));
                }
            }
            limits.push(max);

        }

        else if (mode.substr(0,1) === 'k') { // k-means clustering
            /*
            implementation based on
            http://code.google.com/p/figue/source/browse/trunk/figue.js#336
            simplified for 1-d input values
            */
            var cluster;
            var n = values.length;
            var assignments = new Array(n);
            var clusterSizes = new Array(num);
            var repeat = true;
            var nb_iters = 0;
            var centroids = null;

            // get seed values
            centroids = [];
            centroids.push(min);
            for (var i$3=1; i$3<num; i$3++) {
                centroids.push(min + ((i$3/num) * (max-min)));
            }
            centroids.push(max);

            while (repeat) {
                // assignment step
                for (var j=0; j<num; j++) {
                    clusterSizes[j] = 0;
                }
                for (var i$4=0; i$4<n; i$4++) {
                    var value = values[i$4];
                    var mindist = Number.MAX_VALUE;
                    var best = (void 0);
                    for (var j$1=0; j$1<num; j$1++) {
                        var dist = abs(centroids[j$1]-value);
                        if (dist < mindist) {
                            mindist = dist;
                            best = j$1;
                        }
                        clusterSizes[best]++;
                        assignments[i$4] = best;
                    }
                }

                // update centroids step
                var newCentroids = new Array(num);
                for (var j$2=0; j$2<num; j$2++) {
                    newCentroids[j$2] = null;
                }
                for (var i$5=0; i$5<n; i$5++) {
                    cluster = assignments[i$5];
                    if (newCentroids[cluster] === null) {
                        newCentroids[cluster] = values[i$5];
                    } else {
                        newCentroids[cluster] += values[i$5];
                    }
                }
                for (var j$3=0; j$3<num; j$3++) {
                    newCentroids[j$3] *= 1/clusterSizes[j$3];
                }

                // check convergence
                repeat = false;
                for (var j$4=0; j$4<num; j$4++) {
                    if (newCentroids[j$4] !== centroids[j$4]) {
                        repeat = true;
                        break;
                    }
                }

                centroids = newCentroids;
                nb_iters++;

                if (nb_iters > 200) {
                    repeat = false;
                }
            }

            // finished k-means clustering
            // the next part is borrowed from gabrielflor.it
            var kClusters = {};
            for (var j$5=0; j$5<num; j$5++) {
                kClusters[j$5] = [];
            }
            for (var i$6=0; i$6<n; i$6++) {
                cluster = assignments[i$6];
                kClusters[cluster].push(values[i$6]);
            }
            var tmpKMeansBreaks = [];
            for (var j$6=0; j$6<num; j$6++) {
                tmpKMeansBreaks.push(kClusters[j$6][0]);
                tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length-1]);
            }
            tmpKMeansBreaks = tmpKMeansBreaks.sort(function (a,b){ return a-b; });
            limits.push(tmpKMeansBreaks[0]);
            for (var i$7=1; i$7 < tmpKMeansBreaks.length; i$7+= 2) {
                var v = tmpKMeansBreaks[i$7];
                if (!isNaN(v) && (limits.indexOf(v) === -1)) {
                    limits.push(v);
                }
            }
        }
        return limits;
    };

    var analyze_1 = {analyze: analyze, limits: limits};

    var contrast = function (a, b) {
        // WCAG contrast ratio
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
        a = new Color_1(a);
        b = new Color_1(b);
        var l1 = a.luminance();
        var l2 = b.luminance();
        return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    };

    var sqrt$4 = Math.sqrt;
    var atan2$2 = Math.atan2;
    var abs$1 = Math.abs;
    var cos$4 = Math.cos;
    var PI$2 = Math.PI;

    var deltaE = function(a, b, L, C) {
        if ( L === void 0 ) L=1;
        if ( C === void 0 ) C=1;

        // Delta E (CMC)
        // see http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CMC.html
        a = new Color_1(a);
        b = new Color_1(b);
        var ref = Array.from(a.lab());
        var L1 = ref[0];
        var a1 = ref[1];
        var b1 = ref[2];
        var ref$1 = Array.from(b.lab());
        var L2 = ref$1[0];
        var a2 = ref$1[1];
        var b2 = ref$1[2];
        var c1 = sqrt$4((a1 * a1) + (b1 * b1));
        var c2 = sqrt$4((a2 * a2) + (b2 * b2));
        var sl = L1 < 16.0 ? 0.511 : (0.040975 * L1) / (1.0 + (0.01765 * L1));
        var sc = ((0.0638 * c1) / (1.0 + (0.0131 * c1))) + 0.638;
        var h1 = c1 < 0.000001 ? 0.0 : (atan2$2(b1, a1) * 180.0) / PI$2;
        while (h1 < 0) { h1 += 360; }
        while (h1 >= 360) { h1 -= 360; }
        var t = (h1 >= 164.0) && (h1 <= 345.0) ? (0.56 + abs$1(0.2 * cos$4((PI$2 * (h1 + 168.0)) / 180.0))) : (0.36 + abs$1(0.4 * cos$4((PI$2 * (h1 + 35.0)) / 180.0)));
        var c4 = c1 * c1 * c1 * c1;
        var f = sqrt$4(c4 / (c4 + 1900.0));
        var sh = sc * (((f * t) + 1.0) - f);
        var delL = L1 - L2;
        var delC = c1 - c2;
        var delA = a1 - a2;
        var delB = b1 - b2;
        var dH2 = ((delA * delA) + (delB * delB)) - (delC * delC);
        var v1 = delL / (L * sl);
        var v2 = delC / (C * sc);
        var v3 = sh;
        return sqrt$4((v1 * v1) + (v2 * v2) + (dH2 / (v3 * v3)));
    };

    // simple Euclidean distance
    var distance = function(a, b, mode) {
        if ( mode === void 0 ) mode='lab';

        // Delta E (CIE 1976)
        // see http://www.brucelindbloom.com/index.html?Equations.html
        a = new Color_1(a);
        b = new Color_1(b);
        var l1 = a.get(mode);
        var l2 = b.get(mode);
        var sum_sq = 0;
        for (var i in l1) {
            var d = (l1[i] || 0) - (l2[i] || 0);
            sum_sq += d*d;
        }
        return Math.sqrt(sum_sq);
    };

    var valid = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        try {
            new (Function.prototype.bind.apply( Color_1, [ null ].concat( args) ));
            return true;
        } catch (e) {
            return false;
        }
    };

    // some pre-defined color scales:




    var scales = {
    	cool: function cool() { return scale([chroma_1.hsl(180,1,.9), chroma_1.hsl(250,.7,.4)]) },
    	hot: function hot() { return scale(['#000','#f00','#ff0','#fff'], [0,.25,.75,1]).mode('rgb') }
    };

    /**
        ColorBrewer colors for chroma.js

        Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The
        Pennsylvania State University.

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software distributed
        under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
        CONDITIONS OF ANY KIND, either express or implied. See the License for the
        specific language governing permissions and limitations under the License.
    */

    var colorbrewer = {
        // sequential
        OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
        PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
        BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
        Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
        BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
        YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
        YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
        Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
        RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
        Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
        YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
        Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
        GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
        Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
        YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
        PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
        Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
        PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
        Viridis: ['#440154', '#482777', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825'],

        // diverging

        Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
        RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
        RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
        PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
        PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
        RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
        BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
        RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
        PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],

        // qualitative

        Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
        Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
        Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
        Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
        Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
        Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
        Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
        Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2'],
    };

    // add lowercase aliases for case-insensitive matches
    for (var i$1 = 0, list$1 = Object.keys(colorbrewer); i$1 < list$1.length; i$1 += 1) {
        var key = list$1[i$1];

        colorbrewer[key.toLowerCase()] = colorbrewer[key];
    }

    var colorbrewer_1 = colorbrewer;

    // feel free to comment out anything to rollup
    // a smaller chroma.js built

    // io --> convert colors















    // operators --> modify existing Colors










    // interpolators










    // generators -- > create new colors
    chroma_1.average = average;
    chroma_1.bezier = bezier_1;
    chroma_1.blend = blend_1;
    chroma_1.cubehelix = cubehelix;
    chroma_1.mix = chroma_1.interpolate = mix;
    chroma_1.random = random_1;
    chroma_1.scale = scale;

    // other utility methods
    chroma_1.analyze = analyze_1.analyze;
    chroma_1.contrast = contrast;
    chroma_1.deltaE = deltaE;
    chroma_1.distance = distance;
    chroma_1.limits = analyze_1.limits;
    chroma_1.valid = valid;

    // scale
    chroma_1.scales = scales;

    // colors
    chroma_1.colors = w3cx11_1;
    chroma_1.brewer = colorbrewer_1;

    var chroma_js = chroma_1;

    return chroma_js;

})));

},{}],11:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],12:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":11,"timers":12}]},{},[4]);
