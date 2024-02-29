import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {GoogleAuthProvider,GithubAuthProvider,FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  // Login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');
      
      if(res.user?.emailVerified == true){
        this.router.navigate(['dashboard']);
      }
      else{
        this.router.navigate(['/verify-email'])
      }

    }).catch(err => {
      console.error('Login Error:', err);
      alert('Invalid email or password. Please try again.');
      this.router.navigate(['/login']);
    });
  }

  // Register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      alert('Registration successful');
      this.router.navigate(['/login']);
      this.sendEmailForVarification(res.user);


    }).catch(err => {
      console.error('Registration Error:', err);
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }

  // Logout method
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login'], { replaceUrl: true });
    }).catch(err => {
      console.error('Logout Error:', err);
      alert(err.message);
    });
  }


  // forget password
  forgotPassword(email:string){
    this.fireauth.sendPasswordResetEmail(email).then(()=>{
      this.router.navigate(['/verify-email']);
    }).catch(err => {
      console.error('forget password Error:', err);
      alert(err.message);
    });
  }

  // email verification 
  sendEmailForVarification(user:any){
    user.sendEmailVerification().then(()=>{
      this.router.navigate(['/verify-email'])
    }).catch((err: { message: any; }) => {
      
      alert("something went wrong");
    });

  }

    //signin with google
    signInWithGoogle(){
      return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res=>{
        this.router.navigate(['/dashboard']);
        localStorage.setItem('token',JSON.stringify(res.user?.uid));
      }).catch((err: { message: any; }) => {
      
      alert(err.message);
    });
    }

}


















// my old file 
// import { Injectable } from '@angular/core';
// import {AngularFireAuth} from '@angular/fire/compat/auth'
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(private fireauth:AngularFireAuth , private router:Router) { }

//   // login method 
//   login(email:string , password:string){
//     this.fireauth.signInWithEmailAndPassword(email,password).then(()=>
//     {
//       localStorage.setItem('token','true');
//       this.router.navigate(['dashboard'])
//     },err =>{
//       alert(err.message);
//       this.router.navigate(['/login'])
//     }
    
//     )
//   }

//   // register method 
//   register(email:string,password:string){
//     this.fireauth.createUserWithEmailAndPassword(email,password).then(()=>{
//       alert('register success');
//       this.router.navigate(['/login'])
//     },err=>{
//       alert(err.message);
//       this.router.navigate(['/register'])
//     }
//     )
//   }

//     //signout 
//     logout(){
//       this.fireauth.signOut().then(()=>{
//         localStorage.removeItem('token');
//         this.router.navigate(['/login']);
//       },
//       err=>{
//         alert(err.message);
//       }
      
//       )
//     }


// }
