angular.module('app').factory('ProductService', ['$http', '$q', function ($http, $q) {
    var REST_SERVICE_URI = 'http://localhost:50173/';
    var factory = {
        getProduct: getProduct,
        //getProductInPage: getProductInPage,
    };
    var config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        }
    }
    return factory;
    
    function getProduct(id) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Product/GetProduct?id=' + id)
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