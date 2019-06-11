angular.module('app').factory('ProductCategoryService', ['$http', '$q', function ($http, $q) {
    var REST_SERVICE_URI = 'http://localhost:50173/';
    var factory = {
        //getProductNew: getProductNew,
    };
    var config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        }
    }
    return factory;
    //function getProductNew() {
    //    var deferred = $q.defer();
    //    $http.get(REST_SERVICE_URI + 'Home/GetProductNew')
    //        .then(
    //            function (response) {
    //                deferred.resolve(response);
    //            },
    //            function (errResponse) {
    //                console.error('Error while fetching');
    //                deferred.reject(errResponse);
    //            }
    //        );
    //    return deferred.promise;
    //}
}]);