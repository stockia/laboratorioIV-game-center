import { Component, OnDestroy, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { DOCUMENT } from '@angular/common';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  userEmail: string = '';
  userPassword: string = '';

  constructor(
    private auth: Auth, 
    private firestore: Firestore, 
    private renderer: Renderer2, 
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
    this.renderer.addClass(this.document.body, 'register-background');
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'register-background');
  }

  async register() {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.userEmail, this.userPassword);
      console.log('User registered:', userCredential.user?.email);
      
      // deberia guardar los datos del usuario en la base de datos
      if (userCredential.user) {
        await this.saveUserData(userCredential.user);
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  }

  async saveUserData(user: any) {
    const userRef = collection(this.firestore, 'users');
    try {
      await addDoc(userRef, {
        uid: user.uid,
        email: user.email,
        createdAt: new Date()
      });
      console.log('User data saved to Firestore');
    } catch (error) {
      console.error('Error saving user data to Firestore:', error);
    }
  }
}
