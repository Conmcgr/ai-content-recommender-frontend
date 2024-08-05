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

  editPassword() {
    this.editingPassword = true;
  }

  updatePassword() {
    if (this.newPassword === this.confirmNewPassword) {
      // Update password logic
      console.log('Password updated');
      this.editingPassword = false;
    } else {
      console.log('Passwords do not match');
    }
  }

  deleteInterest(interest: string) {
    this.interests = this.interests.filter(i => i !== interest);
  }

  addInterest() {
    if (this.newInterest && !this.interests.includes(this.newInterest)) {
      this.interests.push(this.newInterest);
      this.newInterest = '';
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    // Logout logic
    console.log('Logged out');
    this.router.navigate(['/login']);
  }
}
