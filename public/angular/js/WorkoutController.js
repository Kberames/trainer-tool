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
            console.log('Current route: ', this.stateService.current);
            if (this.stateService.current.name == 'workout-edit') {
                this.mode = 'Edit';
            }
            else if (this.stateService.current.name == 'workout-create') {
                this.mode = 'Create';
            }
        }
        WorkoutController.prototype.create = function (id) {
            var _this = this;
            if (id) {
                console.log('Creating a new workout');
                this.update(id);
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
        WorkoutController.prototype.update = function (id) {
            var _this = this;
            this.workoutService.update(id, this.workout)
                .success(function (response) {
                _this.goToPage('workout-view', { id: id });
            })
                .error(function (response) {
                console.error('Unable to update workout: ', response);
            });
        };
        WorkoutController.prototype.goToPage = function (route, data) {
            console.log('Here is the data...', route, data);
            this.stateService.go(route, data);
        };
        WorkoutController.prototype.delete = function (id) {
            var _this = this;
            console.log('Deleted! ', id);
            this.workoutService.delete(id)
                .success(function (response) {
                console.log('Workout deleted successfully', response);
                _this.stateService.go('workout');
            })
                .error(function (response) {
                console.error('ERROR deleting workout', response);
            });
        };
        return WorkoutController;
    }());
    WorkoutController.$inject = ['WorkoutService', '$state', '$stateParams'];
    App.WorkoutController = WorkoutController;
})(App || (App = {}));
