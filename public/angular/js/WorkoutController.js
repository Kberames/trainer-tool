var App;
(function (App) {
    var WorkoutController = (function () {
        function WorkoutController(workoutService, $state, $stateParams) {
            console.log('WorkoutController was loaded...');
            console.log('Workout Service', workoutService);
            this.workoutService = workoutService;
            this.stateService = $state;
            this.stateParamsService = $stateParams;
            if (this.stateParamsService.id) {
                this.read(this.stateParamsService.id);
            }
        }
        WorkoutController.prototype.create = function (id) {
            var _this = this;
            if (id) {
                console.log('Creating a new workout');
            }
            else {
                console.log('Creating a new workout.');
                console.log('Workout has been saved.', this.workout);
                this.workoutService.create(this.workout)
                    .success(function (response) {
                    _this.stateService.go('workout');
                })
                    .error(function (response) {
                    console.error('Unable to create the workout: ', response);
                });
            }
        };
        WorkoutController.prototype.read = function (id) {
            var _this = this;
            console.log('Workouts have been read. ', id);
            this.workoutService.read(id)
                .success(function (response) {
                if (id) {
                    _this.workout = response;
                }
                else {
                    _this.list = response;
                }
            })
                .error(function (response) {
                console.error('There was an error');
            });
        };
        WorkoutController.prototype.goToPage = function (route, data) {
            console.log('Here is the data...', route, data);
            this.stateService.go(route, data);
        };
        return WorkoutController;
    }());
    WorkoutController.$inject = ['WorkoutService', '$state', '$stateParams'];
    App.WorkoutController = WorkoutController;
})(App || (App = {}));
