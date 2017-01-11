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
            })
                .state('trainer-map', {
                url: '/trainer-map',
                templateUrl: '/angular/templates/partials/trainer-map.html',
                controller: App.TrainerMapController,
                controllerAs: 'trainerMapController'
            })
                .state('schedule', {
                url: '/schedule',
                templateUrl: '/angular/templates/partials/schedule/list.html',
                controller: App.ScheduleController,
                controllerAs: 'scheduleController'
            })
                .state('schedule-create', {
                url: '/schedule/create',
                templateUrl: '/angular/templates/partials/schedule/edit.html',
                controller: App.ScheduleController,
                controllerAs: 'scheduleController'
            })
                .state('schedule-view', {
                url: '/schedule/:id',
                templateUrl: '/angular/templates/partials/schedule/view.html',
                controller: App.ScheduleController,
                controllerAs: 'scheduleController'
            })
                .state('schedule-edit', {
                url: '/schedule/:id',
                templateUrl: '/angular/templates/partials/schedule/edit.html',
                controller: App.ScheduleController,
                controllerAs: 'scheduleController'
            })
                .state('video', {
                url: '/video',
                templateUrl: '/angular/templates/partials/video.html',
                controller: App.VideoController,
                controllerAs: 'videoController'
            });
        }
    ]);
})(App || (App = {}));
