﻿namespace DevStation.Controllers {

    export class AuthController {

        constructor(private $http: ng.IHttpService, private $window: ng.IWindowService, private $location: ng.ILocationService) { }

        public register(user): void {

            this.$http.post('/api/account/register', user)
                .then((response) => {
                    this.login(user.userName, user.password);
                })
                .catch((response) => {
                    console.log(response);
                });
        }

        public login(username, password): void {
            let data = `grant_type=password&username=${username}&password=${password}`;

            this.$http.post('/token', data, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
                .then((response) => {
                    this.$window.localStorage.setItem('token', response.data['access_token']);
                    console.log(response.data['role']);
                    if (response.data['role'] == 'Developer') {
                        this.$location.path('/dev/home');
                    }
                    else if (response.data['role'] == 'Employer') {
                        this.$location.path('/employer/home');
                    }
                })
                .catch((response) => {
                    console.log(response);
                });
        }

        public logout() {
            this.$window.localStorage.removeItem('token');
        }
    }

    angular.module('DevStation').controller('authController', AuthController);
}