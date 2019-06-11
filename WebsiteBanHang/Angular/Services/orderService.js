angular.module('app').factory('OrderService', ['$http', '$q', function ($http, $q) {
    var REST_SERVICE_URI = 'http://localhost:50173/';
    var factory = {
        //getAll: getAll,
        hasAccount: hasAccount,
        getAccount: getAccount,
        addOrders: addOrders, 
        addOrder_item: addOrder_item, 
    };
    var config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        }
    }
    return factory;
    function hasAccount() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Customer/HasAccount')
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
    function getAccount() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Customer/GetAccount')
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
    function addOrders(account) {
        var deferred = $q.defer();
        var data = $.param({
            qty: account.qty,
            price: account.total,
            customer_id: account.id,
            name: account.fullname,
            phone: account.phone,
            address: account.address,
        });
        $http.post(REST_SERVICE_URI + 'Order/AddOrder', data, config)
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

    function addOrder_item(order_id, cart) {
        var deferred = $q.defer();
        for (let i = 0; i < cart.length; i++) {
            
            var data = $.param({
                order_id: order_id,
                product_id: cart[i].id,
                code: cart[i].code,
                qty: cart[i].qty,
                price: cart[i].price,
                size: cart[i].size,
                color: cart[i].color,
            });
            $http.post(REST_SERVICE_URI + 'Order_item/AddOrder_item', data, config)
                .then(
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (errResponse) {
                        console.error('Error while fetching');
                        deferred.reject(errResponse);
                    }
                );
        }
        return deferred.promise; 
    }
}]);