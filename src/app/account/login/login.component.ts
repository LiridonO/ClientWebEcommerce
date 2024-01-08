import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  returnUrl: string;

  constructor(
    private accountService: AccountService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
    ){}

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop';
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('',Validators.required)
    });
  }

  onSubmit(){
    console.log(this.loginForm.value);
    this.accountService.login(this.loginForm?.value).pipe(
      catchError((error) =>{
        this._snackBar.open(error.error, "Close", {duration: 5000})
        return EMPTY;
      })
    ).subscribe(() => {
      this._snackBar.open("login success", "Close", {duration: 3000})
      this.router.navigateByUrl(this.returnUrl);
    } , error => {
      console.log(error);
    })
  }
}
