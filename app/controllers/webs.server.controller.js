'use strict';

var request = require('request');
var xml2js = require('xml2js');
var async = require('async');
var Nightmare = require('nightmare');
var id =[];
/**
 * Module dependencies.
 */
  var parser = xml2js.Parser({
    explicitArray: false
    });

  function cleanArray(actual){
    var newArray = [];
    for(var i = 0; i<actual.length; i++){
        if (actual[i]){
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

  var i = 0;
  var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Web = mongoose.model('Web'),
	_ = require('lodash');

/**
 * Create a Web
 */
    function emptyElement(element) {
    //Removes nulls, zeros (also falses), text version of false, and blank element
    if (element === null || element === 0 || element.toString().toLowerCase() === 'false' || element === '')
        return false;
    else return true;
     }

    Array.prototype.unique = function() {
    var o = {}, i, l = this.length, r = [];
    for(i=0; i<l;i+=1) o[this[i]] = this[i];
    for(i in o) r.push(o[i]);
    return r;
    };


    var imageURL=[];

    exports.create = function(req, res) {
       var series='';
       var poster='';
       var urls='';
       var nexts='';
       var i=0;

    async.waterfall([

            function(callback) {
                var options = {
                    weak: false
                };

               var _ = require('underscore');
               var datas=[];
               var arr=[];
               var imagefiles=[];
               request.get('http://localhost:3000/modules/data/shareasale.xml', function (error, response, body) {



                       parser.parseString(body, function (err, result) {

                        var json = JSON.stringify(result);
                        //  console.log(json);
                        var nex = [];
                        for (var i = 0; i <  200; i++) {

                              arr[i] = result.basketReport.basketReportrecord[i];
                               console.log(arr[i]);

                            if (arr[i].linkcode!== null && arr[i].linkcode !=='' && arr[i].merchantstatus !=='Declined') {

                                datas[i] = arr[i];
                                imagefiles[i]= datas[i].linkcode = arr[i].linkcode.split('\"')[1];

                            }
                        }
                         //imagefiles=imagefiles.filter(Boolean);
                         //imagefiles=imagefiles.filter(emptyElement);
                           callback(null, datas,imagefiles);

                       });
                  });
            },

            function(datas,imagefiles,callback){
                     datas = datas.filter(Boolean);
                     datas = cleanArray(datas);
                     datas =_.chain(datas)
                    .sortBy(function(data) { return !data.detail2; })
                    .uniq(function(data) { return data.linkcode; })
                    .value();
                     var g = false;
           function findimages(data,callback) {


                   // process.nextTick(function(){
                        // Output arraysif
                        // var el
                        series = data;

                        var options = {
                            weak: false
                        };

                        function replace(key, value) {

                            return value.toString().replace(/\//g, '&');

                        }

                        var category = JSON.stringify(series.detail2, replace);

                        category = category.replace(/\"/g, ' ');

                        var nextx='';
                        var image='';
                        var time=[];
                        var links=[];

                         var mid=series.merchantid;
                         var nexts = series.linkcode;

                         var night = new Nightmare(options)
                            .viewport(1200, 800)
                            .on('urlChanged', function (targetUrl) {

                                var match = targetUrl;

                                if (match !== urls) {
                                    var nexts = targetUrl;
                                     console.log('nextUrl-#' + targetUrl);
                                    if (nexts !== undefined) {
                                        nextx = nexts.split('/')[2];
                                        var noact = nexts.split('/')[3];
                                        // console.log(noact+'..#noact');
                                        if (nextx !== 'www.shareasale.com' && noact !== 'notactive.html') {
                                            time.push(nextx);
                                            console.log(time + '..BIG-imagesURL');


                                        }
                                    }
                                }

                                //   console.log('newUrl-#' + targetUrl);

                            })
                             .on('LoadStarted', function () {
                                   console.log('Now loading started...');
                            })
                            .on('LoadFinished', function () {
                                  console.log('Now loading finished...');


                            })
                            .wait()
                            .goto(nexts)
                            .wait(5000)
                            .goto(time[i])
                            .wait()
                            .wait()
                            .wait()
                            .wait()
                            .wait()
                            .wait()
                            .url(function(link) {
                               var tld = require('tldjs');
                               var host = tld.getDomain(link);
                               console.log('#hostname'+host);
                               if(host!== 'shareasale.com'&&host!==' '&&host!==null){
                                   console.log('link:::'+link);
                                   if(tld.tldExists(link))
                                      links.push(link);

                                       g = true;
                               }
                               night=null;
                            });
                              night.run(function () {
                              console.log('finished all');
                                  night=null;

                              return callback(null,links);
                             });

                    if(links!==null&&links!==' '&&links!== undefined&&links!=='') {
                         var web = new Web({
                             merchantid: series.merchantid,
                             organization: series.organization,
                             basketitemlabel: series.basketitemlabel,
                             detail1: series.detail1,
                             detail2: category,
                             linkcode: image,
                             imagefile: 'modules/test/testScale' + series.merchantid + '.png',
                             ratingCount: series.ratingcount

                         });
                             var mist =series.merchantid;
                             id.push(mist);
                         web.save(function (err) {
                             if (err) {
                                 return res.status(400).send({
                                     message: errorHandler.getErrorMessage(err)
                                 });
                             }
                         });

                         web.user = req.user;

                       }
                     i++;
                    //});
                  night=null;
                  }
            setTimeout(function(){
                async.map(datas,findimages,function (err, results) {

                if (err) console.log(err);
                var imageUR =[];
                //imageURL.push(results);
                //console.log(array+'imageUrl Array');
                imageURL = results.filter(Boolean);
                imageURL = cleanArray(imageURL);
                //console.log(results+'::::::::results');
                console.log(imageURL+'::::::::imageURLs');
                callback(null,results);
                    }
                 );},1000);
            },

             function(imageURLS,callback){

                 _.mixin({
                     compactObject : function(o) {
                         var newObject = {};
                         _.each(o, function(v, k) {
                             if(v !== null && v !== undefined) {
                                 newObject[k] = v;
                             }
                         });
                         return newObject;
                     }
                 });
                 var ids = id;
                 var URLS = imageURLS.map(function(item) {
                     return item;
                 });
                 //imageURLS =_(imageURLS).compactObject;
                 //imageURLS =_.pick(imageURLS, _.isBoolean);
                 var j=0;
                 function raj(imageURi) {

                     var Uri = imageURi.toString();
                     var validUrl = require('valid-url');
                     var URI = require('URIjs');
                     //var Uri = URI("google.com").protocol("http") ;
                     var valid = validUrl.is_uri(Uri);
                     console.log('valid_____' + valid);
                     console.log('uri_____' + Uri);
                     var f = typeof(Uri);
                     console.log('ffffff' +ids[j]+f);
                     console.log('imageuri'+ids[j]+ Uri);

                     var options = {
                         weak: false
                     };

                     if (valid !== undefined&&ids[j]!==undefined) {

                        // var webshot = require('webshot');
                       //  var fs      = require('fs');
                         var n = new Nightmare(options);

                         n.goto(Uri)
                             .viewport(1200, 1000)
                             .wait(10000)
                             .wait()
                             .wait()
                             .wait()
                             .wait()
                             .wait()
                             .wait()
                             .wait()
                             .wait()
                             .wait()
                             .screenshot('public/modules/test/testScale' +ids[j]+ '.png')
                             .run(function (err, n) {
                                     n=null;
                                    console.log('done');
                                     callback(null,Uri);
                             });

                       }


                     j++;
                 }

                   if( Object.prototype.toString.call( imageURLS ) === '[object Array]' ) {
                     console.log( 'Array!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' );
                        }

              setTimeout(function(){
                 async.map(URLS, raj, function (err, results) {
                           if (err) console.log(err);
                             var count = j.length;
                           console.log(results+count+'::::::::results');

                           callback(null,results);

                        }
                     ); },1000);
               // }
             }
             ],

        function(err, status){

            console.log(status+'*********####sattus');

                             });

        /**res.jsonp();**/
           };
/**
 * Show the current Web
 */


 exports.ready = function(req, res) {
    console.log('url for last'+req.params.itemId);

    var query = Web.find();

    var cast = mongoose.Types.ObjectId(req.params.itemId);

    query.where({ _id:cast });

    query.sort('-created').populate('user', 'displayName').exec(function(err, items) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(items);
        }
    });

 };


  exports.read = function(req, res)
     {
	  res.jsonp(req.web);

       };

   /**
    * Update a Web
   */
   exports.update = function(req, res)
   {
	var web = req.web ;

	web = _.extend(web , req.body);

	web.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(web);
		}
	});
   };

