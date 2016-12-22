var App;
(function (App) {
    var WorkoutController = (function () {
        function WorkoutController($state, $stateParams) {
            console.log('WorkoutController was loaded...');
            this.stateService = $state;
            this.stateParamsService = $stateParams;
        }
        return WorkoutController;
    }());
    WorkoutController.$inject = ['$state', '$stateParams'];
    App.WorkoutController = WorkoutController;
})(App || (App = {}));
