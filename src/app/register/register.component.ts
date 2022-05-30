import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder} from "@angular/forms"
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public signupForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      fullname:[''],
      email:[''],
      password:[''],
      mobile:['']
    })
  }
  register(){
    this.http.post<any>("http://localhost:3000/signupUser",this.signupForm.value)
    .subscribe({
      next:(res)=>{ 
        alert("Registered Successfully");
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
      error:()=>{
        alert("Not Registerd!!");
      }
    })
  }
}
