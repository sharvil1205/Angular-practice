import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-courses',
  imports: [MatTabsModule, RouterOutlet],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  selectedIndex: number = 0;

  constructor(private router: Router) {}

  // Update the route when tab index changes
  onTabChange(event: number) {
    this.selectedIndex = event;
    const routes = ['/courses/mentor', '/courses/mentee'];
    this.router.navigate([routes[event]]);
  }
}
