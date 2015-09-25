'use strict';

angular.module('webs').directive('list',['$timeout','$location','$rootScope','$window',
	function($timeout,$location,$rootScope,$window) {
		return {
            restrict: 'AE',
            replace: true,
            transclude:true,
            link:function(scope, element,attrs) {
                $timeout(function(){
                scope.$watch('cartdetails', function () {
                    $timeout(function(){
                    angular.element('.raj').slick({
                                dots: true,
                                infinite:false,
                                slidesToShow: 5,
                                slidesToScroll:5,
                                autoplay: true,
                                dotsClass:'paginations'
                    });
                    },100);
                    var $current;

                    scope.hoverItem = function(i,h,href) {

                        $timeout(function(){

                            var newHref = ('/'+i+'/'+h+'/'+href).toString();
                            scope.$apply(function() {  $window.location = newHref;});

                        },100);
                       };
                    scope.$watch('foo',function(){
                        angular.element('.raj').slick('unslick');
                        scope.$apply();
                    });

                    scope.hoverItems = function(href) {

                        $timeout(function(){

                            var newH = (href).toString();
                            scope.$apply(function() {
                                $window.open('http://'+newH,'_blank');
                               });
                        },100);
                    };

                  });
                });
            },
            templateUrl:'../modules/webs/views/lists.client.view.html'

		};
	}]
);
