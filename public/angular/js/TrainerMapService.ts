namespace App {
    let app = angular.module ('App');

    export class TrainerMapService {
        static $inject = ['$http'];

        private httpService;

        constructor ($httpService: angular.IHttpService) {
            this.httpService = $httpService;
        }

        public geocodeAddress(address, callback) {
 
            let geocoder = new google.maps.Geocoder();

            geocoder.geocode({'address': address}, function(results, status) {
                if (status === 'OK') {
                    let loc = {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    };
                    console.log('lat: ' + loc.lat);
                    console.log('lng: ' + loc.lng);

                    callback (loc);
                    // calllback.call (loc);    // loc is context of this
                                                // parameters would be passed in comma separated format
                    // calllback.apply (loc);   // loc is context of this
                                                // parameters would be passed in array format
                }
                else {
                    // NEEDs to set error instead of alert message.
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        } // function geocodeAddress
    }

    app.service ('TrainerMapService', TrainerMapService);
}
