'use strict';

//Webs service used to communicate Webs REST endpoints
angular.module('webs').factory('Webs', ['$resource',
	function($resource) {
		return $resource('webs/:webId/:itemId', { webId:'@_id',itemId:'@_id'
		}, {
			update: {
				method: 'PUT'
			},
        'query':{method:'GET', isArray:true},

         'get':{method:'GET', isArray:false}
		});
	}
]);


