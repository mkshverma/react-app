import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService{
    private _loading  = true;
    public loader = new Subject<Boolean>();
    public get loading() : boolean {
        return this._loading;
    }
    
    public set loading(v : boolean) {
        this._loading = v;
        this.loader.next(v);
    }

    startLoading(){
        this.loading = true;
    }
    
    stopLoading(){
        this.loading = false;
    }
}