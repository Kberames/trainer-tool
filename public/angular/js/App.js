var App;
(function (App) {
    var app = angular.module('App', ['ui.router']);
    app.config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('workout', {
                url: '/workout',
                templateUrl: '/angular/templates/partials/workout.html',
                controller: App.WorkoutController,
                controllerAs: 'workoutController'
            });
        }
    ]);
})(App || (App = {}));
