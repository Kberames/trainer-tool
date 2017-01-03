var App;
(function (App) {
    var app = angular.module('App', ['ui.router']);
    app.config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('workout', {
                url: '/workout',
                templateUrl: '/angular/templates/partials/workout/list.html',
                controller: App.WorkoutController,
                controllerAs: 'workoutController'
            })
                .state('workout-create', {
                url: '/workout/create',
                templateUrl: '/angular/templates/partials/workout/edit.html',
                controller: App.WorkoutController,
                controllerAs: 'workoutController'
            })
                .state('workout-view', {
                url: '/workout/:id',
                templateUrl: '/angular/templates/partials/workout/view.html',
                controller: App.WorkoutController,
                controllerAs: 'workoutController'
            })
                .state('workout-edit', {
                url: '/workout/:id',
                templateUrl: '/angular/templates/partials/workout/edit.html',
                controller: App.WorkoutController,
                controllerAs: 'workoutController'
            });
        }
    ]);
})(App || (App = {}));
