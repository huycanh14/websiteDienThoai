angular.module('app')
    .controller('headerController', ['$scope', 'HeaderService', '$rootScope', function ($scope, HeaderService, $rootScope) {
        var self = this;
        self.data_wanna_send = { name: 'My Mai', age: 23 };
        //dataShare.data = self. data_wanna_send;
        self.product_categories = [];
        self.product_category_id = "";
        self.brands = [];
        self.yourAccount = yourAccount;
        self.getAll = getAll;
        self.keyword = "";
        self.search = search;
        self.goToCart = goToCart;
        self.replacePage = replacePage;
        getAll();
        function getAll() {
            //console.log(dataShare.data)
            HeaderService.getAll().then(function (res) {
                if (res.data.status == 200) {
                    var select = { id: "", name: "All Categories" };
                    self.product_categories = res.data.product_categories;
                    self.product_categories.unshift(select);
                    self.brands = res.data.brands;
                }
            }, function (res) {
                console.log(res)
            });
        }
        function search() {
            if (self.keyword == "") { return false; }

            //$(location).attr('href', '#!/search');
            $scope.$watch('search', function () {
                $rootScope.$broadcast('dataSearch', { product_category_id: self.product_category_id, keyword: self.keyword });
            });
        }
        function replacePage() {
            if (self.keyword == "") {
                window.history.back();
            }
            //console.log(window.location.href) //http://localhost:50173/#!/search
            $(location).attr('href', '#!/search');
        }
        function yourAccount() {
            HeaderService.hasAccount().then(function (res) {
                if (res.data.status == 200) {
                    if (res.data.data == true) {
                        $(location).attr('href', '#!/profile');
                    }
                    else {
                        $(location).attr('href', '#!/signin');
                    }
                }
            }, function (res) {
                console.log(res)
            });
        }

        function goToCart() {
            $(location).attr('href', '#!/cart');
        }
    }])