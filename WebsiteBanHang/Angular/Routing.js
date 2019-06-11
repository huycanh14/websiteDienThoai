admin.config(function ($routeProvider, $locationProvider) { 
    $routeProvider
        .when("/", {
            templateUrl: "/Admin/Home/Home",
            controller: "HomeController"
        })
        .when("/product", {
            templateUrl: "/Admin/Product/Index",
            controller: "ProductController"
        })
        .when("/product_add", {
            templateUrl: "/Admin/Product/ProductAdd",
            controller: "ProductController"
        })
        .when("/product_edit/:id", {
            templateUrl: function (params) {
                return "/Admin/Product/ProductEdit/" + params.id;
            },
            controller: "ProductEditController"
        })
        .when("/product_categories", {
            templateUrl: "/Admin/ProdutcCategory/Index",
            controller: "ProductCategoryController"
        })
        .when("/brands", {
            templateUrl: "/Admin/Brand/Index",
            controller: "BrandController"
        })
        .when("/order/:id", {
            templateUrl: function (params) {
                return "/Admin/Order/Index/" + params.id;
            },
            controller: "OrderController"
        })
        .when("/order_item/:id", {
            templateUrl: function (params) {
                return "/Admin/Order_item/Index/" + params.id;
            },
            controller: "Order_itemController"
        })
        .when("/customer", {
            templateUrl: "/Admin/Customer/Index",
            controller: "CustomerController"
        })
        .when("/account", {
            templateUrl: "/Admin/Account/Index",
            controller: "AccountController"
        })
        .when("/account_edit/:id", {
            templateUrl: function (params) {
                return "/Admin/Account/AccountEdit/" + params.id;
            },
            controller: "AccountEditController"
        })
        .when("/account_create", {
            templateUrl: "/Admin/Account/CreatAccount",
            controller: "AccountCreateController"
        })
});
app.config(function ($routeProvider, $locationProvider) { 
    $routeProvider
        .when("/", {
            templateUrl: "/Home/Home",
            controller: "homeController"
        })
        .when("/product_category/:id", {
            templateUrl: function (params) {
                return "/ProductCategory/Index/" + params.id;
            },
            controller: "productCategoryController"
        })
        .when("/brand/:id", {
            templateUrl: function (params) {
                return "/Brand/Index/" + params.id;
            },
            controller: "brandController"
        })
        .when("/search", {
            templateUrl: "Home/Search",
            controller: "searchController"
        })
        .when("/product/:id", {
            templateUrl: function (params) {
                return "/Product/Product/" + params.id;
            },
            controller: "productController"
        })
        .when("/signin", {
            templateUrl: "Customer/SignIn",
            controller: "singInController"
        })
        .when("/profile", {
            templateUrl: "Customer/ProFile",
            controller: "proFileController"
        })
        .when("/cart", {
            templateUrl: "Order/Cart",
            controller: "orderController"
        })
        .otherwise({
            redirectTo: '/'
        })
});