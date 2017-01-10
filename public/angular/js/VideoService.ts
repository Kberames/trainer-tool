namespace App {
    let app = angular.module ('App');

    export class VideoService {
        static $inject = ['$http'];

        private httpService;

        constructor ($httpService: angular.IHttpService) {
            this.httpService = $httpService;
        }

        public create (video) {
            let promise = this.httpService ({
                url: '/video',
                method: 'POST',
                data: video,
                headers: {
                    'Content-Type' : 'application/json'
                }
            });

            return promise;
        }
    }

    app.service ('VideoService', VideoService);
}
