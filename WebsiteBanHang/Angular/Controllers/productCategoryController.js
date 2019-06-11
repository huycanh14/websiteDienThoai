angular.module('app')
    .controller('productCategoryController', ['$scope', 'ProductCategoryService', function ($scope, HomeService) {
        var self = this;
        self.products = [];
        self.product_category_id = "";
        self.brands = [];
        self.getAll = getAll;
        getAll();
        function getAll() {
            HomeService.getProductNew().then(function (res) {
                if (res.data.status == 200) {
                    console.log(res)
                    //var select = { id: "", name: "All Categories" };
                    self.products = res.data.data;
                    console.log(self.products)
                    //self.product_categories.unshift(select);
                    //console.log(self.product_categories)
                    //self.brands = res.data.brands;
                }
            }, function (res) {
                console.log(res)
            });
        }
    }])