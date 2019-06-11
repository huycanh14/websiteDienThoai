angular.module('app').factory('SearchService', ['$http', '$q', function ($http, $q) {
    var REST_SERVICE_URI = 'http://localhost:50173/';
    var factory = {
        //getProductNew: getProductNew,
        getProduct: getProduct,
        getProductInPage: getProductInPage,
    };
    var config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        }
    }
    return factory;
    function getProduct(product_category_id, keyword) {
        var deferred = $q.defer();
        if (product_category_id == "") {
            $http.get(REST_SERVICE_URI + 'Product/SearchProductNoCategoryAll?keyword=' + keyword)
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
        } else {
            $http.get(REST_SERVICE_URI + 'Product/SearchProductHasCategoryAll?category=' + product_category_id+ '&keyword=' + keyword)
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
        
    }
    function getProductInPage(product_category_id, keyword, page) {
        var deferred = $q.defer();
        if (product_category_id == "") {
            $http.get(REST_SERVICE_URI + 'Product/SearchProductNoCategoryInPage?keyword=' + keyword + "&page=" + page)
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
        } else {
            $http.get(REST_SERVICE_URI + 'Product/SearchProductHasCategoryInPage?category=' + product_category_id + '&keyword=' + keyword + "&page=" + page)
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
    }
}]);