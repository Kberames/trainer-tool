namespace App {
    export class TrainerMapController {
        static $inject = ['$state', '$stateParams', 'TrainerMapService', 'UserService'];

        private stateService;
        private stateParamsService;
        private trainerMapService;
        private userService;

        constructor (
            $state: angular.ui.IStateProvider,
            $stateParams: angular.ui.IStateParamsService,
            trainerMapService: App.TrainerMapService,
            userService: App.UserService
            ) {

            console.log ('TrainerMapController was loaded...');

            this.stateService = $state;
            this.stateParamsService = $stateParams;
            this.trainerMapService = trainerMapService;
            this.userService = userService;

            this.userService.getSessionUser()
                .success ((response) => {
                    console.log ('Got user: ', response);
                    let user = response;
                    console.log('session user: ' + JSON.stringify(user));
                    console.log('session user location: ' + JSON.stringify(user.location));

                    let map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 9
                    });

                    map.setCenter(user.location);

                    let marker = new google.maps.Marker({
                        map: map,
                        position: user.location,
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

                    console.log('BEFORE getTrainers');

                    this.userService.getTrainers()
                        .success ((response) => {
                            console.log ('Got trainers: ', response);
                            let trainers = response;
                            let markers = [];

                            for (let i = 0; i < trainers.length; i++) {
                                markers[i] = new google.maps.Marker({
                                    map: map,
                                    position: trainers[i].location2
                                });

                                markers[i].addListener('click', function() {
                                    infowindow.open(map, markers[i]);
                                });

                                let name = trainers[i].firstname + ' ' + trainers[i].lastname;

                                let contentString = '<div id="content">'+
                                    '<h1 id="firstHeading" class="firstHeading">' +
                                    name + '</h1>' +
                                    '<div id="bodyContent">'+
                                    '<img src="' + trainers[i].imageUrl +
                                    '" alt="Trainer Image" style="width:50px;height:75px;">'+
                                    // '</div>'
                                    '<p><b>Certifications</b>'+' include '+
                                    trainers[i].certification + '<br><br>' +
                                    // replace this href with a route to add the trainer to the user
                                    '<a href="http://localhost:3000/user/select-trainer/' + trainers[i]._id + '">Select this trainer</a>' +
                                    '</div>'+
                                    '</div>';

                                let infowindow = new google.maps.InfoWindow({
                                    content: contentString
                                });
                            } // for loop

                        })
                        .error ((response) => {
                            console.error ('Unable to get user session info: ', response);
                        })


                })
                .error ((response) => {
                    console.error ('Unable to get user session info: ', response);
                })

            // }); //geocodeAddress callback function

        } // constructor

    } //export class TrainerMapController

} //namespace App
