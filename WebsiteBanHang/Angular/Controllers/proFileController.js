angular.module('app')
    .controller('proFileController', ['$scope', 'ProFileService', function ($scope, ProFileService) {
        var self = this;
        self.account = {
            email: "",
            fullname: "",
            password: "",
            gender: 0,
            date_of_birth: "",
            phone: "",
            address: "",
        };
        self.password_old = "";
        self.password_new = "";
        self.confirm_password = "";
        self.getAccount = getAccount;
        self.convertDateTime = convertDateTime;
        self.convertCurrentTime = convertCurrentTime;
        self.date_of_birth = new Date();
        self.handleSubmit = handleSubmit;
        self.handleLogout = handleLogout;
        self.changePassword = false;
        getAccount();
        function getAccount() {
            ProFileService.hasAccount().then(function (res) {
                if (res.data.data == true) {
                    ProFileService.getAccount().then(function (res) {
                        if (res.data.status == 200) {
                            self.account = res.data.data;
                            self.date_of_birth = convertDateTime(self.account.date_of_birth);
                        }
                    }, function (res) {
                        console.log(res)
                    });
                } else {
                    location.replace("/");
                }
            }, function (res) {
                console.log(res)
            })
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

        function handleSubmit() {
            var account = self.account;
            if (account.name != "" && account.date_of_birth != "" && account.phone != "" && account.address != "") {
                if (self.changePassword == true) {
                    if (self.password_old == "" || self.password_old == "" || self.confirm_password == "" || self.password_old != account.password || self.password_new != self.confirm_password) {
                        toastr.warning("Kiểm tra lại password");
                        return false;
                    }
                    else {
                        self.account.password = self.password_new;
                    }
                }
                self.account.date_of_birth = convertCurrentTime(self.date_of_birth)
                ProFileService.updateAccount(self.account).then(function (res) {
                    if (res.data.status == 200) {
                        toastr.success("Sửa Account thành công");
                    }
                }, function (res) {
                    console.log(res)
                    toastr.error("Sửa Account thất bại: " + res);
                });
            }
        }

        function handleLogout() {
            ProFileService.Logout(self.account).then(function (res) {
                if (res.data.status == 200) {
                    window.location.replace("/");
                }
            }, function (res) {
                console.log(res)
            });
        }
}])