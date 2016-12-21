namespace App {
    export class WorkoutController {
        static $inject = ['$state', '$stateParams'];

        private stateService;
        private stateParamsService;


        constructor ($state: angular.ui.IStateProvider, $stateParams: angular.ui.IStateParamsService) {
            console.log ('WorkoutController was loaded...');

            this.stateService = $state;
            this.stateParamsService = $stateParams;
        }
    }
}
