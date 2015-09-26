'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'sun';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap','ui.utils','angularUtils.directives.dirPagination','decipher.tags', 'ui.bootstrap.typeahead','gridster','SlideViewer','ui.splash','froala','duScroll','scrollto','ngFacebook','ngDraggable','ngFileUpload','textAngular','angularSpectrumColorpicker'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('mines');
'use strict';

var page = require('webpage').create();
page.open('https://modulus.io', function () {
    page.render('modules/text/modulus.png');
    phantom.exit();
});

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('webs');
'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
	}
]);
'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
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

'use strict';

// Core module config

angular.module('core')

    .config(['$facebookProvider',
        function($facebookProvider)
        {

            $facebookProvider.setAppId('112819629057770');
            $facebookProvider.setPermissions('email,user_likes,friends');
            $facebookProvider.setCustomInit({
                xfbml: true
            });


        }
    ])
    .run( ["$rootScope", function( $rootScope ) {
        // Load the facebook SDK asynchronously
        (function(){
            // If we've already installed the SDK, we're done
            if (document.getElementById('facebook-jssdk')) {return;}

            // Get the first script element, which we'll use to find the parent node
            var firstScriptElement = document.getElementsByTagName('script')[0];

            // Create a new script element and set its id
            var facebookJS = document.createElement('script');
            facebookJS.id = 'facebook-jssdk';

            // Set the new script's source to the source of the Facebook JS SDK
            facebookJS.src = '//connect.facebook.net/en_US/sdk.js';

            // Insert the Facebook JS SDK into the DOM
            firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
        }());
    }]).value('froalaConfig', {
         inlineMode: false,
          placeholder: 'Enter Text Here'
});


'use strict';

angular.module('core').controller('BodyController', ['$scope', 'Authentication', 'Menus','$window',
    function($scope, Authentication, Menus,$window) {


    }
]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus','Webs','$timeout','$http','$splash','$rootScope','$window',
	function($scope, Authentication, Menus,Webs,$timeout,$http,$splash, $rootScope,$window) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

        $rootScope.foo=[];
        $scope.searchfoo=[];
        $scope.new=[{}];
        $timeout(function(){
         $scope.new = Webs.query();
            $scope.$apply();
        });

        var raj = $scope.foo;


         $scope.half=function(){

          return $rootScope.foo;

         };



        $scope.searchs = function (item){

            if ($rootScope.foo.indexOf(item.detail1+'('+item.detail2+')')!==-1)  {

                return true;
            }
            return false;
        };

        $rootScope.check = function() {
            if ($rootScope.foo.length > 1) {
                return true;
            }
            else {
                return false;
            }
            $rootScope.$apply();
        };


        $rootScope.openSplash = function () {
            $splash.open({
                title:'RajKiran',
                new: $scope.new,
                foo:$scope.foo,
                half:$scope.half,
                searchfoo:$scope.searchfoo,
                searchs:$scope.searchs,
                gridOpts:$scope.gridOpts,
                message: 'This sure good and fine modal, isnt it?'
            });
        };
        $scope.gridOpts = {
            columns:2,
            margins: [5,5],
            defaultSizeX:1,
            defaultSizeY:1,
            colWidth:318,
            rowHeight:516,
            outerMargin: false,
            pushing: true,
            floating: true,
            draggable: {
                enabled: true
            },
            resizable: {
                enabled: true,
                handles: 'n, e, s, w, se, sw'

            }

        };

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});



	}
]);

