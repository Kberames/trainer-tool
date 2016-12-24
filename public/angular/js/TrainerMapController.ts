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

        public initMap() {
          let uluru = {lat: -25.363, lng: 131.044};

          let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: uluru
          });
          
          let marker = new google.maps.Marker({
            position: uluru,
            map: map
          });
        }
    }
}
