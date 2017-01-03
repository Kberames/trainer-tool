var App;
(function (App) {
    var app = angular.module('App');
    var WorkoutService = (function () {
        function WorkoutService($httpService) {
            this.httpService = $httpService;
        }
        WorkoutService.prototype.create = function (workout) {
            var promise = this.httpService({
                url: '/workout',
                method: 'POST',
                data: workout,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return promise;
        };
        WorkoutService.prototype.read = function (id) {
            var url = '/workout';
            if (id) {
                url = url + '/' + id;
            }
            var promise = this.httpService({
                url: url,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {}
            });
            return promise;
        };
        WorkoutService.prototype.update = function (id, workout) {
            var promise = this.httpService({
                url: '/workout/' + id,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: workout
            });
            return promise;
        };
        WorkoutService.prototype.delete = function (id, workout) {
            var promise = this.httpService({
                url: '/workout/' + id + '/delete',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: workout
            });
            return promise;
        };
        return WorkoutService;
    }());
    WorkoutService.$inject = ['$http'];
    App.WorkoutService = WorkoutService;
    app.service('WorkoutService', WorkoutService);
})(App || (App = {}));
