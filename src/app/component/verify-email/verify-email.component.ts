import { Component, OnInit  } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit{
  auth: any;

  constructor(private afs:AuthService){
   
  }
  ngOnInit(): void {
    
  }
}

