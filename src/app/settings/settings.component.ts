import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  username: string = 'JohnDoe'; // This should be fetched from the user's profile
  interests: string[] = ['Reading', 'Coding', 'Music']; // This should be fetched from the user's profile
  newInterest: string = '';
  editingPassword: boolean = false;
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  editPassword(event: Event) {
    event.stopPropagation();
    this.editingPassword = true;
  }

  updatePassword(event: Event) {
    event.stopPropagation();
    if (this.newPassword === this.confirmNewPassword) {
      // Update password logic
      console.log('Password updated');
      this.editingPassword = false;
    } else {
      console.log('Passwords do not match');
    }
  }

  deleteInterest(interest: string, event: Event) {
    event.stopPropagation();
    this.interests = this.interests.filter(i => i !== interest);
  }

  addInterest(event: Event) {
    event.stopPropagation();
    if (this.newInterest && !this.interests.includes(this.newInterest)) {
      this.interests.push(this.newInterest);
      this.newInterest = '';
    }
  }

  logout(event: Event) {
    event.stopPropagation();
    // Logout logic
    console.log('Logged out');
    this.router.navigate(['/login']);
  }
}
