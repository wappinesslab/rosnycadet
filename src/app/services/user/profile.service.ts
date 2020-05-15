import { Injectable} from '@angular/core';
import { AuthService } from './auth.service';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class ProfileService  {
  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;

  constructor(
    private authService: AuthService
  ) { }

  async getUserProfile(): Promise<firebase.firestore.DocumentSnapshot> {
    const user: firebase.User = await this.authService.getUser();
    this.currentUser = user;
    this.userProfile = firebase.firestore().doc(`users/${user.uid}`);
    return this.userProfile.get();
  }
  
  updateName(nickname: string, fullname: string): Promise<any> {
    return this.userProfile.update({ nickname, fullname });
  }

  updateDOB(birthDate: string): Promise<any> {
    return this.userProfile.update({ birthDate });
  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );

    return this.currentUser
      .reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        this.currentUser.updateEmail(newEmail).then(() => {
          this.userProfile.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );

    return this.currentUser
      .reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        this.currentUser.updatePassword(newPassword).then(() => {
          console.log("Password Changed");
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}
