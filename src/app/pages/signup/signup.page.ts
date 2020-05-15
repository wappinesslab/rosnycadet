import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidator } from  '../../validators/username';
import { AuthService } from "../../services/user/auth.service";
import { LoadingController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
	@ViewChild('signupSlider', {static: false}) signupSlider;

	public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;

  public loading: any;

	public submitAttempt: boolean = false;

  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.slideOneForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    },);

    this.slideTwoForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],
      privacy: ['', Validators.required],
      bio: ['']
    });
  }

  next(){
    this.signupSlider.slideNext();
  }

  prev(){
    this.signupSlider.slidePrev();
  }

  async signUp(){
    this.submitAttempt = true;

    if(!this.slideOneForm.valid){
      this.signupSlider.slideTo(0);
    } 
    else if(!this.slideTwoForm.valid){
      this.signupSlider.slideTo(1);
    }
    else {
      const email: string = this.slideOneForm.value.email;
      const password: string = this.slideOneForm.value.password;
      const firstName: string = this.slideOneForm.value.firstName;
      const lastName: string = this.slideOneForm.value.lastName;
      const username: string = this.slideTwoForm.value.username;
      const privacy: string = this.slideTwoForm.value.privacy;
      const bio: string = this.slideTwoForm.value.bio;

      this.authService.signUpUser(email, password, firstName, lastName, username, privacy, bio).then(
        () => {
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl("/home");
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: "Ok", role: "cancel" }]
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();

    }
  }

  ngOnInit() {

  }

}
