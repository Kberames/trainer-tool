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
            .state ('trainer-map', {
                url: '/trainer-map',
                // template: 'Here we are at the workouts.'
                templateUrl: '/angular/templates/partials/trainer-map.html',
                controller: App.TrainerMapController,
                controllerAs: 'trainerMapController'
            })
        }
    ])
}
