import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-start-session',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './start-session.component.html',
  styleUrls: ['./start-session.component.scss']
})
export class StartSessionComponent {
  sessionLength: number = 15;
  format: string[] = [];
  contentKeywords: string = '';

  constructor(private router: Router) {}

  adjustSessionLength(amount: number) {
    const newLength = this.sessionLength + amount;
    if (newLength >= 5 && newLength <= 60) {
      this.sessionLength = newLength;
    }
  }

  toggleFormat(type: string) {
    const index = this.format.indexOf(type);
    if (index > -1) {
      this.format.splice(index, 1);
    } else {
      this.format.push(type);
    }
  }

  findContent() {
    if (this.format.length === 0) {
      this.format.push('video', 'article', 'podcast'); // Default to all types if none are selected
    }
    this.router.navigate(['/show-content'], {
      queryParams: {
        sessionLength: this.sessionLength,
        format: this.format.join(','),
        keywords: this.contentKeywords
      }
    });
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }
}
