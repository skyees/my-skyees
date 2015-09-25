'use strict';

angular.module('core').controller('ModalController',
    function ($scope,$modalInstance,items,Mines,Authentication,$stateParams) {

        $scope.authentication = Authentication;

        $scope.items = items;
        $scope.mines = Mines.query();

        $scope.create = function() {
            // Create new Mine object
            var mine = new Mines ({
                images:items
            });
            $scope.hi=!$scope.hi;
            // Redirect after save
            mine.$save(function(response) {

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            $modalInstance.close();
        };

        $scope.file_changed = function(element) {

            $scope.$apply(function (scope) {
                var photofile = element.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {

                };
                reader.readAsDataURL(photofile);
            });
        };

        $scope.ok = function (mid) {

            var mine = $scope.kite = Mines.get({mineId:mid._id});

            mine.images = items;
            mine.directive='slider';
            mine.$update({mineId:mid._id},function(){

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            $modalInstance.close();

        };


        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
