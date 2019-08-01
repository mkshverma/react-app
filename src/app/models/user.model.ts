export class User{
    constructor(
        public user_id: number=0,
        public display_name: string='',
        public email: string='',
        public password: string='',
        public state: boolean = false
        ){}
}