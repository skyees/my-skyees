'use strict';

// Configuring the Articles module
angular.module('webs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Webs', 'webs', 'dropdown', '/webs(/create)?');
		Menus.addSubMenuItem('topbar', 'webs', 'List Webs', 'webs');
		Menus.addSubMenuItem('topbar', 'webs', 'New Web', 'webs/create');
	}
]);