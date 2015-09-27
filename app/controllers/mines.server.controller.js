'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    Mine = mongoose.model('Mine'),
    Article=mongoose.model('Article'),
    fs = require('fs'),
    _ = require('lodash');


/**
 * Create a Mine
 */
var multer  = require('multer');

exports.create = function(req, res) {
	var mine = new Mine(req.body);
	mine.user = req.user;
    console.log(req.file);
    console.log('./public/modules/uploads/'+req.file.filename);
    fs.readFile('./public/modules/uploads/'+req.file.filename, function (err, data) {
        // ...

        var newPath = './public/modules/uploads/'+req.file.originalname;
        fs.writeFile(newPath, data, function (err) {
            if (err) return console.log(err);
            console.log('Hello World > helloworld.txt');
        });

    });
    mine.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mine);
		}
	});


};


exports.saveImage = function(req, res) {
    var article = new Article(req.body);
    article.user = req.user;
    //console.log(res.jsonp(req.body));
    article.title = req.body.title;
    article.content = req.body.content;
    article.tags = req.body.tags;
    article.image = req.files;

    if(req.body.price)
    {
        article.price=req.body.price;
    }


    article.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            console.log('article saved',article._id);
            // set where the file should actually exists - in this case it is in the "images" directory
            var target_path = './public/img/articles/' +article._id+article.image;
            fs.readFile(req.files.Imagen.path, function (err, data) {
                fs.writeFile(target_path, data, function (err) {
                    res.setHeader('Content-Type', 'text/html');

                    res.redirect('/#!/articles/'+ article._id);
                });
            });

            //cloudinary.uploader.upload(req.files.Imagen.path,
            //                     function(result) { console.log(result);},{public_id : article._id, format : "jpg"});
            // res.redirect("/#!/articles/"+ article._id);
        }
    });


};

/**
/**
 * Show the current Mine
 */
exports.read = function(req, res) {
	res.jsonp(req.mine);
};

/**
 * Update a Mine
 */
exports.update = function(req, res) {

    var mine = req.mine;

    mine = _.extend(mine,req.body);

	mine.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mine);
		}
	});
};

/**
 * Delete an Mine
 */
exports.delete = function(req, res) {
	var mine = req.mine ;

	mine.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mine);
		}
	});
};

/**
 * List of Mines
 */
exports.list = function(req, res) {
    if(req.user!==null&&req.user!==0&&req.user!==undefined) {
        Mine.find({user: req.user.id})
            .sort('-created').populate({
                path: 'user',
                match: {_id: req.user.id},
                select: 'displayName',
                options: {limit: 5}
            }).exec(function (err, mines) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.jsonp(mines);
                }
            });
    }
};

/**
 * Mine middleware
 */
exports.mineByID = function(req, res, next, id) { 
	Mine.findById(id).populate('user', 'displayName').exec(function(err, mine) {
		if (err) return next(err);
		if (! mine) return next(new Error('Failed to load Mine ' + id));
		req.mine = mine ;
		next();
	});
};

/**
 * Mine authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.mine.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
