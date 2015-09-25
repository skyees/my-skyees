'use strict';

angular.module('core').controller('UploadImageController',
	function($scope,$rootScope,$modalInstance,Upload,$timeout) {
        $scope.progress = 0;
        $scope.files = [];
        $rootScope.myobjs = {'image':''};
        $scope.uploady = function(files){
            Upload.upload({
                url: '/mines',
                file: files[0],
                method: 'POST'
            }).progress(function (evt) {
                $timeout(function() {
                    var progs = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.progressy=progs;
                },100);
            }).success(function(data) {

                    $scope.sdata = data;
                    $scope.progress = 0;
                    $rootScope.myobjs.image ='./modules/uploads/iPhone6plus_in_my_hand.jpg';



     });
        };

        $scope.insert = function(){

            $modalInstance.close($rootScope.myobjs.image);

        };
	}
);
