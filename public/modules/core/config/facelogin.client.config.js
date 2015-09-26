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
    .run( function( $rootScope ) {
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
    }).value('froalaConfig', {
         inlineMode: false,
          placeholder: 'Enter Text Here'
});

