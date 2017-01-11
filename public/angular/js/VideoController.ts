namespace App {
    export class VideoController {
        static $inject = ['VideoService', '$state', '$stateParams'];

        private videoService;
        private stateService;
        private stateParamsService;

        public videoName;
        public videoUrl;
        public list;

        constructor (videoService: App.VideoService, $state: angular.ui.IStateProvider, $stateParams: angular.ui.IStateParamsService) {
            console.log ('Video Controller was loaded...');
            console.log ('Video Service', videoService);

            this.videoService = videoService;
            this.stateService = $state;
            this.stateParamsService = $stateParams;
        }

        public create (id) {
            if (id) {
                console.log ('Uploading a new video');
            }
            else {
                console.log ('Uploading a video');
                console.log ('Video has been saved.', this.videoName, this.videoUrl);
                this.videoService.create (this.videoName, this.videoUrl)
                    .success ((response) => {
                        this.stateService.go ('video');
                    })
                    .error ((response) => {
                        console.error ('Unable to upload video', response);
                    })
            }
        }

    }
}
