namespace App {
    export class ScheduleController {
        static $inject = ['WorkoutService', 'ScheduleService', '$state', '$stateParams'];

        private workoutService;
        private scheduleService;
        private stateService;
        private stateParamsService;

        public schedule;
        public mode;
        public list;
        public workoutList;
        public workoutId;

        constructor (workoutService: App.WorkoutService, scheduleService: App.ScheduleService, $state: angular.ui.IStateProvider, $stateParams: angular.ui.IStateParamsService) {
            console.log ('ScheduleController was loaded...');
            console.log ('Schedule Service', scheduleService);

            this.workoutService = workoutService;
            this.scheduleService = scheduleService;
            this.stateService = $state;
            this.stateParamsService = $stateParams;

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
