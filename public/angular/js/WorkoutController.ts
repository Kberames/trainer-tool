namespace App {
    export class WorkoutController {
        static $inject = ['WorkoutService', '$state', '$stateParams'];

        private workoutService;
        private stateService;
        private stateParamsService;

        public workout;
        public mode;
        public list;


        constructor (workoutService: App.WorkoutService, $state: angular.ui.IStateProvider, $stateParams: angular.ui.IStateParamsService) {
            console.log ('WorkoutController was loaded...');
            console.log ('Workout Service', workoutService);

            this.workoutService = workoutService;
            this.stateService = $state;
            this.stateParamsService = $stateParams;

            //This is pulling in the information so you can read it
            //by id.
            if (this.stateParamsService.id) {
                this.read (this.stateParamsService.id);
            }

            console.log ('Current route: ', this.stateService.current);
            if (this.stateService.current.name == 'workout-edit') {
                this.mode = 'Edit';
            }
            else if (this.stateService.current.name == 'workout-create') {
                this.mode = 'Create';
            }
        }
        public create (id) {
            if (id) {
                console.log ('Creating a new workout');
                //You need this for updating!!!!
                this.update (id);
            }
            else {
                console.log ('Creating a new workout.');
                console.log ('Workout has been saved.', this.workout);
                this.workoutService.create (this.workout)
                    .success ((response) => {
                        this.stateService.go ('workout');
                    })
                    .error ((response) => {
                        console.error ('Unable to create the workout: ', response);
                    })
            }
        }

        public read (id) {
            console.log ('Workouts have been read. ', id);
            this.workoutService.read (id)
                .success ((response) => {
                    if (id) {
                        this.workout = response;
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
            this.workoutService.update (id, this.workout)
                .success ((response) => {
                    this.goToPage ('workout-view', { id: id});
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

            this.workoutService.delete (id)
                .success ((response) => {
                    console.log ('Workout deleted successfully', response);

                    this.stateService.go ('workout');
                })
                .error ((response) => {
                    console.error ('ERROR deleting workout', response);
                })
        }
    }

}
