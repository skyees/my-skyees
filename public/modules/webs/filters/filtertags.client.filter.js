'use strict';

angular.module('webs').filter('filtertags', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);





