import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  userPhoto: string | undefined; // Stocke l'URL de la photo prise par la caméra

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onRegister() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    this.authService
      .signUp(this.email, this.password)
      .then(() => {
        alert('Inscription réussie !');
        this.errorMessage = '';
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl, // Récupère l'image sous forme d'URL
        quality: 90, // Qualité de l'image
      });
      this.userPhoto = image.dataUrl; // Stocke l'image capturée dans la variable
    } catch (error) {
      console.error('Erreur lors de la prise de photo :', error);
    }
  }
}
