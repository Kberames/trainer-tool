namespace App {
    let app = angular.module ('App');

    export class WorkoutService {
        static $inject = ['$http'];

        private httpService;

        constructor ($httpService: angular.IHttpService) {
            this.httpService = $httpService;
        }

        public create (workout) {
            let promise = this.httpService ({
                url: '/workout',
                method: 'POST',
                data: workout,
                headers: {
                    'Content-Type' : 'application/json'
                }
            });

            return promise;
        }

        public read (id) {
            let url = '/workout';

            //If a valid id was passed in, modify the url.
            if (id) {
                url = url + '/' + id;
            }

            let promise = this.httpService ({
                url: url,
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: {}
            });

            return promise;
        }

        public update (id, workout) {
            let promise = this.httpService ({
                url: '/workout/' + id,
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: workout
            });

            return promise;
        }

        public delete (id, workout) {
            let promise = this.httpService ({
                url: '/workout/' + id + '/delete',
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: workout
            });

            return promise;
        }
    }

    app.service ('WorkoutService', WorkoutService);
}
