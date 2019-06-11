angular.module('app').factory('ProFileService', ['$http', '$q', function ($http, $q) {
    var REST_SERVICE_URI = 'http://localhost:50173/';
    var factory = {
        hasAccount: hasAccount,
        getAccount: getAccount,
        updateAccount: updateAccount,
        Logout: Logout,
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
                },
                function (errResponse) {
                    console.error('Error while fetching');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function updateAccount(account) {
        var deferred = $q.defer();
        var data = $.param({
            id: account.id,
            email: account.email,
            fullname: account.fullname,
            password: account.password,
            gender: account.gender,
            date_of_birth: account.date_of_birth,
            phone: account.phone,
            address: account.address,
        });
        $http.post(REST_SERVICE_URI + 'Customer/UpdateAccount', data, config)
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
    function Logout() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Customer/LogOut')
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