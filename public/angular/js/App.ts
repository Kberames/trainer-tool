namespace App {
    let app = angular.module ('App', ['ui.router']);

    app.config ([
        '$stateProvider',

        ($stateProvider) => {

            $stateProvider

                .state ('workout', {
                    url: '/workout',
                    // template: 'Here we are at the workouts.'
                    templateUrl: '/angular/templates/partials/workout/list.html',
                    controller: App.WorkoutController,
                    controllerAs: 'workoutController'
                })
                .state ('workout-create', {
                    url: '/workout/create',
                    // template: 'Here we are creating a workout.'
                    templateUrl: '/angular/templates/partials/workout/edit.html',
                    controller: App.WorkoutController,
                    controllerAs: 'workoutController'
                })
                .state ('workout-view', {
                    url: '/workout/:id',
                    // template: 'Here we are viewing a workout.'
                    templateUrl: '/angular/templates/partials/workout/view.html',
                    controller: App.WorkoutController,
                    controllerAs: 'workoutController'
                })
                .state ('workout-edit', {
                    url: '/workout/:id',
                    // template: 'Here we are editing a workout.'
                    templateUrl: '/angular/templates/partials/workout/edit.html',
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
