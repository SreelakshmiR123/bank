import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../bankService/data.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data = "Happy Banking With Us..."
  pdata = "enter account no"
  acno: string = ""
  psw: string = ""


  //modal form
  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]]
  })

  constructor(private rout: Router, private ds: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    const loginStatus = localStorage.getItem('loginStatus')
    console.log(loginStatus)
    if (loginStatus == 'true')
      this.rout.navigateByUrl("home")
  }

  login() {

    var acno = this.loginForm.value.acno
    var psw = this.loginForm.value.psw

    if (this.loginForm.valid) {
      this.ds.loginApi(acno, psw).subscribe({
        next: (result: any) => {


          //store acno in local storage
          localStorage.setItem("currentAcno", JSON.stringify(acno))
          localStorage.setItem("currentUname", result.currentUser)
          localStorage.setItem("token", JSON.stringify(result.token))
          localStorage.setItem("loginStatus", "true")

          alert(result.message)
          //redirection
          this.rout.navigateByUrl("home")
        },
        error: (result: any) => {
          alert(result.error.message)
        }
      })

    }
    else {
      alert("invalid form")
    }
    // this.acno=a.value
    // this.psw=b.value
    console.log(this.acno);
    console.log(this.psw);

    //if (!this.acno || !this.psw) {
    // alert('Acc No and password is required')
    //return
    //}


  }

  // acnoChange(event:any){
  //   this.acno=event.target.value
  //   console.log(this.acno);

}
