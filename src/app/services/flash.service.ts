import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class FlashService{
    private flashMessages: Subject<any>;
    constructor(){
        this.flashMessages = new Subject<any>();
    }

    flash(message, type){
        this.flashMessages.next({type: type,message: message});
    }

    getMessages(){
        return this.flashMessages.asObservable();
    }
}