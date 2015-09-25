'use strict';

// Configuring the Articles module
angular.module('mines').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Mines', 'mines', 'dropdown', '/mines(/create)?');
		Menus.addSubMenuItem('topbar', 'mines', 'List Mines', 'mines');
		Menus.addSubMenuItem('topbar', 'mines', 'New Mine', 'mines/create');
	}
]);
