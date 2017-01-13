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

        public read (id) {
            let url = '/video';

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

        public update (id, video) {
            let promise = this.httpService ({
                url: '/video/' + id,
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: video
            });

            return promise;
        }

        public delete (id, video) {
            let promise = this.httpService ({
                url: '/video/' + id + '/delete',
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: video
            });

            return promise;
        }
    }

    app.service ('VideoService', VideoService);
}
