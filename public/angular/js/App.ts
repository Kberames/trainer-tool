namespace App {
    let app = angular.module ('App', ['ui.router']);

    app.config ([
        '$stateProvider',

        ($stateProvider) => {

            $stateProvider
                .state ('workout', {
                    url: '/workout',
                    // template: 'Here we are at the workouts.'
                    templateUrl: '/angular/templates/partials/workout.html',
                    controller: App.WorkoutController,
                    controllerAs: 'workoutController'
                })
        }
    ])
}
