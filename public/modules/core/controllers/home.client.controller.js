'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication','$facebook','Fbservice','$modal','Mines','Upload','$timeout',
	function($scope, Authentication,$facebook,$modal,Fbservice,Mines,Upload,$timeout) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.isLoggedIn = false;
        $scope.login = function () {
            $facebook.login().then(function () {
                refresh();
            });
        };

        function refresh() {

            $facebook.ui({
                method: 'send',
                link: 'http://www.google.com'
            });
            $facebook.api('/me').then(
                function (response) {
                    $scope.welcomeMsg = 'Welcome'+ response.name;
                    $scope.friends = response;
                    $scope.isLoggedIn = true;
                },
                function (err) {
                    $scope.welcomeMsg = 'Please log in';
                });
        }

        refresh();

        $scope.last = 'rajkiran';

        $scope.gridsterOpts = {
            columns: 1,
            margins: [90, 1],
            defaultSizeX: 1,
            defaultSizeY: 1,
            colWidth:1000,
            rowHeight: 350,
            outerMargin: false,
            pushing: true,
            floating: true,
            draggable: {
                enabled: true
            },
            resizable: {
                enabled: true,
                handles: 'se'
            }

        };

        $scope.addwidget = function () {
            $scope.positions.push({color: '#d9522c'});
            var myine= Mines.get({mineId:$scope.myid});
            myine.position=$scope.positions;
            $scope.$apply();
            myine.$update({mineId:$scope.myid},function(){

              }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
               });
             };


        $scope.$watch(function(scope) { return scope.positions;},function(newValue, oldValue) {

            var myunit= Mines.get({mineId:$scope.myid});

            myunit.position=$scope.positions;

            myunit.$update({mineId:$scope.myid},function(){

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
          },true);

        $scope.deletewidget = function (index) {
            $scope.positions.splice(index, 1);
            $scope.apply();
            var myunit= Mines.get({mineId:$scope.myid});

            myunit.position=$scope.positions;

            myunit.$update({mineId:$scope.myid},function(){

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.mydirective='';
          $scope.finds=Mines.query({});

            Mines.query(function(response){
                angular.forEach(response,function(item){
                    $scope.myimages=item.images;
                    $scope.mydirective=item.directive;
                    $scope.myitems=item.items;
                    $scope.positions=item.position;
                    $scope.myid=item._id;
                });

            });



        $scope.$watch('finds', function(item) {
            if (item.length===-1)
            {
                var mine = new Mines ({

                });
                mine.color='#23f3ef';
                // Redirect after save
                mine.$save(function(response) {

                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
              }
        });
$scope.heros='oksir';
        $scope.standardItems = [
            { sizeX: 2, sizeY: 1, row: 0, col: 0 ,color: '#d9522c'},
            { sizeX: 2, sizeY: 2, row: 0, col: 2 ,color: '#009900'},
            { sizeX: 1, sizeY: 1, row: 0, col: 4 ,color: '#ae193e'},
            { sizeX: 1, sizeY: 1, row: 0, col: 5 ,color: '#0099ab'},
            { sizeX: 2, sizeY: 1, row: 1, col: 0 ,color: '#fba919'},
            { sizeX: 1, sizeY: 1, row: 1, col: 4 ,color: '#fbf9e9'},
            { sizeX: 1, sizeY: 2, row: 1, col: 5 ,color: '#2d87ef'},
            { sizeX: 1, sizeY: 1, row: 2, col: 0 ,color: '#5b39b6'},
            { sizeX: 2, sizeY: 1, row: 2, col: 1 ,color: '#474747'},
            { sizeX: 1, sizeY: 1, row: 2, col: 3 ,color: '#d9522c'}
        ];


        $scope.centerAnchor = true;
        $scope.toggleCenterAnchor = function () {
            $scope.centerAnchor = !$scope.centerAnchor;
        };
        $scope.draggableObjects = [{name: 'slider'}, {name: 'display'}, {name: 'three'}];
        $scope.droppedObjects1 = [];
        $scope.droppedObjects2 = [];
        $scope.datas = [];
        $scope.onDrop = function (index, data, evt) {
            $scope.i = index;
            $scope.datas[index] = data;
            $scope.images=
            $scope.index = index;
        };
        $scope.gridster_list = Mines.query();

        $scope.onDropComplete = function (data, evt) {
            var index = $scope.droppedObjects1.indexOf(data);
            if (index === -1)
                $scope.droppedObjects1.push(data);
               console.log('drop success, data:', data);
        };
        var inArray = function (array, obj) {
            var index = array.indexOf(obj);
        };


      $scope.myitem=Mines.query();
       Mines.query(function(response){
          angular.forEach(response,function(item){
              $scope.myitems=item.items;
          });
      });





        $scope.ming='';

        $scope.mineget=function(key){
                Mines.get({mineId:$scope.myid},function(response) {
                        if (response.images) {
                            $scope.ming=response.images;
                        }
                   $scope.images=$scope.ming;
                });
                };



        $scope.uploadPic = function (files) {
            $scope.bfiles=files;
           var mine=new Mines({
                images:'rajkiran'
            });
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                   $scope.file = files[i];
                    (function (index) {
                    Upload.upload({
                        url:'/mines',
                        file: $scope.file
                    }).progress(function (evt) {
                        $timeout(function() {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            $scope.logl = progressPercentage;
                            $scope.logls = evt.total;
                            $scope.log = 'progress: ' + progressPercentage + '% ' +
                            evt.config.file.name + '\n' + $scope.log;
                        },100);
                    }).success(function (data, status, headers, config) {

                        $timeout(function() {
                            $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                            $scope.$apply();
                        });

                    });

                    })(i);

                }
            }
        };

        $scope.myHtml = '<h1>Hello World</h1>';
        $scope.froalaOptions = {
            buttons : ['bold', 'italic', 'underline', 'sep', 'align', 'insertOrderedList' ,'insertUnorderedList']
        };
        //$scope.images = [
        //    {
        //        url: '../modules/core/img/brand/hiding-the-map.jpg',
        //        caption: 'This is slide one description',
        //        id: 'item1'
        //    },
        //    {
        //        url: '/modules/core/img/brand/finding-the-key.jpg',
        //        caption: 'This is slide two description',
        //        id: 'item2'
        //    },
        //    {
        //        url: '/modules/core/img/brand/lets-get-out-of-here.jpg',
        //        caption: 'This is slide three description',
        //        id: 'item3'
        //    },
        //    {
        //        url: '/modules/core/img/brand/theres-the-buoy.jpg',
        //        caption: 'This is slide four description',
        //        id: 'item4'
        //    },
        //      {url: '/modules/core/img/the-battle.jpg',
        //        caption: 'This is slide four description',
        //        id: 'item5'}
        //];


    }
]);
