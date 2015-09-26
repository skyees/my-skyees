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
