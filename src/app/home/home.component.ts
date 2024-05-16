import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor( private auth: Auth, private router: Router) { }

  cards = [
    {
      imageUrl: '../../assets/a-game.png',
      title: 'Card Title 1',
      text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
    },
    {
      imageUrl: '../../assets/a-game.png',
      title: 'Card Title 2',
      text: 'Este es el titulo de la segunda carta'
    },
  ];

  async logout() {
    try {
      await signOut(this.auth);
      console.log('User logged out successfully');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
