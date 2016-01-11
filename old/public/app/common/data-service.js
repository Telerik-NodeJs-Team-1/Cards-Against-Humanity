(function() {
    'use strict';

    function data($q, $http) {
        function makeRequest(method, url, headers, body) {
            if(!headers){
                headers = {};
            }

            var deferred = $q.defer();

            $http({
                method: method,
                url: url,
                headers: headers,
                data: body
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response.message);
            });

            return deferred.promise;
        }

        function get(url, headers, body) {
            return makeRequest('GET', url, headers, body);
        }

        function post(url, headers, body) {
            return makeRequest('POST', url, headers, body);
        }

        function put(url, headers, body) {
            return makeRequest('PUT', url, headers, body);
        }

        function del(url, headers, body) {
            return makeRequest('DELETE', url, headers, body);
        }

        return {
            get: get,
            post: post,
            put: put,
            del: del
        };
    }

    angular.module('cardsAgainstHumanity.services')
        .factory('data', ['$q', '$http', data]);
}());