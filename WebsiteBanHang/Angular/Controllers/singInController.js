angular.module('app')
    .controller('singInController', ['$scope', 'SingInService', function ($scope, SingInService) {
        var self = this;
        self.convertDateTime = convertDateTime;
        self.convertCurrentTime = convertCurrentTime;
        self.hasAccount = hasAccount;
        hasAccount();
        self.Registration = Registration;
        self.Login = Login;
        self.user = {
            email: "",
            password: ""
        };
        self.account = {
            email: "",
            fullname: "",
            password: "",
            gender: 0,
            date_of_birth: "",
            phone: "",
            address: "",
        };
        self.confirm_pass = ""
        self.date_of_birth = new Date;
        self.showLogin = true;
        self.submit = submit;
        self.changShow = changShow;
        function submit() {}
        function hasAccount() {
            SingInService.hasAccount().then(function (res) {
                if (res.data.data == true) {
                    $(location).attr('href', '#!/profile');
                }
            }, function (res) {
                console.log(res)
            });
        }
        function Registration() {
            var account = self.account;
            self.account.date_of_birth = convertCurrentTime(self.date_of_birth);
            if (account.email != "" && account.name != "" && account.date_of_birth != "" && account.phone != "" && account.address != "" && account.password != "" && account.password == self.confirm_pass) {
                //SingInService.hasEmail(self.account.email).then(function (res) {
                //    if (res.data.status == 200) {
                //        console.log(1)
                        SingInService.createAccount(self.account).then(function (res) {
                            if (res.data.status == 200) {
                                window.location.replace("/");
                                toastr.success("Thêm Account thành công");
                                //$(location).attr('href', '#!/');
                            }
                        }, function (res) {
                            console.log(res)
                                toastr.error("Thêm Account thất bại: " + res);
                        });
                    //}
                    //else {
                    //    toastr.error("Thêm Account thất bại: " + res.data.data);
                    //}
                //}, function (res) {
                //    console.log(res)
                //    toastr.error("Thêm Account thất bại: " + res);
                //});
            } else {
                toastr.error("Bạn nhập thông tin chưa đủ hoặc chưa đúng");
            }
        }
        function Login() {
            if (self.user.email != "" & self.user.password != "") {
                SingInService.Logoup(self.user).then(function (res) {
                    if (res.data.status == 200) {
                        toastr.success("Đăng nhập thành công");
                    }
                }, function (res) {
                    console.log(res)
                    toastr.error("Đăng nhập thất bại: " + res);
                });
            }
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
        function changShow() {
            if (self.showLogin == true)
                self.showLogin = false;
            else self.showLogin = true;
        }
    }])