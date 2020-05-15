import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import * as firebase from "firebase";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('pwaphoto', {static: false}) pwaphoto: ElementRef;
  public imgURI: string = null;
  public birthDate: any;

  public loading: HTMLIonLoadingElement;
  public userProfile: any = {};
  public currentUser: any;

  public guestPicture: string = null;

  public emailVerificationHasBeenSent: boolean = false;

  public isEmailVerified: any;
  public emailIsVerified: string = "Email vérifié !";
  public emailIsNotVerified: string = "Email non vérifié !";

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    public loadingCtlr: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  async ngOnInit() {
    const loading = await this.loadingCtlr.create({
      message: 'Chargement...',
      duration: 2000
    });
    await loading.present();

    this.profileService.getUserProfile().then(userProfileSnapshot => {
      if (userProfileSnapshot.data()) {
        this.userProfile = userProfileSnapshot.data();
      }
      loading.dismiss();
    });
    this.isEmailVerified = await firebase.auth().currentUser.emailVerified ? this.emailIsVerified : this.emailIsNotVerified;

    firebase.auth().onAuthStateChanged(async (user) => {
      if (await user) {
        return this.currentUser = user.uid;
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  openPWAPhotoPicker() {
    if (this.pwaphoto == null) {
      return;
    }
    this.pwaphoto.nativeElement.click();
  }

    uploadPWA() {
    if (this.pwaphoto == null) {
      return;
    }
    const fileList: FileList = this.pwaphoto.nativeElement.files;
    const userPhoto = firebase.storage().ref('profile/' + fileList[0].name);

    if (fileList && fileList.length > 0) {
      let self = this;
      this.firstFileToBase64(fileList[0]).then(async () => {
        const loading = await this.loadingCtlr.create({
          message: 'Chargement de la photo...',
          duration: 10000
        });
        await loading.present();

        userPhoto.put(fileList[0]).then(() => {
          userPhoto.getDownloadURL().then(function(photoURL) {
            firebase.firestore().doc(`users/${self.currentUser}`).update({
              photoURL: photoURL
            }).then(async () => {
                const alert = await self.alertCtrl.create({
                  message: "Votre photo a été modifiée avec succès!",
                  buttons: [{
                      text: 'Ok',
                      handler: () => {
                        window.location.reload();
                      }
                    }
                  ]
                });
                await alert.present();
                loading.dismiss();
            },
            error => {
              console.log(error);
            });
          });
        });
      }, (err: any) => {
        // Ignore error, do nothing
        this.imgURI = null;
      });
    }
  }

  private firstFileToBase64(fileImage: File): Promise<{}> {
    return new Promise((resolve, reject) => {
      let fileReader: FileReader = new FileReader();
      if (fileReader && fileImage != null) {
        fileReader.readAsDataURL(fileImage);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject(new Error('No file found'));
      }
    });
  }

  sendEmailVerification() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
      return this.emailVerificationHasBeenSent = true;
    }).catch(function(error) {
      // An error happened.
    });
  }

  async logOut() {
    const loading = await this.loadingCtlr.create({
      message: 'Déconnexion...',
      duration: 2000
    });

    await loading.present();
    this.authService.logoutUser().then(() => {
      this.router.navigateByUrl('/login');
      loading.dismiss();
    });
  }

  
  async updateName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: "Vous devez modifier les deux cases ensemble",
      inputs: [
        {
          type: "text",
          name: "nickname",
          placeholder: "Modifier votre surnom",
          value: this.userProfile.nickName
        },
        {
          type: "text",
          name: "fullname",
          placeholder: "Modifier votre nom complet",
          value: this.userProfile.fullName
        }
      ],
      buttons: [
        { text: "Annuler" },
        {
          text: "Sauvegarder",
          handler: data => {
            this.profileService.updateName(data.nickname, data.fullname);
          }
        }
      ]
    });
    await alert.present();
  }

  updateDOB(birthDate: any): void {
    if (birthDate === undefined) {
      return;
    }
    this.profileService.updateDOB(birthDate);
  }

  async updateEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        {
          type: "text",
          name: "newEmail",
          placeholder: "Taper votre nouvel email"
        },
        {
          name: "password",
          placeholder: "Votre mot de passe actuel",
          type: "password"
        }
      ],
      buttons: [
        { text: "Annuler" },
        {
          text: "Sauvegarder",
          handler: data => {
            this.profileService
              .updateEmail(data.newEmail, data.password)
              .then(() => {
                console.log("Email Changed Successfully");
              })
              .catch(error => {
                console.log("ERROR: " + error.message);
              });
          }
        }
      ]
    });
    await alert.present();
  }

  async updatePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        {
          name: "newPassword",
          placeholder: "Entrer votre nouveau mot de passe",
          type: "password"
        },
        {
          name: "oldPassword",
          placeholder: "Entrer votre ancien mot de passe",
          type: "password"
        }
      ],
      buttons: [
        { text: "Annuler" },
        {
          text: "Sauvegarder",
          handler: data => {
            this.profileService.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    await alert.present();
  }


}
