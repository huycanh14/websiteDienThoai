angular.module('app').factory('HeaderService', ['$http', '$q', function ($http, $q) {
    var REST_SERVICE_URI = 'http://localhost:50173/';
    var factory = {
        getAll: getAll,
        hasAccount: hasAccount
    };
    var config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        }
    }
    return factory;
    function getAll() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Home/Header')
            .then(
                function (response) {
                    deferred.resolve(response);
                    //console.log(response)
                },
                function (errResponse) {
                    console.error('Error while fetching');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }
    function hasAccount() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Customer/HasAccount')
            .then(
                function (response) {
                    deferred.resolve(response);
                },
                function (errResponse) {
                    console.error('Error while fetching');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }
}]);