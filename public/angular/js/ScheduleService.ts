namespace App {
    let app = angular.module ('App');

    export class ScheduleService {
        static $inject = ['$http'];

        private httpService;

        constructor ($httpService: angular.IHttpService) {
            this.httpService = $httpService;
        }

        public create (schedule) {
            let promise = this.httpService ({
                url: '/schedule',
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: schedule
            });

            return promise;
        }

        public read (id) {
            let url = '/schedule';

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

        public update (id, schedule) {
            let promise = this.httpService ({
                url: '/schedule/' + id,
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: schedule
            });

            return promise;
        }

        public delete (id, schedule) {
            let promise = this.httpService ({
                url: '/schedule/' + id + '/delete',
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: schedule
            });

            return promise;
        }

    }

    app.service ('ScheduleService', ScheduleService);
}
