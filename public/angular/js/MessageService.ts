namespace App {
    let app = angular.module ('App');

    export class MessageService {
        static $inject = ['$http'];

        private httpService;

        constructor ($httpService: angular.IHttpService) {
            this.httpService = $httpService;
        }

        public create (message) {
            let promise = this.httpService ({
                url: '/message',
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: message,
            });

            return promise;
        }

        public read (id) {
            let url = '/message';

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

        public delete (id, message) {
            let promise = this.httpService ({
                url: '/message/' + id + '/delete',
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: message
            });

            return promise;
        }

    }

    app.service ('MessageService', MessageService);
}