'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication','$facebook','Fbservice','$modal','Mines','Upload','$timeout',
	function($scope, Authentication,$facebook,$modal,Fbservice,Mines,Upload,$timeout) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.isLoggedIn = false;
        $scope.login = function () {
            $facebook.login().then(function () {
                refresh();
            });
        };

        function refresh() {

            $facebook.ui({
                method: 'send',
                link: 'http://www.google.com'
            });
            $facebook.api('/me').then(
                function (response) {
                    $scope.welcomeMsg = 'Welcome'+ response.name;
                    $scope.friends = response;
                    $scope.isLoggedIn = true;
                },
                function (err) {
                    $scope.welcomeMsg = 'Please log in';
                });
        }

        refresh();

        $scope.last = 'rajkiran';

        $scope.gridsterOpts = {
            columns: 1,
            margins: [90, 1],
            defaultSizeX: 1,
            defaultSizeY: 1,
            colWidth:1000,
            rowHeight: 350,
            outerMargin: false,
            pushing: true,
            floating: true,
            draggable: {
                enabled: true
            },
            resizable: {
                enabled: true,
                handles: 'se'
            }

        };

        $scope.addwidget = function () {
            $scope.positions.push({color: '#d9522c'});
            var myine= Mines.get({mineId:$scope.myid});
            myine.position=$scope.positions;
            $scope.$apply();
            myine.$update({mineId:$scope.myid},function(){

              }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
               });
             };


        $scope.$watch(function(scope) { return scope.positions;},function(newValue, oldValue) {

            var myunit= Mines.get({mineId:$scope.myid});

            myunit.position=$scope.positions;

            myunit.$update({mineId:$scope.myid},function(){

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
          },true);

        $scope.deletewidget = function (index) {
            $scope.positions.splice(index, 1);
            $scope.apply();
            var myunit= Mines.get({mineId:$scope.myid});

            myunit.position=$scope.positions;

            myunit.$update({mineId:$scope.myid},function(){

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.mydirective='';
          $scope.finds=Mines.query({});

            Mines.query(function(response){
                angular.forEach(response,function(item){
                    $scope.myimages=item.images;
                    $scope.mydirective=item.directive;
                    $scope.myitems=item.items;
                    $scope.positions=item.position;
                    $scope.myid=item._id;
                });

            });



        $scope.$watch('finds', function(item) {
            if (item.length===-1)
            {
                var mine = new Mines ({

                });
                mine.color='#23f3ef';
                // Redirect after save
                mine.$save(function(response) {

                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
              }
        });
$scope.heros='oksir';
        $scope.standardItems = [
            { sizeX: 2, sizeY: 1, row: 0, col: 0 ,color: '#d9522c'},
            { sizeX: 2, sizeY: 2, row: 0, col: 2 ,color: '#009900'},
            { sizeX: 1, sizeY: 1, row: 0, col: 4 ,color: '#ae193e'},
            { sizeX: 1, sizeY: 1, row: 0, col: 5 ,color: '#0099ab'},
            { sizeX: 2, sizeY: 1, row: 1, col: 0 ,color: '#fba919'},
            { sizeX: 1, sizeY: 1, row: 1, col: 4 ,color: '#fbf9e9'},
            { sizeX: 1, sizeY: 2, row: 1, col: 5 ,color: '#2d87ef'},
            { sizeX: 1, sizeY: 1, row: 2, col: 0 ,color: '#5b39b6'},
            { sizeX: 2, sizeY: 1, row: 2, col: 1 ,color: '#474747'},
            { sizeX: 1, sizeY: 1, row: 2, col: 3 ,color: '#d9522c'}
        ];


        $scope.centerAnchor = true;
        $scope.toggleCenterAnchor = function () {
            $scope.centerAnchor = !$scope.centerAnchor;
        };
        $scope.draggableObjects = [{name: 'slider'}, {name: 'display'}, {name: 'three'}];
        $scope.droppedObjects1 = [];
        $scope.droppedObjects2 = [];
        $scope.datas = [];
        $scope.onDrop = function (index, data, evt) {
            $scope.i = index;
            $scope.datas[index] = data;
            $scope.images=
            $scope.index = index;
        };
        $scope.gridster_list = Mines.query();

        $scope.onDropComplete = function (data, evt) {
            var index = $scope.droppedObjects1.indexOf(data);
            if (index === -1)
                $scope.droppedObjects1.push(data);
               console.log('drop success, data:', data);
        };
        var inArray = function (array, obj) {
            var index = array.indexOf(obj);
        };


      $scope.myitem=Mines.query();
       Mines.query(function(response){
          angular.forEach(response,function(item){
              $scope.myitems=item.items;
          });
      });





        $scope.ming='';

        $scope.mineget=function(key){
                Mines.get({mineId:$scope.myid},function(response) {
                        if (response.images) {
                            $scope.ming=response.images;
                        }
                   $scope.images=$scope.ming;
                });
                };



        $scope.uploadPic = function (files) {
            $scope.bfiles=files;
           var mine=new Mines({
                images:'rajkiran'
            });
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                   $scope.file = files[i];
                    (function (index) {
                    Upload.upload({
                        url:'/mines',
                        file: $scope.file
                    }).progress(function (evt) {
                        $timeout(function() {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            $scope.logl = progressPercentage;
                            $scope.logls = evt.total;
                            $scope.log = 'progress: ' + progressPercentage + '% ' +
                            evt.config.file.name + '\n' + $scope.log;
                        },100);
                    }).success(function (data, status, headers, config) {

                        $timeout(function() {
                            $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                            $scope.$apply();
                        });

                    });

                    })(i);

                }
            }
        };

        $scope.myHtml = '<h1>Hello World</h1>';
        $scope.froalaOptions = {
            buttons : ['bold', 'italic', 'underline', 'sep', 'align', 'insertOrderedList' ,'insertUnorderedList']
        };
        //$scope.images = [
        //    {
        //        url: '../modules/core/img/brand/hiding-the-map.jpg',
        //        caption: 'This is slide one description',
        //        id: 'item1'
        //    },
        //    {
        //        url: '/modules/core/img/brand/finding-the-key.jpg',
        //        caption: 'This is slide two description',
        //        id: 'item2'
        //    },
        //    {
        //        url: '/modules/core/img/brand/lets-get-out-of-here.jpg',
        //        caption: 'This is slide three description',
        //        id: 'item3'
        //    },
        //    {
        //        url: '/modules/core/img/brand/theres-the-buoy.jpg',
        //        caption: 'This is slide four description',
        //        id: 'item4'
        //    },
        //      {url: '/modules/core/img/the-battle.jpg',
        //        caption: 'This is slide four description',
        //        id: 'item5'}
        //];


    }
]);

'use strict';

angular.module('core').controller('ModalController',
    ["$scope", "$modalInstance", "items", "Mines", "Authentication", "$stateParams", function ($scope,$modalInstance,items,Mines,Authentication,$stateParams) {

        $scope.authentication = Authentication;

        $scope.items = items;
        $scope.mines = Mines.query();

        $scope.create = function() {
            // Create new Mine object
            var mine = new Mines ({
                images:items
            });
            $scope.hi=!$scope.hi;
            // Redirect after save
            mine.$save(function(response) {

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            $modalInstance.close();
        };

        $scope.file_changed = function(element) {

            $scope.$apply(function (scope) {
                var photofile = element.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {

                };
                reader.readAsDataURL(photofile);
            });
        };

        $scope.ok = function (mid) {

            var mine = $scope.kite = Mines.get({mineId:mid._id});

            mine.images = items;
            mine.directive='slider';
            mine.$update({mineId:mid._id},function(){

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            $modalInstance.close();

        };


        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);

'use strict';

angular.module('core').controller('UploadImageController',
	["$scope", "$rootScope", "$modalInstance", "Upload", "$timeout", function($scope,$rootScope,$modalInstance,Upload,$timeout) {
        $scope.progress = 0;
        $scope.files = [];
        $rootScope.myobjs = {'image':''};
        $scope.uploady = function(files){
            Upload.upload({
                url: '/mines',
                file: files[0],
                method: 'POST'
            }).progress(function (evt) {
                $timeout(function() {
                    var progs = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.progressy=progs;
                },100);
            }).success(function(data) {

                    $scope.sdata = data;
                    $scope.progress = 0;
                    $rootScope.myobjs.image ='./modules/uploads/iPhone6plus_in_my_hand.jpg';



     });
        };

        $scope.insert = function(){

            $modalInstance.close($rootScope.myobjs.image);

        };
	}]
);

'use strict';

angular.module('core').directive('display',
	["$compile", "$modal", "Mines", "$timeout", function($compile,$modal,Mines,$timeout){
		return {
			templateUrl:'../modules/core/views/display.client.view.html',
            restrict: 'AE',
            transclude: true,
			link: function ($scope, element, attrs) {
				// Display directive logic
				// ...



                $scope.$watch('mydirective', function(item){

                    $timeout(function(){
                        var el = $compile('<'+item[$scope.index]+'/>')($scope);
                        element.append(el);
                    },1000);

                });


                $scope.$watch('item.color', function(item){

                    var mycolor = Mines.get({mineId:$scope.myid});

                    mycolor.position=$scope.positions;

                    mycolor.$update({mineId:$scope.myid},function(){

                    }, function(errorResponse) {
                        $scope.error = errorResponse.data.message;
                    });
                });

                $scope.onDrop = function (data,evt) {

                     if(('directive'!==data.name)&&($scope.mydirective[$scope.index]!==data.name)) {
                         $scope.mydirective[$scope.index]=data.name;
                         $scope.$apply();
                         $scope.directs = $scope.mydirective;

                         var myunit= Mines.get({mineId:$scope.myid});

                         myunit.directive=$scope.mydirective;

                        myunit.$update({mineId:$scope.myid},function(){

                     }, function(errorResponse) {
                     $scope.error = errorResponse.data.message;
                           });
                   }
                    $scope.$apply();
                };
                $scope.animationsEnabled = true;

                $scope.open = function (size,sitems) {
                        sitems.directive=$scope.direct;
                        $modal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl:'../modules/core/views/modal.client.view.html',
                        controller:'ModalController',
                        size: size,
                        resolve: {
                            items: function () {
                                return sitems;
                            }
                        }
                    });
                };

            }
		};
	}]
);

'use strict';

angular.module('core').directive('slider', ["$timeout", function($timeout) {
    return {
        restrict: 'AE',
        transclude: false,
        link: function(scope, elem, attrs) {
            var elem1= elem.find('#box-1');

            var switchIndicator = function ($c, $n, currIndex, nextIndex) {
                // kills the timeline by setting it's width to zero
                angular.element('#time-indicator').stop().css('width', 0);
                // Highlights the next slide pagination control
                angular.element('.goto-slide').removeClass('current').eq(nextIndex).addClass('current');
            };

            function getOffsetSum(elem1) {
                var top=0, left=0;

                while(elem1) {
                    top = top + parseInt(elem.offsetTop);
                    elem1 = elem1.offset;
                }

                return {top: top, left: left};
            }

            function getOffsetRect(elem1) {
                // (1)
                var box = elem1.getBoundingClientRect();

                var body = document.body;
                var docElem = elem1.find('#box-1');

                // (2)
                var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
                var scrollLeft = window.pagexOffset;

                // (3)
                var clientTop = docElem.clientTop || body.clientTop || 0;
                var clientLeft = docElem.clientLeft || body.clientLeft || 0;

                // (4)
                var top  = box.top +  scrollTop - clientTop;


                return { top: Math.round(top)};
            }

            $timeout(function() {
                elem1.boxSlider({
                        'speed': 1200,
                        'autoScroll': true,
                         'timeout': 5000,
                        onbefore: function ($c, $n, currIndex, nextIndex) {
                            // kills the timeline by setting it's width to zero
                            angular.element('#time-indicator').stop().css('width', 15);
                            // Highlights the next slide pagination control
                            angular.element('.goto-slide').removeClass('current').eq(nextIndex).addClass('current');

                        },
                        onafter: function () {
                            // start the timeline animation
                            angular.element('#time-indicator').animate({width: '75%'},5000);
                        }
                    }

                );



                scope.prev = function (event,elem1) {


                    event.preventDefault();
                    angular.element('#box-1').boxSlider('prev');



                    angular.element('#box-1').getOffsetRect(elem1);

                    return false;
                };

                scope.next = function (event,elem1) {

                    event.preventDefault();

                    angular.element('#box-1').boxSlider('next');


                    angular.element('#box-1').getOffsetRect(elem1);

                    return false;

                };
                scope.do = function (image,event,elem1) {
                    // Paginate the slides using the indicator controls
                    angular.element('#box-1').boxSlider('showSlide', image);
                    event.preventDefault();
                    getOffsetRect(elem1);
                    scope.$apply();

                };

            });

        },
        templateUrl:'../modules/core/views/slider.client.view.html'
    };
}]);

'use strict';

angular.module('core').directive('superSize',[
	function() {
        return {

            restrict: 'AE',
            replace: true,
            transclude:true,
            link:function(scope, element, attrs, ngModel) {

                element.supersized({

                    verticaal_center: 1,
                    slideshow: 1,
                    navigation: 0,
                    thumbnail_navigation: 0,
                    transition: 1, //0-None, 1-Fade, 2-slide top, 3-slide right, 4-slide bottom, 5-slide left
                    pause_hover: 0,
                    slide_counter: 0,
                    slide_captions: 0,
                    slide_interval: 7000,		// Speed of transition

                    // Components
                    slide_links	:'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
                    slides  	:  	[			// Slideshow Images
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-1.jpg', title : 'Image Credit: Maria Kazvan', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-1.jpg', url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-2.jpg', title : 'Image Credit: Maria Kazvan', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-2.jpg', url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-3.jpg', title : 'Image Credit: Maria Kazvan', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-3.jpg', url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-1.jpg', title : 'Image Credit: Colin Wojno', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-1.jpg', url : 'http://www.nonsensesociety.com/2011/03/colin/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-2.jpg', title : 'Image Credit: Colin Wojno', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-2.jpg', url : 'http://www.nonsensesociety.com/2011/03/colin/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-3.jpg', title : 'Image Credit: Colin Wojno', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-3.jpg', url : 'http://www.nonsensesociety.com/2011/03/colin/'},
                        {image : 'http://2.bp.blogspot.com/-ag1nIFlPIWA/UjKh-0d5yLI/AAAAAAAAAdk/f4ZM67NEawQ/s1600/birds+white+wallpapers.jpg', title : 'Image Credit: Brooke Shaden', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-1.jpg', url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'},
                        {image : 'http://www.hdwallpapersdownloadz.com/wp-content/uploads/Beautiful-Actress-Amy-Jackson-Cute-Desktop-Wallpapers-1024x768.jpg', title : 'Image Credit: Brooke Shaden', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-2.jpg', url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'},
                        {image : 'http://cache.desktopnexus.com/thumbseg/1817/1817850-bigthumbnail.jpg', title : 'Image Credit: Brooke Shaden', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-3.jpg', url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'}
                    ]

                });


            }

        };
	}
]);

'use strict';

angular.module('core').directive('topnav', ['$window',
	function($window) {
        var $win = angular.element($window); // wrap window object as jQuery object

        return {
            restrict: 'AE',
            link: function (scope, element, attrs) {
                var topClass = attrs.topnav, // get CSS class from directive's attribute value
                    offsetTop = element.offset().top; // get element's top relative to the document

                $win.on('scroll', function (e) {
                    if ($win.scrollTop() >= offsetTop) {
                        element.addClass(topClass);
                    } else {
                        element.removeClass(topClass);
                    }
                });
            }
        };
    }
]);

'use strict';

angular.module('core').factory('Fbservice', ['$q','$rootScope','$timeout',
	function($q,$rootScope,$timeout) {

        var getMyLastName = function () {
            var deferred = $q.defer();

            FB.api('/me', {
                fields: 'last_name'
            }, function (response) {

                $timeout(function () {
                    deferred.resolve(response);
                    $rootScope.rajs = response;
                    $rootScope.$apply();
                }, 2000);

                return deferred.promise;
            });

        };


        return {
            getMyLastName: getMyLastName
        };

    }
]);

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
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
'use strict';

// Mines controller
angular.module('mines').controller('MinesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Mines','$routeScope',
	function($scope, $stateParams, $location, Authentication, Mines,$routeScope) {
		$scope.authentication = Authentication;

		// Create new Mine
		$scope.create = function() {
			// Create new Mine object
			var mine = new Mines ({
				name: this.name
			});

			// Redirect after save
			mine.$save(function(response) {
				$location.path('mines/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Mine
		$scope.remove = function(mine) {
			if ( mine ) { 
				mine.$remove();

				for (var i in $scope.mines) {
					if ($scope.mines [i] === mine) {
						$scope.mines.splice(i, 1);
					}
				}
			} else {
				$scope.mine.$remove(function() {
					$location.path('mines');
				});
			}
		};

		// Update existing Mine
		$scope.update = function() {
            var mine= $scope.mines;

			mine.$update(function() {

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
		};

		// Find a list of Mines
		$scope.find = function() {
			$scope.mines = Mines.query();
		};

		// Find existing Mine
		$scope.findOne = function() {
			$scope.mine = Mines.get({ 
				mineId: $stateParams.mineId
			});
		};
	}
]);

'use strict';

//Mines service used to communicate Mines REST endpoints
angular.module('mines').factory('Mines', ['$resource',
	function($resource) {
		return $resource('mines/:mineId', { mineId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
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

'use strict';

// Webs controller
angular.module('webs').controller('WebsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Webs','$http','$window','$rootScope','$timeout',
	function($scope, $stateParams, $location, Authentication, Webs,$http,$window,$timeout) {

        $scope.images = [];
        $scope.foo=[];
        $scope.rrclass=[];
        $scope.items = [
            {
                name: 'Item 1',
                col: 1,
                row: 1,
                sizeX: 3,
                sizeY: 4
            }
        ];
        $scope.i=0;
        $scope.itemss = [
            {
                name: 'Item',
                col: 4,
                row: 4,
                sizeX: 3,
                sizeY: 4
            }
        ];


        $scope.foolength = function(){
            $scope.cartdetails=$scope.foo;

        };



        $scope.slides1 = [{Title: 'First'}, {Title: 'Second'}];

        $scope.search = function (item){
            if ($scope.foo.indexOf(item.detail1)!==-1)  {

                return true;
            }
            return false;
        };

        $http.get('../modules/data/posts.json').
            success(function(data, status, headers, config) {
                $scope.rclass = data;
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                // log error
            });

        $http.get('../modules/data/category.json').
            success(function(data, status, headers, config) {
                $scope.raclass = data;
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                // log error
            });


        $http.get('../modules/data/url_category.json').
            success(function(data, status, headers, config) {
                $scope.rrclass = data;
            }).
            error(function(data, status, headers, config) {
                // log error
            });


        $scope.filterByCategory = function (category) {
            $scope.boss = Webs.query({detail2:category});
            console.log($scope.boss);
            };

        $scope.gridsterOpt = {
            columns:5,
            margins: [10, 10],
            defaultSizeX:1,
            defaultSizeY:1,
            colWidth:445,
            rowHeight:950,
            pushing: true,
            floating: true,
            draggable: {
                enabled: true
            },
            resizable: {
                enabled: true,
                handles: 'n, e, s, w, se, sw'

            }
        };


        $scope.ts= $scope.rclass;

        $scope.gridsterOpts = {
            columns:5,
            margins: [10, 10],
            defaultSizeX:1,
            defaultSizeY:1,
            colWidth:180,
            outerMargin: false,
            pushing: true,
            floating: true,
            draggable: {
                enabled: true
            },
            resizable: {
                enabled: true,
                handles: 'n, e, s, w, se, sw'

            }

        };

        $scope.dynamicPopover = {
            content: 'Hello, World!',
            title: 'Title'
            };
        $scope.slides=[			// Slideshow Images
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-1.jpg', title : 'Image Credit: Maria Kazvan', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-1.jpg', url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-2.jpg', title : 'Image Credit: Maria Kazvan', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-2.jpg', url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-3.jpg', title : 'Image Credit: Maria Kazvan', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-3.jpg', url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-1.jpg', title : 'Image Credit: Colin Wojno', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-1.jpg', url : 'http://www.nonsensesociety.com/2011/03/colin/'},
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-2.jpg', title : 'Image Credit: Colin Wojno', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-2.jpg', url : 'http://www.nonsensesociety.com/2011/03/colin/'},
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-3.jpg', title : 'Image Credit: Colin Wojno', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-3.jpg', url : 'http://www.nonsensesociety.com/2011/03/colin/'},
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-1.jpg', title : 'Image Credit: Brooke Shaden', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-1.jpg', url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'},
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-2.jpg', title : 'Image Credit: Brooke Shaden', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-2.jpg', url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'},
            {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-3.jpg', title : 'Image Credit: Brooke Shaden', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-3.jpg', url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'}
        ];

        $scope.standardItems = [
            { sizeX: 2, sizeY: 1, row: 0, col: 0 , color:'#d9522c'},
            { sizeX: 2, sizeY: 2, row: 0, col: 2 , color: '#009900'},
            { sizeX: 1, sizeY: 1, row: 0, col: 4 ,color: '#ae193e'},
            { sizeX: 1, sizeY: 1, row: 0, col: 5 ,color: '#0099ab'},
            { sizeX: 2, sizeY: 1, row: 1, col: 0 ,color: '#fba919'},
            { sizeX: 1, sizeY: 1, row: 1, col: 4 ,color: '#fbf9e9'},
            { sizeX: 1, sizeY: 2, row: 1, col: 5 ,color: '#2d87ef'},
            { sizeX: 1, sizeY: 1, row: 2, col: 0 ,color: '#5b39b6'},
            { sizeX: 2, sizeY: 1, row: 2, col: 1 ,color: '#474747'},
            { sizeX: 1, sizeY: 1, row: 2, col: 3,color: '#d9522c'},
            { sizeX: 1, sizeY: 1, row: 2, col: 4,color: '#009900'},
            { sizeX: 2, sizeY: 1, row: 0, col: 0 ,color: '#ae193e'},
            { sizeX: 2, sizeY: 2, row: 0, col: 2 ,color: '#0099ab'},
            { sizeX: 1, sizeY: 1, row: 0, col: 4 ,color: '#fba919'},
            { sizeX: 1, sizeY: 1, row: 0, col: 5,color: '#fba969'},
            { sizeX: 2, sizeY: 1, row: 1, col: 0 ,color: '#2d87ef'},
            { sizeX: 1, sizeY: 1, row: 1, col: 4,color: '#5b39b6'},
            { sizeX: 1, sizeY: 2, row: 1, col: 5 ,color: '#474747'},
            { sizeX: 1, sizeY: 1, row: 2, col: 0 ,color:'#fbff99'},
            { sizeX: 1, sizeY: 1, row: 2, col: 0 ,color:'#feff909'}

        ];

		// Create new Web
		$scope.create = function() {
			// Create new Web object
			var web = new Webs ({
				name: this.name
			});

			// Redirect after save
			web.$save(function(response) {
				$location.path('webs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Web
		$scope.remove = function(web) {
			if ( web ) { 
				web.$remove();

				for (var i in $scope.webs) {
					if ($scope.webs [i] === web) {
						$scope.webs.splice(i, 1);
					}
				}
			} else {
				$scope.web.$remove(function() {
					$location.path('webs');
				});
			}
		};

		// Update existing Web
		$scope.update = function() {
			var web = $scope.web;

			web.$update(function() {
				$location.path('webs/' + web._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

        $scope.hoverItems = function(href) {


                var newH = (href).toString();

                    $window.open('http://'+newH,'_blank');


        };

        $scope.$watch('foo',function(newVal,oldVal){

        });

        $scope.findIt = function() {
            var cart = $scope.cartdetails;


            Webs.query({webId:$stateParams.webId,itemId:$stateParams.itemId}, function (cart) {
                $scope.cartone= angular.fromJson(cart);
                $scope.urls=$scope.cartone[0].linkcode.split('\"');
                $scope.src=$scope.urls[3];
                $scope.url=	$scope.urls[1];
                $scope.alt=	$scope.urls[4];
                $scope.cartone = cart;
            });
        };

		// Find a list of Webs
		$scope.find = function() {

            $scope.hoverEdit = true;
            $scope.webs = Webs.query();

        };

        $scope.baz =[{}];
            // Find existing Web
        $scope.finds = function() {
            Webs.query({
                webId: $stateParams.webId
            }, function (cart) {
                $scope.cartdetails = cart;
                $timeout ( function () {
                    $scope.baz=$scope.cartdetails;
                    $scope.$apply();
                }, 100);

            });
        };


        $scope.fines = function() {
            $scope.hoverEdit = false;
        };

        $scope.fine = function(name) {
            Webs.query({detail2:name
           }, function (cart) {
                $scope.webname = cart;
            });
           };



	}
]);

'use strict';

angular.module('webs').directive('list',['$timeout','$location','$rootScope','$window',
	function($timeout,$location,$rootScope,$window) {
		return {
            restrict: 'AE',
            replace: true,
            transclude:true,
            link:function(scope, element,attrs) {
                $timeout(function(){
                scope.$watch('cartdetails', function () {
                    $timeout(function(){
                    angular.element('.raj').slick({
                                dots: true,
                                infinite:false,
                                slidesToShow: 5,
                                slidesToScroll:5,
                                autoplay: true,
                                dotsClass:'paginations'
                    });
                    },100);
                    var $current;

                    scope.hoverItem = function(i,h,href) {

                        $timeout(function(){

                            var newHref = ('/'+i+'/'+h+'/'+href).toString();
                            scope.$apply(function() {  $window.location = newHref;});

                        },100);
                       };
                    scope.$watch('foo',function(){
                        angular.element('.raj').slick('unslick');
                        scope.$apply();
                    });

                    scope.hoverItems = function(href) {

                        $timeout(function(){

                            var newH = (href).toString();
                            scope.$apply(function() {
                                $window.open('http://'+newH,'_blank');
                               });
                        },100);
                    };

                  });
                });
            },
            templateUrl:'../modules/webs/views/lists.client.view.html'

		};
	}]
);

'use strict';

angular.module('webs').directive('superSized', [
	function() {
        return {

            restrict: 'AE',
            replace: true,
            transclude:true,
            link:function(scope, element, attrs, ngModel) {

                element.supersized({

                    verticaal_center: 1,
                    slideshow: 1,
                    navigation: 0,
                    thumbnail_navigation: 0,
                    transition: 1, //0-None, 1-Fade, 2-slide top, 3-slide right, 4-slide bottom, 5-slide left
                    pause_hover: 0,
                    slide_counter: 0,
                    slide_captions: 0,
                    slide_interval: 7000,		// Speed of transition

                    // Components
                    slide_links	:'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
                    slides  	:  	[			// Slideshow Images
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-1.jpg', title : 'Image Credit: Maria Kazvan', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-1.jpg', url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-2.jpg', title : 'Image Credit: Maria Kazvan', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-2.jpg', url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-3.jpg', title : 'Image Credit: Maria Kazvan', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-3.jpg', url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-1.jpg', title : 'Image Credit: Colin Wojno', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-1.jpg', url : 'http://www.nonsensesociety.com/2011/03/colin/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-2.jpg', title : 'Image Credit: Colin Wojno', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-2.jpg', url : 'http://www.nonsensesociety.com/2011/03/colin/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-3.jpg', title : 'Image Credit: Colin Wojno', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-3.jpg', url : 'http://www.nonsensesociety.com/2011/03/colin/'},
                        {image : 'http://2.bp.blogspot.com/-ag1nIFlPIWA/UjKh-0d5yLI/AAAAAAAAAdk/f4ZM67NEawQ/s1600/birds+white+wallpapers.jpg', title : 'Image Credit: Brooke Shaden', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-1.jpg', url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'},
                        {image : 'http://www.hdwallpapersdownloadz.com/wp-content/uploads/Beautiful-Actress-Amy-Jackson-Cute-Desktop-Wallpapers-1024x768.jpg', title : 'Image Credit: Brooke Shaden', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-2.jpg', url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'},
                        {image : 'http://cache.desktopnexus.com/thumbseg/1817/1817850-bigthumbnail.jpg', title : 'Image Credit: Brooke Shaden', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-3.jpg', url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'}
                    ]

                });


            }

        };
	}
]);

'use strict';

angular.module('webs').directive('webs', [
	function() {
		return {

            restrict: 'AE',
            replace: true,
            transclude:false,
            link:function(scope, element, attrs, ngModel) {

                element.supersized({

                    startwidth: 1024,
                    startheight: 768,
                    verticaal_center: 1,
                    slideshow: 1,
                    navigation: 0,
                    thumbnail_navigation: 0,
                    transition: 1, //0-None, 1-Fade, 2-slide top, 3-slide right, 4-slide bottom, 5-slide left
                    pause_hover: 0,
                    slide_counter: 0,
                    slide_captions: 0,
                    slide_interval: 7000,		// Speed of transition

                    // Components
                    slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
                    slides  	:  	[			// Slideshow Images
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-1.jpg', title : 'Image Credit: Maria Kazvan', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-1.jpg', url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-2.jpg', title : 'Image Credit: Maria Kazvan', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-2.jpg', url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-3.jpg', title : 'Image Credit: Maria Kazvan', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-3.jpg', url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-1.jpg', title : 'Image Credit: Colin Wojno', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-1.jpg', url : 'http://www.nonsensesociety.com/2011/03/colin/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-2.jpg', title : 'Image Credit: Colin Wojno', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-2.jpg', url : 'http://www.nonsensesociety.com/2011/03/colin/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-3.jpg', title : 'Image Credit: Colin Wojno', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-3.jpg', url : 'http://www.nonsensesociety.com/2011/03/colin/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-1.jpg', title : 'Image Credit: Brooke Shaden', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-1.jpg', url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-2.jpg', title : 'Image Credit: Brooke Shaden', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-2.jpg', url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'},
                        {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-3.jpg', title : 'Image Credit: Brooke Shaden', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-3.jpg', url : 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'}
                    ]

                });


			},
            //template:'<div>hi</div>'
            templateUrl:'../modules/webs/views/supersized.client.view.html'
		};
	}
]);

'use strict';

angular.module('webs').filter('filtertags', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);






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


