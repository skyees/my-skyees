'use strict';

//Mines service used to communicate Mines REST endpoints
angular.module('mines').factory('Mines', ['$resource',
	function($resource) {
		return $resource('mines/:mineId', { mineId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