/**
 * Delete an Web
 */
  exports.delete = function(req, res) {
	var web = req.web;
    web.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(web);
		}
	});
   };

/**
 * List of Webs
 */
  exports.list = function(req, res) {
      var query = Web.find();
      if (req.query.detail2) {
          query.find({detail2:req.query.detail2}).sort('-created').exec(function(err, webs) {
              if (err) {
                  return res.status(400).send({
                      message: errorHandler.getErrorMessage(err)
                  });
              }
              else {
                  res.json(webs);
              }});

      }else{
      query.find().sort('-created').exec(function(err, webs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
        else {
            res.json(webs);
        }


  /**
   * else {
            var num = webs.length;

            var urls=[];
            var uurl = [];
            var uri=[];
            var nexts ='';

            //for(var i=0;/i//<//num;i++){

                var parameter = webs[i].linkcode;


                if (parameter!==null&&parameter!==''){
                    urls[i]= parameter.split('\"')[1];
                }
                url= urls.filter(Boolean);
                uri = url.unique();
            }


                console.log(uri[1]);

                console.log(uri.length);

                var phantom = require('phantom');

                var options = {
                    weak: false
                };
                var nextUrl=[];
                var Fnexts=[];
                var Fresults;
               nexts = uri[1];
                var match = [];
                var datas = [];
                var ur=[];

            for(i=0;i<5;i++){
                url= uri.filter(Boolean);
                ur = url.unique();
                datas.push(ur[i]);
            }
          console.log(datas+'--final---DATAS5:');

           var findimages = function findimages(data, callback) {
                console.log('findimagesnexts'+data);
                nexts=data;
                var Nightmare = require('nightmare');
                new Nightmare(options)
                    .viewport(1200, 800)
                    .on('urlChanged', function (targetUrl) {

                        var match = targetUrl;

                        if (match !== data) {
                            nexts=targetUrl;
                            console.log('nextUrl-#' + targetUrl);
                        }
                        console.log('newUrl-#' + targetUrl);

                    })
                    .on('LoadStarted',function() {
                        console.log('Now loading started...');
                    })
                    .on('LoadFinished',function() {
                        console.log('Now loading finished...');
                    })
                    .wait()
                    .goto(nexts)
                    .wait()
                    .wait()
                    .wait()
                    .wait()
                    .wait()
                    .wait()
                    .wait()
                    .screenshot('test/testScaleIs'+i+'.png')
                    .run(function (err, nightmare) {
                        console.log('done');
                    });
                i++;

                setTimeout(function () {
                    callback(null,data);
                }, 1000);

            };
                async.map(datas,findimages ,function(err, results){
                    if(!err) {
                        console.log('Finished: ' + results);
                        Fresults = results;
                    } else {
                        console.log('Error: ' + err);
                    }
                });

             res.jsonp(Fresults);
             res.jsonp(uri);
   }
    **/


	});
  }
  };

/**
 * Web middleware

 exports.webByID = function(req, res, next, id) {
	Web.({detial2:id}).populate('user', 'displayName').exec(function(err, web) {
		if (err) return next(err);
		if (! web) return next(new Error('Failed to load Web ' + id));
		req.web = web ;
		next();
	});
   };
 */
/**
 * Web authorization middleware
 */
  exports.hasAuthorization = function(req, res, next) {
	if (req.web.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
   };

exports.cateGorylist = function(req, res) {

    var query = Web.find();

    query.where({ detail2: req.params.webId });

    query.sort('-created').populate('user', 'displayName').exec(function(err, items) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.send(items);
        }
    });
};
