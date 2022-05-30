import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash-board.model';

@Component({
  selector: 'app-employee-dash-board',
  templateUrl: './employee-dash-board.component.html',
  styleUrls: ['./employee-dash-board.component.css']
})
export class EmployeeDashBoardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeAllData !: any;
  showAdd!:boolean;
  showUpdt!:boolean;

  constructor(private formbuilder:FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstName : [''],
      lastName :[''],
      email:[''],
      mobile:[''],
      department: ['']
    })
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdt=false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.department=this.formValue.value.department;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe({
      next:(res)=>{    
        console.log(res); 
      alert("Employee Added Successfully") 
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    error:()=>{
      alert("Employee Add Failed");
    }
  })
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe({
      next:(res)=>{ this.employeeAllData=res;}
    })
  }
  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe({
      next:(res)=>{ 
        alert("Employee Deleted");
        this.getAllEmployee();
      }
    })
  }
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdt=true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['department'].setValue(row.department);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.department=this.formValue.value.department;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe({
      next:(res)=>{ 
        alert("Employee Updated");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      }
    })
  }
}
