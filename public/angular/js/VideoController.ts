namespace App {
    export class VideoController {
        static $inject = ['UserService', 'VideoService', '$state', '$stateParams'];

        private userService;
        private videoService;
        private stateService;
        private stateParamsService;

        public video;
        public list;
        public mode;
        public urlVideo;
        public trainer; //boolean
        public user;

        constructor (userService: App.UserService, videoService: App.VideoService, $state: angular.ui.IStateProvider, $stateParams: angular.ui.IStateParamsService) {
            console.log ('Video Controller was loaded...');
            console.log ('Video Service', videoService);

            this.userService = userService;
            this.videoService = videoService;
            this.stateService = $state;
            this.stateParamsService = $stateParams;

            // This is pulling in the information and you can read it
            //by the id.
            if (this.stateParamsService.id) {
                this.read (this.stateParamsService.id);
            }

            this.userService.getSessionUser()
                .success ((response) => {
                    console.log ('Got user: ', response);
                    this.user = response;
                    console.log('session user: ' + JSON.stringify(this.user));
                    if (this.user.type == 'trainer') {
                        this.trainer = true;
                    }
                    else {
                        this.trainer = false;
                    }
                })
                .error ((response) => {
                    console.error ('Unable to get user session info: ' + response);
                })


            console.log ('Current route: ', this.stateService.current);
            if (this.stateService.current.name == 'video-edit') {
                this.mode = 'Edit';
            }
            else if (this.stateService.current.name == 'video-create') {
                this.mode = 'Add';
            }
        }

        public create (id) {
            if (id) {
                console.log ('Uploading a new video');
                this.update (id);
            }
            else {
                console.log ('Uploading a video');
                console.log ('Video has been saved.', this.video);
                this.videoService.create (this.video)
                    .success ((response) => {
                        this.stateService.go ('video');
                    })
                    .error ((response) => {
                        console.error ('Unable to upload video', response);
                    })
            }
        }

        public read (id) {
            console.log ('Videos have been read.', this.list);
            this.videoService.read (id)
                .success ((response) => {
                    if (id) {
                        this.video = response;
                    }
                    else {
                        this.list = response;
                        console.log ('Response: ', response);
                    }
                })
                .error ((response) => {
                    console.error ('There was an error');
                })
        }

        public update (id) {
            this.videoService.update (id, this.video)
                .success ((response) => {
                    this.goToPage ('video-view', { id: id});
                })
                .error ((response) => {
                    console.error ('Unable to update workout: ', response);
                })
        }

        public goToPage (route, data) {
            console.log ('Here is the data...', route, data);
            this.stateService.go (route, data);
        }

        public delete (id) {
            console.log ('Deleted!' + id);

            this.videoService.delete (id)
                .success ((response) => {
                    console.log ('Video deleted successfully', response);
                    this.stateService.go ('video');
                })
                .error ((response) => {
                    console.error ('**ERROR deleting video', response);
                })
        }

    }
}
