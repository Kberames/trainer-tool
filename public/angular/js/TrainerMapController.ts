namespace App {
    export class TrainerMapController {
        static $inject = ['$state', '$stateParams', 'TrainerMapService'];

        private stateService;
        private stateParamsService;
        private trainerMapService;

        constructor (
            $state: angular.ui.IStateProvider,
            $stateParams: angular.ui.IStateParamsService,
            trainerMapService: App.TrainerMapService
            ) {

            console.log ('TrainerMapController was loaded...');

            this.stateService = $state;
            this.stateParamsService = $stateParams;
            this.trainerMapService = trainerMapService;

            // NEED TO GRAB USER ADDRESS FROM DB (session.user)
            let address = '1101 Park Lane, Hastings, MN, 55033, USA';
            // userLoc = {lat: 44.735013, lng: -92.87001900000001};

            // NEED TO GRAB ARRAY TRAINERS (need to call user service)
            let trainers = [
                {
                firstname : 'Tammy',
                lastname : 'Johnson',
                gender : 'F',
                address : '85 Pleasant Dr',
                city : 'Hastings',
                state : 'MN',
                zipcode : '55033',
                location: {lat: 44.746713, lng: -92.876762},
                certification: 'ACE Personal Trainer, NASM Corrective Exercise',
                imageUrl : 'stitch.png'
                },
                {
                firstname : 'Bob',
                lastname : 'Metcalf',
                gender : 'M',
                address : '2175 Radio Dr',
                city : 'Woodbury',
                state : 'MN',
                zipcode : '55125',
                location: {lat: 44.915735, lng: -92.932893},
                certification: 'AFAA Personal Trainer, NASM Corrective Exercise',
                imageUrl : 'mickey_basketball2.gif'
                }
            ];


            // The call to geocodeAddress should be moved to user save.
            // Then here we will pull the geocode location directly from the user object.
            let userLoc = this.trainerMapService.geocodeAddress(address, function (loc){
                console.log('In callback, lat: ' + loc.lat);
                console.log('In callback, lng: ' + loc.lng);
                userLoc = loc;
                let map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 9
                });

                map.setCenter(userLoc);

                let marker = new google.maps.Marker({
                    map: map,
                    position: userLoc,
                    icon: {
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 5
                    },
                    draggable: true
                });

                // if need an infowindow on the user's location
                // marker.addListener('click', function() {
                //     infowindow.open(map, marker);
                // });

                let markers = [];

                for (let i = 0; i < trainers.length; i++) {
                    markers[i] = new google.maps.Marker({
                        map: map,
                        position: trainers[i].location
                    });

                    markers[i].addListener('click', function() {
                        infowindow.open(map, markers[i]);
                    });

                    let name = trainers[i].firstname + ' ' + trainers[i].lastname;

                    let contentString = '<div id="content">'+
                        '<h1 id="firstHeading" class="firstHeading">' +
                        name + '</h1>' +
                        '<div id="bodyContent">'+
                        '<img src="/img/uploads/' +
                        trainers[i].imageUrl +
                        '" alt="Trainer Image" style="width:50px;height:75px;">'+
                        // '</div>'
                        '<p><b>Certifications</b>'+' include '+
                        trainers[i].certification + '<br><br>' +
                        // replace this href with a route to add the trainer to the user
                        '<a href="http://localhost:3000/user/register">Select this trainer</a>' +
                        '</div>'+
                        '</div>';

                    let infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });
                } // for loop

            }); //geocodeAddress callback function

        } // constructor

    } //export class TrainerMapController

} //namespace App
