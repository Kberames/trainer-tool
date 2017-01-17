namespace App {
    export class MessageController {
        static $inject = ['MessageService', 'UserService', '$state', '$stateParams'];

        private messageService;
        private userService;
        private stateService;
        private stateParamsService;

        public message;
        public list;
        public user;

        constructor (messageService: App.MessageService, userService: App.UserService, $state: angular.ui.IStateProvider, $stateParams: angular.ui.IStateParamsService) {
            console.log ('MessageController was loaded...');
            console.log ('Message Service', messageService);

            this.messageService = messageService;
            this.userService = userService;
            this.stateService = $state;
            this.stateParamsService = $stateParams;

            // if (this.stateParamsService.id) {
            //     this.read (this.stateParamsService.id);
            // }
            // else {
            //     this.read ();
            // }

            this.userService.getSessionUser()
                .success ((response) => {
                    console.log ('Got user: ', response);
                    this.user = response;
                    console.log('session user: ' + JSON.stringify(this.user));
                })
                .error ((response) => {
                    console.error ('Unable to get user session info: ', response);
                })

            this.read (this.stateParamsService.id);

        }

        public create () {
            this.message.date = Date();
            console.log('Message date: ' + this.message.date);

            console.log ('Creating a new message!');
            console.log ('Message has been saved.', this.message);

            this.message.to = this.user.trainer;
            this.message.from = this.user._id;

            this.messageService.create (this.message)
                .success ((response) => {
                    this.stateService.go ('message');
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
