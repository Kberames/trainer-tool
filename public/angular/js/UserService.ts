namespace App {
    let app = angular.module ('App');

    export class UserService {
        static $inject =['$http', '$state'];

        private httpService;
        private stateService;

        private user;

        constructor ($httpService: angular.IHttpService, $stateService: angular.ui.IStateService) {
            this.httpService = $httpService;
            this.stateService = $stateService;
            console.log ('User Service loaded...');

        } //constructor

        public getSessionUser () {
            let promise = this.httpService ({
                url: '/user/session',
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: {}
            })
            return promise;
        } //public getSessionUser

        public getTrainers () {
            let promise = this.httpService ({
                url: '/user/trainers',
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: {}
            })
            return promise;
        } //public getTrainers

    } // export class UserService

    app.service ('UserService', UserService);
} // namespace App
