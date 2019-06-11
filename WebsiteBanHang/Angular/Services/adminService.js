angular.module('adminApp').factory('AdminService', ['$http', '$q', function ($http, $q) {
    var REST_SERVICE_URI = 'http://localhost:50173/';
    var factory = {
        //login
        findUserLogin: findUserLogin,
        //home
        countOrderNew: countOrderNew,
        countOrderOld: countOrderOld,
        countCustomer: countCustomer,
        countProduct: countProduct,
        countProductInBrand: countProductInBrand,
        countProductIProductCategory: countProductIProductCategory,
        //productes
        getAllProduct: getAllProduct,
        filterProduct: filterProduct,
        deleteProduct: deleteProduct,
        getProductInPage: getProductInPage,
        //Product categories
        getAllProductCategories: getAllProductCategories,
        getProductCategory: getProductCategory,
        updateCategory: updateCategory,
        createCategory: createCategory,
        deleteCategory: deleteCategory,

        //Brands
        getAllBrand: getAllBrand,
        getBrand: getBrand,
        updateBrand: updateBrand,
        createBrand: createBrand,
        deleteBrand: deleteBrand,

        //Order
        getAllOrder: getAllOrder,
        checkOrder: checkOrder,
        deleteOrder: deleteOrder,
        //Order item
        getAllOrder_item: getAllOrder_item,
        //Customer
        getAllCustomer: getAllCustomer,
        filterCustomer: filterCustomer,
        //Account
        getAllAccount: getAllAccount,
        getInfoAccount: getInfoAccount,
        updateAccount: updateAccount,
        createAccount: createAccount,
        hasEmail: hasEmail,
        deleteAccount: deleteAccount
    };
    var config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        }
    }
    return factory;
    function findUserLogin(user) {
        var deferred = $q.defer();
        var data = $.param({
            email: user.email,
            password: user.password
        });
        $http.post(REST_SERVICE_URI + 'Admin/Home/Logoup', data, config)
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
    //home
    function countOrderNew() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Home/CountOrderNew')
            .then(function (response) { deferred.resolve(response); },
                function (errResponse) {deferred.reject(errResponse);}
        );
        return deferred.promise;
    }
    function countOrderOld() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Home/CountOrderOld')
            .then(function (response) { deferred.resolve(response); },
                function (errResponse) { deferred.reject(errResponse); }
            );
        return deferred.promise;
    }
    function countCustomer() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Home/CountCustomer')
            .then(function (response) { deferred.resolve(response); },
                function (errResponse) { deferred.reject(errResponse); }
            );
        return deferred.promise;
    }
    function countProduct() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Home/CountProduct')
            .then(function (response) { deferred.resolve(response); },
                function (errResponse) { deferred.reject(errResponse); }
            );
        return deferred.promise;
    }
    function countProductInBrand() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Home/CountProductInBrand')
            .then(function (response) { deferred.resolve(response); },
                function (errResponse) { deferred.reject(errResponse); }
            );
        return deferred.promise;
    }
    function countProductIProductCategory() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Home/CountProductInProductCategory')
            .then(function (response) { deferred.resolve(response); },
                function (errResponse) { deferred.reject(errResponse); }
            );
        return deferred.promise;
    }
    //product
    function getAllProduct() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Product/GetAllProduct')
            .then(function (response) { deferred.resolve(response); },
                function (errResponse) { deferred.reject(errResponse); }
            );
        return deferred.promise;
    }
    function filterProduct(param, brand_id, product_category_id) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Product/FilterProduct?param=' + param + '&brand_id=' + brand_id + "&product_category_id=" + product_category_id)
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
    function deleteProduct(id) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI + 'Admin/Product/DeleteProduct?id=' + id)
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
    function getProductInPage(param, brand_id, product_category_id, page) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Product/GetProductInPage?param=' + param + '&brand_id=' + brand_id + "&product_category_id=" + product_category_id +"&page=" +page)
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

    //product categories
    function getAllProductCategories() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/ProdutcCategory/GetAll')
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

    function getProductCategory(id) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/ProdutcCategory/GetProductCategory?id=' + id)
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

    function updateCategory(product_category) {
        var deferred = $q.defer();
        var data = $.param({
            id: product_category.id,
            name: product_category.name,
            description: product_category.description,
            status: product_category.status,
        });
        $http.post(REST_SERVICE_URI + 'Admin/ProdutcCategory/UpdateCategory', data, config)
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

    function createCategory(product_category) {
        var deferred = $q.defer();
        var data = $.param({
            name: product_category.name,
            description: product_category.description,
            status: product_category.status,
        });
        $http.post(REST_SERVICE_URI + 'Admin/ProdutcCategory/CreateCategory', data, config)
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

    function deleteCategory(id) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI + 'Admin/ProdutcCategory/DeleteCategory?id=' + id)
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

    //Brand
    function getAllBrand() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Brand/GetAll')
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
    function getBrand(id) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Brand/GetBrand?id=' + id)
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

    function updateBrand(brand) {
        var deferred = $q.defer();
        var data = $.param({
            id: brand.id,
            name: brand.name,
            description: brand.description,
            status: brand.status,
        });
        $http.post(REST_SERVICE_URI + 'Admin/Brand/UpdateBrand', data, config)
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
    function createBrand(brand) {
        var deferred = $q.defer();
        var data = $.param({
            name: brand.name,
            description: brand.description,
            status: brand.status,
        });
        $http.post(REST_SERVICE_URI + 'Admin/Brand/CreateBrand', data, config)
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
    function deleteBrand(id) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI + 'Admin/Brand/DeleteBrand?id=' + id)
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

    //Order
    function getAllOrder(status) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Order/GetListOrder?status=' + status)
            .then(function (response) { deferred.resolve(response); },
                function (errResponse) { deferred.reject(errResponse); }
            );
        return deferred.promise;
    }
    function checkOrder(order_id) {
        var deferred = $q.defer();
        var data = $.param({
            order_id: order_id
        });
        $http.post(REST_SERVICE_URI + 'Admin/Order/CheckOrder', data, config)
            .then(function (response) { deferred.resolve(response); },
                function (errResponse) { deferred.reject(errResponse); }
            );
        return deferred.promise;
    }
    function deleteOrder(order_id) {
        var deferred = $q.defer();
        var data = $.param({
            order_id: order_id
        });
        $http.post(REST_SERVICE_URI + 'Admin/Order/DeleteOrder', data, config)
            .then(function (response) { deferred.resolve(response); },
                function (errResponse) { deferred.reject(errResponse); }
            );
        return deferred.promise;
    }

    //Order_item
    function getAllOrder_item(order_id) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Order_item/GetListOrder_item?order_id=' + order_id)
            .then(function (response) { deferred.resolve(response); },
                function (errResponse) { deferred.reject(errResponse); }
            );
        return deferred.promise;
    }
    //Customer
    function getAllCustomer() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Customer/GetAllCustomer')
            .then(function (response) { deferred.resolve(response); },
                function (errResponse) { deferred.reject(errResponse); }
            );
        return deferred.promise;
    }
    function filterCustomer(param) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Customer/FilterCustomer?param=' + param)
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

    //Account
    function getAllAccount() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Account/GetAllAccount')
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

    function getInfoAccount(param) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Account/GetInfoAccount?id=' + param)
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
            status: account.status,
        });
        $http.post(REST_SERVICE_URI + 'Admin/Account/UpdateAccount', data, config)
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
            status: account.status,
        });
        $http.post(REST_SERVICE_URI + 'Admin/Account/InsertAccount', data, config)
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

    function hasEmail(email) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'Admin/Account/HasEmail?email=' + email)
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

    function deleteAccount(id) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI + 'Admin/Account/DeleteAccount?id=' + id)
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