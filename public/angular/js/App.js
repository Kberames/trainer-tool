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
                .state('select-trainer', {
                url: '/user/select-trainer',
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
            })
                .state('video-create', {
                url: '/video/create',
                templateUrl: '/angular/templates/partials/video/edit.html',
                controller: App.VideoController,
                controllerAs: 'videoController'
            })
                .state('video-view', {
                url: '/video/:id',
                templateUrl: '/angular/templates/partials/video/view.html',
                controller: App.VideoController,
                controllerAs: 'videoController'
            })
                .state('video-edit', {
                url: '/video/:id',
                templateUrl: '/angular/templates/partials/video/edit.html',
                controller: App.VideoController,
                controllerAs: 'videoController'
            })
                .state('message', {
                url: '/message',
                templateUrl: '/angular/templates/partials/message/inbox.html',
                controller: App.MessageController,
                controllerAs: 'messageController'
            })
                .state('message-create', {
                url: '/message',
                templateUrl: '/angular/templates/partials/message/create.html',
                controller: App.MessageController,
                controllerAs: 'messageController'
            })
                .state('message-view', {
                url: '/message/:id',
                templateUrl: '/angular/templates/partials/message/view.html',
                controller: App.MessageController,
                controllerAs: 'messageController'
            });
        }
    ]);
})(App || (App = {}));
