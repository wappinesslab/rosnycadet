import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(){}

  signUpUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    username: string,
    privacy: string,
    bio: string
  ): Promise<void> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/users/${newUserCredential.user.uid}`)
          .set({
            email,
            firstName,
            lastName,
            username,
            privacy,
            bio
          });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  getUser(): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(
        user => {
          if (user) {
            resolve(user);
          } else {
            reject(null);
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

  loginUser(
    email: string,
    password: string
  ): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  userDetails(){
    return firebase.auth().currentUser;
  }
}
