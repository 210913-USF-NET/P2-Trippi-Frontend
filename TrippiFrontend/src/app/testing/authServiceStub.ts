import { Observable } from "rxjs";

export class AuthServiceStub {
    
        user$ = new Observable<any>();
        isAuthenticated$ = new Observable<any>();
    
}