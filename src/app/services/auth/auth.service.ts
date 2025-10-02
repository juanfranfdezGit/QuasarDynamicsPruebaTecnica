import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
    export class AuthService {
        
    private storageKey = 'user_session';

    login(email: string, pass: string): boolean {
        if (email === 'admin' && pass === 'admin') {
            localStorage.setItem(this.storageKey, email);
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem(this.storageKey);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.storageKey);
    }
}