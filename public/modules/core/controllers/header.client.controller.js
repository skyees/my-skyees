'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus','Webs','$timeout','$http','$splash','$rootScope','$window',
	function($scope, Authentication, Menus,Webs,$timeout,$http,$splash, $rootScope,$window) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

        $rootScope.foo=[];
        $scope.searchfoo=[];
        $scope.new=[{}];
        $timeout(function(){
         $scope.new = Webs.query();
            $scope.$apply();
        });

        var raj = $scope.foo;


         $scope.half=function(){

          return $rootScope.foo;

         };



        $scope.searchs = function (item){

            if ($rootScope.foo.indexOf(item.detail1+'('+item.detail2+')')!==-1)  {

                return true;
            }
            return false;
        };

        $rootScope.check = function() {
            if ($rootScope.foo.length > 1) {
                return true;
            }
            else {
                return false;
            }
            $rootScope.$apply();
        };


        $rootScope.openSplash = function () {
            $splash.open({
                title:'RajKiran',
                new: $scope.new,
                foo:$scope.foo,
                half:$scope.half,
                searchfoo:$scope.searchfoo,
                searchs:$scope.searchs,
                gridOpts:$scope.gridOpts,
                message: 'This sure good and fine modal, isnt it?'
            });
        };
        $scope.gridOpts = {
            columns:2,
            margins: [5,5],
            defaultSizeX:1,
            defaultSizeY:1,
            colWidth:318,
            rowHeight:516,
            outerMargin: false,
            pushing: true,
            floating: true,
            draggable: {
                enabled: true
            },
            resizable: {
                enabled: true,
                handles: 'n, e, s, w, se, sw'

            }

        };

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});



	}
]);
