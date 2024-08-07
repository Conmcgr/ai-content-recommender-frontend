import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  username: string = '';
  interests: string[] = [];
  newInterest: string = '';
  editingPassword: boolean = false;
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.http.get<any>('/api/user/profile').subscribe(
      response => {
        this.username = response.username;
        this.interests = response.interests;
      },
      error => {
        console.log('Error loading user profile', error);
      }
    );
  }

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
      const passwordData = {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      };
      this.http.post('/api/user/update-password', passwordData).subscribe(
        response => {
          console.log('Password updated');
          this.editingPassword = false;
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmNewPassword = '';
        },
        error => {
          console.log('Error updating password', error);
        }
      );
    } else {
      console.log('Passwords do not match');
    }
  }

  deleteInterest(interest: string, event: Event) {
    event.stopPropagation();
    this.http.post('/api/user/delete-interest', { interest }).subscribe(
      response => {
        this.interests = this.interests.filter(i => i !== interest);
      },
      error => {
        console.log('Error deleting interest', error);
      }
    );
  }

  addInterest(event: Event) {
    event.stopPropagation();
    if (this.newInterest && !this.interests.includes(this.newInterest)) {
      this.http.post('/api/user/add-interest', { interest: this.newInterest }).subscribe(
        response => {
          this.interests.push(this.newInterest);
          this.newInterest = '';
        },
        error => {
          console.log('Error adding interest', error);
        }
      );
    }
  }

  logout(event: Event) {
    event.stopPropagation();
    // Implement your logout logic here, e.g., removing the JWT from local storage
    console.log('Logged out');
    this.router.navigate(['/login']);
  }
}