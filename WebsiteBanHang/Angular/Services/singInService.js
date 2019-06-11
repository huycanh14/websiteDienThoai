angular.module('app').factory('SingInService', ['$http', '$q', function ($http, $q) {
    var REST_SERVICE_URI = 'http://localhost:50173/';
    var factory = {
        hasEmail: hasEmail,
        createAccount: createAccount,
        Logoup: Logoup,
        hasAccount: hasAccount,
    };
    var config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        }
    }
    return factory;
    function hasEmail(email) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Customer/hasEmail?email=' + email)
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

    function createAccount(account) {
        var deferred = $q.defer();
        var data = $.param({
            email: account.email,
            fullname: account.fullname,
            password: account.password,
            gender: account.gender,
            date_of_birth: account.date_of_birth,
            phone: account.phone,
            address: account.address,
        });
        $http.post(REST_SERVICE_URI + 'Customer/InsertAccount', data, config)
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

    function Logoup(user) {
        var deferred = $q.defer();
        var data = $.param({
            email: user.email,
            password: user.password,
        });
        $http.post(REST_SERVICE_URI + 'Customer/Logoup', data, config)
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

    function hasAccount() {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI + 'Customer/HasAccount')
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