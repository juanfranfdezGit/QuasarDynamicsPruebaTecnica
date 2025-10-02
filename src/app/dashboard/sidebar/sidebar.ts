import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  constructor(private authService: AuthService, private router: Router ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  } 
}
