import { Component, OnInit } from '@angular/core';
import { DataService } from '../bankService/data.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: any = ""
  acno: any = ""
  balance: any = ""
  message: any = ""
  msgClr: any = true
  dAcno: any = ""

  //reactive form for moneyTransfer
  moneyTransferForm = this.fb.group({
    rAcno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]]

  })

  constructor(private ds: DataService, private fb: FormBuilder, private rout: Router, private dp: DatePipe) { }

  ngOnInit(): void {
    //check data present or not in ls
    if (localStorage.getItem("currentUname")) {
      this.name = localStorage.getItem("currentUname")
      if (!this.name)
        this.rout.navigateByUrl('login')
      //console.log(this.name);
      // }else {
      // this.rout.navigateByUrl('login')
    }


    //login or not
    if (!localStorage.getItem("currentAcno")) {
      this.rout.navigateByUrl("")
      alert("p;ease login first")
    }
  }


  getbalance() {
    //acno-ls
    if (localStorage.getItem("currentAcno")) {
      this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")
      // console.log(this.acno);
      //balance

      this.ds.getBalanceApi(this.acno).subscribe({
        next: (result: any) => {
          //console.log(result.message);
          this.balance = result.message


        },
        error: (result: any) => {
          alert(result.error.message)
        }
      })

    }

  }

  getProfile() {
    if (localStorage.getItem("currentAcno")) {
      this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")
      console.log(this.acno);
      console.log(this.name);


    }

  }
  moneyTransfer() {
    if (this.moneyTransferForm.valid) {
      var path = this.moneyTransferForm.value
      var rAcno = path.rAcno
      var amount = path.amount
      var psw = path.psw
      console.log(rAcno);
      //sender Acno
      if (localStorage.getItem("currentAcno")) {
        this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")
      }

      //date
      const date = new Date()
      // console.log(date);

      var latestDate = this.dp.transform(date, 'medium')
      //console.log(latestDate);
      if (this.acno == rAcno) {
        this.message = "sender and reciever account number are same"
        this.msgClr = false

      }
      else {
        //api
        this.ds.moneyTransferApi(this.acno, rAcno, amount, psw, latestDate).subscribe({
          next: (result: any) => {
            //alert(result.message)
            this.message = result.message
            this.msgClr = true
          },
          error: (result: any) => {
            //alert(result.error.message)
            this.message = result.error.message
            this.msgClr = false
          }
        })
      }

    }
    else {
      this.message = "invalid form"
      this.msgClr = false

    }
  }
  logout() {
    //    localStorage.clear()
    // /   this.rout.navigateByUrl("login")
    // }
    localStorage.removeItem("currentUname")
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("loginStatus")
    localStorage.removeItem("token")
    this.rout.navigateByUrl("login")
  }
  deleteConfirm() {
    if (localStorage.getItem("currentAcno")) {
      this.dAcno = JSON.parse(localStorage.getItem("currentAcno") || "")
      console.log(this.dAcno);

    }
  }
  cancelp() {
    this.dAcno = ""
  }
  delete() {
    this.ds.accountDeleteApi(this.dAcno).subscribe({
      next: (result: any) => {
        if (result.status) {
          alert("Account deleted successfully")
          localStorage.clear()
          this.rout.navigateByUrl('login')
        }
      },

      error: (result: any) => {

      }
    })
  }

}