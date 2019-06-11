angular.module('app')
    .controller('productController', ['$scope', 'ProductService', '$routeParams', '$sce', function ($scope, ProductService, $routeParams, $sce) {
        var self = this;
        self.product = {}
        self.getProduct = getProduct;
        self.convertCurrency = convertCurrency;
        self.description;
        self.qty = 1;
        self.minus = minus;
        self.plus = plus;
        self.addToCart = addToCart;
        self.content
        getProduct();
        function plus() {
            self.qty += 1;
        }
        function minus() {
            if (self.qty == 1) return false;
            else self.qty -= 1;
        }
        function getProduct() {
            var param = $routeParams.id;
            ProductService.getProduct(param).then(function (res) {
                if (res.data.status == 200) {
                    self.product = res.data.data[0];
                    self.description = $sce.trustAsHtml(self.product.description);
                    self.content = $sce.trustAsHtml(self.product.content);
                    console.log(self.product)
                }
            }, function (res) {
                console.log(res)
            });
        }
        function convertCurrency(currency) {
            return currency.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }

        function addToCart() {
            var addproduct = self.product;
            addproduct.qty = self.qty;
            var orders = [];
            if (sessionStorage.getItem('orders') == null) {
                orders.push(addproduct);
            } else {
                var hasProduct = false;
                orders = JSON.parse(sessionStorage.getItem('orders'));
                for (let i = 0; i < orders.length; i++) {
                    if (orders[i].id == addproduct.id) {
                        orders[i].qty += self.qty;
                        hasProduct = true;
                        break;
                    }
                }
                if (hasProduct == false) {
                    orders.push(addproduct);
                }
            }
            sessionStorage.setItem('orders', JSON.stringify(orders));
            console.log(orders);
        }

    }])
