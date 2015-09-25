'use strict';

//Setting up route
angular.module('webs').config(['$stateProvider',
	function($stateProvider,paginationTemplateProvider){
		// Webs state routing
		$stateProvider.
            state('listWebs', {
			url: '/webs',
                views: {
                    '':{
                        templateUrl: 'modules/webs/views/list-webs.client.view.html'
                       },
                    'main@listWebs':{
                        templateUrl: 'modules/webs/views/list-big.client.view.html'
                    },
                    'menuList@listWebs':{
                        templateUrl:'modules/webs/views/menulist.client.view.html'
                    }
                  }
               }).
		state('createWeb', {
			url: '/webs/create',
			templateUrl:'modules/webs/views/create-web.client.view.html'
	     	}).
		state('listWebs.viewWeb', {
			url: '/:webId',
          views:   {
           'main':{
            templateUrl: 'modules/webs/views/view-web.client.view.html'
                 },
              'you@listWebs':{
                  templateUrl:'modules/webs/views/detail.client.view.html'
               }
                }
		     }).
            state('listWebs.viewWeb.detail', {
                url:'/:itemId',
                views: {
                    'you@listWebs':{
                        templateUrl:'modules/webs/views/detail.client.view.html'
                    }
                 }
                   }).
            state('editWeb', {
			url: '/webs/:webId/edit',
			templateUrl: 'modules/webs/views/edit-web.client.view.html'
		  });

    }
      ]);
