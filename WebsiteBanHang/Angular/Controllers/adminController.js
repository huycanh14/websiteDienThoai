angular.module('adminApp')
    .controller('loginController', ['$scope', 'AdminService', function ($scope, AdminService) {
        var self = this;
        self.user = { email: null, password: "" }
        //self.submite
        self.submit = submit;
        function findUserLogin(user) {
            AdminService.findUserLogin(user)
                .then(function (res) {
                    //console.log(res)
                    if (res.data.status == 200) {
                        toastr.success(
                            "Bạn đăng nhập thành công",
                            "Thành công!",
                            { timeOut: 5000 }
                        );
                        window.location.replace("/Admin/Home/");
                    }
                    else {
                        toastr.error(
                            "Bạn đăng nhập thất bại",
                            "Thất bại!",
                            { timeOut: 5000 }
                        );
                    }
                }, function (res) {
                    console.log(res)
                })
        }
        function submit() {
            findUserLogin(self.user);
        }
    }])
    .controller('HomeController', ['$scope', 'AdminService', function ($scope, AdminService) {
        var self = this;
        self.count_order_new = 0; self.count_order_old = 0; self.count_customer = 0; self.count_product = 0;
        self.brands = []; self.product_categories = [];
        countOrder();
        countProductInBrand();
        countProductIProductCategory();
        function countOrder() {
            AdminService.countOrderNew().then(function (res) {
                if (res.data.status == 200) {
                    self.count_order_new = res.data.count;
                }
            }, function (res) {
                console.log(res)
            });

            AdminService.countOrderOld().then(function (res) {
                if (res.data.status == 200) {
                    self.count_order_old = res.data.count;
                }
            }, function (res) {
                console.log(res)
            });
            AdminService.countCustomer().then(function (res) {
                if (res.data.status == 200) {
                    self.count_customer = res.data.count;
                }
            }, function (res) {
                console.log(res)
            });
            AdminService.countProduct().then(function (res) {
                if (res.data.status == 200) {
                    self.count_product = res.data.count;
                }
            }, function (res) {
                console.log(res)
            });
        }
        function countProductInBrand() {
            AdminService.countProductInBrand().then(function (res) {
                if (res.data.status == 200) {
                    self.brands = res.data.data;
                }
            }, function (res) {
                console.log(res)
            });
        }

        function countProductIProductCategory() {
            AdminService.countProductIProductCategory().then(function (res) {
                if (res.data.status == 200) {
                    self.product_categories = res.data.data;
                }
            }, function (res) {
                console.log(res)
            });
        }
    }])
    .controller('ProductController', ['$scope', 'AdminService', function ($scope, AdminService) {
        var self = this;
        self.products = []; self.search = "";
        self.getkeys = getkeys;
        self.deleteProduct = deleteProduct;
        self.brands = [];
        self.total_pages = 0;
        self.product_categories = [];
        self.selectedBrand = self.brands[0];
        self.convertCurrency = convertCurrency;
        self.selectedProductCategory = self.product_categories[0];
        self.showTotalPage = showTotalPage;
        self.getProductInPage = getProductInPage;
        getAll();
        self.selectedItemChanged = selectedItemChanged;
        function getAll() {
            AdminService.getAllProduct().then(function (res) {
                if (res.data.status == 200) {
                    self.products = res.data.data;
                    var total = res.data.total;
                    if (total % 10 == 0) {
                        self.total_pages = Math.floor(total / 10);
                    } else {
                        self.total_pages = Math.floor(total / 10 + 1);
                    }
                }
                showTotalPage(self.total_pages);
            }, function (res) {
                console.log(res)
            });

            AdminService.countProductInBrand().then(function (res) {
                if (res.data.status == 200) {
                    self.brands = res.data.data;
                }
            }, function (res) {
                console.log(res)
            });

            AdminService.countProductIProductCategory().then(function (res) {
                if (res.data.status == 200) {
                    self.product_categories = res.data.data;
                }
            }, function (res) {
                console.log(res)
            });
        }
        function showTotalPage(number) {
            if (number > 1) {
                $('#pagination').twbsPagination('destroy');
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
            var param = self.search;
            if (self.selectedBrand != null) {
                var brand_id = self.selectedBrand.id;
            }
            else {
                var brand_id = "null";
            }
            if (self.selectedProductCategory != null) {
                var product_category_id = self.selectedProductCategory.id;
            }
            else {
                var product_category_id = "null";
            }
            AdminService.getProductInPage(param, brand_id, product_category_id, page).then(function (res) {
                if (res.data.status == 200) {
                    self.products = res.data.data;
                }
            }, function (res) {
                console.log(res)
            });
        }
        function getkeys() {
            var param = self.search;
            if (self.selectedBrand != null) {
                var brand_id = self.selectedBrand.id;
            }
            else {
                var brand_id = "null";
            }
            if (self.selectedProductCategory != null) {
                var product_category_id = self.selectedProductCategory.id;
            }
            else {
                var product_category_id = "null";
            }
            AdminService.filterProduct(param, brand_id, product_category_id).then(function (res) {
                if (res.data.status == 200) {
                    self.products = res.data.data;
                    var total = res.data.total;
                    if (total % 10 == 0) {
                        self.total_pages = Math.floor(total / 10);
                    } else {
                        self.total_pages = Math.floor(total / 10 + 1);
                    }
                    showTotalPage(self.total_pages);
                }
            }, function (res) {
                console.log(res)
            });
        }
        function selectedItemChanged() {
            console.log(self.selectedBrand)
        }

        function deleteProduct(id) {
            bootbox.confirm({
                message: "Do you want to delete?",
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'No',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    if (result == true) {
                        AdminService.deleteProduct(id).then(function (res) {
                            if (res.data.status == 200) {
                                toastr.success("Xóa thành công");
                                getAll();
                            }
                        }, function (res) {
                            console.log(res)
                        });
                    }
                }
            });
        }

        function convertCurrency(currency) {
            return currency.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
    }])
    .controller('ProductAddController', ['$scope', 'AdminService', function ($scope, AdminService) {
        var self = this;
        self.content = "";
        self.Submit = Submit;
        self.test = "jskdk"
        self.product = { code: "", name: "", product_category_id: "", brand_id: "", price: "", qty: "", size: "", color: "", img: "", description: "", status: null }
        self.brands = [];
        self.product_categories = [];
        self.selectedBrand = self.brands[0];
        self.selectedProductCategory = self.product_categories[0];
        self.selectItem = selectItem;
        getAll();
        function getAll() {
            AdminService.countProductInBrand().then(function (res) {
                if (res.data.status == 200) {
                    //self.brands = res.data.data;
                }
            }, function (res) {
                console.log(res)
            });

            AdminService.countProductIProductCategory().then(function (res) {
                if (res.data.status == 200) {
                    //self.product_categories = res.data.data;
                }
            }, function (res) {
                console.log(res)
            });
        }
        function selectItem() {
            if (self.selectedBrand != null) {
                self.product.brand_id = self.selectedBrand.id;
            }
            else {
                self.product.brand_id = "null";
            }
            if (self.selectedProductCategory != null) {
                self.product.product_category_id = self.selectedProductCategory.id;
            }
            else {
                self.product.product_category_id = "null";
            }
        }
        function Submit() {
            var file = $scope.content;
            console.log(file + self.content)
        }
    }])
    .controller('ProductEditController', ['$scope', 'AdminService', function ($scope, AdminService) { }])
    .controller('ProductCategoryController', ['$scope', 'AdminService', function ($scope, AdminService) {
        var self = this;
        self.product_categories = [];
        self.getAll = getAll;
        //self.editProductCategory = editProductCategory;
        self.getProductCategory = getProductCategory;
        self.product_category = { id: null, name: "", description: "", status: 0 }
        self.updateCategory = updateCategory;
        self.createCategory = createCategory;
        self.showCreate = showCreate;
        self.deleteCategory = deleteCategory;
        getAll();
        function getAll() {
            AdminService.getAllProductCategories().then(function (res) {
                if (res.data.status == 200) {
                    self.product_categories = res.data.data;
                }
            }, function (res) {
                console.log(res)
            });
        }

        function getProductCategory(id) {
            AdminService.getProductCategory(id).then(function (res) {
                if (res.data.status == 200) {
                    self.product_category = res.data.data[0];
                    var formEditCategory = document.getElementById("formEditCategory");
                    if (id == null || id == "") return false;
                    else {
                        bootbox
                            .dialog({
                                title: 'Form Edit Product Category',
                                message: formEditCategory,
                                show: false,
                                backdrop: true,
                                animate: false,
                                size: 'big',
                                onEscape: true,
                                show: false, // We will show it manually later

                            })
                            .on('shown.bs.modal', function () {
                                formEditCategory.style.display = 'block';
                            })
                            .on('hide.bs.modal', function () {
                                formEditCategory.style.display = 'none';
                                document.body.appendChild(formEditCategory);
                            })
                            .modal('show');
                    }
                }
            }, function (res) {
                console.log(res)
            });
        }

        function updateCategory() {
            if (self.product_category.name == null || self.product_category.name == "" || self.product_category.name == "undefined")
                return false;
            else {
                AdminService.updateCategory(self.product_category).then(function (res) {
                    if (res.data.status == 200) {
                        getAll();
                        toastr.success("Sửa danh mục sản phẩm thành công");
                    }
                }, function (res) {
                    toastr.error("Sửa danh mục sản phẩm thất bại: " + res);
                });
            }
        }

        function showCreate() {
            var formAddCategory = document.getElementById("formAddCategory");
            self.product_category = { id: null, name: "", description: "", status: 0 }
            bootbox
                .dialog({
                    title: 'Form Add Product Category',
                    message: formAddCategory,
                    show: false,
                    backdrop: true,
                    animate: false,
                    size: 'big',
                    //onEscape: true,
                    show: false, // We will show it manually later

                })
                .on('shown.bs.modal', function () {
                    formAddCategory.style.display = 'block';
                })
                .on('hide.bs.modal', function () {
                    formAddCategory.style.display = 'none';
                    document.body.appendChild(formAddCategory);
                })
                .modal('show');
        }

        function createCategory() {
            if (self.product_category.name == null || self.product_category.name == "" || self.product_category.name == "undefined")
                return false;
            else {
                AdminService.createCategory(self.product_category).then(function (res) {
                    if (res.data.status == 200) {
                        getAll();
                        toastr.success("Thêm danh mục sản phẩm thành công");
                    }
                }, function (res) {
                    toastr.error("Thêm danh mục sản phẩm thất bại: " + res);
                });
            }
        }

        function deleteCategory(id) {
            bootbox.confirm({
                message: "Do you want to delete?",
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'No',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    if (result == true) {
                        AdminService.deleteCategory(id).then(function (res) {
                            if (res.data.status == 200) {
                                toastr.success("Xóa thành công");
                                getAll();
                            }
                        }, function (res) {
                            console.log(res)
                        });
                    }
                }
            });
        }
    }])
    .controller('BrandController', ['$scope', 'AdminService', function ($scope, AdminService) {
        var self = this;
        self.brands = [];
        self.getAll = getAll;
        self.getBrand = getBrand;
        self.brand = { id: null, name: "", description: "", status: 0 }
        self.updateBrand = updateBrand;
        self.createBrand = createBrand;
        self.showCreate = showCreate;
        self.deleteBrand = deleteBrand;
        getAll();
        function getAll() {
            AdminService.getAllBrand().then(function (res) {
                if (res.data.status == 200) {
                    self.brands = res.data.data;
                }
            }, function (res) {
                console.log(res)
            });
        }
        function getBrand(id) {
            AdminService.getBrand(id).then(function (res) {
                if (res.data.status == 200) {
                    self.brand = res.data.data[0];
                    var formEditBrand = document.getElementById("formEditBrand");
                    if (id == null || id == "") return false;
                    else {
                        bootbox
                            .dialog({
                                title: 'Form Edit Brand',
                                message: formEditBrand,
                                show: false,
                                backdrop: true,
                                animate: false,
                                size: 'big',
                                onEscape: true,
                                show: false, // We will show it manually later

                            })
                            .on('shown.bs.modal', function () {
                                formEditBrand.style.display = 'block';
                            })
                            .on('hide.bs.modal', function () {
                                formEditBrand.style.display = 'none';
                                document.body.appendChild(formEditBrand);
                            })
                            .modal('show');
                    }
                }
            }, function (res) {
                console.log(res)
            });
        }
        function updateBrand() {
            if (self.brand.name == null || self.brand.name == "" || self.brand.name == "undefined")
                return false;
            else {
                AdminService.updateBrand(self.brand).then(function (res) {
                    if (res.data.status == 200) {
                        getAll();
                        toastr.success("Sửa thương hiệu sản phẩm thành công");
                    }
                }, function (res) {
                    toastr.error("Sửa thương hiệu sản phẩm thất bại: " + res);
                });
            }
        }
        function showCreate() {
            var formAddBand = document.getElementById("formAddBrand");
            self.product_category = { id: null, name: "", description: "", status: 0 }
            bootbox
                .dialog({
                    title: 'Form Add Brand',
                    message: formAddBand,
                    show: false,
                    backdrop: true,
                    animate: false,
                    size: 'big',
                    //onEscape: true,
                    show: false, // We will show it manually later

                })
                .on('shown.bs.modal', function () {
                    formAddBand.style.display = 'block';
                })
                .on('hide.bs.modal', function () {
                    formAddBand.style.display = 'none';
                    document.body.appendChild(formAddBand);
                })
                .modal('show');
        }

        function createBrand() {
            if (self.brand.name == null || self.brand.name == "" || self.brand.name == "undefined")
                return false;
            else {
                AdminService.createBrand(self.brand).then(function (res) {
                    if (res.data.status == 200) {
                        getAll();
                        toastr.success("Thêm thương hiệu sản phẩm thành công");
                    }
                }, function (res) {
                    toastr.error("Thêm thương hiệu sản phẩm thất bại: " + res);
                });
            }
        }
        function deleteBrand(id) {
            bootbox.confirm({
                message: "Do you want to delete?",
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'No',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    if (result == true) {
                        AdminService.deleteBrand(id).then(function (res) {
                            if (res.data.status == 200) {
                                toastr.success("Xóa thành công");
                                getAll();
                            }
                        }, function (res) {
                            console.log(res)
                        });
                    }
                }
            });
        }
    }])
    .controller('OrderController', ['$scope', 'AdminService', '$routeParams', function ($scope, AdminService, $routeParams) {
        var param = $routeParams.id;
        var status = 0;
        if (param == '2') {
            status = 1;
        }
        var self = this;
        self.title = "";
        self.orders = [];
        self.getAll = getAll;
        self.status = status;
        self.convertDateTime = convertDateTime;
        self.convertCurrency = convertCurrency;
        self.checkOrder = checkOrder;
        self.deleteOrder = deleteOrder;
        getAll();
        function getAll() {
            AdminService.getAllOrder(status).then(function (res) {
                if (res.data.status == 200) {
                    self.orders = res.data.data;
                    self.title = res.data.title;
                }
            }, function (res) {
                console.log(res)
            });
        }

        function convertDateTime(dateString) {
            dateString = dateString.substr(6);
            var currentTime = new Date(parseInt(dateString));
            var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
            var day = ("0" + currentTime.getDate()).slice(-2);
            var year = currentTime.getFullYear();
            var date = day + "/" + month + "/" + year;
            return date;
        }
        function convertCurrency(currency) {
            return currency.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
        function checkOrder(order_id) {
            AdminService.checkOrder(order_id).then(function (res) {
                if (res.data.status == 200) {
                    toastr.success("Check Order thành công");
                    getAll();
                }
            }, function (res) {
                console.log(res)
                toastr.error("Check Order thất bại: " + res);
            });
        }
        function deleteOrder(order_id) {
            AdminService.deleteOrder(order_id).then(function (res) {
                if (res.data.status == 200) {
                    toastr.success("Xóa đơn hàng thành công");
                    getAll();

                }
            }, function (res) {
                console.log(res)
                toastr.success("Xóa đơn hàng thất bại");
            });
        }
    }])
    .controller('Order_itemController', ['$scope', 'AdminService', '$routeParams', function ($scope, AdminService, $routeParams) {
        var param = $routeParams.id;
        var self = this;
        self.order_items = [];
        self.title = "";
        self.getAll = getAll;
        self.goBack = goBack;
        getAll();
        function getAll() {
            AdminService.getAllOrder_item(param).then(function (res) {
                if (res.data.status == 200) {
                    console.log(res)
                    self.order_items = res.data.data;
                    self.title = res.data.title;
                }
            }, function (res) {
                console.log(res)
            });
        }
        function goBack() {
            window.history.back();
        }

    }])
    .controller('CustomerController', ['$scope', 'AdminService', function ($scope, AdminService) {
        var self = this;
        self.customers = [];
        self.getAll = getAll;
        self.convertDateTime = convertDateTime;
        self.getkeys = getkeys;
        self.search = "";
        getAll();
        function getAll() {
            AdminService.getAllCustomer().then(function (res) {
                if (res.data.status == 200) {
                    self.customers = res.data.data;
                }
            }, function (res) {
                console.log(res)
            });
        }
        function convertDateTime(dateString) {
            dateString = dateString.substr(6);
            var currentTime = new Date(parseInt(dateString));
            var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
            var day = ("0" + currentTime.getDate()).slice(-2);
            var year = currentTime.getFullYear();
            var date = day + "/" + month + "/" + year;
            return date;
        }
        function getkeys() {
            var param = self.search;
            AdminService.filterCustomer(param).then(function (res) {
                if (res.data.status == 200) {
                    self.customers = res.data.data; s
                }
            }, function (res) {
                console.log(res)
            });
        }
    }])
    .controller('AccountController', ['$scope', 'AdminService', function ($scope, AdminService) {
        var self = this;
        self.getAll = getAll;
        self.accounts = [];
        self.convertDateTime = convertDateTime;
        self.deleteAccount = deleteAccount;
        getAll();
        function getAll() {
            AdminService.getAllAccount().then(function (res) {
                if (res.data.status == 200) {
                    self.accounts = res.data.data;
                }
            }, function (res) {
                console.log(res)
            });
        }
        function convertDateTime(dateString) {
            dateString = dateString.substr(6);
            var currentTime = new Date(parseInt(dateString));
            var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
            var day = ("0" + currentTime.getDate()).slice(-2);
            var year = currentTime.getFullYear();
            var date = day + "/" + month + "/" + year;
            return date;
        }
        function deleteAccount(id) {
            console.log(1)
            bootbox.confirm({
                message: "Do you want to delete?",
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'No',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    if (result == true) {
                        AdminService.deleteAccount(id).then(function (res) {
                            if (res.data.status == 200) {
                                toastr.success("Xóa thành công");
                                getAll();
                            } else {
                                toastr.error("Xóa thất bại")
                            }
                        }, function (res) {
                            console.log(res)
                        });
                    }
                }
            });
            
        }
    }])
    .controller('AccountEditController', ['$scope', 'AdminService', '$routeParams', function ($scope, AdminService, $routeParams) {
        var param = $routeParams.id;
        var self = this;
        self.date_of_birth = new Date();
        self.account = { id: "", email: "", fullname: "", password: "", gender: 0, date_of_birth: "", phone: "", address: "", status: 0 };
        self.submit = submit;
        self.getInfo = getInfo;
        self.convertDateTime = convertDateTime;
        self.editAccount = editAccount;
        self.changePassword = false;
        self.password = "";
        self.convertCurrentTime = convertCurrentTime;
        getInfo();
        function getInfo() {
            AdminService.getInfoAccount(param).then(function (res) {
                if (res.data.status == 200) {
                    self.account = res.data.data;
                    self.date_of_birth = convertDateTime(self.account.date_of_birth);
                }
            }, function (res) {
                console.log(res)
            });
        }
        function submit() {
        }
        function convertDateTime(dateString) {
            dateString = dateString.substr(6);
            var currentTime = new Date(parseInt(dateString));
            var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
            var day = ("0" + currentTime.getDate()).slice(-2);
            var year = currentTime.getFullYear();
            var date = year + "-" + month + "-" + day;
            return new Date(date);
        }
        function convertCurrentTime(currentTime) {
            var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
            var day = ("0" + currentTime.getDate()).slice(-2);
            var year = currentTime.getFullYear();
            var date = year + "-" + month + "-" + day;
            return date;
        }
        function editAccount() {
            var account = self.account;
            if (account.name != "" && account.date_of_birth != "" && account.phone != "" && account.address != "") {
                if (self.changePassword == true) {
                    if (self.password == "") {
                        toastr.warning("Chưa nhập password");
                        return false;
                    }
                    else {
                        self.account.password = self.password;
                    }
                }
                self.account.date_of_birth = convertCurrentTime(self.date_of_birth)
                AdminService.updateAccount(self.account).then(function (res) {
                    if (res.data.status == 200) {
                        toastr.success("Sửa Account thành công");
                    }
                }, function (res) {
                        console.log(res)
                        toastr.error("Sửa Account thất bại: " + res);
                });
            }
        }
    }])
    .controller('AccountCreateController', ['$scope', 'AdminService', function ($scope, AdminService) {
        var self = this;
        self.date_of_birth = new Date();
        self.account = {email: "", fullname: "", password: "", gender: 0, date_of_birth: "", phone: "", address: "", status: 0 };
        self.submit = submit;
        self.convertDateTime = convertDateTime;
        self.createAccount = createAccount;
        self.password = "";
        self.convertCurrentTime = convertCurrentTime;
        function submit() {
        }
        function convertDateTime(dateString) {
            dateString = dateString.substr(6);
            var currentTime = new Date(parseInt(dateString));
            var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
            var day = ("0" + currentTime.getDate()).slice(-2);
            var year = currentTime.getFullYear();
            var date = year + "-" + month + "-" + day;
            return new Date(date);
        }
        function convertCurrentTime(currentTime) {
            var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
            var day = ("0" + currentTime.getDate()).slice(-2);
            var year = currentTime.getFullYear();
            var date = year + "-" + month + "-" + day;
            return date;
        }
        function createAccount() {
            var account = self.account;
            self.account.date_of_birth = convertCurrentTime(self.date_of_birth);
            console.log(self.account)
            if (account.email != "" && account.name != "" && account.date_of_birth != "" && account.phone != "" && account.address != "" && account.password != "") {
                AdminService.hasEmail(self.account.email).then(function (res) {
                    if (res.data.status == 200) {
                        AdminService.createAccount(self.account).then(function (res) {
                            if (res.data.status == 200) {
                                toastr.success("Thêm Account thành công");
                            }
                        }, function (res) {
                            console.log(res)
                            toastr.error("Thêm Account thất bại: " + res);
                        });
                    }
                    else {
                        toastr.error("Thêm Account thất bại: " + res.data.data);
                    }
                }, function (res) {
                        console.log(res)
                        toastr.error("Thêm Account thất bại: " + res);
                });
            }
        }
    }])
