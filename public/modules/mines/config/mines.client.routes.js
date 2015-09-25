'use strict';

//Setting up route
angular.module('mines').config(['$stateProvider',
	function($stateProvider) {
		// Mines state routing
		$stateProvider.
		state('listMines', {
			url: '/mines',
			templateUrl: 'modules/mines/views/list-mines.client.view.html'
		}).
		state('createMine', {
			url: '/mines/create',
			templateUrl: 'modules/mines/views/create-mine.client.view.html'
		}).
		state('viewMine', {
			url: '/mines/:mineId',
			templateUrl: 'modules/mines/views/view-mine.client.view.html'
		}).
		state('editMine', {
			url: '/mines/:mineId/edit',
			templateUrl: 'modules/mines/views/edit-mine.client.view.html'
		});
	}
]);