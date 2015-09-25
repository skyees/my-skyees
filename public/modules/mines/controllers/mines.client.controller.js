'use strict';

// Mines controller
angular.module('mines').controller('MinesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Mines','$routeScope',
	function($scope, $stateParams, $location, Authentication, Mines,$routeScope) {
		$scope.authentication = Authentication;

		// Create new Mine
		$scope.create = function() {
			// Create new Mine object
			var mine = new Mines ({
				name: this.name
			});

			// Redirect after save
			mine.$save(function(response) {
				$location.path('mines/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Mine
		$scope.remove = function(mine) {
			if ( mine ) { 
				mine.$remove();

				for (var i in $scope.mines) {
					if ($scope.mines [i] === mine) {
						$scope.mines.splice(i, 1);
					}
				}
			} else {
				$scope.mine.$remove(function() {
					$location.path('mines');
				});
			}
		};

		// Update existing Mine
		$scope.update = function() {
            var mine= $scope.mines;

			mine.$update(function() {

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
		};

		// Find a list of Mines
		$scope.find = function() {
			$scope.mines = Mines.query();
		};

		// Find existing Mine
		$scope.findOne = function() {
			$scope.mine = Mines.get({ 
				mineId: $stateParams.mineId
			});
		};
	}
]);
