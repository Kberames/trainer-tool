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
                .state ('select-trainer', {
                    url: '/user/select-trainer',
                })
                .state ('schedule', {
                    url: '/schedule',
                    // template: 'Here we are at the schedule.'
                    templateUrl: '/angular/templates/partials/schedule/list.html',
                    controller: App.ScheduleController,
                    controllerAs: 'scheduleController'
                })
                .state ('schedule-create', {
                    url: '/schedule/create',
                    // template: 'Here we are creating a schedule.'
                    templateUrl: '/angular/templates/partials/schedule/edit.html',
                    controller: App.ScheduleController,
                    controllerAs: 'scheduleController'
                })
                .state ('schedule-view', {
                    url: '/schedule/:id',
                    // template: 'Here we are viewing a schedule.'
                    templateUrl: '/angular/templates/partials/schedule/view.html',
                    controller: App.ScheduleController,
                    controllerAs: 'scheduleController'
                })
                .state ('schedule-edit', {
                    url: '/schedule/:id',
                    // template: 'Here we are editing a schedule.'
                    templateUrl: '/angular/templates/partials/schedule/edit.html',
                    controller: App.ScheduleController,
                    controllerAs: 'scheduleController'
                })
                .state ('video', {
                    url: '/video',
                    // template: 'Here we are viewing videos',
                    templateUrl: '/angular/templates/partials/video.html',
                    controller: App.VideoController,
                    controllerAs: 'videoController'
                })
                .state ('video-create', {
                    url: '/video/create',
                    // template: 'Here we are creating a video.',
                    templateUrl: '/angular/templates/partials/video/edit.html',
                    controller: App.VideoController,
                    controllerAs: 'videoController'
                })
                .state ('video-view', {
                    url: '/video/:id',
                    templateUrl: '/angular/templates/partials/video/view.html',
                    controller: App.VideoController,
                    controllerAs: 'videoController'
                })
                .state ('video-edit', {
                    url: '/video/:id',
                    // template: 'Here we are editing a workout.'
                    templateUrl: '/angular/templates/partials/video/edit.html',
                    controller: App.VideoController,
                    controllerAs: 'videoController'
                })
        }
    ])
}
