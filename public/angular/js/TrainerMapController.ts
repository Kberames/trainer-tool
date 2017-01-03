namespace App {
    export class TrainerMapController {
        static $inject = ['$state', '$stateParams'];

        private stateService;
        private stateParamsService;


        constructor (
            $state: angular.ui.IStateProvider,
            $stateParams: angular.ui.IStateParamsService
        ) {
            console.log ('TrainerMapController was loaded...');

            this.stateService = $state;
            this.stateParamsService = $stateParams;
        }
    }
}
