namespace App {
    let app = angular.module ('App');

    export class WorkoutService {
        static $inject = ['$http'];

        private httpService;

        constructor ($httpService: angular.IHttpService) {
            this.httpService = $httpService;
        }
    }

    app.service ('WorkoutService', WorkoutService);
}
