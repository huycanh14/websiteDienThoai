angular.module('app')
    .controller('orderController', ['$scope', 'OrderService', '$routeParams', function ($scope, OrderService, $routeParams) {
        var self = this;
        self.orders = [];
        self.getOrders = getOrders;
        self.deleteProduct = deleteProduct;
        self.total = 0; self.account = {}
        self.saveChangOrders = saveChangOrders;
        self.hasSession = false;
        self.totalOrders = totalOrders;
        self.convertCurrency = convertCurrency;
        self.handleSubmit = handleSubmit;
        self.getAccount = getAccount;
        getOrders();
        function getOrders() {
            if (sessionStorage.getItem('orders') == null) {
                self.hasSession = false;
            } else {
                self.hasSession = true;
                self.orders = JSON.parse(sessionStorage.getItem('orders'));
                totalOrders();
                getAccount();
            }
        }

        function deleteProduct(order) {
            for (let i = 0; i < self.orders.length; i++) {
                if (order.id == self.orders[i].id) {
                    self.orders.splice(i, 1);
                    break;
                }
            }
            totalOrders();
            console.log(self.orders)
        }

        function saveChangOrders() {
            sessionStorage.setItem('orders', JSON.stringify(self.orders));
        }

        function totalOrders() {
            for (let i = 0; i < self.orders.length; i++) {
                self.total += self.orders[i].qty * self.orders[i].price;
            }
        }
        function convertCurrency(currency) {
            return currency.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
        function handleSubmit() {
            OrderService.hasAccount().then(function (res) {
                if (res.data.status == 200) {
                    if (res.data.data == false) {
                        toastr.warning("Bạn vui lòng đăng nhập để tiếp tục");
                    } else {
                        var cart = JSON.parse(sessionStorage.getItem('orders'));
                        self.account.qty = cart.length;
                        var total_cart = 0
                        for (let i = 0; i < cart.length; i++) {
                            total_cart += cart[i].qty * cart[i].price;
                        }
                        self.account.total = total_cart;
                        OrderService.addOrders(self.account).then(function (res) {
                            if (res.data.status == 200) {
                                var order_id = res.data.data;
                                OrderService.addOrder_item(order_id, cart).then(function (res) {
                                    if (res.data.status == 200) {
                                        toastr.success("Đơn hàng đã được lưu. Cảm ơn bạn đã tin tưởng và mua hàng của chúng tôi");
                                        sessionStorage.removeItem('orders');
                                    }
                                }, function (res) {
                                    console.log(res)
                                })
                            }
                        }, function (res) {
                            console.log(res)
                        });
                    }
                }
            }, function (res) {
                console.log(res)
            });
        }
        function getAccount() {
            OrderService.hasAccount().then(function (res) {
                if (res.data.status == 200) {
                    if (res.data.data == false) {
                        return false;
                    } else {
                        OrderService.getAccount().then(function (res) {
                            if (res.data.status == 200) {
                                self.account = res.data.data;
                            }
                        }, function (res) {
                            console.log(res)
                        });
                    }
                }
            }, function (res) {
                console.log(res)
            });
        }
    }])
