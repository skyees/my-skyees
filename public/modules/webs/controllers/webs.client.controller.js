'use strict';

// Webs controller
angular.module('webs').controller('WebsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Webs','$http','$window','$rootScope','$timeout',
	function($scope, $stateParams, $location, Authentication, Webs,$http,$window,$timeout) {

        $scope.images = [];
        $scope.foo=[];
        $scope.rrclass=[];
        $scope.items = [
            {
                name: 'Item 1',
                col: 1,
                row: 1,
                sizeX: 3,
                sizeY: 4
            }
        ];
        $scope.i=0;
        $scope.itemss = [
            {
                name: 'Item',
                col: 4,
                row: 4,
                sizeX: 3,
                sizeY: 4
            }
        ];


        $scope.foolength = function(){
            $scope.cartdetails=$scope.foo;

        };



        $scope.slides1 = [{Title: 'First'}, {Title: 'Second'}];

        $scope.search = function (item){
            if ($scope.foo.indexOf(item.detail1)!==-1)  {

                return true;
            }
            return false;
        };

        $http.get('../modules/data/posts.json').
            success(function(data, status, headers, config) {
                $scope.rclass = data;
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                // log error
            });

        $http.get('../modules/data/category.json').
            success(function(data, status, headers, config) {
                $scope.raclass = data;
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                // log error
            });


        $http.get('../modules/data/url_category.json').
            success(function(data, status, headers, config) {
                $scope.rrclass = data;
            }).
            error(function(data, status, headers, config) {
                // log error
            });


        $scope.filterByCategory = function (category) {
            $scope.boss = Webs.query({detail2:category});
            console.log($scope.boss);
            };

        $scope.gridsterOpt = {
            columns:5,
            margins: [10, 10],
            defaultSizeX:1,
            defaultSizeY:1,
            colWidth:445,
            rowHeight:950,
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


        $scope.ts= $scope.rclass;

        $scope.gridsterOpts = {
            columns:5,
            margins: [10, 10],
            defaultSizeX:1,
            defaultSizeY:1,
            colWidth:180,
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

        $scope.dynamicPopover = {
            content: 'Hello, World!',
            title: 'Title'
            };
        $scope.slides=[			// Slideshow Images
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-1.jpg', title : 'Image Credit: Maria Kazvan', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-1.jpg', url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-2.jpg', title : 'Image Credit: Maria Kazvan', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-2.jpg', url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-3.jpg', title : 'Image Credit: Maria Kazvan', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-3.jpg', url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-1.jpg', title : 'Image Credit: Colin Wojno', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-1.jpg', url : 'http://www.nonsensesociety.com/2011/03/colin/'},
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-2.jpg', title : 'Image Credit: Colin Wojno', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-2.jpg', url : 'http://www.nonsensesociety.com/2011/03/colin/'},
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-3.jpg', title : 'Image Credit: Colin Wojno', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-3.jpg', url : 'http://www.nonsensesociety.com/2011/03/colin/'},
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-1.jpg', title : 'Image Credit: Brooke Shaden', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-1.jpg', url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'},
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-2.jpg', title : 'Image Credit: Brooke Shaden', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-2.jpg', url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'},
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-3.jpg', title : 'Image Credit: Brooke Shaden', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-3.jpg', url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'}
        ];

        $scope.standardItems = [
            { sizeX: 2, sizeY: 1, row: 0, col: 0 , color:'#d9522c'},
            { sizeX: 2, sizeY: 2, row: 0, col: 2 , color: '#009900'},
            { sizeX: 1, sizeY: 1, row: 0, col: 4 ,color: '#ae193e'},
            { sizeX: 1, sizeY: 1, row: 0, col: 5 ,color: '#0099ab'},
            { sizeX: 2, sizeY: 1, row: 1, col: 0 ,color: '#fba919'},
            { sizeX: 1, sizeY: 1, row: 1, col: 4 ,color: '#fbf9e9'},
            { sizeX: 1, sizeY: 2, row: 1, col: 5 ,color: '#2d87ef'},
            { sizeX: 1, sizeY: 1, row: 2, col: 0 ,color: '#5b39b6'},
            { sizeX: 2, sizeY: 1, row: 2, col: 1 ,color: '#474747'},
            { sizeX: 1, sizeY: 1, row: 2, col: 3,color: '#d9522c'},
            { sizeX: 1, sizeY: 1, row: 2, col: 4,color: '#009900'},
            { sizeX: 2, sizeY: 1, row: 0, col: 0 ,color: '#ae193e'},
            { sizeX: 2, sizeY: 2, row: 0, col: 2 ,color: '#0099ab'},
            { sizeX: 1, sizeY: 1, row: 0, col: 4 ,color: '#fba919'},
            { sizeX: 1, sizeY: 1, row: 0, col: 5,color: '#fba969'},
            { sizeX: 2, sizeY: 1, row: 1, col: 0 ,color: '#2d87ef'},
            { sizeX: 1, sizeY: 1, row: 1, col: 4,color: '#5b39b6'},
            { sizeX: 1, sizeY: 2, row: 1, col: 5 ,color: '#474747'},
            { sizeX: 1, sizeY: 1, row: 2, col: 0 ,color:'#fbff99'},
            { sizeX: 1, sizeY: 1, row: 2, col: 0 ,color:'#feff909'}

        ];

		// Create new Web
		$scope.create = function() {
			// Create new Web object
			var web = new Webs ({
				name: this.name
			});

			// Redirect after save
			web.$save(function(response) {
				$location.path('webs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Web
		$scope.remove = function(web) {
			if ( web ) { 
				web.$remove();

				for (var i in $scope.webs) {
					if ($scope.webs [i] === web) {
						$scope.webs.splice(i, 1);
					}
				}
			} else {
				$scope.web.$remove(function() {
					$location.path('webs');
				});
			}
		};

		// Update existing Web
		$scope.update = function() {
			var web = $scope.web;

			web.$update(function() {
				$location.path('webs/' + web._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

        $scope.hoverItems = function(href) {


                var newH = (href).toString();

                    $window.open('http://'+newH,'_blank');


        };

        $scope.$watch('foo',function(newVal,oldVal){

        });

        $scope.findIt = function() {
            var cart = $scope.cartdetails;


            Webs.query({webId:$stateParams.webId,itemId:$stateParams.itemId}, function (cart) {
                $scope.cartone= angular.fromJson(cart);
                $scope.urls=$scope.cartone[0].linkcode.split('\"');
                $scope.src=$scope.urls[3];
                $scope.url=	$scope.urls[1];
                $scope.alt=	$scope.urls[4];
                $scope.cartone = cart;
            });
        };

		// Find a list of Webs
		$scope.find = function() {

            $scope.hoverEdit = true;
            $scope.webs = Webs.query();

        };

        $scope.baz =[{}];
            // Find existing Web
        $scope.finds = function() {
            Webs.query({
                webId: $stateParams.webId
            }, function (cart) {
                $scope.cartdetails = cart;
                $timeout ( function () {
                    $scope.baz=$scope.cartdetails;
                    $scope.$apply();
                }, 100);

            });
        };


        $scope.fines = function() {
            $scope.hoverEdit = false;
        };

        $scope.fine = function(name) {
            Webs.query({detail2:name
           }, function (cart) {
                $scope.webname = cart;
            });
           };



	}
]);
