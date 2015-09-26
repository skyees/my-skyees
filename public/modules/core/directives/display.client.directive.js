'use strict';

angular.module('core').directive('display',
	function($compile,$modal,Mines,$timeout){
		return {
			templateUrl:'../modules/core/views/display.client.view.html',
            restrict: 'AE',
            transclude: true,
			link: function ($scope, element, attrs) {
				// Display directive logic
				// ...



                $scope.$watch('mydirective', function(item){

                    $timeout(function(){
                        var el = $compile('<'+item[$scope.index]+'/>')($scope);
                        element.append(el);
                    },1000);

                });


                $scope.$watch('item.color', function(item){

                    var mycolor = Mines.get({mineId:$scope.myid});

                    mycolor.position=$scope.positions;

                    mycolor.$update({mineId:$scope.myid},function(){

                    }, function(errorResponse) {
                        $scope.error = errorResponse.data.message;
                    });
                });

                $scope.onDrop = function (data,evt) {

                     if(('directive'!==data.name)&&($scope.mydirective[$scope.index]!==data.name)) {
                         $scope.mydirective[$scope.index]=data.name;
                         $scope.$apply();
                         $scope.directs = $scope.mydirective;

                         var myunit= Mines.get({mineId:$scope.myid});

                         myunit.directive=$scope.mydirective;

                        myunit.$update({mineId:$scope.myid},function(){

                     }, function(errorResponse) {
                     $scope.error = errorResponse.data.message;
                           });
                   }
                    $scope.$apply();
                };
                $scope.animationsEnabled = true;

                $scope.open = function (size,sitems) {
                        sitems.directive=$scope.direct;
                        $modal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl:'../modules/core/views/modal.client.view.html',
                        controller:'ModalController',
                        size: size,
                        resolve: {
                            items: function () {
                                return sitems;
                            }
                        }
                    });
                };

            }
		};
	}
);
