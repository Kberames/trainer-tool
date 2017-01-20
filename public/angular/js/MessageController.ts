namespace App {
    export class MessageController {
        static $inject = ['MessageService', 'UserService', '$state', '$stateParams'];

        private messageService;
        private userService;
        private stateService;
        private stateParamsService;

        public messageId;
        public message;
        public list;
        public user;
        public trainer; // boolean
        public clientList; // list of users who are linked to this trainer
        public clientId; // used to store selected client when trainer wants to send a message
        public client; // used to store selected client info when trainer wants to send a message

        constructor (messageService: App.MessageService, userService: App.UserService, $state: angular.ui.IStateProvider, $stateParams: angular.ui.IStateParamsService) {
            console.log ('MessageController was loaded...');
            // console.log ('Message Service', messageService);

            this.messageService = messageService;
            this.userService = userService;
            this.stateService = $state;
            this.stateParamsService = $stateParams;

            // If trainer goes to connect page this allows them to pre-select the client they want to message.
            if (this.stateService.current.name == 'message-connect' || this.stateService.current.name == 'message-create-client') {
                this.messageId = '';
                this.clientId = this.stateParamsService.id;
                console.log ('*** messageController clientId: ' + this.clientId);
            }
            else {
                this.messageId = this.stateParamsService.id;
                this.clientId = 0;
            }


            this.userService.getClientById(this.clientId)
                .success ((response) => {
                    console.log ('Got client: ', response);
                    this.client = response;
                })
                .error ((response) => {
                    console.error ('Unable to get client info: ' + response);
                })

            this.userService.getSessionUser()
                .success ((response) => {
                    console.log ('Got user: ', response);
                    this.user = response;
                    console.log('session user: ' + JSON.stringify(this.user));
                    if (this.user.type == 'trainer') {
                        this.trainer = true;
                        this.userService.getClients()
                            .success((response) => {
                                // console.log ('CLIENT LIST: ' + response);
                                this.clientList = response;
                            })
                            .error((response) => {
                                console.error ('Unable to get client list: ' + response);
                            })
                    }
                    else {
                        this.trainer = false;
                    }
                })
                .error ((response) => {
                    console.error ('Unable to get user session info: ' + response);
                })

            this.read (this.messageId);

        }

        public create () {
            this.message.date = Date();
            console.log('Message date: ' + this.message.date);

            console.log ('Creating a new message!');
            console.log ('Message has been saved.', this.message);

            if (this.trainer) {
                if (this.clientId) { // Client was selected on Client page.
                    this.message.to = this.clientId;
                }
                console.log ('TRAINER MESSAGE TO: ' + this.message.to);
            }
            else {
                this.message.to = this.user.trainer;
            }

            this.message.from = this.user._id;

            this.messageService.create (this.message)
                .success ((response) => {
                    if (this.stateService.current.name == 'message-create-client') {
                        this.stateService.go ('message-connect', {id: this.clientId});
                    }
                    else {
                        this.stateService.go ('message');
                    }
                })
                .error ((response) => {
                    console.error ('Unable to create the message: ', response);
                })
        } // create ()

        public read (id) {
            console.log ('Messages have been read. ', id);
            this.messageService.read (id)
                .success ((response) => {
                    if (id) {
                        this.message = response;
                    }
                    else {
                        this.list = response;
                    }
                })
                .error ((response) => {
                    console.error ('There was an error.');
                })
        } // read (id)

        public delete (id) {
            console.log ('Deleted message: ', id);

            this.messageService.delete (id)
                .success ((response) => {
                    console.log ('Message was deleted.', response);

                    this.stateService.go ('message');
                })
                .error ((response) => {
                    console.error ('Error deleting message.', response);
                })
        } // delete (id)

        public goToPage (route, data) {
            console.log ('Here is the data...', route, data);
            this.stateService.go (route, data);
        }
    } // export class MessageController
} // namespace App
