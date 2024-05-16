import { CommonModule, DOCUMENT } from "@angular/common";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { addDoc, collection, Firestore } from "@angular/fire/firestore";
import { Renderer2, Inject } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { Auth, signInWithEmailAndPassword } from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  userEmail: string = '';
  userPassword: string = '';
  public loginsCollection: any[] = [];
  public countLogins: number = 0;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  ngOnInit() {
    this.renderer.addClass(this.document.body, 'login-background');
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'login-background');
  }

  async hardcodeLogin() {
    this.userEmail = 'elon@x.com';
    this.userPassword = '123456';
    await this.login();
  }

  async login() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.userEmail, this.userPassword);
      console.log('User logged in:', userCredential.user?.email);

      if (userCredential.user) {
        await this.logUserLogin(userCredential.user);
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  async logUserLogin(user: any) {
    const logRef = collection(this.firestore, 'logins');
    try {
      await addDoc(logRef, {
        uid: user.uid,
        email: user.email,
        loginTime: new Date()
      });
      console.log('User login logged to Firestore');
    } catch (error) {
      console.error('Error logging user login to Firestore:', error);
    }
  }
}
