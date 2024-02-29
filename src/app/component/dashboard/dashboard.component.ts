import { Component ,OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  studentlist : Student[]=[];
  studentObj : Student ={
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    number: ''
  }
    id:string="";
    first_name:string="";
    last_name:string="";
    email:string="";
    number:string="";
  
    ngOnInit(): void {
    this.getAllstudents();
  }
  
  constructor(private auth: AuthService , private data : DataService){}
  logout(){
    this.auth.logout();
  }
  getAllstudents(){
    this.data.getAllStudents().subscribe(res =>{
      this.studentlist = res.map((e:any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    },err=>{
      alert("error while fetching student data");
    })
  }
  resetform(){
    this.id= '',
    this.first_name= '',
    this.last_name= '',
    this.email= '',
    this.number= ''

  }

  addStudent(){
    if(this.first_name == '' || this.last_name == '' || this.email=='' || this.number == ''){
      alert("please fill all the values")
      return ;
    }
    this.studentObj.id ='';
    this.studentObj.first_name = this.first_name;
    this.studentObj.last_name = this.last_name;
    this.studentObj.email = this.email;
    this.studentObj.number = this.number;

    this.data.addStudent(this.studentObj);
    this.resetform();
  }
  updateStudent(){

  }
  deleteStudent(student : Student){
    if(window.confirm('are you sure')){
      this.data.deleteStudent(student);
    }
  }
}
