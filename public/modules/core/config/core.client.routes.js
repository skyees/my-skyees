'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		$stateProvider.
		state('channel', {
			url: '/channel',
			templateUrl: 'modules/core/views/channel.client.view.html'
		}).
		state('splash', {
			url: '/search',
			templateUrl: 'modules/core/views/splash.client.view.html'
		}).
		state('home', {
                url: '/',
                templateUrl: 'modules/core/views/home.client.view.html'
            });
    }
]);
