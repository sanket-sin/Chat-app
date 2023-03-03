import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loggedIn?: boolean;
  hide = true;
  subTitle!: string;
  first_name!: string;
  last_name!: string;
  email!: any;
  password!: string;
  SignIn!: string;
  headTitle!: string;
  account!: string;
  login!: string;
  otherAccount!: string;
  hideRequiredMarker = true;
  SignUp!: string;
  password_strong_error!: string;
  required!: string;
  valid!: string;
  auth2: any;
  errorMessage!: string
  text_pattern!: string;
  password_pattern!: string;

  loggedInFB!: boolean;
  Googleuser: any
  googleLoginDetails!: any;
  provider!: any;
  loader: boolean =false


  constructor(private route: Router, private fb: FormBuilder,
    private _ngZone: NgZone,
    ) { }



   
    openComponent(){

      this.route.navigate(['/register'])
    }
    home(){
      this.route.navigate([''])
    }
  

  form = new FormGroup({
    first_name: new FormControl("", [Validators.required,]),
    last_name: new FormControl("", [Validators.required,]),
    email: new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
    password: new FormControl("", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-1234567890]).{8,}$')])),

    // password: new FormControl("", Validators.compose([Validators.required, Validators.minLength(8),Validators.maxLength(15), Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$')])),

    // password validation : is At least one upper case English letter, At least one lower case English letter, At least one special character,Minimum 8 in length

  })
 
  onSubmit() {
    this.loader = true

    const form =
    {
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      email: this.form.value.email,
      password: this.form.value.password,
    }
    if (this.form.invalid) {
alert('Please fill in all fields') 
      this.loader = false

    }
    else {
      // this.loader = true

      // this.authentication.RegisteringIn(form).subscribe((res) => {
      //   this.loader = false

      //   this.route.navigateByUrl('subscription');
      // },(error) => {
      //   if(error?.error?.message){

      // this.toast.clear();
      //     this.toast.error(error?.error?.message)
      //     this.loader = false

      //   }
      //   else {
      //     this.toast.clear();
      //     this.toast.error('Something Went Wrong')
      //     this.loader = false



      //   }
      // })
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')){
      localStorage.clear()
    }

    

  }



  

 


  logIn() {

    this.route.navigateByUrl('login');
  }



  getLabels() {
    this.headTitle = 'Register Account';
    this.subTitle = 'Fill in your details to create an account';
    this.first_name = 'First name';
    this.last_name = "Last name"
    this.email = 'Email';
    this.password = ' Password';
    this.SignIn = 'Sign In'
    this.SignUp = 'Sign Up'
    this.otherAccount = 'or sign in with other accounts?'
    this.account = 'Already have an account? '
    this.login = 'Log In'
    this.password_strong_error = 'Please enter a strong password',
      this.required = " is required"
    this.valid = "Please enter a valid "
    this.password_pattern = " ( Password must contain at least one uppercase letter, at least one lowercase letter, at least one special character(i.e number or symbol) and be at least 8 characters or more ) "
  this.text_pattern = " ( must contain only alphabets )"
  }

  

}
