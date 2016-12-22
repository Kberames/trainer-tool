var App;
(function (App) {
    var app = angular.module('App');
    var WorkoutService = (function () {
        function WorkoutService($httpService) {
            this.httpService = $httpService;
        }
        return WorkoutService;
    }());
    WorkoutService.$inject = ['$http'];
    App.WorkoutService = WorkoutService;
    app.service('WorkoutService', WorkoutService);
})(App || (App = {}));
