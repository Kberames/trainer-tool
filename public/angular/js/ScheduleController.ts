namespace App {
    export class ScheduleController {
        static $inject = ['UserService', 'WorkoutService', 'ScheduleService', '$state', '$stateParams'];

        private userService;
        private workoutService;
        private scheduleService;
        private stateService;
        private stateParamsService;

        public schedule;
        public mode;
        public list;
        public workoutList;
        public workoutId;
        public clientList;
        public user;
        public trainer; //boolean

        constructor (userService: App.UserService, workoutService: App.WorkoutService, scheduleService: App.ScheduleService, $state: angular.ui.IStateProvider, $stateParams: angular.ui.IStateParamsService) {
            console.log ('ScheduleController was loaded...');
            console.log ('Schedule Service', scheduleService);

            this.userService = userService;
            this.workoutService = workoutService;
            this.scheduleService = scheduleService;
            this.stateService = $state;
            this.stateParamsService = $stateParams;

            this.userService.getSessionUser()
                .success ((response) => {
                    console.log ('Got user: ', response);
                    this.user = response;
                    console.log('session user: ' + JSON.stringify(this.user));
                    if (this.user.type == 'trainer') {
                        this.trainer = true;
                        this.userService.getClients()
                            .success((response) => {
                                // console.log ('CLIENT LIST: ' + response);
                                this.clientList = response;
                            })
                            .error((response) => {
                                console.error ('Unable to get client list: ' + response);
                            })
                    }
                    else {
                        this.trainer = false;
                    }
                })
                .error ((response) => {
                    console.error ('Unable to get user session info: ' + response);
                })

            this.workoutService.read ()
                .success ((response) => {
                    this.workoutList = response;
                })
                .error ((response) => {
                    console.error ('There was an error');
                })

            if (this.stateParamsService.id) {
                this.read (this.stateParamsService.id);
            }

            console.log ('Current route: ', this.stateService.current);
            if (this.stateService.current.name == 'schedule-edit') {
                this.mode = 'Edit';
            }
            else if (this.stateService.current.name == 'schedule-create') {
                this.mode = 'Create';
            }
            else if (this.stateService.current.name == 'schedule-create-client') {
                this.mode = 'Create';
            }
        }


        public create (id) {
            if (id) {
                console.log ('Creating a new schedule');
                this.update (id);
            }
            else {
                console.log ('Creating a new schedule!');
                console.log ('Schedule has been saved.', this.schedule, this.workoutId);
                this.scheduleService.create (this.schedule, this.workoutId)
                    .success ((response) => {
                        this.stateService.go ('schedule-view');
                    })
                    .error ((response) => {
                        console.error ('Unable to create the schedule: ', response);
                    })
            }
        }

        public read (id) {
            console.log ('Schedules have been read. ', id);
            this.scheduleService.read (id)
                .success ((response) => {
                    if (id) {
                        this.schedule = response;
                    }
                    else {
                        this.list = response;
                    }
                })
                .error ((response) => {
                    console.error ('There was an error');
                })
        }

        public update (id) {
            console.log ('HELP MEEEE');

            this.scheduleService.update (id, this.schedule)
                .success ((response) => {
                    this.goToPage ('schedule-view', { id: id});
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
            console.log ('Deleted! ', id);

            this.scheduleService.delete (id)
                .success ((response) => {
                    console.log ('Schedule deleted successfully', response);

                    this.stateService.go ('schedule');
                })
                .error ((response) => {
                    console.error ('ERROR deleting schedule', response);
                })
        }
    }
}
