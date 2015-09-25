'use strict';

angular.module('core').directive('slider', function($timeout) {
    return {
        restrict: 'AE',
        transclude: false,
        link: function(scope, elem, attrs) {
            var elem1= elem.find('#box-1');

            var switchIndicator = function ($c, $n, currIndex, nextIndex) {
                // kills the timeline by setting it's width to zero
                angular.element('#time-indicator').stop().css('width', 0);
                // Highlights the next slide pagination control
                angular.element('.goto-slide').removeClass('current').eq(nextIndex).addClass('current');
            };

            function getOffsetSum(elem1) {
                var top=0, left=0;

                while(elem1) {
                    top = top + parseInt(elem.offsetTop);
                    elem1 = elem1.offset;
                }

                return {top: top, left: left};
            }

            function getOffsetRect(elem1) {
                // (1)
                var box = elem1.getBoundingClientRect();

                var body = document.body;
                var docElem = elem1.find('#box-1');

                // (2)
                var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
                var scrollLeft = window.pagexOffset;

                // (3)
                var clientTop = docElem.clientTop || body.clientTop || 0;
                var clientLeft = docElem.clientLeft || body.clientLeft || 0;

                // (4)
                var top  = box.top +  scrollTop - clientTop;


                return { top: Math.round(top)};
            }

            $timeout(function() {
                elem1.boxSlider({
                        'speed': 1200,
                        'autoScroll': true,
                         'timeout': 5000,
                        onbefore: function ($c, $n, currIndex, nextIndex) {
                            // kills the timeline by setting it's width to zero
                            angular.element('#time-indicator').stop().css('width', 15);
                            // Highlights the next slide pagination control
                            angular.element('.goto-slide').removeClass('current').eq(nextIndex).addClass('current');

                        },
                        onafter: function () {
                            // start the timeline animation
                            angular.element('#time-indicator').animate({width: '75%'},5000);
                        }
                    }

                );



                scope.prev = function (event,elem1) {


                    event.preventDefault();
                    angular.element('#box-1').boxSlider('prev');



                    angular.element('#box-1').getOffsetRect(elem1);

                    return false;
                };

                scope.next = function (event,elem1) {

                    event.preventDefault();

                    angular.element('#box-1').boxSlider('next');


                    angular.element('#box-1').getOffsetRect(elem1);

                    return false;

                };
                scope.do = function (image,event,elem1) {
                    // Paginate the slides using the indicator controls
                    angular.element('#box-1').boxSlider('showSlide', image);
                    event.preventDefault();
                    getOffsetRect(elem1);
                    scope.$apply();

                };

            });

        },
        templateUrl:'../modules/core/views/slider.client.view.html'
    };
});
