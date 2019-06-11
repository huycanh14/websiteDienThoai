angular.module('app')
    .controller('homeController', ['$scope', 'HomeService', function ($scope, HomeService) {
        var self = this;
        self.products = [];
        self.product_category_id = "";
        self.brands = [];
        self.getAll = getAll;
        self.convertCurrency = convertCurrency;
        self.addToCart = addToCart;
        getAll();
        function getAll() {
            HomeService.getProductNew().then(function (res) {
                if (res.data.status == 200) {
                    //var select = { id: "", name: "All Categories" };
                    self.products = res.data.data;
                    //self.product_categories.unshift(select);
                    //console.log(self.product_categories)
                    //self.brands = res.data.brands;
                }
            }, function (res) {
                console.log(res)
            });
        }
        function convertCurrency(currency) {
            return currency.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }

        function addToCart(product) {
            product.qty = 1;
            var orders = [];
            if (sessionStorage.getItem('orders') == null) {
                orders.push(product);
            } else {
                var hasProduct = false;
                orders = JSON.parse(sessionStorage.getItem('orders'));
                for (let i = 0; i < orders.length; i++) {
                    if (orders[i].id == product.id) {
                        orders[i].qty += 1;
                        hasProduct = true;
                        break;
                    }
                }
                if (hasProduct == false) {
                    orders.push(product);
                }
            }
            sessionStorage.setItem('orders', JSON.stringify(orders));
            console.log(orders);
        }
    }])