angular.module('app').factory('BrandService', ['$http', '$q', function ($http, $q) {
    var REST_SERVICE_URI = 'http://localhost:50173/';
    var factory = {
        //getProductNew: getProductNew,
        getAll: getAll,
        getProductInPage: getProductInPage,
    };
    var config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        }
    }
    return factory;
    function getAll(param) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Brand/GetAll?id=' + param)
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
    function getProductInPage(param, page) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Brand/GetProductInPage?id=' + param + "&page=" + page)
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