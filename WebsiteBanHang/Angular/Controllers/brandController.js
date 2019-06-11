angular.module('app')
    .controller('brandController', ['$scope', 'BrandService', '$routeParams', function ($scope, BrandService, $routeParams) {
        var self = this;
        self.dataShare = $scope.data_receive;
        self.products = [];
        self.product_category_id = "";
        self.getAll = getAll;
        self.total_pages = 0;
        self.showTotalPage = showTotalPage;
        self.getProductInPage = getProductInPage;
        self.convertCurrency = convertCurrency;
        self.addToCart = addToCart;
        getAll();
        
        function getAll() {
            console.log(self.dataShare)
            var param = $routeParams.id;
            BrandService.getAll(param).then(function (res) {
                if (res.data.status == 200) {
                    self.products = res.data.data;
                    var total = res.data.count;
                    if (total % 8 == 0) {
                        self.total_pages = Math.floor(total / 8);
                    } else {
                        self.total_pages = Math.floor(total / 8 + 1);
                    }
                    showTotalPage(self.total_pages);
                }
            }, function (res) {
                console.log(res)
            });
        }
        function showTotalPage(number) {
            if (number > 1) {
                $('#pagination').twbsPagination('destroy');
                console.log($('#pagination'))
                //console.log(this.data('twbs-pagination'));
                window.pagObj = $('#pagination').twbsPagination({
                    totalPages: number,
                    visiblePages: 10,
                    onPageClick: function (event, page) {
                    }
                }).on('page', function (event, page) {
                    getProductInPage(page)
                });
                $('#pagination').show();
            }
            else {
                $('#pagination').hide();
            }
        }
        function getProductInPage(page) {
            var param = $routeParams.id;
            BrandService.getProductInPage(param, page).then(function (res) {
                if (res.data.status == 200) {
                    self.products = res.data.data;
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
