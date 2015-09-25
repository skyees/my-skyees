'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var webs = require('../../app/controllers/webs.server.controller');

	// Webs Routes
	app.route('/webs')
		.get(webs.list)
		.post(users.requiresLogin, webs.create);

	app.route('/webs/:webId')
        .get(webs.cateGorylist)
        .put(users.requiresLogin, webs.hasAuthorization, webs.update)
		.delete(users.requiresLogin, webs.hasAuthorization, webs.delete);

    app.route('/webs/:webId/:itemId')
        .get(webs.ready);

	// Finish by binding the Web middleware
   // app.param('webId', webs.webByID);
};
