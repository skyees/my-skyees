'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var mines = require('../../app/controllers/mines.server.controller');
    var multer  = require('multer');
    var upload = multer({dest:'./public/modules/uploads'});
	// Mines Routes
	app.route('/mines')
		.get(mines.list)
		.post(users.requiresLogin,upload.single('file'),mines.create);
    app.route('/mines/create')
        .post(users.requiresLogin,upload.single('file'),mines.create);
	app.route('/mines/:mineId')
		.get(mines.read)
		.put(users.requiresLogin, mines.hasAuthorization, mines.update)
		.delete(users.requiresLogin, mines.hasAuthorization, mines.delete);
        // Finish by binding the Mine middleware
	app.param('mineId', mines.mineByID);
};
