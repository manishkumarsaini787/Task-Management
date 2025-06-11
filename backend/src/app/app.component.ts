import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>
    <main style="padding: 16px;">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}
