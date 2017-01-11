namespace App {
    let app = angular.module ('App');

    export class VideoService {
        static $inject = ['$http'];

        private httpService;

        constructor ($httpService: angular.IHttpService) {
            console.log ('video service was loaded....');
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
            console.log ('Promise', promise);
            return promise;
        }
    }

    app.service ('VideoService', VideoService);
}
