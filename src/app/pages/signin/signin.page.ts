import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class SigninPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private toastController: ToastController) { }
  async login() {
    try {
      await this.authService.signIn(this.email, this.password);
      this.router.navigate(['/home']);
      this.clearForm();
    } catch (error: any) {
      let errorMessage = 'Invalid Credentials';
      if (error && error.message) {
        errorMessage = error.message;
      }
      this.showToast(errorMessage, 'danger');
      this.clearForm();
      console.error('Login error:', error);
    }
  }

  async continueWithGoogle() {
    try {
      await this.authService.googleSignup();
      this.router.navigate(['/home']);
    } catch (error: any) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (error && error.message) {
        errorMessage = error.message;
      }
      this.showToast(errorMessage, 'danger');
      console.error('Google Sign-in error:', error);
    }
  }

  forgotPassword() {

  }
  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      color: color,
      message,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }

  private clearForm() {
    this.email = '';
    this.password = '';
  }
  goToSignup() {
    this.router.navigate(['/signup']);
  }

  continueAsGuest() {
    this.router.navigate(['/home']);
  }
}

